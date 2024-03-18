const accountId = context.accountId;
const Owner = "socializer.near";
const Admin = "humans-of-near.near";
const profile = Social.getr(`${accountId}/profile`);
const widgets = Social.getr(`${accountId}/widget`) ?? {};

const API_URL = props?.API_URL || "http://localhost:3000";

State.init({
  myAvatar: `https://i.near.social/magic/large/https://near.social/magic/img/account/${accountId}`,
  tokens: [],
  history: [],
  loaded: false,
  error: "",
  loading: false,
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
    title: "Token Deposited",
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

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  background: #FAFAFA;
  flex-direction: column;
  padding: 18px;
  gap: 18px;
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

const getTokenData = () => {
  return asyncFetch(API_URL + `/api/token?accountId=${accountId}`).then(
    (res) => {
      if (res.ok) {
        const { token, history } = res.body;
        State.update({
          tokens: token,
          history,
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
    }
  );
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

  const amount = Number(state[item.id]);
  let oneTeraGas = 100000000000000;
  let oneNEARInYoctoNEAR = Number(item.yocto_near);

  if (!amount || amount <= 0) return;
  if (item.id === "NEAR") {
    Near.call(
      item.contract,
      item.method,
      Admin,
      oneTeraGas,
      amount * oneNEARInYoctoNEAR
    );
  } else {
    let amt = toFixed((amount + 0.00001) * oneNEARInYoctoNEAR);
    const data = {
      receiver_id: Admin,
      amount: amt,
      memo: "Token transfer",
    };
    Near.call(item.contract, item.method, data, oneTeraGas, 1);
  }
};

const withdraw = async (item) => {
  if (state.loading) return;
  const amount = Number(state[item.id]);

  if (!amount || amount <= 0) return;

  if (amount > item.balance)
    return State.update({ error: "Balance is not enough." });

  let data = {
    accountId,
    amount,
    token: item._id,
  };

  State.update({ error: "", loading: true });
  asyncFetch(API_URL + `/api/base/withdraw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      const { error, data, code } = res.body;
      if (error) {
        State.update({ ...state, error, loading: false });
        if(code === "404") await registry(item);
      } else if (data && data === "success") {
        State.update({
          ...state,
          loaded: false,
        });
      }
    }
  });
};

const registry = async (item) => {
  if (item.id == "NEAR") return;
  const oneTeraGas = 300000000000000;
  const oneNEARInYoctoNEAR = 100000000000000000000000;
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

if (!state.loaded) getTokenData();

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
                                  if (Number(e.target.value) <= 0) return;
                                  State.update({
                                    [row.id]: e.target.value,
                                  });
                                }}
                              />
                              <a
                                href="#"
                                onClick={() => deposit(row)}
                                className="text-decoration-underline"
                              >
                                {`Deposit`}
                              </a>
                              <a
                                href="#"
                                onClick={() => withdraw(row)}
                                style={{ color: state.loading && "red" }}
                                className="text-decoration-underline"
                              >
                                {`Withdraw`}
                              </a>
                              <a
                                href="#"
                                onClick={() => registry(row)}
                                style={{
                                  color:
                                    (row.id == "NEAR" || row.token != "0") &&
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

    {state.history.length != 0 && (
      <Widget
        src={`${Owner}/widget/TxHistory`}
        props={{
          API_URL,
          data: state.history,
        }}
      />
    )}
  </Wrapper>
);
