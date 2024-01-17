State.init({
  show: false,
  showMenu: false,
});

const handleOnMouseEnter = () => {
  State.update({ show: true });
};

const handleOnMouseLeave = () => {
  state.showMenu ? null : State.update({ show: false });
};

const handleOpenMenu = () => {
  State.update({ showMenu: true, show: false });
};

const handleCloseMenu = () => {
  State.update({ showMenu: false });
};

const handleSelectComponent = (component) => {
  State.update({ showMenu: false });
  props.injectWidget(`${component.accountId}/widget/${component.widgetName}`);
};

const handleRemoveWidget = (bosWidgetId, linkId) => {
  props.removeWidget(bosWidgetId, linkId);
}

const OverlayTriggerWrapper = styled.div`
  display: flex;
  position: relative;
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
  background: #e3e3e3;
  position: relative;
  transform: translateY(6px);
  cursor: pointer;
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

const ButtonApply = styled.button`
  &:hover {
    background: #eb9dab;
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

const iconRemoveAction = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <circle cx="7" cy="7" r="6.5" fill="#DB504A" stroke="white" />
    <path
      d="M9.24976 4.75L4.74999 9.24977"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4.75 4.75L9.24977 9.24977"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const ActionBlock = styled.span`
  position: relative;
  div {
    z-index: 1000;
  }
`;
const RemoveAction = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  z-index: 1200;
  @keyframes translateAnimationBtn {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: translateAnimationBtn 0.5s linear forwards;
  transition: all 0.3s;
  &:hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

return (
  <OverlayTriggerWrapper onMouseEnter={handleOnMouseEnter}>
    <div style={{ opacity: state.show ? 0 : 1 }} className="OverlayTrigger">
      <TriggerEar />
    </div>
    {state.show ? (
      <TriggerShowPanel
        onMouseLeave={handleOnMouseLeave}
        style={{ margin: "0px -7px" }}
      >
        <ActionsWrapper>
          <TriggerShowLabel />
          {props.widgets.map((widget, i) => (
            <ActionBlock key={i}>
              <RemoveAction onClick={() => handleRemoveWidget(widget.src, widget.linkId)}>{iconRemoveAction}</RemoveAction>
              <Widget src={widget.src} props={widget.props} />
            </ActionBlock>
          ))}
        </ActionsWrapper>

        <ButtonPlus onClick={handleOpenMenu} />
      </TriggerShowPanel>
    ) : null}

    {state.showMenu ? (
      <DappletOverlay>
        <Widget
          props={{
            handleCloseMenu: handleCloseMenu,
            onSelect: handleSelectComponent,
          }}
          src="bos.dapplets.near/widget/ComponentsSearch"
        />
      </DappletOverlay>
    ) : null}
  </OverlayTriggerWrapper>
);
