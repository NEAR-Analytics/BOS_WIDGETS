const data = props.data || {};
const type = props.type || "";

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
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 20px;
  `;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
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
`;

const ModalTitle = styled.h3`
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

State.init({
  data,
  isModalOpen: false,
  typeSrc: "every.near",
  selectedType: type,
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
  const data = {
    thing: {
      [thingId]: JSON.stringify({
        data: state.config,
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
  State.update({ selectedType: e.target.value, templateVal: "" });
};

return (
  <Container>
    <SidePanel>
      <Label>Type Source:</Label>
      <Row>
        <Input
          type="text"
          value={state.newTypeSrc}
          onChange={(e) => State.update({ newTypeSrc: e.target.value })}
          placeholder={"accountId"}
        />
        <Button onClick={() => State.update({ typeSrc: state.newTypeSrc })}>
          apply
        </Button>
      </Row>
      <Label>Type</Label>
      <Select value={state.selectedType} onChange={handleTypeChange}>
        <option value="">Select a type</option>
        {availableTypes?.map((it) => (
          <option value={it} key={it}>
            {it}
          </option>
        ))}
      </Select>
      <Label>Template</Label>
      <Input
        value={state.templateVal}
        onChange={(e) => State.update({ templateVal: e.target.value })}
      />
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
      <Footer>
        <Button onClick={() => handleApply()}>apply</Button>
        <Button
          onClick={() => State.update({ isModalOpen: true })}
          disabled={state.config === undefined}
        >
          save
        </Button>
      </Footer>
    </SidePanel>
    <MainContent>
      <Header></Header>
      <Widget
        src="efiz.near/widget/Every.Thing.View"
        props={{ path: state.template, data: state.config }}
      />
    </MainContent>
    {state.isModalOpen && (
      <ModalOverlay>
        <ModalContent>
          <ModalTitle>Save Confirmation</ModalTitle>
          <p>Are you sure you want to save?</p>
          <p>{JSON.stringify(state.config)}</p>
          <p>{JSON.stringify(state.template)}</p>
          <>
            <Input
              onChange={(e) => State.update({ thingId: e.target.value })}
              placeholder="thing id"
            />
          </>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={() => State.update({ isModalOpen: false })}>
            Cancel
          </Button>
        </ModalContent>
      </ModalOverlay>
    )}
  </Container>
);
