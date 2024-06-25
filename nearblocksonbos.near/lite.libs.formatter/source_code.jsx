const formatter = () => {
  const formatNumber = (value, decimals) => {
    const bigNumber = Big(value).toFixed(decimals);
    const parts = bigNumber.split(".");
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (parts.length === 1 || decimals === 0) return integerPart;
    const decimalPart = parts[1].slice(0, decimals).replace(/0+$/, "");
    if (!decimalPart) return integerPart;
    return `${integerPart}.${decimalPart}`;
  };
  const formatScale = (value, decimals) => {
    const bigNumber = Big(value);
    const scales = [
      { suffix: "T", threshold: Big(1e12) },
      { suffix: "B", threshold: Big(1e9) },
      { suffix: "M", threshold: Big(1e6) },
      { suffix: "K", threshold: Big(1e3) },
    ];
    for (const scale of scales) {
      if (bigNumber.gte(scale.threshold)) {
        const formatted = formatNumber(
          bigNumber.div(scale.threshold).toString(),
          decimals
        );
        return `${formatted} ${scale.suffix}`;
      }
    }
    return formatNumber(bigNumber.toString(), decimals);
  };
  const formatSize = (value, decimals) => {
    const bigNumber = Big(value);
    const sizes = ["B", "KB", "MB", "GB", "TB", "PB"];
    if (bigNumber.eq(0)) return "0 B";
    const i = Math.floor(Math.log(bigNumber.toNumber()) / Math.log(1024));
    const converted = bigNumber.div(Big(1024).pow(i)).toString();
    const formatted = formatNumber(converted, decimals);
    return `${formatted} ${sizes[i]}`;
  };
  return { formatNumber, formatScale, formatSize };
};
return formatter(props);
