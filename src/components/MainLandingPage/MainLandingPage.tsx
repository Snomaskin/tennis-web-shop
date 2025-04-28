import { MatchPredictor } from "../apps/MatchPredictor";
import { ShopLandingPage } from "../Shop/ShopLandingPage/ShopLandingPage";
import { TextPage } from "../TextCard/TextCard";
import { useText } from "../../data/texts";
import "./MainLandingPage.css"


export const MainLandingPage = () => {
  const { outerText, innerText } = useText('home');

  return (
    <div className="main-landing-container">
      
      <TextPage outerText={outerText} innerText={innerText} />
      
      <ShopLandingPage />
      <div className="main-landing-app-container">
        <MatchPredictor />
      </div>
    </div>
  )
};
