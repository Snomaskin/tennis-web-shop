import { ProductCard } from "../Shop/productCards/ProductCard";
import { Product } from "../Shop/productCards/products";
import { TextPage } from "../TextCard/TextCard";
import { useCart } from "../Shop/CartContext";
import "../Shop/Shop.css";


export const SearchResults = ({ searchResults }: { searchResults: Product[] }) => {
    const { addToCart } = useCart();

    return (
        <div className="shop">
            <div className="products-container">
                {searchResults.length > 0 ? (
                    searchResults.map((item) => (
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