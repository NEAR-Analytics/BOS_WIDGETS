const response = fetch(
  `https://learnnear.club/wp-json/api/lnw-proof-of-learns-data?wallet=coldy.near`,
  {
    method: "GET",
  }
);

if (response?.body?.error) {
  return (
    <>
      <div class="container border border-info p-3">
        <h3 class="text-center">
          <span class="text-decoration-underline">
            {" "}
            {response.body.message}{" "}
          </span>
        </h3>
      </div>
    </>
  );
}

const pages = response?.body?.pages;
const data = response?.body?.data;

console.log(data);

return (
  <>
    <div class="container border border-info p-3">
      <h3 class="text-center">
        <span class="text-decoration-underline"> </span>
      </h3>
    </div>
  </>
);
