const { accountId, blockHeight } = props;

const content = JSON.parse(
  Social.get(`${accountId}/post/comment`, blockHeight) ?? "null"
);
if (content === null) {
  return "Loading";
}
const item = content.item;

const extractParentPost = (item) => {
  if (!item || item.type !== "social" || !item.path || !item.blockHeight) {
    return undefined;
  }
  const accountId = item.path.split("/")[0];
  return `${accountId}/post/main` === item.path
    ? { accountId, blockHeight: item.blockHeight }
    : undefined;
};

const parentPost = extractParentPost(item);
return parentPost ? (
  <Widget
    src="mob.near/widget/MainPage.Post"
    props={{ ...parentPost, highlightComment: props, commentsLimit: 30 }}
  />
) : (
  <Widget src="mob.near/widget/MainPage.Comment" props={props} />
);
