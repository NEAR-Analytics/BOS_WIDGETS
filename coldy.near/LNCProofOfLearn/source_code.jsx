const data = fetch(
  `https://learnnear.club/wp-json/api/lnw-proof-of-learns-data?wallet=${context.accountId}`,
  {
    //subscribe: true,
    method: "GET",
  }
);

console.log(data);
