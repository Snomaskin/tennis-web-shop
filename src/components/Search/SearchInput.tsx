import classNames from "classnames";
import { useSearch } from "./SearchContext";
import "./SearchInput.css"



export const SearchInput = () => {
  const { handleSearch } = useSearch();
  
  return (
    <input
      type="text"
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search products..."
      className={classNames('search-input', 'fade-in')}
      autoFocus
    />
  );
};