const snapshotHistory = props.snapshotHistory;

const Wrapper = styled.div`
  position: relative;
  .log-line {
    position: absolute;
    left: 7%;
    top: -30px;
    bottom: 0;
    z-index: 1;
    width: 1px;
    height: 100%;
    background-color: var(--bs-border-color);
    z-index: 1;
  }
`;

const CommentContainer = styled.div`
  border: 1px solid lightgrey;
`;

const Header = styled.div`
  position: relative;
  background-color: #f4f4f4;
  height: 50px;

  .menu {
    position: absolute;
    right: 10px;
    top: 4px;
    font-size: 30px;
  }
`;

// check snapshot history all keys and values for differences
function getChangedKeysWithValues(original, modified) {
  function compareObjects(originalObj, modifiedObj) {
    const changedKeys = Object.keys(originalObj).reduce((keys, key) => {
      if (originalObj.hasOwnProperty(key)) {
        if (
          typeof originalObj[key] === "object" &&
          !Array.isArray(originalObj[key])
        ) {
          return keys.concat(
            compareObjects(originalObj[key], modifiedObj[key])
          );
        } else if (Array.isArray(originalObj[key])) {
          if (
            JSON.stringify(originalObj[key]) !==
            JSON.stringify(modifiedObj[key])
          ) {
            keys.push({
              key,
              originalValue: originalObj[key],
              modifiedValue: modifiedObj[key],
            });
          }
        } else {
          if (originalObj[key] !== modifiedObj[key]) {
            keys.push({
              key,
              originalValue: originalObj[key],
              modifiedValue: modifiedObj[key],
            });
          }
        }
      }
      return keys;
    }, []);
    return changedKeys;
  }

  return compareObjects(original, modified);
}

State.init({
  data: null,
  socialComments: null,
  changedKeysListWithValues: null,
});

function sortTimelineAndComments() {
  const comments = Social.index("comment", props.item);

  if (state.changedKeysListWithValues === null) {
    const changedKeysListWithValues = snapshotHistory
      .slice(1)
      .map((item, index) => {
        const startingPoint = snapshotHistory[index]; // Set comparison to the previous item
        return {
          editorId: item.editor_id,
          ...getChangedKeysWithValues(startingPoint, item),
        };
      });
    State.update({ changedKeysListWithValues });
  }

  // sort comments and timeline logs by time
  const snapShotTimeStamp = Array.isArray(snapshotHistory)
    ? snapshotHistory.map((i) => {
        return { blockHeight: null, timestamp: parseFloat(i.timestamp / 1e6) };
      })
    : [];

  const commentsTimeStampPromise = Array.isArray(comments)
    ? Promise.all(
        comments.map((item) => {
          return asyncFetch(
            `https://api.near.social/time?blockHeight=${item.blockHeight}`
          ).then((res) => {
            const timeMs = parseFloat(res.body);
            return {
              blockHeight: item.blockHeight,
              timestamp: timeMs,
            };
          });
        })
      ).then((res) => res)
    : Promise.resolve([]);

  commentsTimeStampPromise.then((commentsTimeStamp) => {
    const combinedArray = [...snapShotTimeStamp, ...commentsTimeStamp];
    combinedArray.sort((a, b) => a.timestamp - b.timestamp);
    State.update({ data: combinedArray, socialComments: comments });
  });
}

sortTimelineAndComments();
const Comment = ({ commentItem }) => {
  const { accountId, blockHeight } = commentItem;
  const item = {
    type: "social",
    path: `${accountId}/post/comment`,
    blockHeight,
  };
  const content = JSON.parse(Social.get(item.path, blockHeight) ?? "null");

  const link = `https://near.org/mob.near/widget/MainPage.N.Comment.Page?accountId=${accountId}&blockHeight=${blockHeight}`;
  return (
    <div style={{ zIndex: 99, background: "white" }}>
      <div className="d-flex gap-2 flex-1">
        <Widget
          src={"megha19.near/widget/devhub.entity.proposal.Profile"}
          props={{
            accountId: accountId,
          }}
        />
        <CommentContainer className="rounded-2 flex-1">
          <Header className="d-flex gap-3 align-items-center p-2 px-3">
            <div>
              {accountId} commented
              <Widget
                src="near/widget/TimeAgo"
                props={{
                  blockHeight: blockHeight,
                }}
              />
            </div>
            {context.accountId && (
              <div className="menu">
                <Widget
                  src="near/widget/Posts.Menu"
                  props={{
                    accountId: accountId,
                    blockHeight: blockHeight,
                    contentPath: `/post/comment`,
                    contentType: "comment",
                  }}
                />
              </div>
            )}
          </Header>
          <div className="p-2 px-3">
            <Widget
              src={
                "megha19.near/widget/devhub.components.molecule.MarkdownViewer"
              }
              props={{
                text: content.text,
              }}
            />

            <div className="d-flex gap-2 align-items-center mt-4">
              <Widget
                src="near/widget/v1.LikeButton"
                props={{
                  item: item,
                }}
              />
              <Widget
                src="near/widget/CopyUrlButton"
                props={{
                  url: link,
                }}
              />
              <Widget
                src="near/widget/ShareButton"
                props={{
                  postType: "post",
                  url: link,
                }}
              />
            </div>
          </div>
        </CommentContainer>
      </div>
    </div>
  );
};

const Log = ({ timestamp }) => {
  const updatedData = state.changedKeysListWithValues.find((obj) => {
    return Object.values(obj).some((value) => {
      return value && parseFloat(value.modifiedValue / 1e6) === timestamp;
    });
  });
  if (updatedData) {
    return (
      <div
        style={{ zIndex: 99, background: "white", marginLeft: 50 }}
        className="d-flex gap-3 align-items-center"
      >
        <img
          src="https://ipfs.near.social/ipfs/bafkreiffqrxdi4xqu7erf46gdlwuodt6dm6rji2jtixs3iionjvga6rhdi"
          height={30}
        />
        <div className="d-flex gap-2 flex-1">
          {updatedData.editorId} changed{" "}
        </div>
      </div>
    );
  }
};

if (Array.isArray(state.data)) {
  return (
    <Wrapper>
      <div className="log-line"> </div>
      <div className="d-flex flex-column gap-4">
        {state.data.map((i) => {
          if (i.blockHeight) {
            const item = state.socialComments.find(
              (t) => t.blockHeight === i.blockHeight
            );
            return <Comment commentItem={item} />;
          } else {
            // return <Log timestamp={i.timestamp} />;
          }
        })}
      </div>
    </Wrapper>
  );
}
