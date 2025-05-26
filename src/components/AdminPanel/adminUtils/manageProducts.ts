import { firestore } from "../../../config/firebase";
import { collection, query, where, getDocs, getDoc, doc, addDoc, deleteDoc, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Product, ProductCategory } from "../../../data/products";

const productFirestoreConverter = {
  toFirestore(product: Product): DocumentData {
    return {
      name: product.name,
      price: product.price,
      imageUrl:product.imageUrl
    };
  },

  fromFirestore(snapshot: QueryDocumentSnapshot): Product {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      name: data.name,
      price: data.price,
      imageUrl: data.imageUrl,
    };
  }
};

const productsRef = collection(firestore, "products").withConverter(productFirestoreConverter);

function getProductRef(id: string) {
  return doc(firestore, "product", id).withConverter(productFirestoreConverter);
};

async function listProducts(category?: keyof ProductCategory) {
  const q = category 
    ? query(productsRef, where("category", "==", category))
    : productsRef;
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
};

async function findProduct(identifier: string) {
  const snapshot = await getDoc(getProductRef(identifier));
  if (!snapshot.exists()) return [];
  return [snapshot.data()];
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

export { listProducts, findProduct, addProduct, deleteProduct };