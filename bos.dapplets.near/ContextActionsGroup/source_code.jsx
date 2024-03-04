const {
  isEditMode,
  createUserLink,
  deleteUserLink,
  enableEditMode,
  disableEditMode,
  widgets,
  apps,
} = props

State.init({
  show: false,
  showMenu: false,
});

const handleOnMouseEnter = () => State.update({ show: true });

const handleOnMouseLeave = () =>
  state.showMenu
    ? null
    : isEditMode
    ? null
    : State.update({ show: false });

const handleOpenMenu = () => State.update({ showMenu: true, show: false });

const handleCloseMenu = () => State.update({ showMenu: false, show: false });

const handleSelectComponent = (app) => {
  State.update({ showMenu: false });
  createUserLink(app.id);
};

const OverlayTriggerWrapper = styled.div`
  display: flex;
  z-index: 500;

  .OverlayTrigger {
    position: absolute;
    background: #384bff;
    border: 1px solid #384bff;
    width: 6px;
    height: 49px;
    right: -6px;
    top: 10px;
    border-radius: 0px 4px 4px 0px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    z-index: 79;
  }
`;

const TriggerShowPanel = styled.div`
  width: 40px;
  height: auto;
  border-radius: 0px 4px 4px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: -33px;
  top: -20px;
  z-index: 79;
`;

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6px;
  border: 1px solid #384bff;
  border-radius: 0px 4px 4px 0px;
  right: 60px;
  width: 40px;
  min-height: 34px;
  height: auto;
  background: #fff;
  z-index: 1080;

  @keyframes translateAnimation {
    from {
      display: none;
      opacity: 0;
    }
    to {
      display: flex;
      opacity: 1;
    }
  }
  animation: translateAnimation 0.3s ease forwards;
  transition: all 0.2s;
`;

const iconClose = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M18 6L6 18"
      stroke="#222222"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6L18 18"
      stroke="#222222"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseMenu = styled.span`
  &:hover {
    transform: scale(1.1);
  }
`;

const OnboardingButton = styled.button`
  &:hover {
    background: #eb9dab;
  }
`;

const iconDropdown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="8"
    viewBox="0 0 14 8"
    fill="none"
  >
    <path
      d="M1 1L7 7L13 1"
      stroke="#747376"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ButtonCancel = styled.button`
  &:hover {
    background: #747376;
  }
`;

const iconSwitch = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="20"
    viewBox="0 0 32 20"
    fill="none"
  >
    <rect width="32" height="20" rx="10" fill="#DB504A" />
    <path
      d="M14 10C14 5.58172 17.5817 2 22 2C26.4183 2 30 5.58172 30 10C30 14.4183 26.4183 18 22 18C17.5817 18 14 14.4183 14 10Z"
      fill="white"
    />
  </svg>
);

const ActionBlock = styled.span`
  position: relative;

  div {
    z-index: 1000;
  }
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
    <div style={{ opacity: state.show ? 0 : 1 }} className="OverlayTrigger">
      <Widget src='bos.dapplets.near/widget/LayoutManager.TriggerEar'/>
    </div>
    {state.show ? (
      <TriggerShowPanel
        onMouseOut={handleOnMouseLeave}
        style={{
          margin: "0px -7px",
          top: widgets && widgets.length ? "" : "-20px",
        }}
      >
        <Widget src='bos.dapplets.near/widget/LayoutManager.SupportingSpan'/>
        <ActionsWrapper
          style={{
            backgroundColor:
              widgets && widgets.length ? "" : "#DB504A!important",
          }}
        >
          {widgets.map((widget) => (
            <ActionBlock key={widget.linkId}>
              {isEditMode ? (
                <Widget
                  src='bos.dapplets.near/widget/LayoutManager.WidgetBadgeWrapper'
                  props={{
                    widget: widget,
                    deleteUserLink: deleteUserLink
                  }}
                />
              ) : null}
              <Widget src={widget.src} props={widget.props} />
            </ActionBlock>
          ))}
          {isEditMode ? (
              <Widget
                src='bos.dapplets.near/widget/LayoutManager.Buttons.Apply'
                props={{ onClick: disableEditMode }}
              />
            ) : (
              <Widget
                src='bos.dapplets.near/widget/LayoutManager.Buttons.Edit'
                props={{ onClick: enableEditMode }}
              />
            )
          }
          <Widget
            src="bos.dapplets.near/widget/LayoutManager.Buttons.Plus"
            props={{ widgets, onClick: handleOpenMenu }}
          />
        </ActionsWrapper>
        {widgets && widgets.length ? <Widget src='bos.dapplets.near/widget/LayoutManager.SupportingSpan'/> : null}
      </TriggerShowPanel>
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
