let { accountId, join_at, total_income } = props;

if (!accountId) {
  accountId = context.accountId;
}

if (!join_at) {
  join_at = "2021-09-01T00:00:00";
}

if (!total_income) {
  total_income = 1210;
}

const PublisherCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;  
  .user {
    width: 40%;    
  }

  .income {
    font-size: 24px;
    font-weight: 600;
    color: #000;
  }

  .title {
    font-size: 12px;
    font-weight: 600;
    color: #6149cd;
  }
`;

const calIncome = () => {
  if (total_income > 1000000000) {
    return (total_income / 1000000000).toFixed(2) + "B";
  }
  if (total_income > 1000000) {
    return (total_income / 1000000).toFixed(2) + "M";
  }
  if (total_income > 1000) {
    return (total_income / 1000).toFixed(2) + "K";
  }
  return total_income;
};

const convertDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

return (
  <PublisherCard>
    <div className="user overflow-x-hidden">
      <Widget
        src="nearui.near/widget/Element.User"
        props={{
          accountId: accountId,
        }}
      />
      <span>Join at: {convertDate(join_at)}</span>
    </div>
    <div className="d-flex row px-4">
      <span className="income">{calIncome(total_income)} N</span>
      <span className="title">Total Income</span>
    </div>
  </PublisherCard>
);
