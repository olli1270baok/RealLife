import { COMMERCE_CONFIG, ProductId } from './config';
import { supabase } from '../supabaseClient';

/**
 * Initiates the checkout process for a given product.
 * Currently redirects to Stripe, but is prepared for Shopify.
 * 
 * @param productId The ID of the product to purchase
 */
export async function startCheckout(productId: ProductId) {
  const config = COMMERCE_CONFIG[productId];
  
  if (!config) {
    console.error(`Product configuration not found for ${productId}`);
    return;
  }

  // Shopify target architecture:
  // If Shopify URL is configured, use it.
  if (config.shopifyCheckoutUrl) {
    window.location.href = config.shopifyCheckoutUrl;
    return;
  }

  // Fallback to existing Stripe implementation (temporarily)
  if (config.stripePaymentLink) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // We fetch the user internally here so the UI doesn't have to worry about Stripe-specific identity passing
        const finalUrl = `${config.stripePaymentLink}?client_reference_id=${user.id}`;
        window.location.href = finalUrl;
        return;
      } else {
        // Stripe flow currently requires user ID.
        // Alert the user, then push to login with a checkout param.
        alert("Für die Freischaltung über unseren Zahlungsanbieter benötigen wir vorab einen Zugang.");
        window.location.href = `/login?checkout=${productId}`;
        return;
      }
    } catch (err) {
      console.warn('Failed to fetch user for checkout reference', err);
      window.location.href = config.stripePaymentLink;
      return;
    }
  }

  console.error('No checkout URL configured for this product.');
}
