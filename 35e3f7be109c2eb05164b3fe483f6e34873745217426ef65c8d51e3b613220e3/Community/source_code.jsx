//<Widget src="gov.near/widget/Comments" /> was used
const Wrapper = styled.div`
  .SwitchRoot {
    /* Style for the main container */
.discussion-container {
  background-color: #f2f2f2;
  padding: 200px;
  border-radius: 5px;
}

/* Style for the heading */
.discussion-container h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

/* Style for the discussion items */
.discussion-item {
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

/* Style for the discussion item headings */
.discussion-item h4 {
  color: #0066cc;
  font-size: 18px;
  margin-bottom: 5px;
}

/* Style for the discussion item description */
.discussion-item p {
  color: #333;
  font-size: 14px;
  margin-bottom: 0;
}
 }
  .SwitchThumb {
    }
`;
return (
  <Wrapper>
    <Switch.Root className="SwitchRoot">
      <div class="discussion-container">
        <h1>Discussions and Community:</h1>

        <div class="discussion-item">
          <h4>Complicated technologies </h4>

          <p>
            How can blockchain integrate into finance and law, and what are the
            main challenges and solutions?
          </p>
        </div>

        <div class="discussion-item">
          <h4>Development</h4>

          <p>How will traditional finance adapt to blockchain?</p>
        </div>
        <div class="discussion-item">
          <h4>Development</h4>

          <p>
            Traditional financial institutions are adapting to blockchain's rise
            by exploring its benefits and addressing regulatory challenges to
            stay relevant.
          </p>
        </div>
        <a href="https://jutsu.ai/35e3f7be109c2eb05164b3fe483f6e34873745217426ef65c8d51e3b613220e3/widget/intro">
          <button> main page</button>
        </a>
      </div>

      <div>
        {state.selectedComment && (
          <div>
            <button
              className="btn btn-outline-secondary"
              onClick={clearSelected}
            >
              <i class="bi bi-chevron-left" />
              All Comments
            </button>
            <Widget
              src="gov.near/widget/CommentView"
              props={{ commentRef: state.selectedComment }}
            />
          </div>
        )}
        {state.showCommentForm && (
          <div>
            <div className="d-flex flex-row justify-content-end">
              <button
                className="btn btn-light"
                onClick={() => {
                  State.update({ showCommentForm: false });
                }}
              >
                <i class="bi bi-x-lg" />
              </button>
            </div>
            <Widget
              src="gov.near/widget/SaveComment"
              props={{ searchString: state.searchString, setSearchString }}
            />
          </div>
        )}
        {!state.selectedComment && !state.showCommentForm && (
          <div className="d-flex align-items-center gap-3">
            <div class="input-group input-group-lg">
              <input
                type="text"
                placeholder="Text Goes Here"
                className="form-control input-group input-group-lg"
                value={state.searchString}
                onChange={(e) => {
                  State.update({ searchString: e.target.value });
                }}
              />
            </div>
            <button
              className="btn btn-primary text-nowrap"
              onClick={() => {
                State.update({ showCommentForm: true });
              }}
            >
              <div>
                <i class="bi bi-chat" />
                Post a Comment
              </div>
            </button>
            <Widget
              src="gov.near/widget/CommentList"
              props={{ searchString: state.searchString, setSelectedComment }}
            />
          </div>
        )}
      </div>
      <Switch.Thumb className="SwitchThumb" />
    </Switch.Root>
  </Wrapper>
);
