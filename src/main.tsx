import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './main.css'
import { CartProvider } from './components/Shop/Cart/CartContext.tsx';
import { SearchProvider } from './components/Search/SearchContext.tsx';
import { App } from './App.tsx';
import { ImagePreloader } from './components/Navbar/ImagePreloader.tsx';
import { CheckoutProvider } from './components/Shop/Checkout/CheckoutContext.tsx';
import { ShopProvider } from './components/Shop/ShopContext.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <CheckoutProvider>
          <ShopProvider>
            <SearchProvider>
              <App />
              <ImagePreloader />
            </SearchProvider>
          </ShopProvider>
        </CheckoutProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);