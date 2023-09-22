const { hotIcon, trendIcon, myQuestIcon, innerWidth } = props;

const css = fetch(
  "https://fonts.googleapis.com/css2?family=Gantari:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
).body;

if (!css) {
  return;
}

const Theme = styled.div`
  * {
    font-family: "Gantari";
  }
  ${css}
`;

const searchIcon = (
  <svg
    width="26"
    height="20"
    viewBox="0 0 26 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.5382 9.0191C16.5382 13.1718 13.1718 16.5382 9.0191 16.5382C4.86642 16.5382 1.5 13.1718 1.5 9.0191C1.5 4.86642 4.86642 1.5 9.0191 1.5C13.1718 1.5 16.5382 4.86642 16.5382 9.0191Z"
      stroke="#EBF479"
      stroke-width="3"
    />
    <rect
      x="19.1655"
      y="12.4033"
      width="7.89171"
      height="3.38216"
      rx="1.69108"
      transform="rotate(30 19.1655 12.4033)"
      fill="#EBF479"
    />
  </svg>
);

const topImg =
  "https://ipfs.near.social/ipfs/bafkreih4g6tq57itr2w3qy6gtrix6adxv3dr6ilgqrofqm7jr67gmpitju";

const trendsImg =
  "https://ipfs.near.social/ipfs/bafkreiajqyqbq3egqtu6ddznvl6caghpjffulhfia4f6bsmmlo76t5qosq";

const closeIcon =
  "https://ipfs.near.social/ipfs/bafkreiay565opvpvtxexcxkfo7cif3ecn4znoarnutcvhjggiczjpuvbbq";

const titleIcon = (
  <svg
    width="193"
    height="16"
    viewBox="0 0 193 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 14.0001C36 10.5001 112.6 3.20006 147 2.00006C190 0.500062 199.5 4.50006 185 8.00006"
      stroke="#E9F456"
      stroke-width="3"
      stroke-linecap="round"
    />
  </svg>
);

const ArrowRight = (
  <svg
    width="16"
    height="8"
    viewBox="0 0 16 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.3536 4.35355C15.5488 4.15829 15.5488 3.84171 15.3536 3.64645L12.1716 0.464467C11.9763 0.269205 11.6597 0.269205 11.4645 0.464467C11.2692 0.659729 11.2692 0.976312 11.4645 1.17157L14.2929 4L11.4645 6.82843C11.2692 7.02369 11.2692 7.34027 11.4645 7.53553C11.6597 7.7308 11.9763 7.7308 12.1716 7.53553L15.3536 4.35355ZM-4.37114e-08 4.5L15 4.5L15 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z"
      fill="#EBF479"
    />
  </svg>
);

const myQuestImgUrl =
  "https://ipfs.near.social/ipfs/bafkreied733todmtzbzvnx3cwzhggf3vnlxriiv7ukoqk4nonay5cgx3fm";

const trendImgUrl =
  "https://ipfs.near.social/ipfs/bafkreiclfd6ivmfsw75gyxnhncz7q5d6r3utji2ew5we47eru6bsjt6s64";

