const { accountId } = context;

const src = "chess-game.near/widget/ChessGameLobby";
const contractId = "app.chess-game.near";
const buttonWidget = "chess-game.near/widget/ChessGameButton";
const loadingWidget = "chess-game.near/widget/ChessGameLoading";

const currentLink = "#/chess-game.near/widget/ChessGameLobby";

const LobbyView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 550px;
  margin: 0 auto;
  box-sizing: border-box;

  h1 {
    align-self: center;
  }

  > * {
    margin: 1.2rem 0;
  }
`;
const Disclaimer = styled.div`
  margin-top: 1rem;
  font-style: italic;
  font-size: 1.2rem;
`;
const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.6rem 0.8rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 15px;
  text-align: center;
  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: none;
    outline: none;
  }

  i {
    color: #7E868C;
  }

  .bi-16 {
    font-size: 16px;
  }
  color: ${(p) => (p.primary ? "#09342E" : "#11181C")} !important;
  background: ${(p) => (p.primary ? "#59E692" : "#FBFCFD")};
  border: ${(p) => (p.primary ? "none" : "1px solid #D7DBDF")};

  &:hover,
  &:focus {
    background: ${(p) => (p.primary ? "rgb(112 242 164)" : "#ECEDEE")};
  }
`;

State.init({
  tab: props.tab ?? state.tab ?? "game",
  isRegistered: state.isRegistered,
  apps: [],
});

const updateIsRegistered = () => {
  Near.asyncView(contractId, "storage_balance_of", {
    account_id: accountId,
  }).then((res) => {
    State.update({
      isRegistered: !!res,
    });
  });
};

if (state.isRegistered === null || state.isRegistered === undefined) {
  if (!accountId) {
    State.update({
      isRegistered: false,
    });
  } else {
    updateIsRegistered();
  }
  return <Widget src={loadingWidget} />;
}

let isHuman = false;
if (showHumanBadge) {
  const userSBTs = Near.view("registry.i-am-human.near", "is_human", {
    account: accountId,
  });
  isHuman = userSBTs.length > 0;
}

const registerAccount = () => {
  Near.call(
    contractId,
    "storage_deposit",
    {},
    undefined,
    "50000000000000000000000"
  );
  // TODO wait for tx
  updateIsRegistered();
};

const navigate = (tab) => {
  State.update({
    tab,
  });
};

const pages = [
  {
    title: "Play",
    icon: <i className="bi-joystick"></i>,
    active: state.tab === "game",
    href: currentLink + "?tab=game",
    onClick: () => navigate("game"),
    widgetName: "ChessGameTab.Default",
  },
  {
    title: "Challenge",
    icon: <i className="bi-people-fill"></i>,
    active: state.tab === "challenge",
    href: currentLink + "?tab=challenge",
    onClick: () => navigate("challenge"),
    widgetName: "ChessGameTab.Challenge",
  },
  {
    title: "AI",
    icon: <i className="bi-robot"></i>,
    active: state.tab === "ai",
    href: currentLink + "?tab=ai",
    onClick: () => navigate("ai"),
    widgetName: "ChessGameTab.AI",
  },
  {
    title: "Replay",
    icon: <i className="bi-collection-play"></i>,
    active: state.tab === "replay",
    href: currentLink + "?tab=replay",
    onClick: () => navigate("replay"),
    widgetName: "ChessGameTab.Replay",
  },
  [
    {
      title: "Links",
      icon: <i className="bi-link"></i>,
    },
    {
      title: "BOS Profile",
      icon: <i className="bi-person-fill"></i>,
      href: "#/mob.near/widget/ProfilePage?accountId=chess-game.near",
    },
    {
      title: "Github",
      icon: <i className="bi-github"></i>,
      href: "https://github.com/Protocol-Pawns",
    },
    {
      title: "Twitter",
      icon: <i className="bi-twitter"></i>,
      href: "https://twitter.com/protocolpawns",
    },
    {
      title: "Discord",
      icon: <i className="bi-discord"></i>,
      href: "https://discord.com/invite/wKqEnXjaVH",
    },
  ],
];

let activePage = null;
pages.find((page) => {
  if (page.active) {
    activePage = page;
    return true;
  }
  return false;
});

const pageContent = activePage ? (
  <Widget
    src={"chess-game.near/widget/" + activePage.widgetName}
    props={{ isRegistered: state.isRegistered, game_id: props.game_id }}
  />
) : (
  "404"
);

return (
  <div className="row">
    <Widget
      src="chess-game.near/widget/Common.Layout.Header"
      props={{
        items: pages,
      }}
    />
    <div className="col">
      <LobbyView>
        <Disclaimer>
          Play chess fully on chain powered by Near Protocol and the BOS. If you
          want to learn more please visit the profile page.
        </Disclaimer>
        {!state.isRegistered && accountId && (
          <>
            <Disclaimer>
              You need to pay storage deposit of 0.05N first before being
              allowed to play Protocol Pawns.
              <br />
              If you don't get redirected after registering, please refresh the
              page.
            </Disclaimer>
            <Widget
              src={buttonWidget}
              props={{
                onClick: registerAccount,
                fontSize: "1.2rem",
                content: "Register Account",
              }}
            />
          </>
        )}
        {pageContent}
        <Disclaimer>
          If you won or lost a game it will no longer be displayed. You can
          check the most recent transactions status on{" "}
          <a
            target="_blank"
            href="https://nearblocks.io/address/app.chess-game.near"
          >
            Nearblocks
          </a>
          .
        </Disclaimer>
      </LobbyView>
    </div>
  </div>
);
