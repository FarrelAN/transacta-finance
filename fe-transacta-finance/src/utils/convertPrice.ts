const convertPrice = (num: number, maxDigits?: number) => {
  return num.toLocaleString("us-UK", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: maxDigits ? maxDigits : 0,
  });
};

export default convertPrice;
