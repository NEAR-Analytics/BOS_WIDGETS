const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid var(--border-color);
`;
const Tab = styled.div`
  width: 120px;
  font-size: 20px;
  font-weight: 700;
  color: #7c7f96;
  border-bottom: 5px solid transparent;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  &.active {
    color: #fff;
    border-bottom-color: var(--primary-color);
  }
`;

const { currentTab, onChange } = props;

const TABS = ["Market", "Yours"];

return (
  <Tabs>
    {TABS.map((tab) => (
      <Tab
        className={currentTab === tab && "active"}
        key={tab}
        onClick={() => {
          onChange(tab);
        }}
      >
        {tab}
      </Tab>
    ))}
  </Tabs>
);
