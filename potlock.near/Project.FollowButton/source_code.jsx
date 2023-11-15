const ownerId = "potlock.near";

if (!props.accountId || !context.accountId || context.accountId === props.accountId) {
  return "";
}

const followEdge = Social.keys(`${context.accountId}/graph/follow/${props.accountId}`, undefined, {
  values_only: true,
});

const inverseEdge = Social.keys(`${props.accountId}/graph/follow/${context.accountId}`, undefined, {
  values_only: true,
});

const loading = followEdge === null || inverseEdge === null;
const follow = followEdge && Object.keys(followEdge).length;
const inverse = inverseEdge && Object.keys(inverseEdge).length;

const type = follow ? "unfollow" : "follow";

const socialArgs = {
  data: {
    [context.accountId]: {
      graph: { follow: { [props.accountId]: follow ? null : "" } },
      index: {
        graph: JSON.stringify({
          key: "follow",
          value: {
            type,
            accountId: props.accountId,
          },
        }),
        notify: JSON.stringify({
          key: props.accountId,
          value: {
            type,
          },
        }),
      },
    },
  },
};

const buttonText = loading ? "Loading" : follow ? "Following" : inverse ? "Follow back" : "Follow";

const FollowContainer = styled.div`
  padding: 10px 16px;
  cursor: pointer;
`;

const FollowText = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: #dd3345;
  word-wrap: break-word;
`;

return (
  <FollowContainer
    onClick={() => {
      const transactions = [
        {
          contractName: "social.near",
          methodName: "set",
          deposit: Big(JSON.stringify(socialArgs).length * 0.00003).mul(Big(10).pow(24)),
          args: socialArgs,
        },
      ];
      Near.call(transactions);
    }}
  >
    <FollowText>
      {loading ? "Loading" : follow ? "Following" : inverse ? "Follow back" : "Follow"}
    </FollowText>
  </FollowContainer>
);
