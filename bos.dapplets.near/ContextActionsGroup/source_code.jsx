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

const handleSelectComponent = (app) => {
  State.update({ showMenu: false });
  props.createUserLink(app.id);
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
  top: -20px;
  z-index: 79;
`;

const ActionsWrapper = styled.div`
  z-index: 1080;
  border-radius: 0px 4px 4px 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6px;
  border: 1px solid #384bff;

  @keyframes translateAnimation {
    0% {
      display: none;
      width: 0px;
      opacity: 0.3;
      min-height: 0px;
      height: 0px;
      transform-origin: top left;
      transform: scale(0) translateX(-30px);
    }
    80% {
      opacity: 1;
    }
    100% {
      padding-top: 6px;
      border: 1px solid #384bff;
      opacity: 1;
      right: 60px;
      height: auto;
      width: 40px;
      min-height: 34px;
      background: #fff;
      transform-origin: top left;
      transform: scale(1) translateX(0px);
    }
  }
  animation: translateAnimation 0.5s ease forwards;
  transition: all 0.3s;
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
  transform: ${(p) => (p.default ? "translateY(-25px)" : "translateY(39px)")};
  cursor: pointer;
  border: 1px solid #384bff;
  &:before {
    content: "";
    display: block;
    width: 1.5px;
    height: 11px;
    border-radius: 2px;
    background: #384bff;
    position: absolute;
    top: 6px;
    left: 10.5px;
  }
  &:after {
    content: "";
    display: block;
    height: 1px;
    width: 11px;
    border-radius: 2px;
    background: #384bff;
    position: absolute;
    top: 10.8px;
    left: 6px;
  }
  @keyframes translateAnimationBtn {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: translateAnimationBtn 0.5s linear forwards;

  &:hover {
    transform: translateY(-25px) scale(1.1);
  }
  transition: all 0.3s;
`;
const WrapperButtonPlusDefault = styled.div`
  width: 43px;
  height: 62px;
  border-radius: 0px 4px 4px 0px;
  border: 1px solid rgb(56, 75, 255);
  position: absolute;
  top: 30px;
  background: #f8f9ff;
  z-index: 1081;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;
const ButtonPlusDefault = styled.div`
  display: flex;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  bottom: 7px;
  background: ${(p) =>
    p.default ? "#384bff !important" : "#f8f9ff !important"};
  position: relative;
  margin-top: 40px;
  cursor: pointer;
  border: 1px solid #384bff;

  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  &:hover {
    transform: scale(1.1);
  }
  transition: all 0.3s;
`;

const WidgetBadgeWrapper = styled.div`
  position: absolute;
  right: 0;

  z-index: 1200;
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

  border: 1px solid #384bff;
  box-sizing: border-box;
  background: ${(p) => (p.default ? "#384bff !important" : "#fff !important")};

  &:hover {
    transform: scale(1.1);
  }
  svg {
    path {
      stroke: ${(p) => (p.default ? "#fff !important" : "#384bff !important")};
    }
  }
  transition: all 0.3s;
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
  padding-right: 2px;
  cursor: pointer;
  box-sizing: border-box;

  border: 1px solid #384bff;

  background: ${(p) => (p.default ? "#384bff !important" : "#fff !important")};
  &:hover {
    transform: scale(1.1);
  }
  svg {
    path {
      stroke: ${(p) => (p.default ? "#fff !important" : "#384bff !important")};
    }
  }
  transition: all 0.3s;
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
    <path d="M12 7L2 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const iconApply = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="14"
    viewBox="0 0 15 14"
    fill="none"
  >
    <path
      d="M2 7H9.125M3.5 9.25L1.25 7L3.5 4.75M7.25 3.25V2.5C7.25 2.10218 7.40804 1.72064 7.68934 1.43934C7.97064 1.15804 8.35218 1 8.75 1H12.5C12.8978 1 13.2794 1.15804 13.5607 1.43934C13.842 1.72064 14 2.10218 14 2.5V11.5C14 11.8978 13.842 12.2794 13.5607 12.5607C13.2794 12.842 12.8978 13 12.5 13H8.75C8.35218 13 7.97064 12.842 7.68934 12.5607C7.40804 12.2794 7.25 11.8978 7.25 11.5V10.75"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const plusDefault = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
  >
    <path
      d="M6 1.5V11.5"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M1 6.5H11"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
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
          top: props.widgets && props.widgets.length ? "" : "-20px",
        }}
      >
        <SupportingSpan />

        <ActionsWrapper
          style={{
            backgroundColor:
              props.widgets && props.widgets.length ? "" : "#DB504A!important",
          }}
        >
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

          {props.widgets && props.widgets.length ? (
            props.isEditMode ? (
              <ButtonApply onClick={handleApplyClick}>{iconApply}</ButtonApply>
            ) : (
              <ButtonEdit onClick={handleEditClick}>{iconEdit}</ButtonEdit>
            )
          ) : null}
        </ActionsWrapper>
        {props.widgets && props.widgets.length ? (
          <>
            <SupportingSpan />
            <ButtonPlus
              default={props.widgets && props.widgets.length ? true : false}
              style={{
                position:
                  props.widgets && props.widgets.length ? "unset" : "absolute",
                zIndex: "1081",
              }}
              title={!context.accountId ? "Connect wallet" : null}
              onClick={!context.accountId ? null : handleOpenMenu}
            />
          </>
        ) : (
          <WrapperButtonPlusDefault>
            {props.isEditMode ? (
              <ButtonApply
                style={{
                  top: "5px",
                }}
                onClick={handleApplyClick}
                default
              >
                {iconApply}
              </ButtonApply>
            ) : (
              <ButtonEdit
                default
                style={{
                  top: "5px",
                }}
                onClick={handleEditClick}
              >
                {iconEdit}
              </ButtonEdit>
            )}
            <ButtonPlusDefault
              default
              title={!context.accountId ? "Connect wallet" : null}
              onClick={!context.accountId ? null : handleOpenMenu}
            >
              {plusDefault}
            </ButtonPlusDefault>
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
