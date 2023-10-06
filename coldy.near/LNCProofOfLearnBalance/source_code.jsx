const response = fetch(
  `https://learnnear.club/wp-json/api/lnw-proof-of-learns-value?wallet=${context.accountId}&p=1`,
  {
    method: "GET",
  }
);
console.log(response);

return (
  <div>
    {" "}
    <a href="https://learnnear.club/">
      {" "}
      nLEARNs balance: {response.body.toLocaleString()}{" "}
    </a>
  </div>
);
