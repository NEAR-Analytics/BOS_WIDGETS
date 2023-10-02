// TODO //
// create feed modal (or add existing)
// add search for filtering left side rooms
const feeds = [
  {
    name: "All Posts",
    data: {
      sources: [
        {
          domain: "post",
          key: "main",
        },
      ],
      typeWhitelist: ["md"],
    },
  },
  {
    name: "OpenCann.net",
    data: {
      sources: [
        {
          domain: "post",
          key: "main",
        },
      ],
      typeWhitelist: ["md"],
      hashtagWhitelist: [
        "opencann",
        "cannsta",
        "cannstagram",
        "reeferdao",
        "cannadata",
      ],
    },
  },
  {
    name: "Cannstagram",
    data: {
      sources: [
        {
          domain: "post",
          key: "main",
        },
      ],
      typeWhitelist: ["md"],
      hashtagWhitelist: ["cannsta", "cannstagram"],
    },
  },
  {
    name: "#cannabis",
    data: {
      sources: [
        {
          domain: "post",
          key: "main",
        },
      ],
      typeWhitelist: ["md"],
      hashtagWhitelist: [
        "cannabis",
        "420",
        "marijuana",
        "weed",
        "ganja",
        "bluntDAO",
      ],
    },
  },
  {
    name: "#data",
    data: {
      sources: [
        {
          domain: "post",
          key: "main",
        },
      ],
      typeWhitelist: ["md"],
      hashtagWhitelist: ["data", "data-science", "database", "cannadata"],
    },
  },
  {
    name: "#vibes",
    data: {
      sources: [
        {
          domain: "post",
          key: "main",
        },
      ],
      typeWhitelist: ["md"],
      hashtagWhitelist: ["vibes", "proofofvibes", "chill"],
      composeTemplate: "proofofvibes.near/widget/Vibes.Feed.Post.create",
      postTemplate: "proofofvibes.near/widget/Vibes.Feed.View.main",
    },
  },
  {
    name: "#gm",
    data: {
      sources: [
        {
          domain: "post",
          key: "main",
        },
      ],
      typeWhitelist: ["md"],
      hashtagWhitelist: ["gm", "goodmorning"],
      composeTemplate: "simonemelanie.near/widget/GM",
      postTemplate: "simonemelanie.near/widget/GM",
    },
  },
];

State.init({
  selectedRoom: feeds[0],
});

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const LeftPanel = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f1f1f1;
`;

const ProfileContainer = styled.div`
  /* Add your styles for the profile container here */
`;

const CreateButton = styled.button`
  /* Add your styles for the create button here */
`;

const ChatRoomList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ChatRoomItem = styled.li`
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  background-color: ${(props) =>
    props.isSelected ? "#f5f5f5" : "transparent"};

  &:last-child {
    border-bottom: none;
  }
`;

const RightPanel = styled.div`
  flex: 3;
  background-color: #ffffff;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 40px;
  background-color: #f1f1f1;
`;

const Content = styled.div`
  /* Add your styles for the content here */
`;

const handleRoomSelect = (roomId) => {
  State.update({ selectedRoom: roomId });
};

return (
  <Container>
    <LeftPanel>
      <Header>
        <Widget
          src="nui.sking.near/widget/Layout.Modal"
          props={{
            open: state.modalOpen,
            onOpenChange: (open) => {
              State.update({
                ...state,
                modalOpen: open,
              });
            },
            toggle: (
              <Widget
                src="nui.sking.near/widget/Input.Button"
                props={{
                  children: <i className="bi bi-pencil-square"></i>,
                  variant: "icon rounded",
                  size: "md",
                }}
              />
            ),
            content: (
              <div className="p-4 bg-white rounded">
                <p>create new feed</p>
              </div>
            ),
          }}
        />
      </Header>

      <ChatRoomList>
        {feeds.map((room) => (
          <ChatRoomItem
            key={room}
            onClick={() => handleRoomSelect(room)}
            isSelected={state.selectedRoom === room}
          >
            {room.name}
          </ChatRoomItem>
        ))}
      </ChatRoomList>
    </LeftPanel>
    <RightPanel>
      <Header>
        <h2>{state.selectedRoom.name}</h2>
      </Header>
      <Content>
        {state.selectedRoom ? (
          <div>
            <Widget
              src="efiz.near/widget/every.feed.view"
              props={{ data: state.selectedRoom.data }}
            />
          </div>
        ) : (
          <div></div>
        )}
      </Content>
    </RightPanel>
  </Container>
);
