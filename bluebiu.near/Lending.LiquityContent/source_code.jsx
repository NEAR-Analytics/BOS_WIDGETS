const StyledContainer = styled.div`
  padding-top: 18px;
`;

const {
  dexConfig,
  wethAddress,
  multicallAddress,
  chainIdNotSupport,
  multicall,
  prices,
  account,
  addAction,
  toast,
  chainId,
  nativeCurrency,
  tab,
} = props;

const { markets, VesselManagerOperations } = dexConfig;

State.init({
  newMarkets: markets,
});

const getWalletBalance = () => {
  if (!markets) return;
  let nativeOToken = "";
  const underlyingTokens = Object.values(markets)
    .filter((market) => {
      if (market.underlyingToken.address === "native")
        nativeOToken = wethAddress;
      return (
        market.underlyingToken.address &&
        market.underlyingToken.address !== "native"
      );
    })
    .map((market) => ({
      ...market.underlyingToken,
    }));
  const calls = underlyingTokens.map((token) => ({
    address: token.address,
    name: "balanceOf",
    params: [account],
  }));

  multicall({
    abi: [
      {
        constant: true,
        inputs: [
          {
            name: "_owner",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            name: "balance",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      for (let i = 0, len = res.length; i < len; i++) {
        markets[underlyingTokens[i].address].userUnderlyingBalance = res[i][0]
          ? ethers.utils.formatUnits(
              res[i][0]._hex,
              underlyingTokens[i].decimals
            )
          : "0";
      }

      if (nativeOToken) {
        const provider = Ethers.provider();
        provider.getBalance(account).then((rawBalance) => {
          markets[nativeOToken].userUnderlyingBalance =
            ethers.utils.formatUnits(rawBalance._hex, 18);

          // count++;
          // formatedData("getWalletBalance");
        });
      } else {
        // count++;
        // formatedData("getWalletBalance");
      }

      State.update({
        newMarkets: markets,
      });
    })
    .catch((err) => {
      console.log("getWalletBalance error", err);
    });
};

const getMinted = () => {
  const underlyingTokens = Object.values(markets);

  const calls = underlyingTokens.map((item) => ({
    address: VesselManagerOperations,
    name: "getEntireSystemDebt",
    params: [item.underlyingToken.address],
  }));

  multicall({
    abi: [
      {
        inputs: [{ internalType: "address", name: "_asset", type: "address" }],
        name: "getEntireSystemDebt",
        outputs: [
          {
            internalType: "uint256",
            name: "entireSystemDebt",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      for (let i = 0, len = res.length; i < len; i++) {
        markets[underlyingTokens[i].underlyingToken.address]["MINTED"] = res[
          i
        ][0]
          ? ethers.utils.formatUnits(res[i][0]._hex)
          : "0";
      }
      State.update({
        newMarkets: markets,
      });
    })
    .catch((err) => {
      console.log("getMinted_err", err);
    });
};

useEffect(() => {
  State.update({
    loading: !chainIdNotSupport,
  });
}, []);
useEffect(() => {
  getWalletBalance();
  getMinted();
}, [dexConfig]);

return (
  <StyledContainer>
    {tab === "market" && (
      <Widget
        src="bluebiu.near/widget/Lending.LiquityMarkets"
        props={{
          addAction,
          toast,
          chainId,
          nativeCurrency,
          dexConfig: {
            ...dexConfig,
            markets: state.newMarkets,
          },
          account,
          prices,
          onSuccess: () => {
            State.update({
              loading: true,
            });
          },
        }}
      />
    )}
    {tab === "yours" && (
      <Widget
        src="bluebiu.near/widget/Lending.LiquityYours"
        props={{
          ...props,
          dexConfig: {
            ...dexConfig,
            markets: state.newMarkets,
          },
          onSuccess: () => {
            State.update({
              loading: true,
            });
          },
        }}
      />
    )}
    {/* <Widget
      src={dexConfig.data}
      props={{
        update: state.loading,
        account,
        wethAddress,
        multicallAddress,
        multicall,
        prices,
        ...dexConfig,
        onLoad: (data) => {
          State.update({
            loading: false,
            timestamp: Date.now(),
            ...data,
          });
        },
      }}
    /> */}
    {/* <Widget
      src="bluebiu.near/widget/Avalanche.Lending.Dialog"
      props={{
        display: state.showDialog,
        data: state.tableButtonClickData,
        chainId,
        addAction,
        toast,
        source: "dapp",
        onClose: () => {
          State.update({
            showDialog: false,
          });
        },
        onSuccess: () => {
          State.update({
            loading: true,
          });
        },
      }}
    /> */}
  </StyledContainer>
);
