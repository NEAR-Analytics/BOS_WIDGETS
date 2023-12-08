const type = props.type ?? "quest";

function generateUID() {
  return (
    Math.random().toString(16).slice(2) +
    Date.now().toString(36) +
    Math.random().toString(16).slice(2)
  );
}

const questId = props.questId ?? generateUID();

const composeData = () => {
  // generate a random id
  const thingId = questId;
  const data = {
    [type]: {
      [thingId]: {
        "": JSON.stringify({
          thing,
        }),
        metadata: {
          type,
        },
      },
    },
    post: {
      main: JSON.stringify({
        content: `[+EMBED](https://near.social/${context.accountId}/${type}/${thingId})`,
      }),
    },
    index: {
      post: JSON.stringify({ key: "main", value: { type: "md" } }),
    },
    // index: {
    //   every: JSON.stringify({
    //     key: type,
    //     value: {
    //       path: `${context.accountId}/${type}/${thingId}`,
    //       type,
    //     },
    //   }),
    // },
  };

  if (state.selectedType === "efiz.near/type/markdown") {
    const notifications = extractTagNotifications(state.thing.text, {
      type: "social",
      path: `${context.accountId}/thing/${thingId}`,
    });

    if (notifications.length) {
      data.index.notify = JSON.stringify(
        notifications.length > 1 ? notifications : notifications[0]
      );
    }
  }

  if (postThing) {
    data = postThing(data);
  }
  return data;
};

return (
  <>
    <CommitButton force data={composeData()}>
      create
    </CommitButton>
  </>
);
