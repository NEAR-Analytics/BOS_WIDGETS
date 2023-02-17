const accountId = context.accountId;

if (!accountId) {
  return "Sign in with NEAR Wallet";
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
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const H1 = styled.h1`
  font-size: 24px;
  line-height: 1.2em;
  color: #11181C;
  margin: 0 0 20px;
`;

const renderItem = (item, i) => {
  if (i === 0) {
    Storage.set("lastBlockHeight", item.blockHeight);
  }
  return (
    <Widget src="calebjacob.near/widget/Notification" key={i} props={item} />
  );
};

return (
  <Wrapper>
    <H1>Your Notifications</H1>
    <Widget src="mob.near/widget/IndexFeed" props={{ index, renderItem }} />
  </Wrapper>
);
