const accountId = props.accountId ?? context.accountId;
const groupId = props.groupId ?? "everyone";

if (!accountId) {
  return "Please connect your NEAR account :)";
}

const handleJoin = () => {
  Social.set({
    graph: { [groupId]: { [accountId]: "" } },
    index: {
      graph: JSON.stringify({
        key: groupId,
        value: {
          type,
          accountId,
        },
      }),
      notify: JSON.stringify([
        {
          key: groupId,
          value: {
            type,
            accountId,
            message: "requested to join",
          },
        },
        {
          key: accountId,
          value: {
            type,
            groupId,
            message: "request submitted",
          },
        },
      ]),
    },
  });
};

return (
  <>
    <button disabled={loading} className="btn btn-primary" onClick={handleJoin}>
      Join
    </button>
  </>
);
