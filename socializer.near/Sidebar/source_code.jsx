const accountId = context.accountId;
const Owner = "socializer.near";

const changeTab = props?.changeTab || (() => {});
const page = props?.page || "";
const list = props?.list || [];

State.init({
  sidebar: false,
});

const Sidebar = styled.div`
    min-width: 260px;
    height: 100%;
    display: flex;
    padding: 20px 0;
    background: white;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    .content {
        display: flex;
    }
    @media (max-width: 620px) {
        width : ${state.sidebar ? "235px" : "28px"};
        min-width: ${state.sidebar ? "235px" : "28px"};
        z-index: 2;
        position: absolute;
        height:  ${state.sidebar ? "100%" : "10px"};
        align-items: flex-end;
        .content {
            display: ${state.sidebar ? "flex" : "none"};
        }
        
        .btn-leftbar{
            display: ${state.sidebar ? "none" : "flex"};
        }

        .btn-close{
            display:  flex;
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
  top: 4px;
  border: 0;
  width: 67px;
  color: white;
  display: none;
  cursor: pointer;
  position: absolute;
  border-radius: 50px;
  align-items: center;
  background-color: black;
  justify-content: flex-end;
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
    <div className="flex-column align-items-center content w-100 h-100 ">
      <Button
        className="top-0 end-0 p-0 btn-close"
        style={{ width: "auto", fontSize: 25 }}
        onClick={openSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 48 48"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="4"
          >
            <path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z" />
            <path
              strokeLinecap="round"
              d="M29.657 18.343L18.343 29.657m0-11.314l11.314 11.314"
            />
          </g>
        </svg>
      </Button>
      <List>
        {list.map((item) => (
          <ListItem
            key={item.label}
            data-state={item.value === page ? "active" : ""}
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
