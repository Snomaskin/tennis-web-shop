import { useCart } from "./CartContext";
import { CartItem } from "../productCards/CartItem";
import { CartItemType } from "./CartContext";
import cartIcon from "../../../assets/cart.png"
import "./Cart.css"
import { useState, useRef, useEffect } from "react";
import classNames from "classnames";


export const Cart = () => {
    const { cart, removeFromCart, clearCart, checkoutCart } = useCart();
    const totalCart = cart.length > 0 ? cart.reduce((prev, item) => prev + item.quantity, 0) : 0;
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const cartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
            
            {cart.length > 0 && isSelected === true &&
                <div className="cart">
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
                    <CartBtns clearCart={clearCart} checkoutCart={checkoutCart} />
                </div>
            }
        </div>
    );
};

const CartBtns = ({ clearCart, checkoutCart }: { clearCart: () => void; checkoutCart: () => CartItemType[] }) => (
    <div className="cart-footer">
        <button onClick={() => clearCart()} className="clear-cart-btn">
            Clear
        </button>
        <button onClick={() => checkoutCart()} className="checkout-btn">
            Checkout
        </button>
    </div>
);