import { useEffect } from "react";
import { useSearch } from "./SearchContext";
import { useShop } from "../Shop/ShopContext";
import { RenderProducts } from "../Shop/RenderProducts/RenderProducts";
import "../Shop/Shop.css";


export const SearchResults = () => {
  const { searchResults } = useSearch();
  const { displayedProducts, setDisplayedProducts } = useShop();

  useEffect(() => {
    setDisplayedProducts(searchResults || [])
  }, [searchResults, setDisplayedProducts]);

  return (
    <RenderProducts products={displayedProducts} title="Search" />
  );
};