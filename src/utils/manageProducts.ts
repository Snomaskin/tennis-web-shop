import { firestore } from "../config/firebase";
import { collection, query, where, getDocs, doc, addDoc, deleteDoc, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Product, ProductCategory } from "../data/products";
import { applyPromosToProducts } from "./promoUtils";
import { Promotion } from "../data/products";
import { preloadImages } from "./preloadImages";


const productFirestoreConverter = {
  toFirestore(product: Product): DocumentData {
    return {
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl
    };
  },

  fromFirestore(snapshot: QueryDocumentSnapshot): Product {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      originalId: data.originalId,
      name: data.name,
      price: data.price,
      imageUrl: data.imageUrl,
    };
  }
};

const productsRef = collection(firestore, "products").withConverter(productFirestoreConverter);

function getProductRef(id: string) {
  return doc(firestore, "products", id).withConverter(productFirestoreConverter);
};

async function listProducts(category?: keyof ProductCategory) {
  const q = category 
    ? query(productsRef, where("category", "==", category))
    : productsRef;
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
};

async function fetchShopProducts(category?: string, promotions?: Promotion[]) {
  let products: Product[] = [];
  products = await listProducts(category);
  if (promotions) products = applyPromosToProducts(products, promotions);
  const imgUrls = products.map(item => item.imageUrl);
  // const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
  await preloadImages(imgUrls);
  return products;
};

async function findProduct(searchterm: string) {
  const allProducts = await listProducts();
  const matches = allProducts.filter(product => 
    product.name.toLocaleLowerCase().includes(searchterm.toLocaleLowerCase()));
  return matches;
};

async function addProduct(product: Product) {
  try {
    await addDoc(productsRef, product);
    return "Product added successfully!"
  } catch (error) {
    console.error("Error adding product: ", error)
    throw error;
  };
};

async function deleteProduct(firebaseId: string) {
  try {
    await deleteDoc(getProductRef(firebaseId));
    return "Product deleted successfully!"
  } catch (error) {
    console.error("Error deleting product: ", error)
    throw error;
  };
};

export { listProducts, findProduct, fetchShopProducts, addProduct, deleteProduct };