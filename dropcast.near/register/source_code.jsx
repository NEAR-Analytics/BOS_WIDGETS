const accountId = context.accountId;
const Owner = "dropcast.near";
const API_URL = props.API_URL || "http://localhost:3000";
const USER = props.USER || {};
const TOKEN = props.TOKEN || "";

//Styles
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 64px;
  position: relative;
  flex-direction: column;
  color: rgb(229 229 229);
  background: rgb(23,23,23);
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
  projects: [{ text: "Loading", value: "0" }],
  loaded: false,
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

if (!state.loaded) getProjects();

return (
  <Wrapper>
    <div
      className="d-flex flex-column rounded-3 gap-4"
      style={{ padding: 48, background: "rgb(38, 38, 38)" }}
    >
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
          className="w-full px-2 py-1 shadow-sm rounded-3"
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
          className="w-full px-2 py-1 rounded-3 border-0"
          style={{ fontSize: 14 }}
        />
      </div>
      <div className="d-flex flex-column">
        <Label>Mint Date</Label>
        <input
          type="date"
          name="mint_date"
          placeholder="Mint Date"
          className="w-full px-2 py-1 rounded-3 border-0"
          style={{ fontSize: 14 }}
        />
      </div>
      <div className="d-flex flex-column">
        <Label>Supply</Label>
        <input
          name="supply"
          className="w-full px-2 py-1 rounded-3 border-0"
          style={{ fontSize: 14 }}
        />
      </div>
      <div className="d-flex flex-column">
        <Label>Discord</Label>
        <input
          name="discord"
          placeholder="Discord invite Link"
          className="w-full px-2 py-1 rounded-3 border-0"
          style={{ fontSize: 14 }}
        />
      </div>
      <div className="d-flex flex-column">
        <Label>Twitter</Label>
        <input
          name="twitter"
          placeholder="Twitter"
          className="w-full px-2 py-1 rounded-3 border-0"
          style={{ fontSize: 14 }}
        />
      </div>
      <StepButton className="btn">Next Step</StepButton>
    </div>
  </Wrapper>
);
