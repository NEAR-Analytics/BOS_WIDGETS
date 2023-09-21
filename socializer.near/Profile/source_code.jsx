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

const tx_columns = [
  {
    title: "S.No",
    key: "no",
    width: 20,
    align: "left",
  },
  {
    title: "Amount",
    key: "amount",
    width: 20,
    align: "left",
  },
  {
    title: "Transaction",
    key: "hash",
    width: 20,
    align: "left",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 48 48"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linejoin="round"
          stroke-width="4"
        >
          <rect width="30" height="36" x="9" y="8" rx="2" />
          <path
            stroke-linecap="round"
            d="M18 4v6m12-6v6m-14 9h16m-16 8h12m-12 8h8"
          />
        </g>
      </svg>
    ),
    link: true,
    click: () => {},
  },
  {
    title: "Transaction Type",
    key: "type",
    width: 20,
    align: "left",
  },
  {
    title: "Date",
    key: "date",
    width: 20,
    align: "left",
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
`;

const TxComponent = styled.div`
  display: flex;
  width: 100%;
  background: #F3F3F3;
  flex-direction: column;
  padding: 6px 24px;
  border-radius: 8px;
  border: 1px solid var(--light_90, #E6E6E6);
  gap: 20px;
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
        const { token, history } = res.body;
        State.update({
          tokens: token,
          history,
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
  asyncFetch(API_URL + `/api/balance/withdraw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      const { error, data } = res.body;
      if (error) State.update({ error, loading: false });
      else if (data && data === "success") {
        State.update({
          loaded: false,
        });
      }
    }
  });
};

const registry = async (item) => {
  if (item.id == "NEAR" || item.token != "0") return;
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
        <h4>Hi, {profile.name ? profile.name : accountId}</h4>
        <h5>
          <b>Wallet ID:</b>
          {accountId}
        </h5>
      </div>
    </div>

    {state.history.length !== 0 && (
      <TxComponent>
        <h4>{`Transaction Ledger`}</h4>
        <Widget
          src={`${Owner}/widget/table-pagination`}
          props={{
            API_URL,
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.history,
            columns: tx_columns,
            rowsCount: 4,
          }}
        />
      </TxComponent>
    )}
  </Wrapper>
);
