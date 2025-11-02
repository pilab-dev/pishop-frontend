export function formatCurrency(
  amount: number,
  currencyCode = "HUF",
  locale = "hu-HU",
) {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(amount);
  } catch (error) {
    console.error("Error formatting currency:", error);
    return `${currencyCode} ${amount.toFixed(2)}`; // Fallback format
  }
}
