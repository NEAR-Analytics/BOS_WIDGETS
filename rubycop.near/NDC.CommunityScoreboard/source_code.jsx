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

if (state.data.length === 0)
  return (
    <>
      <Loader /> Fetching data ...
    </>
  );

const communityItem = state.data.find(
  (i) => i.community_name === state.community_name
);

const communityData = state.data.filter(
  (i) => i.community_name === state.community_name
);

return (
  <div className="d-flex justify-content-center w-100">
    <div className="w-50">
      <Widget
        src={"nomination.ndctools.near/widget/NDC.StyledComponents"}
        props={{
          Dropdown: {
            label: "Select community",
            value: state.community,
            handleChange: (item) => State.update({ community: item }),
            options: state.data.map((item) => {
              return {
                title: item.community_name,
                value: item.community_name,
              };
            }),
          },
        }}
      />
      <h1>NDC Community users</h1>
      <div className="d-flex justify-content-between align-items-center">
        <H3>
          <b>{state.community}</b>
        </H3>
        <Tag>{communityItem.vertical}</Tag>
      </div>
      <small>Total users: {communityData.length}</small>
      <hr className="my-2" />
      {communityData.length > 0 ? (
        communityData
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
          ))
      ) : (
        <div>
          <Loader /> Fetching users
        </div>
      )}
    </div>
  </div>
);
