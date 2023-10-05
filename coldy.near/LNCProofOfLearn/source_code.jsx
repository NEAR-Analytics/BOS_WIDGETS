const data = fetch(
  `https://learnnear.club/wp-json/api/lnw-proof-of-learns-data?wallet=${context.accountId}`,
  {
    method: "GET",
  }
);

return (
  <>
    <div class="container border border-info p-3">
      <h3 class="text-center">
        <span class="text-decoration-underline"> {context.accountId} </span>
      </h3>
    </div>
  </>
);
