const { isTest, stateUpdate, libCalls } = props;

const prodAction = "SayALotComments";
const testAction = "test_SayALotComments";
const action = isTest ? testAction : prodAction;

// const initLibCalls = [
//   {
//     functionName: "get1",
//     key: "test",
//     props: {},
//   },
//   {
//     functionName: "getWritersWhitelist",
//     key: "writersWhitelist",
//     props: { env: "test" },
//   },
// ];

function getWritersWhitelist(env) {
  if (env === "test") {
    return ["kenrou-it.near", "ayelen.near", "martinbarba.near"];
  } else {
    return ["blaze.near"];
  }
}

function libCall(call) {
  if (call.functionName === "getComments") {
    return getComments(call.props);
  } else if (call.functionName === "setComment") {
    return setComment(call.props);
  } else if (call.functionName === "getWritersWhitelist") {
    return getWritersWhitelist(call.props.env);
  } else if (call.functionName === "get1") {
    return 1;
  }
}

function getComments(args) {
  const { realArticleId } = args;
  const key = realArticleId;
  return Social.index(action, key);
}

function setComment(args) {
  const { realArticleId, text, previousCommentId } = args;
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
  Social.set(data);

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
