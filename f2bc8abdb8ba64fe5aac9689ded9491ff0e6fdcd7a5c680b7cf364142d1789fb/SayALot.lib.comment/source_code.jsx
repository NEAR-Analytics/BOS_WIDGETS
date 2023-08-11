const { isTest, stateUpdate, libCalls } = props;

const prodAction = "sayALotComment";
const testAction = `test_${prodAction}`;
const action = isTest ? testAction : prodAction;

function createComment(props) {
  const { comment, key } = props;

  commentHandler(comment, key);

  resultLibCalls = resultLibCalls.filter((call) => {
    return call.functionName !== "createComment";
  });

  return comment;
}

//addressForComments should be the realArticleId of the article
const composeCommentData = (props) => {
  const { comment, realArticleId } = props;
  const data = {
    index: {
      [action]: JSON.stringify({
        key: realArticleId,
        value: {
          type: "md",
          comment,
          commentId:
            comment.commentId ?? `c_${context.accountId}-${Date.now()}`,
        },
      }),
    },
  };

  return data;
};

const commentHandler = (comment, key) => {
  if (comment.image || comment.text) {
    const newData = composeCommentData(comment, key);

    Social.set(newData, {
      force: true,
    });
    // onCancel: () => {
    //   State.update({ saving: false });
    // },
  }
};

function getComment(props) {
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
  const commentIndexes = getComment(props);
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

if (libCalls && libCalls.length > 0) {
  const updateObj = {};
  const resultLibCalls = [...libCalls];
  libCalls.forEach((call) => {
    updateObj[call.key] = libCall(call);
  });

  updateObj.libCalls = resultLibCalls;
  stateUpdate(updateObj);
}

return <>{}</>;
