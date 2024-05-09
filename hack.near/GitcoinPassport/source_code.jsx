const accountId = props.accountId;
if (!accountId) {
  return "";
}

const verified = props.verified ?? true;

const content = verified ? (
  <span style={{ verticalAlign: center }}>
    <img
      style={{ width: "15px" }}
      className="ms-2"
      src="https://imgs.search.brave.com/z-VfPT3iu6hc5oeCl1ZgqmRQjyoklvshvx5M21Xneao/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMtZ2xvYmFsLndl/YnNpdGUtZmlsZXMu/Y29tLzY1YzIxOWUz/NGU5MDQ5ZjQyNmI2/ODUxOC82NWRjOTdl/YmQ0ZWVkNjlkOTUy/Yjg4NDBfUGFzc3Bv/cnRfTG9nb21hcmtf/SXJpc0ljZUJsdWVf/R3JhZGllbnQuc3Zn.svg"
    />
  </span>
) : (
  ""
);

return (
  <Widget
    loading={content}
    src="mob.near/widget/N.Common.OverlayTrigger"
    props={{
      popup: <div>verified</div>,
      children: content,
    }}
  />
);
