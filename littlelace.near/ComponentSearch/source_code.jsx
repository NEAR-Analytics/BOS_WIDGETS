// At this point of deployment. this widget display list of widget that matches search input

const WidgetApp = styled.div`
  display: flex;
  // align-items: center;
  justify-content: center;
  padding-top: 20px;
  // background-color: black;
  height: 100vh;
`;

const Container = styled.div`
  width: 300px;
`;

const TextInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  width: 100%;
`;

const WidgetList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 400px;
  overflow-y: scroll;
`

const WidgetItem = styled.li`
  // background-color: grey;
  text-align: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  &:hover {
    background-color: #adb5bd;
  }
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

return (
  <WidgetApp>
    <Container>
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
        <WidgetList
          style={{
            "list-style-type": "none",
            padding: "0",
            margin: "0",
            maxHeight: "10",
          }}
        >
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
    </Container>
  </WidgetApp>
);
