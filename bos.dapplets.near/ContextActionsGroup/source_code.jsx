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
  props.createUserLink(`${component.accountId}/widget/${component.widgetName}`);
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

const WidgetBadgeWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1200;
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
  border: none;
  cursor: pointer;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0;

  box-shadow: 0px 4px 20px 0px rgba(11, 87, 111, 0.15),
    0px 4px 5px 0px rgba(45, 52, 60, 0.1);
  box-sizing: border-box;
  background: #fff;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.2);
  }
`;

const ButtonApply = styled.button`
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
    <g clip-path="url(#clip0_565_2926)">
      <path
        d="M7 8.75C7.9665 8.75 8.75 7.9665 8.75 7C8.75 6.0335 7.9665 5.25 7 5.25C6.0335 5.25 5.25 6.0335 5.25 7C5.25 7.9665 6.0335 8.75 7 8.75Z"
        stroke="#747376"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.3168 8.74968C11.2392 8.92562 11.216 9.12079 11.2503 9.31002C11.2846 9.49925 11.3749 9.67386 11.5093 9.81134L11.5443 9.84634C11.6528 9.95469 11.7389 10.0834 11.7976 10.225C11.8563 10.3666 11.8865 10.5184 11.8865 10.6718C11.8865 10.8251 11.8563 10.9769 11.7976 11.1185C11.7389 11.2602 11.6528 11.3888 11.5443 11.4972C11.436 11.6056 11.3073 11.6917 11.1657 11.7504C11.024 11.8091 10.8722 11.8393 10.7189 11.8393C10.5656 11.8393 10.4138 11.8091 10.2721 11.7504C10.1305 11.6917 10.0018 11.6056 9.8935 11.4972L9.8585 11.4622C9.72102 11.3277 9.5464 11.2375 9.35717 11.2032C9.16794 11.1689 8.97277 11.192 8.79683 11.2697C8.6243 11.3436 8.47715 11.4664 8.37351 11.6229C8.26987 11.7794 8.21425 11.9628 8.2135 12.1505V12.2497C8.2135 12.5591 8.09058 12.8558 7.87179 13.0746C7.653 13.2934 7.35625 13.4163 7.04683 13.4163C6.73741 13.4163 6.44066 13.2934 6.22187 13.0746C6.00308 12.8558 5.88016 12.5591 5.88016 12.2497V12.1972C5.87565 12.0041 5.81315 11.8168 5.70079 11.6598C5.58844 11.5027 5.43143 11.383 5.25016 11.3163C5.07422 11.2387 4.87905 11.2155 4.68982 11.2498C4.50059 11.2842 4.32598 11.3744 4.1885 11.5088L4.1535 11.5438C4.04514 11.6523 3.91647 11.7384 3.77484 11.7971C3.63321 11.8558 3.4814 11.886 3.32808 11.886C3.17476 11.886 3.02295 11.8558 2.88132 11.7971C2.73968 11.7384 2.61101 11.6523 2.50266 11.5438C2.39419 11.4355 2.30814 11.3068 2.24943 11.1652C2.19071 11.0236 2.1605 10.8717 2.1605 10.7184C2.1605 10.5651 2.19071 10.4133 2.24943 10.2717C2.30814 10.13 2.39419 10.0014 2.50266 9.89301L2.53766 9.85801C2.67214 9.72053 2.76235 9.54592 2.79667 9.35668C2.83098 9.16745 2.80781 8.97228 2.73016 8.79634C2.65622 8.62381 2.53344 8.47666 2.37693 8.37302C2.22043 8.26938 2.03704 8.21376 1.84933 8.21301H1.75016C1.44074 8.21301 1.144 8.09009 0.925205 7.8713C0.706412 7.65251 0.583496 7.35576 0.583496 7.04634C0.583496 6.73692 0.706412 6.44018 0.925205 6.22138C1.144 6.00259 1.44074 5.87967 1.75016 5.87967H1.80266C1.99574 5.87516 2.183 5.81266 2.34009 5.70031C2.49718 5.58795 2.61683 5.43094 2.6835 5.24967C2.76115 5.07373 2.78431 4.87856 2.75 4.68933C2.71569 4.5001 2.62548 4.32549 2.491 4.18801L2.456 4.15301C2.34752 4.04466 2.26147 3.91599 2.20276 3.77435C2.14405 3.63272 2.11383 3.48091 2.11383 3.32759C2.11383 3.17427 2.14405 3.02246 2.20276 2.88083C2.26147 2.7392 2.34752 2.61053 2.456 2.50217C2.56435 2.3937 2.69302 2.30765 2.83465 2.24894C2.97628 2.19023 3.12809 2.16001 3.28141 2.16001C3.43473 2.16001 3.58655 2.19023 3.72818 2.24894C3.86981 2.30765 3.99848 2.3937 4.10683 2.50217L4.14183 2.53717C4.27931 2.67165 4.45392 2.76187 4.64315 2.79618C4.83238 2.83049 5.02755 2.80733 5.2035 2.72967H5.25016C5.4227 2.65573 5.56984 2.53295 5.67348 2.37645C5.77713 2.21994 5.83275 2.03655 5.8335 1.84884V1.74967C5.8335 1.44026 5.95641 1.14351 6.17521 0.924717C6.394 0.705924 6.69074 0.583008 7.00016 0.583008C7.30958 0.583008 7.60633 0.705924 7.82512 0.924717C8.04391 1.14351 8.16683 1.44026 8.16683 1.74967V1.80217C8.16758 1.98988 8.2232 2.17328 8.32684 2.32978C8.43049 2.48628 8.57763 2.60906 8.75016 2.68301C8.92611 2.76066 9.12128 2.78382 9.31051 2.74951C9.49974 2.7152 9.67435 2.62499 9.81183 2.49051L9.84683 2.45551C9.95518 2.34704 10.0839 2.26098 10.2255 2.20227C10.3671 2.14356 10.5189 2.11334 10.6722 2.11334C10.8256 2.11334 10.9774 2.14356 11.119 2.20227C11.2606 2.26098 11.3893 2.34704 11.4977 2.45551C11.6061 2.56386 11.6922 2.69253 11.7509 2.83416C11.8096 2.97579 11.8398 3.12761 11.8398 3.28092C11.8398 3.43424 11.8096 3.58606 11.7509 3.72769C11.6922 3.86932 11.6061 3.99799 11.4977 4.10634L11.4627 4.14134C11.3282 4.27882 11.238 4.45343 11.2037 4.64266C11.1693 4.8319 11.1925 5.02707 11.2702 5.20301V5.24967C11.3441 5.42221 11.4669 5.56935 11.6234 5.673C11.7799 5.77664 11.9633 5.83226 12.151 5.83301H12.2502C12.5596 5.83301 12.8563 5.95592 13.0751 6.17472C13.2939 6.39351 13.4168 6.69026 13.4168 6.99967C13.4168 7.30909 13.2939 7.60584 13.0751 7.82463C12.8563 8.04343 12.5596 8.16634 12.2502 8.16634H12.1977C12.01 8.16709 11.8266 8.22271 11.6701 8.32635C11.5136 8.43 11.3908 8.57714 11.3168 8.74968Z"
        stroke="#747376"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_565_2926">
        <rect width="14" height="14" fill="white" />
      </clipPath>
    </defs>
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
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
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

          {props.widgets.map((widget) => (
            <ActionBlock key={widget.linkId}>
              {props.isEditMode ? (
                <WidgetBadgeWrapper>
                  {widget.linkAuthorId === context.accountId ? (
                    <Widget
                      src="bos.dapplets.near/widget/LayoutManager.DeleteWidgetButton"
                      props={{
                        onClick: () => handleRemoveWidget(widget.linkId),
                      }}
                    />
                  ) : (
                    <Widget src="bos.dapplets.near/widget/LayoutManager.LockedWidgetBadge" />
                  )}
                </WidgetBadgeWrapper>
              ) : null}
              <Widget src={widget.src} props={widget.props} />
            </ActionBlock>
          ))}

          {props.isEditMode ? (
            <ButtonApply
              style={{
                marginBottom:
                  props.widgets && props.widgets.length ? "6px" : "",
                marginTop: props.widgets && props.widgets.length ? "" : "3px",
              }}
              onClick={handleApplyClick}
            >
              {iconApply}
            </ButtonApply>
          ) : (
            <ButtonEdit
              style={{
                marginBottom:
                  props.widgets && props.widgets.length ? "6px" : "",
                marginTop: props.widgets && props.widgets.length ? "" : "3px",
              }}
              onClick={handleEditClick}
            >
              {iconEdit}
            </ButtonEdit>
          )}
        </ActionsWrapper>

        <ButtonPlus onClick={handleOpenMenu} />
      </TriggerShowPanel>
    ) : null}

    {state.showMenu ? (
      <DappletOverlay>
        <FloatingModal>
          <Widget
            props={{
              handleCloseMenu: handleCloseMenu,
              onSelect: handleSelectComponent,
            }}
            src="bos.dapplets.near/widget/ComponentsSearch"
          />
        </FloatingModal>
      </DappletOverlay>
    ) : null}
  </OverlayTriggerWrapper>
);
