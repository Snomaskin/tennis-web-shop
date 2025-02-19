import tennisBall from "../../../assets/tennis-ball.png"
import tennisRacket from "../../../assets/tennis-racket.png"
import appImg from "../../../assets/appImg.png"


export type MenuItem = {
    menuName: string;
    menuId: string;
    menuItems?: {label:string, id:string, path:string, img?: string}[];
};

export const menuItems: MenuItem[] = [
    {
        menuName: 'Apps',
        menuId: 'apps',
        menuItems: [
            { label: 'Match Predictor', id: 'matchPredictor', path: '/apps', img: appImg},
        ]
    },
    {
        menuName: 'Shop',
        menuId: 'shop',
        menuItems: [
            {label: 'Racquets', id: 'racquets', path: '/shop', img: tennisRacket},
            {label: 'Balls', id: 'balls', path: '/shop', img: tennisBall}  
        ],
    },
    {    
        menuName: 'About',
        menuId: 'about',
    },
];