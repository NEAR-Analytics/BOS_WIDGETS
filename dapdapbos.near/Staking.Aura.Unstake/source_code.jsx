// switch begin
const SwitchRoot = styled("Switch.Root")`
  all: unset;
  display: block;
  width: 42px;
  height: 24px;
  background-color: #232534;
  border-radius: 9999px;
  position: relative;
  box-shadow: 0 2px 10px #232534;
  border: 1px solid #373a53;
  &[data-state="checked"] {
    background-color: #783ae3;
  }
`;

const SwitchThumb = styled("Switch.Thumb")`
  all: unset;
  display: block;
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 9999px;
  box-shadow: 0 2px 2px var(--blackA7);
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;
  border: 1px solid #373a53;
  &[data-state="checked"] {
    transform: translateX(19px);
  }
`;
// switch end

const StakePanel = styled.div`
  width: 510px;
  margin: 0 auto;
  /* reset input */
  .bos-input-number {
    background-color: var(--dark);
    color: var(--white);
    border: none;
    border-radius: 10px !important;
  }
  .input-group {
    column-gap: 5px;
  }
  .input-group-append {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 138px;
    height: 34px;
    background: #2e3142;
    border: ${props.border || "1px solid #d0d5dd"};
    box-shadow: ${props.border || "0px 1px 2px rgba(16, 24, 40, 0.05)"};
    border-radius: 10px !important;
    color: white;
    font-size: 14px;
  }
  .avatars {
    margin-right: 20px;
  }
`;
const AmountList = styled.div`
  display: flex;
  font-size: var(--fz12);
  color: var(--purple);
  justify-content: space-between;
  padding: 10px 0 16px;
  .amount-left {
  }
  .amount-right {
  }
  .amount-white {
    color: var(--white);
  }
`;
const StakeBtnWrap = styled.div`
  display: flex;
  column-gap: 14px;
`;
const UnStakeBtnWrap = styled.div`
  display: flex;
  column-gap: 22px;
  align-items: center;
  .switch-wrap {
    display: flex;
    align-items: center;
    column-gap: 8px;
    color: var(--purple);
  }
`;

const ChainBtnWrap = styled.div`
  margin-top: 16px;
  display: flex;
`;

const { data, chainId, account, TOKENS, CHAIN_ID, switchChain } = props;
const {
  poolName,
  tokenAssets,
  stakedAmount,
  reward,
  Rewards_contract_address,
  Rewards_depositor_contract_address,
  LP_token_address,
} = data;
State.init({
  isClaimRewards: false,
  inputValue: "",
  canUnstake: false,
  unstaking: false,
});

const handleSwitch = (isChecked) => {
  State.update({
    isClaimRewards: isChecked,
  });
};

const handleInputChange = (e) => {
  State.update({
    inputValue: e.target.value,
  });
};

useEffect(() => {
  if (
    !isNaN(Number(state.inputValue)) &&
    Big(state.inputValue || 0).lt(stakedAmount || 0)
  ) {
    State.update({
      canUnstake: true,
    });
  } else {
    State.update({
      canUnstake: false,
    });
  }
}, [state.inputValue]);

const handleUnStake = () => {
  State.update({
    unstaking: true,
  });
  const UnstakeContract = new ethers.Contract(
    Rewards_contract_address,
    [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "claim",
            type: "bool",
          },
        ],
        name: "withdrawAndUnwrap",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );
  UnstakeContract.withdrawAndUnwrap(
    ethers.utils.parseUnits(state.inputValue),
    state.isClaimRewards
  )
    .then((tx) => {
      console.log("tx: ", tx);
      tx.wait()
        .then((res) => {
          const { status, transactionHash } = res;
          console.info("tx_res: ", res);
          if (status === 1) {
            toast.success?.({
              title: "Transaction Successful!",
              text: `transactionHash ${transactionHash}`,
            });
          } else {
            toast.fail?.({
              title: "Transaction Failed!",
              text: `transactionHash ${transactionHash}`,
            });
          }
        })
        .finally(() => {
          State.update({
            unstaking: false,
          });
        });
    })
    .catch((err) => {
      console.log("getPoolTokens_error:", err);
    });
};

const renderPoolIcon = () => {
  if (tokenAssets) {
    return tokenAssets.map((addr, index) => {
      if (TOKENS[addr]) {
        return (
          <span key={index} style={{ marginRight: -12 }}>
            <Widget
              src="dapdapbos.near/widget/UI.Avatar"
              props={{ src: TOKENS[addr].icon }}
            />
          </span>
        );
      }
      return null;
    });
  }
};
const renderExtra = () => {
  if (chainId !== CHAIN_ID) {
    return (
      <ChainBtnWrap>
        <Widget
          src="dapdapbos.near/widget/UI.Button"
          props={{
            text: "Switch to Gnosis",
            type: "primary",
            style: { flex: 1 },
            onClick: switchChain,
          }}
        />
      </ChainBtnWrap>
    );
  }

  return (
    <>
      <AmountList>
        {/* <span>${stakedAmount}</span> */}
        <span></span>
        <span>
          You Staked: <span className="amount-white">{stakedAmount}</span> BPT
        </span>
      </AmountList>
      <UnStakeBtnWrap>
        <div className="switch-wrap">
          <SwitchRoot
            checked={state.isClaimRewards}
            onCheckedChange={handleSwitch}
          >
            <SwitchThumb />
          </SwitchRoot>
          <span>Claim Rewards</span>
        </div>
        <Widget
          src="dapdapbos.near/widget/UI.Button"
          props={{
            text: "Unstake",
            type: "primary",
            style: { flex: 1 },
            loading: state.unstaking,
            disabled: !state.canUnstake,
            onClick: handleUnStake,
          }}
        />
      </UnStakeBtnWrap>
    </>
  );
};

return (
  <StakePanel>
    <div className="input-group">
      <input
        value={state.inputValue}
        type="number"
        className="form-control bos-input-number"
        placeholder="0.0"
        onChange={handleInputChange}
      />
      <div className="input-group-append">
        <span className="avatars">{renderPoolIcon()}</span>
        BPT
      </div>
    </div>
    {renderExtra()}
  </StakePanel>
);
