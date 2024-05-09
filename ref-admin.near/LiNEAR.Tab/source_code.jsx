const TabContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #373a53;
  border-radius: 8px;
  padding: 1px 2px;
  border: 1px #373a53 solid;

  @media (max-width: 770px) {
    width: 100%;
  }
`;

const TabItem = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-o;
`;

const tabName = props.tabName || "stake";
return (
  <TabContainer>
    <TabItem
      style={{
        background: tabName === "stake" ? "#00FFA3" : "transparent",
        color: tabName === "stake" ? "#332C4B" : "#FFFFFF",
      }}
      onClick={() => props.updateTabName("stake")}
    >
      Stake
    </TabItem>
    <TabItem
      style={{
        background: tabName === "unstake" ? "#00FFA3" : "transparent",
        color: tabName === "unstake" ? "#332C4B" : "#FFFFFF",
      }}
      onClick={() => props.updateTabName("unstake")}
    >
      Unstake
    </TabItem>
  </TabContainer>
);
