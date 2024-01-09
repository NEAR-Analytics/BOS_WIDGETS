const { tab, ...passProps } = props;

const tabKeys = {
  TRUSTEES: "trustees",
  MODERATORS: "moderators",
};

const [isTrustee, setIsTrustee] = useState(tab ? true : false);
const [selectedTab, setSelectedTab] = useState(tabKeys.TRUSTEES);

const Container = styled.div`
  width: 100%;
  padding-block: 1rem;
  padding-inline: 3rem;

  .bold {
    font-weight: 600;
  }
`;

const Tabs = styled.div`
  .bg-grey {
    background-color: #ececec;
  }
  .cursor {
    cursor: pointer;
  }
`;

return (
  <Container className="pl-5">
    <div className="h2 bold">DevDAO Dashboard</div>
    <div className="mt-3">
      {!isTrustee ? (
        <Widget
          src={"devhub.near/widget/devhub.entity.trustee.login"}
          props={{ ...passProps, setIsTrustee }}
        />
      ) : (
        <div>
          <Tabs>
            <div className="d-flex w-100 cursor">
              <div
                className={selectedTab === tabKeys.TRUSTEES ? "" : "bg-grey"}
                onClick={() => setSelectedTab(tabKeys.TRUSTEES)}
              >
                Trustees
              </div>
              <div
                className={selectedTab === tabKeys.MODERATORS ? "" : "bg-grey"}
                onClick={() => setSelectedTab(tabKeys.MODERATORS)}
              >
                Moderators
              </div>
            </div>
            {selectedTab === tabKeys.TRUSTEES ? (
              <Widget
                src={"devhub.near/widget/devhub.entity.trustee.dashboard"}
                props={{ ...passProps, setIsTrustee, tab }}
              />
            ) : (
              <Widget
                src={"devhub.near/widget/devhub.entity.trustee.dashboard"}
                props={{ ...passProps, setIsTrustee, tab }}
              />
            )}
          </Tabs>
        </div>
      )}
    </div>
  </Container>
);
