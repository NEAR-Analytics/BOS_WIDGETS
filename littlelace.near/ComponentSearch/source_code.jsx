// At this point of deployment. this widget display list of widget that matches search input

const [widgets, setWidgets] = useState([]);
const [input, setInput] = useState("");

const [buttonClicked, setButtonClicked] = useState(false);

const WidgetApp = styled.div`
  display: flex;
  // align-items: center;
  justify-content: center;
  // padding-top: 20px;
  // background-color: black;
  height: 0;

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 54px;
  gap: 1rem;
`;

const WidgetList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 15px;
  margin-top: 1rem;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0px 0px 8px #ddd;
  border-radius: 10px;
  // background-color: #fff;
  width: 100%;
  
  @media only screen and (max-width: 500px)
  {
    width: 270px;
  }
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
  width: 350px;
  // display: flex;
  // flex-direction: column;
  height: 100%;
  gap: 1rem;
  font-size: 1rem;
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
  opacity: ${buttonClicked ? 1 : 0.5};
  color: #fff;
  border-radius: 10px;
  // width:30%;
  height: 100%;
`;

function handleClick(widget) {
  setInput(widget.widgetName);
  console.log(widget.widgetSrc);
}

function handleSubmit() {
  setButtonClicked(true);
  console.log("clicked check widget");
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
          src="littlelace.near/widget/ComponentSearchInput"
          props={{
            boostedTag: "app",
            placeholder: "   Search Applications",
            limit: 10,
            onChange: ({ result }) => {
              if (!result.length) result = "";
              State.update({ apps: result });
            },
          }}
        />
        {state.apps && (
          <WidgetList>
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
            {console.log()}
          </WidgetList>
        )}
      </SearchContainer>
      <SubmitButton onClick={() => handleSubmit()}>Check Widget</SubmitButton>
    </Container>
  </WidgetApp>
);
