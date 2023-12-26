State.init({
  show: false,
  showMenu: false,
});

const handleOnMouseEnter = () => {
  State.update({ show: true });
};
const handleOnMouseLeave = () => {
  State.update({ show: false });
};

const handleOpenMenu = () => {
  State.update({ showMenu: true });
};

const handleCloseMenu = () => {
  State.update({ showMenu: false });
};

const OverlayTriggerWrapper = styled.div`

  :root {
    position: absolute;
    right: -8px;
    top: 10px;
  }
  
  .OverlayTrigger {
    background: #fff;
    background: #db504a;
    border: 1px solid #db504a;
    width: 6px;
    height: 49px;
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
  top: 0;
  left: 0;
  z-index: 2000;
`;

const Menu = styled.div`
  display: flex;
  width: 500px;
  padding: 10px;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid #e7ecef;
  background: #fff;
  box-shadow: 0px 16px 36px 0px rgba(0, 0, 0, 0.1),
    0px 65px 65px 0px rgba(0, 0, 0, 0.09),
    0px 145px 87px 0px rgba(0, 0, 0, 0.05),
    0px 258px 103px 0px rgba(0, 0, 0, 0.01),
    0px 404px 113px 0px rgba(0, 0, 0, 0);
`;
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
          <ActionsItem onClick={handleOpenMenu} />
          <ActionsItem />
          <ActionsItem />
          <ActionsItem />
        </ActionsWrapper>
        <ButtonPlus />
      </TriggerShowPanel>
    ) : null}
    {state.showMenu ? <MenuWrapper></MenuWrapper> : null}
  </OverlayTriggerWrapper>
);
