const { isTest, stateUpdate, libCalls } = props;

const prodAction = "sayALotComment";
const testAction = `test_${prodAction}`;
const action = isTest ? testAction : prodAction;

function createComment(props) {
  const { comment } = props;

  saveComment(comment);

  resultLibCalls = resultLibCalls.filter((call) => {
    return call.functionName !== "createComment";
  });

  return comment;
}

//addressForComments should be the realArticleId of the article
function composeCommentData(comment) {
  const data = {
    index: {
      [action]: JSON.stringify({
        key: comment.realArticleId,
        value: {
          type: "md",
          comment,
        },
      }),
    },
  };

  return data;
}

function saveComment(comment) {
  if (comment.text) {
    const newData = composeCommentData(comment);

    Social.set(newData, {
      force: true,
    });
    // onCancel: () => {
    //   State.update({ saving: false });
    // },
  }
}

function getComments(props) {
  const { realArticleId } = props;
  return Social.index(action, realArticleId, {
    order: "desc",
  });
}

function getCommentBlackListByBlockHeight() {
  return [];
}

function filterInvalidArticlesIndexes(commentIndexes) {
  return commentIndexes.filter(
    (commentIndexes) =>
      !getCommentBlackListByBlockHeight().includes(commentIndexes.blockHeight) // Comment is not in blacklist
  );
}

function getValidComments(props) {
  console.log(1, props);
  const commentIndexes = getComments(props);
  console.log(2, commentIndexes);
  const validCommentsIndexes = filterInvalidArticlesIndexes(commentIndexes);
  console.log(3, validCommentsIndexes);

  return validCommentsIndexes;
}

function libCall(call) {
  if (call.functionName === "createComment") {
    return createComment(call.props);
  } else if (call.functionName === "getValidComments") {
    console.log(0);
    return getValidComments(call.props);
  }
}

let resultLibCalls = [];
if (libCalls && libCalls.length > 0) {
  console.log(
    "Calling functions",
    libCalls.map((lc) => lc.functionName)
  );
  const updateObj = {};
  resultLibCalls = [...libCalls];
  libCalls.forEach((call) => {
    updateObj[call.key] = libCall(call);
  });

  updateObj.libCalls = resultLibCalls;
  stateUpdate(updateObj);
}

return <>{}</>;
