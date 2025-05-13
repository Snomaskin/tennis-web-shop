import { shopItems } from "../../../config/site-navigation";
import { Link } from "react-router-dom";
import { FadeInOut } from "../../utilComponents/FadeInOut";
import "./ShopLandingPage.css";


export const ShopLandingPage = () => (
  <FadeInOut className="shop-landing-container" duration={0.8}>
    <div className="shop-routes">
      {shopItems.map((item) => (
        <Link className="shop-route"
          key={item.id}
          to={item.path}
        >
          <img className="shop-route-img" src={item.img} />
        </Link>
      ))}
    </div>
  </FadeInOut>
);