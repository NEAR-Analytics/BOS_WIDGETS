State.init({ commitLoading: false });

const currentData = Social.get("petersalomonsen.near/experimental/*");
const data = { experimental: { test: "test" + new Date().toJSON() } };

const Loading = (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);

return (
  <div>
    {JSON.stringify(currentData)}
    <CommitButton force data={data}>
      CommitButton
    </CommitButton>
    <button
      disabled={state.commitLoading}
      onClick={() => {
        State.update({ commitLoading: true });
        Social.set(data, {
          force: true,
          onCommit: () => {
            State.update({ commitLoading: false });
          },
          onCancel: () => {
            State.update({ commitLoading: false });
          },
        });
      }}
    >
      {state.commitLoading && Loading}Social.set
    </button>
  </div>
);
