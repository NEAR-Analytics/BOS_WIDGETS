const StyledTabs = styled.div`
  height: 40px;
  padding: 4px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: rgba(33, 35, 48, 0.5);
  display: flex;
  align-items: center;
`;
const StyledTab = styled.div`
  height: 32px;
  line-height: 32px;
  padding: 0px 15px;
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  transition: 0.3s;
  cursor: pointer;
  border: 1px solid rgba(33, 35, 48, 0.5);
  box-sizing: border-box;

  &.active {
    color: #fff;
    border-radius: 8px;
    border: 1px solid #373a53;
    background: #32364b;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const tabs = props.tabs || [];
const { active, onChange } = props;

return (
  <StyledTabs>
    {tabs.map((tab) => (
      <StyledTab
        onClick={() => {
          onChange?.(tab);
        }}
        className={tab.key === active ? "active" : ""}
        key={tab.key}
      >
        {tab.label}
      </StyledTab>
    ))}
  </StyledTabs>
);
