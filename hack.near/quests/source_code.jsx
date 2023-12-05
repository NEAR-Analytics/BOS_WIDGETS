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

const quests = Social.get(`${daoId}/thing/directory`);

if (!quests) {
  return "";
}

const questArray = JSON.parse(quests);

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
        <Left className="col-lg">
          <Widget src={widgets.about} />
        </Left>
        <Center className="col-lg-9 mt-3 px-2 px-md-3 d-flex flex-column">
          <h3 className="m-2" style={{ fontFamily: "Courier" }}>
            <b>Discover</b>
          </h3>
          {questArray.map((quest, i) => (
            <div className="m-2">
              <Widget
                key={i}
                src={widgets.card}
                props={{
                  thingId,
                }}
              />
            </div>
          ))}
        </Center>
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
