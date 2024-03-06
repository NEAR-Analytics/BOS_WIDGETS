const src = props.src ?? "devs.near/widget/community";
const [creatorId, type, name] = src.split("/");

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
  <>
    <button className="btn btn-sm btn-outline-secondary" onClick={forkClick}>
      <i className="bi bi-feather"></i>
      Fork
    </button>
  </>
);
