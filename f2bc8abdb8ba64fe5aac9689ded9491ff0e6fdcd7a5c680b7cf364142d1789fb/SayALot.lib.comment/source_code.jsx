const { isTest, stateUpdate, libCalls } = props;

const prodAction = "SayALotComments";
const testAction = "test_SayALotComments";
const action = isTest ? testAction : prodAction;

function libCall(call) {
  if (call.functionName === "getComments") {
    return getComments(call.props);
  } else if (call.functionName === "setComment") {
    return setComment(call.props);
  }
}

function getComments(args) {
  const { realArticleId } = args;
  const key = realArticleId;
  return Social.index(action, key);
}

function setComment(args) {
  const {
    realArticleId,
    text,
    previousCommentId,
    onClickConfirm,
    onClickCancel,
  } = args;
  const data = {
    index: {
      [action]: JSON.stringify({
        key: realArticleId,
        value: {
          text,
          id: `${realArticleId}-${Date.now()}`,
          previousCommentId,
        },
      }),
    },
  };
  Social.set(data, {
    onCommit: onClickConfirm,
    onCancel: onClickCancel,
  });

  resultLibCalls = resultLibCalls.filter((call) => {
    return call.functionName !== "setComment";
  });

  return text;
}

const updateObj = {};
const resultLibCalls = [...libCalls];

libCalls.forEach((call) => {
  updateObj[call.key] = libCall(call);
});

updateObj.libCalls = resultLibCalls;
stateUpdate(updateObj);
return <></>;
