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
  }
}

function getComments(args) {
  const { realArticleId } = args;
  const key = realArticleId;
  return Social.index(action, key);
}

function setComment(args) {
  console.log(2);
  const { realArticleId, text } = args;
  const data = {
    index: {
      [action]: JSON.stringify({
        key: realArticleId,
        value: {
          text,
        },
      }),
    },
  };
  Social.set(data);
}

const updateObj = {};
libCalls.forEach((call) => {
  updateObj[call.key] = libCall(call);
});

stateUpdate(updateObj);

return <></>;
