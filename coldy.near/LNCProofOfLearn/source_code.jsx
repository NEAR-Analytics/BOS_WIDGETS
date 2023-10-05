const response = await fetch(
  `https://learnnear.club/wp-json/api/lnw-proof-of-learns-data?wallet=coldy.near`,
  {
    method: "GET",
  }
);
const data = await response.json();

return (
  <>
    <div class="container border border-info p-3">
      <h3 class="text-center">
        <span class="text-decoration-underline"> {context.accountId} </span>
      </h3>
    </div>
  </>
);
