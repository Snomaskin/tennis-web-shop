import { CheckoutSummary } from "./CheckoutSummary/CheckoutSummary";
import { CheckoutForm } from "./CheckoutForm/CheckoutForm";
import { OrderReview } from "./OrderReview/OrderReview";
import { OrderConfirmation } from "./OrderConfirmation/OrderConfirmation";
import { useCheckout } from './CheckoutContext';


export const Checkout = () => {
  const { currentStep } = useCheckout();

  return (
    <div className="checkout-container" style={{display: 'flex', justifyContent: 'center'}}>
      {currentStep === 'summary' && <CheckoutSummary />}
      {currentStep === 'shipping' && <CheckoutForm formType={'shipping'} />}
      {currentStep === 'payment' && <CheckoutForm formType={'payment'}/>}
      {currentStep === 'review' && <OrderReview />}
      {currentStep === 'confirmation' && <OrderConfirmation />}
    </div>
  );
};