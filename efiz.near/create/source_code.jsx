State.init({
  created: false,
});

function composeData() {
  const data = {
    thing: {
      core: {
        data: {
          name: "",
          view: [
            {
              name: "kanban",
              src: "every.near/thing/kanban",
            },
            {
              name: "social",
              src: "every.near/thing/feed",
            },
          ],
        },
        type: "every.near/type/core",
      },
    },
  };
  return data;
}

return (
  <>
    {state.created ? (
      <></>
    ) : (
      <CommitButton
        force
        data={composeData}
        onCommit={() => console.log("hello")}
      >
        create something
      </CommitButton>
    )}
  </>
);
