const StyledContainer = styled.div`
  
`;
const StyledButton = styled.button`
  background: var(--switch-color);
  color: var(--button-text-color);

  display: block;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  height: 56px;
  line-height: 56px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.5s;
  margin-top: 20px;
  text-align: center;
  
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const StyledDexTips = styled.div`
  color: #979ABE;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 10px;
`;

const DEPOSIT_POOL_ABI = [
  {
    inputs: [
      { internalType: "address", name: "rootAgentAddress", type: "address" },
    ],
    name: "createMultipliooorAgentForRoot",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const { parseUnits, formatUnits } = ethers.utils;

const {
  prices,
  getTokenBalance,
  dexConfig,
  currentStrategy,
  account,
  rootAgent,
  onSuccess,
  addAction,
  toast,
  chainId,
} = props;

const { StakeTokens } = dexConfig;

State.init({
  pending: false,
  balance: 0,
});

const amount = '0.003';
const actionText = 'Stake';

const formatAddAction = (actionText, _amount, status, transactionHash, tokenSymbol) => {
  addAction?.({
    type: "Staking",
    action: actionText,
    token: {
      symbol: tokenSymbol,
    },
    amount: _amount,
    template: props.name,
    add: false,
    status,
    transactionHash,
  });
}

const handleSubmit = () => {
  if (!state.balance || !rootAgent.agentAddress) return;
  State.update({
    pending: true,
  });
  const params = [rootAgent.agentAddress];

  const contract = new ethers.Contract(
    currentStrategy.meta.contract,
    DEPOSIT_POOL_ABI,
    Ethers.provider().getSigner()
  );

  const eth = StakeTokens.find((it) => it.symbol === 'ETH');

  const getTx = (gas) => {
    const contractOption = {
      gasLimit: gas || 4000000,
      value: parseUnits(amount, eth?.decimals || 18),
    }
    contract.createMultipliooorAgentForRoot(...params, contractOption)
      .then((tx) => {
        tx.wait()
          .then((res) => {
            const { status, transactionHash } = res;
            State.update({
              pending: false,
            });
            if (status !== 1) throw new Error("");
            onSuccess();
            formatAddAction(actionText, amount, status, transactionHash, 'ETH');
            toast?.success({
              title: `${actionText} Successfully!`,
              text: `${actionText} ${amount} ETH`,
              tx: transactionHash,
              chainId,
            });
          })
          .catch((err) => {
            console.log('tx error: ', err);
            State.update({
              pending: false,
            });
            toast?.fail({
              title: `${actionText} Failed!`,
              text: err?.message?.includes("user rejected transaction")
                ? "User rejected transaction"
                : ``,
            });
          });
      })
      .catch((err) => {
        console.log('contract fn error: ', err);
        State.update({
          pending: false,
        });
        toast?.fail({
          title: `${actionText} Failed!`,
          text: err?.message?.includes("user rejected transaction")
            ? "User rejected transaction"
            : ``,
        });
      });
  };

  const estimateGas = () => {
    contract.estimateGas.createMultipliooorAgentForRoot(
      ...params,
      { value: parseUnits(amount, eth?.decimals || 18) }
    ).then((gas) => {
      getTx(gas);
    }).catch((err) => {
      console.log('get gas failed: ', err);
      getTx();
    });
  };

  estimateGas();
};

const {
  pending,
  balance,
} = state;

useEffect(() => {
  const eth = StakeTokens.find((it) => it.symbol === 'ETH');
  eth && getTokenBalance(eth).then((value) => {
    State.update({
      balance: value,
    });
  });
}, []);

return (
  <StyledContainer>
    <StyledDexTips>
      You can withdraw any remaining funds at the end of the Blast Multiplier program.
    </StyledDexTips>
    <StyledButton
      disabled={pending || !balance || !rootAgent.agentAddress}
      onClick={handleSubmit}
    >
      {pending ? (
        <Widget
          src="bluebiu.near/widget/0vix.LendingLoadingIcon"
          props={{
            size: 16,
          }}
        />
      ) : (Big(balance).gte(Big(amount)) ? 'DEPOSIT ' + amount + ' ETH' : 'INSUFFICIENT BALANCE')}
    </StyledButton>
  </StyledContainer>
);
