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
  align-items: stretch;
  flex-direction: column;
  justify-content: center;
  color: rgb(229 229 229);
  background: rgb(23,23,23);
`;

const Label = styled.label`
    font-szie: 14px;
    margin-bottom: 4px;
`;

const OPTIONS = [
  {
    text: "All",
    value: "all",
  },
];

State.init({
  option: "",
});

const changeOption = (value) => {
  State.update({
    ...state,
    option: value,
  });
};

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
            options: OPTIONS,
            value: state.option,
            onChange: changeOption,
          }}
          src={`${Owner}/widget/Select`}
        />
      </div>
    </div>
  </Wrapper>
);
