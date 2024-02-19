const accountId = context.accountId;
const Owner = "dropcast.near";
const API_URL = props.API_URL || "http://localhost:3000";
const TOKEN = props.TOKEN || "";

//Styles
const Wrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 64px;
    position: relative;
    flex-direction: column;
    color: rgb(229 229 229);
    background: rgb(23,23,23);
    @media (max-width: 510px) {
      padding: 25px;
    }  
`;

const Card = styled.div`
    gap: 24px;
    display: flex;
    width: 100%;
    padding: 48px;
    border-radius: 8px;
    position: relative;
    flex-direction: column;
    background: rgb(38, 38, 38);
    @media (max-width: 510px) {
      padding: 15px;
      height: 100%;
      .menu {
        width: 74vw;
      }
    }  
`;

const Label = styled.label`
    font-size: 14px;
    margin-bottom: 4px;
`;

const StepButton = styled.button`
    color: #FFF;
    padding: 12px;
    border-radius: 6px;
    background-image: linear-gradient(to right, rgb(147, 51, 234), rgb(99, 102, 241));
`;

State.init({
  error: "",
  selected: "0",
  next: false,
  loaded: false,
  projects: [{ text: "Loading", value: "0" }],
  description: "",
  mint_price: "",
  mint_date: "",
  supply: "",
  discord: "",
  twitter: "",
});

const getProjects = () => {
  State.update({
    loaded: true,
  });
  let promise = asyncFetch(`${API_URL}/api/project/chanel`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-auth-token": TOKEN,
    },
    method: "GET",
  });

  promise.then((data) => {
    if (data.status === 200) {
      State.update({
        projects: data.body,
      });
    } else {
      State.update({
        loaded: true,
      });
    }
  });
};

const changeOption = (value) => {
  State.update({
    ...state,
    selected: value,
  });
};

const handleNextStep = () => {
  State.update({
    ...state,
    next: true,
  });
};

const changeInput = (value, key) => {
  State.update({
    ...state,
    [key]: value,
  });
};

if (!state.loaded) getProjects();

return (
  <div className="w-100 position-relative" style={{ height: "fit-content" }}>
    <Wrapper>
      <Card>
        <div>
          <h5 className="m-0" style={{ fontSize: 18 }}>
            Register Project
          </h5>
          <p
            className="m-0 mt-1"
            style={{ fontSize: 14, color: "rgb(115, 115, 115)" }}
          >
            This information will be displayed publicly.
          </p>
        </div>
        <div>
          <Label>
            Project <span className="text-danger">*</span>
          </Label>
          <Widget
            props={{
              noLabel: true,
              width: "40vw",
              options: state.projects,
              value: state.selected,
              onChange: changeOption,
            }}
            src={`${Owner}/widget/Select`}
          />
        </div>
        <div className="d-flex flex-column">
          <Label>
            Description <span className="text-danger">*</span>
          </Label>
          <textarea
            rows="3"
            name="description"
            placeholder="Description"
            value={state.description}
            className="w-full px-2 py-1 shadow-sm rounded-3"
            onChange={(e) => changeInput(e.target.value, "description")}
            style={{ fontSize: 14 }}
          />
          <p
            className="m-0 mt-1"
            style={{ fontSize: 14, color: "rgb(115, 115, 115)" }}
          >
            Write a few sentences about your project.
          </p>
        </div>
        <div className="d-flex flex-column">
          <Label>Mint Price</Label>
          <input
            type="number"
            min="0"
            name="mint_price"
            placeholder="Mint Price"
            value={state.mint_price}
            className="w-full px-2 py-1 rounded-3 border-0"
            onChange={(e) => changeInput(e.target.value, "mint_price")}
            style={{ fontSize: 14 }}
          />
        </div>
        <div className="d-flex flex-column">
          <Label>Mint Date</Label>
          <input
            type="date"
            name="mint_date"
            placeholder="Mint Date"
            value={state.mint_date}
            className="w-full px-2 py-1 rounded-3 border-0"
            onChange={(e) => changeInput(e.target.value, "mint_date")}
            style={{ fontSize: 14 }}
          />
        </div>
        <div className="d-flex flex-column">
          <Label>Supply</Label>
          <input
            name="supply"
            value={state.supply}
            className="w-full px-2 py-1 rounded-3 border-0"
            onChange={(e) => changeInput(e.target.value, "supply")}
            style={{ fontSize: 14 }}
          />
        </div>
        <div className="d-flex flex-column">
          <Label>Discord</Label>
          <input
            name="discord"
            value={state.discord}
            placeholder="Discord invite Link"
            className="w-full px-2 py-1 rounded-3 border-0"
            onChange={(e) => changeInput(e.target.value, "discord")}
            style={{ fontSize: 14 }}
          />
        </div>
        <div className="d-flex flex-column">
          <Label>Twitter</Label>
          <input
            name="twitter"
            placeholder="Twitter"
            value={state.twitter}
            className="w-full px-2 py-1 rounded-3 border-0"
            onChange={(e) => changeInput(e.target.value, "twitter")}
            style={{ fontSize: 14 }}
          />
        </div>
        <StepButton
          className="btn"
          disabled={
            // state.selected === "0" ||
            !state.description
          }
          onClick={handleNextStep}
        >
          Next Step
        </StepButton>
      </Card>
    </Wrapper>
    {state.next && (
      <Widget
        props={{
          API_URL,
          TOKEN,
          data: {
            guild_id: state.selected,
            description: state.description,
            mint_price: state.mint_price,
            mint_date: state.mint_date,
            supply: state.supply,
            discord: state.discord,
            twitter: state.twitter,
          },
        }}
        src={`${Owner}/widget/import_bot`}
      />
    )}
  </div>
);
