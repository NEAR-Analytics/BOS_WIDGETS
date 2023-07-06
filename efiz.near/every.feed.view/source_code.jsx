const data = props.data;

const Container = styled.div`
  height: 100vh;
`;

return (
  <Container>
    {JSON.stringify(data.typeWhitelist) === JSON.stringify(["md"]) ? (
      <>
        // Slate editor
        <Widget
          src="efiz.near/widget/Community.Posts.Compose"
          props={{
            allowPublicPosting: true,
            embedHashtags: data.hashtagWhitelist,
          }}
        />
      </>
    ) : (
      <></>
    )}
    <Widget
      src="efiz.near/widget/every.post"
      props={{
        sources: data.sources,
        typeWhitelist: data.typeWhitelist,
        hashtagWhitelist: data.hashtagWhitelist,
        hashtagBlacklist: data.hashtagBlacklist,
        accountWhitelist: data.accountWhitelist,
        accountBlacklist: data.accountBlacklist,
        disableCaching: data.disableCaching,
      }}
    />
  </Container>
);
