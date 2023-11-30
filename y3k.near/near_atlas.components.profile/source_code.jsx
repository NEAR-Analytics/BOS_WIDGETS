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
      src="y3k.near/widget/near_atlas.components.profileDesktop"
      props={{
        accountId,
        profile,
        link: true,
        fast,
        showEditButton: !props.profile,
      }}
    />

    <Widget
      src="y3k.near/widget/near_atlas.components.GetWidgets"
      props={{ accountId }}
    />
  </Wrapper>
);
