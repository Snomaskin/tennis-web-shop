import { useParams } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { Product, products, specialPromos, promotions, promoTexts } from "../../data/products.ts"
import { getPromosFromAll, applyPromosToProducts } from "../../utils/promoUtils.ts";
import { useShop } from "./ShopContext.tsx";
import { useCart } from "./Cart/CartContext.tsx";
import { ProductCard } from "./productCards/ProductCard.tsx";
import { RenderProducts } from "./RenderProducts/RenderProducts.tsx";
import { preloadImages } from "../../utils/preloadImages.ts";
import { PopUp } from "../utilComponents/PopUp/PopUp.tsx";
import { ShopLandingPage } from "./ShopLandingPage/ShopLandingPage.tsx";
import "./Shop.css"


export const Shop = () => {
    const { category } = useParams<{category?: string}>();
    const { displayedProducts, setDisplayedProducts } = useShop();
    const { addToCart } = useCart()
    const title = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';
    const { promoHeader, promoText } = promoTexts

    useEffect(() => {
      if (category) {
        const productsInCategory = applyPromosToProducts(products[category], promotions);
        const imgUrls = productsInCategory.map(item => item.imageUrl);
        
        preloadImages(imgUrls)
        .then(() => setDisplayedProducts(productsInCategory)) 
        .catch((error) => console.log('Failed to preload menu images: ', error))
      };
      return () => {
        setDisplayedProducts([]);
      };
    }, [category, setDisplayedProducts]);


    const promoProductNodes = getPromosFromAll(products, specialPromos)
      .map(item => <ProductCard key={item.id} product={item} onAddToCart={addToCart} />);

    return (
      displayedProducts.length > 0 
      ? <RenderShop 
          displayedProducts={displayedProducts}
          title={title}
          onAddToCart={addToCart}
          promotions={promoProductNodes}
          promoHeader={promoHeader}
          promoText={promoText}
        />
      : <ShopLandingPage />
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
    {promotions?.length ? <PopUp promotions={promotions} header={promoHeader} text={promoText}/> : null}
    <RenderProducts products={displayedProducts} title={title} onAddToCart={onAddToCart} />
  </>
);