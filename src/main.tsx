import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './main.css'
import { CartProvider } from './components/Shop/Cart/CartContext.tsx';
import { SearchProvider } from './components/Search/SearchContext.tsx';
import { App } from './App.tsx';
import { ImagePreloader } from './components/Navbar/ImagePreloader.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <SearchProvider>
          <App />
          <ImagePreloader />
        </SearchProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);