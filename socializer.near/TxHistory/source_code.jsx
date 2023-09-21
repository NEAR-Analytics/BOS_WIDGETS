const Owner = "socializer.near";
const API_URL = props?.API_URL || "http://localhost:3000";
const data = props?.data || [];

const columns = [
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

return (
  <TxComponent>
    <h4>{`Transaction Ledger`}</h4>
    <Widget
      src={`${Owner}/widget/table-pagination`}
      props={{
        API_URL,
        themeColor: { table_pagination: themeColor.table_pagination },
        data,
        columns,
        rowsCount: 4,
      }}
    />
  </TxComponent>
);
