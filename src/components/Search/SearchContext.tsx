import React, { createContext, useContext, useState } from 'react';
import { Product, products } from '../../data/products';


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

    const handleSearch = (searchTerm: string) => {
        if (!searchTerm.trim()) {
          setSearchResults([]);
          return;
        }

        const searchTermLowerCase = searchTerm.toLowerCase();
        const results = Object.values(products)
          .flat()
          .filter(product => product.name.toLowerCase().includes(searchTermLowerCase));

        setSearchResults(results);
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
