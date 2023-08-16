const { isTest, stateUpdate, libCalls } = props;

const prodAction = "sayALotUpVote";
const testAction = `test_${prodAction}`;
const action = isTest ? testAction : prodAction;

function getUpVote(props) {
  console.log("getUpVote props: ", props);
}

function addUpVote(props) {
  console.log("addUpVote props: ", props);
}

function libCall(call) {
  if (call.functionName === "getUpVotes") {
    return getUpVotes(call.props);
  } else if (call.functionName === "addUpVote") {
    return addUpVote(call.props);
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
