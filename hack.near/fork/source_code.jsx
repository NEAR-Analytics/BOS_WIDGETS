const src = props.src ?? "devs.near/widget/community";
const [creatorId, type, name] = src.split("/");

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
          update: `${context.accountId}/${type}/${name}`,
        },
      }),
    },
    [`${type}`]: {
      [`${name}`]: {
        "": `${source}`,
        metadata: {
          fork_of: src,
        },
      },
    },
  };

  data.index.notify = JSON.stringify({
    key: creatorId,
    value: {
      type: "fork",
      src,
      update: `${context.accountId}/${type}/${name}`,
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
  <>
    <button className="btn btn-sm btn-outline-secondary" onClick={forkClick}>
      <i className="bi bi-feather"></i>
      Fork
    </button>
  </>
);
