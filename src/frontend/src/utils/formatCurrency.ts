/**
 * Formats an optional INR price value as a currency string.
 * Returns a formatted string like "₹199" if price is present, or undefined if not.
 */
export function formatINR(priceInINR?: bigint): string | undefined {
  if (priceInINR === undefined || priceInINR === null) {
    return undefined;
  }
  return `₹${priceInINR.toString()}`;
}
