const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background: #2e2c44;
  border-radius: 10px;

  padding: 4px;
`;

const TabItem = styled.div`
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 50%;
  border-radius: 10px;

  font-size: 18px;
  font-weight: bold;
  cursor: pointer;

  transition: all 0.3s ease-in-o;
`;

const tabName = props.tabName || "whitelist";
return (
  <TabContainer>
    <TabItem
      style={{
        background: tabName === "whitelist" ? "#5137ee" : "transparent",
      }}
      onClick={() => props.updateTabName("whitelist")}
    >
      Whitelist
    </TabItem>
    <TabItem
      style={{
        background: tabName === "blacklist" ? "#5137ee" : "transparent",
      }}
      onClick={() => props.updateTabName("blacklist")}
    >
      Blacklist
    </TabItem>
  </TabContainer>
);
