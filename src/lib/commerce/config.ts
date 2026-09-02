export type ProductId = 'masterPass' | 'aboKiller' | 'bahnRebell' | 'nebenkostenRebell' | 'flugRebell';

export interface ProductConfig {
  id: ProductId;
  stripePaymentLink: string;
  shopifyCheckoutUrl: string;
  shopifyVariantId?: string;
}

export const COMMERCE_CONFIG: Record<ProductId, ProductConfig> = {
  masterPass: {
    id: 'masterPass',
    stripePaymentLink: 'https://buy.stripe.com/4gM5kx8JhcR31ER9Gh4Ni01',
    shopifyCheckoutUrl: '',
  },
  aboKiller: {
    id: 'aboKiller',
    stripePaymentLink: 'https://buy.stripe.com/4gM5kx8JhcR31ER9Gh4Ni01',
    shopifyCheckoutUrl: 'https://shop.vorlagenbude.de/cart/58394943521103:1',
    shopifyVariantId: '58394943521103',
  },
  bahnRebell: {
    id: 'bahnRebell',
    stripePaymentLink: 'https://buy.stripe.com/4gM5kx8JhcR31ER9Gh4Ni01',
    shopifyCheckoutUrl: 'https://shop.vorlagenbude.de/cart/58394944405839:1', // Dies ist Bahn-Rebell Pro
    shopifyVariantId: '58394944405839',
  },
  nebenkostenRebell: {
    id: 'nebenkostenRebell',
    stripePaymentLink: 'https://buy.stripe.com/4gM5kx8JhcR31ER9Gh4Ni01',
    shopifyCheckoutUrl: 'https://shop.vorlagenbude.de/cart/58552822726991:1',
    shopifyVariantId: '58552822726991',
  },
  flugRebell: {
    id: 'flugRebell',
    stripePaymentLink: 'https://buy.stripe.com/4gM5kx8JhcR31ER9Gh4Ni01',
    shopifyCheckoutUrl: 'https://shop.vorlagenbude.de/cart/58394944373071:1',
    shopifyVariantId: '58394944373071',
  }
};
