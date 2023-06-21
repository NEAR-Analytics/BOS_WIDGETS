const Container = styled.div`
    display: flex;
    height: 100%;
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
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 4px;
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

const ModalButton = styled.button`
  padding: 10px 20px;
  background-color: #5fba7d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
`;

State.init({
  data: {},
  isModalOpen: false,
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
  State.update({ isModalOpen: true });
};

let availableTypes = [];
const types = Social.get("efiz.near/type/**", "final");
if (types !== null) {
  availableTypes =
    Object.keys(types)?.map((it) => `efiz.near/type/${it}`) || [];
}

const handleTypeChange = (e) => {
  State.update({ selectedType: e.target.value });
};

return (
  <Container>
    <SidePanel>
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
        <Button onClick={() => handleSave()}>save</Button>
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
          <ModalButton onClick={() => State.update({ isModalOpen: false })}>
            Save
          </ModalButton>
          <ModalButton onClick={() => State.update({ isModalOpen: false })}>
            Cancel
          </ModalButton>
        </ModalContent>
      </ModalOverlay>
    )}
  </Container>
);
