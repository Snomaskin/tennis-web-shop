import tennisBallImg from "../assets/tennis-ball.png"
import tennisRacketImg from "../assets/tennis-racket.png"
import appImg from "../assets/appImg.png"
import apparelImg from "../assets/apparel.png"
import adminImg from "../assets/admin.png"
import ordersImg from "../assets/orders.png"


export type NavItem = {
    label: string;
    id: string;
    path: string;
    menuItems?: { label?:string, id:string, path:string, img?: string, imgStyle?: string }[];
};
const shopItems = [
  { label: 'Racquets', id: 'racquets', path: '/shop/racquets', img: tennisRacketImg, imgStyle: "small" },
  { label: 'Balls', id: 'balls', path: '/shop/balls', img: tennisBallImg, imgStyle: "small" },
  { label: 'Apparel', id: 'apparel', path: '/shop/apparel', img: apparelImg, imgStyle: "small" }
];

const navbarLeft: NavItem[] = [
  {
    label: 'Apps',
    id: 'apps',
    path: '/apps',
    menuItems: [
      { id: 'matchPredictor', path: '/apps', img: appImg, imgStyle: "large"},
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

const navbarRight: NavItem[] = [
  {
    label: 'Manage',
    id: 'manage',
    path: '/manageLanding',
    menuItems: [
      { label: 'Orders', id: 'orders', path: '/orders', img: ordersImg, imgStyle: "small"},
      { label: 'Admin', id: 'admin', path: '/admin', img: adminImg, imgStyle: "small"}
    ]
  },
];
export { shopItems, navbarLeft, navbarRight };