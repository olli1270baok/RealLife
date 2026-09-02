export type ProductId = 'masterPass' | 'aboKiller' | 'bahnRebell' | 'nebenkostenRebell' | 'flugRebell';

export interface ProductConfig {
  id: ProductId;
  stripePaymentLink: string;
  shopifyCheckoutUrl: string; // Placeholder for future Shopify integration
}

export const COMMERCE_CONFIG: Record<ProductId, ProductConfig> = {
  masterPass: {
    id: 'masterPass',
    stripePaymentLink: 'https://buy.stripe.com/4gM5kx8JhcR31ER9Gh4Ni01',
    shopifyCheckoutUrl: '',
  },
  aboKiller: {
    id: 'aboKiller',
    stripePaymentLink: 'https://buy.stripe.com/4gM5kx8JhcR31ER9Gh4Ni01', // TODO: replace with individual link
    shopifyCheckoutUrl: '',
  },
  bahnRebell: {
    id: 'bahnRebell',
    stripePaymentLink: 'https://buy.stripe.com/4gM5kx8JhcR31ER9Gh4Ni01',
    shopifyCheckoutUrl: '',
  },
  nebenkostenRebell: {
    id: 'nebenkostenRebell',
    stripePaymentLink: 'https://buy.stripe.com/4gM5kx8JhcR31ER9Gh4Ni01',
    shopifyCheckoutUrl: '',
  },
  flugRebell: {
    id: 'flugRebell',
    stripePaymentLink: 'https://buy.stripe.com/4gM5kx8JhcR31ER9Gh4Ni01',
    shopifyCheckoutUrl: '',
  }
};
