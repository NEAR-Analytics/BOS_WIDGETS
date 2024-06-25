const { appId, isActive, handleAction, tooltip, children } = props;

const ButtonActionWrapper = styled.button`
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 22px;
  outline: none;
  padding: 0;
  border-radius: 4px;
  box-shadow: 0 4px 5px 0 rgba(45, 52, 60, 0.1);
  transition: all 0.2s ease;
  border: ${(props) =>
    props.$isActive
      ? "rgba(56, 75, 255, 1)"
      : "1px solid rgba(226, 226, 229, 1)"};
  background: ${(props) =>
    props.$isActive ? "rgba(56, 75, 255, 1)" : "rgba(248, 249, 255, 1)"};

  &:hover {
    background: ${(props) => (props.$isActive ? "#AFB7FF" : "#FFFFFF")};
    border: ${(props) => (props.$isActive ? "#AFB7FF" : "#FFFFFF")};
  }

  &:active {
    background: ${(props) => (props.$isActive ? "#9199E1" : "#EEEFF5")};
    border: ${(props) => (props.$isActive ? "#9199E1" : "#EEEFF5")};
  }
`;

const ImgButtonWrapper = styled.span`
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
`;

return (
  <ButtonActionWrapper
    title={tooltip}
    $isActive={isActive}
    onClick={handleAction}
    data-mweb-context-type="mweb-overlay-action"
    data-mweb-context-parsed={JSON.stringify({
      id: `web-guide-action-${appId}`,
      type: "web-guide-action",
      appId,
    })}
  >
    <ImgButtonWrapper>{children}</ImgButtonWrapper>
    <div
      data-mweb-insertion-point="mweb-overlay-action"
      style={{ display: "none" }}
    />
  </ButtonActionWrapper>
);
