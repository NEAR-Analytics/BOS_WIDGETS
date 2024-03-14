const {
  isEditMode,
  createUserLink,
  deleteUserLink,
  enableEditMode,
  disableEditMode,
  widgets,
  apps,
} = props;

State.init({
  show: false,
  showMenu: false,
});

const handleOnMouseEnter = () => State.update({ show: true });

const handleOnMouseLeave = () =>
  state.showMenu ? null : isEditMode ? null : State.update({ show: false });

const handleOpenMenu = () => State.update({ showMenu: true, show: false });

const handleCloseMenu = () => State.update({ showMenu: false, show: false });

const handleSelectComponent = (app) => {
  State.update({ showMenu: false });
  createUserLink(app.id);
};

const OverlayTriggerWrapper = styled.div`
  display: flex;
  z-index: 500;
`;

const FloatingModal = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: falling-animation 0.3s linear forwards;

  @keyframes falling-animation {
    from {
      transform: translate(-50%, -200%);
    }

    to {
      transform: translate(-50%, -50%);
    }
  }
`;

return (
  <OverlayTriggerWrapper onMouseOver={handleOnMouseEnter}>
    <Widget
      src="bos.dapplets.near/widget/LayoutManager.TriggerEar"
      props={{ show: state.show }}
    />
    {state.show ? (
      <Widget
        props={{
          widgets: widgets.filter(
            (w) => w.isSuitable === undefined || w.isSuitable === true
          ),
          isEditMode,
          enableEditMode,
          disableEditMode,
          handleOpenMenu,
          handleOnMouseLeave,
          deleteUserLink,
        }}
        src="bos.dapplets.near/widget/LayoutManager.EarOpened"
      />
    ) : null}

    {state.showMenu ? (
      <DappletOverlay>
        <FloatingModal>
          <Widget
            props={{
              handleCloseMenu,
              onSelect: handleSelectComponent,
              apps,
            }}
            src="bos.dapplets.near/widget/ComponentsSearch"
          />
        </FloatingModal>
      </DappletOverlay>
    ) : null}
  </OverlayTriggerWrapper>
);
