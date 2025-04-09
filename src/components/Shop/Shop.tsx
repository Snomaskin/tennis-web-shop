import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Product, products } from "../../assets/products.ts"
import { useShop } from "./ShopContext.tsx";
import { TextPage } from "../TextCard/TextCard";
import { RenderProducts } from "./RenderProducts/RenderProducts.tsx";
import "./Shop.css"


export const Shop = () => {
    const { category } = useParams<{category?: string}>();
    const { displayedProducts, setDisplayedProducts } = useShop();
    const title = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

    useEffect(() => {
      if (category) {
        setDisplayedProducts(products[category])
      };
    }, [category, setDisplayedProducts]);

    return (
      displayedProducts.length > 0 ? renderCategory(displayedProducts, title) : renderLandingShop()
    );
}

const renderCategory = (displayedProducts: Product[], title: string | undefined) => (
  <RenderProducts products={displayedProducts} title={title} />
);

const renderLandingShop = () => (
    <div className="shop">
        <TextPage 
        outerText={{title:'Welcome to the shop.', p1:`- Select a product category from the 'Shop' menu or use search to find products.`}} 
        innerText={{title: 'News', p1: '- Sort function is now live!'}} />
    </div>
);