const { author, lastEditor, timeLastEdit, version } = props;
const getDate = (timestamp) => {
  const date = new Date(Number(timestamp));
  return date.toDateString();
};

return (
  <div className="alert alert-secondary bg-white">
    <div>
      Created by{" "}
      <a
        href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${author}`}
        target="_blank"
        style={{
          textDecoration: "underline",
          textOverflow: "ellipsis",
          overflow: "hidden",
          maxWidth: "100%",
          display: "block",
        }}
      >
        {author}
      </a>
      <br />
      Last edit by{" "}
      <a
        href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${lastEditor}`}
        style={{
          textDecoration: "underline",
          textOverflow: "ellipsis",
          overflow: "hidden",
          maxWidth: "100%",
          display: "block",
        }}
      >
        {lastEditor}
      </a>
      <br />
      Edited on {getDate(timeLastEdit)}
      <br />
      Edit versions: {version}
    </div>
  </div>
);
