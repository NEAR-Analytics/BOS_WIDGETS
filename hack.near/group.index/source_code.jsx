const groupId = props.groupId ?? "526fb256e74eelmf0nw3n5909bc189c13d";

const updates = Social.index("graph", `${groupId}`, {
  limit: 10,
  order: "desc",
  subscribe: true,
});

const index = {
  action: "graph",
  key: groupId,
  options: {
    limit: 10,
    order: "desc",
  },
};

const ItemWrapper = styled.div`
  margin-bottom: 12px;
`;

State.init({
  showDetails: false,
});

const renderItem = (item) => {
  return (
    <ItemWrapper>
      {item.value.type === "add" && (
        <>
          <div className="d-flex justify-content-between row text-truncate text-muted">
            <div className="text-truncate col-auto">
              <div className="row">
                <div className="col-auto m-1">
                  <Widget
                    src="mob.near/widget/Profile"
                    props={{ accountId: item.accountId, tooltip: true }}
                  />{" "}
                </div>
                <div className="col-auto m-1">
                  {item.value.type === "add" && "requested membership"}
                  <Widget
                    src="mob.near/widget/TimeAgo"
                    props={{ blockHeight: item.blockHeight }}
                  />
                </div>
              </div>
            </div>
            <div className="text-truncate col-auto float-right">
              <Widget
                src="hack.near/widget/group.view"
                props={{ groupId, creatorId: item.accountId }}
              />
              <Widget src="hack.near/widget/approve" props={{ groupId }} />{" "}
            </div>
          </div>
          <div>
            {state.showDetails && (
              <Widget
                src={`hack.near/widget/group`}
                props={{
                  groupId,
                  creatorId: item.accountId,
                }}
              />
            )}
          </div>
        </>
      )}
      {item.value.type === "create" && (
        <>
          <div className="d-flex justify-content-between row text-truncate text-muted">
            <div className="text-truncate col-auto">
              <div className="row">
                <div className="col-auto m-1">
                  <Widget
                    src="mob.near/widget/Profile"
                    props={{ accountId: item.accountId, tooltip: true }}
                  />{" "}
                </div>
                <div className="col-auto m-1">
                  {item.value.type === "create" && "created group"}
                  <Widget
                    src="mob.near/widget/TimeAgo"
                    props={{ blockHeight: item.blockHeight }}
                  />
                  ago
                </div>
              </div>
            </div>
            <div className="text-truncate col-auto float-right">
              <Widget
                src="hack.near/widget/group.view"
                props={{ groupId, creatorId: item.accountId }}
              />
            </div>
          </div>
          <div>
            {state.showDetails && (
              <Widget
                src={`hack.near/widget/group`}
                props={{
                  groupId,
                  creatorId: item.accountId,
                }}
              />
            )}
          </div>
        </>
      )}
    </ItemWrapper>
  );
};

return (
  <div className="m-2">
    <Widget
      src="mob.near/widget/FilteredIndexFeed"
      props={{ index, renderItem }}
    />
  </div>
);
