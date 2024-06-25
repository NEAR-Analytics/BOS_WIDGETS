const Padding = styled.div`
  background-color: white;
  color: white;
  padding: 20px 0;
  text-align: center;
`;

const [vote, setVote] = useState("");
const [showSpinner, setShowSpinner] = useState(false);
const [submittedVote, setSubmittedVote] = useState(null);

const onInputChange = ({ target }) => {
  setVote(target.value);
};

const onBtnClick = () => {
  setShowSpinner(true);
  // Simulate async call with a timeout
  setTimeout(() => {
    setShowSpinner(false);
    setSubmittedVote(vote);
  }, 1000);
};

const Main = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI
`;

// Render

return (
  <Main>
    <div className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
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
    <div className="container py-4 px-5 text-dark bg-light rounded">
      <h2 className="text-center">NDC Voting Form</h2>

      <div className="mb-3">
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
        {submittedVote && (
          <div className="mt-3">
            You voted {submittedVote === "yes" ? "yes" : "no"}.
          </div>
        )}
      </div>
    </div>
  </Main>
);
