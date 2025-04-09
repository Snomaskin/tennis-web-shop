import { useShop } from "../ShopContext";
import type { SortField } from "../ShopContext";
import type { Options } from "../ShopContext";
import filterArrows from "../../../assets/filter-arrows.png";
import "./SortProducts.css"


export const SortProducts = ({ title }: { title?: string }) => {
  const { sortProducts, options } = useShop();

  const getSelectedOption = (): SortField | undefined => {
    if (options.price) return 'price';
    if (options.name) return 'name';
    return undefined;
  };

  const selectedOption = getSelectedOption();

  const handleCheckboxClick = (key: SortField) => {
    sortProducts(key);
  };

  const filterOptions = [
    { key: 'price', label: 'Price' },
    { key: 'name', label: 'Name' }
  ];

  return (
    <div className="filter-container">
      <h2>{title}</h2>
      <h3>Sort by:</h3>
      {filterOptions.map(item => {
        const key = item.key as SortField;
        
        return (
          <div className="filter-option" key={key}>
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
                src={filterArrows} 
              />
            </button>
          </div>
        );
      })}
    </div>
  );
};