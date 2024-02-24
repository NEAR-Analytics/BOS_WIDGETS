const { Feed } = VM.require("devs.near/widget/Module.Feed");

Feed = Feed || (() => <></>);

const index = props.index || {
  action: "post",
  key: "main",
  options: {
    limit: 10,
    order: "desc",
    accountId: [context.accountId ?? "every.near"],
  },
};

return (
  <div className="d-flex flex-column gap-1 pb-4">
    <Feed
      index={{
        action: index.action,
        key: index.key,
        options: {
          limit: index.options.limit,
          order: index.options.order,
          accountId: index.options.accountId,
        },
      }}
      Item={(p) => {
        return (
          <div key={p} className="mb-3">
            <Widget
              src="mob.near/widget/MainPage.Post"
              props={{ accountId: p.accountId, blockHeight: p.blockHeight }}
            />
          </div>
        );
      }}
      Layout={Grid}
    />
  </div>
);
