const token = props.token || "cos.tkn.near";
const target = props.target || "fazendacosmica.near";

State.init({
  token,
  target,
  loading: false,
  data: null,
  dataIntervalStarted: false,
  tokenMetadata: null,
  tokenMetadataIsFetched: false,
});

const updateToken = (token) => State.update({ token });

const updateTarget = (target) => State.update({ target });

const fetchOptions = {
  headers: {
    "x-api-key": "16f280cc-6708-4a66-b657-b6cf146bce34",
  },
};

function formatDate(timestamp) {
  const d = new Date(timestamp);
  return [
    d.getFullYear(),
    ("0" + (d.getMonth() + 1)).slice(-2),
    ("0" + d.getDate()).slice(-2),
  ].join("/");
}

const formatTime = (timestamp) => {
  const d = new Date(timestamp);
  const time = [
    ("0" + d.getHours()).slice(-2),
    ("0" + d.getMinutes()).slice(-2),
    ("0" + d.getSeconds()).slice(-2),
  ].join(":");
  return time;
};

const fetchTransactionsData = () => {
  State.update({ data: null, loading: true });
  const res = fetch(
    `https://api.pikespeak.ai/account/ft-transfer/${state.target || target}`,
    fetchOptions
  );
  if (!res.ok) {
    return `Pikespeak API returned error: ${JSON.stringify(res)}`;
  }
  console.log(res.body.length);
  const filteredData = res.body.filter((item) => item.contract == state.token);

  const data = filteredData.map((item) => ({
    ...item,
    transaction_id_trunc: `${item.transaction_id.substring(
      item.transaction_id.length - 12,
      item.transaction_id.length
    )}...`,
    amount: item.amount ? parseInt(item.amount).toFixed(2) : "-",
    status: item.status ? "OK" : "Fail",
    date: formatDate(item.timestamp / 1000000),
    time: formatTime(item.timestamp / 1000000),
  }));

  State.update({ data, loading: false });
};

fetchTransactionsData();
if (!state.dataIntervalStarted) {
  State.update({ dataIntervalStarted: true });

  setInterval(() => {
    fetchTransactionsData();
  }, 10000);
}

if (!state.tokenMetadataIsFetched) {
  Near.asyncView(state.token, "ft_metadata", {}, "final", false).then(
    (tokenMetadata) =>
      State.update({ tokenMetadata, tokenMetadataIsFetched: true })
  );
}

if (
  state.loading ||
  !state.dataIntervalStarted ||
  !state.tokenMetadataIsFetched
)
  return <>Loading...</>;

const InputWrapper = styled.label`
  display: flex;
  width: 50%;
  flex-direction: row;
  gap: 4px;
  align-items:center;
  &[data-disabled="true"] {
    pointer-events: none;
  }
`;

const Label = styled.div`
  display: block;
  font: var(--text-xs);
  font-weight: 600;
  color: var(--sand12);
`;

const Button = styled.button`
  border-radius: 50px !important;
  color: black;
  border: none !important;
  padding: 12px 12px;
  border: 1px solid #d7dbdf;
  -webkit-transition: background-color 1s, color 1s, -webkit-transform 0.5s;
     transition: background-color 1s, transform 0.5s;
  font-weight: 600;
  font-size: 14px;
  line-height: 15px;
  cursor: pointer;
  white-space: nowrap;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 10px
`;

const Icon = styled.img`
  max-width: 25px;
  max-height: 25px
`;

return (
  <>
    <Widget src="manzanal.near/widget/CosmoPOS.HeaderWithLogo" props={{}} />
    <div className="container-fluid py-2 gap-5">
      <InputContainer>
        <InputWrapper>
          <Label>Token: </Label>
          <Icon src={state.tokenMetadata.icon} />
          <Label>
            {`${state.tokenMetadata.name} (${state.tokenMetadata.symbol})`}
          </Label>
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            placeholder="Change token..."
            onChange={(e) => State.update({ tokenTemp: e.target.value })}
            style={{
              borderRadius: "50px",
            }}
          />
          <Button onClick={() => updateToken(state.tokenTemp)}>Update</Button>
        </InputWrapper>
      </InputContainer>
      <InputContainer>
        <Label>Target: {state.target}</Label>
        <InputWrapper>
          <input
            type="text"
            placeholder="Change target..."
            onChange={(e) => State.update({ targetTemp: e.target.value })}
            style={{
              borderRadius: "50px",
            }}
          />
          <Button onClick={(e) => updateTarget(state.targetTemp)}>
            Update
          </Button>
        </InputWrapper>
      </InputContainer>
      <Widget
        src="lord1.near/widget/table-pagination"
        props={{
          data: state.data,
          columns: [
            {
              title: "Tx Id",
              key: "transaction_id",
              description: "Transaction Id",
              heyperlink: "yes",
              link: "yes",
              beforehref: `https://nearblocks.io/txns/`,
              afterhref: "",
            },
            {
              title: "Status",
              key: "status",
              description: "Status",
            },
            {
              title: "Sender",
              key: "sender",
              description: "Sender",
            },
            {
              title: "Amount",
              key: "amount",
              description: "Amount",
            },
            {
              title: "Receiver",
              key: "receiver",
              description: "Receiver",
            },
            {
              title: "Date",
              key: "date",
              description: "date",
            },
            {
              title: "Time",
              key: "time",
              description: "time",
            },
          ],
          rowsCount: 10,
        }}
      />
    </div>
  </>
);
