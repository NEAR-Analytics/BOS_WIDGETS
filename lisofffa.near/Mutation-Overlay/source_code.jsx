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
  max-width: 1px;
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
    display: inline-block;

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
const MenuWrapper = styled.div`
display: flex;
width: 100vw;
height: 100vh;
position: absolute;
top: 0px;
left: 50%;
z-index: 2000;
background: rgba(255, 255, 255, 0.3);
transform: none!important;
transform:translateX(-50%);
}
`;

const Menu = styled.div`
  display: flex;
  width: 500px;
  padding: 10px;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid rgba(231, 236, 239, 0.6);
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 16px 16px 0px,
    rgba(0, 0, 0, 0.049) 0px 65px 65px 0px,
    rgba(0, 0, 0, 0.005) 0px 15px 17px 0px, rgba(0, 0, 0, 0.01) 0px 8px 13px 0px,
    rgba(0, 0, 0, 0) 0px 14px 13px 0px;
  margin: auto;
  height: 430px;
  border-radius: 4px;
  border: 1px solid #c1c6ce;
`;

const MenuTopBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6 6L18 18"
      stroke="#222222"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const TitleMenu = styled.div`
  color: #222;
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
`;

const CloseMenu = styled.span`
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const MenuBlockMedium = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  border-radius: 4px;
  border: 1px solid #c1c6ce;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TitleItemsMenu = styled.div`
  color: #222;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
`;

const MenuBlockDefault = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  margin-bottom: 14px;
`;

const MenuBlockBig = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

const OnboardingButton = styled.button`
  cursor: pounter;
  display: flex;
  width: 70px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: #db504a;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  border: none;
  height: 24px;
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
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const MenuDropdown = styled.div`
  display: flex;
  padding: 10px 20px 10px 10px;
  align-items: center;
  border-radius: 10px;
  background: #e7ecef;
  color: #747376;
  font-size: 14px;
  font-style: italic;
  font-weight: 400;
  line-height: normal;
  width: 100%;
  margin-top: 10px;
  justify-content: space-between;
`;

const MenuInput = styled.div`
  display: flex;
  padding: 10px 20px 10px 10px;
  align-items: center;
  border-radius: 10px;
  background: #e7ecef;
  color: #747376;
  font-size: 14px;
  font-style: italic;
  font-weight: 400;
  line-height: normal;
  width: 100%;
  margin-top: 10px;
  height: 36px;
`;

const MenuButtonBlock = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ButtonApply = styled.button`
  display: flex;
  width: 235px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: #db504a;
  color: #fff;
  border: none;
  font-size: 14px;
  height: 40px;
  font-weight: 400;
  line-height: 149%;
  &:hover {
    background: #eb9dab;
  }
`;

const ButtonCancel = styled.button`
  display: flex;
  width: 235px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: #c1c6ce;
  color: #fff;
  border: none;
  font-size: 14px;
  height: 40px;
  font-weight: 400;
  line-height: 149%;
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

const overlay = (
  <MenuWrapper>
    <Menu>
      <MenuTopBlock>
        <TitleMenu>Apply tipping something</TitleMenu>
        <CloseMenu onClick={handleCloseMenu}>{iconClose}</CloseMenu>
      </MenuTopBlock>
      <MenuBlockMedium>
        <MenuBlockDefault>
          <TitleItemsMenu>Onboarding</TitleItemsMenu>
          <OnboardingButton>Go</OnboardingButton>
        </MenuBlockDefault>
        <MenuBlockBig>
          <TitleItemsMenu>Trusted Users</TitleItemsMenu>
          <MenuDropdown>
            NEAR or Ethereum address... <span>{iconDropdown}</span>
          </MenuDropdown>
        </MenuBlockBig>

        <MenuBlockDefault>
          <TitleItemsMenu>Developer mode</TitleItemsMenu>
          <span>{iconSwitch}</span>
        </MenuBlockDefault>

        <MenuBlockDefault>
          <TitleItemsMenu>Bug reports</TitleItemsMenu>
          <span>{iconSwitch}</span>
        </MenuBlockDefault>
        <MenuBlockBig>
          <TitleItemsMenu>User Agent Name</TitleItemsMenu>
          <MenuInput></MenuInput>
        </MenuBlockBig>
      </MenuBlockMedium>
      <MenuButtonBlock>
        <ButtonCancel>Cancel</ButtonCancel>
        <ButtonApply>Apply</ButtonApply>
      </MenuButtonBlock>
    </Menu>
  </MenuWrapper>
);

return (
  <OverlayTriggerWrapper>
    <div
      style={{ opacity: state.show ? 0 : 1 }}
      className="OverlayTrigger"
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
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
          {props.actions.map((action, i) => (
            <OverlayTrigger
              show={state.showMenu}
              trigger={["click"]}
              delay={{ show: 250, hide: 300 }}
              placement="auto"
              overlay={overlay}
            >
              <ActionsItem key={i} onClick={handleOpenMenu}>
                <span className={action.active ? "ItemActive" : `${i}`}>
                  <img src={action.icon} alt="" />
                </span>
              </ActionsItem>
            </OverlayTrigger>
          ))}
        </ActionsWrapper>
        <ButtonPlus />
      </TriggerShowPanel>
    ) : null}
  </OverlayTriggerWrapper>
);
