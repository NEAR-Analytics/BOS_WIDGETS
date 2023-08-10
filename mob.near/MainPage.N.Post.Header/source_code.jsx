const accountId = props.accountId;
const blockHeight = props.blockHeight;
const name = Social.get(`${accountId}/profile/name`);

const postType = props.postType ?? "post";
const link = props.link;

return (
  <div className="d-flex flex-row align-items-center">
    <div className="flex-grow-1" style={{ overflow: "hidden" }}>
      <div className="d-flex">
        <a
          className="link-dark text-truncate"
          href={`/mob.near/widget/ProfilePage?accountId=${accountId}`}
        >
          <Widget
            src="mob.near/widget/Profile.OverlayTrigger"
            props={{
              accountId,
              children: (
                <div className="text-truncate">
                  <span className="fw-bold">{name}</span>
                  <span className="text-muted font-monospace">
                    @{accountId}
                  </span>
                </div>
              ),
            }}
          />
        </a>
        <span className="px-1 text-muted">·</span>
        <span className="text-nowrap text-muted">
          {blockHeight === "now" ? (
            "now"
          ) : (
            <a className="text-muted" href={link}>
              <Widget src="mob.near/widget/TimeAgo" props={{ blockHeight }} />
            </a>
          )}
        </span>
      </div>
    </div>
    <span className="text-nowrap text-muted">
      {blockHeight !== "now" && (
        <span>
          <a
            href="javascript:void"
            className="link-secondary ms-2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fs-6 bi bi-three-dots" />
          </a>
          <ul className="dropdown-menu">
            <li className="dropdown-item">
              <a
                className="link-dark text-decoration-none"
                href={`${link}&raw=true`}
              >
                <i className="bi bi-filetype-raw" /> View raw markdown source
              </a>
            </li>
            <li>
              <Widget
                src="mob.near/widget/MainPage.Common.HideAccount"
                props={{ accountId }}
              />
            </li>
            {props.flagItem && (
              <li>
                <Widget
                  src="mob.near/widget/MainPage.Common.FlagContent"
                  props={{
                    item: props.flagItem,
                    label: `Flag ${postType} for moderation`,
                  }}
                />
              </li>
            )}
          </ul>
        </span>
      )}
    </span>
  </div>
);
