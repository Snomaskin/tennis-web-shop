import { useOrder } from "./OrderContext";
import { useAuth } from "../../../auth/AuthContext";
import { OrderType } from "../types";
import { useState, useEffect } from "react";


export const Orders = () => {
  const { getOrders } = useOrder();
  const { currentUser, isLoggedIn } = useAuth();
  const [orders, setOrders] = useState<OrderType[] | null>(null);
  const [lookupValue, setLookupValue] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (isLoggedIn) {
        const fetchedOrders = await getOrders();
        if (fetchedOrders) {
          setOrders(fetchedOrders);
        };
      } else {
        setOrders(null);
      };
    };  
    fetchOrders();
  }, [isLoggedIn]);

  const handleOrderLookup = async (e: React.FormEvent) => {
    e.preventDefault;
    try {
      const fethedOrder = await getOrders(lookupValue.trim());
      setOrders(fethedOrder);
    } catch (error) {
      setErrorMsg("Error fetching order. Please make sure you have entered a valid order number");
      console.error("Error fetching order: ", error)
    };
  };

  return (
    <div className="orders-main">
      {!isLoggedIn && (
        <form className="order-lookup" onSubmit={handleOrderLookup}>
          <input className="order-lookup-input" value={lookupValue} onChange={(e) => setLookupValue(e.target.value)}/>
          <button type="submit">Submit</button>
        </form>
      )}
      {isLoggedIn || orders && <OrdersList orders={orders}/>}
    </div>
  );
};

const OrdersList = ({ orders }: { orders: OrderType[] }) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  const handleOrderSelect = (order: OrderType) => {
    setSelectedOrder(order);
  };

  const handleOrderReturn = () => {
    setSelectedOrder(null);
  };

  return(
    <div className="orders-display">
      <ul className="orders-list">
        {orders.length > 0 
          ? orders.map(order => {
            const { orderId, products, shippingDetails } = order;
            const recepient = shippingDetails.name;
            const productsLen = products.length;

            return (
              <li className="order-list-item" id={orderId} onClick={() => handleOrderSelect(order)}>
                Order: {orderId} Recepient: {recepient} Number of Items: {productsLen}
              </li>
            )
          }) 
          : null
        }
      </ul>
      {selectedOrder && <OrderDetails order={selectedOrder} onReturn={handleOrderReturn} />}
    </div>
  );
};

const OrderDetails = ({ order, onReturn }: { order: OrderType, onReturn: () => void }) => {
  const { orderId, products, shippingDetails, paymentDetails } = order;
  const { name, address, zipCode, city, country } = shippingDetails;
  return (
    <div className="order-details">
      <button onClick={onReturn} />
      <h2 className="order-id"> {orderId}</h2>
      <div className="shipping-details">
        <h3>Shipping to:</h3>
        Name: {name} <br/>
        Address: {address}
        Zip Code: {zipCode} <br/>
        City: {city}
        Country: {country}
      </div>

      <div className="payment-details">
        <h3>Payment</h3>
        Card ending with: {paymentDetails.cardNumber.slice(-4).padStart(paymentDetails.cardNumber.length, '*')}
      </div>
      <ul className="order-products-container">
        {products.map(product => {
          const { name, price, quantity } = product;
          return (
          <li className="order-product">
            {name}, Price: {price}, Qty: {quantity}
          </li>)
        })}
      </ul>
    </div>
  )
};