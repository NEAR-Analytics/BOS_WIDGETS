State.init({
  sdk: null,
  quests: [],
});

const Main = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    align-items:flex-start;
    justify-content:space-evenly;
    flex-wrap:wrap;

    & > div {
        margin-top:15px;
        
        &:not(:last-of-type) {
            margin-right:15px;
        }
    }

`;

const loadQuests = () => {
  for (let i = 0; i < 5; i++) {
    state.sdk.getQuest(i).then((rawResponse) => {
      const response = state.sdk.decode("viewQuest", rawResponse);

      if (
        response["creator"] === "0x0000000000000000000000000000000000000000"
      ) {
        return;
      }

      const quest = {
        creator: response["creator"],
        creatorFee: response["creatorFee"]["_hex"],
        location: response["location"],
        numberOfPlayers: response["numberOfPlayers"]["_hex"],
        payoutCompleted: response["payoutCompleted"],
        players: response["players"],
        questName: response["questName"],
        questPrize: response["questPrize"]["_hex"],
        questStatus: response["questStatus"],
        winner: response["winner"],
      };

      State.update({ quests: [...state.quests, quest] });
    });
  }
};

if (state.sdk && state.quests.length == 0) {
  loadQuests();
}

return (
  <Main>
    <div
      style={{
        display: "none",
      }}
    >
      <Widget
        src="mattb.near/widget/Geoquete.Libs.GeoqueteSDK"
        props={{
          onLoad: (sdk) => State.update({ sdk: sdk }),
          loaded: !!state.sdk,
        }}
      />
    </div>

    {state.quests.map((quest) => (
      <Widget
        src="mattb.near/widget/Geoquete.Components.Quest"
        props={{
          quest,
        }}
      />
    ))}
  </Main>
);
