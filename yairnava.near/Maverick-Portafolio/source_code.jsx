const myCss = `
.selector {
    property:value;
    property:value;
    property:value;
}

.MainContainer {
  width: 490px;
  height: 500px;
  display: inline-flex;
  padding: 8px 8px 16px 8px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-radius: 14px;
  background: #151718;
}

.ProtocolContainer {
  display: flex;
  width: 400px;
  padding: 0px 8px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;
}

.ProtocolNetworkContainet {
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 8px;
}

.ProtocolNetworkTextSection {
  display: flex;
  padding: 4px 8px 4px 4px;
  align-items: center;
}

.ProtocolImg {
    width: 16px;
    height: 16px;
    border-radius: 16px;
}

.ProtocolText {
  color: rgba(255, 255, 255, 0.60);
  font-family: Inter;
  font-size: 8px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.ProtocolNetworkSection {
  display: flex;
  padding: 4px 8px 4px 4px;
  align-items: center;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.10);
}

.ProtocolNetworkContainer {
    display: flex;
    align-items: center;
    gap: 4px;
}

.NetworkText {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #FFF;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.SendRecieveContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.HeaderContainer {
  display: flex;
  margin: auto; 
  width: 460px;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 8px 8px;
  background: rgba(255, 255, 255, 0.10);
}

.BodyContainer {
  display: flex;
  margin: auto; 
  width: 460px;
  height: 320px;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 8px 8px;
  background: rgba(255, 255, 255, 0.10);
}

.TokenSection {
    display: flex;
    align-items: center;
    gap: 12px;
}

.TokenImg {
    width: 32px;
    height: 32px;
}

.TokenNameSection {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
}

.TokenAction {
    color: rgba(255, 255, 255, 0.60);
    font-family: Inter;
    font-size: 8px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.TokenName {
    color: #FFF;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.TokenNameSelect {
    color: #FFF;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    background:none;
    border: none;
}

.TokenAmountSection {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 2px;
}

.TokenAmount {
    color: #FFF;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.TokenAmountInput {
    color: #FFF;
    text-align: right;
    background: none;
    border: 0;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    width: 150px;
}

.TokenAmountPreview {
    color: rgba(255, 255, 255, 0.60);
    font-family: Inter;
    font-size: 8px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.UserBalance {
    cursor: pointer;
    color: rgb(141, 141, 253);
}

.RecieveContainer {
  display: flex;
  width: 450px;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 8px 8px;
  background: rgba(255, 255, 255, 0.10);
}

.LineContainer {
    display: flex;
    padding: 8px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
}

.Line {
    width: 450px;
    height: 1px;
    background: rgba(255, 255, 255, 0.10);
}

.RecipientContainer {
    display: flex;
    width: 450px;
    justify-content: space-between;
    align-items: flex-start;
}

.RecipientText {
    color: rgba(255, 255, 255, 0.60);
    font-family: Inter;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.RecipientValue {
    color: #8D8DFD;
    text-align: right;
    font-family: Inter;
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.ConfirmContainer {
    display: flex;
    height: 40px;
    padding: 0px 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
}

.ConfirmButton {
    display: flex;
    cursor:  pointer;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex: 1 0 0;
    align-self: stretch;
    border-radius: 4px;
    background: #8D8DFD;
}

.ConfirmButtonDisabled {
    display: flex;
    cursor:  default;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex: 1 0 0;
    align-self: stretch;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.1);
}

.ConfirmText {
    color: #FFF;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.ConfirmTextDisabled {
    color: rgb(93 93 93);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.TokenInsufficientBalance {
    color: rgb(255 0 0 / 60%);
    font-family: Inter;
    font-size: 8px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

option {
    background: rgb(45,47,48) !important;
    color: white !important;
}

.turnSection {
    width: 100%;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
}

.turnButton {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: 0px;
    margin: -14px 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    text-align: center;
    flex: 0 0 auto;
    font-size: 1.5rem;
    padding: 8px;
    border-radius: 50%;
    overflow: visible;
    color: rgb(255, 255, 255);
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border: 1px solid grey;
    background: rgb(45,46,47);
}

.turnButton:hover{
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgb(141, 141, 253);
}

.turnImg {
    user-select: none;
    display: inline-block;
    fill: currentcolor;
    flex-shrink: 0;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-size: 1.5rem;
    height: 20px;
    width: 20px;
}

.titleSection {
    display: flex;
    padding: 8px 16px;
    flex-direction: column;
    gap: 12px;
    width: 100%;
}

.titlePortfolio {
    margin: 0px;
    font-family: BaselGrotesk, Arial, sans-serif;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1.5rem;
    display: block;
    color: white;
}

.networkNameContainer {
    padding: 4px 8px 4px 4px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.1);
    color: #8D8DFD;
    cursor: pointer;
}

.networkName {
    color: #8D8DFD;
    cursor: pointer;
}

.text-5 {
  font-size: 5px;
}

.text-10 {
  font-size: 10px;
}

.text-11 {
  font-size: 11px;
}

.text-12 {
  font-size: 12px;
}

.text-bold {
  font-weight: bold;
}

.addLiquidityButtonContainer {
  font-size: 12px;
  display: flex;
  justify-content: end;
}

.addLiquidityButton{
  width: 110px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  background: rgb(141, 141, 253);
  height: 40px;
}

.portfolioCardsContainer{
  margin-inline: 0px;
  width: 100%;
  justify-content: start;
  gap: 10px;
  overflow: auto;
  flexWrap: wrap;
  margin-left: 15px;
}

.portfolioCardContainer{
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.portfolioCardPoolName{
  text-align: left;
  font-weight: bold;
  font-size: 12px;
}

.portfolioCardDetails{
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 2px;
  font-size: 7px;
}

.portfolioCardDetailsImg{
  width: 15px;
  height: 15px;
  filter: invert(1);
}

.portfolioCardDetailsImg2{
  width: 15px;
  height: 10px;
  filter: invert(1);
}

.portfolioCardPoolImg{
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.manageLiquidityButtonContainer {
  font-size: 10px;
  display: flex;
  justify-content: center;
}

.manageLiquidityButton{
  width: 110px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  height: 40px;
  border: 1px solid #8D8DFD;
}

.backButtonContainer {
  font-size: 12px;
  display: flex;
  justify-content: start;
}

.backButton{
  width: 110px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  height: 30px;
  border: 1px solid #8D8DFD;
}

.removeLiquidityButtonContainer {
  font-size: 12px;
  display: flex;
  justify-content: start;
}

.removeLiquidityButton{
  width: 110px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  height: 30px;
  background: rgb(141, 141, 253);
}

.flex{
  display: flex;
}

.justify-end{
  justify-content: end;
}

.justify-center{
  justify-content: center;
}

.poolNameDetails{
  text-align: left;
  font-weight: bold;
  font-size: 12px;
}

.badge{
  background: rgb(141, 141, 253);
  border-radius: 10px;
  padding-inline: 7px;
  font-weight: bold;
}

.badgeContainer{
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 2px;
  font-size: 7px;
}

.poolModeDetailImg{
  width: 98%;
  height: 98%;
  border-radius: 10px;
}

.binsButtonContainer {
  font-size: 12px;
  display: flex;
  justify-content: start;
}

.binsButton{
  width: 100%;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  height: 30px;
  background: #8D8DFD;
}

.removeDetailsBinsContainer{
  margin: auto;
  width: 320px;
  height: 320px;
  display: flex;
  justify-content: center;
  align-items: start;
}

.removeDetailsBins{
  color: white;
  font-size: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.text-left{
  text-align: left;
}

.text-right{
  text-align: right;
}

.removeDetailsBinsValue{
  display: flex;
  alignItems: center;
  justify-content: right;
}

.removeDetailsBinsImg{
  width: 32px;
  height: 32px;
  filter: invert(1);
  margin-right: 10px;
}

.removeDetailsButtonContainer{
  display: flex;
  align-items: center;
  justify-content: center;
}

.items-center{
  align-items: center;
}

.mr-10{
  marginRight: 10px;
}

.confirmRemoveButton .approveNFTButton{
  width: 110px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  background: rgb(141, 141, 253);
  height: 30px;
}

.confirmRemoveButtonDisabled{
  width: 110px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  height: 30px;
}

.onApprovingNFT{
  width: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  height: 30px;
  border: 1px solid #8D8DFD;
}

@media (max-width: 400px) {
    .MainContainer {
      width: 360px;
    }

    .ProtocolContainer{
      width: 270px;
    }

    .HeaderContainer{
      width: 330px;
    }

    .Line{
      width: 320px;
    }

    .addLiquidityButtonContainer{
      padding: 5px;
    }

    .TokenImg{
      width: 20px;
      height: 20px;
    }

    .portfolioCardDetails{
      display: grid;
      align-items: end;
    }

    .BodyContainer{
      width: 330px;
    }

    .removeLiquidityButtonContainer{
      padding-inline: 5px;
    }

    .binsButtonContainer{
      padding-inline: 0px;
    }
}
`;

