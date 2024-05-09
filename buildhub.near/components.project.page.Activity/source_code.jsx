const { Feed } = VM.require("devs.near/widget/Feed") ?? {
  Feed: () => <></>,
};
const { Post } = VM.require("buildhub.near/widget/components") || {
  Post: () => <></>,
};
const { getProjectMeta } = VM.require(
  "buildhub.near/widget/lib.project-data"
) || {
  getProjectMeta: () => {},
};
const { id } = props;
const project = getProjectMeta(id);
const { projectAccountId } = project;
return (
  <div className="mt-3">
    <Widget
      loading={
        <div
          className="placeholder-glow h-100 w-100"
          style={{ height: 400 }}
        ></div>
      }
      src="buildhub.near/widget/Compose"
      props={{
        draftKey: id + "_discussions",
      }}
    />
    <Feed
      index={[
        {
          action: "post",
          key: "main",
          options: {
            limit: 10,
            order: "desc",
            accountId: [projectAccountId],
          },
          cacheOptions: {
            ignoreCache: true,
          },
        },
        {
          action: "repost",
          key: "main",
          options: {
            limit: 10,
            order: "desc",
            accountId: [projectAccountId],
          },
          cacheOptions: {
            ignoreCache: true,
          },
        },
      ]}
      Item={(p) => (
        <Post
          accountId={p.accountId}
          blockHeight={p.blockHeight}
          noBorder={true}
          currentPath={`/buildhub.near/widget/app?page=feed`}
        />
      )}
    />
  </div>
);
