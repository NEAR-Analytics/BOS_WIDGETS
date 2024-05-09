return {
  formatValue: (val) =>
    val >= 1000000000
      ? `${parseFloat(val / 1000000000).toFixed(2)}B`
      : val >= 1000000
      ? `${parseFloat(val / 1000000).toFixed(2)}M`
      : val >= 1000
      ? `${parseFloat(val / 1000).toFixed(2)}K`
      : val,
};
