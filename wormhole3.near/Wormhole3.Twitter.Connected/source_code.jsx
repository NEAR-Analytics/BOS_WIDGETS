const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "Please login first";
}

const { config, onClick, data } = props;
const { twitterAvatar, twitterName, twitterUsername } = data;

const TWEET_BOS_INTENT = `https://twitter.com/intent/tweet?text=Post%20to%20%23BOS%20with%20Twitter%20%F0%9F%98%80`;

const Highlight = styled.span`
  font-weight: bolder;
`;

const TwitterText = styled.span`
  font-weight: bolder;
  color: rgb(29, 155, 240);
`;

const Description = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 32px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Img = styled.img`
  width: 100%;

  @media (min-width: 640px) {
    height: 240px;
  }
`;

const Screenshot = ({ props }) => (
  <a href={TWEET_BOS_INTENT} target="_blank">
    <FlexContainer>
      <div class="card">
        <div class="card-body p-1">
          <div class="d-flex text-black">
            <Img src={props.url} alt="screenshot" />
          </div>
        </div>
      </div>
    </FlexContainer>
  </a>
);

return (
  <div>
    <Description>
      <p>
        🏆 You have successfully bound your NEAR account{" "}
        <Highlight>{accountId}</Highlight> with your twitter account
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
      <p>
        🚀 Now sync your first tweet to BOS by clicking{" "}
        <b>
          <a href={TWEET_BOS_INTENT} target="_blank">
            <TwitterText>THIS LINK</TwitterText>
          </a>
        </b>
      </p>
      <p>
        <b>Tips:</b> Add{" "}
        <a href="https://twitter.com/hashtag/BOS" target="_blank">
          <TwitterText>#BOS</TwitterText>
        </a>{" "}
        tag if you want your tweets to be synced to BOS
      </p>
      <Screenshot
        props={{
          url: `${config.ipfsPrefix}/bafkreibvima3cysxwjfsqgzmt4npgjbxx4wuw3qmouu5uqiijukj5pgtoe`,
        }}
      />
    </Description>
  </div>
);
