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
    mention: `I have mentioned @${userToNotify} in this post: `,
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
      force: true,
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

const standardPostBlockHeight = 106940958;

notify(
  "mention",
  `${context.accountId}`,
  `https://near.social/f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/SayALot?isTest=t&sharedBlockHeight=${standardPostBlockHeight}`
);

return <></>;
