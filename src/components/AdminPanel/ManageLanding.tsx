import { navbarRight } from "../../config/site-navigation";
import { FadeInOut } from "../utilComponents/FadeInOut";
import { Link } from "react-router-dom";


export const ManageLanding = () => {

  return (
  <FadeInOut className="shop-landing-container" duration={0.8}>
    <div className="shop-routes">
      {navbarRight[0].menuItems && navbarRight[0].menuItems.map((item) => (
        <Link className="shop-route"
          key={item.id}
          to={item.path}
        >
          <img className="shop-route-img" src={item.img} />
        </Link>
      ))}
    </div>
  </FadeInOut>
  )
}