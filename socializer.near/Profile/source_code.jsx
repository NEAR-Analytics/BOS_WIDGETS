const accountId = context.accountId;
const Owner = "socializer.near";
const Admin = "humans-of-near.near";
const profile = Social.getr(`${accountId}/profile`);
const widgets = Social.getr(`${accountId}/widget`) ?? {};

const API_URL = props?.API_URL || "https://e2e.nearverselabs.com/";

State.init({
  myAvatar: `https://i.near.social/magic/large/https://near.social/magic/img/account/${accountId}`,
  tokens: [],
  history: [],
  loaded: false,
  error: "",
  loading: false,
  menu: { text: "All", value: "all" },
  registered: { NEKO: false, NVRS: false },
  notification: "",
});

const columns = [
  {
    title: "Token Name",
    key: "name",
    width: 25,
    align: "left",
  },
  {
    title: "Token Contract Address",
    key: "contract",
    width: 25,
    align: "center",
  },
  {
    title: "Token Ledger",
    key: "balance",
    width: 25,
    align: "center",
  },
  {
    title: "",
    key: "action",
    width: 25,
    align: "center",
    action: true,
  },
];

const options = [
  {
    text: "All",
    value: "all",
  },
  {
    text: "Winnings",
    value: "winnings",
  },
  {
    text: "Reward Spent",
    value: "rewardspent",
  },
  {
    text: "Reward Returned",
    value: "rewardreturned",
  },
  {
    text: "Campaign Fee",
    value: "campaignfee",
  },
  {
    text: "Deposit",
    value: "deposit",
  },
  {
    text: "Withdrawal",
    value: "withdrawal",
  },
];

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  background: #FAFAFA;
  flex-direction: column;
  padding: 18px;
  gap: 18px;

  input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
`;

const WalletComponent = styled.div`
  display: flex;
  width: 100%;
  background: #F3F3F3;
  flex-direction: column;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid var(--light_90, #E6E6E6);
  gap: 20px;
`;

const TokenComponent = styled.div`
  gap: 20px;
  width: 100%;
  display: flex;
  padding: 6px 24px;
  border-radius: 8px;
  background: #F3F3F3;
  flex-direction: column;
  border: 1px solid var(--light_90, #E6E6E6);
`;

const Avatar = styled.img`
  display: flex;
  width: 100px;
  height: 100px;
  border-radius: 100px;
`;

const Table = styled.table`
  margin: 0;
  border-radius: 8px;
  background: #F5F1F1;
`;

const Input = styled.input`
  width: 80px;
`;

const clearNotification = () => {
  State.update({
    notification: "",
  });
};

const getTokenData = (e) => {
  // State.update({
  //   loaded: false,
  // });
  return asyncFetch(
    API_URL + `/api/token?accountId=${accountId}&historyType=${e.text}`
  ).then((res) => {
    if (res.ok) {
      const { token, history } = res.body;
      State.update({
        history,
        menu: e,
        tokens: token,
        loaded: true,
        loading: false,
      });
    } else {
      State.update({
        ...state,
        loaded: true,
        error: res.error,
      });
    }
  });
};

const toFixed = (x) => {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split("+")[1]);
    if (e) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x.toString();
};

const deposit = async (item) => {
  if (state.loading) return;

  const amount = Number(state[item.id] ?? 0);
  let oneTeraGas = 100000000000000;
  let oneNEARInYoctoNEAR = Number(item.yocto_near);

  if (!amount || amount <= 0) return;
  if (item.id === "NEAR") {
    setTimeout(() => {
      Near.call(
        item.contract,
        item.method,
        Admin,
        oneTeraGas,
        `${amount * oneNEARInYoctoNEAR}`
      );
    }, 3000);
  } else {
    let amt = toFixed((amount + 0.00001) * oneNEARInYoctoNEAR);
    const data = {
      receiver_id: Admin,
      amount: `${amt}`,
      memo: "Token transfer",
    };
    setTimeout(() => {
      Near.call(item.contract, item.method, data, oneTeraGas, 1);
    }, 3000);
  }
  State.update({
    notification: "Processing. Please refresh page after 1 minute",
  });
};

const withdraw = async (item) => {
  if (state.loading) return;
  const amount = Number(state[item.id] ?? 0);

  if (!amount || amount <= 0) return;

  if (amount > item.balance)
    return State.update({ error: "Balance is not enough." });

  let data = {
    accountId,
    amount,
    token: item._id,
  };

  State.update({
    error: "",
    loading: true,
    notification: "Withdrawal will be processed in 1 minute",
  });
  asyncFetch(API_URL + `/api/base/withdraw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      const { error, data } = res.body;
      if (error) {
        State.update({ ...state, error, loading: false });
      } else if (data && data === "success") {
        State.update({
          ...state,
          loaded: false,
          loading: false,
          notification: "Withdrawal Success",
        });
      }
    }
  });
};

