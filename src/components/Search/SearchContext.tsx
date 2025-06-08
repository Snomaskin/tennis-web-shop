import React, { createContext, useContext, useState } from 'react';
import { Product } from '../../data/products';
import { findProduct } from '../../utils/manageProducts';


interface SearchContextType {
    searchResults: Product[];
    isSearching: boolean;
    setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
    handleSearch: (searchTerm: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (searchterm: string) => {
        if (!searchterm.trim()) {
          setSearchResults([]);
          return;
        };
        const products = await findProduct(searchterm)
        setSearchResults(products);
    };

    return (
        <SearchContext.Provider value={{ searchResults, isSearching, setIsSearching, handleSearch }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};
