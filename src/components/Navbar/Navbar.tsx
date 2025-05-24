import { useState, useRef } from "react";
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
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { isSearching, setIsSearching } = useSearch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNavClick = () => {
      setIsSearching(false);
      setIsMenuVisible(false);
  };

  const handleMouseEnter = (item: NavItem) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    setHoveredId(item.id);
    setIsMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setIsMenuVisible(false);

    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredId(null);
    }, 300); 
  };

  return (
    <nav className="navbar">
      {navItems.map((item) => {
        const isHovered = hoveredId === item.id;
        return (
          <div 
            className="nav-container" 
            key={item.id}
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
          >
            <Link 
              className="nav" 
              to={item.path} 
              onClick={handleNavClick}>
                {item.label}
            </Link>

              {isHovered && (
                <HoveredMenu 
                  menu={item} 
                  onItemClick={handleNavClick}
                  isVisible={isMenuVisible}
                />
              )}

          </div>
       )
      })}
      <SearchToggle isSearching={isSearching} setIsSearching={setIsSearching} />
      <div className="navbar-right">
        <LoginNav 
          label={isLoggedIn ? "Log out" : "Log in"}
          onClick={isLoggedIn ? logout :  () => setShowLoginModal(true)}/>
        {showLoginModal && <AuthModalManager onClose={() => setShowLoginModal(false)} /> }
        <div className="nav-container">
          <Link
            className="nav"
            to="/orders"
            onClick={handleNavClick}
          >
            Orders
          </Link>
        </div>
        <Cart />
      </div>
    </nav>  
  );
};

const HoveredMenu = (
  { menu, 
    onItemClick, 
    isVisible 
  }: 
  { menu: NavItem; 
    onItemClick: () => void;
    isVisible: boolean;
  }) => {
    
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const handleClick = (id: string) => {
      setActiveItem(id);
      onItemClick();
    };

    return (
      <div className={classNames("dropdown", { "visible": isVisible })}>
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