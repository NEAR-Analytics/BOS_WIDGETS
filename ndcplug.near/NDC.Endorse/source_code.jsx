const endorsements = [
  {
    accountId: "alan777.near",
    body: "HouseOfMerit",
    reason: "History of developing and building community in Latam",
  },
  {
    accountId: "pironi.near",
    body: "TransparencyCommission",
    reason: "History of developing analytics and DeFI infrastructure, working with NDC and shipping effectively.",
  },
];
return (
  <div>
    {endorsements.map((endorsement) => (
      <Widget
        src="ndcplug.near/widget/NDC.CandidateCard"
        props={{
          accountId: endorsement.accountId,
          body: endorsement.body,
          reason: endorsement.reason,
        }}
      />
    ))}
  </div>
);
