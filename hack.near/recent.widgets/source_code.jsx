const data = Social.keys("*/widget/*", "final");

if (!data) {
  return "Loading";
}

const accounts = Object.entries(data);
const allWidgets = [];

for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i][0];
  const names = Object.keys(accounts[i][1].widget);
  const widgets = [];

  for (let j = 0; j < names.length; ++j) {
    const array = [accountId]["widget"][names[j]];
    const lastItem = array[array.length - 1];

    console.log(lastItem);

    if (lastItem > 95428279) {
      widgets.push(
        <div>
          <li>
            <a href={`/${accountId}/widget/${names[j]}`}>
              {names[j] || <i>Noname widget</i>}
            </a>
          </li>
        </div>
      );
    }
  }

  allWidgets.push(
    <div className="col">
      <div className="card h-100">
        <div className="card-body">{widgets}</div>
      </div>
    </div>
  );
}

return (
  <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xll-4 g-2">
    {allWidgets}
  </div>
);
