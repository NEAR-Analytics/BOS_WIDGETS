const { href } = VM.require("megha19.near/widget/core.lib.url");

href || (href = () => {});

State.init({
  tag: props.tag,
  author: props.author,
  term: "",
});

const PageTitle = styled.h1`
  color: #555555;
  font-size: 50px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 28.8px */
  letter-spacing: -0.24px;

  margin: 0;
  margin-bottom: 1rem;
`;

const Container = styled.div`
  padding: 24px;
  width: 100%;
`;

const PostContainer = styled.div`
  margin: 0 1rem;
`;

return (
  <>
    {!props.hideHeader && (
      <Container>
        <div className="w-100">
          <PageTitle>Activity Feed</PageTitle>
          <div>
            <div className="d-flex flex-column flex-lg-row gap-4">
              <div class="dropdown"></div>
              <div className="d-flex flex-row-reverse flex-grow-1">
                {props.children}
              </div>
            </div>
          </div>
        </div>
      </Container>
    )}
    <PostContainer>
      <Widget src="natapat.near/widget/information_list" />
    </PostContainer>
  </>
);
