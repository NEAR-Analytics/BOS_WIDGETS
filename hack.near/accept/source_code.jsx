const accountId = props.accountId ?? "devs.near";
const groupId = props.groupId ?? "f8ad9d1a76259lmdpjnd74e69162a0a014";
const creatorId = props.creatorId ?? "hack.near";

if (!props.accountId && !context.accountId) {
  return "";
}

const joinEdge = Social.keys(
  `${accountId}/graph/${groupId}/${context.accountId}`,
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
const member = memberEdge && Object.keys(memberEdge).length;

const type = join ? "reject" : "accept";

const handleAccept = () => {
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
        key: creatorId,
        value: {
          type,
          accountId,
          groupId,
          message: "request accepted",
        },
      }),
    },
  });
};

return (
  <>
    {creatorId === context.accountId && (
      <span>
        {!join ? (
          <button
            disabled={!context.accountId}
            className="btn btn-success"
            onClick={handleAccept}
          >
            Accept
          </button>
        ) : (
          <button
            disabled={joinEdge}
            className="btn btn-success"
            onClick={handleAccept}
          >
            Accepted
          </button>
        )}
      </span>
    )}
  </>
);
