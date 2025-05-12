import { ShippingInfo, PaymentInfo } from "../../types";

type FormTypes = "shipping" | "payment";
type FormFieldKey<T extends FormTypes> = keyof typeof forms[T];

const autofillShipping: ShippingInfo = {
  name: "Kalle Anka",
  address: "Krutbuktsvägen 13",
  city: "Ankeborg",
  zipCode: "246 90",
  country: "Sverige"
};

const autofillPayment: PaymentInfo = {
  cardNumber: "1000010000100001",
  cardHolder: "Kalle Anka",
  expiryDate: "12 / 99",
  cvv: "200"
};

const forms = {
  shipping: {
    name: {
      label: "Name",
      id: "name",
    },
    address: {
      label: "Address",
      id: "address",
    },
    city: {
      label: "City",
      id: "city",
    },
    zipCode: {
      label: "Zip Code",
      id: "zipCode",
    },
    country: {
      label: "Country",
      id: "country",
    },
  },
  payment: {
    cardNumber: {
      label: "Card Number",
      id: "cardNumber",
    },
    cardHolder: {
      label: "Cardholder Name",
      id: "cardHolder",
    },
    expiryDate: {
      label: "Expiry Date",
      id: "expiryDate",
    },
    cvv: {
      label: "CVV",
      id: "cvv",
    },
  },
};


export type { FormTypes, FormFieldKey };
export { autofillPayment, autofillShipping, forms };