import { createContext, useContext, ReactNode, useState } from "react";
import { firestore } from "../../../config/firebase";
import { collection, query, where, getDocs, getDoc, doc, addDoc } from "firebase/firestore";
import { useAuth } from "../../../auth/AuthContext";
import { useCart } from "../Cart/CartContext";
import { OrderType, ShippingInfo, PaymentInfo } from "../types";


interface OrderContextType {
  tempOrder: OrderType;
  setTempOrder: React.Dispatch<React.SetStateAction<OrderType>>;
  placeOrder: (shippingDetails: ShippingInfo, paymentDetails: PaymentInfo) => Promise<void>;
  getOrders: (identifier?: string) => Promise<OrderType[] | null>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const OrderProvider = ({ children }: {children: ReactNode}) => {
  const { currentUser, isLoggedIn } = useAuth();
  const { cart, clearCart } = useCart();
  const [tempOrder, setTempOrder] = useState<OrderType>({
    orderId: "",
    products: [],
    shippingDetails: {
      name: "",
      address: "",
      city: "",
      zipCode: "",
      country: ""
    },
    paymentDetails: {
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: ""
    },
  });

  const placeOrder = async (shippingDetails: ShippingInfo, paymentDetails: PaymentInfo) => {
    if (cart.length === 0) return;
    
    const orderDetails = { 
      userId: isLoggedIn ? currentUser?.userId : null,
      products: cart,
      shippingDetails,
      paymentDetails: {
        cardNumber: paymentDetails.cardNumber.slice(-4).padStart(16, '*'),
        cardHolder: paymentDetails.cardHolder,
        expiryDate: paymentDetails.expiryDate,
        cvv: "***"
      }
    };

    try {
      const docRef = await addDoc(collection(firestore, "orders"), orderDetails);
      const finalOrder = { 
        ...orderDetails, 
        orderId: docRef.id 
      };
      
      setTempOrder(finalOrder as OrderType);
      clearCart();
      
      return;
    } catch (error) {
      console.error("Error placing order: ", error);
      throw error;
    }
  };

  const getOrders = async (identifier?: string) => {
    if (!identifier && isLoggedIn) {
      const userId = currentUser?.userId;
      if (!userId) return [];

        const ordersRef = collection(firestore, "orders");
        const q = query(ordersRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const orders = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          orderId: doc.id,
        }));
        
        return orders as OrderType[];
      }
      
      if (identifier) {
        const docRef = doc(firestore, "orders", identifier);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const order = { ...docSnap.data(), orderId: docSnap.id };
          return [order] as OrderType[];
        } else {
          throw new Error("Order not found")
        };
      };
    throw new Error("Invalid function call");
  };

  return (
    <OrderContext.Provider value={{ tempOrder, setTempOrder, placeOrder, getOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider.")
  };
  return context;
};

export { OrderProvider, useOrder };