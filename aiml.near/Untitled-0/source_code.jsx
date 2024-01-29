const Padding = styled.div`
  background-color: white;
  color: white;
  padding: 20px 0;
  text-align: center;
`;

const CONTRACT = "hello.near-examples.near";
const storedGreeting = Near.view(CONTRACT, "get_greeting");
if (!storedGreeting || context.loading) {
  return "Loading...";
}

const [greeting, setGreeting] = useState(storedGreeting);
const [showSpinner, setShowSpinner] = useState(false);
const loggedIn = !!context.accountId;

const onInputChange = ({ target }) => {
  setGreeting(target.value);
};

const onBtnClick = () => {
  setShowSpinner(true);
  Near.call(CONTRACT, "set_greeting", { greeting });
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
      <h2 class="text-center">Web-3 Onbording Form</h2>

      <div className="mb-3">
        <div hidden={!loggedIn}>
          <label className="form-label">
            In the context of Web3 interactions, which greeting style do you
            prefer?
          </label>
          <div className="form-check">
            <input
              type="radio"
              id="yes"
              name="voteChoice"
              value="Decentralized and community-driven greetings"
              onChange={onInputChange}
              className="form-check-input"
            />
            <label htmlFor="yes" className="form-check-label">
              Decentralized and community-driven greetings
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="no"
              name="voteChoice"
              value="Formal and blockchain-specific salutations"
              onChange={onInputChange}
              className="form-check-input"
            />
            <label htmlFor="no" className="form-check-label">
              Formal and blockchain-specific salutations
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
