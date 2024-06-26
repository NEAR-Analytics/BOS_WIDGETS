const { Button } = VM.require("buildhub.near/widget/components.Button");

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  overflow-y: auto;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: rgba(11, 12, 20, 0.5);
`;

const Content = styled.div`
  min-width: 500px;
  max-width: 1000px;
  padding: 24px;
  outline: none !important;
  background: #23242B;
  border-radius: 16px;
  color: white;
`;

const NoButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  box-shadow: none;
`;

const CloseContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding-bottom: 24px;
`;

const Icon = styled.i`
    font-size: 24px;
`;

function Modal({
  children,
  open,
  onOpen,
  onClose,
  toggle,
  toggleContainerProps,
  key,
}) {
  const toggleComponent = toggle ?? (
    <Button variant="primary">Open Modal</Button>
  );

  return (
    <Dialog.Root open={open} key={key}>
      <Dialog.Trigger asChild onClick={onOpen}>
        <NoButton {...toggleContainerProps}>{toggleComponent}</NoButton>
      </Dialog.Trigger>
      <Dialog.Overlay asChild>
        <Overlay>
          <Dialog.Content>
            <Content>
              <Dialog.Trigger asChild onClick={onClose}>
                <CloseContainer>
                  <Button variant="outline" type="icon">
                    <Icon className="bi bi-x" />
                  </Button>
                </CloseContainer>
              </Dialog.Trigger>
              {children}
            </Content>
          </Dialog.Content>
        </Overlay>
      </Dialog.Overlay>
    </Dialog.Root>
  );
}

return { Modal };
