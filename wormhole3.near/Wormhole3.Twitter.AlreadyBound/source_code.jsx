const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "Please login first";
}

const { config, onClick, data } = props;
const {
  boundAccountId,
  twitterAvatar,
  twitterName,
  twitterUsername,
  twitterAuthUrl,
} = data;

const Description = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 32px;
`;

const Highlight = styled.span`
  font-weight: bolder;
`;

return (
  <div>
    <Description>
      <p>
        ⛔ The twitter account has been bound to another account{" "}
        <Highlight>{boundAccountId}</Highlight>:
      </p>
      <Widget
        src={`${config.ownerId}/widget/Wormhole3.Twitter.Profile`}
        props={{
          avatarUrl: twitterAvatar,
          name: twitterName,
          username: twitterUsername,
        }}
      />
      <br />
      <p class="mb-0">Try connecting to another Twitter account to proceed</p>
    </Description>
    <Widget
      src={`${config.ownerId}/widget/Wormhole3.Element.Button`}
      props={{
        children: (
          <>
            <Widget src={`${config.ownerId}/widget/Wormhole3.Twitter.Icon`} />
            Reconnect to Twitter
          </>
        ),
        url: twitterAuthUrl,
        padding: "large",
      }}
    />
  </div>
);
