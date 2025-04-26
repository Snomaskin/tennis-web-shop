import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../../data/products.ts"
import customSort from "../../utils/sortArray.ts";


const sortFields = ['name', 'price'] as const satisfies readonly (keyof Product)[];
export type SortField = typeof sortFields[number];
export type Options = Record<SortField, boolean> & Record<`${SortField}_asc`, boolean>;

interface ShopContextType {
    displayedProducts: Product[];
    setDisplayedProducts: (products: Product[]) => void;
    sortProducts: (option: keyof Partial<Options>, asc?: boolean) => void;
    options: Options; 
};

export const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [options, setOptions] = useState<Options>({
      name: false,
      name_asc: true,
      price: false,
      price_asc: true,
  });

  const sortProducts = (option: keyof Partial<Options>, dsc?: boolean) => {
    const isField = sortFields.includes(option as SortField);
    
    const newOptions: Options = { ...options };
    
    if (isField) {
      newOptions[option as SortField] = !options[option as SortField];
    } else if (dsc) {
      const field = option.replace('_asc', '') as SortField;
      newOptions[field] = true; 
      newOptions[`${field}_asc` as keyof Options] = !options[`${field}_asc` as keyof Options];
    };
    
    setOptions(newOptions);
    
    const fields = sortFields
      .filter(field => newOptions[field])
      .map(field => ({
        field: field as keyof Product,
        direction: (newOptions[`${field}_asc` as keyof Options] ? 'asc' : 'dsc') as 'asc' | 'dsc',  
      }));
        
    if (displayedProducts.length > 0 && fields.length > 0) {
      const sortedProducts = customSort({ arr: displayedProducts, fields });
      setDisplayedProducts(sortedProducts);
    };
  };

  return (
    <ShopContext.Provider
      value={{
        displayedProducts,
        setDisplayedProducts,
        sortProducts,
        options, 
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider"); 
  };
  return context;
}