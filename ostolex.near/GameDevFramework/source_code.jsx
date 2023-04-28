return (
  <>
    <h1>GameDev widgets</h1>
    <br />
    <h3>Dice widget</h3>
    <p>Really usefull widget if you have a game with dice.</p>
    <Widget
      src="near/widget/Onboarding.ComponentCard"
      props={{ name: "DiceWidget", accountId: "ostolex.near" }}
    />
    <p class="mt-2">
      {"Here's a full example showing all possibilities of DiceWidget:"}
    </p>
    <Widget
      src="near/widget/Onboarding.ComponentCard"
      props={{ name: "DiceWidgetDemo", accountId: "ostolex.near" }}
    />
    <br />
    <h3>Users matcher</h3>
    <p>If you have an online game, this widget might be usefull for you.</p>
    <Widget
      src="near/widget/Onboarding.ComponentCard"
      props={{ name: "UsersMatcher", accountId: "let45fc.near" }}
    />
    <br />
    <h3>Leaderboard</h3>
    <p>
      Userfull widget if you have a rating in your game and want to display it
      in a few lines.
    </p>
    <Widget
      src="near/widget/Onboarding.ComponentCard"
      props={{ name: "LeaderBoardWidget", accountId: "ostolex.near" }}
    />
    <p class="mt-2">Demo of leaderboard widget:</p>
    <Widget
      src="near/widget/Onboarding.ComponentCard"
      props={{ name: "LeaderBoardDemo", accountId: "ostolex.near" }}
    />
  </>
);
