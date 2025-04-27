import { shopItems } from "../../../config/site-navigation";
import { Link } from "react-router-dom";
import "./ShopLandingPage.css"


export const ShopLandingPage = () => {
  return (
    <div className="shop-landing-container">
      <div className="shop-routes">
        {shopItems.map((item) => (
          <Link className="shop-route"
            key={item.id}
            to={`/shop/${item.id}`}
          >
            <img className="shop-route-img" src={item.img} />
          </Link>
        ))}
      </div>
    </div>
  )
}