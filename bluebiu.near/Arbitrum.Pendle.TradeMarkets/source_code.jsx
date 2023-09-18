const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding-top: 20px;
  margin: auto;
  gap: 32px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;

  .yt-area-td {
    display: flex;
    justify-content: end;
    padding-right: 12px;
  }

  .pt-area-td {
    width: 155px;
  }

  .long-yield-apy {
    padding-right: 32px;
    text-align: right;
  }

  .fixed-yield-apy {
    padding-left: 16px;
  }

  .title {
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;

    color: #979abe;
  }

  .active {
    color: white;
    text-decoration: underline;
    text-underline-offset: 6px;
  }

  .yt-area {
    width: 155px;
    display: flex;
    align-items: center;
    padding: 8px 12px 8px 32px;
    background: linear-gradient(270deg, #4978b0 0%, rgba(73, 120, 176, 0) 100%);
    justify-content: space-between;
    cursor: pointer;
  }

  .pt-area {
    width: 155px;
    display: flex;
    align-items: center;
    padding: 8px 12px 8px 32px;
    cursor: pointer;
    justify-content: space-between;

    background: linear-gradient(90deg, #0ba9a0 0%, rgba(11, 169, 160, 0) 100%);
  }

  .art-text {
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: #ffffff;
    opacity: 0.1;
  }
`;

const formateTime = (timeString) => {
  const targetDate = new Date(timeString);

  const currentDate = new Date();

  const timeDiff = targetDate - currentDate;
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = targetDate.getDate();
  const month = months[targetDate.getMonth()];
  const year = targetDate.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  return {
    formattedDate,
    daysDiff: daysDiff + " days",
  };
};

const formateValue = (value, decimals) => {
  return parseFloat(Big(value).toFixed(decimals || 3, 1));
};

const Table = styled.table`
  width: 100%;
  .gray-value {
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;
    opacity: 0.5;
    color: white !important;
    text-decoration: none;
  }

  .light-value {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
    text-decoration: none;
    color: white !important;
  }

  thead {
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #979abe;
    border-bottom: 1px solid #2c334b;
    th {
      padding-bottom: 8px;
      font-weight: 400;
    }
  }

  tbody {
    .name {
      display: flex;
      align-items: center;
      gap: 6px;
      .icon {
        width: 36px;
        height: 36px;
        border-radius: 100%;
      }
    }
  }
`;

const TableRow = styled.tr`
  td {
    padding: 16px 0px 4px 0px;
  }
`;

const TabWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;
`;

const sender = Ethers.send("eth_requestAccounts", [])[0];

const CHAIN_ID = 42161;

const CONNECT_PROPS = {
  imgProps: {
    src: "https://ipfs.near.social/ipfs/bafkreiawjxeh46j7c63vvqpg2t3juh4pdlhk6iic4dkqlpsjq3loqarooa",
    style: {
      width: "434px",
      height: "176px",
      marginTop: "80px",
    },
  },
  noAccountTips: "Pendle",
  wrongNetworkTips: "To proceed, kindly switch to Arbitrum One Chain.",
  chainId: CHAIN_ID,
  chainName: "Arbitrum One",
};
const theme = {
  textColor: "#7794D3",
  buttonColor: "#33549C",
};
if (sender) {
  State.update({
    sender,
  });
}

State.init({
  markets: [],
  activeTab: "markets",
});

if (!sender) {
  return (
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
      props={{
        ...CONNECT_PROPS,
        theme,
        isWrongNetwork: false,
      }}
    />
  );
}

return (
  <>
    <Wrapper>
      <TabWrapper>
        <div
          className={`title ${state.activeTab === "markets" ? "active" : ""}`}
          style={{
            textDecoration: "none",
          }}
        >
          Market
        </div>

        {/* {state.sender && (
          <div
            className={`title ${state.activeTab === "yours" ? "active" : ""}`}
          >
            Yours
          </div>
        )} */}
      </TabWrapper>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Maturity</th>

            <th>Underlying APY/Price</th>

            <th>Implied APY</th>
            <th className="long-yield-apy">Long Yield APY</th>

            <th className="fixed-yield-apy ">Fixed APY</th>
          </tr>
        </thead>

        <tbody>
          {state.markets.map((m) => {
            return (
              <TableRow>
                <td>
                  <div className="name">
                    <img className="icon" src={m.proIcon} alt="" />

                    <div>
                      <div className="light-value">{m.proSymbol}</div>

                      <div className="gray-value">{m.protocol}</div>
                    </div>
                  </div>
                </td>

                <td>
                  <div className="light-value">
                    {formateTime(m.expiry).formattedDate}
                  </div>

                  <div className="gray-value">
                    {formateTime(m.expiry).daysDiff}
                  </div>
                </td>

                <td>
                  <div className="light-value">
                    {formateValue(m.underlyingApy * 100, 3)}%
                  </div>

                  <div className="gray-value">
                    ${formateValue(m.accountingAsset.price.usd, 4)}
                  </div>
                </td>

                <td>
                  <div className="light-value">
                    {formateValue(m.impliedApy * 100, 3)}%
                  </div>
                </td>

                <td className="yt-area-td">
                  <a
                    className="yt-area"
                    style={{
                      textDecoration: "none",
                    }}
                    href={`/bluebiu.near/widget/Arbitrum.Pendle.TradeSwap?market_address=${m.address}&type=yt`}
                  >
                    <div
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <div
                        className="light-value"
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        {formateValue(m.ytFloatingApy * 100, 3)}%
                      </div>

                      <div
                        className="gray-value"
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        ${formateValue(m.yt.price.usd, 4)}
                      </div>
                    </div>
                    <div className="art-text">YT</div>
                  </a>
                </td>

                <td className="pt-area-td">
                  <a
                    className="pt-area"
                    style={{
                      textDecoration: "none",
                    }}
                    href={`/bluebiu.near/widget/Arbitrum.Pendle.TradeSwap?market_address=${m.address}&type=pt`}
                  >
                    <div
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <div
                        className="light-value"
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        {formateValue(m.impliedApy * 100, 3)}%
                      </div>

                      <div
                        className="gray-value"
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        ${formateValue(m.pt.price.usd, 4)}
                      </div>
                    </div>

                    <div className="art-text">PT</div>
                  </a>
                </td>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </Wrapper>

    <Widget
      props={{
        onLoad: (markets) => State.update({ markets }),
      }}
      src="bluebiu.near/widget/Arbitrum.Pendle.getMarkets"
    />
  </>
);
