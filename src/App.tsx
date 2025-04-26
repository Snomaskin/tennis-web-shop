import { AppRoutes } from './AppRoutes';
import { Navbar } from './components/Navbar/Navbar';
import { navItems } from './config/site-navigation';
import { SearchResults } from './components/Search/SearchResults';
import { useSearch } from './components/Search/SearchContext';


export function App() {
  const {  isSearching } = useSearch();

  return (
    <div className='main background-container'>
      <Navbar navItems={navItems} />
      {isSearching ? 
        <SearchResults />
        : 
        <AppRoutes />
      }
    </div>
  );
}