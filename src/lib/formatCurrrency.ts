export function formatCurrency(
  amount: number,
  currencyCode = "HUF",
  locale = "hu-HU",
  forcedDigits?: number
) {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: forcedDigits,
      maximumFractionDigits: forcedDigits,
    });

    return formatter.format(amount);
  } catch (error) {
    console.error("Error formatting currency:", error);
    return `${amount.toFixed(0)} ${currencyCode}`; // Fallback format
  }
}
