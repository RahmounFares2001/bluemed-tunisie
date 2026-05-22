export function formatPrice(value: number): string {
  const rounded = Math.round(value);
  // Format with Arabic-Western digits + thousands separator + DZD
  const withSeparator = rounded.toLocaleString("fr-FR").replace(/\s/g, ",");
  return `${withSeparator} دينار`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("fr-FR").replace(/\s/g, ",");
}
