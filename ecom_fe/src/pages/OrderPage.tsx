import {
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../hooks/orderHooks";
import { Link, useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import type { ApiError } from "../types/ApiError";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  DISPATCH_ACTION,
  PayPalButtons,
  SCRIPT_LOADING_STATE,
  usePayPalScriptReducer,
  type PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";

const OrderPage = () => {
  const params = useParams();
  const { id: orderId } = params;

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId!);

  const { mutate: payOrder, isPending: loadingPay } = usePayOrderMutation();

  const testPayHandler = async () => {
    try {
      await payOrder({ orderId: orderId! });
      toast.success("Order is paid");
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer();

  const { data: paypalConfig } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (paypalConfig && paypalConfig.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: DISPATCH_ACTION.RESET_OPTIONS,
          value: { clientId: paypalConfig!.clientId, currency: "EUR" },
        });
        paypalDispatch({
          type: DISPATCH_ACTION.LOADING_STATUS,
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };
      loadPaypalScript();
    }
  }, [paypalConfig, paypalDispatch]);

  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
    style: { layout: "vertical" },
    createOrder(_, actions) {
      return actions.order
        .create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "EUR",
                value: order!.totalPrice.toString(),
              },
            },
          ],
        })
        .then((orderID: string) => {
          return orderID;
        });
    },
    onApprove(_, actions) {
      return actions.order!.capture().then(async (details) => {
        try {
          await payOrder({ orderId: orderId!, ...details });
          refetch();
          toast.success("Order is paid successfully");
        } catch (err) {
          toast.error(getError(err as ApiError));
        }
      });
    },
    onError: (err) => {
      toast.error(getError(err as ApiError));
    },
  };

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">
      {getError(error as unknown as ApiError)}
    </MessageBox>
  ) : !order ? (
    <MessageBox variant="danger">Order Not Found</MessageBox>
  ) : (
    <div>
      <h1 className="my-3">Order {orderId}</h1>

      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>

              <Card.Text>
                <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                <strong>Address:</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.postalCode}, {order.shippingAddress.city}
                , {order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="warning">Not Delivered</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>

              <Card.Text>
                <strong>Method:</strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Paid at {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="warning">Not Paid</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>

              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded thumbnail"
                        />{" "}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>

                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>

                      <Col md={3}>€{item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>€{order.itemsPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>€{order.shippingPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>€{order.taxPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>€{order.totalPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>

            {!order.isPaid && (
              <ListGroup.Item>
                {isPending ? (
                  <LoadingBox />
                ) : isRejected ? (
                  <MessageBox variant="danger">
                    Error in connecting to PayPal
                  </MessageBox>
                ) : (
                  <div>
                    <PayPalButtons
                      {...paypalbuttonTransactionProps}
                    ></PayPalButtons>
                    <Button onClick={testPayHandler}>Test Pay</Button>
                  </div>
                )}
                {loadingPay && <LoadingBox />}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default OrderPage;
