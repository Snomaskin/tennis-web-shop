import { Product, PromoProduct } from "../../../data/products";
import { useState, useRef, useEffect } from 'react';
import classNames from "classnames";
import { ExpandedProduct } from "./ExpandedProduct";
import "./ProductCard.css"


export interface ProductCardProps {
    product: Product | PromoProduct,
    onAddToCart: (item: Product) => void;
};

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { name, price, imageUrl } = product;
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const productRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const isPromo = (product: Product): product is PromoProduct => {
    return 'originalPrice' in product
  };

  const originalPrice = isPromo(product) ? product.originalPrice : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    calculateCartPosition(productRef);
    setIsAnimating(true);
    
    setTimeout(() => {
      onAddToCart(product);
      setIsAnimating(false);
    }, 700); 
  };

  const handleExpandedAddTocart = () => {
    onAddToCart(product);
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
    <article 
      ref={productRef}
      className={classNames('product-card', {
        'animate-to-cart': isAnimating
      })}
      onClick={() => setIsExpanded(true)}
    >
      {isExpanded && 
        <ExpandedProduct 
          name={name} 
          price={price} 
          originalPrice={originalPrice ?? null}
          imageUrl={imageUrl}
          onAddToCart={handleExpandedAddTocart}
          onClose={() => setIsExpanded(false)}
        />
          }
      <div className="image-wrapper">
        <img className="product-image" src={imageUrl} alt={name} />
      </div>     
      <h3 className="product-name">{name}</h3>
      <p className="product-price">
        {originalPrice ? (
          <>
            <span className="original-price">${originalPrice}</span>{' '}
            <span className="discount-price">${price}</span>
          </>
        ) : (
          <span>${price}</span>
        )}
      </p>
      <button 
        onClick={(e) => handleAddToCart(e)} 
        className="add-to-cart-btn"
        disabled={isAnimating}
      >
        Add to Cart
      </button>
    </article>
  );
};

const calculateCartPosition = (productRef: React.RefObject<HTMLDivElement>) => {
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