const UserDashBoard = styled.div`
  color: #ffffff;
  .special-rewards-btn {
    display: none;
  }
  table {
    width: 100%;
    tr th {
      padding: 10px 0;
      border-bottom: 1px solid rgba(44, 51, 75, 1);
      font-family: Gantari;
      font-size: 14px;
      font-weight: 400;
      line-height: 17px;
      letter-spacing: 0em;
      text-align: left;
      color: rgba(151, 154, 190, 1);
    }
    tr td {
      padding: 16px 0;
      font-family: Gantari;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0em;
      text-align: left;
      color: rgba(255, 255, 255, 1);
      p {
        margin: 0;
      }
      span {
        font-family: Gantari;
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0em;
        text-align: left;
        color: #797a84;
        display: block;
        margin-top: 0;
      }
    }
    tr .td-proName {
      display: flex;
      img {
        width: 36px;
        height: 36px;
        margin-right: 8px;
      }
      .td-proName-text {
        display: inline-block;
        p {
          font-family: Gantari;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0em;
          text-align: left;
          margin: 0;
        }
        span {
          font-family: Gantari;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0em;
          text-align: left;
          color: #797a84;
          display: block;
          margin-top: 0;
        }
      }
    }
  }
  .userDashBoard-content-list {
    display: none;
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
  @media (max-width: 900px) {
    .special-rewards-btn {
      display: block;
      width: 100%;
      background: #4982ff;
      padding: 8px 14px;
      font-family: Gantari;
      font-size: 12px;
      font-weight: 400;
      border-radius: 6px;
      color: #ffffff;
      text-align: center;
      align-items: center;
      cursor: pointer;
      margin-bottom: 16px;
      p {
        margin: 0;
      }
    }
    .userDashBoard-content {
      .userDashBoard-content-table {
        display: none;
      }
      .userDashBoard-content-list {
        display: block;
        .content-list-item {
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
            position: relative;
            width: 100%;
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
            .item-title-right {
              position: absolute;
              right: 0;
              top: 0;
            }
          }
        }
      }
    }
  }
`;

const List = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

