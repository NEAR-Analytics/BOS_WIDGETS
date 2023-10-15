const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to Publish a new book";
}

let profile = Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

State.init({
  book: {},
});

const Wrapper = styled.div`
  #pills-tab,
  #pills-tabContent {
    display: none;
  }
`;

return (
  <Wrapper>
    <div className="row">
      <div className="col-lg-8">
        <div>
          <h4>Publish New Book</h4>
        </div>
        <div className="mb-2">
          <Widget
            src="odafe41.near/widget/MetadataEditor"
            props={{
              // initialMetadata: profile,
              onChange: (book) => State.update({ book }),
              options: {
                name: { label: "Title" },
                image: { label: "Book Cover" },
                description: { label: "Description" },
                tags: {
                  label: "Tags",
                  tagsPattern: "*/profile/tags/*",
                  placeholder: "fiction, sci-fi,",
                },
                author: { label: "Author" },
                published: { label: "Year Published" },
                bookFile: { label: "Upload book file (EPUB)" },
              },
            }}
          />
        </div>
        <div className="mb-2">
          <CommitButton data={{ profile: state.profile }}>
            Save Book
          </CommitButton>
        </div>
      </div>
    </div>
  </Wrapper>
);
