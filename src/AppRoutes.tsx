import { Routes, Route } from "react-router-dom";
import { Shop } from "./components/Shop/Shop.tsx"
import { TextPage } from "./components/TextCard/TextCard.tsx";
import { useText } from "./data/texts.ts";
import { MatchPredictor } from "./components/apps/MatchPredictor.tsx";
import { Checkout } from "./components/Shop/Checkout/Checkout.tsx";


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<TextPage {...useText('home')}/>} />
            <Route path="/apps" element={<MatchPredictor />} />
            <Route path="/apps/matchPredictor" element={<MatchPredictor />} />
            <Route path="/shop" element={<Shop />}/>
            <Route path="/shop/:category" element={<Shop />}/>
            <Route path="/about" element={<TextPage {...useText('about')}/>} />
            <Route path="/checkout" element={<Checkout />}/>
        </Routes>
    );
}