const routerAbi = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/maverick-router.txt"
);

const positionAbi = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/maverick-position.txt"
);

if (!routerAbi.ok || !positionAbi.ok) {
  return "Loading";
}

State.init({
  isZkSync: false,
  routerContract: "0x39E098A153Ad69834a9Dac32f0FCa92066aD03f4",
  positionContract: "0xFd54762D435A490405DDa0fBc92b7168934e8525",
  portfolio: null,
  poolSelected: null,
  isLiquidityRemoved: false,
  binsToRemove: [],
  showSelectBinsModal: false,
  countBinsToRemove: 0,
  tokenAToWithdraw: 0,
  tokenBToWithdraw: 0,
  allChecked: false,
  balanceNFT: 0,
  onApprovingNFT: false,
  onRemovingLiquidity: false,
});

const getNetwork = () => {
  let chainId = 324;
  Ethers.provider()
    .getNetwork()
    .then((res) => {
      if (res.chainId == chainId) {
        getUserData();
        State.update({ isZkSync: true });
      } else {
        switchNetwork(324);
      }
    });
};

const switchNetwork = (chainId) => {
  Ethers.provider().send("wallet_switchEthereumChain", [
    { chainId: `0x${chainId.toString(16)}` },
  ]);
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    getNetwork();
  }
}

