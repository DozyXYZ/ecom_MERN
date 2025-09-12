import { useMutation } from "@tanstack/react-query";
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
