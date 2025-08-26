import { Button, Card } from "react-bootstrap";
import type { IProduct } from "../types/Product";
import { Link } from "react-router";
import Rating from "./Rating";

const ProductItem = ({ product }: { product: IProduct }) => {
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>

        <Rating rating={product.rating} numReviews={product.numReviews} />

        <Card.Text>€{product.price}</Card.Text>

        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of Stock
          </Button>
        ) : (
          <Button>Add to Cart</Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
