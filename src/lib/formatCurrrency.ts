export function formatCurrency(
  amount: number,
  currencyCode = "HUF",
  locale = "hu-HU",
) {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return formatter.format(amount);
  } catch (error) {
    console.error("Error formatting currency:", error);
    return `${amount.toFixed(0)} ${currencyCode}`; // Fallback format
  }
}
