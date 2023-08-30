State.init({
  data: [],
});

asyncFetch(
  `https://scoreboard-ophc7vkxsq-uc.a.run.app/scoreboard?communityName=${community}&communityVertical=${vertical}`,
  {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }
).then((res) => {
  if (res.body) State.update({ data: res.body.data });
});

const Loader = () => (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);

if (state.data.length === 0)
  return (
    <>
      <Loader /> Fetching data ...
    </>
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

return (
  <div className="d-flex justify-content-center w-100">
    <div className="w-50">
      <div className="d-flex justify-content-between align-items-center">
        <h2>
          <b>{props.community}</b>
        </h2>
        <Tag>{props.vertical}</Tag>
      </div>
      <small>Total users: {state.data.length}</small>
      <hr className="my-2" />
      {state.data.length > 0 ? (
        state.data
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
