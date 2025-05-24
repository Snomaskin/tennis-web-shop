import { useCart } from "./CartContext";
import { CartItem } from "../productCards/CartItem";
import cartIcon from "../../../assets/cart.png";
import trashIcon from "../../../assets/trash.png";
import { preloadImages } from "../../../utils/preloadImages";
import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { AnimatePresence } from "framer-motion";
import { FadeInOut } from "../../utilComponents/FadeInOut";
import { useSearch } from "../../Search/SearchContext";
import "./Cart.css";


export const Cart = () => {
  const { cart, removeFromCart, clearCart, checkoutCart } = useCart();
  const { setIsSearching } = useSearch();
  const totalCart = cart.length > 0 ? cart.reduce((prev, item) => prev + item.quantity, 0) : 0;
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    preloadImages(trashIcon).catch(error => console.log('Failed to preload: trashIcon', error));
    const handleClickOutside = (event: MouseEvent) => {
        if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
            setIsSelected(false);
            setIsClicked(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const imageUrls = cart.map(item => item.imageUrl);
    preloadImages(imageUrls);
  }, [cart]);

  const handleMouseLeave = () => {
      !isClicked && setIsSelected(false);
  }

  const handleClick = () => {
      if (!isClicked && cart.length > 0) {
          setIsClicked(true);
          setIsSelected(true);
      } else { 
          setIsClicked(false);
      }
  }

  return (
      <div 
        ref={cartRef}
        className={classNames('cart-nav', {
          'is-clicked': isClicked,
          'is-hovered': isSelected && !isClicked
          })
        }
        onMouseEnter={() => setIsSelected(true)} 
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className="cart-clicker"
          onClick={handleClick}
        >
          <img className="cart-icon" src={cartIcon} alt="Cart" />
          <div className="cart-counter">{totalCart}</div>
        </div>
        <AnimatePresence>
          {cart.length > 0 && isSelected === true &&
              <FadeInOut className="cart">
                <ul className="cart-items">
                  {cart.map((item) => (
                    <li key={item.id}>
                      <CartItem 
                        cartItem={item}
                        removeFromCart={removeFromCart}
                      />
                    </li>
                  ))}
                </ul>
                <CartBtns 
                  clearCart={clearCart} 
                  checkoutCart={checkoutCart} 
                  onCheckout={{setIsClicked, setIsSelected, setIsSearching}} 
                />
            </FadeInOut>
          }
        </AnimatePresence>
    </div>
  );
};

const CartBtns = ({ clearCart, checkoutCart, onCheckout }: 
  { clearCart: () => void, checkoutCart: () => void, 
    onCheckout: {
      setIsClicked: React.Dispatch<React.SetStateAction<boolean>>,
      setIsSelected: React.Dispatch<React.SetStateAction<boolean>>,
      setIsSearching: React.Dispatch<React.SetStateAction<boolean>>,
    }}) => (

    <div className="cart-footer">
      <button onClick={() => clearCart()} className="clear-cart-btn">
        Clear
      </button>
      <button onClick={() => {
        checkoutCart(); 
        setTimeout(() => {
          onCheckout.setIsClicked(false); 
          onCheckout.setIsSelected(false);
          onCheckout.setIsSearching(false);
        }, 200);
       }} className="checkout-btn"
      >
        Checkout
      </button>
    </div>
);