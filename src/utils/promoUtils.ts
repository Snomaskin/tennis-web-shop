import type { Product, Promotion, PromoProduct, ProductCategory } from "../assets/products";


const getPromosFromAll = (
  products: ProductCategory, 
  promotions: Promotion[]
): PromoProduct[] => {
  const allProducts = Object.values(products).flat();
  return promotions.map(promo => {
    const product = allProducts.find(p => p.id === promo.id);
    if (!product) return null;

    const price =  
      promo.promoPrice 
      ?? ( promo.discount ? Math.round(product.price * (1 - promo.discount) * 100) / 100 
      : product.price);

    return {
      ...product,
      price: price,
      originalPrice: product.price,
      promoLabel: promo.promoLabel ?? '',
    };
  }).filter(Boolean) as PromoProduct[];
}

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

export { getPromosFromAll, applyPromosToProducts, getPromosFromAppliedProducts };