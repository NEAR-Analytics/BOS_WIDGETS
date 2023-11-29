// At this point of deployment. this widget display list of widget that matches search input

const WidgetApp = styled.div`
  display: flex;
  // align-items: center;
  justify-content: center;
  // padding-top: 20px;
  // background-color: black;
  height: 100vh;
  * {
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  min-width: 370px;
  width: 100%;
  display: flex;
  flex: 1;
  // background-color: grey;
  height: 54px;
  gap: 1rem;
  // flow: wrap;
`;

const TextInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  width: 100%;
`;

const WidgetList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 15px;
  margin-top: 1rem;
  max-height: 300px;
  height: 300px;
  // overflow-y: auto;
  box-shadow: 0px 0px 8px #ddd;
  border-radius: 10px;
  position: relative;
  // &::-webkit-scrollbar {
  //   display: none;
  // }
`;

const WidgetItem = styled.li`
  // background-color: grey;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  &:hover {
    background-color: #adb5bd;
  }
`;

// search container
const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: grey;
  height: 100%;
  gap: 1rem;
  .input-group {
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    width: 100%;
  }
`;

const SubmitButton = styled.button`
  white-space: nowrap;
  wordWrap: 'break-word';
  display: inline-flex;
  padding: 1.1rem 1.5rem;
  align-items: center;
  justify-content: center;
  border: none;
  background: #8D61EE;
  color: #fff;
  border-radius: 10px;
  // width:40%;
  width: 150px;
`;

const [input, setInput] = useState("");
const [widgets, setWidgets] = useState([]);


function handleChange(value) {
  setInput(value);
  const fetchWidgets = fetch("https://jsonplaceholder.typicode.com/users").body;

  const filteredWidgets = fetchWidgets.filter(
    (widget) =>
      value && widget.username.toLowerCase().includes(value.toLowerCase())
  );
  setWidgets(filteredWidgets);
  // console.log(filteredWidgets)
}

function handleClick(widget) {
  setInput(widget.widgetName);
  console.log(widget.widgetSrc);
}

function handleSubmit() {
  console.log("clicked check widget")
}
return (
  <WidgetApp>
    <Container>
      <SearchContainer>
        <Widget
          loading={
            <div className="input-group">
              <input type="text" className="form-control" />
            </div>
          }
          src="mob.near/widget/ComponentSearch"
          props={{
            boostedTag: "app",
            placeholder: "Search Applications",
            limit: 10,
            onChange: ({ result }) => {
              State.update({ apps: result });
            },
          }}
        />
        {state.apps && (
          <WidgetList >
            <div className="mb-2">
              {state.apps.map((app, i) => (
                <WidgetItem key={i} onClick={(e) => handleClick(app)}>
                  <Widget
                    src="littlelace.near/widget/ComponentItem"
                    props={{
                      link: `/${app.widgetSrc}`,
                      accountId: app.accountId,
                      widgetName: app.widgetName,
                      onHide: () => State.update({ apps: null }),
                    }}
                  />
                </WidgetItem>
              ))}
            </div>

          </WidgetList>
        )}
      </SearchContainer>
      <SubmitButton onClick={()=> handleSubmit()}>Check Widget</SubmitButton>
    </Container>
  </WidgetApp>
);

// <Widget
//   src="littlelace.near/widget/ComponentScroll"
//   props={{ hovering }}
// />