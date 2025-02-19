import { useSearch } from "./SearchContext";
import "./SearchInput.css"
import { useEffect, useState } from "react";


export const SearchInput = () => {
    const { handleSearch } = useSearch();
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    return (
        <input
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search products..."
            className={`search-input ${mounted ? "active" : ""}`} 
            autoFocus
        />
    );
};