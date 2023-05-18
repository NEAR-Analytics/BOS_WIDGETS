const a = props.a;

const Container = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Raw = styled.div`
  display: ${({ collapsed }) => (collapsed ? "none" : "block")};
`;

const Button = styled.button`
  text-transform: lowercase !important;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const Key = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const Value = styled.span`
  color: #888;
`;

function composeData() {
  return {
    post: {
      main: JSON.stringify({
        path: `${a.value.accountId}/thing/${a.key}}`,
        blockHeight: a.blockHeight,
        type: a.value.type,
      }),
    },
    index: {
      post: JSON.stringify({
        key: "main",
        value: {
          type: a.value.type, // because we want to filter by type
        },
      }),
    },
  };
}

State.init({ collapsed: true });

const handleToggle = () => {
  State.update({ collapsed: !state.collapsed });
};

let type = {};
// This is just hardcoding Type.get(type)
if (a.value.type === "image") {
  type = {
    widgets: {
      create: "efiz.near/widget/Create.Image",
      view: "mob.near/widget/Image",
    },
  };
} else if (a.value.type === "md") {
  type = {
    widgets: {
      create: "efiz.near/widget/Posts.Compose",
    },
  };
}

const value = Social.get(`${a.accountId}/thing/${a.key}`, a.blockHeight);
value = JSON.parse(value);

return (
  <Container>
    <Header>
      <Button onClick={handleToggle}>show raw</Button>
    </Header>
    <Raw collapsed={state.collapsed}>
      <div>
        <Key>accountId:</Key>
        <Value>{a.accountId}</Value>
      </div>
      <div>
        <Key>blockHeight:</Key>
        <Value>{a.blockHeight}</Value>
      </div>
      <div>
        <Key>value.type:</Key>
        <Value>{a.value.type}</Value>
      </div>
      <div>
        <Key>action:</Key>
        <Value>{a.action}</Value>
      </div>
      <div>
        <Key>key:</Key>
        <Value>{a.key}</Value>
      </div>
      <div>
        <Key>index:</Key>
        <Value>{a.index}</Value>
      </div>
    </Raw>
    {type?.widgets?.view && (
      <Widget
        src={type.widgets.view}
        props={{ image: { ipfs_cid: value.data } }}
      />
    )}
    {/** this should check if it has been posted before */}
    <CommitButton force data={composeData} className="styless">
      post
    </CommitButton>
  </Container>
);
