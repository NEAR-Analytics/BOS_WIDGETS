const { value, text, color } = props;
const { Circle } = VM.require(
  `ndcdev.near/widget/Dashboard.Components.MetricsDisplay.styled`,
);

if (!Circle) return <Widget src="flashui.near/widget/Loading" />;
const Loading = () => <Widget src="flashui.near/widget/Loading" />;

const formatValue = (val) => {
  const value = val ?? 0;

  return value >= 1000000000
    ? `${parseFloat(value / 1000000000).toFixed(2)}B`
    : value >= 1000000
    ? `${parseFloat(value / 1000000).toFixed(2)}M`
    : value >= 1000
    ? `${parseFloat(value / 1000).toFixed(2)}K`
    : value;
};

return (
  <div className="item">
    <div className="inner">
      {!value ? <Loading /> : <span>{formatValue(value)}</span>}
    </div>
    <div className="d-flex justify-content-center align-items-center gap-2">
      <Circle color={color} /> <span>{text}</span>
    </div>
  </div>
);
