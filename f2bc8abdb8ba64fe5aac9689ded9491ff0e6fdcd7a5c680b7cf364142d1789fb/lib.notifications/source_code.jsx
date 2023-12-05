const { stateUpdate, imports, fatherNotificationsState } = props;

if (!stateUpdate) {
  stateUpdate = () => {};
}

if (!imports) {
  imports = [];
}

let fatherStateHasAllFunction = true;
imports.forEach((fnName) => {
  fatherStateHasAllFunction =
    fatherStateHasAllFunction && fatherNotificationsState[fnName] !== undefined;
});

if (fatherStateHasAllFunction) {
  return <></>;
}

function appendExports(fnName) {
  if (fnName === "getNotificationData") {
    libNotificationsOutput[fnName] = getNotificationData;
  }
}

function getNotificationData(notificationType, usersToNotify, redirectTo) {
  const notificationTypeText = {
    mention: `I have mentioned @${usersToNotify} in this post: `,
    upVote: "I have upVoted this post: ",
    emoji: "I have reacted to this post: ",
    comment: "I have commented this post: ",
  };

  const dataToAdd = {
    post: {
      main: JSON.stringify({
        type: "md",
        text: `${notificationTypeText[notificationType]} ${redirectTo}`,
      }),
    },
    index: {
      notify: JSON.stringify(
        usersToNotify.map((user) => {
          return {
            key: user,
            value: {
              type: "mention",
              item: {
                type: "social",
                path: `${context.accountId}/post/main`,
              },
            },
          };
        })
      ),
    },
  };

  console.log("dataToAdd 1: ", dataToAdd);

  return dataToAdd;
}

const libNotificationsOutput = {};

imports.forEach((fnName) => {
  appendExports(fnName);
});

stateUpdate({ notifications: libNotificationsOutput });

return <></>;
