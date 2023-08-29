const src = props.src;
const update = props.update;

const [creatorId, type, name] = src.split("/");

const source = Social.get(`${src}`);
const newVersion = Social.get(`${update}`);

const handleMerge = () =>
  Social.set({
    [`${type}`]: {
      [`${name}`]: {
        "": `${newVersion}`,
      },
    },
  });

return (
  <button className="btn btn-success" onClick={handleMerge}>
    Merge
  </button>
);