const getRecipient = () => {
  return (
    state.sender.substring(0, 5) +
    "..." +
    state.sender.substring(state.sender.length - 4, state.sender.length)
  ).toUpperCase();
};

const formatNumber = (n) => {
  if (n >= 1000000) {
    return "$" + (n / 1000000).toFixed(2) + "m";
  } else if (n >= 1000) {
    return "$" + (n / 1000).toFixed(2) + "k";
  } else {
    return "$" + n.toFixed(2);
  }
};

const formatNumberToken = (n) => {
  let result;

  if (n == 0) {
    return 0;
  }

  if (n >= 1000000) {
    result = (n / 1000000).toFixed(2);
  } else if (n >= 1000) {
    result = (n / 1000).toFixed(2);
  } else {
    result = n.toFixed(2);
  }

  if (parseFloat(result) < 0.01) {
    return "<0.01";
  }

  return result;
};

const getUserData = () => {
  asyncFetch(`https://api.mav.xyz/api/v3/user/${state.sender}/324`)
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      console.log(res.body.user);

      State.update({ portfolio: res.body.user });
    });
};

const binsFormat = () => {
  return {
    tokenId: data[0],
    image: data[1],
    name: data[2],
    happiness: data[3].toNumber(),
    hunger: data[4].toNumber(),
    sleep: data[5].toNumber(),
    currentActivity: data[6],
    isHungry: data[7],
    isSleepy: data[8],
    isBored: data[9],
  };
};

const getModeImg = (k) => {
  if (k == 0) {
    return "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/ModeStatic.gif";
  }
  if (k == 1) {
    return "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/ModeRight.gif";
  }
  if (k == 2) {
    return "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/ModeLeft.gif";
  }
  if (k == 3) {
    return "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/ModeBoth.gif";
  }
};

const getMode = (k) => {
  if (k == 0) {
    return "Static";
  }
  if (k == 1) {
    return "Right";
  }
  if (k == 2) {
    return "Left";
  }
  if (k == 3) {
    return "Both";
  }
};

const getFeeWidthFormat = (n) => {
  var format = (n * 100).toFixed(2);
  return format + "%";
};

const manage = (p) => {
  console.log(p);
  State.update({ poolSelected: p, binsToRemove: p.bins, nftId: p.nftId });
  getApprovedNFT();
};

const remove = () => {
  State.update({ isLiquidityRemoved: true });
};

const back = () => {
  State.update({
    poolSelected: null,
    binsToRemove: [],
    nftId: null,
    balanceNFT: 0,
  });
};

const backToDetail = () => {
  State.update({
    isLiquidityRemoved: false,
    showSelectBinsModal: false,
    countBinsToRemove: 0,
    binsToRemove: state.poolSelected.bins,
    tokenAToWithdraw: 0,
    tokenBToWithdraw: 0,
    allChecked: false,
  });
};

