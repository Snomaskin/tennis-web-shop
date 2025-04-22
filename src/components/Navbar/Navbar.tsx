import { useState } from "react";
import { NavItem } from "./config/navbar";
import { Link } from "react-router-dom";
import { Cart } from "../Shop/Cart/Cart";
import { useSearch } from "../Search/SearchContext";
import { SearchInput } from "../Search/SearchInput";
import searchIcon from "../../assets/search.png"
import closeIcon from "../../assets/close.png"
import classNames from "classnames";
import "./Navbar.css";


interface NavbarProps {
    navItems: NavItem[]; 
}

export const Navbar = ({ navItems }: NavbarProps) => {
  const [hoveredMenuId, setHoveredMenuId] = useState<string | null>(null);
  const { isSearching, setIsSearching } = useSearch()

  const handleNavClick = () => {
      setIsSearching(false);
  };

  return (
    <nav className="navbar">
      {navItems.map((items) => (
        <div 
          className="nav-container" 
          key={items.menuId}
          onMouseEnter={() => setHoveredMenuId(items.menuId)}
          onMouseLeave={() => setHoveredMenuId(null)}
        >
          <Link className="nav" 
            to={`/${items.menuId}`} 
            onClick={handleNavClick}>
              {items.menuName}
          </Link>
          {hoveredMenuId === items.menuId && <HoveredMenu items={items} onItemClick={handleNavClick} />}
        </div>
      ))}
      <SearchToggle isSearching={isSearching} setIsSearching={setIsSearching} />
      <div className="navbar-right">
        <Cart />
      </div>
    </nav>  
  );
};

const HoveredMenu = (
  { items, onItemClick }: 
  { items: NavItem; 
    onItemClick: () => void; }) => {
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const handleClick = (id: string) => {
      setActiveItem(id);
      onItemClick();
    };

    return (
      <div className="dropdown">
        {items.menuItems?.map((item) => (
          <Link
            className={classNames('list-item', {
              'pop-out': activeItem === item.id
            })} 
            key={item.id} 
            to={`${item.path}/${item.id}`}
            onClick={() => handleClick(item.id)}
          >
            <img 
              className={items.menuId === "shop" ? "shop-icon" : "app-icon"} 
              src={item.img} 
              />
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
)