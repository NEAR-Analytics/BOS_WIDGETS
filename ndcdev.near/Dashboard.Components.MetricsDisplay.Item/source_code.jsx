const { value, text, color } = props;
const { Circle } = VM.require(
  `ndcdev.near/widget/Dashboard.Components.MetricsDisplay.styled`,
);
const { formatValue }  = VM.require(
  `ndcdev.near/widget/Dashboard.utils`,
);

return (
  <div className="item">
    <div className="inner">{formatValue(value)}</div>
    <div className="d-flex justify-content-center align-items-center gap-2">
      <Circle color={color} /> <span>{text}</span>
    </div>
  </div>
);
