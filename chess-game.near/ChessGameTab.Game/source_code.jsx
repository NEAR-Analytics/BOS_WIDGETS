const { game_id } = props;

const gameWidget = "chess-game.near/widget/ChessGame";
const buttonWidget = "chess-game.near/widget/ChessGameButton";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.4rem 0;
`;

return (
  <Content>
    <Widget
      src={buttonWidget}
      props={{
        onClick: returnToLobby,
        alignSelf: "center",
        content: "Return To Lobby",
      }}
    />
    <Widget
      src={buttonWidget}
      props={{
        onClick: resign,
        alignSelf: "center",
        content: "Resign",
      }}
    />
    <Widget src={gameWidget} props={{ game_id }} />
  </Content>
);
