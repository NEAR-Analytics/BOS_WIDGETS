const keyLabel = props.keyLabel || "Key";
const keyPlaceholder = props.keyPlaceholder || "Key";
const valueLabel = props.valueLabel || "Value";
const valuePlaceHolder = props.valuePlaceHolder || "Value";

const title = props.title || "Add Attribute";
const confirmText = props.confirmText || "Save";
const onConfirm = props.onConfirm;
const hidden = props.hidden;
const onClose = props.onClose;

State.init({
  key: "",
  value: "",
});

const Modal = styled.div`
  display: flex;
  position: fixed;
  inset: 0;
  justify-content: center;
  align-items: center;
  opacity: 1;
  z-index: 1;
`;

const HiddenModal = styled.div`
  display: none
  position: fixed;
  inset: 0;
  justify-content: center;
  align-items: center;
  opacity: 1;
  z-index: 1;
`;

const ModalBackdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.4;
`;

const ModalDialog = styled.div`
  padding: 2em;
  z-index: 3;
  background-color: white;
  border-radius: 6px;
  width: 60%;
  max-height: 80%;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  overflow-y: auto;

  @media (width < 720px) {
    width: 100%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d3d3d3;
  padding-bottom: 4px;
  margin-bottom: 3%;
`;

const ModalFooter = styled.div`
  padding-top: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: items-center;
  margin-top: 5%;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 0.7em;
  border-radius: 6px;
  border: 0;
  color: #344054;
  transition: 300ms;

  &:hover {
    background-color: #d3d3d3;
  }
`;

const ConfirmButton = styled.button`
  padding: 0.7em;
  border-radius: 6px;
  border: 0;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  background-color: #12b76a;
  color: white;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0e9f5d;
  }
`;

const handleOnConfirm = (key, value) => {
  onConfirm({ key, value });
};

const handleKeyChange = (e) => {
  State.update({ key: e.target.value });
};

const handleValueChange = (e) => {
  State.update({ value: e.target.value });
};

if (hidden) {
  <HiddenModal />;
}

return (
  <Modal hidden={hidden}>
    <ModalBackdrop />

    <ModalDialog>
      <ModalHeader>
        <h5>{title}</h5>
      </ModalHeader>
      <Widget
        src="alicolakk.near/widget/Form"
        props={{
          label: "Key",
          placeholder: "Key",
          onInput: handleKeyChange,
          value: state.key,
        }}
      />
      <Widget
        src="alicolakk.near/widget/Form"
        props={{
          label: "Value",
          placeholder: "Value",
          onInput: handleValueChange,
          value: state.value,
        }}
      />
      <ModalFooter>
        <CloseButton onClick={onClose}>Cancel</CloseButton>
        <ConfirmButton onClick={handleOnConfirm}>{confirmText}</ConfirmButton>
      </ModalFooter>
    </ModalDialog>
  </Modal>
);
