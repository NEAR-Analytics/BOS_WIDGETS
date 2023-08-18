const { stateUpdate, libCalls } = props;

const testAction = `test_librery`;

function testSubscribe() {
  // const { realArticleId, createdInteraction } = props;

  const allVotes = Social.index(testAction, "test", {
    order: "desc",
    subscribe: true,
  });

  return allVotes;
}

function addTest() {
  Social.set({
    index: {
      [testAction]: JSON.stringify({
        key: "test",
        value: {
          date: Date.now(),
        },
      }),
    },
  });
}

function libCall(call) {
  if (call.functionName === "testSubscribe") {
    return testSubscribe(call.props);
  } else if (call.functionName === "addTest") {
    return addTest(call.props);
  }
}

let resultLibCalls = [];
if (libCalls && libCalls.length > 0) {
  // console.log(
  //   "Calling functions",
  //   libCalls.map((lc) => lc.functionName)
  // );
  const updateObj = {};
  resultLibCalls = [...libCalls];
  libCalls.forEach((call) => {
    updateObj[call.key] = libCall(call);
  });

  updateObj.libCalls = resultLibCalls;
  stateUpdate(updateObj);
}

return <></>;
