import { useParams } from "react-router-dom";
import { ProductCard } from "./productCards/ProductCard";
import { products, Product } from "./productCards/products";
import { useCart } from "./Cart/CartContext";
import { TextPage } from "../TextCard/TextCard";
import "./Shop.css"


export const Shop = () => {
    const { category } = useParams<{category?: string}>();
    const { addToCart } = useCart();

    return (
        category ? renderCategory(category, addToCart) : renderLandingShop()
    );
};

const renderCategory = (category: string, addToCart: (item: Product) => void) => {
    const productCategory = products[category];

    return (
        <div className="shop">
            <div className="products-container">
                {productCategory.map((item) => (
                    <ProductCard 
                        key={item.id}
                        product={item}
                        onAddToCart={addToCart}
                    />
                ))}
            </div>
        </div>
    );
};

const renderLandingShop = () => (
    <div className="shop">
        <TextPage outerText={{title:'Welcome to the shop!', p1:'- Try the search function and adding products to the cart.'}} />
    </div>
);