const { daos, totalTreasury, deliverTreasury, typeOfProject } = props;
const { Items } = VM.require(
  `ndcdev.near/widget/daos.Components.MetricsDisplay.styled`,
);

if (!Items || !daos) return <Widget src="flashui.near/widget/Loading" />;

const baseUrl = "https://api.pikespeak.ai";
// const [totalTreasury, setTotalTreasury] = useState(null);
const [loading, setLoading] = useState(false);

// const getTotalTreasury = async (accountId) => {
//   try {
//     return asyncFetch(`${baseUrl}/account/balance/${accountId}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-key": "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5",
//       },
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

// const fetchDaoFunds = async () => {
//   const totalDAOTreasuryAmount = 0;

//   const promises = daos.flatMap((dao) =>
//     getTotalTreasury(dao.account_id).then((resp) => {
//       if (!resp.body) return;

//       const data = resp.body;
//       if (data) {
//         totalDAOTreasuryAmount +=
//           data.find((d) => d.contract === "Near")?.amount ?? 0;
//       }
//     }),
//   );

//   Promise.all(promises).then(() => {
//     setTotalTreasury(totalDAOTreasuryAmount);
//     setLoading(false);
//   });
// };

// fetchDaoFunds();

return (
  <Items>
    <Widget
      src={`ndcdev.near/widget/daos.Components.MetricsDisplay.Item`}
      props={{ value: totalTreasury, text: props.text.totalTreasury, loading }}
    />
    <Widget
      src={`ndcdev.near/widget/daos.Components.MetricsDisplay.Item`}
      props={{
        value: deliverTreasury,
        text: props.text.deliverTreasury,
      }}
    />
    <Widget
      src={`ndcdev.near/widget/daos.Components.MetricsDisplay.Item`}
      props={{
        value: typeOfProject,
        text: props.text.typeOfProject,
        type: "list",
      }}
    />
  </Items>
);
