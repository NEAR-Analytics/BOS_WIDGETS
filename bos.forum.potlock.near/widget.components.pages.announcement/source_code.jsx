const profile = Social.getr(`forum.potlock.near/profile`, "final", {
  subscribe: true,
});
if (!profile || !profile.announcement) {
  return <></>;
}
const Container = styled.div`
  width: -webkit-fill-available;
  background-image: linear-gradient(to bottom, #4b7a93, #213236);
  color: white;
  a {
    color: white !important;
  }
`;
return (
  <Container className="p-2 px-3 rounded-3">
    <Widget
      src={`bos.forum.potlock.near/widget/components.molecule.Markdown`}
      props={{
        content: profile.announcement,
      }}
    />
  </Container>
);
