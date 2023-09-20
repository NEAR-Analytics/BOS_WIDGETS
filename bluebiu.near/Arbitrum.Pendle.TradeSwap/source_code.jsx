const account = Ethers.send("eth_requestAccounts", [])[0];
const CHAIN_ID = 42161;
const ROUTER_ADDRESS = "0x0000000001E4ef00d069e71d6bA041b0A16F7eA0";
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
const ThemeContainer = styled.div`
  --text-color: #7794d3;
  --button-color: #33549c;
  --button-text-color: #fff;
`;

const BasicTokens = {};

if (!account) {
  return (
    <ThemeContainer>
      <Widget
        src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
        props={{
          ...CONNECT_PROPS,
          theme,
          isWrongNetwork: false,
        }}
      />
    </ThemeContainer>
  );
}
State.init({
  chainId: -1,
  activeTab: "Swap",
  mintType: "Mint",
  updateInputTokenBalance: true,
  swapping: false,
  onInputTag: 0,
});
Ethers.provider()
  .getNetwork()
  .then(({ chainId }) => {
    State.update({ chainId });
  })
  .catch(() => {});

if (state.chainId !== CHAIN_ID) {
  return (
    <ThemeContainer>
      <Widget
        src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
        props={{
          ...CONNECT_PROPS,
          theme,
          isWrongNetwork: true,
        }}
      />
    </ThemeContainer>
  );
}

const Container = styled.div`
  max-width: 560px;
  width: 90vw;
  padding-top: 50px;
  margin: 0 auto;
  .token-icon {
    width: 36px;
    height: 36px;
  }
  .token-symbol {
    font-size: 16px;
    line-height: 19px;
  }
  .token-name {
    font-size: 12px;
    line-height: 18px;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const backIcon = (
  <svg
    width="18"
    height="16"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 9C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7V9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM17 7L1 7V9L17 9V7Z"
      fill="#979ABE"
    />
  </svg>
);

const BackIconWrapper = styled.a`
  /* position: absolute; */
  text-decoration: none;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #979abe;
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-weight: 400;
  .token-icon {
    margin-right: 8px;
  }
`;
const HeaderToken = styled.div`
  display: flex;
  align-items: center;
`;
const Expiry = styled.div`
  text-align: right;
  .expiry-days {
    font-size: 14px;
    line-height: 22px;
    color: #979abe;
  }
`;
const Content = styled.div`
  padding-top: 20px;
`;
const Panel = styled.div`
  border: 1px solid #2c334b;
  border-top: none;
  background-color: #181a27;
  padding: 20px 30px;
  border-radius: 0px 0px 20px 20px;
`;
const ExchangeIcon = styled.div`
  width: 60px;
  margin: 20px auto;
  svg {
    color: #4982ff;
  }
`;
const ArrowIcon = styled.div`
  width: 36px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  border-radius: 50%;
  background-color: #222436;
  color: #4982ff;
  margin: 20px auto;
`;
const InputLabel = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #979abe;
`;
const RedeemTips = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #6797ff;
  margin-top: 20px;
  margin-bottom: 30px;
  .fw {
    font-weight: bold;
  }
`;

const marketAddress = props.market_address;
const isPT = props.type === "pt";
if (!marketAddress) return "";

const toAddress = (address) =>
  address !== "0x0000000000000000000000000000000000000000" ? address : "native";

const getMarketData = () => {
  State.update({
    loading: true,
  });
  asyncFetch(
    `https://api-v2.pendle.finance/core/v1/42161/markets/${marketAddress}`
  )
    .then((res) => {
      const market = res.body || {};

      if (market.address === "0x7d49e5adc0eaad9c027857767638613253ef125f") {
        const SGLPToken = market.inputTokens.find(
          (token) => token.symbol === "sGLP"
        );
        market.underlyingAsset = { ...SGLPToken, baseType: "IB" };
      }
      State.update({
        loading: false,
        market,
        inputCurrency: handleInputCurrency({ market }),
        outputCurrency: handleOutputCurrency({ market }),
      });
    })
    .catch((err) => {
      State.update({
        loading: false,
        market: {},
      });
    });
};

if (!state.loading && !state.market) {
  getMarketData();
}

