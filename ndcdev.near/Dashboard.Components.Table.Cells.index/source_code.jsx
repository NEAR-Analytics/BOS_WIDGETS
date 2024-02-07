const Cell = styled.div`
  min-width: 270px;
  width: 100%;
  height: 36px;
  background: #e8ecf0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e1d22;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 350;
  line-height: 36px;
  position: relative;

  .dao-name {
    display: block;
    width: 90%;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    text-wrap: nowrap;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  padding-top: 1rem;
  -webkit-overflow-scrolling: touch;
`;

const Colored = styled.div`
  height: 100%;
  position: absolute;
  left: 0;
  width: ${(props) => props.width}%;
  background: ${(props) => props.color};
  animation: slide 1s ease;

  @keyframes slide {
    from {
      width: 0%;
    }

    to {
      width: "${props.width}%";
    }
  }
`;

const getPercentage = (start, end, divider) => {
  const val = parseInt(((end / start) * 100) / (divider ?? 1));

  return val > 100 ? 100 : val;
};

const formatValue = (value) =>
  value
    ? value >= 1000000000
      ? `${parseFloat(value / 1000000000).toFixed(2)}B`
      : value >= 1000000
      ? `${parseFloat(value / 1000000).toFixed(2)}M`
      : value >= 1000
      ? `${parseFloat(value / 1000).toFixed(2)}K`
      : Number.isInteger(value)
      ? value
      : value.toFixed(2)
    : "﹣";

const { dataSet } = props;

const TooltipContent = ({ key, value }) => (
  <div className="justify-content-between w-100 d-flex gap-2">
    <div>{key}:</div> <div>{formatValue(value)}</div>
  </div>
);

return (
  <Container>
    {Object.entries(dataSet).map(
      (
        [daoId, { retention, dappsUsed, balance, interactedAccounts }],
        index,
      ) => (
        <div key={index} className="w-100 d-flex align-items-center gap-2">
          <Cell>
            <div className="dao-name">{daoId}</div>
          </Cell>
          <Cell>
            <Colored
              width={getPercentage(retention.start, retention.end, 2)}
              color={
                getPercentage(retention.start, retention.end, 2) >= 50
                  ? "#68D895"
                  : "#EB9DBB"
              }
            />
            <div className="position-relative">
              <Widget
                src={`ndcdev.near/widget/Dashboard.Components.Tooltip.index`}
                props={{
                  content: (
                    <>
                      <TooltipContent key="Start" value={retention.start} />
                      <TooltipContent key="End" value={retention.end} />
                    </>
                  ),
                  minWidth: "max-content",
                  icon: <i>{formatValue(retention.end / retention.start)}</i>,
                }}
              />
            </div>
          </Cell>
          <Cell>{formatValue(dappsUsed)}</Cell>
          <Cell>
            <Colored
              width={10}
              color={balance / interactedAccounts < 1 ? "#68D895" : "#EB9DBB"}
            />
            <div className="position-relative">
              <Widget
                src={`ndcdev.near/widget/Dashboard.Components.Tooltip.index`}
                props={{
                  content: (
                    <>
                      <TooltipContent key="Balance" value={balance} />
                      <TooltipContent
                        key="Accounts"
                        value={interactedAccounts}
                      />
                    </>
                  ),
                  minWidth: "max-content",
                  icon: <i>{formatValue(balance / interactedAccounts)}</i>,
                }}
              />
            </div>
          </Cell>
        </div>
      ),
    )}
  </Container>
);
