import type { ICartItem, IShippingAddress } from "./Cart";
import type { User } from "./User";

export type Order = {
  _id: string;
  orderItems: ICartItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  user: User;
  createdAt: string;
  isPaid: boolean;
  paidAt: string;
  isDelivered: boolean;
  deliveredAt: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};
