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
  .markets-page-list {
    display: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    .markets-page {
      .markets-page-table {
        display: none;
      }
      .markets-page-list {
        display: block;
        margin-bottom: 16px;
        .markets-page-list-item {
          background: linear-gradient(0deg, #181a27, #181a27),
            linear-gradient(0deg, #2c334b, #2c334b);
          padding: 10px 10px 20px;
          border-radius: 10px;
          border: 1px solid rgb(44, 51, 75);
          margin-bottom: 20px;
          .list-item-title {
            padding-bottom: 10px;
            border-bottom: 1px solid rgb(44, 51, 75);
            margin-bottom: 15px;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            gap: 6px;
            img {
              width: 36px;
              height: 36px;
              border-radius: 100%;
              margin-right: 8px;
            }
            .light-value {
              font-size: 16px;
              line-height: 19px;
              letter-spacing: 0em;
              text-align: left;
              text-decoration: none;
              color: white !important;
            }
            .gray-value {
              font-size: 12px;
              line-height: 14px;
              letter-spacing: 0em;
              text-align: left;
              opacity: 0.5;
              text-decoration: none;
              color: white !important;
            }
          }
        }
      }
    }
  }

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
    cursor: pointer;
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

const Term = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding-bottom: 10px;
  width: 100%;
  .lable {
    font-size: 13px;
    line-height: 15.6px;
    color: rgb(151, 154, 190);
  }
  .light-value {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
    text-decoration: none;
    color: white !important;
  }
  .gray-value {
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;
    opacity: 0.5;
    text-decoration: none;
    color: white !important;
  }
  .yt-area {
    border: 1px solid rgba(44, 51, 75, 1);
    padding-top: 6px;
    padding-bottom: 6px;
    border-radius: 10px;
  }
  .pt-area {
    border: 1px solid rgba(44, 51, 75, 1);
    padding-top: 6px;
    padding-bottom: 6px;
    border-radius: 10px;
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
  @media (max-width: 768px) {
    width: 108%;
    border-bottom: 1px #2a3047 solid;
    margin: 0 -12px;
    .title {
      width: 50%;
      flex: 1;
      text-align: center;
      padding: 12px 0;
    }
    .active {
      text-decoration: none;
      border-bottom: 2px solid #ffffff;
    }
  }
`;

const BackRoute = styled.div`
  position: absolute;
  width: 100vw;
  left: 0;
  top: 0;
  border-bottom: 1px solid #343838;
  display: flex;
  align-items: center;
  gap: 12px;

  .back-icon {
    padding-left: 100px;
    padding-right: 8px;
  }

  .dapp-logo {
    width: 32px;
    height: 32px;
    cursor: pointer;
  }

  .dapp-name {
    font-size: 16px;
    font-style: italic;
    font-weight: 900;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: #4982ff;
  }
`;

const backIcon = (
  <svg
    width="8"
    height="13"
    viewBox="0 0 8 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 12L2 6.5L7 1"
      stroke="#979ABE"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

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
State.init({
  markets: [],
  activeTab: "markets", //markets yours
});

const storeTab = Storage.privateGet("tab");

if (storeTab !== undefined) {
  State.update({ activeTab: storeTab || "markets" });
}

const sender = Ethers.send("eth_requestAccounts", [])[0];

if (sender) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      console.log("chainId: ", chainId);
      State.update({ chainId, sender });
    })
    .catch(() => {});
}

if (sender && !state.sender) {
  State.update({
    sender,
  });
}

const Container = styled.div`
  --text-color: #7794d3;
  --button-color: #33549c;
  --border-color: #2c334b;
  --input-border-color: #2c334b;
  --input-select-bg-color: #222436;
  --secondary-text-color: #7794d3;
  --thirdary-text-color: #4f5375;
  --dex-active-text-color: #fff;
  --button-text-color: #fff;
  --dex-hover-bg-color: rgba(51, 84, 156, 0.1);
`;

if (!state.sender) {
  return (
    <Container>
      <Widget
        src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
        props={{
          ...CONNECT_PROPS,
          theme,
          isWrongNetwork: false,
        }}
      />
    </Container>
  );
}

return (
  <>
    <Wrapper>
      <TabWrapper>
        <div
          className={`title ${state.activeTab === "markets" ? "active" : ""}`}
          // style={{
          //   textDecoration: "none",
          // }}
          onClick={() => {
            State.update({ activeTab: "markets" });
            Storage.privateSet("tab", "markets");
          }}
        >
          Market
        </div>

        {state.sender && (
          <div
            className={`title ${state.activeTab === "yours" ? "active" : ""}`}
            onClick={() => {
              State.update({ activeTab: "yours" });
              Storage.privateSet("tab", "yours");
            }}
          >
            Yours
          </div>
        )}
      </TabWrapper>

      {state.activeTab === "markets" && (
        <div className="markets-page">
          <div className="markets-page-table">
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
          </div>
          <div className="markets-page-list">
            {state.markets.map((m) => {
              return (
                <div className="markets-page-list-item">
                  <div className="list-item-title">
                    <img className="icon" src={m.proIcon} alt="" />
                    <div>
                      <div className="light-value">{m.proSymbol}</div>
                      <div className="gray-value">{m.protocol}</div>
                    </div>
                  </div>
                  <Term>
                    <div className="lable">Maturity</div>
                    <div>
                      <div className="light-value">
                        {formateTime(m.expiry).formattedDate}
                      </div>
                      <div className="gray-value">
                        {formateTime(m.expiry).daysDiff}
                      </div>
                    </div>
                  </Term>
                  <Term>
                    <div className="lable">Underlying APY/Price</div>
                    <div>
                      <div className="light-value">
                        {formateValue(m.underlyingApy * 100, 3)}%
                      </div>
                      <div className="gray-value">
                        ${formateValue(m.accountingAsset.price.usd, 4)}
                      </div>
                    </div>
                  </Term>
                  <Term>
                    <div className="lable">Implied APY</div>
                    <div>
                      <div className="light-value">
                        {formateValue(m.impliedApy * 100, 3)}%
                      </div>
                    </div>
                  </Term>
                  <div style={{ display: "flex" }}>
                    <Term>
                      <a
                        className="yt-area"
                        style={{
                          textDecoration: "none",
                          width: "100%",
                        }}
                        href={`/bluebiu.near/widget/Arbitrum.Pendle.TradeSwap?market_address=${m.address}&type=yt`}
                      >
                        <div>
                          <div className="light-value">
                            {formateValue(m.ytFloatingApy * 100, 3)}%
                          </div>
                          <div className="gray-value">
                            ${formateValue(m.yt.price.usd, 4)}
                          </div>
                        </div>
                        <div className="art-text">YT</div>
                      </a>
                    </Term>
                    <Term>
                      <a
                        className="pt-area"
                        style={{
                          textDecoration: "none",
                          width: "100%",
                        }}
                        href={`/bluebiu.near/widget/Arbitrum.Pendle.TradeSwap?market_address=${m.address}&type=pt`}
                      >
                        <div>
                          <div className="light-value">
                            {formateValue(m.impliedApy * 100, 3)}%
                          </div>
                          <div className="gray-value">
                            ${formateValue(m.pt.price.usd, 4)}
                          </div>
                        </div>
                        <div className="art-text">PT</div>
                      </a>
                    </Term>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {state.activeTab === "yours" && (
        <Widget
          src="bluebiu.near/widget/Arbitrum.Pendle.DashBoard.UserDashBoard"
          props={{
            markets: state.markets,
            sender: state.sender,
            chainId: state.chainId,
          }}
        />
      )}
    </Wrapper>

    <Widget
      props={{
        onLoad: (markets) => State.update({ markets }),
      }}
      src="bluebiu.near/widget/Arbitrum.Pendle.getMarkets"
    />
  </>
);
