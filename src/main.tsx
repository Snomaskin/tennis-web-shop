import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from './components/Shop/Cart/CartContext.tsx';
import { SearchProvider } from './components/Search/SearchContext.tsx';
import { App } from './App.tsx';
import { ImagePreloader } from './components/utilComponents/ImagePreloader.tsx';
import { CheckoutProvider } from './components/Shop/Checkout/CheckoutContext.tsx';
import { ShopProvider } from './components/Shop/ShopContext.tsx';
import { AuthProvider } from './auth/AuthContext.tsx';
import { OrderProvider } from './components/Shop/Orders/OrderContext.tsx';
import './main.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <CheckoutProvider>
              <ShopProvider>
                <SearchProvider>
                  <App />
                  <ImagePreloader />
                </SearchProvider>
              </ShopProvider>
            </CheckoutProvider>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);