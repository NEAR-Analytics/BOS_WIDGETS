const { stateUpdate, libCalls } = props;

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
  if (call.functionName === "get1") {
    return 1;
  } else if (call.functionName === "getWritersWhitelist") {
    return getWritersWhitelist(call.props.env);
  }
}

const updateObj = {};
libCalls.forEach((call) => {
  updateObj[call.key] = libCall(call);
});

stateUpdate(updateObj);

return <></>;
