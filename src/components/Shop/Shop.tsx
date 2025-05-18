import { useParams } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { Product, products, specialPromos, promotions, promoTexts } from "../../data/products.ts"
import { getPromosFromAll, applyPromosToProducts } from "../../utils/promoUtils.ts";
import { useShop } from "./ShopContext.tsx";
import { useCart } from "./Cart/CartContext.tsx";
import { ProductCard } from "./productCards/ProductCard.tsx";
import { RenderProducts } from "./RenderProducts/RenderProducts.tsx";
import { preloadImages } from "../../utils/preloadImages.ts";
import { ShopLandingPage } from "./ShopLandingPage/ShopLandingPage.tsx";
import { FadeInOut } from "../utilComponents/FadeInOut.tsx";
import { PromoPopup } from "./PromoPopup/PromoPopup.tsx";


export const Shop = () => {
  const { category } = useParams<{category?: string}>();
  const { displayedProducts, setDisplayedProducts } = useShop();
  const { addToCart } = useCart();
  const title = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';
  const { promoHeader, promoText } = promoTexts;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setIsLoading(true);

      const productsInCategory = applyPromosToProducts(products[category], promotions);
      const imgUrls = productsInCategory.map(item => item.imageUrl);
      // const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

      preloadImages(imgUrls)
      .then(() => setDisplayedProducts(productsInCategory)) 
      .catch((error) => console.log('Failed to preload menu images: ', error))
      .finally(() => setIsLoading(false));
    };
    return () => {
      setDisplayedProducts([]);
    };
  }, [category, setDisplayedProducts]);

  const promoProductNodes = getPromosFromAll(products, specialPromos)
    .map(item => <ProductCard key={item.id} product={item} onAddToCart={addToCart} />);

  return (
    <>
    {isLoading ? (
      <FadeInOut className="shop-loading-overlay">
        <div className="spinner" />
      </FadeInOut>
    ) : displayedProducts.length > 0 ? (
      <RenderShop 
        displayedProducts={displayedProducts}
        title={title}
        onAddToCart={addToCart}
        promotions={promoProductNodes}
        promoHeader={promoHeader}
        promoText={promoText}
      />
    ) : ( 
      <ShopLandingPage />
    )}
    </>
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

const RenderShop = ({ displayedProducts, title, onAddToCart, promotions, promoHeader, promoText }: RenderShopProps) => {
  const [promoIsShown, setPromoIsShown] = useState(false);

  useEffect(() => {
    const promoShown = sessionStorage.getItem('promoShown');
    if (!promoShown && promotions?.length) {
      setPromoIsShown(true);
      sessionStorage.setItem('promoShown', 'true');
    };
  }, [promotions]);
  
  return (
    <>
      {promoIsShown && promotions?.length ? <PromoPopup promotions={promotions} header={promoHeader} text={promoText}/> : null}
      <RenderProducts products={displayedProducts} title={title} onAddToCart={onAddToCart} />
    </>
  );
}