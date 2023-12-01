const { stateUpdate, imports } = props;

if (!stateUpdate) {
  stateUpdate = () => {};
}

if (!imports) {
  imports = [];
}

function appendExports(fnName) {
  if (fnName === "notify") {
    libNotificationsOutput[fnName] = notify;
  } else if (fnName === "clg") {
    libNotificationsOutput[fnName] = clg;
  }
}

function notify(notificationType, userToNotify, redirectTo) {
  console.log("Inside notify fn");
  const notificationTypeText = {
    mention: `I have mentioned ${userToNotify} in this post: `,
    upVote: "I have upVoted this post: ",
    emoji: "I have reacted to this post: ",
    comment: "I have commented this post: ",
  };

  Social.set(
    {
      post: {
        main: JSON.stringify({
          type: "md",
          text: `${notificationTypeText[notificationType]} ${redirectTo}`,
        }),
      },
      index: {
        notify: JSON.stringify({
          key: userToNotify,
          value: {
            type: "mention",
            item: {
              type: "social",
              path: `${context.accountId}/post/main`,
            },
          },
        }),
      },
    },
    {
      onCommit: () => {
        stateUpdate({ articleCreated: undefined });
      },
    }
  );
}

function clg(string) {
  console.log(string);
}

const libNotificationsOutput = {};

imports.forEach((fnName) => {
  appendExports(fnName);
});

stateUpdate(libNotificationsOutput);

return <></>;
