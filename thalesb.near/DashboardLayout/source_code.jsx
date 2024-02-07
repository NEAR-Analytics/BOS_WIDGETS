const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 16px;
  padding: 32px;
  position: relative;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 728px) {
    padding-bottom: 140px;
  }
`;

const GridItem = ({ span, rowSpan, children, style }) => {
  const GridItemStyled = styled.div`
    background: #292a3d;
    border-radius: 8px;
    padding: 20px;
    color: #fff;
    grid-column: span ${span || 6};
    ${rowSpan && `grid-row: span ${rowSpan};`}
    @media (max-width: 1024px) {
      grid-column: 1;
      grid-row: auto;
    }
    @media (max-width: 768px) {
      grid-column: span ${2};
    }
  `;

  return <GridItemStyled style={style}>{children}</GridItemStyled>;
};

const BalanceDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  margin-top: 48px;
`;

const BalanceImage = styled.img`
  width: 48px;
  height: 48px;
`;

const BalanceAmount = styled.div`
  font-size: 36px;
  font-weight: 500;
  line-height: 45px;
  letter-spacing: 0em;
  text-align: left;
`;

const SubAmount = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

const SubAmountText = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  color: #888baf;
`;

const SubArrow = styled.div`
  cursor: pointer;
`;

const { ArrowIcon, CircleDivider, ArrowPath, WalletIconLarge, CloseIcon } =
  VM.require("thalesb.near/widget/Icons");

const ethImage =
  "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png";

const usdcImage =
  "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389";

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #333;
  background: #292a3d;
  color: white;
  margin-bottom: 12px;

  &:focus {
    outline: none;
    border-color: #4e3f8e;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #aaa;
`;

const CollateralItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0px 12px 0px;

  @media (max-width: 1024px) {
    padding: 24px 0px 12px 0px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #333;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  color: #fff;
`;

const InfoValue = styled.span`
  color: #888baf;
`;

const APRSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
  align-self: center;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const ButtonContainerMobile = styled.div`
  display: none;
  gap: 6px;
  width: 100%;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    display: flex;
  }
`;

const Button = styled.button`
  background-color: ${(props) => props.bgColor || "#00EC97"};
  color: ${(props) => props.color || "#373a53"};
  width: ${(props) => props.width || "100%"};
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: ${(props) => props.marginTop || 0}px;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.2s ease;
  font-size: 16px;
  font-weight: 600;
  text-align: center;

  &:hover,
  &:focus {
    opacity: 0.8;

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const GhostButton = styled.button`
  margin-top: ${(props) => props.marginTop || 0}px;
  width: ${(props) => props.width || "100%"};
  background-color: transparent;
  color: white;
  border: 1px solid white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.2s ease, opacity 0.2s ease;
  font-size: 16px;
  font-weight: 600;
  text-align: center;

  &:hover,
  &:focus {
    opacity: 0.8;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const Slider = styled.div`
  background: #333;
  border-radius: 5px;
  position: relative;
  height: 20px;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: ${({ width }) => width}%;
    height: 8px;
    background: #4e3f8e;
    border-radius: 5px;
    transform: translateY(-50%);
  }
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

const PositionContainer = styled.div`
  background: #292a3d;
  border-radius: 8px;
  width: 60%;
  padding: 24px;
  color: white;
`;

const CollateralLabel = styled.span`
  font-size: 1rem;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 12;
`;

const BalanceLabel = styled.span`
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  margin-right: 10px;
  text-align: right;
  color: #fff;
`;

const BalanceValue = styled.span`
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: right;
  color: #888baf;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  flex-direction: column;
  margin-top: 24px;
`;

const InputLabel = styled.label`
  margin-right: 10px;
  color: #888baf;
  display: flex;
  align-self: flex-end;
  margin-top: 8px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #333;
  background: #292a3d;
  color: white;
  margin-right: 10px;

  &:focus {
    outline: none;
    border-color: #4e3f8e;
  }
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  color: #fff;
  margin-bottom: 16px;
`;

const SectionHeader = styled.span`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;

const SectionSubHeader = styled.span`
  color: #888baf;
  margin-top: 24px;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const DropdownContainer = styled.div`
  position: relative;
  z-index: 99;
  .DropdownMenuItem {
    border-radius: 24px;
    background: #373a53;
    padding: 16px;
    width: 19vw;

    @media (max-width: 1680px) {
      min-width: 24vw;
    }

    @media (max-width: 1440px) {
      min-width: 28vw;
    }

    @media (max-width: 1380px) {
      min-width: 25vw;
    }
    @media (max-width: 1200px) {
      min-width: 30vw;
    }

    @media (max-width: 1024px) {
      min-width: min-content;
    }

    @media (max-width: 728px) {
      padding: 8px;
    }
  }
`;

