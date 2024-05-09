const Switcher = styled.div`
  width: 40px;
  height: 20px;
  box-sizing: border-box;
  background-color: #181a27;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  cursor: pointer;
  transition: 0.5s;
  padding-top: 2px;
  &.active {
    background-color: var(--switch-color);
  }
  &.disabled {
    cursor: default;
  }
`;
const Handler = styled.div`
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  background-color: #979abe;
  border: 1px solid var(--secondary-border-color);
  border-radius: 50%;
  transition: 0.5s;
  transform: translateX(0);
  cursor: pointer;
  &.active {
    transform: translateX(22px);
    background-color: #fff;
    border-color: #523f7b;
  }
`;

const { active, disabled, onChange } = props;

return (
  <Switcher
    onClick={() => {
      onChange?.();
    }}
    className={`${active && "active"} ${disabled && "disabled"}`}
  >
    <Handler className={active && "active"} />
  </Switcher>
);
