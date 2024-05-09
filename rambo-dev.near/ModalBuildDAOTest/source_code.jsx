const { Modal } = VM.require("rambo-dev.near/widget/ModalComponent");
const { Button } = VM.require("buildhub.near/widget/components.Button");

State.init({
  isModalOpen: false,
});

function onChangeModalStatus() {
  if (state.isModalOpen) {
    State.update({
      isModalOpen: false,
    });
  } else {
    State.update({
      isModalOpen: true,
    });
  }
}

return (
  <Modal
    toggle={<Button variant="primary">Open Me</Button>}
    open={state.isModalOpen}
    onOpenChange={onChangeModalStatus}
    toggleContainerProps={{}}
  >
    <div>
      <h1>Hello Modal</h1>
    </div>
  </Modal>
);
