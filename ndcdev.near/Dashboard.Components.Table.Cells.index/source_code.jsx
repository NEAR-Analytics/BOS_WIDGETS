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

  .colored {
    width: ${(props) => props.width}%;
    background: ${(props) => props.color};
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

const getPercentage = (start, end, divider) => {
  const val = parseInt(((end / start) * 100) / (divider ?? 1));

  return val > 100 ? 100 : val;
};

const formatValue = (val) =>
  val >= 1000000000
    ? `${parseFloat(val / 1000000000).toFixed(2)}B`
    : val >= 1000000
    ? `${parseFloat(val / 1000000).toFixed(2)}M`
    : val >= 1000
    ? `${parseFloat(val / 1000).toFixed(2)}K`
    : val.toFixed(2);

const { dataSet } = props;

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
          <Cell
            width={getPercentage(retention.start, retention.end, 2)}
            color={
              getPercentage(retention.start, retention.end, 2) >= 50
                ? "#68D895"
                : "#EB9DBB"
            }
          >
            <div className="colored h-100 position-absolute start-0" />
            <div className="position-relative">
              {retention.end} / {retention.start}
            </div>
          </Cell>
          <Cell>{dappsUsed}</Cell>
          <Cell
            width={10}
            color={balance / interactedAccounts < 1 ? "#68D895" : "#EB9DBB"}
          >
            <div className="colored h-100 position-absolute start-0" />
            <div className="position-relative">
              {formatValue(balance / interactedAccounts)}
            </div>
          </Cell>
        </div>
      ),
    )}
  </Container>
);
