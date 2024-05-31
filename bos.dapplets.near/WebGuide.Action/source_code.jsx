const { isActive, handleAction } = props

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
  border: ${(props) => (props.$isActive ? "rgba(56, 75, 255, 1)" : "1px solid rgba(226, 226, 229, 1)")};
  background: ${(props) => (props.$isActive ? "rgba(56, 75, 255, 1)" : "rgba(248, 249, 255, 1)")};

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

const iconQuestionMark = (isActive) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <rect width="18" height="18" rx="9" fill={isActive ? "white" : "#02193A"} />
    <path
      d="M7.84446 12.85H9.60281V14.5H7.84446V12.85ZM9.01669 3.5C12.1524 3.621 13.5181 6.591 11.6542 8.8185C11.1677 9.3685 10.3823 9.7315 9.9955 10.1935C9.60281 10.65 9.60281 11.2 9.60281 11.75H7.84446C7.84446 10.8315 7.84446 10.056 8.23716 9.506C8.62399 8.956 9.40939 8.6315 9.89586 8.2685C11.3143 7.0365 10.9626 5.293 9.01669 5.15C8.55035 5.15 8.10311 5.32384 7.77335 5.63327C7.4436 5.94271 7.25835 6.36239 7.25835 6.8H5.5C5.5 5.92479 5.87051 5.08542 6.53001 4.46655C7.18952 3.84768 8.08401 3.5 9.01669 3.5Z"
      fill={isActive ? "#384BFF": "white"}
    />
  </svg>
);

return (
  <ButtonActionWrapper
    $isActive={isActive}
    onClick={handleAction}
    data-mweb-context-type="mweb-overlay-action"
    data-mweb-context-parsed={JSON.stringify({ id: 'web-guide-action' })}
  >
    <ImgButtonWrapper>{iconQuestionMark(isActive)}</ImgButtonWrapper>
    <div
      data-mweb-insertion-point="mweb-overlay-action"
      style={{ display: "none" }}
    />
  </ButtonActionWrapper>
);
