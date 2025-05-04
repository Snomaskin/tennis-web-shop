import tennisBallImg from "../assets/tennis-ball.png"
import tennisRacketImg from "../assets/tennis-racket.png"
import appImg from "../assets/appImg.png"
import apparelImg from "../assets/apparel.png"


export type NavItem = {
    label: string;
    id: string;
    path: string;
    menuItems?: { label?:string, id:string, path:string, img?: string }[];
};
const shopItems = [
  { label: 'Racquets', id: 'racquets', path: '/shop/racquets', img: tennisRacketImg },
  { label: 'Balls', id: 'balls', path: '/shop/balls', img: tennisBallImg },
  { label: 'Apparel', id: 'apparel', path: '/shop/apparel', img: apparelImg }
];

const navItems: NavItem[] = [
    {
        label: 'Apps',
        id: 'apps',
        path: '/apps',
        menuItems: [
            { id: 'matchPredictor', path: '/apps', img: appImg},
        ]
    },
    {
        label: 'Shop',
        id: 'shop',
        path: '/shop',
        menuItems: shopItems
    },
    {    
        label: 'About',
        id: 'about',
        path: '/about'
    },
];

const loginNav: NavItem = {
  label: 'Log in',
  id: 'login',
  path: '/login'
}

export { shopItems, navItems, loginNav }