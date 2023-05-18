const widgetProvider = props.widgetProvider;
const account = props.account || "foundation.near";
const ftList = props.ftList;
const widgetUrl = `https://api.pikespeak.ai/widgets/balance/${account}`;
const apiUrl = `https://api.pikespeak.ai/account/balance/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const BalanceContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ftFormatter = (ftList) => {
  return (data) => {
    return (
      <Widget
        src={`${widgetProvider}/widget/table_ft_formatter`}
        props={{
          ftList,
          ft: data["contract"],
          amount: data["amount"],
          isParsed: true,
        }}
      />
    );
  };
};

const columns = [
  {
    id: "amount",
    label: "",
    formatter: ftFormatter(ftList),
  },
];

const contractsBalance = fetch(apiUrl, {
  mode: "cors",
  headers: {
    "x-api-key": publicApiKey,
  },
});

const fetchBalance = () => {
  const balance = fetch(apiUrl, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  balance.body && State.update({ balance: balance.body });
};
fetchBalance();

const GenericTable = (
  <Widget
    src={`${widgetProvider}/widget/generic_table`}
    props={{
      title: ``,
      columns,
      data: state.balance,
    }}
  />
);

const Card = styled.div`
  box-shadow: 3px 2px 24px rgba(68, 152, 224, 0.3);
  border-radius: 4px;
  padding: 20px;
  margin-top: 40px;
`

return (
  <Card>
    <h2>Balances</h2>
    <BalanceContainer>
      <iframe
        style={{
          width: "35%",
          height: "420px",
          marginTop: "0px",
          overflow: "none",
        }}
        src={widgetUrl}
      ></iframe>
      <div style={{ width: "40%" }}>{GenericTable}</div>
    </BalanceContainer>
  </Card>
);
