import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../../assets/products";


export interface CartItemType extends Product {
    quantity: number
};

type CartContextType = {
    cart: CartItemType[],
    addToCart: (product: Product) => void,
    removeFromCart: (id: Product['id']) => void,
    clearCart: () => void;
    checkoutCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ( { children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItemType[]>(() => {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => (localStorage.setItem("cart", JSON.stringify(cart))), [cart])
    const navigate = useNavigate();


    const addToCart = (product: Product) => {
        setCart((prevCart) => {
          const existingProduct = prevCart.find((item) => item.id === product.id);
          if (existingProduct) {
            return prevCart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
          }
          return [...prevCart, { ...product, quantity: 1 }];
        });
      };

    const removeFromCart = (productId: Product['id']) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
    };

    const clearCart = () => setCart([]);

    const checkoutCart = () => navigate('/checkout');

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, checkoutCart }}>
          {children}
        </CartContext.Provider>
      );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context){
        throw new Error("useCart must be used within a CartProvider");
    };
    return context;
};