import { useState } from "react";
import { NavItem } from "../../config/site-navigation";
import { Link } from "react-router-dom";
import { Cart } from "../Shop/Cart/Cart";
import { useSearch } from "../Search/SearchContext";
import { SearchInput } from "../Search/SearchInput";
import { navItems } from '../../config/site-navigation';
import { AuthModalManager } from "../../auth/AuthModalManager";
import { useAuth } from "../../auth/AuthContext";
import searchIcon from "../../assets/search.png"
import closeIcon from "../../assets/close.png"
import classNames from "classnames";
import "./Navbar.css";


export const Navbar = () => {
  const [hoveredid, setHoveredid] = useState<string | null>(null);
  const { isSearching, setIsSearching } = useSearch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const handleNavClick = () => {
      setIsSearching(false);
  };

  return (
    <nav className="navbar">
      {navItems.map((item) => (
        <div 
          className="nav-container" 
          key={item.id}
          onMouseEnter={() => setHoveredid(item.id)}
          onMouseLeave={() => setHoveredid(null)}
        >
          <Link 
            className="nav" 
            to={item.path} 
            onClick={handleNavClick}>
              {item.label}
          </Link>
          {hoveredid === item.id && <HoveredMenu menu={item} onItemClick={handleNavClick} />}
        </div>
      ))}
      <SearchToggle isSearching={isSearching} setIsSearching={setIsSearching} />
      <div className="navbar-right">
        <LoginNav 
          label={isLoggedIn ? "Log out" : "Log in"}
          onClick={isLoggedIn ? logout :  () => setShowLoginModal(true)}/>
        {showLoginModal && <AuthModalManager onClose={() => setShowLoginModal(false)} /> }
        <Cart />
      </div>
    </nav>  
  );
};

const HoveredMenu = (
  { menu, onItemClick }: 
  { menu: NavItem; 
    onItemClick: () => void; }) => {
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const handleClick = (id: string) => {
      setActiveItem(id);
      onItemClick();
    };

    return (
      <div className="dropdown">
        {menu.menuItems?.map((item) => (
          <Link
            className={classNames('list-item', {
              'pop-out': activeItem === item.id
            })} 
            key={item.id} 
            to={item.path}
            onClick={() => handleClick(item.id)}
          >
            <img 
              className={menu.id === "shop" ? "shop-icon" : "app-icon"} 
              src={item.img} 
            />
            {item.label ? <label htmlFor={item.id}>{item.label}</label> : null}
          </Link>
        ))}
      </div>
    );
};

const SearchToggle = (
  { isSearching, setIsSearching }: 
  { isSearching: boolean, setIsSearching: React.Dispatch<React.SetStateAction<boolean>> }) => (
    <div className={classNames('nav-container search-container', {
      'searching': isSearching
    })}>
      <div className="nav" onClick={() => setIsSearching((prev) => !prev)}>
        <img className="search-icon" src={!isSearching ? searchIcon : closeIcon}/>
      </div>
      {isSearching && <SearchInput />}
    </div>
);

const LoginNav = ({ label, onClick }: { label: string, onClick: () => void }) => (
  <button 
    className="nav"
    onClick={onClick}
  >
    {label}
  </button>
);