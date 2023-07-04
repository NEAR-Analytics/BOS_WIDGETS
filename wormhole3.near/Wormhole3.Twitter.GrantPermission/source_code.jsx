const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "Please login first";
}

const { config, data, permissionReady, onClick } = props;
const {
  twitterId,
  twitterAvatar,
  twitterName,
  twitterUsername,
  connected,
  permissionGranted,
  hasProposal,
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

// button messages
const messages = [];
if (!hasProposal && !connected) {
  messages.push("Bind Accounts");
}
if (!permissionGranted) {
  messages.push("Grant Permission");
}

// helper functions
function parseAmount(amount, decimals) {
  return Big(amount).mul(Big(10).pow(decimals));
}

function parseNEAR(amount) {
  return parseAmount(amount, 24);
}

// handle actions
function handleActions() {
  // call actions
  const actions = [];
  if (!hasProposal && !connected) {
    // propose binding proposal
    actions.push({
      contractName: config.bindingContractId,
      methodName: "propose_binding",
      args: {
        platform: "twitter",
        handle: twitterId,
      },
      deposit: parseNEAR("0.01").toFixed(),
    });
  }
  if (!permissionGranted) {
    // grant post permission
    actions.push({
      contractName: config.nearSocialContractId,
      methodName: "grant_write_permission",
      args: {
        predecessor_id: config.senderId,
        keys: [
          `${accountId}/post`,
          `${accountId}/index/post`,
          `${accountId}/index/comment`,
        ],
      },
      // 0.0178 NEAR is required for grant permission
      // deposit a bit more for new users who don't have much storage space in NEAR social
      // TODO: check account storage amount
      deposit: parseNEAR("0.09").toFixed(),
    });
  }
  Near.call(actions);

  // onClick callback
  if (onClick) {
    onClick();
  }
}

return (
  <div>
    <Description>
      {!hasProposal && !connected ? (
        <p>
          🔗 Next, bind your NEAR account <Highlight>{accountId}</Highlight>{" "}
          with your twitter account:
        </p>
      ) : (
        <p>
          🔗 Great! You have {connected ? "bound" : "proposed binding"} your
          NEAR account <Highlight>{accountId}</Highlight>
          with twitter account:
        </p>
      )}
      <Widget
        src={`${config.ownerId}/widget/Wormhole3.Twitter.Profile`}
        props={{
          avatarUrl: twitterAvatar,
          name: twitterName,
          username: twitterUsername,
        }}
      />
      {!permissionGranted && (
        <>
          <br />
          <p class="mb-0">
            🔑 {hasProposal || connected ? "Next," : "And"} grant post
            permission to Wormhole3 post sender
          </p>
          <p>
            <Highlight>{config.senderId}</Highlight>, which will sync your
            tweets to NEAR BOS!
          </p>
        </>
      )}
    </Description>
    <Widget
      src={`${config.ownerId}/widget/Wormhole3.Element.Button`}
      props={{
        onClick: handleActions,
        children: messages.join(" & "),
        disabled: !permissionReady,
        padding: "large",
      }}
    />
  </div>
);
