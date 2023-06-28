const data = props.data || {};
const type = props.type || "";
const typeSrc = props.typeSrc || "every.near";
const buildEdges = props.buildEdges;
const template = props.template?.src || "";
const thingId = props.thingId;

if (type !== "") {
  const parts = type.split("/");
  typeSrc = parts[0];
}

const Container = styled.div`
    display: flex;
  `;

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #f2f2f2;
  width: auto;
  z-index: 50;
  min-width: 400px;
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `;

const FormContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    gap: 8px;
    background-color: #f2f2f2;
    padding: 30px;
  `;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-self: flex-start;
  width: 100%;
`;

const Button = styled.button`
  `;

const LeftPanelItem = styled.div`
    padding: 8px;
    background-color: #ccc;
    color: white;
    border-radius: 4px;
  `;

const Select = styled.select`
  `;

const Label = styled.label`
`;

const Input = styled.input`
  `;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  min-width: 500px;
`;

const ModalTitle = styled.h3`
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const CenteredDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
`;

State.init({
  data,
  config: data,
  isModalOpen: false,
  typeSrc,
  selectedType: type,
  view: "CREATE_THING",
  template,
  templateVal: template,
  thingId,
});

const handleOnChange = (value) => {
  State.update({ data: { ...state.data, ...value } });
};

const handleApply = () => {
  State.update({
    config: state.data,
    template: state.templateVal,
  });
  // set the props for the main content
};

const handleSave = () => {
  // create the thing
  State.update({ isModalOpen: false });
  const thingId = state.thingId || Math.random();
  let edges = [];
  if (buildEdges) {
    const newPath = `${context.accountId}/thing/${thingId}`;
    edges = buildEdges(newPath, state.selectedType);
  }

  const data = {
    thing: {
      [thingId]: JSON.stringify({
        data: state.config,
        template: {
          src: state.template,
        },
        type: state.selectedType,
      }),
    },
    index: {
      thing: JSON.stringify({
        key: thingId,
        value: {
          type: state.selectedType,
        },
      }),
    },
  };
  if (edges.length) {
    data.index.edge = JSON.stringify(edges);
  }
  Social.set(data, {
    onCommit: () => {
      State.update({
        data: {},
        isModalOpen: false,
        config: undefined,
      });
    },
    onCancel: () => {
      State.update({
        isModalOpen: false,
      });
    },
  });
};

let availableTypes = [];
const types = Social.get(`${state.typeSrc}/type/**`, "final");
if (types !== null) {
  availableTypes =
    Object.keys(types)?.map((it) => `${state.typeSrc}/type/${it}`) || [];
}

const handleTypeChange = (e) => {
  State.update({ selectedType: e.target.value, templateVal: "", data: {} });
};

return (
  <Container>
    <SidePanel>
      <Row style={{ gap: "8px", marginBottom: "16px" }}>
        <h2>create</h2>{" "}
        <Select
          value={state.view}
          onChange={(e) => State.update({ view: e.target.value })}
        >
          <option value="CREATE_THING">thing</option>
          <option value="CREATE_TYPE">type</option>
        </Select>
      </Row>
      {state.view === "CREATE_THING" ? (
        <>
          <FormContainer>
            <Label>Type Source:</Label>
            <Row>
              <Input
                type="text"
                value={state.newTypeSrc}
                onChange={(e) => State.update({ newTypeSrc: e.target.value })}
                placeholder={"accountId"}
              />
              <Button
                onClick={() => State.update({ typeSrc: state.newTypeSrc })}
              >
                apply
              </Button>
            </Row>
            <Label>Type</Label>
            <Row>
              <Select value={state.selectedType} onChange={handleTypeChange}>
                <option value="">Select a type</option>
                {availableTypes?.map((it) => (
                  <option value={it} key={it}>
                    {it}
                  </option>
                ))}
              </Select>
            </Row>
          </FormContainer>
          <FormContainer>
            <Widget
              src="efiz.near/widget/create"
              props={{
                item: {
                  type: state.selectedType,
                  value: state.data,
                },
                onChange: handleOnChange,
              }}
            />
          </FormContainer>
          <Footer>
            <Button onClick={() => handleApply()}>apply</Button>
            <Button
              onClick={() => State.update({ isModalOpen: true })}
              disabled={state.config === undefined}
            >
              save
            </Button>
          </Footer>
        </>
      ) : (
        <Widget src="every.near/widget/every.type.create" />
      )}
    </SidePanel>
    <MainContent>
      {state.view === "CREATE_THING" ? (
        <>
          <Header>
            <Label>Template:</Label>
            <Input
              value={state.templateVal}
              onChange={(e) => State.update({ templateVal: e.target.value })}
            />
          </Header>
          {(state.template && (
            <Widget src={state.template} props={{ data: state.config }} />
          )) || <CenteredDiv>set a template and click apply</CenteredDiv>}
        </>
      ) : (
        <></>
      )}
    </MainContent>
    {state.isModalOpen && (
      <ModalOverlay>
        <ModalContent>
          <ModalTitle>create thing</ModalTitle>
          <p>option to provide a thing id</p>
          <Row style={{ gap: "8px" }}>
            <Input
              value={state.thingId}
              onChange={(e) => State.update({ thingId: e.target.value })}
              placeholder="thing id"
            />
          </Row>
          <Widget
            src="efiz.near/widget/Every.Raw.View"
            props={{ value: { data: state.config, template: state.template } }}
          />
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={() => State.update({ isModalOpen: false })}>
            Cancel
          </Button>
        </ModalContent>
      </ModalOverlay>
    )}
  </Container>
);
