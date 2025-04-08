import { useEffect } from "react";
import { ProductCard } from "../Shop/productCards/ProductCard";
import { TextPage } from "../TextCard/TextCard";
import { useCart } from "../Shop/Cart/CartContext";
import { useSearch } from "./SearchContext";
import { useShop } from "../Shop/ShopContext";
import { SortProducts } from "../Shop/SortProducts/SortProducts";
import "../Shop/Shop.css";


export const SearchResults = () => {
  const { addToCart } = useCart();
  const { searchResults } = useSearch();
  const { displayedProducts, setDisplayedProducts } = useShop();

  useEffect(() => {
    setDisplayedProducts(searchResults || [])
  }, [searchResults, setDisplayedProducts]);

  return (
      <div className="shop">
        <SortProducts />
          <div className="products-container">
              {displayedProducts.length > 0 ? (
                  displayedProducts.map((item) => (
                      <ProductCard 
                          key={item.id}
                          product={item}
                          onAddToCart={addToCart}
                      />
                  ))
              ) : (
                  <TextPage outerText={{p1: 'No products found'}} />
              )}
          </div>
      </div>
  );
};