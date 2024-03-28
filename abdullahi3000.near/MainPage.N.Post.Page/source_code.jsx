const accountId = "jgodwill.near";
if (!accountId) {
  return "No accountId";
}
const blockHeight = 115447915;

const content = JSON.parse(
  Social.get(`${accountId}/post/main`, blockHeight) ?? "null"
);

return content?.subneddit ? (
  <Widget src="mob.near/widget/Neddit.Post.Page" props={props} />
) : (
  <div style={{ marginTop: "calc(-1 * var(--body-top-padding, 0))" }}>
    <Widget
      src="mob.near/widget/MainPage.N.Post"
      props={{
        ...props,
        noBorder: true,
        commentsLimit: 30,
        subscribe: true,
        truncateContent: false,
      }}
    />
  </div>
);
