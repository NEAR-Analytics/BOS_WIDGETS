State.init({
  show: false,
  showMenu: false,
});

const handleOnMouseEnter = () => {
  State.update({ show: true });
};

const handleOnMouseLeave = () => {
  state.showMenu
    ? null
    : props.isEditMode
    ? null
    : State.update({ show: false });
};

const handleOpenMenu = () => {
  State.update({ showMenu: true, show: false });
};

const handleCloseMenu = () => {
  State.update({ showMenu: false, show: false });
};

const handleSelectComponent = (component) => {
  State.update({ showMenu: false });

  const widgetId = `${component.accountId}/widget/${component.widgetName}`;

  // For backward compatibility
  if (props.apps) {
    const app = props.apps.find((app) => app.componentId === widgetId);
    props.createUserLink(app.id);
  } else {
    // ToDo: delete legacy
    props.createUserLink(widgetId);
  }
};

const handleRemoveWidget = (linkId) => {
  props.deleteUserLink(linkId);
};

const handleEditClick = () => {
  props.enableEditMode();
};

const handleApplyClick = () => {
  props.disableEditMode();
};

const OverlayTriggerWrapper = styled.div`
  display: flex;
  z-index: 500;

  .OverlayTrigger {
    position: absolute;
    background: #db504a;
    border: 1px solid #db504a;
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
    z-index: 600;
  }
`;
const SupportingSpan = styled.span`
  display: inline-block;
  width: 100%;
  height: 30px;
  margin-bottom: 0px;
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
  top: 10px;
`;

const TriggerShowLabel = styled.div`
  background: #db504a;
  display: flex;
  border-radius: 0px 4px 4px 0px;
  z-index: 1100;
  cursor: pointer;
  position: absolute;
  height: calc(100% - 22px);
  top: -1px;
  width: 40px;
  @keyframes scaleAnimation {
    0% {
      opacity: 1;
      transform-origin: top left;
      transform: scaleX(0) scaleY(0);
    }

    100% {
      opacity: 0.5;

      transform-origin: top left;
      transform: scaleX(1) scaleY(1.2);
      display: none;
    }
  }
  animation: scaleAnimation 0.5s ease forwards;
  transition: all 0.3s;
`;

const ActionsWrapper = styled.div`
  z-index: 1080;
  border-radius: 0px 4px 4px 0px;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  @keyframes translateAnimation {
    0% {
      display: none;
      width: 0px;
      opacity: 0.3;
      min-height: 0px;
      height: 0px;
      transform-origin: top left;
      transform: scale(0);
    }
    80% {
      opacity: 1;
    }
    100% {
      padding-top: 6px;
      border: 1px solid #db504a;
      opacity: 1;
      right: 60px;
      height: auto;
      width: 40px;
      min-height: 34px;
      background: #fff;
      transform-origin: top left;
      transform: scale(1);
    }
  }
  animation: translateAnimation 0.5s ease forwards;
`;

const TriggerEar = styled.div`
  display: block;
  width: 2px;
  height: 2px;
  border-radius: 2px;
  background: #fff;
  position: relative;
  &:before {
    content: "";
    display: block;
    width: 2px;
    height: 2px;
    border-radius: 2px;
    background: #fff;
    position: absolute;
    top: 4px;
  }
  &:after {
    content: "";
    position: absolute;
    display: block;
    width: 2px;
    height: 2px;
    border-radius: 2px;
    background: #fff;
    bottom: 4px;
  }
`;

const ButtonPlus = styled.div`
  display: flex;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  position: relative;
  transform: translateY(6px);
  cursor: pointer;
  border: 1px solid #e3e3e3;
  &:before {
    content: "";
    display: block;
    width: 1.5px;
    height: 11px;
    border-radius: 2px;
    background: #747376;
    position: absolute;
    top: 6px;
    left: 11px;
  }
  &:after {
    content: "";
    display: block;
    height: 1px;
    width: 11px;
    border-radius: 2px;
    background: #747376;
    position: absolute;
    top: 11px;
    left: 6px;
  }
  @keyframes translateAnimationBtn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
  animation: translateAnimationBtn 0.5s linear forwards;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0px 4px 20px 0px rgba(11, 87, 111, 0.15),
      0px 4px 5px 0px rgba(45, 52, 60, 0.1);
  }
`;
const WrapperButtonPlusDefault = styled.div`
  width: 43px;
  height: 49px;
  border-radius: 0px 4px 4px 0px;
  position: absolute;
  top: 30px;
  background: #db504a;
  z-index: 1081;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ButtonPlusDefault = styled.div`
  display: flex;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  bottom: 7px;
  background: #db504a;
  position: relative;
  transform: translateY(6px);
  cursor: pointer;
  border: 1px solid #fff;
  &:before {
    content: "";
    display: block;
    width: 1.5px;
    height: 11px;
    border-radius: 2px;
    background: #fff;
    position: absolute;
    top: 6px;
    left: 10.5px;
  }
  &:after {
    content: "";
    display: block;
    height: 1.5px;
    width: 11px;
    border-radius: 2px;
    background: #fff;
    position: absolute;
    top: 11px;
    left: 6px;
  }
  @keyframes translateAnimationBtn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
  animation: translateAnimationBtn 0.5s linear forwards;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.2) translateY(6px);
  }
