const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "hacks.sputnik-dao.near";
const onClose = props.onClose;

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  receiver_id: state.receiver_id || "ndcplug.near",
  amount: state.amount,
  tokenAddress: state.tokenAddress || "a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near",
  error: state.error,
  description: state.description,
});

function isNearAddress(address) {
  const ACCOUNT_ID_REGEX =
    /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/;
  return (
    address.length >= 2 &&
    address.length <= 64 &&
    ACCOUNT_ID_REGEX.test(address)
  );
}

const handleProposal = () => {
  if (!state.amount || state.amount <= 0) {
    State.update({
      error: "Please enter a valid amount",
    });
    return;
  }
  if (
    !state.receiver_id ||
    receiver_id === "" ||
    !isNearAddress(state.receiver_id)
  ) {
    State.update({
      error: "Please enter a valid recipient",
    });
    return;
  }
  if (state.tokenAddress !== "" && !isNearAddress(state.tokenAddress)) {
    State.update({
      error: "Please enter a valid token address",
    });
    return;
  }

  const gas = 200000000000000;
  const deposit = 100000000000000000000000;

  let ftMetadata = {
    decimals: 24,
  };
  if (state.tokenAddress !== "") {
    ftMetadata = Near.view(address, "ft_metadata", {});
    console.log("ftmetadata: " + ftMetadata)
    if (ftMetadata === null) return null;
  }

  const amountInYocto = Big(state.amount)
    .mul(Big(10).pow(ftMetadata.decimals))
    .toFixed();

  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: state.description ?? defaultDescription,
          kind: {
            Transfer: {
              token_id: state.tokenAddress,
              receiver_id: state.receiver_id,
              amount: amountInYocto,
            },
          },
        },
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};

const onChangeRecipient = (receiver_id) => {
  State.update({
    receiver_id,
    error: undefined,
  });
};

const onChangeAmount = (amount) => {
  State.update({
    amount,
    error: undefined,
  });
};

const onChangeToken = (tokenAddress) => {
  State.update({
    tokenAddress,
    error: undefined,
  });
};

const onChangeDescription = (description) => {
  State.update({
    description,
    error: undefined,
  });
};

const defaultDescription = `Transfer proposal`;

return (
  <>
    <div className="mb-2">
      <h5>Recipient</h5>
      <input
        type="text"
        onChange={(e) => onChangeRecipient(e.target.value)}
        placeholder={state.receiver_id}
      />
    </div>
    <div className="mb-3">
      <h5>Token Address</h5>
      <input
        type="text"
        onChange={(e) => onChangeToken(e.target.value)}
        placeholder={state.tokenAddress}
      />
    </div>
    <div className="mb-3">
      <h5>Amount</h5>
      <input
        type="number"
        onChange={(e) => onChangeAmount(e.target.value)}
        min="0"
      />
    </div>

    <div className="mb-3">
      <h5>Description</h5>
      <Widget
        src="sking.near/widget/Common.Inputs.Markdown"
        props={{
          onChange: (value) => onChangeDescription(value),
          height: "270px",
          initialText: defaultDescription,
        }}
      />
    </div>

    {state.error && <div className="text-danger">{state.error}</div>}
    <div className="ms-auto">
      <Widget
        src="sking.near/widget/Common.Button"
        props={{
          children: "Propose Transfer",
          onClick: handleProposal,
          className: "mt-2",
          variant: "success",
        }}
      />
   
  
      
    </div>
  </>
);