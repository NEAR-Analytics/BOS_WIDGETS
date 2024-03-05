const accountId = context.accountId;
const Owner = "socializer.near";

const changeTab = props?.changeTab || (() => {});
const page = props?.page || "";
const list = props?.list || [];

State.init({
  sidebar: false,
});

const Sidebar = styled.div`
    display: flex;
    width: 325px;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 620px) {
        width : ${state.sidebar ? "325" : "40"}px;
        z-index: 2;
        position: absolute;

        .content {
            display: ${state.sidebar ? "flex" : "none"};
        }
        
        .btn-leftbar{
            display: ${state.sidebar ? "none" : "flex"};
        }
    }
`;

const List = styled.div`
  gap: 24px;
  width: 188px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
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

const Button = styled.button`
  border: 0;
  gap: 12px;
  width: 100%;
  display: none;
  cursor: pointer;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  background-color: black;
  &:hover {
    background-color: #f3f3f3;
  };
  &[data-state="active"] {
    background-color: #f3f3f3;
  }
`;

const openSidebar = () => {
  State.update({
    ...state,
    sidebar: !state.sidebar,
  });
};

return (
  <Sidebar>
    <Button className="btn-leftbar" onClick={openSidebar}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 16 16"
      >
        <path
          fill="currentColor"
          d="m5.157 13.069l4.611-4.685a.546.546 0 0 0 0-.768L5.158 2.93a.552.552 0 0 1 0-.771a.53.53 0 0 1 .759 0l4.61 4.684a1.65 1.65 0 0 1 0 2.312l-4.61 4.684a.53.53 0 0 1-.76 0a.552.552 0 0 1 0-.771"
        />
      </svg>
    </Button>
    <div className="d-flex flex-direction-column content w-100 h-100 ">
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
    </div>
  </Sidebar>
);