const Item = styled.div`
  font-family: Gantari;
  margin-right: 10%;
  p {
    font-size: 14px;
    font-weight: 400;
    color: #979abe;
  }
  h1 {
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
  }
  .claim-rewards-btn {
    background: #4982ff;
    padding: 8px 14px;
    font-family: Gantari;
    font-size: 12px;
    font-weight: 400;
    border-radius: 6px;
    color: #ffffff;
    display: inline-block;
    margin-left: 12px;
    cursor: pointer;
  }
  @media (max-width: 900px) {
    flex: 1;
    .claim-rewards-btn {
      display: none;
    }
  }
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;
const ClaimRewards = styled.div`
  position: fixed;
  top: 45%;
  left: 50%;
  height: 70vh;
  overflow: auto;
  transform: translate(-45%, -50%);
  width: 45%;
  border: 1px solid #2c334b;
  background: linear-gradient(0deg, #181a27, #181a27),
    linear-gradient(0deg, #2c334b, #2c334b);
  z-index: 1000;
  border-radius: 6px;
  padding: 24px;
  .rewards-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    h1 {
      font-family: Gantari;
      font-size: 18px;
      font-weight: 500;
      img {
        cursor: pointer;
      }
    }
  }
  .rewards-content {
    .rewards-content-table {
      table {
        border-collapse: separate;
        border-spacing: 0 10px;
        tr td {
          padding: 10px;
          .td-type {
            width: min-content;
            border: 1px solid;
            padding: 0 12px;
            border-radius: 9px;
            font-size: 12px;
          }
        }
        tr td:first-child {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }

        tr td:last-child {
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
        .checkbox {
          background-color: transparent;
        }
      }
      .rewards-content-list {
        display: none;
      }
    }
    .rewards-content-list {
      display: none;
    }
  }
  .rewards-side {
    border: 1px solid rgba(66, 74, 102, 1);
    width: 100%;
    height: 1px;
    margin: 12px 0;
  }
  .rewards-list {
    display: flex;
    justify-content: space-between;
    img {
      width: 18px;
      height: 18px;
    }
  }
  .rewards-btn {
    cursor: pointer;
    width: 138px;
    height: 50px;
    text-align: center;
    border-radius: 10px;
    line-height: 50px;
    border-radius: 10px;
    font-size: 18px;
    color: #ffffff;
    background: rgba(73, 130, 255, 1);
  }
  .mobile-btn {
    display: none;
  }
  @media (max-width: 900px) {
    position: fixed;
    bottom: 0;
    left: 0;
    transform: none;
    width: 100%;
    background: rgba(35, 42, 61, 1);
    .rewards-content {
      .rewards-content-table {
        display: none;
      }
      .rewards-content-list {
        display: block;
        .content-list-title {
          display: flex;
          margin-bottom: 14px;
          p {
            margin: 0 0 0 14px;
          }
        }
        .content-list-item {
          display: flex;
          .list-item-page {
            width: 100%;
            margin: 0 14px 14px 14px;
            background: linear-gradient(0deg, #181a27, #181a27),
              linear-gradient(0deg, #2c334b, #2c334b);
            border-radius: 10px;
            padding: 14px 16px;
            .item-page-title {
              margin: 0 0 14px 0;
              position: relative;
              .page-title-right {
                position: absolute;
                right: 0;
                top: 0;
                width: min-content;
                border: 1px solid;
                padding: 0 12px;
                border-radius: 9px;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
    .rewards-btn {
      display: none;
    }
    .mobile-btn {
      display: block;
      width: 100%;
      margin-top: 16px;
      margin-bottom: 100px;
    }
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
`;

const closeIcon =
  "https://ipfs.near.social/ipfs/bafkreih3abysbho4sd4rkxbpzbl4yyi37phzb7jja33vrhkoufmrxqenpi";

const { listData, allAssetsData } = state;

const { markets, sender, chainId } = props;

const CHAIN_ID = 42161;

const theme = {
  textColor: "#7794D3",
  buttonColor: "#33549C",
};

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

if (chainId !== CHAIN_ID) {
  return (
    <Container>
      <Widget
        src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
        props={{
          ...CONNECT_PROPS,
          theme,
          isWrongNetwork: true,
        }}
      />
    </Container>
  );
}

const fetchPoolsData = () => {
  asyncFetch(
    "https://api-v2.pendle.finance/core/v1/" +
      CHAIN_ID +
      "/users/" +
      props.sender +
      "/positions"
  ).then((res) => {
    if (!res.ok) return;
    State.update({
      listData: res.body.positions,
    });
  });
};

const allPrice = async () => {
  asyncFetch("https://api-v2.pendle.finance/core/v1/42161/assets/all").then(
    (res) => {
      if (!res.ok) return;
      State.update({
        allAssetsData: res.body,
      });
    }
  );
};

const startDataFetching = () => {
  fetchPoolsData();
  allPrice();
};

startDataFetching();

// const interval = 5000;
// const timerId = setInterval(startDataFetching, interval);

function formatDate(dateString) {
  const dateObj = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);
  const [month, day, year] = formattedDate.split(" ");
  const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  return `${day.replace(",", "")} ${formattedMonth} ${year}`;
}

function calculateDaysToExpiry(expiry) {
  const expiryDate = new Date(expiry);
  const currentDate = new Date();
  const timeDifference = expiryDate.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
}

State.init({
  unclaimedRewardsPool: "",
  unclaimedRewardsSY: "",
  unclaimedRewardsPy: "",
  showClaimRewards: false,
  claimList: [],
});

const chickClaimPopup = () => {
  State.update({ showClaimRewards: true });
};

const closeClaimPopup = () => {
  State.update({ showClaimRewards: false });
};

function getColorByType(types) {
  switch (types) {
    case "YT":
      return "#75AFF5";
    case "SY":
      return "#17DFBA";
    default:
      return "#ffffff";
  }
}

function handleCheckBox(checked, type, address) {
  if (!state.claimList) return;

  if (!checked) {
    const curList = state.claimList;

    const index = curList.findIndex((item) => item.address === address);
    if (index > -1) {
      curList.splice(index, 1);
      State.update({ claimList: curList });
    }
  } else {
    const newList = [...state.claimList, { type, address }];
    State.update({
      claimList: newList,
    });
  }
}

return (
  <UserDashBoard>
    <List>
      <Item>
        <p>My Total Position Value</p>
        <h1>
          {state.listData.length > 0
            ? `$${state.listData
                .reduce(
                  (total, data) => total + parseFloat(data.positionValue),
                  0
                )
                .toFixed(2)}`
            : "$ -"}
        </h1>
      </Item>
      <Item>
        <p>Claimable Rewards</p>
        <h1>
          {state.unclaimedRewardsPool < 0.01
            ? "<$0.01"
            : `$${(
                state.unclaimedRewardsPool +
                state.unclaimedRewardsSY +
                state.unclaimedRewardsPy
              ).toFixed(2)}`}
          <p className="claim-rewards-btn" onClick={chickClaimPopup}>
            Claim Yield $ Rewards
          </p>
        </h1>
      </Item>
      {state.showClaimRewards && (
        <>
          <Overlay />
          <ClaimRewards>
            <div className="rewards-title">
              <h1>Claim Earnings</h1>
              <img src={closeIcon} alt="" onClick={closeClaimPopup} />
            </div>
            <div className="rewards-content">
              <div className="rewards-content-table">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <input type="checkbox" className="checkbox" />
                      </th>
                      <th>Position</th>
                      <th>Type</th>
                      <th>Token</th>
                      <th>Claimable</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.listData === undefined ? (
                      <tr>
                        <td>Loading...</td>
                      </tr>
                    ) : (
                      state.listData
                        .filter(
                          (item) =>
                            !(
                              item.asset.types &&
                              item.asset.types.includes("PT")
                            )
                        )
                        .map((item, index) => (
                          <tr
                            key={index}
                            style={{
                              backgroundColor: "rgba(43, 46, 65, 1)",
                              borderRadius: "6px",
                            }}
                          >
                            <td>
                              <input
                                type="checkbox"
                                className="checkbox"
                                onChange={(e) => {
                                  console.log("echeck: ", e);
                                  handleCheckBox(
                                    e.target.checked,
                                    item.asset.types[0],
                                    item.asset.address
                                  );
                                }}
                              />
                            </td>
                            <td>
                              <p style={{ color: item.asset.accentColor }}>
                                {item.asset.proName}
                                {item.asset.expiry !== null && (
                                  <>( {formatDate(item.asset.expiry)} )</>
                                )}
                              </p>
                              <span>{item.asset.protocol}</span>
                            </td>
                            <td>
                              <div content={item.asset.types.join(", ")}>
                                {item.asset.types.map((type, index) => (
                                  <div
                                    className="td-type"
                                    key={index}
                                    style={{
                                      color: getColorByType(type),
                                      borderColor: getColorByType(type),
                                    }}
                                  >
                                    {type}
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td>
                              {item.asset.types &&
                              item.asset.types.includes("PENDLE_LP") ? (
                                <Widget
                                  src="bluebiu.near/widget/Arbitrum.Pendle.DashBoard.BoardPoolAmount"
                                  props={{
                                    marketAddress: item.asset.address,
                                    user: props.sender,
                                    allAssetsData: state.allAssetsData,
                                    onLoad: (unclaimedRewardsPool) =>
                                      State.update({ unclaimedRewardsPool }),
                                  }}
                                />
                              ) : null}
                              {item.asset.types &&
                              item.asset.types.includes("SY") ? (
                                <Widget
                                  src="bluebiu.near/widget/Arbitrum.Pendle.DashBoard.BoardSyAmount"
                                  props={{
                                    marketAddress: item.asset.address,
                                    user: props.sender,
                                    allAssetsData: state.allAssetsData,
                                    onLoad: (unclaimedRewardsSY) =>
                                      State.update({ unclaimedRewardsSY }),
                                  }}
                                />
                              ) : null}
                              {item.asset.types &&
                              item.asset.types.includes("PT") ? (
                                <>-</>
                              ) : null}
                              {item.asset.types &&
                              item.asset.types.includes("YT") ? (
                                <Widget
                                  src="bluebiu.near/widget/Arbitrum.Pendle.DashBoard.BoardPyAmount"
                                  props={{
                                    marketAddress: item.asset.address,
                                    user: props.sender,
                                    allAssetsData: state.allAssetsData,
                                    onLoad: (unclaimedRewardsPy) =>
                                      State.update({ unclaimedRewardsPy }),
                                  }}
                                />
                              ) : null}
                            </td>
                            <td>
                              {item.asset.types &&
                              item.asset.types.includes("PENDLE_LP") ? (
                                <Widget
                                  src="bluebiu.near/widget/Arbitrum.Pendle.DashBoard.BoardPoolAction"
                                  props={{
                                    marketAddress: item.asset.address,
                                    user: props.sender,
                                    allAssetsData: state.allAssetsData,
                                    onLoad: (unclaimedRewardsPool) =>
                                      State.update({ unclaimedRewardsPool }),
                                  }}
                                />
                              ) : null}
                              {item.asset.types &&
                              item.asset.types.includes("SY") ? (
                                <Widget
                                  src="bluebiu.near/widget/Arbitrum.Pendle.DashBoard.BoardSyAction"
                                  props={{
                                    marketAddress: item.asset.address,
                                    user: props.sender,
                                    allAssetsData: state.allAssetsData,
                                    onLoad: (unclaimedRewardsSY) =>
                                      State.update({ unclaimedRewardsSY }),
                                  }}
                                />
                              ) : null}
                              {item.asset.types &&
                              item.asset.types.includes("PT") ? (
                                <>-</>
                              ) : null}
                              {item.asset.types &&
                              item.asset.types.includes("YT") ? (
                                <Widget
                                  src="bluebiu.near/widget/Arbitrum.Pendle.DashBoard.BoardPyAction"
                                  props={{
                                    marketAddress: item.asset.address,
                                    user: props.sender,
                                    allAssetsData: state.allAssetsData,
                                    onLoad: (unclaimedRewardsPy) =>
                                      State.update({ unclaimedRewardsPy }),
                                  }}
                                />
                              ) : null}
                            </td>
                            <td>
                              {item.positionValue < 0.01
                                ? "<$0.01"
                                : `$${item.positionValue.toFixed(2)}`}
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="rewards-content-list">
                <div className="content-list-title">
                  <input type="checkbox" className="checkbox" />
                  <p>Claim All</p>
                </div>
                {state.listData === undefined ? (
                  <tr>
                    <td>Loading...</td>
                  </tr>
                ) : (
                  state.listData
                    .filter(
                      (item) =>
                        !(item.asset.types && item.asset.types.includes("PT"))
                    )
                    .map((item, index) => (
                      <div key={index} className="content-list-item">
                        <div>
                          <input type="checkbox" className="checkbox" />
                        </div>
                        <div className="list-item-page">
                          <div className="item-page-title">
                            <div
                              className="light-value"
                              style={{ color: item.asset.accentColor }}
                            >
                              {item.asset.proName}
                              {item.asset.expiry !== null && (
                                <>( {formatDate(item.asset.expiry)} )</>
                              )}
                            </div>
                            <div className="gray-value">
                              {item.asset.protocol}
                            </div>
                            <div content={item.asset.types.join(", ")}>
                              {item.asset.types.map((type, index) => (
                                <div
                                  className="page-title-right"
                                  key={index}
                                  style={{
                                    color: getColorByType(type),
                                    borderColor: getColorByType(type),
                                  }}
                                >
                                  {type}
                                </div>
                              ))}
                            </div>
                          </div>
                          <Term>
                            <div className="lable">Token</div>
                            <div>
                              <div className="light-value">
                                {item.asset.types &&
                                item.asset.types.includes("PENDLE_LP") ? (
                                  <Widget
                                    src="bluebiu.near/widget/Arbitrum.Pendle.DashBoard.BoardPoolAmount"
                                    props={{
                                      marketAddress: item.asset.address,
                                      user: props.sender,
                                      onLoad: (unclaimedRewardsPool) =>
                                        State.update({ unclaimedRewardsPool }),
                                    }}
                                  />
                                ) : null}
                                {item.asset.types &&
                                item.asset.types.includes("SY") ? (
                                  <Widget
                                    src="bluebiu.near/widget/Arbitrum.Pendle.DashBoard.BoardSyAmount"
                                    props={{
                                      marketAddress: item.asset.address,
                                      user: props.sender,
                                      onLoad: (unclaimedRewardsSY) =>
                                        State.update({ unclaimedRewardsSY }),
                                    }}
                                  />
                                ) : null}
                                {item.asset.types &&
                                item.asset.types.includes("PT") ? (
                                  <>-</>
                                ) : null}
                                {item.asset.types &&
                                item.asset.types.includes("YT") ? (
                                  <Widget
                                    src="bluebiu.near/widget/Arbitrum.Pendle.DashBoard.BoardPyAmount"
                                    props={{
                                      marketAddress: item.asset.address,
                                      user: props.sender,
                                      onLoad: (unclaimedRewardsPy) =>
                                        State.update({ unclaimedRewardsPy }),
                                    }}
                                  />
                                ) : null}
                              </div>
                            </div>
                          </Term>
                          <Term>
                            <div className="lable">Claimable</div>
                            <div>
                              <div className="light-value">
                                {item.asset.types &&
                                item.asset.types.includes("PENDLE_LP") ? (
                                  <Widget
                                    src="bluebiu.near/widget/Arbitrum.Pendle.DashBoard.BoardPoolAction"
                                    props={{
                                      marketAddress: item.asset.address,
                                      user: props.sender,
                                      onLoad: (unclaimedRewardsPool) =>
                                        State.update({ unclaimedRewardsPool }),
                                    }}
                                  />
                                ) : null}
                                {item.asset.types &&
                                item.asset.types.includes("SY") ? (
                                  <Widget
                                    src="bluebiu.near/widget/Arbitrum.Pendle.DashBoard.BoardSyAction"
                                    props={{
                                      marketAddress: item.asset.address,
                                      user: props.sender,
                                      onLoad: (unclaimedRewardsSY) =>
                                        State.update({ unclaimedRewardsSY }),
                                    }}
                                  />
                                ) : null}
                                {item.asset.types &&
                                item.asset.types.includes("PT") ? (
                                  <>-</>
                                ) : null}
                                {item.asset.types &&
                                item.asset.types.includes("YT") ? (
                                  <Widget
                                    src="bluebiu.near/widget/Arbitrum.Pendle.DashBoard.BoardPyAction"
                                    props={{
                                      marketAddress: item.asset.address,
                                      user: props.sender,
                                      onLoad: (unclaimedRewardsPy) =>
                                        State.update({ unclaimedRewardsPy }),
                                    }}
                                  />
                                ) : null}
                              </div>
                            </div>
                          </Term>
                          <Term>
                            <div className="lable">Value</div>
                            <div>
                              <div className="light-value">
                                {item.positionValue < 0.01
                                  ? "<$0.01"
                                  : `$${item.positionValue.toFixed(2)}`}
                              </div>
                            </div>
                          </Term>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
            <div className="rewards-side"></div>
            <div className="rewards-list">
              <p>Total Claiming</p>
              <span>
                {state.unclaimedRewardsPool < 0.01
                  ? "<$0.01"
                  : `$${(
                      state.unclaimedRewardsPool +
                      state.unclaimedRewardsSY +
                      state.unclaimedRewardsPy
                    ).toFixed(2)}`}
              </span>
            </div>
            <div className="rewards-list">
              <div>
                <img
                  src="https://ipfs.near.social/ipfs/bafkreia52ha24zj4dfird5zidj73fbbhpchsrzi6xwtxx55bvwntr5venq"
                  alt=""
                />
                Max Gas Fee{" "}
                {!state.gasCost ? "-" : `${state.gasCost} (${state.gasValue})`}
              </div>
              <div
                className="rewards-btn"
                onClick={() => {
                  if (state.claimList === 0 || state.gasCost) return;
                  state.claimAction();
                }}
                style={{
                  cursor:
                    state.claimList.length > 0 ? "pointer" : "not-allowed",
                }}
              >
                Claim
              </div>
            </div>
            <div
              className="rewards-btn mobile-btn"
              onClick={() => {
                if (state.claimList === 0 || state.gasCost) return;
                state.claimAction();
              }}
              style={{
                cursor: state.claimList.length > 0 ? "pointer" : "not-allowed",
              }}
            >
              Claim
            </div>
          </ClaimRewards>
        </>
      )}
    </List>
    <div
      className="claim-rewards-btn special-rewards-btn"
      onClick={chickClaimPopup}
    >
      <p>Claim Yield $ Rewards</p>
    </div>

    <div className="userDashBoard-content">
      <div className="userDashBoard-content-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Maturity</th>
              <th>Position Size</th>
              <th>Position Value</th>
              <th>Claimable Yield</th>
            </tr>
          </thead>
          <tbody>
            {state.listData === undefined ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : (
              state.listData.map((item, index) => (
                <tr key={index}>
                  <td className="td-proName">
                    <img src={item.asset.proIcon} alt="" />
                    <div className="td-proName-text">
                      <p style={{ color: item.asset.accentColor }}>
                        {item.asset.proName}
                      </p>
                      <span>{item.asset.protocol}</span>
                    </div>
                  </td>
                  <td>
                    {item.asset.expiry === null ? (
                      <>-</>
                    ) : (
                      <>
                        <p>{formatDate(item.asset.expiry)}</p>
                        <span>
                          {calculateDaysToExpiry(item.asset.expiry)} days
                        </span>
                      </>
                    )}
                  </td>
                  <td>
                    {item.positionSize}
                    {item.asset.proSymbol}
                  </td>
                  <td>
                    {item.positionValue < 0.01
                      ? "<$0.01"
                      : `$${item.positionValue.toFixed(2)}`}
                  </td>
                  <td>
                    {item.asset.types &&
                    item.asset.types.includes("PENDLE_LP") ? (
                      <Widget
                        src="bluebiu.near/widget/Arbitrum.Pendle.DashBoard.BoardPoolAction"
                        props={{
                          marketAddress: item.asset.address,
                          user: props.sender,
                          allAssetsData: state.allAssetsData,
                          onLoad: (unclaimedRewardsPool) =>
                            State.update({ unclaimedRewardsPool }),
                        }}
                      />
                    ) : null}
                    {item.asset.types && item.asset.types.includes("SY") ? (
                      <Widget
                        src="bluebiu.near/widget/Arbitrum.Pendle.DashBoard.BoardSyAction"
                        props={{
                          marketAddress: item.asset.address,
                          user: props.sender,
                          allAssetsData: state.allAssetsData,
                          onLoad: (unclaimedRewardsSY) =>
                            State.update({ unclaimedRewardsSY }),
                        }}
                      />
                    ) : null}
                    {item.asset.types && item.asset.types.includes("PT") ? (
                      <>-</>
                    ) : null}
                    {item.asset.types && item.asset.types.includes("YT") ? (
                      <Widget
                        src="bluebiu.near/widget/Arbitrum.Pendle.DashBoard.BoardPyAction"
                        props={{
                          marketAddress: item.asset.address,
                          user: props.sender,
                          allAssetsData: state.allAssetsData,
                          onLoad: (unclaimedRewardsPy) =>
                            State.update({ unclaimedRewardsPy }),
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="userDashBoard-content-list">
        {state.listData === undefined ? (
          <p>Loading...</p>
        ) : (
          state.listData.map((item, index) => (
            <div className="content-list-item" key={index}>
              <div className="list-item-title">
                <img src={item.asset.proIcon} alt="" />
                <div>
                  <div
                    className="light-value"
                    style={{ color: item.asset.accentColor }}
                  >
                    {item.asset.proName}
                  </div>
                  <div className="gray-value">{item.asset.protocol}</div>
                </div>
                <div className="item-title-right">
                  {item.asset.expiry === null ? (
                    <>-</>
                  ) : (
                    <>
                      <div className="light-value">
                        {formatDate(item.asset.expiry)}
                      </div>
                      <div className="gray-value">
                        {calculateDaysToExpiry(item.asset.expiry)} days
                      </div>
                    </>
                  )}
                </div>
              </div>
              <Term>
                <div className="lable">Position Size</div>
                <div>
                  <div className="light-value">
                    {item.positionSize}
                    {item.asset.proSymbol}
                  </div>
                </div>
              </Term>
              <Term>
                <div className="lable">Position Value</div>
                <div>
                  <div className="light-value">
                    {item.positionValue < 0.01
                      ? "<$0.01"
                      : `$${item.positionValue.toFixed(2)}`}
                  </div>
                </div>
              </Term>
              <Term>
                <div className="lable">Claimable Yield</div>
                <div>
                  <div className="light-value">
                    {item.asset.types &&
                    item.asset.types.includes("PENDLE_LP") ? (
                      <Widget
                        src="bluebiu.near/widget/Arbitrum.Pendle.DashBoard.BoardPoolAction"
                        props={{
                          marketAddress: item.asset.address,
                          user: props.sender,
                          allAssetsData: state.allAssetsData,
                          onLoad: (unclaimedRewardsPool) =>
                            State.update({ unclaimedRewardsPool }),
                        }}
                      />
                    ) : null}
                    {item.asset.types && item.asset.types.includes("SY") ? (
                      <Widget
                        src="bluebiu.near/widget/Arbitrum.Pendle.DashBoard.BoardSyAction"
                        props={{
                          marketAddress: item.asset.address,
                          user: props.sender,
                          allAssetsData: state.allAssetsData,
                          onLoad: (unclaimedRewardsSY) =>
                            State.update({ unclaimedRewardsSY }),
                        }}
                      />
                    ) : null}
                    {item.asset.types && item.asset.types.includes("PT") ? (
                      <>-</>
                    ) : null}
                    {item.asset.types && item.asset.types.includes("YT") ? (
                      <Widget
                        src="bluebiu.near/widget/Arbitrum.Pendle.DashBoard.BoardPyAction"
                        props={{
                          marketAddress: item.asset.address,
                          user: props.sender,
                          allAssetsData: state.allAssetsData,
                          onLoad: (unclaimedRewardsPy) =>
                            State.update({ unclaimedRewardsPy }),
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              </Term>
            </div>
          ))
        )}
      </div>
    </div>

    <Widget
      src="bluebiu.near/widget/Arbitrum.Pendle.DashBoard.claim-all"
      props={{
        claimList: state.claimList || [],
        onLoadGas: ({ gasCost, gasValue }) => {
          State.update({
            gasCost,
            gasValue,
          });
        },
        sender,
        onLoadFunc: (claimAction) => {
          State.update({
            claimAction,
          });
        },
      }}
    />
  </UserDashBoard>
);
