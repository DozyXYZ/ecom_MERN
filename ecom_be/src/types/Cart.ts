export interface ICartItem {
  image: string | undefined;
  slug: string;
  quantity: number;
  countInStock: number;
  price: number;
  _id: string;
  name: string;
}

export interface IShippingAddress {
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface ICart {
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  cartItems: ICartItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
}
