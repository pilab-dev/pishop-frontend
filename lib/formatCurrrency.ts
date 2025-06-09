export function formatCurrency(
  amount: number,
  currencyCode = "HUF",
  locale = "hu-HU",
) {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "code",
      maximumFractionDigits: 0,
    });
    let formatted = formatter.format(amount);

    // Add a colon after the currency symbol or code.
    const parts = formatter.formatToParts(amount);
    let currencyPart = parts.find((part) => part.type === "currency");

    if (currencyPart) {
      if (parts[0].type === "currency") {
        formatted = formatted.replace(currencyPart.value, currencyPart.value);
      } else {
        formatted = formatted.replace(
          currencyPart.value + " ",
          currencyPart.value,
        );
      }
    }

    return formatted.replace("HUF", "");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error formatting currency:", error);

    return amount.toString(); // Fallback to plain number if formatting fails.
  }
}
