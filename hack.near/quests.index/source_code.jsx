const quests = Near.view("test1.questverse.near", "quests");

if (!quests) {
  return "";
}

const tag = props.tag ?? "build";

const data = Social.keys(`*/graph/context/*/*/*/tags/${tag}`, "final");

if (!data) {
  return "Loading...";
}

function extractThings(data, filter) {
  const uniqueKeys = new Set();
  const things = [];

  Object.keys(data).forEach((curatorId) => {
    const context = data[curatorId]?.graph?.context;

    if (context) {
      const questData = context[curatorId]?.quest;

      if (questData) {
        Object.keys(questData).forEach((questId) => {
          const tags = questData[questId]?.tags;

          if (tags && (filter === "*" || tags[filter])) {
            const key = `${curatorId}-${questId}`;

            if (!uniqueKeys.has(key)) {
              uniqueKeys.add(key);

              // Extract specific questIds
              if (questId === "2") {
                // For questId "2", use it as needed
                things.push(
                  <div key={key}>
                    <Widget
                      src="hack.near/widget/quest.card"
                      props={{ questId }}
                    />
                    <p>Tags: {JSON.stringify(tags)}</p>
                    <p>Quest ID: {questId}</p>
                  </div>
                );
              } else if (questId === "3") {
                // For questId "3", use it as needed
                things.push(
                  <div key={key}>
                    <Widget
                      src="hack.near/widget/quest.card"
                      props={{ questId }}
                    />
                    <p>Tags: {JSON.stringify(tags)}</p>
                    <p>Quest ID: {questId}</p>
                  </div>
                );
              }
            }
          }
        });
      }
    }
  });

  return things;
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
      <p>{JSON.stringify(data)}</p>
      <Container className="d-flex row justify-content-between w-100">
        <h2 style={{ fontFamily: "Courier" }}>
          <b>Discover</b>
        </h2>
        <div>
          <Widget
            src="hack.near/widget/every.tag"
            props={{
              tag,
              namespace: "quest",
              url: "/hack.near/widget/quests",
            }}
          />
        </div>
        {tag === "*" ? (
          <div>
            {quests.map((quest) => (
              <div className="m-2">
                <Widget
                  src="hack.near/widget/quest.card"
                  props={{
                    questId: quest.quest_id,
                    url: "/hack.near/widget/quests",
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="m-2">{extractThings(data, tag)}</div>
        )}
      </Container>
    </div>
  </>
);
