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
  font-size: 12px;
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
  flex-direction: row;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const Section = styled.div`
  background: #fdfeff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 15px;
  margin-top: 10px;
  max-height: 100vh;
  overflow: auto; 
  font-size: 14px;
`;

const Row = styled.div`
  border-bottom: 1px solid #ececec;
  padding: 5px 7px;
  margin: 3px 0;
  border-radius: 5px;
  font-weight: ${(props) => (props.index < 10 ? "600" : "inherit")};
`;
const Header = styled.div`
  background: black;
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

const Category = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 450px;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

if (state.data.length === 0)
  return (
    <>
      <Loader /> Fetching data ...
    </>
  );

const formData = {};

state.data.map((item) => {
  if (formData[item["community-name"]])
    formData[item["community-name"]].push(item);
  else formData[item["community-name"]] = [item];
});

const communityUsers = formData[state.community];
const getCommunityVerticals = () => {
  const arr = Object.values(formData).map(
    (arr) => arr[0]["community-vertical"]
  );
  return [...new Set(arr)];
};
const getCommunityNames = () =>
  Object.values(formData)
    .sort((a, b) => b.length - a.length)
    .map((u) => u[0]["community-name"]);

const bestOnVertical = () => {
  const users = Object.values(formData).sort((a, b) => b.length - a.length);

  return getCommunityVerticals().map((vertical) =>
    users.find((c) => c[0]["community-vertical"] === vertical)
  );
};

const getLastWeeksDate = () => {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
};

const dateInRange = (date) => {
  const today = new Date().getTime();
  const target = new Date(date).getTime();
  const weekAgo = getLastWeeksDate().getTime();

  return target >= weekAgo && target < today;
};

const userIncome = (item) =>
  item.filter((user) => dateInRange(user.created_at)).length;

return (
  <div className="d-flex flex-column justify-content-center w-100">
    <Header className="d-flex p-3 px-4 align-items-center rounded gap-2">
      <img
        height="30px"
        src="https://pbs.twimg.com/profile_images/1622941553839816707/nmf3MWw1_400x400.jpg"
      />
      <span>Communities</span>
    </Header>
    <Container className="d-flex justify-content-between gap-3 mt-3 w-100">
      <Section className="w-100">
        <h4>Community Users</h4>
        <div className="mt-3 mb-4">
          <Widget
            src={"near/widget/Select"}
            props={{
              label: "Select community",
              value: state.community,
              onChange: (item) => State.update({ community: item.text }),
              options: getCommunityNames().map((community) => {
                return {
                  text: community,
                  value: community,
                };
              }),
            }}
          />
        </div>

        {communityUsers && (
          <>
            <h5>{state.community}</h5>
            <div className="d-flex gap-2">
              <Tag>
                Rank: {getCommunityNames().indexOf(state.community) + 1}
              </Tag>
              <Tag>Users: {communityUsers.length}</Tag>
              <Tag>{communityUsers[0]["community-vertical"]}</Tag>
            </div>

            <div className="d-flex justify-content-between my-2">
              <div>
                <small className="text-secondary">User Profile</small>
              </div>
              <div>
                <small className="text-secondary">Joined at</small>
              </div>
            </div>
            <hr className="my-2" />

            {communityUsers
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((user) => (
                <Row className="d-flex justify-content-between align-items-center">
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
                </Row>
              ))}
          </>
        )}
      </Section>
      <Section className="w-100">
        <h4> Best of Category </h4>
        <div className="d-flex justify-content-between mt-3 mb-2">
          <div className="w-100">
            <small className="text-secondary">Category</small>
          </div>
          <div className="w-100">
            <small className="text-secondary">Community</small>
          </div>
          <div className="w-50">
            <small className="text-secondary">Users</small>
          </div>
          <div className="w-25">
            <small className="text-secondary">#</small>
          </div>
        </div>
        <hr className="my-2" />
        {bestOnVertical().map((item) => (
          <Row className="d-flex justify-content-between">
            <div className="w-100">
              <small>{item[0]["community-vertical"]}</small>
            </div>
            <div className="w-100">
              <small>{item[0]["community-name"]}</small>
            </div>
            <div className="w-50">
              <small>{item.length}</small>
            </div>
            <div className="w-25">
              <small>
                {getCommunityNames().indexOf(item[0]["community-name"]) + 1}
              </small>
            </div>
          </Row>
        ))}
      </Section>
      <Section className="w-100">
        <h4> Best of Users </h4>
        <div className="d-flex justify-content-between mt-3 mb-2">
          <div className="w-25">
            <small className="text-secondary">#</small>
          </div>
          <div className="w-100">
            <small className="text-secondary">Community</small>
          </div>
          <div className="w-100 d-flex justify-content-between">
            <div className="w-50">
              <small className="text-secondary">Users</small>
            </div>
            <div className="w-50">
              <small className="text-secondary">7d</small>
            </div>
          </div>
          <Category>
            <small className="text-secondary">Category</small>
          </Category>
        </div>
        <hr className="my-2" />
        {Object.values(formData)
          .sort((a, b) => b.length - a.length)
          .map((item, index) => (
            <Row className="d-flex justify-content-between" index={index}>
              <div className="w-25">
                <small>{index + 1}</small>
              </div>
              <div className="w-100">
                <small>{item[0]["community-name"]}</small>
              </div>
              <div className="w-100 d-flex justify-content-between">
                <div className="w-50">
                  <small>{item.length}</small>
                </div>
                <div className="w-50">
                  {userIncome(item) > 0 ? (
                    <small className="text-success">+{userIncome(item)}</small>
                  ) : (
                    <small className="text-secondary">{userIncome(item)}</small>
                  )}
                </div>
              </div>
              <Category>
                <small>{item[0]["community-vertical"]}</small>
              </Category>
            </Row>
          ))}
      </Section>
    </Container>
  </div>
);
