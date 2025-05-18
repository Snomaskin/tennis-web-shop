import type { Product } from "../../../data/products";
import { ProductCard } from "../productCards/ProductCard";
import { TextPage } from "../../TextCard/TextCard";
import { FadeInOut } from "../../utilComponents/FadeInOut";
import { SortProducts } from "../SortProducts/SortProducts";


export const RenderProducts = (
  { products, title, onAddToCart }: 
  { products: Product[], title?: string, onAddToCart: (product: Product) => void}) => (
    <FadeInOut className="shop" duration={0.8}>
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
    </FadeInOut>
);