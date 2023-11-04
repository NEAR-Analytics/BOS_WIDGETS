const curatorId = props.curatorId ?? context.accountId ?? "discover.near";

const projects = Social.get(`${curatorId}/project/**`);

const hacks = Social.get("hack.near/project");

if (projects == null) {
  return "none found";
}

const newData = fetch(
  "https://raw.githubusercontent.com/NEARBuilders/discoverbos/data/build/discoverbos/test.json"
);

const handleUpdate = () => {
  const data = {
    project: newData.body,
  };

  Social.set(data);
};

return (
  <div className="mb-3">
    <p>{newData.body}</p>
    <button
      className="btn text-light btn-info m-2"
      disabled={!context.accountId}
      onClick={handleUpdate}
    >
      Update Curation
    </button>
  </div>
);
