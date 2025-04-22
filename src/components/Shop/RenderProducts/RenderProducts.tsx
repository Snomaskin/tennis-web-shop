import type { Product } from "../../../assets/products";
import { ProductCard } from "../productCards/ProductCard";
import { SortProducts } from "../SortProducts/SortProducts";
import { TextPage } from "../../TextCard/TextCard";


export const RenderProducts = (
  { products, title, onAddToCart }: 
  { products: Product[], title?: string, onAddToCart: (product: Product) => void}) => (
    <div className="shop">
      <SortProducts title={title}/>
      <div className="products-container">
        {products.length > 0 ? (
          products.map((item) => (
            <ProductCard 
              key={item.id}
              product={item}
              onAddToCart={onAddToCart}
            />
          ))
        ) : (
          <TextPage outerText={{p1: 'No products found'}} />
        )}
      </div>
    </div>
);