const hotImgUrl =
  "https://ipfs.near.social/ipfs/bafkreida3fifpbsbadyny242ol6tmha2lpl32kwnxthzeokwqh3c5n733y";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  width: 100%;
  gap: 28px;
  color: white;

  font-family: "Gantari";

  .header {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .header-title {
      font-size: 40px;
      font-weight: 700;
      line-height: 48px;
      text-align: left;
      padding-bottom: 16px;
    }

    .header-title-mobile {
      display: none;
    }

    .title-icon-mobile {
      display: none;
      margin-top: -36px;
    }
    .header-description {
      font-size: 20px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: left;
      color: #979abe;
    }
  }

  .pc-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 28px;
    .input-wrapper {
      display: flex;
      align-items: center;
      position: relative;
      width: 100%;
      gap: 32px;

      .input-search-wrapper {
        position: relative;
        width: 100%;
      }

      .search-wrapper {
        position: absolute;
        right: 12px;
        top: 12px;
      }

      .input-records {
        background: none;
        color: #ebf479;
        border: 1px solid #eef3bc;
        text-align: left;
        outline: none;
        font-size: 20px;
        font-weight: 500;
        line-height: 24px;
        padding: 14px;
        width: 100%;
        border-radius: 16px;
        ::placeholder {
          color: rgba(235, 244, 121, 0.3);
        }
      }

      .input-button {
        width: 169px;
        height: 64px;
        border-radius: 16px;
        background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
        text-align: center;
        color: #02051e;
        flex-shrink: 0;
        cursor: pointer;
        vertical-align: middle;
        padding-top: 20px;
        padding-bottom: 20px;
      }
    }

    .quest-title-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    .quest-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 18px;
      font-weight: 500;
      line-height: 22px;
      text-align: left;
    }

    .view-all {
      color: #ecf488;
      border: 1px solid #ecf488;
      width: 100px;
      border-radius: 20px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 14px;
      padding: 6px 0px;
      cursor: pointer;
      :hover {
        text-decoration: none;
      }
    }

    .execute-records {
      color: #ecf488;
      border: 1px solid #ecf488;
      width: 139px;
      border-radius: 20px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 14px;
      padding: 6px 0px;
      :hover {
        text-decoration: none;
      }
    }

    .trend-card {
      width: 250px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .trend-card-text {
        color: white;
        font-size: 18px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0em;
        text-align: center;

        .trend-card-text-number {
          color: #979abe;
          font-size: 14px;
          font-weight: 400;
          text-align: left;
        }
      }

      .trend-card-dapp-name {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        gap: 6px;
        .trend-card-dapp-name-icon {
          width: 26px;
          height: 26px;
          border-radius: 8px;
        }

        .trend-card-dapp-name-text {
          color: #979abe;
          font-size: 14px;
          font-weight: 400;
          text-align: left;
        }
      }
    }
  }

  .mobile-page {
    display: none;
  }

  @media (max-width: 900px) {
    padding: 0px 16px;
    .header {
      .header-title {
        font-size: 26px;
      }
      .header-title-pc {
        display: none;
      }
      .header-title-mobile {
        display: block;
        line-height: 36px;
      }
      .title-icon-mobile {
        display: inline-block;
      }
      .header-description {
        font-size: 16px;
        letter-spacing: 0.4px;
        line-height: 20px;
      }
    }

    .pc-page {
      display: none;
    }

    .mobile-page {
      display: block;
      .make-quest-btn {
        width: 100%;
        font-size: 20px;
        font-weight: 700;
        line-height: 24px;
        text-align: center;
        border-radius: 12px;
        padding: 16px 0;
        color: #02051e;
        background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
      }
      .overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: black;
        opacity: 0.5;
        z-index: 1000;
      }
      .quest-btn-popups {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        height: 70vh;
        background-color: #1e202f;
        z-index: 1001;
        border-radius: 12px 12px 0 0;
        padding: 22px;
        .cancel {
          width: 162px;
          height: 50px;
          position: fixed;
          bottom: 30px;
          left: 20px;
          color: #e9f456;
          font-size: 16px;
          border: 1px #e9f456 solid;
          line-height: 50px;
          text-align: center;
          border-radius: 12px;
        }
      }

      .tip-list {
        margin: 10px 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        position: relative;
        .tip-list-right {
          margin-top: 36px;
        }
        .tip-list-close {
          background: rgba(55, 58, 83, 0.5);
          display: flex;
          padding: 4px 8px;
          width: 68px;
          height: 26px;
          line-height: 26px;
          text-align: center;
          align-items: center;
          border-radius: 8px;
          font-family: Gantari;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0em;
          text-align: left;
          color: rgba(151, 154, 190, 1);
          position: absolute;
          top: 0;
          right: 0;
          img {
            width: 10px;
            height: 10px;
            margin-left: 8px;
          }
        }
      }

      .mobile-tab {
        margin-top: 24px;
      }
    }
  }
`;

const Container = styled.div`
  width: 100%;
  .contentOut {
    padding-top: 25px;
  }
  .contentOut p {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #ffffff;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  .item {
    flex-grow: 1;
    text-align: center;
    padding: 10px 0;
    font-weight: 500;
    font-size: 16px;
    color: #7e8a93;
    cursor: pointer;
    margin-bottom: 2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .item-img {
      width: 100%;
      height: 42px;
      img {
        width: 40px;
        height: 40px;
      }
    }
  }
  .item.active {
    color: #fff;
    position: relative;
  }
  .item.active::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #e9f456;
    border-radius: 5px;
  }
  .item.disable {
    cursor: not-allowed;
  }
  .icon {
    width: 26px;
  }
`;

const CardListWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${(props) => (props.isMyQuest ? "18px" : "32px")};
  @media (max-width: 900px) {
    gap: ${(props) => (props.isMyQuest ? "18px" : "32px 18px")};
    justify-content: space-between;
  }
`;

const Seperator = styled.div`
  border: 1px solid #292c42;
  height: 1px;
  width: 100%;
  margin: 20px 0px;
`;

const sender = Ethers.send("eth_requestAccounts", [])[0];

const { activeMenu, showPopup, showTip } = state;

