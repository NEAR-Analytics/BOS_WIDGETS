const Card = styled.a`
  border: 1px solid #d0d7de;

  gap: 5px;
  padding: 15px 20px 20px 20px;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e9eaec;
    text-decoration: none;
  }
`;
const Text = styled.p`
  margin: 0;
  line-height: 20px;
  color: ${(p) => p.color ?? "#687076"};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => p.size ?? "14px"};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: nowrap;

  i {
    margin-right: 5px;
  }
`;

function WidgetCard(name, accountId) {
  return (
    <Card
      href={`https://near.social/#/${accountId}/widget/${name}`}
      target="_blank"
    >
      <Text as="h3" size="18px" color="#58a6ff" ellipsis bold>
        {name}
      </Text>
      <Text>{`${accountId}/widget/${name}`}</Text>
    </Card>
  );
}

return (
  <>
    <h1>GameDev widgets</h1>
    <br />

    <h3>Dice widget</h3>
    <p>Really usefull widget if you have a game with dice.</p>
    {WidgetCard("DiceWidget", "ostolex.near")}
    <p class="mt-2">
      {"Here's a full example showing all possibilities of DiceWidget:"}
    </p>
    {WidgetCard("DiceWidgetDemo", "ostolex.near")}

    <br />
    <h3>Users matcher</h3>
    <p>If you have an online game, this widget might be usefull for you.</p>
    {WidgetCard("UsersMatcher", "let45fc.near")}

    <br />
    <h3>Leaderboard</h3>
    <p>
      Userfull widget if you have a rating in your game and want to display it
      in a few lines.
    </p>
    {WidgetCard("LeaderBoardWidget", "ostolex.near")}
    <p class="mt-2">Demo of leaderboard widget:</p>
    {WidgetCard("LeaderBoardDemo", "ostolex.near")}

    <br />
    <h3>Fullscreen</h3>
    <p>Want to make your app fullscreen? Just use this widget:.</p>
    {WidgetCard("FullScreenWrapper", "ostolex.near")}
    <p class="mt-2">Demo of Fullscreen widget:</p>
    {WidgetCard("FullScreenWrapperDemo", "ostolex.near")}

    <br />
    <h3>Storage Checker</h3>
    <p>Make users to fill the storage till needed amount:.</p>
    {WidgetCard("StorageChecker", "ostolex.near")}
  </>
);
