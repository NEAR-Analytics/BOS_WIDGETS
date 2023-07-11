const { author, timeCreated, lastEditor, timeLastEdit, version } = props;
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
        style={{ textDecoration: "underline" }}
      >
        {author}
      </a>
      <br />
      Posted on {getDate(timeCreated)}
      <br />
      <br />
      Last edit by{" "}
      <a
        href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${lastEditor}`}
        style={{ textDecoration: "underline" }}
      >
        {lastEditor}
      </a>
      <br />
      Edited on {getDate(timeLastEdit)}
      <br />
      <br />
      Edit versions: {version}
    </div>
  </div>
);
