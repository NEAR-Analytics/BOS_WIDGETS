const { accountId, value, blockHeight } = props;

const contractId = "app.chess-game.near";
const chessProfile = Social.getr(`chess-game.near/profile`);

const children = (
  <a
    href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
    className="link-dark text-truncate d-inline-flex"
  >
    <Widget
      key="image"
      src="mob.near/widget/ProfileImage"
      props={{
        style: { width: "1.5em", height: "1.5em", marginRight: "0.1em" },
        profile: chessProfile,
        accountId: "chess-game.near",
        className: "d-inline-block",
        imageClassName: "rounded w-100 h-100 align-top",
      }}
    />
    <span key="accountId" className="text-muted ms-1">
      chess game
    </span>
  </a>
);
const chessGameTrigger = (
  <Widget
    src="mob.near/widget/Profile.OverlayTrigger"
    props={{ accountId: "chess-game.near", children }}
  />
);

let notifierId = "chess-game.near";
let L;
let R;
let profile;
let game_id;
switch (value.item.type) {
  case "challenged":
    notifierId = value.item.data.challenger_id;
    profile = Social.getr(`${notifierId}/profile`);
    L = (
      <>
        {profile.name} challenged you for a {chessGameTrigger}
      </>
    );
    R = (
      <button
        onClick={() => {
          Near.call(contractId, "accept_challenge", {
            challenge_id: value.item.data.challenge_id,
          });
        }}
      >
        Accept
      </button>
    );
    break;
  case "rejected-challenge":
    notifierId = value.item.data.challenged_id;
    profile = Social.getr(`${notifierId}/profile`);
    L = (
      <>
        {profile.name} accepted your {chessGameTrigger} challenge
      </>
    );
    R = "😢";
    break;
  case "accepted-challenge":
    notifierId = value.item.data.challenged_id;
    profile = Social.getr(`${notifierId}/profile`);
    L = (
      <>
        {profile.name} accepted your {chessGameTrigger} challenge
      </>
    );
    R = (
      <a
        className="btn btn-outline-dark"
        href={`#/chess-game.near/widget/ChessGameLobby?game_id=${encodeURIComponent(
          JSON.stringify(value.item.data.game_id)
        )}`}
      >
        View game
      </a>
    );
    break;
  case "your-turn":
    game_id = value.item.data.game_id;
    notifierId = game_id[1] === context.accountId ? game_id[2] : game_id[1];
    profile = Social.getr(`${notifierId}/profile`);
    L = (
      <>
        It is your {chessGameTrigger} turn against {profile.name}
      </>
    );
    R = (
      <a
        className="btn btn-outline-dark"
        href={`#/chess-game.near/widget/ChessGameLobby?game_id=${encodeURIComponent(
          JSON.stringify(value.item.data.game_id)
        )}`}
      >
        View game
      </a>
    );
    break;
  case "outcome":
    game_id = value.item.data.game_id;
    notifierId = game_id[1] === context.accountId ? game_id[2] : game_id[1];
    profile = Social.getr(`${notifierId}/profile`);
    const { outcome } = value.item.data;
    let winner = null;
    if (outcome.Victory === "White") {
      winner = game_id[1];
    } else if (outcome.Victory === "Black") {
      winner = game_id[2];
    }
    if (winner != null) {
      L = (
        <>
          You {context.accountId === winner ? "won" : "lost"} your{" "}
          {chessGameTrigger} against {profile.name}
        </>
      );
    } else {
      L = (
        <>
          There was a draw in your {chessGameTrigger} against {profile.name}
        </>
      );
    }
    R = (
      <a
        className="btn btn-outline-dark"
        href={`#/chess-game.near/widget/ChessGameLobby?replay_game_id=${encodeURIComponent(
          JSON.stringify(value.item.data.game_id)
        )}`}
      >
        Show replay
      </a>
    );
    break;
}

return (
  <div className="d-flex justify-content-between">
    <div className="me-2 text-truncate">
      <div className="text-truncate">
        <Widget
          src="mob.near/widget/ProfileLine"
          props={{ accountId: notifierId, tooltip: true }}
        />
      </div>
      <div
        className="text-truncate text-muted"
        style={{ paddingLeft: "1.8em" }}
      >
        {L}
        <Widget src="mob.near/widget/TimeAgo" props={{ blockHeight }} />
      </div>
    </div>
    <div className="text-nowrap">{R}</div>
  </div>
);
