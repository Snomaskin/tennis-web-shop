import { useParams } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { Product, products, getPromotions, promoTexts } from "../../assets/products.ts"
import { useShop } from "./ShopContext.tsx";
import { useCart } from "./Cart/CartContext.tsx";
import { TextPage } from "../TextCard/TextCard";
import { ProductCard } from "./productCards/ProductCard.tsx";
import { RenderProducts } from "./RenderProducts/RenderProducts.tsx";
import { preloadImages } from "../../utils/preloadImages.ts";
import { PopUp } from "../utilComponents/PopUp/PopUp.tsx";
import "./Shop.css"


export const Shop = () => {
    const { category } = useParams<{category?: string}>();
    const { displayedProducts, setDisplayedProducts } = useShop();
    const { addToCart } = useCart()
    const title = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';
    const promotions = getPromotions().map(item => <ProductCard key={item.id} product={item} onAddToCart={addToCart} />);
    const { promoHeader, promoText } = promoTexts

    useEffect(() => {
      if (category) {
        const productsInCategory = products[category];
        const imgUrls = productsInCategory.map(item => item.imageUrl);

        preloadImages(imgUrls)
        .then(() => setDisplayedProducts(productsInCategory)) 
        .catch((error) => console.log('Failed to preload menu images: ', error))
      };

    }, [category, setDisplayedProducts]);

    return (
      displayedProducts.length > 0 
      ? <RenderShop 
          displayedProducts={displayedProducts}
          title={title}
          onAddToCart={addToCart}
          promotions={promotions}
          promoHeader={promoHeader}
          promoText={promoText}
        />
      : renderLandingShop()
    );
};

interface RenderShopProps {
  displayedProducts: Product[], 
  title: string | undefined, 
  onAddToCart: (product: Product) => void, 
  promotions?: ReactNode[],
  promoHeader?: string,
  promoText?: string,
};

const RenderShop = ({ displayedProducts, title, onAddToCart, promotions, promoHeader, promoText }: RenderShopProps) => (
  <>
    {promotions && <PopUp promotions={promotions} header={promoHeader} text={promoText}/>}
    <RenderProducts products={displayedProducts} title={title} onAddToCart={onAddToCart} />
  </>
);

const renderLandingShop = () => (
    <div className="shop">
        <TextPage 
        outerText={{title:'Welcome to the shop.', p1:`- Select a product category from the 'Shop' menu or use search to find products.`}} 
        innerText={{title: 'News', p1: '- Sort function is now live!'}} />
    </div>
);