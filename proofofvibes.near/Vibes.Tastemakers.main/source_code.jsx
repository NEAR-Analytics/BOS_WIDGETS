// check role in DAO
const daoId = "vibes.sputnik-dao.near"; // add tastemaker logic here
const isTasteMaker = true;
const accountId = context.accountId;
if (!accountId) {
  return (
    <div>
      <p>Login to NEAR with your 🥂 tastemaker approved wallet</p>
    </div>
  );
}

return (
  <div>
    {isTasteMaker && (
      <Widget src="proofofvibes.near/widget/Vibes.Tastemakers.tapIn" />
    )}
  </div>
);
