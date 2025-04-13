import { useShop } from "../ShopContext";
import type { SortField } from "../ShopContext";
import type { Options } from "../ShopContext";
import sortArrows from "../../../assets/sort-arrows.png";
import { useState, useEffect } from "react";
import classNames from "classnames";
import "./SortProducts.css"


export const SortProducts = ({ title }: { title?: string }) => {
  const { sortProducts, options } = useShop();
  const [collapsed, setCollapsed] = useState<boolean>(window.innerWidth <= 500);

  // useEffect because otherwise 'collapsed' remains 'true' when window size increases.
  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth > 500) {
        setCollapsed(false)
      } else {
        setCollapsed(true)
      }
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const getSelectedOption = (): SortField | undefined => {
    if (options.price) return 'price';
    if (options.name) return 'name';
    return undefined;
  };

  const selectedOption = getSelectedOption();

  const handleCheckboxClick = (key: SortField) => {
    sortProducts(key);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  }

  const sortOptions = [
    { key: 'price', label: 'Price' },
    { key: 'name', label: 'Name' }
  ];

  return (
    <>
      <div className={classNames('sort-container', {
              'collapsed': collapsed
            })}>
        <div className="title-row">
          <h2>{title}</h2>
          <button 
            className="toggle-sort" 
            onClick={toggleCollapse}
            aria-label={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? "☰" : "<"}
          </button>
        </div>
        <h3>Sort by:</h3>
        {sortOptions.map(item => {
          const key = item.key as SortField;
          
          return ( 
            <div 
            className="sort-option"
            key={key}>
              <label htmlFor={key}>{item.label}</label>
              <input 
                type="checkbox"
                id={key}
                checked={options[key]}
                onChange={() => handleCheckboxClick(key)}
                disabled={selectedOption !== undefined && selectedOption !== key}
              />
              <button 
                onClick={() => sortProducts(`${key}_asc` as keyof Options, true)}
                disabled={!options[key]}
              >
                <img 
                  src={sortArrows} 
                />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