const selectBins = () => {
  State.update({ showSelectBinsModal: true });
};

const closeModal = () => {
  State.update({ showSelectBinsModal: false });
};

const setBins = (btr, checked) => {
  const countBinsToRemove = btr.filter((b) => b.selected);
  const { sumReserveA, sumReserveB } = countBinsToRemove.reduce(
    (accumulator, currentValue) => ({
      sumReserveA: accumulator.sumReserveA + currentValue.reserveA,
      sumReserveB: accumulator.sumReserveB + currentValue.reserveB,
    }),
    { sumReserveA: 0, sumReserveB: 0 }
  );
  State.update({
    binsToRemove: btr,
    showSelectBinsModal: false,
    countBinsToRemove: countBinsToRemove.length,
    tokenAToWithdraw: sumReserveA,
    tokenBToWithdraw: sumReserveB,
    allChecked: checked,
  });
};

const toFixedString = (n, d) => {
  let stringNumber = n.toString();
  let positionDecimalPoint = stringNumber.indexOf(".");
  let truncatedNumber = stringNumber.substring(0, positionDecimalPoint + d + 1);
  return truncatedNumber;
};

const getApprovedNFT = () => {
  const position = new ethers.Contract(
    state.positionContract,
    positionAbi.body,
    Ethers.provider().getSigner()
  );

  try {
    position.balanceOf(state.sender).then((res) => {
      console.log("balanceNFT: " + res.toNumber());
      State.update({ balanceNFT: res.toNumber() });
    });
  } catch (err) {
    console.log(err);
  }
};

