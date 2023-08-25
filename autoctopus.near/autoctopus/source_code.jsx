const Tab = styled.button`
  padding: 10px 15px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;

  ${(props) =>
    props.active &&
    `
    opacity: 1; 
    border-bottom: 2px solid blue;
  `}
`;

const Panel = styled.div`
  padding: 10px 15px;
`;

const query = window.location.search;
console.log(query);

State.init({
  activeTab: 1,
});

function TabSwitch() {
  const handleTabClick = (index) => {
    State.update({
      activeTab: index,
    });
  };

  return (
    <div>
      <Tab active={state.activeTab === 1} onClick={() => handleTabClick(1)}>
        Tab 1
      </Tab>
      <Tab active={state.activeTab === 2} onClick={() => handleTabClick(2)}>
        Tab 2
      </Tab>
      <Tab active={state.activeTab === 3} onClick={() => handleTabClick(3)}>
        Tab 3
      </Tab>

      <Panel>
        {state.activeTab === 1 && <div>Content for Tab 1</div>}
        {state.activeTab === 2 && <div>Content for Tsdfab 2</div>}
        {state.activeTab === 3 && <div>Content for Tab 3</div>}
      </Panel>
    </div>
  );
}

return (
  <div>
    <TabSwitch />
  </div>
);
