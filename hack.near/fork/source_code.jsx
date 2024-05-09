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
    [`${type}`]: {
      [`${name}`]: {
        "": `${source}`,
        metadata: {
          fork_of: src,
        },
      },
    },
  };

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
    <a
      className="btn btn-sm btn-outline-secondary"
      href={`https://near.social/edit/${src}`}
    >
      Fork
    </a>
  </>
);
