let storedGreeting = Near.view("hello.near-examples.near", "get_greeting");

if (!storedGreeting || context.loading) {
  return "Loading...";
}

const [greeting, setGreeting] = useState(storedGreeting);
const [activeIndex, setActiveIndex] = useState(0);

const Main = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI
`;

useEffect(() => {
  setActiveIndex(context.accountId ? 1 : 0);
}, [context]);

const onInputChange = ({ target }) => {
  setGreeting(target.value);
};

const onBtnClick = () => {
  Near.call(contract, "set_greeting", { greeting });
};

// Render
return (
  <Main>
    <div class="container py-4 px-5 text-dark bg-light rounded">
      <h3 class="text-center">
        The contract says:
        <span class="text-primary"> {greeting} </span>
      </h3>

      <div class="p-4">
        <div className="input-group" hidden={activeIndex === 0}>
          <input placeholder="Store a new greeting" onChange={onInputChange} />
          <button class="btn btn-primary" onClick={onBtnClick}>
            Save
          </button>
        </div>

        <p class="text-center py-2" hidden={activeIndex === 1}>
          Login to change the greeting
        </p>
      </div>
    </div>
  </Main>
);
