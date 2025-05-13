import { MatchPredictor } from "../apps/MatchPredictor";
import { ShopLandingPage } from "../Shop/ShopLandingPage/ShopLandingPage";
import { TextPage } from "../TextCard/TextCard";
import { useText } from "../../data/texts";
import { FadeInOut } from "../utilComponents/FadeInOut";
import "./MainLandingPage.css"


export const MainLandingPage = () => {
  const { outerText, innerText } = useText('home');

  return (
    <FadeInOut className="main-landing-container" duration={0.8}>
      
      <TextPage outerText={outerText} innerText={innerText} />
      
      <ShopLandingPage />
      <div className="main-landing-app-container">
        <MatchPredictor />
      </div>
    </FadeInOut>
  )
};
