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
            title: `Order Confirmation for Order: ${orderId}`,
            p1: `Thank you for your order, ${shippingDetails.name}!`,
            p2: `Your items will be shipped to: ${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.zipCode}, ${shippingDetails.country}`
        }}
        innerText={{
            title: 'Payment Details',
            p1: `Card ending in: ${paymentDetails.cardNumber.slice(-4)}`
        }}
      />
    </div>
  );
};