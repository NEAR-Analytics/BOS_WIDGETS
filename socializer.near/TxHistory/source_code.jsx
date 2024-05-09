const Owner = "socializer.near";
const API_URL = props?.API_URL || "http://localhost:3000";
const list = props?.data || [];
const getTokenData = props?.getTokenData || ((param) => {});

State.init({
  data: list,
  menu: { value: "all" },
});

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
    icon: <img src={`${API_URL}/trx.svg`} />,
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

const selectMenu = (e) => {
  getTokenData(e.text);
  State.update({ menu: e });
};

console.log(state);

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

const SelectContent = styled.div`
    gap: 21px;
    display: flex;
    align-items: center;
    
    @media (max-width: 620px) {
        gap: 10px;
        justify-content: flex-end;
    }
`;

return (
  <TxComponent>
    <h4>{`Transaction Ledger`}</h4>
    <SelectContent>
      <Widget
        props={{
          API_URL,
          noLabel: true,
          options,
          value: state.menu,
          onChange: selectMenu,
        }}
        src={`${Owner}/widget/Select`}
      />
    </SelectContent>
    <Widget
      src={`${Owner}/widget/table-pagination`}
      props={{
        API_URL,
        themeColor: { table_pagination: themeColor.table_pagination },
        data: state.data,
        columns,
        rowsCount: 5,
      }}
    />
  </TxComponent>
);
