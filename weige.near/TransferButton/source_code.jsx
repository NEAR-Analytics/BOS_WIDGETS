const { amount, balance, inputToken, config, chainId, sender, callback } =
  props;

const fromL2toL1 = chainId === config.chains.l2.id;

const address =
  chainId === config.chains.l1.id ? inputToken.addressL1 : inputToken.addressL2;

const gateWayAddress = props.l1TokenGateway;

const buttonText =
  chainId === config.chains.l1.id
    ? `Deposit to ${config.chains.l2.name}`
    : `Withdraw from ${config.chains.l2.name}`;

const TransferButton = styled.button`
  width: 100%;
  outline: none;
  padding: 8px;
  border-radius: 12px;
  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const getAllowance = () => {
  if (address === config.eth.addressL1 || fromL2toL1) {
    State.update({
      isApproved: true,
    });

    return;
  }

  const TokenContract = new ethers.Contract(
    address,
    [
      {
        constant: true,
        inputs: [
          {
            name: "_owner",
            type: "address",
          },
          {
            name: "_spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );

  if (!gateWayAddress) return;

  TokenContract.allowance(sender, gateWayAddress).then((allowanceRaw) => {
    State.update({
      isApproved: !Big(
        ethers.utils.formatUnits(allowanceRaw._hex, inputToken.decimals)
      ).lt(amount),
    });
  });
};

const handleApprove = () => {
  State.update({
    approving: true,
  });
  const TokenContract = new ethers.Contract(
    address,
    [
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "approve",
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

  TokenContract.approve(
    gateWayAddress,
    ethers.utils.parseUnits(amount, inputToken.decimals),
    {
      gasLimit: 100000,
    }
  )
    .then((tx) => {
      tx.wait().then((res) => {
        const { status } = res;
        State.update({
          isApproved: status === 1,
          approving: false,
        });
      });
    })
    .catch((e) => {
      State.update({
        approving: false,
      });
    });
};

if (
  Big(amount || 0).gt(balance || 0) ||
  Big(balance || 0).eq(0) ||
  Big(amount || 0).eq(0)
) {
  return (
    <TransferButton disabled className="flex-row-center-center">
      {buttonText}
    </TransferButton>
  );
}

getAllowance();

if (!state.isApproved) {
  return (
    <TransferButton
      onClick={() => {
        handleApprove();
      }}
      className="flex-row-center-center"
    >
      Approve {inputToken.symbol}
    </TransferButton>
  );
}

return (
  <>
    <TransferButton
      onClick={() =>
        State.update({
          actionOn: true,
        })
      }
      className="flex-row-center-center"
    >
      {buttonText}
    </TransferButton>

    <Widget
      src="weige.near/widget/transfer-action"
      props={{
        ...props,
        actionOn: state.actionOn,
        cb: () => State.update({ actionOn: false }),
      }}
    />
  </>
);