const handleSelectTokens = () => {
  const market = state.market;
  if (state.activeTab === "Swap") {
    if (market.inputTokens?.length) {
      market.inputTokens.forEach((token) => {
        if (token.symbol === "sGLP") {
          token.baseType = "IB";
          token.types = ["IB"];
        }
        BasicTokens[token.address] = {
          ...token,
          address: toAddress(token.address),
          icon: token.proIcon,
          name: token.proName,
          symbol: token.proSymbol,
        };
      });
    }
    if (market.sy)
      BasicTokens[market.sy.address] = {
        ...market.sy,
        icon: market.sy.proIcon,
        name: market.sy.proName,
        symbol: (
          <div
            className="sy-symbol"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {market.sy.proSymbol}{" "}
            <Widget src="bluebiu.near/widget/Arbitrum.Pendle.TradeSyIcon" />
          </div>
        ),
      };
    if (!isPT && market.pt) {
      BasicTokens[market.pt.address] = {
        ...market.pt,
        icon: market.pt.proIcon,
        name: market.pt.proName,
        symbol: market.pt.proSymbol,
      };
    }
    if (isPT && market.yt) {
      BasicTokens[market.yt.address] = {
        ...market.yt,
        icon: market.yt.proIcon,
        name: market.yt.proName,
        symbol: market.yt.proSymbol,
      };
    }
    return Object.values(BasicTokens);
  }
  if (state.activeTab === "Mint") {
    const tokens = market.outputTokens.map((token) => {
      return {
        ...token,
        address: toAddress(token.address),
        icon: token.proIcon,
        name: token.proName,
        symbol: token.proSymbol,
      };
    });
    if (market.sy) {
      tokens.push({
        ...market.sy,
        icon: market.sy.proIcon,
        name: market.sy.proName,
        symbol: (
          <>
            {market.sy.proSymbol}{" "}
            <Widget src="bluebiu.near/widget/Arbitrum.Pendle.TradeSyIcon" />
          </>
        ),
      });
    }
    return tokens;
  }
};
const handleInputCurrency = (params) => {
  const market = params.market || state.market;
  const activeTab = params.activeTab || state.activeTab;
  const mintType = params.mintType || state.mintType;
  if (activeTab === "Swap") {
    if (market.underlyingAsset?.symbol === "gDAI") {
      return {
        ...market.accountingAsset,
        icon: market.accountingAsset.proIcon,
        address: toAddress(market.accountingAsset.address),
      };
    }
    return {
      ...market.underlyingAsset,
      icon: market.underlyingAsset.proIcon,
      address: toAddress(market.underlyingAsset.address),
    };
  }
  if (mintType === "Mint") {
    return {
      ...market.underlyingAsset,
      icon: market.underlyingAsset.proIcon,
    };
  }
  if (mintType === "Redeem") {
    return {
      ...market.pt,
      icon: market.pt.proIcon,
      name: market.pt.proName,
      symbol: market.pt.proSymbol,
    };
  }
};
const handleOutputCurrency = (params) => {
  const market = params.market || state.market;
  const activeTab = params.activeTab || state.activeTab;
  const mintType = params.mintType || state.mintType;
  if (activeTab === "Swap") {
    let outputCurrency = isPT ? market.pt : market.yt;
    if (outputCurrency) {
      outputCurrency.icon = outputCurrency.proIcon;
      outputCurrency.symbol = outputCurrency.proSymbol;
    }
    return outputCurrency;
  }
  if (mintType === "Redeem") {
    return {
      ...market.underlyingAsset,
      icon: market.underlyingAsset.proIcon,
      address: toAddress(market.underlyingAsset.address),
    };
  }
};
const getBestTrade = () => {
  State.update({
    gettingTrade: true,
  });
};
function debounce(fn, wait) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, wait);
  };
}
const debouncedGetBestTrade = debounce(getBestTrade, 500);

