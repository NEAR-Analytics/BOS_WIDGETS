const data = Social.keys("*/widget/*", "final", {
  return_type: "History",
});

if (!data) {
  return "Loading...";
}

const recentWidgets = [];

console.log(widgets);

for (let i = 0; i < widgets.length; ++i) {
  const [accountId, type, name] = widgets[i].split("/");
  const array = data[accountId][type][name];
  const lastItem = array[array.length - 1];
  const widgets = [];

  if (lastItem > 95428279) {
    widgets.push(
      <div>
        <li>
          <a href={`/${widgets[i]}`}>{widgets[i]}</a>
        </li>
      </div>
    );
  }

  recentWidgets.push(
    <div className="col">
      <div className="card h-100">
        <div className="card-body">{widgets}</div>
      </div>
    </div>
  );
}

return (
  <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xll-4 g-2">
    {recentWidgets}
  </div>
);
