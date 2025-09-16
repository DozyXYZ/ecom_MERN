import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ICartItem, IShippingAddress } from "../types/Cart";
import type { Order } from "../types/Order";
import apiClient from "../apiClient";

export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: async (order: {
      orderItems: ICartItem[];
      shippingAddress: IShippingAddress;
      paymentMethod: string;
      itemsPrice: number;
      shippingPrice: number;
      taxPrice: number;
      totalPrice: number;
    }) =>
      (
        await apiClient.post<{ message: string; order: Order }>(
          `api/orders`,
          order
        )
      ).data,
  });

export const useGetOrderDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ["orders", id],
    queryFn: async () => (await apiClient.get<Order>(`api/orders/${id}`)).data,
  });

export const useGetPaypalClientIdQuery = () =>
  useQuery({
    queryKey: ["paypal-clientId"],
    queryFn: async () =>
      (await apiClient.get<{ clientId: string }>(`api/keys/paypal`)).data,
  });

export const usePayOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (details: { orderId: string }) =>
      (
        await apiClient.put<{ order: Order; message: string }>(
          `api/orders/${details.orderId}/pay`,
          details
        )
      ).data,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["orders", variables.orderId],
      });
    },
  });
};
