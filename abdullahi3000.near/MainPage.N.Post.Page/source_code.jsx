const accountId = "jass.near";
if (!accountId) {
  return "No accountId";
}
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);

const content = JSON.parse(
  Social.get(`${accountId}/post/main`, blockHeight) ?? "null"
);

return content?.subneddit ? (
  <Widget src="mob.near/widget/Neddit.Post.Page" props={props} />
) : (
  <div style={{ marginTop: "calc(-1 * var(--body-top-padding, 0))" }}>
    'hello'
  </div>
);
