const { Post } = VM.require("buildhub.near/widget/components") || {
  Post: () => <></>,
};
const accountId = props.accountId;
if (!accountId) {
  return "No accountId";
}
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content = JSON.parse(
  Social.get(`${accountId}/post/main`, blockHeight) ?? "null"
);
const Container = styled.div`
  padding: 1rem;
`;
return content?.subneddit ? (
  <Widget src="mob.near/widget/Neddit.Post.Page" props={props} />
) : (
  <Container>
    <Post
      noBorder={true}
      commentsLimit={30}
      subscribe={true}
      truncateContent={false}
      {...props}
    />
    ;
  </Container>
);