`;

const WidgetBadgeWrapper = styled.div`
  position: absolute;
  right: 0;

  z-index: 1200;
  // styles for edit mode
  background: rgba(255, 255, 255, 0.35);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  top: -2px;
  backdrop-filter: blur(1px);
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
    transform: scale(1.2);
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

const ButtonEdit = styled.button`
  position: absolute;
  top: -30px;
  margin-bottom: 0;
  border: none;
  cursor: pointer;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0;

  border: 1px solid #e3e3e3;
  box-sizing: border-box;
  background: #fff;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.2);
  }
`;

const ButtonApply = styled.button`
  position: absolute;
  top: -30px;
  margin-bottom: 0;
  border: none;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0;

  cursor: pointer;
  box-sizing: border-box;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.2);
  }
`;

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

const iconEdit = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <path
      d="M12 7L2 7"
      stroke="#747376"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const iconApply = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
  >
    <circle cx="11" cy="11" r="11" fill="#3D7FFF" />
    <path
      d="M17 7L8.75 15L5 11.3636"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
return (
  <OverlayTriggerWrapper onMouseOver={handleOnMouseEnter}>
    <div style={{ opacity: state.show ? 0 : 1 }} className="OverlayTrigger">
      <TriggerEar />
    </div>
    {state.show ? (
      <TriggerShowPanel
        onMouseOut={handleOnMouseLeave}
        style={{
          margin: "0px -7px",
          top: props.widgets && props.widgets.length ? "" : "-10px",
        }}
      >
        <SupportingSpan />

        <ActionsWrapper
          style={{
            backgroundColor:
              props.widgets && props.widgets.length ? "" : "#DB504A!important",
          }}
        >
          <TriggerShowLabel />

          {props.widgets.map((widget) => (
            <ActionBlock key={widget.linkId}>
              {props.isEditMode ? (
                <WidgetBadgeWrapper
                  className={
                    widget.linkAuthorId === context.accountId
                      ? "WidgetHover"
                      : ""
                  }
                  title={
                    widget.linkAuthorId === context.accountId
                      ? `Remove ${widget.src.split("widget/").pop()}`
                      : "disable in edit mode"
                  }
                  style={{
                    opacity:
                      widget.linkAuthorId === context.accountId ? "1" : "0",
                  }}
                >
                  {widget.linkAuthorId === context.accountId ? (
                    <Widget
                      src="bos.dapplets.near/widget/LayoutManager.DeleteWidgetButton"
                      props={{
                        onClick: () => handleRemoveWidget(widget.linkId),
                      }}
                    />
                  ) : // <Widget src="bos.dapplets.near/widget/LayoutManager.LockedWidgetBadge" />
                  null}
                </WidgetBadgeWrapper>
              ) : null}
              <Widget src={widget.src} props={widget.props} />
            </ActionBlock>
          ))}

          {props.isEditMode ? (
            <ButtonApply
              style={{
                display:
                  props.widgets && props.widgets.length ? "flex" : "none",
              }}
              onClick={handleApplyClick}
            >
              {iconApply}
            </ButtonApply>
          ) : (
            <ButtonEdit
              style={{
                display:
                  props.widgets && props.widgets.length ? "flex" : "none",
              }}
              onClick={handleEditClick}
            >
              {iconEdit}
            </ButtonEdit>
          )}
        </ActionsWrapper>
        {props.widgets && props.widgets.length ? (
          <ButtonPlus
            style={{
              transform:
                props.widgets && props.widgets.length
                  ? "translateY(6px)"
                  : "translateY(39px)",

              position:
                props.widgets && props.widgets.length ? "unset" : "absolute",
              zIndex: "1081",
            }}
            onClick={handleOpenMenu}
          />
        ) : (
          <WrapperButtonPlusDefault>
            {" "}
            <ButtonPlusDefault onClick={handleOpenMenu} />
          </WrapperButtonPlusDefault>
        )}
      </TriggerShowPanel>
    ) : null}

    {state.showMenu ? (
      <DappletOverlay>
        <FloatingModal>
          <Widget
            props={{
              handleCloseMenu: handleCloseMenu,
              onSelect: handleSelectComponent,
              apps: props.apps,
            }}
            src="bos.dapplets.near/widget/ComponentsSearch"
          />
        </FloatingModal>
      </DappletOverlay>
    ) : null}
  </OverlayTriggerWrapper>
);