return (
  <>
    <BackIconWrapper
      style={{
        textDecoration: "none",
      }}
      href="/bluebiu.near/widget/Arbitrum.Pendle.TradeMarkets"
    >
      {backIcon} <span>Back</span>{" "}
    </BackIconWrapper>
    <Container>
      {state.loading && (
        <Widget src="bluebiu.near/widget/0vix.LendingSpinner" />
      )}
      <Header>
        <HeaderToken>
          <img
            className="token-icon"
            src={isPT ? state.market?.pt.proIcon : state.market?.yt.proIcon}
          />
          <div>
            <div className="token-symbol">
              {isPT ? state.market?.pt.proSymbol : state.market?.yt.proSymbol}
            </div>
            <div className="token-name">{state.market?.protocol}</div>
          </div>
        </HeaderToken>
        <Expiry>
          <div className="token-symbol">
            <Widget
              src="bluebiu.near/widget/Arbitrum.Pendle.FormatExpiryDate"
              props={{
                date: state.market?.expiry,
              }}
            />
          </div>
          <div className="expiry-days">
            <Widget
              src="bluebiu.near/widget/Arbitrum.Pendle.FormatExpiryDistanceDays"
              props={{
                date: state.market?.expiry,
              }}
            />
          </div>
        </Expiry>
      </Header>
      <Content>
        <Widget
          src="bluebiu.near/widget/Arbitrum.Pendle.TradeSwapTabs"
          props={{
            tabs: ["Swap", "Mint"],
            activeTab: state.activeTab,
            onChangeTab: (activeTab) => {
              State.update({
                activeTab,
                inputCurrency: handleInputCurrency({ activeTab }),
                outputCurrency: handleOutputCurrency({ activeTab }),
                swapping: false,
              });
            },
          }}
        />
        <Panel>
          {state.activeTab === "Mint" && (
            <Widget
              src="bluebiu.near/widget/Arbitrum.Pendle.TradeSwapSwitcher"
              props={{
                type: state.mintType,
                onChange: (mintType) => {
                  State.update({
                    mintType,
                    inputCurrency: handleInputCurrency({ mintType }),
                    outputCurrency: handleOutputCurrency({ mintType }),
                    swapping: false,
                  });
                },
              }}
            />
          )}
          {state.activeTab === "Mint" && state.mintType === "Redeem" && (
            <RedeemTips>
              <span className="fw">Tip:</span> Before maturity, both PT and YT
              are required for redemption. After maturity, only PT is required.
            </RedeemTips>
          )}
          <InputLabel>Input</InputLabel>
          <Widget
            src="bluebiu.near/widget/Arbitrum.Pendle.TradeSwapCurrencyInput"
            props={{
              currency: state.inputCurrency,
              amount: state.inputCurrencyAmount,
              swapping: state.swapping,
              updateTokenBalance: state.updateInputTokenBalance,
              disableSelect:
                state.activeTab === "Swap"
                  ? isPT
                    ? state.inputCurrency.baseType === "PT"
                    : state.inputCurrency.baseType === "YT"
                  : state.mintType === "Redeem",
              tokenDesc:
                state.mintType === "Redeem" ? (
                  <Widget
                    src="bluebiu.near/widget/Arbitrum.Pendle.FormatExpiryDate"
                    props={{
                      date: state.market?.expiry,
                    }}
                  />
                ) : null,
              onCurrencySelectOpen: () => {
                State.update({
                  displayCurrencySelect: true,
                  currencySelectType: 0,
                  selectedTokenAddress: state.inputCurrency.address,
                  tokens: handleSelectTokens(),
                });
              },
              onUpdateCurrencyBalance: (balance) => {
                State.update({
                  maxInputBalance: ethers.utils.formatUnits(
                    balance,
                    state.inputCurrency.decimals
                  ),
                  updateInputTokenBalance: false,
                });
              },
              disableAutoFocus: state.onInputTag !== 0,
              onAmountChange: (val) => {
                State.update({
                  inputCurrencyAmount: val,
                  outputCurrencyAmount: "",
                  onInputTag: 0,
                });

                if (val && Number(val)) debouncedGetBestTrade();
              },
            }}
          />
          {state.activeTab === "Mint" &&
            state.mintType === "Redeem" &&
            (!state.market ||
              new Date(state.market.expiry).getTime() > Date.now()) && (
              <Widget
                src="bluebiu.near/widget/Arbitrum.Pendle.TradeSwapCurrencyInput"
                props={{
                  currency: state.market?.yt
                    ? {
                        ...state.market?.yt,
                        icon: state.market.yt.proIcon,
                        name: state.market.yt.proName,
                        symbol: state.market.yt.proSymbol,
                      }
                    : {},
                  swapping: state.swapping,
                  amount: state.inputCurrencyAmount,
                  updateTokenBalance: state.updateInputTokenBalance,
                  disableSelect: true,
                  tokenDesc:
                    state.mintType === "Redeem" ? (
                      <Widget
                        src="bluebiu.near/widget/Arbitrum.Pendle.FormatExpiryDate"
                        props={{
                          date: state.market?.expiry,
                        }}
                      />
                    ) : null,
                  onUpdateCurrencyBalance: (balance) => {
                    State.update({
                      maxInputBalanceExtra: ethers.utils.formatUnits(
                        balance,
                        state.inputCurrency.decimals
                      ),
                      updateInputTokenBalance: false,
                    });
                  },
                  disableAutoFocus: state.onInputTag !== 1,
                  onAmountChange: (val) => {
                    State.update({
                      inputCurrencyAmount: val,
                      outputCurrencyAmount: "",
                      onInputTag: 1,
                    });
                    // if (val && Number(val)) debouncedGetBestTrade();
                  },
                }}
              />
            )}
          {state.activeTab === "Swap" && (
            <ExchangeIcon
              onClick={() => {
                const [inputCurrency, outputCurrency] = [
                  state.outputCurrency,
                  state.inputCurrency,
                ];
                State.update({
                  inputCurrency,
                  outputCurrency,
                  inputCurrencyAmount: state.outputCurrencyAmount,
                  outputCurrencyAmount: "",
                });
                if (
                  state.inputCurrencyAmount &&
                  Number(state.inputCurrencyAmount)
                )
                  debouncedGetBestTrade();
              }}
            >
              <Widget src="bluebiu.near/widget/Arbitrum.Swap.ExchangeIcon" />
            </ExchangeIcon>
          )}
          {state.activeTab === "Mint" && (
            <ArrowIcon>
              <Widget src="bluebiu.near/widget/Arbitrum.Pendle.ArrowIcon" />
            </ArrowIcon>
          )}
          <InputLabel>Output</InputLabel>
          {(state.activeTab === "Swap" || state.mintType === "Redeem") && (
            <Widget
              src="bluebiu.near/widget/Arbitrum.Pendle.TradeSwapCurrencyInput"
              props={{
                currency: state.outputCurrency,
                amount: state.outputCurrencyAmount,
                updateTokenBalance: state.updateOutputTokenBalance,
                disableInput: true,
                swapping: state.swapping,
                disableSelect:
                  state.activeTab === "Swap" && isPT
                    ? state.outputCurrency.baseType === "PT"
                    : state.outputCurrency.baseType === "YT",

                onCurrencySelectOpen: () => {
                  State.update({
                    displayCurrencySelect: true,
                    currencySelectType: 1,
                    selectedTokenAddress: state.outputCurrency.address,
                    tokens: handleSelectTokens(),
                  });
                },
                onUpdateCurrencyBalance: () => {
                  State.update({
                    updateOutputTokenBalance: false,
                  });
                },
                onAmountChange: (val) => {
                  State.update({
                    outputCurrencyAmount: val,
                  });
                },
              }}
            />
          )}
          {state.activeTab === "Mint" && state.mintType === "Mint" && (
            <Widget
              src="bluebiu.near/widget/Arbitrum.Pendle.TradeMintOutPut"
              props={{
                pt: state.market?.pt,
                yt: state.market?.yt,
                expiry: state.market?.expiry,
                inputCurrency: state.inputCurrency,
                inputCurrencyAmount: state.inputCurrencyAmount,
                mintType: state.mintType,
                market: state.market,
                onLoadMint: ({ amount }) =>
                  State.update({
                    outputCurrencyAmount: amount,
                    gettingTrade: false,
                  }),
              }}
            />
          )}

          {state.activeTab === "Mint" && state.mintType === "Redeem" && (
            <Widget
              src="bluebiu.near/widget/Arbitrum.Pendle.TradeRedeemOutput"
              props={{
                inputCurrency: state.inputCurrency,
                inputCurrencyAmount: state.inputCurrencyAmount,
                mintType: state.mintType,
                market: state.market,
                account,
                outputCurrency: state.outputCurrency,
                onLoadOut: ({ amount, redeemParams }) => {
                  console.log("amountre: ", amount);
                  State.update({
                    outputCurrencyAmount: amount,
                    redeemParams,
                    gettingTrade: false,
                  });
                },
              }}
            />
          )}

          {state.activeTab === "Swap" &&
            (state.tradeInfo || state.gettingTrade) && (
              <Widget
                src="bluebiu.near/widget/Arbitrum.Pendle.TradeSwapResult"
                props={{
                  inputCurrency: state.inputCurrency,
                  outputCurrency: state.outputCurrency,
                  tradeInfo: state.tradeInfo,
                  loading: state.gettingTrade,
                }}
              />
            )}
          <Widget
            src="bluebiu.near/widget/Arbitrum.Pendle.TradeSwapButton"
            props={{
              inputCurrency: state.inputCurrency,
              updateInputTokenBalance: state.updateInputTokenBalance,
              extraInputCurrency: state.market?.yt
                ? {
                    ...state.market?.yt,
                    icon: state.market.yt.proIcon,
                    name: state.market.yt.proName,
                    symbol: state.market.yt.proSymbol,
                  }
                : {},
              outputCurrency: state.outputCurrency,
              aggregatorTokenOut: state.tradeInfo?.aggregatorTokenOut,
              inputCurrencyAmount: state.inputCurrencyAmount,
              outputCurrencyAmount: state.outputCurrencyAmount,
              maxInputBalance: state.maxInputBalance,
              maxInputBalanceExtra: state.maxInputBalanceExtra,
              onSuccess: () => {},
              routerAddress: ROUTER_ADDRESS,
              swapping: state.swapping,
              updateSwapping: (swapping) =>
                State.update({
                  swapping,
                }),
              actionType: state.activeTab === "Mint" ? state.mintType : "Swap",
              theme,
              netOut: state.tradeInfo?.netOut,
              market: state.market,
              tradeInfo: state.tradeInfo,
              mintParams: state.mintParams,
              redeemParams: state.redeemParams,
              gettingTrade: state.gettingTrade,
              onMessage: (params) => {
                State.update({
                  message: params,
                });
              },
            }}
          />
        </Panel>
      </Content>
      {state.displayCurrencySelect && (
        <Widget
          src="bluebiu.near/widget/Arbitrum.Swap.CurrencySelect"
          props={{
            display: state.displayCurrencySelect,
            selectedTokenAddress: state.selectedTokenAddress,
            tokens: state.tokens,
            onClose: () => {
              State.update({
                displayCurrencySelect: false,
              });
            },
            onSelect: (currency) => {
              const params =
                state.currencySelectType === 1
                  ? {
                      outputCurrency: currency,
                      updateOutputTokenBalance: true,
                      outputCurrencyAmount: "",
                    }
                  : {
                      inputCurrency: currency,
                      updateInputTokenBalance: true,
                      outputCurrencyAmount: "",
                    };

              State.update({
                ...params,
                displayCurrencySelect: false,
              });
              if (
                state.inputCurrencyAmount &&
                Number(state.inputCurrencyAmount)
              )
                debouncedGetBestTrade();
            },
          }}
        />
      )}
      {state.message?.open && (
        <Widget
          src="bluebiu.near/widget/Arbitrum.Pendle.Message"
          props={{
            status: state.message.status,
            title: state.message.title,
            text: state.message.text,
            hash: state.message.hash,
            chainId: CHAIN_ID,
            onClose: () => {
              State.update({
                message: { open: false },
              });
            },
          }}
        />
      )}
      {state.activeTab === "Swap" && state.gettingTrade && (
        <Widget
          src="bluebiu.near/widget/Arbitrum.Pendle.TradeSwapAmountOut"
          props={{
            update: state.gettingTrade,
            market: state.market,
            inputCurrency: state.inputCurrency,
            outputCurrency: state.outputCurrency,
            inputCurrencyAmount: state.inputCurrencyAmount,
            isPT,
            onLoad: (data) => {
              State.update({
                gettingTrade: false,
                tradeInfo: data,
                outputCurrencyAmount: data.netOut,
              });
            },
          }}
        />
      )}
    </Container>
  </>
);
