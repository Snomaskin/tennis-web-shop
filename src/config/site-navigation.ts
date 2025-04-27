import tennisBallImg from "../assets/tennis-ball.png"
import tennisRacketImg from "../assets/tennis-racket.png"
import appImg from "../assets/appImg.png"
import apparelImg from "../assets/apparel.png"


export type NavItem = {
    menuName: string;
    menuId: string;
    menuItems?: { label?:string, id:string, path:string, img?: string }[];
};
const shopItems = [
  { label: 'Racquets', id: 'racquets', path: '/shop', img: tennisRacketImg },
  { label: 'Balls', id: 'balls', path: '/shop', img: tennisBallImg },
  { label: 'Apparel', id: 'apparel', path: '/shop', img: apparelImg }
];

const navItems: NavItem[] = [
    {
        menuName: 'Apps',
        menuId: 'apps',
        menuItems: [
            { id: 'matchPredictor', path: '/apps', img: appImg},
        ]
    },
    {
        menuName: 'Shop',
        menuId: 'shop',
        menuItems: shopItems
    },
    {    
        menuName: 'About',
        menuId: 'about',
    },
];

export { shopItems, navItems }