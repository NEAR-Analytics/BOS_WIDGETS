/*
---props---
props.post: {};
props.id: number;
props.newTab: boolean;
props.timestamp: number;
props.referral: any;
*/

const postId = props.post.id ?? (props.id ? parseInt(props.id) : 0);
const post =
  props.post ??
  Near.view("devgovgigs.near", "get_post", {
    post_id: postId,
  });
if (!post || post.snapshot_history.length === 0) {
  return <div class="bi bi-clock-history px-2"></div>;
}
const referral = props.referral;

function readableDate(timestamp) {
  var a = new Date(timestamp);
  return (
    a.toDateString() +
    " " +
    a.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  ).substring(4);
}

function historyHref(widgetName, linkProps) {
  linkProps = { ...linkProps };
  const linkPropsQuery = Object.entries(linkProps)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `#/markeljan.near/widget/${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}

const currentTimestamp = props.timestamp ?? post.snapshot.timestamp;
const snapshot = post.snapshot;
const snapshotHistory = post.snapshot_history;
snapshotHistory.push(snapshot);
snapshotHistory.reverse();

const history = (
  <div class="btn-group" role="group">
    <a
      class="card-link"
      role="button"
      title="Object History"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      type="button"
    >
      <div class="bi bi-clock-history px-2"></div>
    </a>
    <ul class="dropdown-menu">
      <a
        class="d-flex text-muted"
        style={{ fontSize: "12px", textDecoration: "none", cursor: "default" }}
      >
        <a
          style={{
            textAlign: "center",
            minWidth: "290px",
            maxWidth: "290px",
          }}
        >
          Edit History
        </a>
        <a style={{ marginRight: "8px" }}>Compare</a>
      </a>
      {snapshotHistory.map((item) => {
        if (item === undefined) return;
        return (
          <li style={{ display: "flex" }}>
            <div
              style={{
                minWidth: "290px",
                maxWidth: "290px",
              }}
            >
              <a
                class="dropdown-item"
                href={historyHref("PostWithHistory", {
                  id: postId,
                  timestamp: item.timestamp,
                  compareTimestamp: null,
                  referral,
                })}
                target={props.newTab ? "_blank" : undefined}
              >
                {readableDate(item.timestamp / 1000000)}

                <Widget
                  src="mob.near/widget/ProfileImage"
                  props={{
                    accountId: item.editor_id,
                    style: {
                      width: "1.25em",
                      height: "1.25em",
                    },
                    imageStyle: {
                      transform: "translateY(-12.5%)",
                    },
                  }}
                />
                {post.author_id.substring(0, 8)}
              </a>
            </div>
            <a
              class="dropdown-item"
              href={historyHref("PostWithHistory", {
                id: postId,
                timestamp: currentTimestamp,
                compareTimestamp: item.timestamp,
                referral,
              })}
            >
              <i class="bi bi-file-earmark-diff" />
            </a>
          </li>
        );
      })}
    </ul>
    <Widget
      src="efiz.near/widget/Every.Thing.History"
      props={{
        path: "hyperfiles.near/widget/index-dev",
        count: (count) => console.log("Number of changes:", count),
      }}
    />
  </div>
);

return history;