const storedActiveMenu = Storage.get(
  "activeMenu",
  "guessme.near/widget/ZKEVMWarmUp.warm-up"
);

const storedShowTip = Storage.get("showTip-status");

State.init({
  showPopup: false,
  showTip: true,
  activeMenu: storedActiveMenu || "myQuest",
});

if (storedShowTip == "on") {
  State.update({
    showTip: false,
  });
} else {
  State.update({
    showTip: true,
  });
}

function changeTab(menu) {
  State.update({
    activeMenu: menu,
  });
  Storage.set("activeMenu", menu);
}
function handleMakeQuestBtnClick() {
  State.update({
    showPopup: true,
  });
}

function handleCancelClick() {
  State.update({
    showPopup: false,
  });
}

function handleTipClick() {
  State.update({
    showTip: false,
  });
  Storage.set("showTip-status", "on");
}

return (
  <Theme>
    <Wrapper>
      <Widget src="guessme.near/widget/ZKEVMWarmUp.generage-uuid" />

      <div className="header">
        <div className="header-title header-title-pc">
          Participate In Polygon zkEVM easily
        </div>
        <div className="header-title header-title-mobile">
          Participate in
          <br />
          Polygon zkEVM easily
        </div>
        <div className="title-icon-mobile">{titleIcon}</div>

        <div className="header-description">
          Keep track of your activity and loyalty, make sure we are ready for
          any airdrop
        </div>
      </div>

      <div className="pc-page">
        <Widget src="guessme.near/widget/ZKEVMWarmUp.input-search" />

        <div className="quest-title-wrapper">
          <div className="quest-title">
            <img src={myQuestIcon} width={"39"} alt="" />
            My Quest
          </div>

          <a
            href="/guessme.near/widget/ZKEVM.ExecuteRecords"
            className="execute-records"
          >
            Execute Records
          </a>
        </div>

        <Widget
          src="guessme.near/widget/ZKEVMWarmUp.quest-list"
          props={{
            innerWidth,
          }}
        />

        <Seperator />

        <div className="quest-title-wrapper">
          <div className="quest-title">
            <img src={trendIcon} width={"26"} alt="" />
            Quest Trends{" "}
          </div>

          <a
            className="view-all"
            href="/guessme.near/widget/ZKEVM.QuestionList"
          >
            <span>View All</span>
            {ArrowRight}
          </a>
        </div>

        <Widget src="guessme.near/widget/ZKEVMWarmUp.trend-list" />

        <div className="quest-title-wrapper">
          <div className="quest-title">
            <img src={hotIcon} width={"26"} alt="" />
            Hot Polygon zkEVM DApps{" "}
          </div>
        </div>

        <CardListWrapper>
          <Widget
            src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
            props={{
              background: "linear-gradient(180deg, #7347DA 0%, #202445 100%)",
              dappName: "Polygon zkEVM All-in-one",
              creator: "bluebiu.near",
              widgetSrc: "bluebiu.near/widget/ZKEVM-all-in-one",
              src: "https://assets.ref.finance/images/zkevm-swap.png",
            }}
          />
          <Widget
            src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
            props={{
              background: "linear-gradient(180deg, #8C36D8 0%, #24264C 100%)",
              dappName: "Polygon zkEVM Dex",
              creator: "guessme.near",
              widgetSrc: "guessme.near/widget/ZKEVMSwap.zkevm-swap",
              src: "https://assets.ref.finance/images/zkevm-swap.png",
            }}
          />
          <Widget
            src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
            props={{
              background: "linear-gradient(180deg, #7347DA 0%, #202445 100%)",
              dappName: "zkEVM-bridge",
              creator: "guessme.near",
              widgetSrc: "guessme.near/widget/ZKEVMSwap.zkevm-bridge",
              src: "https://assets.ref.finance/images/zkevm-swap.png",
            }}
          />

          <Widget
            src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
            props={{
              background: "linear-gradient(180deg, #895C5C 0%, #343149 100%)",
              dappName: "Gamma",
              creator: "guessme.near",
              widgetSrc: "guessme.near/widget/ZKEVM.GAMMA",

              src: "https://assets.ref.finance/images/zkevm-swap.png",
            }}
          />

          <Widget
            src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
            props={{
              background: "linear-gradient(180deg, #4A80A7 0%, #343149 100%)",
              dappName: "0vix",
              creator: "bluebiu.near",
              widgetSrc: "bluebiu.near/widget/0vix.Lending",
              src: "https://assets.ref.finance/images/zkevm-swap.png",
            }}
          />
        </CardListWrapper>
      </div>

      <div className="mobile-page">
        <div className="make-quest-btn" onClick={handleMakeQuestBtnClick}>
          Make A Quest
        </div>
        {showPopup ? (
          <>
            <div className="overlay"></div>
            <div className="quest-btn-popups">
              <Widget src="guessme.near/widget/ZKEVMWarmUp.input-search" />
              <Widget src="guessme.near/widget/ZKEVM.QuestionList" />
              <div className="cancel" onClick={handleCancelClick}>
                Cancel
              </div>
            </div>
          </>
        ) : null}
        {showTip ? (
          <div className="tip-list">
            <div className="tip-list-left">
              {" "}
              <img src={topImg} alt="" />
            </div>
            <div className="tip-list-right">
              {" "}
              <img src={trendsImg} alt="" />
            </div>
            <div className="tip-list-close" onClick={handleTipClick}>
              Close <img src={closeIcon} alt="" />
            </div>
          </div>
        ) : null}
        <div className="mobile-tab">
          <Container>
            <MenuContainer>
              <div
                onClick={() => {
                  changeTab("myQuest");
                }}
                class={`item ${activeMenu == "myQuest" ? "active" : ""}`}
              >
                <div className="item-img">
                  <img src={myQuestImgUrl} alt="" />
                </div>
                <div className="item-text">My Quest</div>
              </div>
              <div
                onClick={() => {
                  changeTab("questTrends");
                }}
                class={`item ${activeMenu == "questTrends" ? "active" : ""}`}
              >
                <div className="item-img">
                  <img src={trendImgUrl} alt="" />
                </div>
                <div className="item-text">Quest Trends </div>
              </div>

              <div
                class={`item ${activeMenu == "zkEVMDApps" ? "active" : ""}`}
                onClick={() => {
                  changeTab("zkEVMDApps");
                }}
              >
                <div className="item-img">
                  <img src={hotImgUrl} alt="" />
                </div>
                <div className="item-text">Hot DApps </div>
              </div>
            </MenuContainer>
            <div class="flex-grow contentOut">
              {activeMenu == "myQuest" ? (
                <>
                  <Widget src="guessme.near/widget/ZKEVMWarmUp.quest-list" />
                </>
              ) : null}
              {activeMenu == "questTrends" ? (
                <>
                  <Widget src="guessme.near/widget/ZKEVMWarmUp.trend-list" />
                </>
              ) : null}
              {activeMenu == "zkEVMDApps" ? (
                <>
                  <CardListWrapper>
                    <Widget
                      src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
                      props={{
                        background:
                          "linear-gradient(180deg, #7347DA 0%, #202445 100%)",

                        dappName: "Polygon zkEVM All-in-one",
                        creator: "bluebiu.near",
                        widgetSrc: "bluebiu.near/widget/ZKEVM-all-in-one",
                        src: "https://assets.ref.finance/images/zkevm-swap.png",
                      }}
                    />

                    <Widget
                      src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
                      props={{
                        background:
                          "linear-gradient(180deg, #8C36D8 0%, #24264C 100%)",
                        dappName: "Polygon zkEVM Dex",
                        creator: "guessme.near",
                        widgetSrc: "guessme.near/widget/ZKEVMSwap.zkevm-swap",
                        src: "https://assets.ref.finance/images/zkevm-swap.png",
                      }}
                    />
                    <Widget
                      src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
                      props={{
                        background:
                          "linear-gradient(180deg, #7347DA 0%, #202445 100%)",
                        dappName: "zkEVM-bridge",
                        creator: "guessme.near",
                        widgetSrc: "guessme.near/widget/ZKEVMSwap.zkevm-bridge",
                        src: "https://assets.ref.finance/images/zkevm-swap.png",
                      }}
                    />

                    <Widget
                      src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
                      props={{
                        background:
                          "linear-gradient(180deg, #895C5C 0%, #343149 100%)",
                        dappName: "Gamma",
                        creator: "guessme.near",
                        widgetSrc: "guessme.near/widget/ZKEVM.GAMMA",

                        src: "https://assets.ref.finance/images/zkevm-swap.png",
                      }}
                    />

                    <Widget
                      src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
                      props={{
                        background:
                          "linear-gradient(180deg, #4A80A7 0%, #343149 100%)",
                        dappName: "0vix",
                        creator: "bluebiu.near",
                        widgetSrc: "bluebiu.near/widget/0vix.Lending",
                        src: "https://assets.ref.finance/images/zkevm-swap.png",
                      }}
                    />
                  </CardListWrapper>
                </>
              ) : null}
            </div>
          </Container>
        </div>
      </div>
    </Wrapper>
  </Theme>
);
