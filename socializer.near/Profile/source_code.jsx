const accountId = context.accountId;
const Owner = "socializer.near";
const Admin = "humans-of-near.near";
const profile = Social.getr(`${accountId}/profile`);
const widgets = Social.getr(`${accountId}/widget`) ?? {};

const API_URL = props?.API_URL || "http://localhost:3000";

State.init({
  myAvatar: `https://i.near.social/magic/large/https://near.social/magic/img/account/${accountId}`,
  tokens: [],
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
  display: flex;
  width: 100%;
  background: #F3F3F3;
  flex-direction: column;
  padding: 6px 24px;
  border-radius: 8px;
  border: 1px solid var(--light_90, #E6E6E6);
  gap: 20px;
  margin-top: 50px;
`;

const Avatar = styled.img`
  display: flex;
  width: 100px;
  height: 100px;
  border-radius: 100px;
`;

const Button = styled.button`
  width: 100%;
  padding: 8px 9px 8px 28px;
  display: flex;
  gap: 7px;
  border-radius: 6px;
  border: 1px solid var(--light_90, #E6E6E6);
  background: var(--Dark, #121212);
  text-align: center;
  color: var(--light_95, #F3F3F3);
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  margin: auto;
`;

const Table = styled.table`
  border-radius: 8px;
  background: #F5F1F1;
  margin: 0;
`;

const Input = styled.input`
  width: 80px;
`;

const getTokenData = () => {
  return asyncFetch(API_URL + `/api/token?accountId=${accountId}`).then(
    (res) => {
      if (res.ok) {
        State.update({
          tokens: res.body,
          loaded: true,
          loading: false,
        });
      }
    }
  );
};

if (!state.loaded) getTokenData();

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
    console.log("==>amt", amt);
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
  let data = {
    accountId,
    amount,
    token: item._id,
  };

  State.update({ error: "", loading: true });
  asyncFetch(API_URL + `/api/balance/withdraw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      const { error, data } = res.body;
      if (error) State.update({ error });
      else if (data && data === "success") {
        State.update({
          loaded: false,
        });
      }
    }
  });
};

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
      <h4>Hi, {profile.name ? profile.name : accountId}</h4>
    </div>
    <WalletComponent>
      <div className="d-flex " style={{ borderBottom: "1px solid #808080" }}>
        <h5 style={{ fontWeight: 700, fontSize: 18, lineHeight: "150%" }}>
          {"Near Wallet"}
        </h5>
      </div>
      <div className="d-flex ">
        <h5 style={{ fontWeight: 600, fontSize: 18 }}>{accountId}</h5>
      </div>
    </WalletComponent>
    <TokenComponent>
      <div
        className="d-flex justify-content-between"
        style={{
          borderBottom: "1px solid #808080",
          gap: 12,
        }}
      >
        <div
          className="d-flex"
          style={{
            gap: 12,
            flexDirection: "column",
          }}
        >
          <h5 style={{ fontWeight: 700, fontSize: 18, lineHeight: "150%" }}>
            {"Token Balances"}
          </h5>
          <p style={{ fontSize: 12 }}>
            {
              "These NEP Tokens Can be allocated as bounty for users that engage with your tweets. These can be withdrawn to you wallet at any time"
            }
          </p>
          {state.error && (
            <p style={{ fontSize: 12, color: "red" }}>{state.error}</p>
          )}
        </div>
        <div className="d-flex" style={{ minWidth: 150 }}>
          <Button>
            {"Select Token"}
            <span style={{ height: 18 }}>
              <svg
                width="30"
                height="26"
                viewBox="0 0 30 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_58_4394)">
                  <rect
                    x="4"
                    y="18"
                    width="18"
                    height="22"
                    rx="8"
                    transform="rotate(-90 4 18)"
                    fill="#141522"
                    shape-rendering="crispEdges"
                  />
                  <path
                    d="M19 5.27337L18.06 4.33337L15 7.38671L11.94 4.33337L11 5.27337L15 9.27337L19 5.27337Z"
                    fill="white"
                  />
                  <path
                    d="M19 9.66668L18.06 8.72668L15 11.78L11.94 8.72669L11 9.66669L15 13.6667L19 9.66668Z"
                    fill="white"
                  />
                  <rect
                    x="4.5"
                    y="17.5"
                    width="17"
                    height="21"
                    rx="7.5"
                    transform="rotate(-90 4.5 17.5)"
                    stroke="#141522"
                    shape-rendering="crispEdges"
                  />
                </g>
              </svg>
            </span>
          </Button>
        </div>
      </div>

      <div className="d-flex ">
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
                                value={state[row.id] ?? 0}
                                onChange={(e) => {
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
  </Wrapper>
);
