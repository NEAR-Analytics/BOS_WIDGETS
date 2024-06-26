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

  padding-inline: 20px;

  div {
    * {
       color: #FFFFFF;
    }
    a * {
      color: #0d6efd;
    }

 
        
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
      src="saidulbadhon.near/widget/NotificationsSidebar.Notification"
      key={i}
      props={{ ...item, theme: props.theme }}
    />
  );
};

return (
  <Wrapper>
    <Widget
      // src="saidulbadhon.near/widget/NotificationsSidebar.IndexFeed"
      src="mob.near/widget/NotificationFeed"
      props={{
        index,
        renderItem,
        moderatorAccount: "adminalpha.near",
        theme: props.theme,
      }}
    />
  </Wrapper>
);
