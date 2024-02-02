const accountId = props.accountId;
if (!accountId) {
  return "";
}

const isBuilder =
  props.isBuilder || Social.get(`gov.near/badge/builder/accounts/${accountId}`);

const content = isBuilder ? (
  <span style={{ verticalAlign: center }}>
    <a
      title="Magnesus, CC0, via Wikimedia Commons"
      href="https://commons.wikimedia.org/wiki/File:Yellow_hard_hat.svg"
    >
      <img
        style={{ height: "1rem", paddingLeft: "0.2rem" }}
        alt="Yellow Builder Hat"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Yellow_hard_hat.svg/128px-Yellow_hard_hat.svg.png"
      />
    </a>
  </span>
) : (
  ""
);

return (
  <Widget
    loading={content}
    src="mob.near/widget/N.Common.OverlayTrigger"
    props={{
      popup: <div>Builder Hat</div>,
      children: content,
    }}
  />
);
