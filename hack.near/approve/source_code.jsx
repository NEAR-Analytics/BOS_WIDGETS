const accountId = props.accountId ?? context.accountId;
const groupId = props.groupId ?? "f8ad9d1a76259lmdpjnd74e69162a0a014";
const creatorId = props.creatorId ?? "hack.near";

if (!props.accountId && !context.accountId) {
  return "";
}

const joinEdge = Social.keys(
  `${context.accountId}/graph/${groupId}/${context.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const memberEdge = Social.keys(
  `${creatorId}/graph/${groupId}/${context.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const loading = joinEdge === null || memberEdge === null;
const join = joinEdge && Object.keys(joinEdge).length;
const inverse = memberEdge && Object.keys(memberEdge).length;

const type = approve ? "reject" : "approve";

const handleApprove = () => {
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
      notify: JSON.stringify({
        key: accountId,
        value: {
          type,
          groupId,
          message: "request approved",
        },
      }),
    },
  });
};
return (
  <>
    {creatorId === context.accountId && (
      <span>
        {!memberEdge ? (
          <button
            disabled={!context.accountId}
            className="btn btn-success"
            onClick={handleMerge}
          >
            Approve
          </button>
        ) : (
          <button
            disabled={memberEdge}
            className="btn btn-success"
            onClick={handleMerge}
          >
            Approved
          </button>
        )}
      </span>
    )}
  </>
);
