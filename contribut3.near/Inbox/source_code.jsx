const ownerId = "contribut3.near";

const availableContent = ["proposals", "invitations"];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "proposals";
  }

  return content;
};

State.init({
  proposalsCount: null,
  invitesCount: null,
});

if (state.proposalsCount === null) {
  Near.asyncView(
    ownerId,
    "get_admin_proposals",
    { account_id: context.accountId },
    "final",
    false
  ).then((proposals) => State.update({ proposalsCount: proposals.length }));
}

const Header = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 2em;
  color: #101828;
`;

const header = <Header>Inbox</Header>;

return (
  <div>
    {header}
  </div>
);
