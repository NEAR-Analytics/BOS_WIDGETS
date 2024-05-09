const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "Please login first";
}

const { config, onClick, data, permissionReady } = props;
const { twitterId, twitterAvatar, twitterName, twitterUsername } = data;

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
        🧪 Verifying your proposal of binding your NEAR account{" "}
        <Highlight>{accountId}</Highlight>
        with twitter account:
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
      <p>This may take 1~2 minutes.</p>
    </Description>
    <Widget
      src={`${config.ownerId}/widget/Wormhole3.Element.Button`}
      props={{
        loading: true,
        disabled: !permissionReady,
        padding: "large",
      }}
    />
  </div>
);
