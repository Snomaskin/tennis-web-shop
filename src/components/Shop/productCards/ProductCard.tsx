import { Product } from "../../../assets/products";
import "./ProductCard.css"
import { useState, useRef, useEffect } from 'react';
import classNames from "classnames";


interface ProductCardProps {
    product: Product,
    onAddToCart: (item: Product) => void;
};

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { name, price, imageUrl } = product;
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const productRef = useRef<HTMLDivElement>(null);

  const calculateCartPosition = () => {
    const cartElement = document.querySelector('.cart-icon');
    if (!productRef.current || !cartElement) return;
  
    const productRect = productRef.current.getBoundingClientRect();
    const cartRect = cartElement.getBoundingClientRect();
  
    const moveX = cartRect.left - productRect.left;
    // Since the default endpoint is a lot lower than the cart nav for some reason we need to adjust it.
    const moveY = (cartRect.top - productRect.top) - 140; 
  
    productRef.current.style.setProperty('--move-x', `${moveX}px`);
    productRef.current.style.setProperty('--move-y', `${moveY}px`);
  };

  const handleAddToCart = () => {
    calculateCartPosition();
    setIsAnimating(true);
    
    setTimeout(() => {
      onAddToCart(product);
      setIsAnimating(false);
    }, 700); 
  };

  useEffect(() => {
    const productElement = productRef.current;
    if (!productElement) return;

    const handleAnimationEnd = () => {
      setIsAnimating(false);
    };

    productElement.addEventListener('animationend', handleAnimationEnd);
    return () => {
      productElement.removeEventListener('animationend', handleAnimationEnd);
    };
  }, []);

  return (
    <div className="card-wrapper">
      <article 
        ref={productRef}
        className={classNames('product-card', {
          'animate-to-cart': isAnimating
          })
        }
      >
        <div className="image-wrapper">
          <img className="product-image" src={imageUrl} alt={name} />
        </div>
        
        <h3 className="product-name">{name}</h3>
        <p className="product-price">${price}</p>

        <button 
          onClick={handleAddToCart} 
          className="add-to-cart-btn"
          disabled={isAnimating}
        >
          Add to Cart
        </button>
      </article>
    </div>
  );
};
