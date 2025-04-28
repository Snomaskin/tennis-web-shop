import type { CartItemType } from "../Cart/CartContext";
import trashIcon from "../../../assets/trash.png"
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
        <p className="price">${price}</p>
        <span className="quantity">{quantity}x</span>
        <button onClick={() =>removeFromCart(id)} className="rm-item-btn">
          <img className="cart-trash-icon" src={trashIcon} />
        </button>
      </article>
    );
  };