const DropdownLabel = styled.label`
  color: #fff;
  display: block;
  margin-bottom: 5px;
`;

const DropdownSelect = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: #292a3d;
  color: white;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;
const BorrowCapacityText = styled.span`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: right;
  color: #888baf;
`;

const LiquidationRiskBar = ({ riskPercent }) => {
  return (
    <ProgressBarContainer>
      <BorrowCapacityText> Borrow Capacity</BorrowCapacityText>
      <ProgressBarLimit>
        {riskPercent > 5 && <RiskPercentage>{0}%</RiskPercentage>}
        <BorrowLine
          style={{
            left: `calc(${90}% - 20px)`,
          }}
        />

        <ProgressBarFilled
          style={{
            width: `${riskPercent}%`,
            backgroundColor: riskPercent >= 90 && "red",
          }}
        />

        <RiskPercentage
          style={{
            left: `calc(${riskPercent}% ${riskPercent === 0 ? "" : "- 20px"})`,
          }}
        >
          {riskPercent}%
        </RiskPercentage>
        {riskPercent <= 85 && (
          <RiskPercentage style={{ left: `calc(${90}% - 30px)` }}>
            {90}%
          </RiskPercentage>
        )}
      </ProgressBarLimit>
    </ProgressBarContainer>
  );
};

const ProgressBarContainer = styled.div`
  width: calc(100% - 16px);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-bottom: 12px;
`;

const ProgressBarLimit = styled.div`
  height: 20px;
  border-radius: 4px;
  background-color: #888baf;
  width: 100%;
  position: relative;
`;

const ProgressBarFilled = styled.div`
  height: 100%;
  background-color: #00ec97;
  border-radius: 4px;
  transition: width 0.3s ease-in-out;
`;

const ProgressBarFilledLimit = styled.div`
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease-in-out;
`;

const RiskPercentage = styled.span`
  position: absolute;
  bottom: -22px;
  color: #888baf;
  transition: left 0.3s ease-in-out;
`;

const BorrowLine = styled.div`
  position: absolute;
  color: #fff;
  transition: left 0.3s ease-in-out;
  border-radius: 4px;
  width: 4px;
  height: 100%;
  background-color: #fff;
`;

const ProgressBarBorrowContainer = styled.div`
  width: ${(props) => props.width}%;
`;

const ProgressBarBorrow = styled.div`
  height: 20px;
  border-radius: 4px;
  background-color: #6200ea;
  width: 100px;
  margin-left: 4px;
  transition: width 0.3s ease-in-out;
`;

const BorrowText = styled.span`
  color: #888baf;
  font-size: 14px;
  font-weight: 600;
  margin-left: 4px;
`;

const DropdownTrigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CryptoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  position: relative;
`;

const CryptoPairIcon = styled.div`
  position: relative;
  align-items: center;
`;

const CryptoIcon = styled.img`
  width: 48px;
  height: 48px;
  position: relative;
  @media (max-width: 728px) {
    width: 36px;
    height: 36px;
  }
`;

const OverlappingCryptoIcon = styled.img`
  width: 48px;
  height: 48px;
  margin-left: -12px;
  @media (max-width: 728px) {
    width: 36px;
    height: 36px;
  }
`;

const CryptoLabel = styled.div`
  margin-left: 8px;
  font-size: 16px;
  color: ${(props) => props.color || "#FFF"};
`;

const CryptoCurrencyPair = ({ selectedItem }) => {
  return (
    <CryptoContainer>
      <CryptoPairIcon>
        <CryptoIcon src={selectedItem.networkImage} alt="Ethereum" />
        <OverlappingCryptoIcon src={selectedItem.image} alt="USDC" />
      </CryptoPairIcon>
      <CryptoLabel>{selectedItem.name}</CryptoLabel>
      <CryptoLabel color="#888baf">{selectedItem.network}</CryptoLabel>
    </CryptoContainer>
  );
};

const NetworkDropdown = ({ selectedItem }) => {
  return (
    <DropdownContainer>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <DropdownTrigger>
            <SectionHeader>NETWORK</SectionHeader>
            <ArrowIcon />
          </DropdownTrigger>
        </DropdownMenu.Trigger>
        <CryptoCurrencyPair selectedItem={selectedItem} />
        <DropdownMenu.Content sideOffset={5}>
          <DropdownMenu.Item className="DropdownMenuItem">
            <Widget
              props={{
                updateSelectedItem: updateSelectedItem,
                selectedItem: selectedItem,
              }}
              src="thalesb.near/widget/NetworkDropdown"
            />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </DropdownContainer>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 48px;
  height: 48px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

const SubLabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SubLabel = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #888baf;
`;

