const accountId = props.accountId ?? "every.near";
const attestorId = props.attestorId ?? "hack.near";

const isBuilder = Social.get(`${accountId}/profile/builder`, "final");

const isActive = Social.get(
  `${attestorId}/graph/commons/${accountId}`,
  "final"
);

return (
  <>
    <Widget src="hack.near/widget/BuilderHat" props={{ isBuilder, isActive }} />
  </>
);
