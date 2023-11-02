const CONTRACT = "hello.near-examples.near";
const storedGreeting = Near.view(CONTRACT, "get_greeting");

if (!storedGreeting || context.loading) {
  return "Loading...";
}

const [greeting, setGreeting] = useState(storedGreeting);
const loggedIn = !!context.accountId;

const onInputChange = ({ target }) => {
  setGreeting(target.value);
};

const onBtnClick = () => {
  Near.call(CONTRACT, "set_greeting", { greeting });
};

const Main = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI
`;

// Render
return (
  <Main>
    <div class="text-center">
      <h3 class="font-weight-bold"> Hello Near </h3>
      <p class="small font-weight-light">
        A greeting stored in
        <span class="text-danger">{CONTRACT}</span>
      </p>
    </div>
    <div class="container py-4 px-5 text-dark bg-light rounded">
      <h2 class="text-center">
        The contract says:
        <span class="text-primary"> {greeting} </span>
      </h2>

      <div class="p-4">
        <div className="input-group" hidden={!loggedIn}>
          <input placeholder="Store a new greeting" onChange={onInputChange} />
          <button class="btn btn-primary" onClick={onBtnClick}>
            Save
          </button>
        </div>

        <p class="text-center py-2" hidden={loggedIn}>
          Login to change the greeting
        </p>
      </div>
    </div>
  </Main>
);
