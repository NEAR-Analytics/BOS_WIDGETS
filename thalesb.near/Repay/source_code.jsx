const SectionHeader = styled.span`
  color: #fff;

  font-size: 18px;
  font-weight: 700;
`;

const BalanceDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  margin-top: 18px;
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

const ArrowPath = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="heroicons-mini/arrow-path-rounded-square">
      <path
        id="Vector (Stroke)"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 5.39998C13.4581 5.39998 14.9005 5.46578 16.3245 5.59455C16.7099 5.62939 17.0163 5.92715 17.0622 6.31119C17.2111 7.5564 17.3118 8.81659 17.3622 10.0899L15.3365 8.06365C14.985 7.71214 14.4152 7.71208 14.0637 8.06351C13.7122 8.41494 13.7121 8.98479 14.0635 9.3363L17.6626 12.9362C18.0141 13.2877 18.5839 13.2878 18.9354 12.9363L22.5363 9.33646C22.8878 8.98504 22.8879 8.41519 22.5365 8.06367C22.1851 7.71215 21.6152 7.71207 21.2637 8.06349L19.1662 10.1603C19.1159 8.79119 19.0096 7.43614 18.8495 6.09746C18.7026 4.86928 17.7184 3.91324 16.4866 3.80186C15.0088 3.66823 13.5122 3.59998 12 3.59998C10.4878 3.59998 8.99126 3.66823 7.51339 3.80186C6.28159 3.91324 5.2974 4.86928 5.15053 6.09746C5.07398 6.73754 5.00973 7.38138 4.95801 8.02871C4.91843 8.52419 5.288 8.95794 5.78348 8.99753C6.27895 9.03711 6.71271 8.66754 6.7523 8.17206C6.80213 7.54826 6.86404 6.92789 6.93779 6.31119C6.98372 5.92715 7.29017 5.62939 7.67548 5.59455C9.09954 5.46578 10.542 5.39998 12 5.39998ZM6.33737 11.064C5.98595 10.7125 5.41615 10.7124 5.06464 11.0638L1.46373 14.6635C1.11219 15.0149 1.11209 15.5847 1.46351 15.9363C1.81491 16.2878 2.38476 16.2879 2.7363 15.9365L4.83379 13.8397C4.88413 15.2088 4.99044 16.5638 5.15053 17.9025C5.2974 19.1307 6.28159 20.0867 7.51339 20.1981C8.99126 20.3317 10.4878 20.4 12 20.4C13.5122 20.4 15.0088 20.3317 16.4866 20.1981C17.7184 20.0867 18.7026 19.1307 18.8495 17.9025C18.9261 17.2619 18.9904 16.6176 19.0421 15.9697C19.0817 15.4742 18.7121 15.0405 18.2166 15.0009C17.7212 14.9614 17.2874 15.3309 17.2478 15.8264C17.198 16.4507 17.136 17.0716 17.0622 17.6888C17.0163 18.0728 16.7099 18.3706 16.3245 18.4054C14.9005 18.5342 13.4581 18.6 12 18.6C10.542 18.6 9.09954 18.5342 7.67548 18.4054C7.29017 18.3706 6.98372 18.0728 6.93779 17.6888C6.78889 16.4436 6.68824 15.1834 6.63779 13.9102L8.66357 15.9363C9.01501 16.2878 9.58486 16.2879 9.93636 15.9364C10.2879 15.585 10.2879 15.0151 9.93646 14.6636L6.33737 11.064Z"
        fill="#888BAF"
      />
    </g>
  </svg>
);

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

const usdcImage =
  "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389";

const abi = fetch(
  "https://docs.compound.finance/public/files/comet-interface-abi-98f438b.json"
);

if (!abi) return "Loading...";

const cometContract = new ethers.Contract(
  props.comet,
  abi.body,
  Ethers.provider().getSigner()
);

useEffect(() => {
  if (Ethers.provider()) {
    Ethers.provider()
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        State.update({ address: accounts[0] });
      });
  }
}, [Ethers]);

useEffect(() => {
  if (!state.address) return;

  cometContract.borrowBalanceOf(state.address).then((balance) => {
    const formattedBalance = ethers.utils.formatUnits(
      balance,
      props.borrowAssetDecimals
    );

    State.update({ formattedBalance });
  });
}, [state.address, state.refetchKey]);

function repay() {
  const borrowAssetContract = new ethers.Contract(
    props.borrowAssetAddress,
    abi.body,
    Ethers.provider().getSigner()
  );

  borrowAssetContract
    .allowance(state.address, props.comet)
    .then((allowance) => {
      if (allowance.eq(0)) {
        borrowAssetContract.approve(props.comet, ethers.constants.MaxUint256);
      }

      cometContract
        .supply(
          props.borrowAssetAddress,
          ethers.utils.parseUnits("100.3", props.borrowAssetDecimals)
        )
        .then((tx) => {
          tx.wait().then(() => {
            State.update({ refetchKey: Math.random() });
          });
        });
    });
}

return (
  <>
    <SectionHeader>Balance</SectionHeader>
    <BalanceDisplay>
      <img src={usdcImage} style={{ width: 48, height: 48 }} alt="ETH" />
      <BalanceAmount>
        {state.formattedBalance ? state.formattedBalance : 0}
      </BalanceAmount>
    </BalanceDisplay>
    <SubAmount>
      <SubAmountText>124.000 USD</SubAmountText>
      <SubArrow> {ArrowPath}</SubArrow>
    </SubAmount>
    {state.address ? (
      <GhostButton
        marginTop={24}
        disabled={state.formattedBalance && state.formattedBalance === 0}
        onClick={() => {
          repay();
        }}
      >
        Withdraw
      </GhostButton>
    ) : (
      <span>Connect your wallet to withdraw</span>
    )}
  </>
);
