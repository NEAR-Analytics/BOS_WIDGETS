const { Feed } = VM.require("efiz.near/widget/Module.Feed");
Feed = Feed || (() => <></>);

const src = props.src;

if (!src) {
  return "";
}

return (
  <>
    <Widget
      src="devs.near/widget/Compose"
      props={{
        index: {
          post: JSON.stringify([
            {
              key: {
                type: "thing",
                path: `${src}`,
              },
              value: {
                type: "md",
              },
            },
          ]),
        },
      }}
    />
    <Feed
      index={[
        {
          action: "post",
          key: {
            type: "social",
            path: `${src}`,
          },
          options: {
            limit: 10,
            order: "desc",
          },
          cacheOptions: {
            ignoreCache: true,
          },
        },
      ]}
      Item={(p) => (
        <Widget
          loading={<div className="w-100" style={{ height: "200px" }} />}
          src="mob.near/widget/MainPage.N.Post"
          props={{ accountId: p.accountId, blockHeight: p.blockHeight }}
        />
      )}
    />
  </>
);
