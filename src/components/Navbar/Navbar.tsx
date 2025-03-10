import { useState } from "react";
import { MenuItem } from "./config/navbar";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Cart } from "./Cart";
import { useSearch } from "../Search/SearchContext";
import { SearchInput } from "../Search/SearchInput";
import searchIcon from "../../assets/search.png"
import closeIcon from "../../assets/close.png"


interface NavbarProps {
    menuItems: MenuItem[]; 
}

export const Navbar = ({ menuItems }: NavbarProps) => {
    const [ShowHoveredMenu, setShowHoveredMenu] = useState<string | null>(null);
    const { isSearching, setIsSearching } = useSearch()

    const handleNavClick = () => {
        setIsSearching(false);
    };

    return (
        <nav className="navbar">
            {menuItems.map((items) => (
                <div 
                    className="nav-container" 
                    key={items.menuId}
                    onMouseEnter={() => setShowHoveredMenu(items.menuId)}
                    onMouseLeave={() => setShowHoveredMenu(null)}
                >
                    <Link className="nav" 
                        to={`/${items.menuId}`} 
                        onClick={handleNavClick}>
                            {items.menuName}
                    </Link>
                    {ShowHoveredMenu === items.menuId && <HoveredMenu items={items} onItemClick={handleNavClick} />}
                </div>
            ))}
            <div className={`nav-container search-container ${isSearching ? 'searching' : ''}`}>
                <div className="nav" onClick={() => setIsSearching((prev) => !prev)}>
                    <img className="search-icon" src={ !isSearching ? searchIcon : closeIcon}/>
                </div>
                {isSearching && <SearchInput />}
            </div>
            <div className="navbar-right">
                <Cart />
            </div>
        </nav>  
    );
};

const HoveredMenu = ({ items, onItemClick }: { items: MenuItem; onItemClick: () => void; }) => {
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const handleClick = (id: string) => {
        setActiveItem(id);
        onItemClick();
    };

    return (
        <div className="dropdown">
            {items.menuItems?.map((item) => (
                <Link
                    className={`list-item ${activeItem === item.id ? "pop-out" : ""}`} 
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