const accountId = context.accountId;
const Owner = "socializer.near";

const changeTab = props?.changeTab || (() => {});
const page = props?.page || "";
const list = props?.list || [];

const Sidebar = styled.div`
  display: flex;
  width: 200px;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const List = styled.div`
  display: flex;
  width: 188px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const ListItem = styled.button`
  display: flex;
  padding : 10px 20px;
  cursor: pointer;
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  border-radius: 10px;
  border: 0;
  background-color: white;
  &:hover {
    background-color: #f3f3f3;
  };
  &[data-state="active"] {
    background-color: #f3f3f3;
  }
`;

return (
  <Sidebar>
    <List>
      {list.map((item) => (
        <ListItem
          key={item.label}
          data-state={item.active ? "active" : ""}
          onClick={() => {
            changeTab(item.value);
          }}
        >
          {item.icon}
          {item.label}
        </ListItem>
      ))}
    </List>
    <Widget src={`${Owner}/widget/HelpCenter`} />
  </Sidebar>
);
