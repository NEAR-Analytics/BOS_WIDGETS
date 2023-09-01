State.init({
  data: [],
  community: "",
});

asyncFetch(`https://scoreboard-ophc7vkxsq-uc.a.run.app/scoreboard`, {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}).then((res) => {
  if (res.body) State.update({ data: res.body.data });
});

const Loader = () => (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);

const UserName = styled.div`
  color: inherit !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  padding-top: 2px;
  width: 200px;
`;

const Tag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  border: 1px solid #4ba6ee;
  color: #4ba6ee;
  border-radius: 100px;
  font-weight: 500;
  font-size: 11px;
`;

const H3 = styled.h3`
  text-transform: capitalize;
`;

const Container = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

if (state.data.length === 0)
  return (
    <>
      <Loader /> Fetching data ...
    </>
  );

const communityData = state.data.filter(
  (i) => i["community-name"] === state.community
);

const getCommunities = () => {
  const data = state.data.map((item) => item["community-name"]);
  return [...new Set(data)].sort((a, b) => a - b);
};

const groupBy = (data, type) =>
  data.reduce((group, item) => {
    group[type] = group[type] ?? [];
    group[type].push(item[type]);

    return group;
  }, {});

return (
  <div className="d-flex justify-content-center w-100">
    <Container>
      <h1>NDC Community users</h1>
      <div className="mt-3 mb-4">
        <Widget
          src={"near/widget/Select"}
          props={{
            label: "Select community",
            value: state.community,
            onChange: (item) => State.update({ community: item.text }),
            options: getCommunities().map((community) => {
              return {
                text: community,
                value: community,
              };
            }),
          }}
        />
      </div>

      {communityData.length > 0 && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <H3>
              <b>{state.community}</b>
            </H3>
            <Tag>{communityData[0]["community-vertical"]}</Tag>
          </div>
          <small>Rank: -</small>
          <br />
          <small>Total users: {communityData.length}</small>
          <hr className="my-2" />

          {communityData
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((user) => (
              <div className="d-flex justify-content-between align-items-center p-1">
                <Widget
                  src="near/widget/AccountProfileOverlay"
                  props={{
                    accountId: user.account,
                    children: (
                      <div className="d-flex justify-items-center">
                        <Widget
                          src="mob.near/widget/ProfileImage"
                          props={{
                            accountId: user.account,
                            imageClassName: "rounded-circle w-100 h-100",
                            style: {
                              width: "24px",
                              height: "24px",
                              marginRight: 5,
                            },
                          }}
                        />
                        <UserName>{user.account}</UserName>
                      </div>
                    ),
                  }}
                />

                <small className="text-secondary">
                  {new Date(user.created_at).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                  })}
                  &middot;
                  {new Date(user.created_at).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                  })}
                </small>
              </div>
            ))}
        </>
      )}
    </Container>
  </div>
);
