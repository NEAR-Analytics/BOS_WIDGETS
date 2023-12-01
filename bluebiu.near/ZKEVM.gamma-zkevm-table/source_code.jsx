const proxy = "0x66cd859053c458688044d816117d5bdf42a56813";

const addresses = {
  Chef: "0x1e2d8f84605d32a2cbf302e30bfd2387badf35dd",
  DAI: "0xc5015b9d9161dca7e18e32f6f25c4ad850731fd4",
  MATIC: "0xa2036f0538221a77a3937f1379699f44945018d0",
  "N MATIC-USDC": "0x19f4ebc0a1744b93a355c2320899276ae7f79ee5",
  "N USDC-WBTC": "0x9783c45564232c0aff8dc550a9c247c42e8c8b98",
  "N WETH-MATIC": "0x2f39293c9ed046822c014143fb18d5ae0479be93",
  "N WETH-USDC": "0x04c6b11e1ffe1f1032bd62adb343c9d07767489c",
  "N WETH-WBTC": "0x1cc4ee0cb063e9db36e51f5d67218ff1f8dbfa0f",
  USDC: "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
  "USDC-DAI": "0xafad6e114cfbc8a19e91b8d7d04da740a7698595",
  USDT: "0x1e4a5963abfd975d8c9021ce480b42188849d41d",
  "USDT-DAI": "0xcd36b8a47a072e3e05e894b6ec89d294bec3d3ed",
  "USDT-USDC": "0x145d55ae4848f9782efcac785a655e3e5dce1bcd",
  "W MATIC-USDC": "0x8462e4173d63f8769f94bf7ae5bc1ac7ab5d96e3",
  "W USDC-WBTC": "0x83de646a7125ac04950fea7e322481d4be66c71d",
  "W WETH-MATIC": "0x5ada298913d53aa823824de69b4a6e790aed9327",
  "W WETH-USDC": "0xfb3a24c0f289e695ceb87b32fc18a2b8bd896167",
  "W WETH-WBTC": "0x64e78e990b2a45fad8b64b43e62a67d69a156042",
  WBTC: "0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1",
  WETH: "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",
  stMATIC: "0x83b874c1e09d316059d929da402dcb1a98e92082",
  "stMATIC-MATIC": "0x9616052273a598bc04bd1ad7f7a753157c24f77e",
};

const pairs = [
  {
    id: "W WETH-USDC",
    strategy: "Dynamic",
    strategy2: "Wide",
    token0: "WETH",
    token1: "USDC",
    decimals0: 18,
    decimals1: 6,
  },
  {
    id: "N WETH-USDC",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "WETH",
    token1: "USDC",
    decimals0: 18,
    decimals1: 6,
  },
  {
    id: "W WETH-MATIC",
    strategy: "Dynamic",
    strategy2: "Wide",
    token0: "WETH",
    token1: "MATIC",
    decimals0: 18,
    decimals1: 18,
  },
  {
    id: "N WETH-MATIC",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "WETH",
    token1: "MATIC",
    decimals0: 18,
    decimals1: 18,
  },
  {
    id: "W WETH-WBTC",
    strategy: "Dynamic",
    strategy2: "Wide",
    token0: "WETH",
    token1: "WBTC",
    decimals0: 18,
    decimals1: 18,
  },
  {
    id: "N WETH-WBTC",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "WETH",
    token1: "WBTC",
    decimals0: 18,
    decimals1: 18,
  },
  {
    id: "W USDC-WBTC",
    strategy: "Dynamic",
    strategy2: "Wide",
    token0: "USDC",
    token1: "WBTC",
    decimals0: 6,
    decimals1: 18,
  },
  {
    id: "N USDC-WBTC",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "USDC",
    token1: "WBTC",
    decimals0: 6,
    decimals1: 18,
  },
  {
    id: "USDT-USDC",
    strategy: "Stable",
    token0: "USDT",
    token1: "USDC",
    decimals0: 6,
    decimals1: 6,
  },
  {
    id: "USDC-DAI",
    strategy: "Stable",
    token0: "USDC",
    token1: "DAI",
    decimals0: 6,
    decimals1: 18,
  },
  {
    id: "USDT-DAI",
    strategy: "Stable",
    token0: "USDT",
    token1: "DAI",
    decimals0: 6,
    decimals1: 18,
  },
  {
    id: "stMATIC-MATIC",
    strategy: "Pegged Price",
    token0: "stMATIC",
    token1: "MATIC",
    decimals0: 18,
    decimals1: 18,
  },
  {
    id: "N MATIC-USDC",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "MATIC",
    token1: "USDC",
    decimals0: 18,
    decimals1: 6,
  },
  {
    id: "W MATIC-USDC",
    strategy: "Dynamic",
    strategy2: "Wide",
    token0: "MATIC",
    token1: "USDC",
    decimals0: 18,
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
    padding: 0 24px;
  }
`;
const Table = styled.table`
  font-family: "Inter";
  color: #fff;
  min-width: 640px;
  width: 100%;

  th {
    padding: 10px;
    color: #7c7f96;
    font-weight: 400;
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
    &.active {
      background: rgba(53, 55, 73, 0.5);
    }
  }

  @media (max-width: 736px) {
    width: auto;
    min-width: auto;
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

const { poolsData, activePair, userPositions } = props;

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
        {poolsData &&
          pairs.map((pair) => {
            const poolData = poolsData[addresses[pair.id]];
            const userBalance =
              userPositions && addresses[pair.id] in userPositions
                ? userPositions[addresses[pair.id]].balanceUSD
                : undefined;

            return (
              <tr
                onClick={() => onPairClick(pair)}
                key={pair.id}
                className={activePair.id === pair.id ? "active" : ""}
              >
                <td>
                  {pair.token0}-{pair.token1}
                </td>
                <td>
                  <Tag>{pair.strategy2 ? pair.strategy2 : pair.strategy}</Tag>
                </td>
                <td>{formatFiat(poolData.tvlUSD)}</td>
                <td>{formatPercent(poolData.returns.weekly.feeApr)}</td>

                <td>{userBalance ? `${formatFiat(userBalance)}` : "-"}</td>
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
