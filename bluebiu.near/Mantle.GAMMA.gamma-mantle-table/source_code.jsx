const proxy = "0x66cd859053c458688044d816117d5bdf42a56813";

const addresses = {
  USDT: "0x201eba5cc46d216ce6dc03f6a759e8e766e956ae",
  MINU: "0x51cfe5b1e764dc253f4c8c1f19a081ff4c3517ed",
  WMNT: "0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8",
  WBTC: "0xcabae6f6ea1ecab08ad02fe02ce9a44f09aebfa2",
  USDC: "0x09bc4e0d864854c6afb6eb9a9cdf58ac190d0df9",
  WETH: "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",

  "N USDT-WMNT-500": "0x6e9d701fb6478ed5972a37886c2ba6c82a4cbb4c",
  "W USDT-WMNT-500": "0x1ee3ae551188661553882fdc75f8f62eaa6726ad",

  "N MINU-WMNT-10000": "0xd6cc4a33da7557a629e819c68fb805ddb225f517",
  "W MINU-WMNT-10000": "0xf8a02496bd84bd7f7ab9f1a000044fc482d729ca",

  "N USDT-WETH-500": "0xde7421f870ffb2b99998d9ed07c4d9b22e783922",
  "W USDT-WETH-500": "0xfe4bb996926aca85c9747bbec886ec2a3f510c66",

  "N USDT-WBTC-500": "0x2e18b825b049c4994370b0db6c35d0100295b96c",
  "W USDT-WBTC-500": "0xa18d3073441b0774a1efa45ba9d2e7da3441da2f",

  "W USDC-USDT-100": "0x561f5cf838429586d1f8d3826526891b289270ee",
};

const pairs = [
  {
    id: "N USDT-WMNT-500",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "USDT",
    token1: "WMNT",
    decimals0: 6,
    decimals1: 18,
  },
  {
    id: "W USDT-WMNT-500",
    strategy: "Dynamic",
    strategy2: "Wide",
    token0: "USDT",
    token1: "WMNT",
    decimals0: 6,
    decimals1: 18,
  },
  {
    id: "N MINU-WMNT-10000",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "MINU",
    token1: "WMNT",
    decimals0: 18,
    decimals1: 18,
  },
  {
    id: "W MINU-WMNT-10000",
    strategy: "Dynamic",
    strategy2: "Wide",
    token0: "MINU",
    token1: "WMNT",
    decimals0: 18,
    decimals1: 18,
  },
  {
    id: "N USDT-WETH-500",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "USDT",
    token1: "WETH",
    decimals0: 6,
    decimals1: 18,
  },

  {
    id: "W USDT-WETH-500",
    strategy: "Dynamic",
    strategy2: "Wide",
    token0: "USDT",
    token1: "WETH",
    decimals0: 6,
    decimals1: 18,
  },

  {
    id: "N USDT-WBTC-500",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "USDT",
    token1: "WBTC",
    decimals0: 6,
    decimals1: 8,
  },

  {
    id: "W USDT-WBTC-500",
    strategy: "Dynamic",
    strategy2: "Wide",
    token0: "USDT",
    token1: "WBTC",
    decimals0: 6,
    decimals1: 8,
  },

  {
    id: "W USDC-USDT-100",
    strategy: "Dynamic",
    strategy2: "Wide",
    token0: "USDC",
    token1: "USDT",
    decimals0: 6,
    decimals1: 6,
  },
];
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

  th {
    padding: 10px;
  }
  td {
    padding: 10px 10px;
    font-size: 16px;
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
    background: rgba(53, 55, 73, 0.5);
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

const { poolsData, userPositions } = props;

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
          <th>Balance</th>
          <th>APR</th>
        </tr>
      </thead>
      <tbody>
        {poolsData &&
          pairs.map((pair) => {
            const poolData = poolsData[addresses[pair.id]];
            const userBalance =
              userPositions && addresses[pair.id] in userPositions
                ? userPositions[addresses[pair.id]].balanceUSD
                : undefined;

            return (
              <tr onClick={() => onPairClick(pair)} key={pair.id}>
                <td>
                  {pair.token0}-{pair.token1}
                </td>
                <td>
                  <Tag>{pair.strategy2 ? pair.strategy2 : pair.strategy}</Tag>
                </td>
                <td>{formatFiat(poolData.tvlUSD)}</td>
                <td>{userBalance ? `${formatFiat(userBalance)}` : "-"}</td>
                <td>{formatPercent(poolData.returns.weekly.feeApr)}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>

    {poolsData && (
      <MobileList>
        {pairs.map((pair) => {
          const poolData = poolsData[addresses[pair.id]];
          const userBalance =
            userPositions && addresses[pair.id] in userPositions
              ? userPositions[addresses[pair.id]].balanceUSD
              : undefined;

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
                  {formatPercent(poolData.returns.weekly.feeApr)}
                </div>
              </div>
            </MobileListItem>
          );
        })}
      </MobileList>
    )}
  </Container>
);
