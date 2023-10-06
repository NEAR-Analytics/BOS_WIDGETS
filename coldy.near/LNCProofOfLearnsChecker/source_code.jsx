const url = `https://learnnear.club/wp-json/api/lnw-proof-of-learns-value?wallet=${props.wallet}`;
console.log(url);

const response = fetch(url, {
  method: "GET",
});
console.log(response);

return (
  <div>
    <a href="https://learnnear.club/">
      {props.wallet} nLEARNs balance: {response.body.toLocaleString()}{" "}
    </a>
  </div>
);
