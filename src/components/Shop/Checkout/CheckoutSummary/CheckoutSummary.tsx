import { useCart } from "../../Cart/CartContext";
import { CartItem } from "../../productCards/CartItem";
import { CheckoutBtns } from "../CheckoutBtns/CheckoutBtns";
import { useCheckout } from "../CheckoutContext";
import "./CheckoutSummary.css";


export const CheckoutSummary = () => {
  const { cart, removeFromCart } = useCart();
  const { currentStep } = useCheckout();
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="checkout-wrapper">
      <h2>Order Summary</h2>
      <ul className="checkout-cart">
        {cart.map((item) => (
          <li className="checkout-item" key={item.id}>  
            <CartItem cartItem={item} removeFromCart={removeFromCart} />
          </li>
        ))}
      </ul>
      
      <div className="checkout-footer">
        <div className="checkout-total">
          <span>Total: </span>
          <span><strong>${total.toFixed(2)}</strong></span>
        </div>
        
        {currentStep === 'summary' && <CheckoutBtns />}
      </div>
    </div>
  );
};