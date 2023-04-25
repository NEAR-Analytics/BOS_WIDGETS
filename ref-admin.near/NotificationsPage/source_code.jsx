const accountId = context.accountId;
if (!accountId) {
  return <></>;
}

const index = {
  action: "notify",
  key: accountId,
  options: {
    limit: 10,
    order: "desc",
    subscribe: true,
  },
};

const Wrapper = styled.div`
background: radial-gradient( 64.26% 67.04% at 49.31% 0%, #002c35 0%, #101011 100% );
  padding-bottom: 48px;

  > div {
    > * {
      margin-bottom: 12px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const H1 = styled.h1`
  font-size: 24px;
  line-height: 1.2em;
  color: #fff;
  margin: 0 0 24px;
`;

const renderItem = (item, i) => {
  if (i === 0) {
    Storage.set("lastBlockHeight", item.blockHeight);
  }
  return (
    <Widget src="ref-admin.near/widget/Notification" key={i} props={item} />
  );
};
return (
  <Wrapper>
    <H1 class="h1Title">Your Notifications</H1>
    <Widget
      src="ref-admin.near/widget/IndexFeed"
      props={{ index, renderItem, moderatorAccount: "adminalpha.near" }}
    />
  </Wrapper>
);
