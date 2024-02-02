const filterData = Social.keys("*/widget/*/metadata/tags/build", "final");

if (!filterData) {
  return "";
}

const limit = props.limit || 21;

let accounts = Object.entries(filterData);
const numAccounts = accounts.length;
accounts = accounts.slice(numAccounts - limit, numAccounts);

const allWidgets = [];

for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i][0];

  allWidgets.push(
    <a
      href={`/james.near/widget/profile.page?accountId=${accountId}`}
      className="text-decoration-none"
      key={i}
    >
      <Widget
        loading={
          <div
            className="placeholder d-inline-block rounded-circle"
            style={{ width: "3em", height: "3em" }}
          />
        }
        src="james.near/widget/profile.image"
        props={{
          accountId,
          tooltip: true,
          className: "d-inline-block overflow-hidden",
          imageClassName: "rounded-circle w-100 h-100",
        }}
      />
    </a>
  );
}

return (
  <div>
    <div class="d-flex flex-wrap gap-1">{allWidgets}</div>
  </div>
);
