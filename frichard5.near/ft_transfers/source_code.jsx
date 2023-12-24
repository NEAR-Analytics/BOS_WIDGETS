const widgetProvider = props.widgetProvider;
const account = props.account || "foundation.near";
const ftList = props.ftList;
const apiUrl = `https://api.pikespeak.ai/account/ft-transfer/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const ftFormatter = (ftList) => {
  return (data) => {
    return (
      <Widget
        src={`${widgetProvider}/widget/table_ft_formatter`}
        props={{
          ftList,
          ft: data["contract"],
          amount: data["amount"],
        }}
      />
    );
  };
};

const columns = [
  {
    id: "timestamp",
    label: "Date",
    formatter: (data) => {
      const milliTimestamp = Math.trunc(
        Number(data["timestamp"]) / Math.pow(10, 6)
      );
      return new Date(Number(milliTimestamp)).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    },
  },
  {
    id: "sender",
    label: "Sender",
    formatter: (d) => {
      return (
        <a
          href={`https://explorer.near.org/accounts/${d.sender}`}
          target="_blank"
        >
          {d.sender}
        </a>
      );
    },
  },
  {
    id: "receiver",
    label: "Receiver",
    formatter: (d) => {
      return (
        <a
          href={`https://explorer.near.org/accounts/${d.receiver}`}
          target="_blank"
        >
          {d.receiver}
        </a>
      );
    },
  },
  {
    id: "amount",
    label: "Amount",
    formatter: ftFormatter(ftList),
  },
  {
    id: "transaction_id",
    label: "Tx id",
    formatter: (d) => {
      return (
        <a
          href={`https://explorer.near.org/transactions/${d.transaction_id}`}
          target="_blank"
        >
          {d.transaction_id}
        </a>
      );
    },
  },
];

const resPerPage = 10;

State.init({
  txs: [],
  offset: 0,
});

const nextPage = () => {
  State.update({ offset: state.offset + resPerPage });
};

const previousPage = () => {
  State.update({ offset: state.offset - resPerPage });
};

const GenericTable = (
  <Widget
    src={`${widgetProvider}/widget/generic_table`}
    props={{
      title: "FT transfers",
      columns,
      data: state.txs,
      nextPage,
      previousPage,
      offset: state.offset,
      resPerPage,
    }}
  />
);

const fetchTransfers = (offset) => {
  const ftTransfers = fetch(apiUrl + `?offset=${offset}&limit=${resPerPage}`, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  ftTransfers.body && State.update({ txs: ftTransfers.body });
};
fetchTransfers(state.offset);

return <div>{GenericTable}</div>;
