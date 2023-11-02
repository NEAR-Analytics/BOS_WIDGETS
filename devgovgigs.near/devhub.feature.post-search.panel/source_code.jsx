const { href } = VM.require("devgovgigs.near/widget/core.lib.url");

href || (href = () => {});

State.init({
  tag: props.tag,
  term: "",
});

const updateInput = (term) => {
  State.update({
    term: term,
  });
};

const buttonStyle = {
  backgroundColor: "#0C7283",
  color: "#f3f3f3",
};

const PageTitle = styled.h5`
  color: #00ec97;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 25%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

return (
  <>
    {!props.hideHeader && (
      <Container>
        <div className="w-100">
          <PageTitle>Activity Feed</PageTitle>
          <div>
            <div className="d-flex flex-column flex-lg-row gap-4">
              <InputContainer>
                <div className="position-absolute d-flex ps-3 flex-column h-100 justify-center">
                  <i class="bi bi-search m-auto"></i>
                </div>
                <input
                  type="search"
                  className="ps-5 form-control border border-0 bg-light"
                  value={state.term ?? ""}
                  onChange={(e) => updateInput(e.target.value)}
                  onKeyDown={(e) => e.key == "Enter" && search()}
                  placeholder={props.placeholder ?? `Search by content`}
                />
              </InputContainer>
              <div class="dropdown">
                <button
                  class="btn btn-light dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sort{props.recency === "all" ? ": All replies" : ": Latest"}
                </button>
                <ul class="dropdown-menu px-2 shadow">
                  <li>
                    <a
                      style={{ borderRadius: "5px" }}
                      class="dropdown-item link-underline link-underline-opacity-0"
                      href={href({
                        widgetSrc: "devgovgigs.near/widget/app",
                        params: { page: "feed" },
                      })}
                    >
                      Latest
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ borderRadius: "5px" }}
                      class="dropdown-item link-underline link-underline-opacity-0"
                      href={href({
                        widgetSrc: "devgovgigs.near/widget/app",
                        params: { page: "feed", recency: "all" },
                      })}
                    >
                      All replies
                    </a>
                  </li>
                </ul>
              </div>
              <div class="dropdown">
                <Widget
                  src="devgovgigs.near/widget/devhub.feature.post-search.by-author"
                  props={{
                    author: state.author,
                    onAuthorSearch: (author) => {
                      State.update({ author });
                    },
                  }}
                />
              </div>
              <div>
                <Widget
                  src="devgovgigs.near/widget/devhub.feature.post-search.by-tag"
                  props={{
                    tag: state.tag,
                    onTagSearch: (tag) => {
                      State.update({ tag });
                    },
                  }}
                />
              </div>
              <div className="d-flex flex-row-reverse flex-grow-1">
                {props.children}
              </div>
            </div>
          </div>
        </div>
      </Container>
    )}
    <PostContainer>
      <Widget
        src="devgovgigs.near/widget/devhub.entity.post.List"
        props={{
          author: state.author,
          tag: state.tag,
          term: state.term,
          recency: props.recency,
          transactionHashes: props.transactionHashes,
        }}
      />
    </PostContainer>
  </>
);
