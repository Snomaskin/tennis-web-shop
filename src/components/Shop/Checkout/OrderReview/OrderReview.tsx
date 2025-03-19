import { CheckoutBtns } from "../CheckoutBtns/CheckoutBtns";
import { useCheckout } from "../CheckoutContext";
import { CheckoutSummary } from "../CheckoutSummary/CheckoutSummary";
import "./OrderReview.css"


export const OrderReview = () => {
    const { shippingInfo, paymentInfo } = useCheckout();

    return (
        <div className="review-wrapper">
            <CheckoutSummary />
            
            <div className="shipping-payment-container">
                <div className="shipping-wrapper">
                      
                    <div className="info-card">
                    <h2>Shipping Info</h2>
                        <p><strong>Name: </strong>{shippingInfo.name}</p>
                        <p><strong>Address: </strong>{shippingInfo.address}</p>
                        <p><strong>City: </strong>{shippingInfo.city}</p>
                        <p><strong>Zip Code: </strong>{shippingInfo.zipCode}</p>
                        <p><strong>Country: </strong>{shippingInfo.country}</p>
                    </div>
                </div>

                <div className="payment-wrapper">
                    <div className="info-card">
                    <h2>Payment Info</h2>
                        <p><strong>Card Number: </strong>{paymentInfo.cardNumber.slice(-4).padStart(paymentInfo.cardNumber.length, '*')}</p>
                        <p><strong>Card Holder: </strong>{paymentInfo.cardHolder}</p>
                    </div>
                </div>
                <CheckoutBtns />

            </div>
        </div>
    );
};
