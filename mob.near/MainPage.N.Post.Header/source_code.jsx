const accountId = props.accountId;
const blockHeight = props.blockHeight;
const name = Social.get(`${accountId}/profile/name`);

const postType = props.postType ?? "post";
const link = props.link;
const isPremium = !!props.isPremium;

const Overlay = (props) => (
  <a
    className="link-dark text-truncate d-inline-flex mw-100"
    href={`/mob.near/widget/ProfilePage?accountId=${accountId}`}
  >
    <Widget
      src="mob.near/widget/Profile.N.OverlayTrigger"
      loading={props.children}
      props={{
        accountId,
        children: props.children,
      }}
    />
  </a>
);

const Button = styled.button`
  border: 0 !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: inherit;
  position: relative;
  color: #6c757d;
  height: 1em;
  svg {
    margin-top: -2px;
  }
  &:not([disabled]):hover {
    opacity: 1 !important;
    color: DeepSkyBlue;

    &:before {
      content: "";
      position: absolute;
      border-radius: 50%;
      width: 35px;
      height: 35px;
      background: rgba(0, 191, 255, 0.1);
    }
  }
`;

return (
  <div className="d-flex flex-row align-items-center post-header">
    <div className="flex-grow-1" style={{ minWidth: 0, overflow: "hidden" }}>
      <div className="d-flex">
        <div className="d-flex flex-shrink-1 overflow-hidden">
          {name && (
            <Overlay>
              <div className="text-truncate fw-bold">{name}</div>
            </Overlay>
          )}
          <div className="flex-shrink-0">
            {" "}
            <Widget
              loading={""}
              src="mob.near/widget/Checkmark"
              props={{ isPremium, accountId }}
            />
          </div>
        </div>
        <div
          className="d-flex flex-shrink-1 overflow-hidden mw-100"
          style={{ marginLeft: "2px" }}
        >
          <div className="flex-shrink-1 overflow-hidden">
            <Overlay>
              <div className="text-truncate text-muted">@{accountId}</div>
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
    </div>
    {blockHeight !== "now" && (
      <span>
        <Button
          className="text-nowrap"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fs-6 bi bi-three-dots-vertical" />
        </Button>
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
  </div>
);
