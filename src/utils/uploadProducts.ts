import { firestore } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { products } from "../data/products";


async function uploadProductsToFirestore() {
  console.log("Init upload to Firestore...");
  
  try {
    const productsCollection = collection(firestore, "products");
    let totalUploaded = 0;

    for (const [category, categoryProducts] of Object.entries(products)) {
      console.log(`Uploading ${categoryProducts.length} products from category: ${category}`);
      

      for (const product of categoryProducts) {

        const { id, ...productRest } = product;
        const productToUpload = {
          ...productRest,
          category: category,
          originalId: id,
          createdAt: serverTimestamp()
        };


        const docRef = await addDoc(productsCollection, productToUpload);
        console.log(`Uploaded ${product.name} with Firestore ID: ${docRef.id}`);
        totalUploaded++;
      }
    }

    console.log(`Successfully uploaded ${totalUploaded} products to Firestore!`);
    return { success: true, totalUploaded };

  } catch (error) {
    console.error("Error uploading products:", error);
    throw error;
  }
}

export { uploadProductsToFirestore };