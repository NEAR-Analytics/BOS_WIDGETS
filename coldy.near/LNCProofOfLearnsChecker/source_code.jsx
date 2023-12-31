const url = `https://learnnear.club/wp-json/api/lnw-proof-of-learns-value?wallet=${props.wallet}`;

if (!props.wallet) {
  return <div></div>;
}

const response = fetch(url, {
  method: "GET",
});

return (
  <div>
    <h3>Proof of (L)Earn by Learn NEAR Club </h3>
    <b>
      {" "}
      {props.wallet} nLEARNs {response.body.toLocaleString()}{" "}
    </b>
    <br />
    <a href="https://learnnear.club/"> Verify Proof of (L)Earn</a>
  </div>
);
