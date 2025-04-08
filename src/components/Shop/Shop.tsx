import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ProductCard } from "./productCards/ProductCard";
import { Product, products } from "../../assets/products.ts"
import { useCart } from "./Cart/CartContext";
import { useShop } from "./ShopContext.tsx";
import { TextPage } from "../TextCard/TextCard";
import { SortProducts } from "./SortProducts/SortProducts.tsx";
import "./Shop.css"


export const Shop = () => {
    const { category } = useParams<{category?: string}>();
    const { addToCart } = useCart();
    const { displayedProducts, setDisplayedProducts } = useShop();

    useEffect(() => {
      if (category) {
        setDisplayedProducts(products[category])
      };
    }, [category, setDisplayedProducts]);

    return (
      displayedProducts.length > 0 ? renderCategory(displayedProducts, addToCart) : renderLandingShop()
    );
}

const renderCategory = (displayedProducts: Product[], addToCart: (item: Product) => void) => (
      <div className="shop">
        <SortProducts />
          <div className="products-container">
              {displayedProducts.map((item) => (
                  <ProductCard 
                    key={item.id}
                    product={item}
                    onAddToCart={addToCart}
                  />
              ))}
          </div>
          
      </div>
);

const renderLandingShop = () => (
    <div className="shop">
        <TextPage 
        outerText={{title:'Welcome to the shop.', p1:`- Select a product category from the 'Shop' menu or use search to find products.`}} 
        innerText={{title: 'News', p1: '- Sort function is now live!'}} />
    </div>
);