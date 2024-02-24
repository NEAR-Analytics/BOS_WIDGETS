const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";
const onClose = props.onClose;
const policy = props.daoPolicy;

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  receiver_id: state.receiver_id,
  amount: state.amount,
  tokenAddress: state.tokenAddress || "",
  error: state.error,
  description: state.description,
  notificationsData: {},
  ftMetadata: null,
  storage: undefined
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
      error: "Please enter a valid amount"
    });
    return;
  }
  if (
    !state.receiver_id ||
    receiver_id === "" ||
    !isNearAddress(state.receiver_id)
  ) {
    State.update({
      error: "Please enter a valid recipient"
    });
    return;
  }
  if (state.tokenAddress !== "" && !isNearAddress(state.tokenAddress)) {
    State.update({
      error: "Please enter a valid token address"
    });
    return;
  }

  const gas = 200000000000000;
  const deposit = policy?.proposal_bond || 100000000000000000000000;

  let ftMetadata = {
    decimals: 24
  };
  if (state.tokenAddress !== "") {
    ftMetadata = state.ftMetadata;
  }

  const amountInYocto = Big(state.amount)
    .mul(Big(10).pow(ftMetadata.decimals))
    .toFixed();

  const calls = [
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
              amount: amountInYocto
            }
          }
        }
      },
      gas: gas,
      deposit: deposit
    }
  ];
  if (state.storage === null && state.tokenAddress) {
    const depositInYocto = Big(0.125).mul(Big(10).pow(24)).toFixed();
    calls.push({
      contractName: state.tokenAddress,
      methodName: "storage_deposit",
      args: {
        account_id: state.receiver_id
      },
      gas: gas,
      deposit: depositInYocto
    });
  }
  if (state.notificationsData) {
    calls.push(state.notificationsData);
  }

  Near.call(calls);
};

useEffect(() => {
  if (
    state.tokenAddress &&
    state.receiver_id &&
    isNearAddress(state.receiver_id)
  ) {
    Near.asyncView(state.tokenAddress, "ft_metadata", {}).then((ftMetadata) => {
      State.update({
        ftMetadata
      });
    });
    Near.asyncView(state.tokenAddress, "storage_balance_of", {
      account_id: state.receiver_id
    }).then((storage) => {
      State.update({
        storage
      });
    });
  }
}, [state.receiver_id, state.tokenAddress]);

const onChangeRecipient = (receiver_id) => {
  State.update({
    receiver_id,
    error: undefined
  });
};

const onChangeAmount = (amount) => {
  State.update({
    amount,
    error: undefined
  });
};

const onChangeToken = (tokenAddress) => {
  State.update({
    tokenAddress,
    error: undefined
  });
};

const onChangeDescription = (description) => {
  State.update({
    description,
    error: undefined
  });
};

const defaultDescription = `Transfer proposal`;

