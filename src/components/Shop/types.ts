import { CartItemType } from "./Cart/CartContext";


type ShippingInfo = {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
};

type PaymentInfo = {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
};

const defaultShippingInfo: ShippingInfo = {
  name: "",
  address: "",
  city: "",
  zipCode: "",
  country: ""
};

const defaultPaymentInfo: PaymentInfo = {
  cardNumber: "",
  cardHolder: "",
  expiryDate: "",
  cvv: ""
};

type OrderType = {
  orderId: string;
  userId?: string | null;
  products: CartItemType[];
  shippingDetails: ShippingInfo;
  paymentDetails: PaymentInfo;
};

export type { ShippingInfo, PaymentInfo, OrderType };
export { defaultPaymentInfo, defaultShippingInfo };