const registry = async (item) => {
  if (item.id == "NEAR" || state.registered[item.id]) return;
  const oneTeraGas = 300000000000000;
  const oneNEARInYoctoNEAR = 10000000000000000000000;
  return Near.call(
    item.contract,
    "storage_deposit",
    {
      account_id: accountId,
      registration_only: true,
    },
    oneTeraGas,
    oneNEARInYoctoNEAR
  );
};

const getRegisteredStatus = () => {
  const isRegisterNEKO = Near.view(
    "ftv2.nekotoken.near",
    "storage_balance_of",
    {
      account_id: accountId,
    }
  );
  const isRegisterNVRS = Near.view(
    "rocketbois-reward.near",
    "storage_balance_of",
    {
      account_id: accountId,
    }
  );
  State.update({
    registered: {
      NEKO: isRegisterNEKO ? true : false,
      NVRS: isRegisterNVRS ? true : false,
    },
  });
};

if (!state.loaded) {
  getRegisteredStatus();
  getTokenData(state.menu);
}

if (!state.loaded) return <Widget src={`${Owner}/widget/preload`} />;

return (
  <Wrapper>
    <div className="d-flex align-items-center" style={{ gap: 24 }}>
      <Avatar
        src={state.myAvatar}
        onError={() => {
          State.update({
            myAvatar:
              "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
          });
        }}
      />
      <div>
        <h4>
          Hi,{" "}
          {profile.name
            ? profile.name
            : accountId.length > 30
            ? `${accountId.slice(0, 30)}...`
            : accountId}
        </h4>
        <h6>
          <b>Wallet ID:</b>
          {accountId}
        </h6>
      </div>
    </div>
    <TokenComponent>
      <Widget src={`${Owner}/widget/TokenBalance`} />
      {state.error && (
        <p className="m-0" style={{ color: "red" }}>
          {state.error}
        </p>
      )}
      <div className="d-flex overflow-auto">
        <Table
          className={`table table-hover table-striped table-borderless ${props.className}`}
        >
          <thead>
            <tr>
              {columns.map((th) => (
                <th
                  key={th.title}
                  className="col-1"
                  style={{
                    fontSize: 16,
                    width: `${th.width}%`,
                    verticalAlign: "middle",
                    textAlign: th.align,
                  }}
                  scope="col"
                >
                  <div>
                    <span>{th.title}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {state.tokens.length > 0 &&
              state.tokens.map((row, i) => {
                return (
                  <tr key={row.key}>
                    {columns.map((td) => {
                      const key = td.key ? row[td.key] : i + 1;
                      return (
                        <td
                          style={{
                            color:
                              td.colors ||
                              themeColor?.table_pagination?.columntextcolor,
                            fontSize: 16,
                            textAlign: td.align,
                            verticalAlign: "middle",
                          }}
                        >
                          {td.action ? (
                            <div
                              style={{
                                display: "flex",
                                gap: 10,
                                alignItems: "center",
                              }}
                            >
                              <Input
                                type="number"
                                min="0"
                                value={state[row.id] ?? ""}
                                onChange={(e) => {
                                  State.update({
                                    [row.id]: e.target.value,
                                  });
                                }}
                              />
                              <a
                                href="#"
                                onClick={() => deposit(row)}
                                style={{
                                  color:
                                    row.id !== "NEAR" &&
                                    !state.registered[row.id] &&
                                    "gray",
                                }}
                                className="text-decoration-underline"
                              >
                                {`Deposit`}
                              </a>
                              <a
                                href="#"
                                onClick={() => withdraw(row)}
                                style={{
                                  color: !state.loading
                                    ? row.id !== "NEAR" &&
                                      !state.registered[row.id] &&
                                      "gray"
                                    : "red",
                                }}
                                className="text-decoration-underline"
                              >
                                {`Withdraw`}
                              </a>
                              <a
                                href="#"
                                onClick={() => registry(row)}
                                style={{
                                  color:
                                    (row.id == "NEAR" ||
                                      state.registered[row.id]) &&
                                    "gray",
                                }}
                                className="text-decoration-underline"
                              >
                                {`Register`}
                              </a>
                            </div>
                          ) : (
                            key
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </TokenComponent>

    <Widget
      src={`${Owner}/widget/TxHistory`}
      props={{
        API_URL,
        options,
        getTokenData,
        menu: state.menu,
        data: state.history,
      }}
    />
    {state.notification && (
      <div
        className="d-flex justify-content-end position-absolute"
        style={{ right: 10 }}
      >
        <Widget
          props={{
            text: state.notification,
            type: state.notification.includes("Processing.")
              ? "info"
              : "success",
            clearNotification,
          }}
          src={`${Owner}/widget/Alert_2`}
        />
      </div>
    )}
  </Wrapper>
);
