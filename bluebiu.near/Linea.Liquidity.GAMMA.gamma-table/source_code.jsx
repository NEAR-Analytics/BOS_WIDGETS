const { addresses, pairs, activePair } = props;

const Tag = styled.div`
  border-radius: 16px;
  background: #393b47;
  display: inline-block;
  padding: 4px 10px;
  font-size: 12px;
`;

const Container = styled.div`
  border: 1px solid #332c4b;
  background: #181a27;
  border-radius: 16px;
  overflow: hidden;
  padding: 10px 0;

  @media (max-width: 736px) {
    border: none;
    background: none;
    width: 100%;
  }
`;
const Table = styled.table`
  font-family: "Inter";
  color: #fff;
  min-width: 640px;

  .active-bar {
    background: #ff0000;
    width: 6px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
  }

  th {
    padding: 10px;
    color: #7c7f96;
  }
  td {
    padding: 10px 10px;
    font-size: 16px;
  }
  .active {
    background: rgba(53, 55, 73, 0.5);
    position: relative;
    overflow-y: hidden;
  }
  tr {
    cursor: pointer;
    &:last-of-type {
      border-bottom: none;
    }
    th:first-child,
    td:first-child {
      padding-left: 26px;
    }
  }

  @media (max-width: 736px) {
    min-width: none;

    max-width: 100%;

    display: block;

    width thead {
      display: none;
    }

    tr {
      display: none;
    }
  }

  tbody tr:hover {
    background: rgba(53, 55, 73, 0.2);
  }
`;

const MobileListItem = styled.div`
  border: 1px solid #332c4b;
  background: linear-gradient(0deg, #181a27, #181a27);
  border-radius: 10px;
  color: white;
  font-size: 16px;
  padding: 12px 0;

  .pair-title {
    border-bottom: 1px solid #2e3145;

    padding: 0px 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .type-box {
      border-radius: 13px;
      min-width: 61px;
      height: 26px;
      padding: 0px 6px;
      font-size: 13px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0em;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #d9d9d91a;
    }
  }

  .info-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;

    .info-title {
      font-size: 15px;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: left;
      color: #979abe;
    }

    .info-value {
      font-size: 15px;
      font-weight: 500;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: left;
      color: #ffffff;
    }
  }

  @media (min-width: 736px) {
    display: none;
  }
`;

const MobileList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 12px;
  @media (min-width: 736px) {
    display: none;
  }
`;

const formatFiat = (value) => {
  const number = Number(value).toLocaleString("en", {
    currency: "USD",
    style: "currency",
    compactDisplay: "short",
    notation: "compact",
    maximumFractionDigits: 2,
  });

  return number;
};

const formatPercent = (value) => {
  return `${Number(value * 100).toLocaleString("en", {
    maximumFractionDigits: 2,
  })}%`;
};

const { poolsData, fusionsData, userPositions, prices } = props;

const onPairClick = (pair) => {
  const { handlePairClick } = props;

  if (handlePairClick) handlePairClick(pair);
};

return (
  <Container>
    <Table>
      <thead>
        <tr>
          <th>Gamma Position</th>
          <th>Strategy</th>
          <th>TVL</th>

          <th>APR</th>

          <th>Yours</th>
        </tr>
      </thead>
      <tbody>
        {poolsData && fusionsData &&
          pairs.map((pair) => {
            const poolData = poolsData[addresses[pair.id]];
            const userBalance =
              userPositions && addresses[pair.id] in userPositions
                ? userPositions[addresses[pair.id]].balanceUSD
                : undefined;

            const active = activePair.id === pair.id;
            const fusionData = fusionsData.find(fusionData => fusionData.address === addresses[pair.id])
            return (
              <tr
                className={active ? "active" : ""}
                onClick={() => onPairClick(pair)}
                key={pair.id}
              >
                <td>
                  {pair.token0}-{pair.token1}
                </td>
                <td>
                  <Tag>{pair.strategy2 ? pair.strategy2 : pair.strategy}</Tag>
                </td>
                <td>{formatFiat(poolData.tvlUSD)}</td>

                <td>
                  {
                    (fusionData?.gauge?.tvl ?? 0 > 0) ? Big(fusionData?.gauge?.rewardPerSecond ?? 0)
                      .times(365 * 24 * 60 * 60)
                      .times(prices?.Lynex ?? 0)
                      .times(100)
                      .div(fusionData?.gauge?.tvl ?? 0).toFixed(2) : '0.00'
                  }%
                </td>

                <td>{userBalance ? `${formatFiat(userBalance)}` : "-"}</td>

                {active && <div className="active-bar"></div>}
              </tr>
            );
          })}
      </tbody>
    </Table>

    {poolsData && fusionsData && (
      <MobileList>
        {pairs.map((pair) => {
          const poolData = poolsData[addresses[pair.id]];
          const userBalance =
            userPositions && addresses[pair.id] in userPositions
              ? userPositions[addresses[pair.id]].balanceUSD
              : undefined;
          const fusionData = fusionsData.find(fusionData => fusionData.addresses === addresses[pair.id])
          return (
            <MobileListItem onClick={() => onPairClick(pair)} key={pair.id}>
              <div className="pair-title">
                <div>
                  {pair.token0}-{pair.token1}
                </div>
                <div className="type-box">
                  {pair.strategy2 ? pair.strategy2 : pair.strategy}
                </div>
              </div>
              <div className="info-line">
                <div
                  className="info-title"
                  style={{
                    paddingTop: "14px",
                  }}
                >
                  TVL
                </div>
                <div className="info-value">{formatFiat(poolData.tvlUSD)}</div>
              </div>
              <div className="info-line">
                <div className="info-title">Balance</div>
                <div className="info-value">
                  {userBalance ? `${formatFiat(userBalance)}` : "-"}
                </div>
              </div>
              <div className="info-line">
                <div className="info-title">APR</div>
                <div className="info-value">
                  {
                    (fusionData?.gauge?.tvl ?? 0 > 0) ? Big(fusionData?.gauge?.rewardPerSecond ?? 0)
                      .times(365 * 24 * 60 * 60)
                      .times(prices?.Lynex ?? 0)
                      .times(100)
                      .div(fusionData?.gauge?.tvl ?? 0).toFixed(2) : '0.00'
                  }%
                </div>
              </div>
            </MobileListItem>
          );
        })}
      </MobileList>
    )}
  </Container>
);
