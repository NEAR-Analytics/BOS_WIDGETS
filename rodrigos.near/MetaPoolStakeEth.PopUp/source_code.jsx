const authorId = props.authorId || "rodrigos.near";
const title = props.title || "Success!";
const description = props.description || "Tokens staked successfully.";
const showClose = props.showClose || false;
const onClose = props.onClose || (() => {});
const DialogOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 200ms ease-out;
  z-index: 10;
`;

const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: fixed;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  border: none;
  padding: 1.5em 2em 2em;
  gap: 0.625em;
  isolation: isolate;
  animation: ${slideIn} 200ms ease-out;
  overflow-y: auto;
  background: #fff;
  z-index: 10;
  min-width: ${minWidth};
  max-width: 800px;

  &.focus-visible {
    outline: none !important;
  }
`;

const DialogContainer = styled.div`
  &.focus-visible {
    outline: none !important;
  }
`;

const DialogFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${showClose ? "space-between" : "flex-end"};
  width: 100%;
`;

const CloseButton = styled.a`
  padding: 0.75em 1em;
  gap: 0.5em;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 50px;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  color: #101828;
`;

const { Root, Trigger, Overlay, Content, Close, Title, Description } = Dialog;

return (
  <DialogContainer>
    <Root open={props.open}>
      <Trigger asChild>
        <div style={{ display: "none" }} />
      </Trigger>
      <Overlay asChild>
        <DialogOverlay />
      </Overlay>
      <Content asChild>
        <DialogContent>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <DialogFooter>
            {showClose && (
              <Close asChild>
                <CloseButton href="/">Close</CloseButton>
              </Close>
            )}
            <Widget
              src={`${authorId}/widget/MetaPoolStakeEth.Button`}
              props={{
                onClick: () => {
                  onClose();
                },
                text: "Close",
              }}
            />
          </DialogFooter>
        </DialogContent>
      </Content>
    </Root>
  </DialogContainer>
);
