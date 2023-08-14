const SwitchContainer = styled.div`
  width: 60px;
  height: 30px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  padding: 0 5px;
  cursor: pointer;
  background-color: ${(props) => (props.isOn ? "#30C9F3" : "#CCC")};
  transition-property: background-color;
  transition-duration: 2s;
  transition-timing-function: ease;
  transition-delay: 1s;
`;

const SwitchKnob = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: white;
  transform: ${(props) =>
    props.isOn ? "translateX(26px)" : "translateX(-4px)"};
`;

const Switch = (isOn, handleToggle) => (
  <SwitchContainer isOn={isOn} onClick={handleToggle}>
    <SwitchKnob isOn={isOn} />
  </SwitchContainer>
);

return Switch(!!props.isToggled, props.handleToggle);
