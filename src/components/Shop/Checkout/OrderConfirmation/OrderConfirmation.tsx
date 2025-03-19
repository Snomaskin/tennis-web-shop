import { useCheckout } from "../CheckoutContext";
import { TextPage } from "../../../TextCard/TextCard";
import { useEffect, useRef } from "react";
import { useCart } from "../../Cart/CartContext";


export const OrderConfirmation = () => {
    const { shippingInfo, paymentInfo, resetCheckout } = useCheckout();
    const { clearCart } = useCart();
    const isFirstRender = useRef(true);
    
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        return () => {
            resetCheckout();
            clearCart();
        };
    }, [resetCheckout, clearCart]);

    return (
        <div>
            <TextPage 
                outerText={{
                    title: 'Order Confirmation',
                    p1: `Thank you for your order, ${shippingInfo.name}!`,
                    p2: `Your items will be shipped to: ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.zipCode}, ${shippingInfo.country}`
                }}
                innerText={{
                    title: 'Payment Details',
                    p1: `Card ending in: ${paymentInfo.cardNumber.slice(-4)}`
                }}
            />
        </div>
    )
}