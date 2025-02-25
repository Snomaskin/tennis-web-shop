import { Routes, Route } from "react-router-dom";
import { Shop } from "./components/Shop/Shop.tsx"
import { TextPage } from "./components/TextCard/TextCard.tsx";
import { useText } from "./assets/texts.tsx";
import { MatchPredictor } from "./components/apps/MatchPredictor.tsx";


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<TextPage outerText={{title: 'Welcome!', p1: 'Try the functions of my website'}} />} />
            <Route path="/shop" element={<Shop />}/>
            <Route path="/shop/:category" element={<Shop />}/>
            <Route path="/about" element={<TextPage {...useText('about')}/>} />
            <Route path="/home" element={<TextPage {...useText('home')}/>} />
            <Route path="/apps/matchPredictor" element={<MatchPredictor />} />
            <Route path="/apps" element={<MatchPredictor />} />
        </Routes>
);}