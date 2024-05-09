const { config, twitterAuthUrl } = props;

const Description = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 32px;
`;

const TwitterText = styled.span`
  font-weight: bolder;
  color: rgb(29, 155, 240);
`;

return (
  <div>
    <Description>
      <p>🌈 Post to BOS from your Twitter account in 3️⃣ steps.</p>
      <ol>
        <li>Verify your Twitter account;</li>
        <li>
          Bind your NEAR account with Twitter account, and grant post
          permission;
        </li>
        <li>
          Send tweets with{" "}
          <a href="https://twitter.com/hashtag/BOS" target="_blank">
            <TwitterText>#BOS</TwitterText>
          </a>{" "}
          tag and get synced to BOS immediately
        </li>
      </ol>
      <p>🐦 Let's start by verifying your Twitter account</p>
    </Description>
    <Widget
      src={`${config.ownerId}/widget/Wormhole3.Element.Button`}
      props={{
        children: (
          <>
            <Widget src={`${config.ownerId}/widget/Wormhole3.Twitter.Icon`} />
            Connect to Twitter
          </>
        ),
        url: twitterAuthUrl,
        padding: "large",
      }}
    />
  </div>
);
