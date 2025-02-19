import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './main.css'
import { CartProvider } from './components/Shop/CartContext.tsx';
import { SearchProvider } from "./components/Search/SearchContext.tsx";
import { AppRoutes } from './AppRoutes';
import { Navbar } from './components/Navbar/Navbar';
import { menuItems } from './components/Navbar/config/navbar';
import { SearchResults } from './components/Search/SearchResults';
import { useSearch } from './components/Search/SearchContext';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);

function App() {
  const { searchResults, isSearching } = useSearch();

  return (
    <div className='main background-container'>
      <Navbar menuItems={menuItems} />
      {isSearching ? (
        <SearchResults searchResults={searchResults} />
      ) : (
        <AppRoutes />
      )}
    </div>
  );
}