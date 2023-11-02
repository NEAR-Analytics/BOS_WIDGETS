const curatorId = props.curatorId ?? context.accountId ?? "discover.near";

const projects = Social.get(`${curatorId}/project/**`);

if (projects == null) {
  return "none found";
}

const newData = fetch(
  "https://raw.githubusercontent.com/NEARBuilders/discoverbos/data/build/discoverbos/projects.json"
);

const handleUpdate = () => {
  Social.set(`project/${newData.body}`);
};

return (
  <div className="mb-3">
    <button
      className="btn text-light btn-info m-2"
      disabled={!context.accountId}
      onClick={handleUpdate}
    >
      Update Curation
    </button>
  </div>
);