// near token icon
const NEAR = () => {
  return (
    <svg
      width={"32px"}
      height={"32px"}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="16" fill="black"></circle>
      <g clip-path="url(#clip0000000003)">
        <path
          d="M20.8422 8.84471L17.4978 13.776C17.4501 13.847 17.43 13.9328 17.4411 14.0174C17.4522 14.102 17.4938 14.1798 17.5582 14.2363C17.6225 14.2928 17.7053 14.3243 17.7913 14.3249C17.8772 14.3254 17.9604 14.2951 18.0256 14.2395L21.3178 11.4036C21.3371 11.3865 21.361 11.3753 21.3866 11.3714C21.4122 11.3675 21.4383 11.3711 21.4619 11.3818C21.4855 11.3924 21.5054 11.4096 21.5193 11.4314C21.5331 11.4531 21.5403 11.4783 21.54 11.504V20.3824C21.54 20.4095 21.5316 20.4361 21.5158 20.4583C21.5001 20.4806 21.4779 20.4975 21.4522 20.5068C21.4265 20.516 21.3985 20.5172 21.3721 20.5102C21.3456 20.5031 21.322 20.4882 21.3044 20.4673L11.3533 8.63726C11.1933 8.44956 10.994 8.29873 10.7693 8.19525C10.5446 8.09178 10.2999 8.03815 10.0522 8.03809H9.70444C9.2524 8.03809 8.81887 8.21642 8.49922 8.53386C8.17957 8.8513 8 9.28185 8 9.73078V22.2351C8 22.684 8.17957 23.1145 8.49922 23.432C8.81887 23.7494 9.2524 23.9277 9.70444 23.9277V23.9277C9.99591 23.9278 10.2825 23.8537 10.537 23.7125C10.7914 23.5713 11.0051 23.3677 11.1578 23.1211L14.5022 18.1898C14.5499 18.1188 14.57 18.033 14.5589 17.9484C14.5478 17.8638 14.5062 17.7861 14.4418 17.7295C14.3775 17.673 14.2947 17.6415 14.2087 17.641C14.1228 17.6404 14.0396 17.6707 13.9744 17.7264L10.6822 20.5622C10.6629 20.5794 10.639 20.5906 10.6134 20.5944C10.5878 20.5983 10.5617 20.5947 10.5381 20.5841C10.5145 20.5734 10.4946 20.5562 10.4807 20.5345C10.4669 20.5128 10.4597 20.4875 10.46 20.4618V11.5813C10.46 11.5541 10.4684 11.5276 10.4842 11.5053C10.4999 11.483 10.5221 11.4661 10.5478 11.4568C10.5735 11.4476 10.6015 11.4464 10.6279 11.4534C10.6544 11.4605 10.678 11.4755 10.6956 11.4963L20.6456 23.3286C20.8056 23.5163 21.0049 23.6671 21.2296 23.7706C21.4543 23.874 21.699 23.9277 21.9467 23.9277H22.2944C22.5184 23.9279 22.7401 23.8842 22.947 23.7992C23.154 23.7142 23.342 23.5895 23.5004 23.4324C23.6588 23.2752 23.7844 23.0885 23.8702 22.8831C23.9559 22.6776 24 22.4574 24 22.2351V9.73078C24 9.28185 23.8204 8.8513 23.5008 8.53386C23.1811 8.21642 22.7476 8.03809 22.2956 8.03809C22.0041 8.03801 21.7175 8.11211 21.4631 8.25332C21.2086 8.39453 20.9949 8.59814 20.8422 8.84471V8.84471Z"
          fill="white"
        ></path>
      </g>
      <defs>
        <clipPath id="clip00033">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(8 7.9834)"
          ></rect>
        </clipPath>
      </defs>
    </svg>
  );
};

const res = useCache(
  () =>
    asyncFetch(`https://api.pikespeak.ai/account/balance/${daoId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5"
      }
    }).then((res) => {
      const data = res.body?.map((a) => {
        const isNEAR = a.contract === "Near";
        return {
          text: (
            <div style={{ gap: 10 }} className="d-flex align-items-center">
              <div style={{ gap: 4 }} className="d-flex align-items-center">
                {!isNEAR ? (
                  <img width="32px" height="32px" src={a.icon} />
                ) : (
                  <NEAR />
                )}
                <p>{a.symbol}</p>
              </div>
              <div>{a?.amount}</div>
            </div>
          ),

          value: isNEAR ? "" : a.contract
        };
      });
      return data;
    }),
  daoId + "-token-info",
  { subscribe: false }
);

if (!res) {
  return <></>;
}

return (
  <>
    <div className="mb-3">
      <h5>Recipient</h5>
      <input
        type="text"
        onChange={(e) => onChangeRecipient(e.target.value)}
        placeholder="Specify target account"
      />
    </div>
    <div className="mb-3">
      <Widget
        src={`sking.near/widget/Common.Inputs.Select`}
        props={{
          label: "Token",
          noLabel: false,
          placeholder: "Select Token",
          options: res ?? [],
          value: state.tokenAddress,
          onChange: (token) => {
            onChangeToken(token.value);
          },

          error: undefined
        }}
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
          initialText: defaultDescription
        }}
      />
    </div>
    <Widget
      src="astraplusplus.ndctools.near/widget/DAO.Proposal.Common.NotificationRolesSelector"
      props={{
        daoId: daoId,
        dev: props.dev,
        onUpdate: (v) => {
          State.update({ notificationsData: v });
        },
        proposalType: "Transfer"
      }}
    />
    {state.error && <div className="text-danger">{state.error}</div>}
    <div className="ms-auto">
      <Widget
        src="sking.near/widget/Common.Button"
        props={{
          children: "Propose Transfer",
          onClick: handleProposal,
          className: "mt-2",
          variant: "success"
        }}
      />
      {onClose && (
        <Widget
          src="sking.near/widget/Common.Button"
          props={{
            children: "Close",
            onClick: onClose,
            className: "mt-2"
          }}
        />
      )}
    </div>
  </>
);
