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
  color: #11181c;
  margin: 0 0 24px;
`;

const renderItem = (item, i) => {
  if (i === 0) {
    Storage.set("lastBlockHeight", item.blockHeight);
  }
  return (
    <Widget
      src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/Notification"
      key={i}
      props={item}
    />
  );
};

return (
  <Wrapper>
    <H1>Your Notifications</H1>
    <Widget
      src="near/widget/IndexFeed"
      props={{ index, renderItem, moderatorAccount: "bosmod.near" }}
    />
  </Wrapper>
);
