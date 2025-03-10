import tennisBallImg from "../../../assets/tennis-ball.png"
import tennisRacketImg from "../../../assets/tennis-racket.png"
import appImg from "../../../assets/appImg.png"
import apparelImg from "../../../assets/apparel.png"


export type MenuItem = {
    menuName: string;
    menuId: string;
    menuItems?: { label:string, id:string, path:string, img?: string }[];
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
            { label: 'Racquets', id: 'racquets', path: '/shop', img: tennisRacketImg },
            { label: 'Balls', id: 'balls', path: '/shop', img: tennisBallImg },
            { label: 'Apparel', id: 'appaerel', path: '/apparel', img: apparelImg }
        ],
    },
    {    
        menuName: 'About',
        menuId: 'about',
    },
];