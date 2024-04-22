const { Header } = VM.require("buildhub.near/widget/components.Header") || {
  Header: () => <></>,
};
const { Post } = VM.require("buildhub.near/widget/components") || {
  Post: () => <></>,
};
const { MarkdownView } = VM.require("buildhub.near/widget/md-view") || {
  MarkdownView: () => <></>,
};
const mdPath = props.mdPath;
const postAccountId = props.postAccountId;
if (mdPath && !postAccountId) {
  return (
    <div>
      <Header>{props.feedName}</Header>
      <MarkdownView path={mdPath} />
    </div>
  );
}
if (!mdPath && postAccountId) {
  return (
    <div>
      <Header>{props.feedName}</Header>
      <Post
        accountId={postAccountId}
        blockHeight={props.postBlockHeight}
        noBorder={true}
      />
    </div>
  );
}
return (
  <div>
    <Header>{props.feedName}</Header>
    <p>No mdPath or post accountId configured</p>
  </div>
);
