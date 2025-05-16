import { StandardModal } from "../../utilComponents/StandardModal/StandardModal";
import "./ExpandedProduct.css"


interface ExpandedProductProps {
  name: string;
  price: number;
  originalPrice?: number | null;
  imageUrl: string;
  onAddToCart: () => void;
  onClose: () => void;
}
export const ExpandedProduct = ({ name, price, originalPrice, imageUrl, onAddToCart, onClose }: ExpandedProductProps) => {
  
  return (
    <StandardModal onClose={onClose} style={{ content:{backgroundColor: "var(--tennis-white)"} }}>
      <article className="expanded-product">
        <div className="image-wrapper">
          <img className="product-image" src={imageUrl} />
        </div> 
        <div className="expanded-product-content">
          <h3>{name}</h3>
          <p className="expanded-product-text">
            If this product is a tennis racquet, it will hit the ball super hard and your opponent won't stand a chance. <br/><br/>
            If this product is a tennis ball, it will bounce like you've never seen a ball bounce before. <br/><br/>
            If this product is a piece of clothing, it is made of the highest quality material by the best artisan craftsmen.
          </p>
          <div className="expanded-content-footer">
            <p className="product-price">
              { originalPrice ? (
                <>
                  <span className="original-price">${originalPrice}</span> {" "}
                  <span className="discount-price">${price}</span>
                </>
                ) : (
                  <span>${price}</span>
                )
              }
            </p>
            <button className="add-to-cart-btn" onClick={onAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </article>
    </StandardModal>
  )
}