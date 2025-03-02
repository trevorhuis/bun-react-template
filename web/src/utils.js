export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatUSD = (amount) => {
  if (typeof amount === "number") {
    if (isNaN(amount)) {
      return "$0.00";
    }
  } else if (typeof amount === "string") {
    amount = Number(amount);
    if (isNaN(amount)) {
      return "$0.00";
    }
  } else {
    return "$0.00";
  }

  const formattedAmount = amount.toFixed(2);

  const parts = formattedAmount.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return "$" + parts.join(".");
};