const Value = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-left: 4px;
  color: #888baf;
`;

const SmallIcon = styled.div`
  width: 16px;
  height: 16px;
  margin-left: 4px;
  display: flex;
  align-items: center;
  margin-bottom: 2px;
`;
const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
  margin-right: 4px;
`;

const CollateralItemComponent = ({ item, balance }) => (
  <Container>
    <Icon src={item.image} alt="coin image" />

    <InfoContainer>
      <CollateralLabel>{item.name}</CollateralLabel>

      <SubLabelContainer>
        <SubLabel>{item.subLabel}</SubLabel>
        <CenterContainer>{CircleDivider}</CenterContainer>
        <Value>{balance ? balance : "0.00"}</Value>
        <SmallIcon>{WalletIconLarge}</SmallIcon>
      </SubLabelContainer>
    </InfoContainer>
  </Container>
);

const ContainerModal = styled.div`
  width: 100%;

  .DialogOverlay {
    background: #000000b2;
    position: fixed;
    inset: 0;
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .DialogContent {
    background-color: #1e202f;
    z-index: 999;
    border-radius: 6px;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
      hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    max-width: 860px;
    max-height: 85vh;
    padding: 25px;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
    @media (max-width: 728px) {
      width: 320px;
    }
    @media (max-width: 450px) {
      width: 280px;
    }
  }
  .DialogContent:focus {
    outline: none;
  }

  .DialogTitle {
    margin: 0;
    font-weight: 500;
    font-size: 17px;
  }

  .DialogDescription {
    margin: 10px 0 20px;
    font-size: 15px;
    line-height: 1.5;
  }

  .Button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 0 15px;
    font-size: 15px;
    line-height: 1;
    font-weight: 500;
    height: 35px;
  }

  .IconButton {
    border-radius: 100%;
    height: 25px;
    width: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .Fieldset {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 15px;
  }

  .Label {
    font-size: 15px;
    width: 90px;
    text-align: right;
  }

  .Input {
    width: 100%;
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 0 10px;
    font-size: 15px;
    line-height: 1;
    height: 35px;
  }

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const { address, addToast, selectedItem, updateSelectedItem, ethPrice } = props;

const { contractInfo, collateralItems } = selectedItem;

//Get the Row span accoring to the number of collateral items
const rowSpan = Math.floor(collateralItems.length / 2) * 1;

let collateralRowSpan;
if (collateralItems.length < 3) {
  collateralRowSpan = 1;
} else if (collateralItems.length < 4) {
  collateralRowSpan = 2;
} else {
  collateralRowSpan = rowSpan;
}

const abi = fetch(
  "https://docs.compound.finance/public/files/comet-interface-abi-98f438b.json"
);

const abiBulk = fetch(
  "https://raw.githubusercontent.com/ThalesBMC/bulk-api/main/BulkAbi.json"
);

if (!abi || !abiBulk) return "Loading...";

useEffect(() => {
  const balancesPromise = new Promise((resolve, reject) => {
    console.log("entrou no balancesPromise");
    const rpcProvider = new ethers.providers.JsonRpcProvider(
      contractInfo.httpRpcUrl
    );
    const contract = new ethers.Contract(
      contractInfo.address,
      abi.body,
      rpcProvider
    );
    const newContract = new ethers.Contract(
      selectedItem.address,
      abi.body,
      rpcProvider
    );

    function fetchBalancesForCollateralItem(item) {
      if (item.isBaseAsset) {
        // For the base asset, fetch the native balance directly from the network
        return rpcProvider.getBalance(address).then((nativeBalance) => {
          const formattedNativeBalance = ethers.utils.formatUnits(
            nativeBalance,
            "ether"
          );
          return contract
            .collateralBalanceOf(address, item.address)
            .then((collateralBalance) => {
              const formattedCollateralBalance = ethers.utils.formatUnits(
                collateralBalance,
                item.decimals
              );

              // Return the object with both balances after fetching the collateral balance
              return {
                name: item.name,
                tokenBalance: formattedNativeBalance,
                collateralBalance: formattedCollateralBalance,
              };
            });
        });
      } else {
        const collateralContract = new ethers.Contract(
          item.address,
          abi.body,
          rpcProvider
        );

        return Promise.all([
          collateralContract.balanceOf(address),
          contract.collateralBalanceOf(address, item.address),
        ]).then(([tokenBalance, collateralBalance]) => {
          const formattedTokenBalance = ethers.utils.formatUnits(
            tokenBalance,
            item.decimals
          );
          const formattedCollateralBalance = ethers.utils.formatUnits(
            collateralBalance,
            item.decimals
          );

          return {
            name: item.name,
            tokenBalance: formattedTokenBalance,
            collateralBalance: formattedCollateralBalance,
          };
        });
      }
    }

    contract
      .balanceOf(address)
      .then((balance) =>
        Promise.all([
          balance,
          contract.decimals(),
          // Fetch balances for all collateral items
          Promise.all(
            collateralItems.map((item) => fetchBalancesForCollateralItem(item))
          ),
        ])
      )
      .then(([balance, decimals, collateralBalances]) => {
        const formattedBalance = ethers.utils.formatUnits(balance, decimals);

        return Promise.all([
          selectedItem.isBaseAsset
            ? rpcProvider.getBalance(address)
            : newContract.balanceOf(address),
          newContract.decimals(),
        ]).then(([newBalance, newDecimals]) => {
          let supplyBalanceFormatted;
          if (selectedItem.isBaseAsset) {
            supplyBalanceFormatted = ethers.utils.formatUnits(
              newBalance,
              "ether"
            );
          } else {
            supplyBalanceFormatted = ethers.utils.formatUnits(
              newBalance,
              newDecimals
            );
          }

          return {
            formattedBalance,
            assetBalance: balance,
            supplyBalance: supplyBalanceFormatted,
            unformattedSupplyBalance: newBalance,
            collateralBalances,
          };
        });
      })
      .then((result) => {
        // Update the state with all balances
        State.update({
          ...result,
        });
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}, [state.lastTransactionHash, selectedItem]);

const withdrawToContract = (assetAddress, amount, decimals, isBaseAsset) => {
  const contractProxyAllowance = new ethers.Contract(
    contractInfo.address,
    abi.body,
    Ethers.provider().getSigner()
  );

  // If isBaseAsset is true, check and potentially set allowance before withdrawing
  if (isBaseAsset) {
    const comet = contractInfo.address; // Comet contract address
    const to = address; // recipient's actual address
    const amountData = ethers.utils.parseEther(amount.toString());
    const abiCoder = new ethers.utils.AbiCoder();

    // Encode the transaction data
    const data = abiCoder.encode(
      ["address", "address", "uint"],
      [comet, to, amountData]
    );
    const actionsEncoded = [
      ethers.utils.formatBytes32String("ACTION_WITHDRAW_NATIVE_TOKEN"),
    ];
    const dataArr = [data];

    const contractBulk = new ethers.Contract(
      selectedItem.bulkerAddress,
      abiBulk.body,
      Ethers.provider().getSigner()
    );

    // Function to execute the .invoke call
    const executeInvoke = () => {
      contractBulk
        .invoke(actionsEncoded, dataArr, { value: amountData })
        .then((tx) => {
          console.log("Transaction hash:", tx.hash);
          return tx.wait(); // Wait for the transaction to be mined
        })
        .then((receipt) => {
          State.update({
            lastTransactionHash: receipt.transactionHash,
          });
          console.log("Transaction successful with receipt:", receipt);
        })
        .catch((error) => {
          addToast(`Transaction failed: ${error.message}`, "error");
          console.error("Transaction failed:", error);
        });
    };

    // Initial promise to handle allowance logic
    contractProxyAllowance
      .isAllowed(address, selectedItem.bulkerAddress)
      .then((isAllowed) => {
        if (!isAllowed) {
          addToast(`Please approve the contract and wait`, "warning");

          return contractProxyAllowance
            .allow(selectedItem.bulkerAddress, true)
            .then((tx) => {
              console.log(`Allowance transaction hash: ${tx.hash}`);
              addToast(`Transaction submitted: ${tx.hash}`, "success");

              return tx.wait().then((receipt) => {
                addToast(
                  `Approval confirmed: ${receipt.transactionHash}`,
                  "success"
                );

                console.log(
                  `Allowance transaction confirmed with receipt: ${receipt.transactionHash}`
                );
                // After allowance is set, execute the .invoke call
                executeInvoke();
              });
            });
        } else {
          console.log("Allowance already set, no need to call allow");
          // Allowance is already set, directly execute the .invoke call
          executeInvoke();
        }
      })
      .catch((error) => {
        addToast(`Transaction failed: ${error.message}`, "error");
        console.error("Transaction failed:", error);
      });
  } else {
    const adjustedAmount = ethers.utils.parseUnits(amount.toString(), decimals);
    const contract = new ethers.Contract(
      contractInfo.address,
      abi.body,
      Ethers.provider().getSigner()
    );
    contract
      .withdraw(assetAddress, adjustedAmount)
      .then((tx) => {
        console.log(`Transaction submitted: ${tx.hash}`);
        addToast(`Transaction submitted: ${tx.hash}`, "success");

        return tx.wait();
      })
      .then((receipt) => {
        console.log(`Transaction confirmed: ${receipt.transactionHash}`);

        State.update({
          lastTransactionHash: receipt.transactionHash,
        });
        addToast("Withdrawal successful", "success");
      })
      .catch((error) => {
        addToast(`Transaction failed: ${error.message}`, "error");
        console.error(`Transaction failed: ${error.message}`);
      });
  }
};

function checkAllowanceAndSupply(assetAddress, amount, decimals, isBaseAsset) {
  const contractProxyAllowance = new ethers.Contract(
    contractInfo.address,
    abi.body,
    Ethers.provider().getSigner()
  );

  const MaxUint256 = ethers.BigNumber.from(
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  );

  if (isBaseAsset) {
    const comet = contractInfo.address; // Comet contract address
    const to = address; // Recipient's actual address
    const amountData = ethers.utils.parseEther(amount.toString());
    const abiCoder = new ethers.utils.AbiCoder();

    // Encode the transaction data
    const data = abiCoder.encode(
      ["address", "address", "uint"],
      [comet, to, amountData]
    );
    const actionsEncoded = [
      ethers.utils.formatBytes32String("ACTION_SUPPLY_NATIVE_TOKEN"),
    ];
    const dataArr = [data];

    const contractBulk = new ethers.Contract(
      selectedItem.bulkerAddress,
      abiBulk.body,
      Ethers.provider().getSigner()
    );

    // Function to execute the .invoke call
    const executeInvoke = () => {
      contractBulk
        .invoke(actionsEncoded, dataArr, { value: amountData })
        .then((tx) => {
          console.log("Transaction hash:", tx.hash);
          return tx.wait(); // Wait for the transaction to be mined
        })
        .then((receipt) => {
          State.update({
            lastTransactionHash: receipt.transactionHash,
          });
          console.log("Transaction successful with receipt:", receipt);
        })
        .catch((error) => {
          addToast(`Transaction failed: ${error.message}`, "error");
          console.error("Transaction failed:", error);
        });
    };

    // Initial promise to handle allowance logic
    contractProxyAllowance
      .isAllowed(address, selectedItem.bulkerAddress)
      .then((isAllowed) => {
        if (!isAllowed) {
          addToast(`Please approve the contract`, "warning");

          return contractProxyAllowance
            .allow(selectedItem.bulkerAddress, true)
            .then((tx) => {
              console.log(`Allowance transaction hash: ${tx.hash}`);
              addToast(`Transaction submitted: ${tx.hash}`, "success");
              return tx.wait().then((receipt) => {
                addToast(
                  `Approval confirmed: ${receipt.transactionHash}`,
                  "success"
                );

                console.log(
                  `Allowance transaction confirmed with receipt: ${receipt.transactionHash}`
                );
                // After allowance is set, execute the .invoke call
                executeInvoke();
              });
            });
        } else {
          console.log("Allowance already set, no need to call allow");
          // Allowance is already set, directly execute the .invoke call
          executeInvoke();
        }
      })
      .catch((error) => {
        addToast(`Transaction failed: ${error.message}`, "error");
        console.error("Transaction failed:", error);
      });
  } else {
    const contract = new ethers.Contract(
      assetAddress,
      abi.body,
      Ethers.provider().getSigner()
    );

    contract
      .allowance(address, contractInfo.address)
      .then((allowance) => {
        console.log(`Current allowance: ${allowance}`);
        if (allowance.eq(0)) {
          console.log("Approving...");
          addToast(`Please approve the contract`, "warning");

          return contract
            .approve(contractInfo.address, MaxUint256)
            .then((approvalTx) => {
              console.log(`Approval transaction hash: ${approvalTx.hash}`);
              addToast(`Transaction submitted: ${approvalTx.hash}`, "success");
              return approvalTx.wait(); // Wait for the transaction to be mined
            })
            .then((approvalResult) => {
              console.log(
                `Approval confirmed: ${approvalResult.transactionHash}`
              );
              addToast(
                `Approval confirmed: ${approvalResult.transactionHash}`,
                "success"
              );
            })
            .catch((error) => {
              addToast(`Approval failed: ${error.message}`, "error");
              console.error(`Approval failed: ${error.message}`);
              throw new Error("Approval failed, cannot proceed to supply.");
            });
        } else {
          return Promise.resolve(); // Resolve immediately if allowance is sufficient
        }
      })
      .then(() => {
        // Proceed with supply operation
        return supplyToContract(assetAddress, amount, decimals);
      })
      .catch((error) => {
        addToast(`Error during supply operation: ${error.message}`, "error");
        console.error(`Error during supply operation: ${error.message}`);
      });
  }
}

const supplyToContract = (address, amount, decimals) => {
  const contract = new ethers.Contract(
    contractInfo.address,
    abi.body,
    Ethers.provider().getSigner()
  );

  const adjustedAmount = ethers.utils.parseUnits(amount.toString(), decimals);

  contract
    .supply(address, adjustedAmount)
    .then((tx) => {
      console.log(`Transaction submitted: ${tx.hash}`);
      addToast(`Transaction submitted: ${tx.hash}`, "success");

      return tx.wait();
    })
    .then((receipt) => {
      console.log(`Transaction confirmed: ${receipt.transactionHash}`);
      addToast("Supply successful", "success");
      State.update({
        lastTransactionHash: receipt.transactionHash,
      });
    })
    .catch((error) => {
      addToast(`Transaction failed: ${error.message}`, "error");
      console.error(`Transaction failed: ${error.message}`);
    });
};

const { getCollateralsWithLiquidationData } = VM.require(
  "thalesb.near/widget/compound-requests"
);

const positionData = useCache(
  () => {
    if (!selectedItem.contractInfo.address || !address)
      return Promise.resolve({});

    return getCollateralsWithLiquidationData({
      userAddress: address,
      cometAddress: selectedItem.contractInfo.address,
      rpcUrl: selectedItem.contractInfo.httpRpcUrl,
    });
  },
  "positionData" +
    selectedItem.contractInfo.address +
    address +
    state.refetchPositionKey,
  { subscribe: false }
);

useEffect(() => {
  const interval = setInterval(() => {
    State.update({ refetchPositionKey: Date.now() });
  }, 30 * 1000);

  return () => clearInterval(interval);
}, []);

return (
  <GridContainer key={address + Math.random()}>
    {/* Network dropdown and liquidation risk section */}

    <GridItem span={4}>
      <NetworkDropdown
        selectedItem={selectedItem}
        selectedNetwork={selectedNetwork}
        onChange={handleNetworkChange}
      />
    </GridItem>
    <GridItem span={8}>
      <SectionHeader>Liquidation Risk</SectionHeader>
      <LiquidationRiskBar riskPercent={positionData?.liquidationRisk || 0} />
    </GridItem>
    {/* Balance Section */}

    <GridItem span={4}>
      <SectionHeader>Balance</SectionHeader>
      <BalanceDisplay>
        <BalanceImage src={selectedItem.image} alt="asset image" />
        <BalanceAmount>
          {state.formattedBalance ? state.formattedBalance.slice(0, 8) : 0}
        </BalanceAmount>
      </BalanceDisplay>

      <ContainerModal>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <GhostButton
              marginTop={45}
              disabled={
                !state.formattedBalance || state.formattedBalance === "0.0"
              }
            >
              Withdraw
            </GhostButton>
          </Dialog.Trigger>

          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">
              Withdraw {selectedItem.name}
            </Dialog.Title>
            <RowContainer>
              <Widget
                props={{
                  onConfirm: withdrawToContract,
                  balance: state.formattedBalance,

                  selectedItem: selectedItem,
                  decimals: selectedItem.decimals,
                  address: selectedItem.address,
                  isBaseAsset: selectedItem.isBaseAsset,
                  type: "withdraw",
                }}
                src="thalesb.near/widget/Input"
              />
              {/* //TODO: is making too many request
              <PositionContainer>
                <Widget
                  src="thalesb.near/widget/PositionInfo"
                  props={{
                    cometAddress: selectedItem.contractInfo.address,
                    baseAddress: selectedItem.address,
                  }}
                />
              </PositionContainer> */}
            </RowContainer>
            <Dialog.Close asChild>
              <div className="IconButton" aria-label="Close">
                {CloseIcon}
              </div>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>
      </ContainerModal>
    </GridItem>

    {/* Supply Section */}
    <GridItem span={4}>
      <SectionHeader>Supply {selectedItem.name}</SectionHeader>
      <Widget
        props={{
          onConfirm: checkAllowanceAndSupply,
          decimals: selectedItem.decimals,
          address: selectedItem.address,
          balance: state.supplyBalance,
          type: "supply",

          selectedItem: selectedItem,
          isBaseAsset: selectedItem.isBaseAsset,
        }}
        src="thalesb.near/widget/Input"
      />
    </GridItem>

    {/* Borrow Section */}
    <GridItem span={4}>
      <SectionHeader>Borrow {selectedItem.name}</SectionHeader>
      <Widget
        props={{
          decimals: selectedItem.decimals,
          selectedItem: selectedItem,
          type: "borrow",
          addToast: addToast,
          borrowBalance: positionData?.borrowCapacityBase || 0,
          borrowedBalance: positionData?.borrowedInBase || 0,
        }}
        src="thalesb.near/widget/Borrow"
      />
    </GridItem>

    {/* Collateral Section */}
    <GridItem span={6} rowSpan={collateralRowSpan}>
      <SectionContainer>
        <SectionHeader>Collateral</SectionHeader>
        <SectionSubHeader>Asset</SectionSubHeader>
      </SectionContainer>
      {collateralItems.map((item, index) => (
        <div key={index}>
          <CollateralItem>
            <CollateralItemComponent
              item={item}
              balance={
                state.collateralBalances && state.collateralBalances[index]
                  ? state.collateralBalances[index].tokenBalance.slice(0, 6)
                  : "0.00"
              }
            />
            <ActionGroup>
              <ActionContainer>
                <BalanceLabel>
                  {state.collateralBalances && state.collateralBalances[index]
                    ? state.collateralBalances[index].collateralBalance.slice(
                        0,
                        6
                      )
                    : "0.00"}
                </BalanceLabel>
              </ActionContainer>
              <ButtonContainer>
                <ContainerModal>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <Button
                        disabled={
                          !state.collateralBalances ||
                          state.collateralBalances[index].tokenBalance === "0.0"
                        }
                      >
                        Supply
                      </Button>
                    </Dialog.Trigger>

                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                      <Dialog.Title className="DialogTitle">
                        Supply {item.name}
                      </Dialog.Title>
                      <RowContainer>
                        <Widget
                          props={{
                            onConfirm: checkAllowanceAndSupply,
                            decimals: item.decimals,
                            address: item.address,

                            selectedItem: item,
                            balance:
                              state.collateralBalances &&
                              state.collateralBalances[index].tokenBalance,
                            type: "supply",
                            isBaseAsset: item.isBaseAsset,
                          }}
                          src="thalesb.near/widget/Input"
                        />
                        {/* <PositionContainer>
                          <Widget
                            src="thalesb.near/widget/PositionInfo"
                            props={{
                              cometAddress: selectedItem.contractInfo.address,
                              baseAddress: selectedItem.address,
                            }}
                          />
                        </PositionContainer> */}
                      </RowContainer>
                      <Dialog.Close asChild>
                        <div className="IconButton" aria-label="Close">
                          {CloseIcon}
                        </div>
                      </Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Root>
                </ContainerModal>
                <ContainerModal>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <GhostButton
                        disabled={
                          !state.collateralBalances ||
                          state.collateralBalances[index].collateralBalance ===
                            "0.0"
                        }
                      >
                        Withdraw
                      </GhostButton>
                    </Dialog.Trigger>

                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                      <Dialog.Title className="DialogTitle">
                        Supply {item.name}
                      </Dialog.Title>
                      <RowContainer>
                        <Widget
                          props={{
                            onConfirm: withdrawToContract,
                            address: item.address,
                            selectedItem: item,
                            balance:
                              state.collateralBalances &&
                              state.collateralBalances[index].collateralBalance,

                            type: "withdraw",
                            isBaseAsset: item.isBaseAsset,
                          }}
                          src="thalesb.near/widget/Input"
                        />
                        {/* <PositionContainer>
                          <Widget
                            src="thalesb.near/widget/PositionInfo"
                            props={{
                              cometAddress: selectedItem.contractInfo.address,
                              baseAddress: selectedItem.address,
                            }}
                          />
                        </PositionContainer> */}
                      </RowContainer>
                      <Dialog.Close asChild>
                        <div className="IconButton" aria-label="Close">
                          {CloseIcon}
                        </div>
                      </Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Root>
                </ContainerModal>
              </ButtonContainer>
            </ActionGroup>
          </CollateralItem>
          {/* Collateral Mobile Section */}
          <ButtonContainerMobile>
            <ContainerModal>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button
                    width="100%"
                    disabled={
                      !state.collateralBalances[index].tokenBalance ||
                      state.collateralBalances[index].tokenBalance === "0.0"
                    }
                  >
                    Supply
                  </Button>
                </Dialog.Trigger>

                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                  <Dialog.Title className="DialogTitle">
                    Supply {item.name}
                  </Dialog.Title>
                  <RowContainer>
                    <Widget
                      props={{
                        onConfirm: checkAllowanceAndSupply,
                        decimals: item.decimals,
                        address: item.address,

                        selectedItem: item,
                        balance:
                          state.collateralBalances &&
                          state.collateralBalances[index].tokenBalance,
                        isBaseAsset: item.isBaseAsset,
                        type: "supply",
                      }}
                      src="thalesb.near/widget/Input"
                    />
                    {/* <PositionContainer>
                      <Widget
                        src="thalesb.near/widget/PositionInfo"
                        props={{
                          cometAddress: selectedItem.contractInfo.address,
                          baseAddress: selectedItem.address,
                        }}
                      />
                    </PositionContainer> */}
                  </RowContainer>
                  <Dialog.Close asChild>
                    <div className="IconButton" aria-label="Close">
                      {CloseIcon}
                    </div>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Root>
            </ContainerModal>
            <ContainerModal>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <GhostButton
                    width="100%"
                    disabled={
                      !state.formattedBalance ||
                      state.formattedBalance === "0.0"
                    }
                  >
                    Withdraw
                  </GhostButton>
                </Dialog.Trigger>

                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                  <Dialog.Title className="DialogTitle">
                    Supply {item.name}
                  </Dialog.Title>
                  <RowContainer>
                    <Widget
                      props={{
                        onConfirm: withdrawToContract,
                        address: item.address,

                        selectedItem: item,
                        balance:
                          state.collateralBalances &&
                          state.collateralBalances[index].collateralBalance,
                        isBaseAsset: item.isBaseAsset,
                        type: "withdraw",
                      }}
                      src="thalesb.near/widget/Input"
                    />
                    {/* <PositionContainer>
                      <Widget
                        src="thalesb.near/widget/PositionInfo"
                        props={{
                          cometAddress: selectedItem.contractInfo.address,
                          baseAddress: selectedItem.address,
                        }}
                      />
                    </PositionContainer> */}
                  </RowContainer>
                  <Dialog.Close asChild>
                    <div className="IconButton" aria-label="Close">
                      {CloseIcon}
                    </div>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Root>
            </ContainerModal>
          </ButtonContainerMobile>
        </div>
      ))}
    </GridItem>
    {/* APR Section */}
    <GridItem span={3}>
      <Widget
        key={"netBorrowApr" + Math.random()}
        src="thalesb.near/widget/NetBorrowApr"
        props={{
          selectedItem: selectedItem,
        }}
      />
    </GridItem>
    <GridItem span={3}>
      <Widget
        key={"netSupplyApr" + Math.random()}
        src="thalesb.near/widget/NetSupplyApr"
        props={{
          selectedItem: selectedItem,
        }}
      />
    </GridItem>
    {/* Position Info Section */}
    <GridItem span={6} style={{ maxHeight: "220px" }} rowSpan={2}>
      <Widget
        src="thalesb.near/widget/PositionInfo"
        props={{
          position: positionData,
        }}
      />
    </GridItem>
  </GridContainer>
);
