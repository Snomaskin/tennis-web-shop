import type { CartItemType } from "../CartContext";
import "./CartItem.css"


interface CartItemProps {
    cartItem: CartItemType,
    removeFromCart: (id: CartItemType['id']) => void,
  };
  
export const CartItem = ({ cartItem, removeFromCart }: CartItemProps) => {
    const { id, name, price, imageUrl, quantity } = cartItem;
  
    return (
      <article className="cart-item" id={id}>
        <div className="image-wrapper">
          <img className="product-image" src={imageUrl} alt={name}/>
        </div>
        <p className="product-price">${price}</p>
        <span className="quantity">{quantity}x</span>
        <button onClick={() =>removeFromCart(id)} className="rm-item-btn">
          Remove
        </button>
      </article>
    );
  };