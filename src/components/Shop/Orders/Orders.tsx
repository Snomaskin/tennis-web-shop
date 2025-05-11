import { useOrder } from "./OrderContext";
import { useAuth } from "../../../auth/AuthContext";
import { OrderType } from "../types";
import { useState, useEffect } from "react";
import "./Orders.css"


export const Orders = () => {
  const { getOrders } = useOrder();
  const { isLoggedIn } = useAuth();
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
    e.preventDefault();
    try {
      const fetchedOrder = await getOrders(lookupValue.trim());
      setOrders(fetchedOrder);
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg("Error fetching order. Please make sure you have entered a valid order number");
    };
  };

  return (
    <div className="orders-main">
      <h1>Orders overview</h1>
      {!isLoggedIn && (
        <form className="order-lookup" onSubmit={handleOrderLookup}>
          <span>Enter order number:</span>
          <input className="order-lookup-input" value={lookupValue} onChange={(e) => setLookupValue(e.target.value)}/>
          <button type="submit">Submit</button>
        </form>
      )}
      {orders && <OrdersList orders={orders}/>}
      {errorMsg && <div className="error-message">{errorMsg}</div>}
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
            const { orderId, products } = order;
            const orderTotal = Math.round(
              products.reduce((acc, item) => acc + item.price, 0) * 100) / 100;

            return (
              <li className="order-list-item" key={orderId} onClick={() => handleOrderSelect(order)}>
                <b>Order:</b> {orderId} <br/>
                <b>Order total:</b> ${orderTotal}
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
       <h1>Order details:</h1> 
       <h2 className="order-id">{orderId}</h2>
      <div className="shipping-details">
        <h3>Shipping to:</h3>
        <div>
          {name} <br/>
          {address}<br/>
          {zipCode} {"\u00A0"}
          {city}<br/>
          {country}
        </div>
      </div>

      <div className="payment-details">
        <h3>Payment:</h3>
        <div>
          Card ending with: {paymentDetails.cardNumber.slice(-4).padStart(paymentDetails.cardNumber.length, '*')}
        </div>
      </div>
      <ul className="order-products-container">
        {products.map(product => {
          const { name, price, quantity } = product;
          return (
            <li className="order-product" key={product.id || name}>
            <div className="product-name">{name}</div>
            <div className="product-price"><strong>Price: $</strong> {price}</div>
            <div className="product-quantity"><strong>Qty:</strong> {quantity}</div>
          </li>
          );
        })}
      </ul>
    </div>
  )
};