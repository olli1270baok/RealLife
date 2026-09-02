import { ProductId } from './config';

/**
 * Checks if the user is entitled to a specific product.
 * 
 * TODO [SHOPIFY MIGRATION]: 
 * Currently, all apps rely on a global `is_pro` flag set by the Stripe webhook.
 * Once Shopify is integrated and we sell apps individually, this must be migrated to check 
 * an array of owned products or a map in `app_metadata.entitlements` (e.g. `entitlements: ['aboKiller', 'flugRebell']`).
 * 
 * @param user The Supabase user object
 * @param productId The ID of the product to check
 * @returns boolean True if the user has access
 */
export function hasEntitlement(user: any, productId: ProductId): boolean {
  if (!user) return false;

  // Temporary global pass check
  return user.app_metadata?.is_pro === true;
}
