import { useEffect } from "react";
import { useSearch } from "./SearchContext";
import { useShop } from "../Shop/ShopContext";
import { RenderProducts } from "../Shop/RenderProducts/RenderProducts";
import { preloadImages } from "../../utils/preloadImages";
import "../Shop/Shop.css";


export const SearchResults = () => {
  const { searchResults } = useSearch();
  const { displayedProducts, setDisplayedProducts } = useShop();

  useEffect(() => {
    const imgUrls = searchResults.map(item => item.imageUrl)

    preloadImages(imgUrls)
    .then(() => setDisplayedProducts(searchResults || [])) 
    .catch((error) => console.log('Failed to preload menu images: ', error));  
    
  }, [searchResults, setDisplayedProducts]);

  return (
    <RenderProducts products={displayedProducts} title="Search" />
  );
};