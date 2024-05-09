const ownerId = "hack.near";

State.init({
  signature: true,
  isFetched: false,
  agreement: true,
  showModal: false,
});

if (context.accountId && !state.isFetched) {
  Near.asyncView(
    "social.near",
    "get",
    {
      keys: [
        `${context.accountId}/profile/builder`,
        `${context.accountId}/index/agreement`,
      ],
    },
    "final",
    false
  ).then((data) =>
    State.update({
      signature: data[context.accountId]?.profile?.builder === "true",
      agreement:
        data[context.accountId]?.index?.agreement &&
        data[context.accountId]?.index?.agreement.length > 0,
      isFetched: true,
    })
  );
}

const handleAccept = () => {
  State.update({ showModal: true });
};

const showAgreement = !state.signature && !state.agreement;

const AcceptButton = styled("Tooltip.Trigger")`
  a {
    font-size: 0.9em;
    font-style: normal;
    font-weight: 400;
    line-height: 1em;
    color: #000000;
    text-decoration: none;

    &:hover,
    &:visited {
      color: #000000;
      text-decoration: none;
    }
  }

  color: #000;
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 0.5em 0.5em;
  margin: 2em;
  background: #00ec97;
  border-radius: 18px;
  border: none;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  z-index: 10;
`;

const daoId = props.daoId ?? "build.sputnik-dao.near";
const policy = Near.view(daoId, "get_policy");

if (!policy) {
  return "";
}

const groupId = props.groupId ?? "community";

const groups = policy.roles
  .filter((role) => role.name === groupId)
  .map((role) => {
    const group = role.kind.Group;

    return group;
  });

const communityMember = groups.map((group) => {
  return !group
    ? false
    : group.filter((address) => address === context.accountId).length > 0;
})?.[0];

return (
  <>
    {communityMember && (
      <Tooltip.Provider>
        <Tooltip.Root>
          <AcceptButton>
            <button className="btn btn-white" onClick={handleAccept}>
              <b>Accept</b> <i class="bi bi-check"></i>
            </button>
          </AcceptButton>
        </Tooltip.Root>
      </Tooltip.Provider>
    )}
    {state.showModal && (
      <Widget
        src={`${ownerId}/widget/AgreementModal`}
        props={{
          open: true,
          accept: () =>
            Social.set(
              { profile: { builder: true } },
              {
                onCommit: () => {
                  State.update({ signature: true, showModal: false });
                },
              }
            ),
        }}
      />
    )}
    <Widget src={`${ownerId}/widget/AgreementPage`} />
  </>
);
