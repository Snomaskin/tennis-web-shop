import type { Product, Promotion, PromoProduct } from "../assets/products";


const applyPromosToProducts = (
  products: Product[], 
  promotions: Promotion[]
): Product[] => {
  const promoMap = new Map(promotions.map(p => [p.id, p]));

  const updatedProducts: Product[] = products.map(product => {
      const promo = promoMap.get(product.id);
      if (!promo) return product;

      const promoPrice =
        'promoPrice' in promo
          ? promo.promoPrice
          : Math.round(product.price * (1 - promo.discount!) * 100) / 100;

      return {
        ...product,
        price: promoPrice,
        promoPrice: true,
        originalPrice: product.price,
        promoLabel: promo.promoLabel ?? '',
      } as PromoProduct;
    });
  

  return updatedProducts;
};

const getPromosFromAppliedProducts = (
  products: Product[],
  promotions: Promotion[]
): PromoProduct[] => {
  const promoIds = new Set(promotions.map(p => p.id));
  return Object.values(products)
    .flat()
    .filter(p => promoIds.has(p.id))
    .map(p => p as PromoProduct);
};

export { applyPromosToProducts, getPromosFromAppliedProducts };