const accountId = props.accountId;
const blockHeight = props.blockHeight;
const name = Social.get(`${accountId}/profile/name`);

const postType = props.postType ?? "post";
const link = props.link;

const Overlay = (props) => (
  <a
    className="link-dark text-truncate"
    href={`/mob.near/widget/ProfilePage?accountId=${accountId}`}
  >
    <Widget
      src="mob.near/widget/Profile.OverlayTrigger"
      loading={props.children}
      props={{
        accountId,
        children: props.children,
      }}
    />
  </a>
);

const checkmarkColor = accountId === "mob.near" ? "#1d9bf0" : null;

const Checkmark = checkmarkColor ? (
  <svg
    viewBox="0 0 22 22"
    xmlns="http://www.w3.org/2000/svg"
    style={{ height: "1.25rem", marginLeft: "-0.1em", paddingRight: "0.1rem" }}
  >
    <path
      d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
      fill="#1d9bf0"
      // fill="#ffd700"
    ></path>
  </svg>
) : (
  ""
);

return (
  <div className="d-flex flex-row align-items-center">
    <div className="flex-grow-1" style={{ minWidth: 0, overflow: "hidden" }}>
      <div className="d-flex">
        {name && (
          <div style={{ flexShrink: 1, minWidth: 0, overflow: "hidden" }}>
            <Overlay>
              <div className="text-truncate fw-bold pe-1">{name}</div>
            </Overlay>
          </div>
        )}
        <div className="text-nowrap flex-shrink-0">{Checkmark}</div>
        <div style={{ flexShrink: 100, minWidth: 0, overflow: "hidden" }}>
          <Overlay>
            <div className="text-truncate text-muted font-monospace">
              @{accountId}
            </div>
          </Overlay>
        </div>
        <div className="text-nowrap text-muted flex-shrink-0">
          <span className="ps-1 text-muted">·</span>
          {blockHeight === "now" ? (
            "now"
          ) : (
            <a className="text-muted" href={link}>
              <Widget src="mob.near/widget/TimeAgo" props={{ blockHeight }} />
            </a>
          )}
        </div>
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