const approveNFT = () => {
  const position = new ethers.Contract(
    state.positionContract,
    positionAbi.body,
    Ethers.provider().getSigner()
  );

  try {
    position.approve(state.routerContract, state.nftId).then((res) => {
      if (res) {
        State.update({
          onApprovingNFT: true,
        });
        setTimeout(() => {
          State.update({
            onApprovingNFT: false,
          });
          getApprovedNFT();
        }, 20000);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const refreshPoolData = () => {
  asyncFetch(`https://api.mav.xyz/api/v3/user/${state.sender}/324`)
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      State.update({ portfolio: res.body.user });
    });
};

const confirmRemove = () => {
  const router = new ethers.Contract(
    state.routerContract,
    routerAbi.body,
    Ethers.provider().getSigner()
  );

  console.log(state.poolSelected);
  let tuple = [];
  state.binsToRemove.forEach((elemento) => {
    if (elemento.selected) {
      const decimalsA = state.poolSelected.pool.tokenA.decimals;
      console.log(toFixedString(elemento.reserveA, decimalsA));
      const amountA = ethers.utils.parseUnits(
        toFixedString(elemento.reserveA, decimalsA),
        decimalsA
      );
      console.log(amountA);

      const decimalsB = state.poolSelected.pool.tokenB.decimals;
      const amountB = ethers.utils.parseUnits(
        toFixedString(elemento.reserveB, decimalsB),
        decimalsB
      );
      console.log(amountB);

      if (amountA > 0) {
        tuple.push({
          binId: elemento.binId,
          amount: amountA,
        });
      }

      if (amountB > 0) {
        tuple.push({
          binId: elemento.binId,
          amount: amountB,
        });
      }
    }
  });

  console.log(tuple);

  try {
    router
      .removeLiquidity(
        state.poolSelected.pool.id,
        state.sender,
        state.poolSelected.nftId,
        tuple,
        0,
        0,
        1e13
      )
      .then((res) => {
        if (res) {
          State.update({
            onRemovingLiquidity: true,
          });
          setTimeout(() => {
            State.update({
              onRemovingLiquidity: false,
            });
            getApprovedNFT();
          }, 20000);
        }
      });
  } catch (err) {
    console.log(err);
  }
};

const css = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/portfolio.css"
).body;

if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${myCss}
`,
  });
}

const Theme = state.theme;
return (
  <Theme>
    <div class="text-center mt-1">
      <div class="MainContainer">
        <div class="ProtocolContainer">
          <div class="ProtocolNetworkContainet">
            <div class="ProtocolNetworkTextSection">
              <div class="ProtocolText">PROTOCOL</div>
            </div>
            <div class="ProtocolNetworkSection">
              <div class="ProtocolNetworkContainer">
                <img
                  class="ProtocolImg"
                  src="https://etherscan.io/token/images/maverick_32.png"
                />
                <div class="NetworkText">Maverick</div>
              </div>
            </div>
          </div>
        </div>
        {state.sender ? (
          state.isZkSync ? (
            !state.poolSelected ? (
              <>
                <div>
                  <div class="HeaderContainer">
                    <div class="row text-white">
                      <div class="col-3 text-11">
                        <span class="text-bold">Your Rewards</span>
                        <br />
                        {state.portfolio
                          ? formatNumber(state.portfolio.rewards)
                          : 0}
                      </div>
                      <div class="col-3 text-11">
                        <span class="text-bold">
                          Your Earnings
                        </span>
                        <br />
                        {state.portfolio
                          ? formatNumber(state.portfolio.fees)
                          : 0}
                      </div>
                      <div class="col-3 text-11">
                        <span class="text-bold">Your Balance</span>
                        <br />
                        {state.portfolio
                          ? formatNumber(state.portfolio.tvl)
                          : 0}
                      </div>
                      <div
                        class="col-3 addLiquidityButtonContainer"
                      >
                        <div class="addLiquidityButton">
                          <div class={"ConfirmText"}>Add Liquidity</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="LineContainer">
                    <div class="Line" />
                  </div>
                </div>
                <div
                  class="row portfolioCardsContainer"
                >
                  {state.portfolio &&
                    state.portfolio.positions.map((p, key) => {
                      return (
                        p.balance > 0 && (
                          <div class="col-6" style={{ width: "47%" }}>
                            <div class="row portfolioCardContainer">
                              <div class="col-12 text-12">
                                <div class="row mt-2">
                                  <div class="col-5">
                                    <img
                                      class="TokenImg"
                                      src={p.pool.tokenA.logoURI}
                                    />
                                    <img
                                      class="TokenImg"
                                      src={p.pool.tokenB.logoURI}
                                    />
                                  </div>
                                  <div
                                    class="col-7 text-5">
                                    <div class="portfolioCardPoolName">
                                      {p.pool.name}
                                    </div>
                                    <div class="row">
                                      <div class="col-4 portfolioCardDetails">
                                        <img
                                          class="portfolioCardDetailsImg"
                                          src="https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/Fee.png"
                                        />
                                        {getFeeWidthFormat(p.pool.fee)}
                                      </div>
                                      <div class="col-4 portfolioCardDetails">
                                        <img
                                          class="portfolioCardDetailsImg2"
                                          src="https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/Width.png"
                                        />
                                        {getFeeWidthFormat(p.pool.width)}
                                      </div>
                                      <div class="col-4 portfolioCardDetails">
                                        <img
                                          class="portfolioCardDetailsImg"
                                          src="https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/Mode.png"
                                        />
                                        {getMode(p.kind)}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-12 mt-2">
                                <img
                                  class="portfolioCardPoolImg"
                                  src={getModeImg(p.kind)}
                                />
                              </div>
                              <div
                                class="col-12 mt-2 text-12"
                              >
                                <div class="row">
                                  <div class="col-6 text-bold">
                                    Balance
                                  </div>
                                  <div class="col-6">
                                    {formatNumber(p.balance)}
                                  </div>
                                  <div class="col-6 text-bold">
                                    Earnings
                                  </div>
                                  <div class="col-6">
                                    {formatNumber(p.fees)}
                                  </div>
                                </div>
                              </div>
                              <div
                                class="col-12 mt-2 mb-2 manageLiquidityButtonContainer"
                              >
                                <div class="manageLiquidityButton" onClick={() => manage(p)}
                                >
                                  <div class={"ConfirmText"}>Manage</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      );
                    })}
                  {!state.portfolio && (
                    <p class="text-white">
                      You still do not have liquidity in any pool, if you have
                      already added liquidity you must wait for the changes to
                      be reflected
                    </p>
                  )}
                </div>
              </>
            ) : !state.isLiquidityRemoved ? (
              <>
                <div>
                  <div
                    class="HeaderContainer"
                  >
                    <div class="row text-white">
                      <div class="col-12 titlePortfolio mb-2">Manage Liquidity</div>
                      <div
                        class="col-3 backButtonContainer"
                      >
                        <div class="backButton"
                          onClick={() => back()}
                        >
                          <div class={"ConfirmText"}>Back</div>
                        </div>
                      </div>
                      <div
                        class="col-3 removeLiquidityButtonContainer"
                      >
                        <div class="removeLiquidityButton"
                          onClick={() => remove()}
                        >
                          <div class={"ConfirmText"}>Remove</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="LineContainer">
                    <div class="Line" />
                  </div>
                  <div
                    class="BodyContainer"
                  >
                    <div class="row text-white">
                      <div
                        class="col-5 flex justify-end"
                      >
                        <img
                          class="TokenImg"
                          src={state.poolSelected.pool.tokenA.logoURI}
                        />
                        <img
                          class="TokenImg"
                          src={state.poolSelected.pool.tokenB.logoURI}
                        />
                      </div>
                      <div class="col-7 text-5">
                        <div class="poolNameDetails">
                          {state.poolSelected.pool.name}
                        </div>
                        <div class="row">
                          <div
                            class="col-12 badgeContainer"
                          >
                            <div class="badge">
                              {getFeeWidthFormat(state.poolSelected.pool.fee)}{" "}
                              Fee
                            </div>
                            <div class="badge"
                            >
                              {getFeeWidthFormat(state.poolSelected.pool.width)}{" "}
                              Width
                            </div>
                            <div class="badge"
                            >
                              Mode {getMode(state.poolSelected.kind)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-12  mt-2 text-10">
                        <div class="row">
                          <div class="col-3 d-flex justify-content-center fw-bold">
                            {state.poolSelected.pool.tokenA.symbol} Balance
                          </div>
                          <div class="col-3 d-flex justify-content-center fw-bold">
                            {state.poolSelected.pool.tokenB.symbol} Balance
                          </div>
                          <div class="col-2 d-flex justify-content-center fw-bold">
                            TVL
                          </div>
                          <div class="col-2 d-flex justify-content-center fw-bold">
                            Volume
                          </div>
                          <div class="col-2 d-flex justify-content-center fw-bold">
                            Fees
                          </div>

                          <div class="col-3 d-flex justify-content-center">
                            {formatNumberToken(state.poolSelected.reserveA)}
                          </div>
                          <div class="col-3 d-flex justify-content-center">
                            {formatNumberToken(state.poolSelected.reserveB)}
                          </div>
                          <div class="col-2 d-flex justify-content-center">
                            {formatNumber(state.poolSelected.balance)}
                          </div>
                          <div class="col-2 d-flex justify-content-center">
                            {formatNumber(state.poolSelected.volume)}
                          </div>
                          <div class="col-2 d-flex justify-content-center">
                            {formatNumber(state.poolSelected.fees)}
                          </div>
                        </div>
                      </div>
                      <div class="col-12 mt-2" style={{ textAlign: "center" }}>
                        <img
                          class="poolModeDetailImg"
                          src={getModeImg(state.poolSelected.kind)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div
                    class="HeaderContainer"
                  >
                    <div class="row text-white">
                      <div class="col-12 titlePortfolio mb-2">Remove Liquidity</div>
                      <div
                        class="col-3 backButtonContainer"
                      >
                        <div class="backButton"
                          onClick={() => backToDetail()}
                        >
                          <div class={"ConfirmText"}>Back</div>
                        </div>
                      </div>
                      <div
                        class="col-5 binsButtonContainer"
                      >
                        <div class="binsButton"
                          onClick={() => selectBins()}
                        >
                          <div class={"ConfirmText"}>
                            {state.countBinsToRemove} Bins Select
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              id="arrow-drop-down"
                            >
                              <path fill="#8D8DFD" d="M0 0h24v24H0V0z"></path>
                              <path fill="white" d="M7 10l5 5 5-5H7z"></path>
                            </svg>
                          </div>
                        </div>
                        {state.showSelectBinsModal && (
                          <Widget
                            props={{
                              bins: state.binsToRemove,
                              tokens: {
                                tokenALogo:
                                  state.poolSelected.pool.tokenA.logoURI,
                                tokenBLogo:
                                  state.poolSelected.pool.tokenB.logoURI,
                              },
                              setBins,
                              closeModal,
                              allChecked: state.allChecked,
                            }}
                            src={"yairnava.near/widget/MultiSelectModal"}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="LineContainer">
                    <div class="Line" />
                  </div>
                  <div
                    class="HeaderContainer removeDetailsBinsContainer"
                  >
                    <div class="row removeDetailsBins">
                      <div class="row mt-2">
                        <div class="col-6 text-left">
                          <div class="row">
                            <div class="col-6">
                              <img
                                class="TokenImg mr-10"
                                src={state.poolSelected.pool.tokenA.logoURI}
                              />
                            </div>
                            <div class="col-6 p-0">
                              {state.poolSelected.pool.tokenA.symbol} Withdrawal
                            </div>
                          </div>
                        </div>
                        <div
                          class="col-6 removeDetailsBinsValue"
                        >
                          {state.tokenAToWithdraw == 0
                            ? 0
                            : state.tokenAToWithdraw.toFixed(10)}
                        </div>
                      </div>
                      <div class="row mt-2">
                        <div class="col-6 text-left">
                          <div class="row">
                            <div class="col-6">
                              <img
                                class="TokenImg mr-10"
                                src={state.poolSelected.pool.tokenB.logoURI}
                              />
                            </div>
                            <div class="col-6 p-0">
                              {state.poolSelected.pool.tokenB.symbol} Withdrawal
                            </div>
                          </div>
                        </div>
                        <div
                          class="col-6 removeDetailsBinsValue"
                        >
                          {state.tokenBToWithdraw == 0
                            ? 0
                            : state.tokenBToWithdraw.toFixed(10)}
                        </div>
                      </div>
                      <div class="row mt-2">
                        <div class="col-6 text-left">
                          <div class="row">
                            <div class="col-6">
                              <img
                                class="TokenImg removeDetailsBinsImg"
                                src="https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/Fee.png"
                              />
                            </div>
                            <div
                              class="col-6 p-0 flex items-center"
                            >
                              Fee Tier
                            </div>
                          </div>
                        </div>
                        <div
                          class="col-6 removeDetailsBinsValue"
                        >
                          {getFeeWidthFormat(state.poolSelected.pool.fee)}
                        </div>
                      </div>
                      <div class="row mt-2">
                        <div class="col-6 text-left">
                          <div class="row">
                            <div class="col-6">
                              <img
                                class="TokenImg removeDetailsBinsImg"
                                src="https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/Width.png"
                              />
                            </div>
                            <div
                              class="col-6 p-0 flex items-center"
                            >
                              Width
                            </div>
                          </div>
                        </div>
                        <div
                          class="col-6 removeDetailsBinsValue"
                        >
                          {getFeeWidthFormat(state.poolSelected.pool.width)}
                        </div>
                      </div>
                      <div class="row mt-2">
                        <div class="col-6 text-left">
                          <div class="row">
                            <div class="col-6">
                              <img
                                class="TokenImg removeDetailsBinsImg"
                                src="https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/Mode.png"
                              />
                            </div>
                            <div
                              class="col-6 p-0 flex items-center"
                            >
                              Mode
                            </div>
                          </div>
                        </div>
                        <div
                          class="col-6 removeDetailsBinsValue"
                        >
                          {getMode(state.poolSelected.kind)}
                        </div>
                      </div>
                      <div class="row mt-2">
                        <div
                          class="col-12 removeDetailsButtonContainer"
                        >
                          <>
                            {state.countBinsToRemove > 0 ? (
                              state.balanceNFT > 0 ? (
                                <div class="confirmRemoveButton"
                                  onClick={() => confirmRemove()}
                                >
                                  <div class={"ConfirmText"}>Connfirm</div>
                                </div>
                              ) : !state.onApprovingNFT ? (
                                <div class="approveNFTButton"
                                  onClick={() => approveNFT()}
                                >
                                  <div class={"ConfirmText"}>Approve NFT</div>
                                </div>
                              ) : (
                                <div class="onApprovingNFT"
                                >
                                  <div
                                    class={"ConfirmText"}
                                  >{`NFT it's being approved...`}</div>
                                </div>
                              )
                            ) : (
                              <div class="confirmRemoveButtonDisabled"
                              >
                                <div class={"ConfirmTextDisabled"}>
                                  Connfirm
                                </div>
                              </div>
                            )}
                          </>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          ) : (
            state.sender && (
              <span class="text-white">
                To proceed, please switch to the
                <br />
                <div
                  class="networkNameContainer"
                  onClick={() => switchNetwork(324)}
                >
                  <span class="networkName">zkSync Era Network</span>
                </div>
                using your wallet.
              </span>
            )
          )
        ) : (
          <div>
            <Web3Connect
              className="ConfirmButton ConfirmText"
              connectLabel="Connect Wallet"
            />
          </div>
        )}
      </div>
    </div>
  </Theme>
);