const src = props.src ?? "devs.near/widget/community";
const [creatorId, type, name] = src.split("/");

const { handleClose } = props;

State.init({
  name,
});

const source = Social.get(`${src}`);

const forkClick = () => {
  if (state.loading) {
    return;
  }

  State.update({
    loading: true,
  });

  const data = {
    index: {
      fork: JSON.stringify({
        key: {
          type: "social",
          path: src,
        },
        value: {
          update: `${context.accountId}/${type}/${state.name}`,
        },
      }),
    },
    [`${type}`]: {
      [`${state.name}`]: {
        "": `${source}`,
        metadata: {
          upstream: src,
          downstream:
            name !== state.name
              ? `${context.accountId}/${type}/${state.name}`
              : undefined,
        },
      },
    },
  };

  data.index.notify = JSON.stringify({
    key: creatorId,
    value: {
      type: "fork",
      src,
      update: `${context.accountId}/${type}/${state.name}`,
    },
  });

  Social.set(data, {
    onCommit: () => State.update({ loading: false }),
    onCancel: () =>
      State.update({
        loading: false,
      }),
  });
};

return (
  <div className="m-1 row">
    <div className="m-1 col-3">
      <p className="m-2">{`${context.accountId}/${type}/`}</p>
    </div>
    <div className="m-1 col-5">
      <input
        className="form-control"
        defaultValue={state.name}
        onChange={(e) => {
          State.update({
            name: e.target.value,
          });
        }}
      />
    </div>
    <div className="m-1 col-3">
      <button className="btn btn-outline-secondary" onClick={forkClick}>
        <i className="bi bi-feather"></i>
        Submit
      </button>
    </div>
  </div>
);
