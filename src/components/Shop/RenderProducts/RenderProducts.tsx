import type { Product } from "../../../assets/products";
import { ProductCard } from "../productCards/ProductCard";
import { SortProducts } from "../SortProducts/SortProducts";
import { useCart } from "../Cart/CartContext";
import { TextPage } from "../../TextCard/TextCard";


export const RenderProducts = ({ products, title }: { products: Product[], title?: string }) => {
  const { addToCart } = useCart();
  
  return (
      <div className="shop">
        <SortProducts title={title}/>
        <div className="products-container">
            {products.length > 0 ? (
              products.map((item) => (
                  <ProductCard 
                      key={item.id}
                      product={item}
                      onAddToCart={addToCart}
                  />
                ))
            ) : (
              <TextPage outerText={{p1: 'No products found'}} />
            )}
        </div>
      </div>
  );
}

