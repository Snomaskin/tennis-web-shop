interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
}

interface ProductCategory {
    [category: string]: Product[]
}

const products: ProductCategory = {
    balls: [
        {
            id: 'wilsonBall1',
            name: 'Wilson Tennis Balls',
            price: 12,
            imageUrl: 'https://www.wilson.com/en-us/media/catalog/product/article_images/WRT100101_/WRT100101__dc7e8f99958ff0e4e409c49261ae5b3e.png'
        },
        {
            id: 'headBall',
            name: 'Head Tennis Balls',
            price: 10,
            imageUrl: 'https://cdn-mdb.head.com/CDN3/D/571698/1/1200x1200/head-pro-3-ball-single-can.webp'
        },
        {
            id: 'princeBall',
            name: 'Prince Tennis Balls',
            price: 8,
            imageUrl: 'https://images.squarespace-cdn.com/content/v1/56e9b38c2b8dde820241b62d/1536605968611-37DNW75RDJKDLWBSXIUK/4%2B3+Ball+NX+Tour.jpg'
        },
        {
            id: 'babolatBall',
            name: 'Babolat Tennis Balls',
            price: 9,
            imageUrl: 'https://global.tennis-point.com/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw49065af8/images/009/250/0139900000_000.jpg'
        },
        {
            id: 'dunlopBall',
            name: 'Dunlop Tennis Balls',
            price: 11,
            imageUrl: 'https://global.tennis-point.com/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dwb414c970/images/016/246/0164400000_000.jpg'
        },
        {
            id: 'slazengerBall',
            name: 'Slazenger Tennis Balls',
            price: 10,
            imageUrl: 'https://global.tennis-point.com/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw0f7b7532/images/017/269/0125500000_000.jpg'
        },
        {
            id: 'tecnifibreBall',
            name: 'Tecnifibre Tennis Balls',
            price: 9,
            imageUrl: 'https://global.tennis-point.com/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw36f532b8/images/012/248/0126300000_000.jpg'
        },
        {
            id: 'tretornBall',
            name: 'Tretorn Tennis Balls',
            price: 10,
            imageUrl: 'https://global.tennis-point.com/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dwe0820dc0/images/028/258/0133900000_000.jpg'
        },
        {
            id: 'wilsonBall2',
            name: 'Wilson Tennis Balls',
            price: 12,
            imageUrl: 'https://global.tennis-point.com/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dwe6658959/images/007/247/0161900000_000.jpg?q=80&sw=543'
        },
        {
            id: 'wilsonUSOpenBall',
            name: 'Wilson US Open Tennis Balls',
            price: 13,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dwd795bdd9/images/007/226/0153700000_000.jpg'
        },
        {
            id: 'headTourBall',
            name: 'Head Tour Tennis Balls',
            price: 11,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dwefd4fa22/images/006/266/0154800000_000.jpg'
        },
        {
            id: 'babolatGoldBall',
            name: 'Babolat Gold Tennis Balls',
            price: 10,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dwe4c9c219/images/009/250/0140300000_000.jpg'
        },
        {
            id: 'princeTourBall',
            name: 'Prince Tour Tennis Balls',
            price: 9,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dwc1759ff1/images/008/251/0145600000_000.jpg'
        },
        {
            id: 'dunlopATPBall',
            name: 'Dunlop ATP Tennis Balls',
            price: 12,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw409185f8/images/016/257/0167800000_000.jpg'
        },
        {
            id: 'slazengerWimbledonBall',
            name: 'Slazenger Wimbledon Tennis Balls',
            price: 14,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw7bdc8b12/images/017/267/0125000000_000.jpg'
        },
        {
            id: 'tecnifibreChampionBall',
            name: 'Tecnifibre Champion Tennis Balls',
            price: 11,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dwc892189d/images/012/248/0126700000_000.jpg'
        },
        {
            id: 'tretornMicroBall',
            name: 'Tretorn Micro Tennis Balls',
            price: 10,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw360deae7/images/028/256/0133200000_000.jpg'
        },

    ],
    racquets: [
        {
            id: 'wilsonRacquet',
            name: 'Wilson Tennis Racquet',
            price: 250,
            imageUrl: 'https://www.wilson.com/en-us/media/catalog/product/article_images/WR172711U_/WR172711U__ef49c0541dc830c48c4702248438b581.png'
        },
        {
            id: 'princeRacquet',
            name: 'Prince Tennis Racquet',
            price: 200,
            imageUrl: 'https://images.squarespace-cdn.com/content/v1/56e9b38c2b8dde820241b62d/1603739008032-X8E6IKC5K1UMYT6764AW/PL850_010w.png'
        },
        {
            id: 'headRacquet',
            name: 'Head Tennis Racquet',
            price: 240,
            imageUrl: 'https://cdn-mdb.head.com/CDN3/D/232045/1/1200x1200/instinct-pwr-110-2025.webp'
        },
        {
            id: 'babolatPureAero',
            name: 'Babolat Pure Aero',
            price: 279,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw506684f4/images/009/060/02832000_000.jpg'
        },
        {
            id: 'yonexEzone',
            name: 'Yonex EZONE 98',
            price: 259,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw41e9c3f7/images/019/058/01865000_000.jpg'
        },
        {
            id: 'technifibreTfight',
            name: 'Tecnifibre TF-Fight 305',
            price: 229,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw35df20b7/images/012/059/01563000_000.jpg'
        },
        {
            id: 'dunlopFx500',
            name: 'Dunlop FX 500',
            price: 219,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw933e37b8/images/016/051/02199000_000.jpg'
        },
        {
            id: 'wilsonBlade',
            name: 'Wilson Blade 98 v8',
            price: 269,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw25bd4bc3/images/007/056/03694000_000.jpg'
        },
        {
            id: 'headSpeed',
            name: 'Head Speed Pro',
            price: 259,
            imageUrl: 'https://global.tennis-point.com/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw4af77847/images/006/066/04347000_000.jpg'
        },
        {
            id: 'babolatPureDrive',
            name: 'Babolat Pure Drive',
            price: 269,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw2ec0f9d8/images/009/051/02743000_000.jpg'
        },
        {
            id: 'yonexVcore',
            name: 'Yonex VCORE 98',
            price: 249,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dwc245c720/images/019/062/01897000_000.jpg'
        },
        {
            id: 'wilsonPro',
            name: 'Wilson Pro Staff RF97 v14',
            price: 289,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw9bb8d8e3/images/007/062/03875800_000.jpg'
        }
        
    ],
    apparel: [
        {
            id: 'nikeDri-Fit',
            name: 'Nike Dri-Fit Solid Polo',
            price: 14,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw0241a198/images/004/458/55323000_000.jpg?q=80&sw=543'
        },
        {
            id: 'adidasClub',
            name: 'Adidas Club Tennis Shorts',
            price: 35,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw934e234c/images/005/462/17944000_000.jpg?q=80&sw=543'
        },
        {
            id: 'babolatPlay',
            name: 'Babolat Play Tennis Skirt',
            price: 42,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dwd1c93727/images/009/466/06385000_000.jpg?q=80&sw=543'
        },
        {
            id: 'lacosteUltraDry',
            name: 'Lacoste Ultra-Dry Performance Tee',
            price: 39,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw67d31132/images/026/410/01300000_000.jpg?q=80&sw=543'
        },
        {
            id: 'wilsonTeamCap',
            name: 'Wilson Team Tennis Cap',
            price: 19,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw5b58556e/images/007/475/05531000_000.jpg?q=80&sw=543'
        },
        {
            id: 'headPerformance',
            name: 'Head Performance Tennis Jacket',
            price: 65,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw1a427a01/images/006/475/08567000_000.jpg?q=80&sw=543'
        },
        {
            id: 'filaFundamentals',
            name: 'Fila Fundamentals Tennis Dress',
            price: 55,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dwb388c179/images/003/475/03806000_000.jpg?q=80&sw=543'
        },
        {
            id: 'nikeTourPremium',
            name: 'Nike Tour Premium Wristbands',
            price: 12,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw8a9f6faf/images/004/422/1777000000_000.jpg?q=80&sw=543'
        },
        {
            id: 'asicsCourtFF',
            name: 'Asics Court FF Tennis Socks',
            price: 15,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dwaa39ea0e/images/020/462/05289000_000.jpg?q=80&sw=543'
        },
        {
            id: 'kSwissHypercourt',
            name: 'K-Swiss Hypercourt Tennis Shoe',
            price: 22,
            imageUrl: 'https://www.tennis-point.se/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dwfd9ccdc6/images/014/162/02256000_0_1.jpg?q=80&sw=543'
        }
    ]
}

export type { Product, ProductCategory }
export { products }