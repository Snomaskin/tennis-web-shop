import { Routes, Route } from "react-router-dom";
import { MainLandingPage } from "./components/MainLandingPage/MainLandingPage.tsx";
import { TextPage } from "./components/TextCard/TextCard.tsx";
import { Shop } from "./components/Shop/Shop.tsx"
import { useText } from "./data/texts.ts";
import { MatchPredictor } from "./components/apps/MatchPredictor.tsx";
import { Checkout } from "./components/Shop/Checkout/Checkout.tsx";
import { Orders } from "./components/Shop/Orders/Orders.tsx";
import { AdminPanel } from "./components/AdminPanel/AdminPanel.tsx";
import { ManageLanding } from "./components/AdminPanel/ManageLanding.tsx";


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLandingPage />} />
            <Route path="/apps" element={<MatchPredictor />} />
            <Route path="/apps/matchPredictor" element={<MatchPredictor />} />
            <Route path="/shop" element={<Shop />}/>
            <Route path="/shop/:category" element={<Shop />}/>
            <Route path="/about" element={<TextPage {...useText('about')}/>} />
            <Route path="/checkout" element={<Checkout />}/>
            <Route path="/orders" element={<Orders />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/manageLanding" element={<ManageLanding />} />
        </Routes>
    );
}