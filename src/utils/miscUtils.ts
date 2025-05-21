import { ProductCategory } from "../data/products";

function mapProductCategory (products: ProductCategory) {
  return (
    Object.entries(products).flatMap(([category, products]) =>  (
    products.map((product) => ({...product, category: category}))))
  );
}

export { mapProductCategory };