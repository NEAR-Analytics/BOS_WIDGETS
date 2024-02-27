const { daos, deliverTreasury, typeOfProject } = props;
const { Items } = VM.require(
  `ndcdev.near/widget/daos.Components.MetricsDisplay.styled`
);

const [totalTreasury, setTotalTreasury] = useState(0);
const [loading, setLoading] = useState(false);

const getTotalTreasury = async (accountId) => {
  try {
    return asyncFetch(`${baseUrl}/account/balance/${accountId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5",
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const fetchDaoFunds = async () => {
  const totalDAOTreasuryAmount = 0;
  setLoading(false);

  const promises = daos.flatMap((dao) => [
    getTotalTreasury(dao.account_id).then((resp) => {
      if (!resp.body) return;

      const data = resp.body;
      if (data)
        totalDAOTreasuryAmount +=
          data.find((d) => d.contract === "Near")?.amount ?? 0;
    }),
  ]);

  Promise.all(promises).then((res) => {
    setTotalTreasury(res);
    setLoading(false);
  });
};

fetchDaoFunds();
if (!Items || loading) return <Widget src="flashui.near/widget/Loading" />;

const Item = ({ value, text, color, type }) => {
  return (
    <Widget
      src={`ndcdev.near/widget/daos.Components.MetricsDisplay.Item`}
      props={{ value, text, color, type }}
    />
  );
};

return (
  <Items>
    <Item
      value={totalTreasury}
      loading={loading}
      text={props.text.totalTreasury}
    />
    <Item
      value={deliverTreasury}
      loading={loading}
      text={props.text.deliverTreasury}
    />
    <Item
      value={typeOfProject}
      loading={loading}
      type="list"
      text={props.text.typeOfProject}
    />
  </Items>
);
