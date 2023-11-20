const data = Social.get("*/graph/star/**", "final");

const starCountsByAccount = {};

// Calculate star counts for each widget within each account
Object.keys(data).forEach((user) => {
  const userData = data[user];
  const widgetData = userData?.graph?.star;

  if (widgetData) {
    Object.keys(widgetData).forEach((widgetUser) => {
      const widgetList = widgetData[widgetUser]?.widget;

      if (widgetList) {
        Object.keys(widgetList).forEach((widgetName) => {
          if (!starCountsByAccount[widgetUser]) {
            starCountsByAccount[widgetUser] = {};
          }

          if (!starCountsByAccount[widgetUser][widgetName]) {
            starCountsByAccount[widgetUser][widgetName] = 0;
          }

          // Check if the widgetName is valid before incrementing stars
          if (
            typeof starCountsByAccount[widgetUser][widgetName] !== "undefined"
          ) {
            starCountsByAccount[widgetUser][widgetName]++;
          }
        });
      }
    });
  }
});

// Calculate total stars received by each account
const totalStarsByAccount = {};
Object.keys(starCountsByAccount).forEach((account) => {
  const widgets = starCountsByAccount[account];
  const totalStars = Object.values(widgets).reduce(
    (acc, stars) => acc + stars,
    0
  );
  totalStarsByAccount[account] = totalStars;
});

// Convert the object to an array and sort it by total stars in descending order
const rankedAccounts = Object.entries(totalStarsByAccount)
  .filter(([account, totalStars]) => typeof totalStars !== "undefined")
  .sort((a, b) => b[1] - a[1]);

return (
  <div>
    <h3>Top Builders</h3>
    <div className="m-2">
      {rankedAccounts.map(([account, totalStars], index) => (
        <div key={account}>
          <h5>
            {index + 1}. {account} ({totalStars} total stars)
          </h5>
          <ul className="m-3">
            {Object.entries(starCountsByAccount[account])
              .sort((a, b) => b[1] - a[1])
              .map(([widgetName, widgetStars]) => (
                <li key={widgetName}>
                  {widgetName} ({widgetStars} stars)
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);
