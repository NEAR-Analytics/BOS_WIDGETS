const { Feed } = VM.require("devs.near/widget/Feed") ?? {
  Feed: () => <></>,
};

const obj = Social.get("*/widget/Index", "final");

const accounts = Object.keys(obj);

const reconstructAccountName = (accountObj) => {
  let accountName = "";
  for (let i = 0; accountObj.hasOwnProperty(i.toString()); i++) {
    accountName += accountObj[i.toString()];
  }
  return accountName;
};

return (
  <>
    <div className="d-flex flex-column gap-1 p-3 m-2">
      <Feed
        items={accounts}
        Item={(a) => (
          <div className="m-2">
            <Widget
              src="hack.near/widget/widget.inline"
              props={{ src: `${reconstructAccountName(a)}/widget/Index` }}
            />
          </div>
        )}
      />
    </div>
  </>
);
