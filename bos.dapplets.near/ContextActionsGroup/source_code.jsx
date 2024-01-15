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
  State.update({ showMenu: true });
};

const handleCloseMenu = () => {
  State.update({ showMenu: false });
};

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
  width: 40px;
  height: 40px;
  display: flex;
  border-radius: 0px 4px 4px 0px;
  z-index: 1070;
  cursor: pointer;
  position: absolute;
  @keyframes scaleAnimation {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
  animation: scaleAnimation 1s linear forwards;
  transition: all 0.3s;
`;

const ActionsWrapper = styled.div`
  background: #fff;
  width: 40px;

  border-radius: 0px 4px 4px 0px;
  @keyframes translateAnimation {
    0% {
      display: none;
      height: 0;
      opacity: 0;
    }

    100% {
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 6px;
      border: 1px solid #db504a;
      opacity: 1;
    }
  }
  animation: translateAnimation 1.5s linear forwards;
  transition: all 0.3s;
`;

const ActionsItem = styled.div`
  display: flex;
  width: 34px;
  height: 34px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #db504a;
  margin-bottom: 6px;
  cursor: pointer;
  box-sizing: border-box;
  @keyframes translateAnimationItem {
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
  animation: translateAnimationItem 1.5s linear forwards;
  transition: all 0.3s;
  &:hover {
    border: 1px solid #c1c6ce;
    box-shadow: 0px 4px 20px 0px rgba(11, 87, 111, 0.15),
      0px 4px 5px 0px rgba(45, 52, 60, 0.1);
  }
  .ItemActive {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      border: 1px solid #19ceae;
      object-fit: cover;
      border-radius: 50%;
      width: 34px;
      height: 34px;
      display: block;
    }
    &:before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      background: #fff;
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 2px;
      right: 2px;
      background: #19ceae;
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
  }
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
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: translateAnimationBtn 1.5s linear forwards;
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

return (
  <OverlayTriggerWrapper>
    <div
      style={{ opacity: state.show ? 0 : 1 }}
      className="OverlayTrigger"
      onMouseEnter={handleOnMouseEnter}
    >
      <TriggerEar />
    </div>
    {state.show ? (
      <TriggerShowPanel
        style={{ margin: "0px -7px" }}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        <TriggerShowLabel />

        <ActionsWrapper>
          <slot />
        </ActionsWrapper>

        <ButtonPlus onClick={handleOpenMenu} />
      </TriggerShowPanel>
    ) : null}

    {state.showMenu ? (
      <Overlay>
        <Widget src="dapplets.near/widget/ComponentsSearch" />
      </Overlay>
    ) : null}
  </OverlayTriggerWrapper>
);
