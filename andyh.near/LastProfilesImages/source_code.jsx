const data = Social.keys("*/profile", "final");

const limit = props.limit || 21;

if (!data) {
  return "Loading";
}

let accounts = Object.entries(data);
const numAccounts = accounts.length;
accounts = accounts.slice(numAccounts - limit, numAccounts);

const allWidgets = [];

for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i][0];

  allWidgets.push(
    <a
      href={`#/andyh.near/widget/ProfilePage?accountId=${accountId}`}
      className="text-decoration-none"
      key={i}
    >
      <Widget
        src="andyh.near/widget/ProfileImage"
        props={{
          accountId,
          tooltip: true,
          className: "d-inline-block overflow-hidden",
        }}
      />
    </a>
  );
}

return (
  <div>
    <div class="d-flex flex-wrap gap-1">{allWidgets}</div>
    <div>Total {numAccounts} profiles</div>
  </div>
);
