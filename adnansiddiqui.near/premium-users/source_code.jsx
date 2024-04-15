// get account data for premium users
const data = Social.get(
  "premium.social.near/badge/premium/accounts/*",
  "final"
);

if (!data) return "Loading";

const now = Date.now(); // get time
const premiumUsers = Object.entries(data)
  .filter((item) => item[1] >= now) // filter premnium users
  .sort((a, b) => {
    // short the array based on the descending order
    if (a[1] < b[1]) return 1;
    if (a[1] > b[1]) return -1;
    return 0;
  });

// converts a given timestamp into a readable date string.
const getDate = (timestamp) => {
  const dateObj = new Date(timestamp);

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const year = dateObj.getFullYear();

  const nthNumber = (number) => {
    if (number > 3 && number < 21) return "th";
    switch (number % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${dateObj.getHours()}:${dateObj
    .getMinutes()
    .toString()
    .padStart(2, "0")}, ${month} ${day}${nthNumber(day)}, ${year} `;
};

// render jsx
return (
  <div>
    <h1>
      Premium Users
      <a href="/zavodil.near/widget/subscribe" target="_blank">
        <span className="badge bg-secondary fs-6 align-middle">
          Buy premium
        </span>
      </a>
    </h1>
    <table class="table table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">User</th>
          <th scope="col">Premium until</th>
        </tr>
      </thead>
      <tbody>
        {premiumUsers.map((item, i) => (
          <tr>
            <th scope="row">{i + 1}</th>
            <td>
              <Widget
                src="mob.near/widget/Profile.ShortInlineBlock"
                props={{ accountId: item[0], tooltip: true }}
              />
            </td>
            <td>{getDate(Number(item[1]))}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div class="alert alert-primary" role="alert">
      Use{" "}
      <a href="https://near.social/zavodil.near/widget/premium-users">
        https://near.social
      </a>{" "}
      to enable premium subscriptions
    </div>
  </div>
);
