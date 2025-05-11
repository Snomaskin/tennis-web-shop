import { useCheckout } from "../CheckoutContext";
import { TextPage } from "../../../TextCard/TextCard";
import { useEffect, useRef } from "react";
import { useOrder } from "../../Orders/OrderContext";


export const OrderConfirmation = () => {
  const { resetCheckout } = useCheckout();
  const { tempOrder } = useOrder();
  const { orderId, shippingDetails, paymentDetails  } = tempOrder;
  const isFirstRender = useRef(true);
  
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    };

    return () => {
      resetCheckout();
    };
  }, [resetCheckout]);

  return (
    <div>
      <TextPage 
        outerText={{
            title: "Thank you for your purchase!",
            p1: "\u00A0\u00A0Save your order number to find it through the menu above.",
            p2: `\u00A0\u00A0Order number: ${orderId}`,
        }}
        innerText={{
            title: "Shipping to:",
            p1: `${shippingDetails.address}, ${shippingDetails.zipCode}`,
            p2: `${shippingDetails.city}, ${shippingDetails.country}`,
            title2: "Payment Details:",
            p4: `Card ending with: ${paymentDetails.cardNumber.slice(-4).padStart(paymentDetails.cardNumber.length, '*')}`,
        }}
      />
    </div>
  );
};