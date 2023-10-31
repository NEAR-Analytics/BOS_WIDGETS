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
      href={`/mob.near/widget/ProfilePage?accountId=${accountId}`}
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
        src="jgodwill.near/widget/ProfileLine"
        // src="agwaze.near/widget/CPlanet.DAO.Members.SideCard"
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
    <div class="d-flex flex-wrap gap-3 placeholder-glow flex-column">
      {allWidgets}
    </div>
    <div>Total {numAccounts} profiles</div>
  </div>
);
