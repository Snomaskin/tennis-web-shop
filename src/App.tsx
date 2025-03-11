import { AppRoutes } from './AppRoutes';
import { Navbar } from './components/Navbar/Navbar';
import { menuItems } from './components/Navbar/config/navbar';
import { SearchResults } from './components/Search/SearchResults';
import { useSearch } from './components/Search/SearchContext';


export function App() {
    const { searchResults, isSearching } = useSearch();
  
    return (
      <div className='main background-container'>
        <Navbar menuItems={menuItems} />
        {isSearching ? 
          <SearchResults searchResults={searchResults} />
          : 
          <AppRoutes />
        }
      </div>
    );
  }