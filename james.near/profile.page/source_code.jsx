const accountId = props.accountId ?? context.accountId ?? "every.near";

const Wrapper = styled.div`
  margin-top: calc(-1 * var(--body-top-padding, 0));
`;

return (
  <Wrapper>
    <Widget
      src="james.near/widget/profile.block"
      props={{ accountId, profile, link: true }}
    />
    <Widget src="efiz.near/widget/SocialGraph" props={{ accountId }} />
  </Wrapper>
);
