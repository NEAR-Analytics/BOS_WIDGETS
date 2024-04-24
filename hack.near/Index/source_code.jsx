const { Feed } = VM.require("devs.near/widget/Feed") ?? {
  Feed: () => <></>,
};

const obj = Social.get("*/widget/Index", "final");

if (!obj) {
  return "";
}

const accounts = Object.keys(obj).map((key) => ({
  src: `${key}/widget/Index`,
}));

return (
  <>
    <div className="d-flex flex-column gap-1 p-3 m-2">
      <Feed
        items={accounts}
        Item={(a) => (
          <div className="m-2">
            <Widget
              src="hack.near/widget/widget.inline"
              props={{ src: a.src }}
            />
          </div>
        )}
      />
    </div>
  </>
);
