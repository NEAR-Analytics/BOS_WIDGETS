const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const fast = !props.profile;

if (profile === null) {
  return "Loading";
}

const Wrapper = styled.div`
  margin-top: calc(-1 * var(--body-top-padding, 0));
`;

return (
  <Wrapper>
    <Widget
      src="mob.near/widget/ProfileLarge"
      props={{
        accountId,
        profile,
        link: true,
        fast,
        showEditButton: !props.profile,
      }}
    />
    <Widget
      src="mundoaurora.near/widget/NEAREsBlog"
      props={{ accountId, profile }}
    />
  </Wrapper>
);
