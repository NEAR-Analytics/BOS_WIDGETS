const src = props.src ?? "devs.near/widget/community";
const update = props.update ?? "hack.near/widget/community";

State.init({
  src,
  update,
});

const source = Social.get(`${state.src}`);
const newVersion = Social.get(`${state.update}`);

const [creatorId, type, name] = src.split("/");

const handleCreate = () =>
  Social.set({
    [`${type}`]: {
      [`${name}`]: {
        "": `${newVersion}`,
      },
    },
  });

function generateUID() {
  return (
    Math.random().toString(16).slice(2) +
    Date.now().toString(36) +
    Math.random().toString(16).slice(2)
  );
}

const requestId = props.requestId ?? generateUID();

const data = {
  graph: {
    request: {
      merge: {
        src: state.src,
        update: state.update,
      },
    },
  },
  index: {
    graph: JSON.stringify({
      key: "request",
      value: {
        src: state.src,
        update: state.update,
      },
    }),
    notify: JSON.stringify({
      key: creatorId,
      value: {
        type: "merge",
        template: "hack.near/widget/notification",
        data: {
          src: state.src,
          update: state.update,
        },
      },
    }),
  },
};

const requests = Social.index("notify", context.accountId, {
  limit: 10,
  order: "desc",
  subscribe: true,
});

return (
  <>
    <h5 className="p-1">original source:</h5>
    <div className="input-group m-1 mb-2">
      <input
        className="form-control"
        defaultValue={state.src}
        onChange={(e) => {
          State.update({
            src: e.target.value,
          });
        }}
      />
    </div>
    <h5 className="p-1">updated version:</h5>
    <div className="input-group m-1 mb-2">
      <input
        className="form-control"
        defaultValue={state.update}
        onChange={(e) => {
          State.update({
            update: e.target.value,
          });
        }}
      />
    </div>
    <CommitButton className="btn btn-outline-secondary m-1" force data={data}>
      <i className="bi bi-git"></i>
      Submit
    </CommitButton>
    <button className="btn btn-outline-secondary m-1" onClick={handleCreate}>
      <i className="bi bi-stars"></i>
      Create
    </button>
  </>
);
