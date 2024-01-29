const Padding = styled.div`
  background-color: white;
  color: white;
  padding: 20px 0;
  text-align: center;
`;

const CONTRACT = "hello.near-examples.near";
const storedVote = Near.view(CONTRACT, "get_greeting");
if (!storedVote || context.loading) {
  return "Loading...";
}

const [vote, setVote] = useState(storedVote);
const [showSpinner, setShowSpinner] = useState(false);
const loggedIn = !!context.accountId;

const onInputChange = ({ target }) => {
  setVote(target.value);
};

const onBtnClick = () => {
  setShowSpinner(true);
  Near.call(CONTRACT, "set_vote", { vote });
  setShowSpinner(false);
};

const Main = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI
`;

// Render

return (
  <Main>
    <div class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img
            src="https://res.cloudinary.com/dglhc1pfj/image/upload/f_auto,q_auto/v1/samples/lhoetmcicrxlihdcdpou"
            alt=""
            width="50px"
            height="50px"
          />
          Near India
        </a>
      </div>
    </div>
    <div class="container py-4 px-5 text-dark bg-light rounded">
      <h2 class="text-center">NDC Voting Form</h2>

      <div className="mb-3">
        <div hidden={!loggedIn}>
          <label className="form-label">Did you vote?</label>
          <div className="form-check">
            <input
              type="radio"
              id="yes"
              name="voteChoice"
              value="yes"
              onChange={onInputChange}
              className="form-check-input"
            />
            <label htmlFor="yes" className="form-check-label">
              Yes
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="no"
              name="voteChoice"
              value="no"
              onChange={onInputChange}
              className="form-check-input"
            />
            <label htmlFor="no" className="form-check-label">
              No
            </label>
          </div>
          <Padding>
            <button className="btn btn-primary" onClick={onBtnClick}>
              <span hidden={showSpinner}>Vote</span>
              <i
                className="spinner-border spinner-border-sm"
                hidden={!showSpinner}
              ></i>
            </button>
          </Padding>
        </div>
      </div>
    </div>
  </Main>
);
