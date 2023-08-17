const profileIcon = "chess-game.near/widget/ProfileIcon";
const githubIcon = "chess-game.near/widget/GithubIcon";
const twitterIcon = "chess-game.near/widget/TwitterIcon";
const discordIcon = "chess-game.near/widget/DiscordIcon";

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  justify-content: center;

  a {
    display: block;
    align-items: center;
    color: inherit;
    text-decoration: inherit;
    font-size: 1.4rem;
    border-radius: 0.4rem;
    border: 1px solid lightblue;
    padding: 0.2rem;

    &:hover {
      border: 1px solid blue;
      color: darkblue;
    }
  }
`;
const Disclaimer = styled.div`
  margin-top: 1rem;
  font-style: italic;
  font-size: 1.2rem;
`;
const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

return (
  <Header>
    <h1>Protocol Pawns</h1>
    <Widget src="hack.near/widget/star.button" props={{ widgetPath }} />
    <Disclaimer>
      Play chess fully on chain powered by Near Protocol and the BOS. If you
      want to learn more please visit the profile page.
    </Disclaimer>
    <Links>
      <a
        href="https://near.social/mob.near/widget/ProfilePage?accountId=chess-game.near"
        target="_blank"
      >
        <Widget src={profileIcon} props={{ height: "2rem" }} />
        <span>Profile</span>
      </a>
      <a href="https://github.com/Protocol-Pawns" target="_blank">
        <Widget src={githubIcon} props={{ height: "2rem" }} />
        <span>Github</span>
      </a>
      <a href="https://twitter.com/protocolpawns" target="_blank">
        <Widget src={twitterIcon} props={{ height: "2rem" }} />
        <span>Twitter</span>
      </a>
      <a href="https://discord.com/invite/wKqEnXjaVH" target="_blank">
        <Widget src={discordIcon} props={{ height: "2rem" }} />
        <span>Discord</span>
      </a>
    </Links>
  </Header>
);
