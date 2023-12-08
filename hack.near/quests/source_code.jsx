const quests = Near.view("test1.questverse.near", "get_all_quests");

if (!quests) {
  return "";
}

const Header = styled.div`
  background: black;
`;

const Container = styled.div`
  padding: 30px 0;
  margin: 0;
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
      <p>{JSON.stringify(quests)}</p>
      <Header className="d-flex p-3 px-4 align-items-center rounded justify-content-between">
        <h3 className="mt-2" style={{ fontFamily: "Courier", color: "white" }}>
          <b>QuestVerse</b>
        </h3>

        {!isVerified ? (
          <Widget
            src="hack.near/widget/n.style"
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
        {quests.map((quest) => (
          <div className="m-2">
            <Widget
              src="hack.near/widget/quest.card"
              props={{ questId: quest[0] }}
            />
          </div>
        ))}
      </Container>
    </div>
  </>
);
