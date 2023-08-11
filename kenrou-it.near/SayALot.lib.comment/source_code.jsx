const { isTest, stateUpdate, libCalls } = props;

const prodAction = "sayALotComment";
const testAction = `test_${prodAction}`;
const action = isTest ? testAction : prodAction;

function createComment(props) {
  const { comment, onCommit, onCancel } = props;

  saveComment(comment, onCommit, onCancel);

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

function saveComment(comment, onCommit, onCancel) {
  if (comment.text) {
    const newData = composeCommentData(comment);

    Social.set(newData, {
      force: true,
      onCommit,
      onCancel,
    });
  }
}

function getComments(props) {
  const { realArticleId } = props;
  return Social.index(action, realArticleId, {
    order: "desc",
  });
}

function getCommentBlackListByBlockHeight() {
  return [98588599];
}

function filterInvalidArticlesIndexes(commentIndexes) {
  return commentIndexes.filter(
    (commentIndexes) =>
      !getCommentBlackListByBlockHeight().includes(commentIndexes.blockHeight) // Comment is not in blacklist
  );
}

function getValidComments(props) {
  const commentIndexes = getComments(props);
  const validCommentsIndexes = filterInvalidArticlesIndexes(commentIndexes);

  return validCommentsIndexes;
}

function libCall(call) {
  if (call.functionName === "createComment") {
    return createComment(call.props);
  } else if (call.functionName === "getValidComments") {
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
