const referrer = props.referrer ?? "sking.near";
const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return <center>Please connect your NEAR wallet to continue.</center>;
}

State.init({
  tokens: undefined,
});

Storage.set("IAH.Signup.Referrer", referrer);

// Check if user is already verified on I-AM-HUMAN

const tokens = Near.view(
  "registry.i-am-human.near",
  "sbt_tokens_by_owner",
  {
    account: "achraf.near",
  },
  undefined,
  false
);

console.log(tokens, accountId);

return (
  <div>
    <h1>Verify your identity on I-AM-HUMAN and earn a Free NFT Badge!</h1>
    <p>
      I-AM-HUMAN is a decentralized identity verification service that allows
      you to prove you are human, and not a bot, to any website. You can use
      your I-AM-HUMAN account to log in to any website that supports it, and
    </p>
    <div>
      <a
        href="https://i-am-human.app/"
        target="_blank"
        className="btn btn-primary"
      >
        Sign Up
      </a>
      <button onClick={testView}>test view</button>
    </div>
  </div>
);
