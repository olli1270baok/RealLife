export type ProductId = 'masterPass';

export interface ProductConfig {
  id: ProductId;
  stripePaymentLink: string;
  shopifyCheckoutUrl: string; // Placeholder for future Shopify integration
}

export const COMMERCE_CONFIG: Record<ProductId, ProductConfig> = {
  masterPass: {
    id: 'masterPass',
    // Current active Stripe Payment Link
    stripePaymentLink: 'https://buy.stripe.com/4gM5kx8JhcR31ER9Gh4Ni01',
    // Placeholder - DO NOT invent URLs here, wait for Shopify setup
    shopifyCheckoutUrl: '',
  }
};
