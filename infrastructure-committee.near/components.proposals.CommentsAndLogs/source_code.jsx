const { PROPOSAL_TIMELINE_STATUS, isNumber, getLinkUsingCurrentGateway } =
  VM.require(`infrastructure-committee.near/widget/core.common`) || {
    PROPOSAL_TIMELINE_STATUS: {},
    isNumber: () => {},
    getLinkUsingCurrentGateway: () => {},
  };
const { href } = VM.require(`devhub.near/widget/core.lib.url`);
href || (href = () => {});
const snapshotHistory = props.snapshotHistory ?? [];
const latestSnapshot = props.latestSnapshot;
const Wrapper = styled.div`
  position: relative;
  .log-line {
    position: absolute;
    left: 7%;
    top: -30px;
    bottom: 0;
    z-index: 1;
    width: 1px;
    background-color: var(--bs-border-color);
    z-index: 1;
  }
  .text-wrap {
    overflow: hidden;
    white-space: normal;
  }
  .fw-bold {
    font-weight: 600 !important;
  }
  .inline-flex {
    display: -webkit-inline-box !important;
    align-items: center !important;
    gap: 0.25rem !important;
    margin-right: 2px;
    flex-wrap: wrap;
  }
`;
const CommentContainer = styled.div`
  border: 1px solid lightgrey;
  overflow: auto;
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
function getDifferentKeysWithValues(obj1, obj2) {
  return Object.keys(obj1)
    .filter((key) => {
      if (key !== "editor_id" && obj2.hasOwnProperty(key)) {
        const value1 = obj1[key];
        const value2 = obj2[key];
        if (Array.isArray(value1) && Array.isArray(value2)) {
          const sortedValue1 = [...value1].sort();
          const sortedValue2 = [...value2].sort();
          return JSON.stringify(sortedValue1) !== JSON.stringify(sortedValue2);
        } else if (typeof value1 === "object" && typeof value2 === "object") {
          return JSON.stringify(value1) !== JSON.stringify(value2);
        } else {
          return value1 !== value2;
        }
      }
      return false;
    })
    .map((key) => ({
      key,
      originalValue: obj1[key],
      modifiedValue: obj2[key],
    }));
}
State.init({
  data: null,
  socialComments: null,
  changedKeysListWithValues: null,
});
function sortTimelineAndComments() {
  const comments = Social.index("comment", props.item, { subscribe: true });
  if (state.changedKeysListWithValues === null) {
    const changedKeysListWithValues = snapshotHistory
      .slice(1)
      .map((item, index) => {
        const startingPoint = snapshotHistory[index]; // Set comparison to the previous item
        return {
          editorId: item.editor_id,
          ...getDifferentKeysWithValues(startingPoint, item),
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
if (Array.isArray(snapshotHistory)) {
  sortTimelineAndComments();
}
const Comment = ({ commentItem }) => {
  const { accountId, blockHeight } = commentItem;
  const item = {
    type: "social",
    path: `${accountId}/post/comment`,
    blockHeight,
  };
  const content = JSON.parse(Social.get(item.path, blockHeight) ?? "null");
  const link = `https://devhub.near.page/proposal/${proposalId}?accountId=${accountId}&blockHeight=${blockHeight}`;
  const hightlightComment =
    parseInt(props.blockHeight ?? "") === blockHeight &&
    props.accountId === accountId;
  return (
    <div style={{ zIndex: 99, background: "white" }}>
      <div className="d-flex gap-2 flex-1">
        <div className="d-none d-sm-flex">
          <Widget
            src={`devhub.near/widget/devhub.entity.proposal.Profile`}
            props={{
              accountId: accountId,
            }}
          />
        </div>
        <CommentContainer
          id={`${accountId.replace(/[^a-z0-9]/g, "")}${blockHeight}`}
          style={{ border: hightlightComment ? "2px solid black" : "" }}
          className="rounded-2 flex-1"
        >
          <Header className="d-flex gap-3 align-items-center p-2 px-3">
            <div className="text-muted">
              <Link href={`/near/widget/ProfilePage?accountId=${accountId}`}>
                <span className="fw-bold text-black">{accountId}</span>
              </Link>
              commented ･{" "}
              <Widget
                src={`near/widget/TimeAgo`}
                props={{
                  blockHeight: blockHeight,
                }}
              />
            </div>
            {context.accountId && (
              <div className="menu">
                <Widget
                  src={`near/widget/Posts.Menu`}
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
              src={`devhub.near/widget/devhub.components.molecule.MarkdownViewer`}
              props={{
                text: content.text,
              }}
            />
            <div className="d-flex gap-2 align-items-center mt-4">
              <Widget
                src={`devhub.near/widget/devhub.entity.proposal.LikeButton`}
                props={{
                  item: item,
                  notifyAccountId: accountId,
                }}
              />
              <Widget
                src={`near/widget/CopyUrlButton`}
                props={{
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
function capitalizeFirstLetter(string) {
  const updated = string.replace("_", " ");
  return updated.charAt(0).toUpperCase() + updated.slice(1).toLowerCase();
}
function parseTimelineKeyAndValue(timeline, originalValue, modifiedValue) {
  const oldValue = originalValue[timeline];
  const newValue = modifiedValue[timeline];
  switch (timeline) {
    case "status": {
      if (
        (newValue === PROPOSAL_TIMELINE_STATUS.APPROVED ||
          newValue === PROPOSAL_TIMELINE_STATUS.APPROVED_CONDITIONALLY) &&
        latestSnapshot.linked_rfp
      ) {
        return (
          <span className="inline-flex">
            moved proposal to{" "}
            <Widget
              src={`devhub.near/widget/devhub.entity.proposal.StatusTag`}
              props={{
                timelineStatus: newValue,
              }}
            />
            ･ this proposal is selected for RFP{" "}
            <LinkToRfp id={latestSnapshot.linked_rfp}>
              #{latestSnapshot.linked_rfp}
            </LinkToRfp>
          </span>
        );
      } else
        return (
          oldValue !== newValue && (
            <span className="inline-flex">
              moved proposal from{" "}
              <Widget
                src={`devhub.near/widget/devhub.entity.proposal.StatusTag`}
                props={{
                  timelineStatus: oldValue,
                }}
              />
              to{" "}
              <Widget
                src={`devhub.near/widget/devhub.entity.proposal.StatusTag`}
                props={{
                  timelineStatus: newValue,
                }}
              />
              stage
            </span>
          )
        );
    }
    case "sponsor_requested_review":
      return !oldValue && newValue && <span>completed review</span>;
    case "reviewer_completed_attestation":
      return !oldValue && newValue && <span>completed attestation</span>;
    case "kyc_verified":
      return !oldValue && newValue && <span>verified KYC/KYB</span>;
    case "test_transaction_sent":
      return (
        !oldValue &&
        newValue && (
          <span>
            confirmed sponsorship and shared funding steps with recipient
          </span>
        )
      );
    case "payouts":
      return <span>updated the funding payment links.</span>;
    default:
      return null;
  }
}
const AccountProfile = ({ accountId }) => {
  return (
    <span className="inline-flex fw-bold text-black">
      <Widget
        src={`devhub.near/widget/devhub.entity.proposal.Profile`}
        props={{
          accountId: accountId,
          size: "sm",
          showAccountId: true,
        }}
      />
    </span>
  );
};
const LinkToRfp = ({ id, children }) => {
  return (
    <a
      className="text-decoration-underline flex-1"
      href={href({
        widgetSrc: `infrastructure-committee.near/widget/app`,
        params: {
          page: "rfp",
          id: id,
        },
      })}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};
const parseProposalKeyAndValue = (key, modifiedValue, originalValue) => {
  switch (key) {
    case "name":
      return <span>changed title</span>;
    case "summary":
    case "description":
      return <span>changed {key}</span>;
    case "labels":
      return <span>changed labels to {(modifiedValue ?? []).join(", ")}</span>;
    case "category":
      return (
        <span>
          changed category from {originalValue} to {modifiedValue}
        </span>
      );
    case "linked_proposals":
      return <span>updated linked proposals</span>;
    case "linked_rfp": {
      const isUnlinked = isNumber(originalValue) && !isNumber(modifiedValue);
      const actionText = isUnlinked ? "unlinked" : "linked";
      const rfpId = originalValue ?? modifiedValue;
      return (
        <span>
          {actionText} an RFP <LinkToRfp id={rfpId}>#{rfpId}</LinkToRfp>
        </span>
      );
    }
    case "requested_sponsorship_usd_amount":
      return (
        <span>
          changed sponsorship amount from {originalValue} to {modifiedValue}
        </span>
      );
    case "requested_sponsorship_paid_in_currency":
      return (
        <span>
          changed sponsorship currency from {originalValue} to {modifiedValue}
        </span>
      );
    case "receiver_account":
      return (
        <span className="inline-flex">
          changed receiver account from{" "}
          <AccountProfile accountId={originalValue} />
          to <AccountProfile accountId={modifiedValue} />
        </span>
      );
    case "supervisor":
      return !originalValue && modifiedValue ? (
        <span className="inline-flex">
          added
          <AccountProfile accountId={modifiedValue} />
          as project coordinator
        </span>
      ) : (
        <span className="inline-flex">
          changed project coordinator from{" "}
          <AccountProfile accountId={originalValue} />
          to <AccountProfile accountId={modifiedValue} />
        </span>
      );
    case "timeline": {
      const modifiedKeys = Object.keys(modifiedValue);
      const originalKeys = Object.keys(originalValue);
      return modifiedKeys.map((i, index) => {
        const text = parseTimelineKeyAndValue(i, originalValue, modifiedValue);
        return (
          text && (
            <span key={index} className="inline-flex">
              {text}
              {text && "･"}
            </span>
          )
        );
      });
    }
    default:
      return null;
  }
};
const LogIconContainer = styled.div`
  margin-left: 50px;
  z-index: 99;
  @media screen and (max-width: 768px) {
    margin-left: 10px;
  }
`;
const Log = ({ timestamp }) => {
  const updatedData = useMemo(
    () =>
      state.changedKeysListWithValues.find((obj) =>
        Object.values(obj).some(
          (value) =>
            value && parseFloat(value.modifiedValue / 1e6) === timestamp
        )
      ),
    [state.changedKeysListWithValues, timestamp]
  );
  const editorId = updatedData.editorId;
  const valuesArray = Object.values(updatedData ?? {});
  // if valuesArray length is 2 that means it only has timestamp and editorId
  if (!updatedData || valuesArray.length === 2) {
    return <></>;
  }
  return valuesArray.map((i, index) => {
    if (i.key && i.key !== "timestamp") {
      return (
        <LogIconContainer
          className="d-flex gap-3 align-items-center"
          key={index}
        >
          <img
            src="https://ipfs.near.social/ipfs/bafkreiffqrxdi4xqu7erf46gdlwuodt6dm6rji2jtixs3iionjvga6rhdi"
            height={30}
          />
          <div
            className={
              "flex-1 gap-1 w-100 text-wrap text-muted align-items-center " +
              (i.key === "timeline" &&
              Object.keys(i.originalValue ?? {}).length > 1
                ? ""
                : "inline-flex")
            }
          >
            <span className="inline-flex fw-bold text-black">
              <AccountProfile accountId={editorId} showAccountId={true} />{" "}
            </span>
            {parseProposalKeyAndValue(i.key, i.modifiedValue, i.originalValue)}
            {i.key !== "timeline" && "･"}
            <Widget
              src={`near/widget/TimeAgo`}
              props={{
                blockTimestamp: timestamp * 1000000,
              }}
            />
          </div>
        </LogIconContainer>
      );
    }
  });
};
if (Array.isArray(state.data)) {
  return (
    <Wrapper>
      <div
        className="log-line"
        style={{ height: state.data.length > 2 ? "110%" : "150%" }}
      ></div>
      <div className="d-flex flex-column gap-4">
        {state.data.map((i, index) => {
          if (i.blockHeight) {
            const item = state.socialComments.find(
              (t) => t.blockHeight === i.blockHeight
            );
            return <Comment commentItem={item} />;
          } else {
            return <Log timestamp={i.timestamp} key={index} />;
          }
        })}
      </div>
    </Wrapper>
  );
}
