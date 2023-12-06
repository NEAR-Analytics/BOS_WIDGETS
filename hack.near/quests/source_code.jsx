const daoId = "hack.near";

const registryContract = "registry.i-am-human.near";
const issuer = "fractal.i-am-human.near";

const widgets = {
  header: "hack.near/widget/quests.header",
  card: "hack.near/widget/thing.row",
  about: "hack.near/widget/quests.about",
  styledComponents: "hack.near/widget/n.style",
  participate: "hack.near/widget/quests.join",
  compose: "hack.near/widget/quest.create",
  deleteQuest: "hack.near/widget/quest.delete",
};

const quests = Near.view("questsmock.near", "get_all_quests");

if (!quests) {
  return "";
}

// SBT verification
let isVerified = false;
const userSBTs = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
  account: props.accountId ?? context.accountId,
});

for (let i = 0; i < userSBTs.length; i++) {
  if ("fractal.i-am-human.near" == userSBTs[i][0]) {
    isVerified = true;
  }
}

const Header = styled.div`
  background: black;
`;

const Container = styled.div`
  padding: 30px 0;
  margin: 0;
`;

const ActivityContainer = styled.div`
  overflow-y: scroll;
`;

const Left = styled.div`
  padding: 20px;
  background: #f8f8f9;
  border-radius: 8px;
`;

const Center = styled.div``;

const H5 = styled.h5`
  margin-bottom: 20px;
`;

const ButtonNominateContainer = styled.div`
  padding: 16px;
  border-radius: 8px;
  background: #f8f8f9;
`;

const Toolbar = styled.div`
  margin-left: 20px;
  @media only screen and (max-width: 1061px) {
    margin: 10px 0 0 0;
  }
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  padding: 16px;
`;

const Bell = styled.div`
  .bell {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .bell-icon {
    font-size: 23px;
    color: #000;
    margin-left: 5px;
    text-decoration: none;
    transition: color 0.3s ease-in-out;
  }

  .bell-icon:hover {
    color: #000;
  }

  .bell-icon .bi-bell {
    display: inline;
  }

  .bell-icon .bi-bell-fill {
    display: none;
  }

  .bell-icon:hover .bi-bell {
    display: none;
  }

  .bell-icon:hover .bi-bell-fill {
    display: inline;
  }
`;

const CardLeft = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
  width: 100%;
  min-width: 0;
  padding-left: 12px;

  > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
  }
`;

const TextLink = styled.a`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 18px;
  color: ${(p) => (p.bold ? "#11181C !important" : "#687076 !important")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
  outline: none;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

const TagsWrapper = styled.div`
  padding-top: 4px;
`;

const Tag = styled.a`
  color: black;
  text-decoration: none;

  &:hover {
    color: blue;
    text-decoration: none;
  }
`;

return (
  <>
    <div>
      <Header className="d-flex p-3 px-4 align-items-center rounded justify-content-between">
        <h3 className="mt-2" style={{ fontFamily: "Courier", color: "white" }}>
          <b>QuestVerse</b>
        </h3>

        {!isVerified ? (
          <Widget
            src={widgets.styledComponents}
            props={{
              Link: {
                text: "Get Verified",
                href: "https://i-am-human.app/",
              },
            }}
          />
        ) : (
          <Toolbar>
            <Widget src="hack.near/widget/start" />
          </Toolbar>
        )}
      </Header>
      <Container className="d-flex row justify-content-between w-100">
        <h2 className="mb-3" style={{ fontFamily: "Courier" }}>
          <b>Discover</b>
        </h2>
        {quests.map((quest, i) => (
          <Card>
            <CardLeft>
              <div className="d-flex flex-column">
                <div className="d-flex flex-row">
                  <div className="me-3">
                    <a href={`/hack.near/widget/thing.page?thingId=${thingId}`}>
                      <Widget
                        src="mob.near/widget/ProfileImage"
                        props={{
                          accountId: `create.near`,
                          imageStyle: {
                            objectFit: "cover",
                            borderRadius: "0.6em",
                          },
                          imageClassName: "w-100 h-100",
                        }}
                      />
                    </a>
                  </div>
                  <div className="text-truncate">
                    <div className="text-truncate mb-1">
                      <a
                        href={`/hack.near/widget/thing.page?thingId=${thingId}`}
                        style={{ textDecoration: "none" }}
                      >
                        <span className="fw-bold" style={{ color: "black" }}>
                          {quest[1].title}
                        </span>
                      </a>
                    </div>
                    <div className="text-truncate text-muted">
                      {quest[1].tags.length > 0 && (
                        <>
                          {quest[1].tags.map((tag, i) => (
                            <span
                              key={i}
                              className="me-1 fw-light badge border border-secondary text-bg-light"
                            >
                              <a
                                href={`/hack.near/widget/quests?tag=${tag}`}
                                style={{ textDecoration: "none" }}
                                className="no-text-decoration"
                              >
                                <Tag>#{tag}</Tag>
                              </a>
                            </span>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <p className="mt-3 m-1">{quest[1].description}</p>
              </div>
            </CardLeft>
            {!isVerified && context.accountId && (
              <div className="d-flex flex-column m-3">
                <p>
                  <b>{JSON.stringify(quest[1].reward_amount)} NEAR</b>
                </p>

                <Widget
                  src="hack.near/widget/quest.claim"
                  props={{ questId: quest[0] }}
                />
                <p className="text-center mt-1">
                  <i>
                    {JSON.stringify(quest[1].total_participants_allowed)} left
                  </i>
                </p>
              </div>
            )}
          </Card>
        ))}
      </Container>
    </div>

    <>
      {state.showModal && (
        <Widget
          src={widgets.compose}
          props={{
            handleClose: () => State.update({ showModal: false }),
          }}
        />
      )}
      {state.showModalDelete && (
        <Widget
          src={widgets.deleteQuest}
          props={{
            quest: state.quest,
            handleClose: () => State.update({ showModalDelete: false }),
          }}
        />
      )}
    </>
  </>
);
