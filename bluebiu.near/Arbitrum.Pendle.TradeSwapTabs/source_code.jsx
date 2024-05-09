const Tabs = styled.div`
  display: flex;
`;
const Tab = styled.div`
  width: 50%;
  height: 50px;
  border-radius: 20px 20px 0px 0px;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  font-weight: 700;
  background-color: #373a53;
  color: #979abe;
  cursor: pointer;

  &.active {
    background-color: #4982ff;
    color: #fff;
  }
`;
const tabs = props.tabs || [];

return (
  <Tabs>
    {tabs.map((tab) => (
      <Tab
        key={tab}
        className={tab === props.activeTab && "active"}
        onClick={() => {
          props.onChangeTab(tab);
        }}
      >
        {tab}
      </Tab>
    ))}
  </Tabs>
);
