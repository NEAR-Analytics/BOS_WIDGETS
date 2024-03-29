const { Button } = VM.require("abdullahi3000.near/widget/components") || {
  Button: () => <></>,
};

const StyledPost = styled.div`
  margin-bottom: 1rem;
  .post {
    border-radius: 16px;
    border: 1px solid var(--stroke-color, rgba(255, 255, 255, 0.2));
    color: var(--font-muted-color, #b6b6b8);
    padding: 24px !important;
    background-color: var(--post-bg, #23242b);
    transition: all 300ms;

    &:hover {
      background-color: var(--post-bg-hover, #17181c) !important;
      .expand-post {
        background-image: linear-gradient(
          to bottom,
          var(--post-bg-hover-transparent, rgba(23, 24, 28, 0)),
          var(--post-bg-hover, #17181c) 25%
        ) !important;
      }
    }

    .post-header {
      span,
      .text-muted {
        color: var(--font-color, #fff) !important;
      }
    }

    .buttons {
      border-top: 1px solid #3c3d43;
      padding: 0.5rem;
    }

    .expand-post {
      background-image: linear-gradient(
        to bottom,
        var(--post-bg-transparent, rgba(35, 36, 43, 0)),
        var(--post-bg, rgba(35, 36, 43, 1)) 25%
      ) !important;
    }
  }

  .dropdown-menu {
    background-color: var(--post-bg, #000000) !important;
    color: var(--font-color, #fff) !important;

    li.dropdown-item {
      color: var(--font-color, #fff) !important;
      &:hover {
        a {
          color: var(--post-bg, #000000) !important;
        }
      }
    }

    .link-dark,
    .dropdown-item {
      color: var(--font-color, #fff) !important;

      &:hover {
        color: var(--post-bg, #000000) !important;

        span {
          color: var(--post-bg, #000000) !important;
        }
      }
    }
  }

  textarea {
    color: #b6b6b8 !important;
  }
`;

const Wrapper = styled.div`
  margin: 0 -12px;
  line-height: normal;

  .post {
    position: relative;
    padding: 12px;
    padding-bottom: 4px;
    display: flex;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: 16px !important;
    }
    @media (max-width: 767px) {
      font-size: 15px !important;
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-size: 15px !important;
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    strong,
    b {
      font-weight: 500 !important;
    }
    ol,
    ul,
    dl {
      margin-bottom: 0.5rem;
      white-space: inherit;
    }
    p {
      margin-bottom: 0.5rem;
    }
    hr {
      display: none;
    }
    img {
      border-radius: var(--bs-border-radius-lg);
      max-height: 40em;
    }
    th {
      min-width: 5em;
    }

    .table > :not(caption) > * > * {
      padding: 0.3rem;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
      .expand-post {
        background-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0),
          rgba(247.35, 247.35, 247.35, 1) 25%
        );
      }
    }

    .post-header {
      margin: 4px 0;
    }
  }

  .post:not(:last-child):before {
    content: "";
    position: absolute;
    left: 30px;
    top: 56px;
    bottom: 0;
    width: 2px;
    background-color: #ddd;
    z-index: -1;
  }

  .post:not(:first-child):after {
    content: "";
    position: absolute;
    left: 30px;
    top: 0;
    width: 2px;
    height: 8px;
    background-color: #ddd;
    z-index: -1;
  }

  .left {
    margin-right: 12px;
    width: auto;
    overflow: hidden;
  }
  .right {
    margin-top: -4px;
    flex-grow: 1;
    min-width: 0;
  }

  .buttons-placeholder {
    padding-bottom: 10px;
  }

  .buttons {
    margin-top: 10px;
    margin-bottom: 6px;
    column-gap: 4px;
    color: #888;
  }

  .reposted {
    padding-top: 30px;
  }
`;

const RepostWidgetDesktop = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const RepostWidgetMobile = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;
const accountId = "abdullahi3000.near";
if (!accountId) {
  return "No accountId";
}
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const pinned = !!props.pinned;
const hideMenu = !!props.hideMenu;
const hideButtons = !!props.hideButtons;
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/main`, blockHeight) ?? "null");
const subscribe = !!props.subscribe;
const raw = !!props.raw;
const groupId = props.groupId ?? content.groupId;
const indexKey = props.indexKey;
const permissions = props.permissions;
const fullPostLink = props.fullPostLink;
const customActions = props.customActions;

const notifyAccountId = accountId;
const item = {
  type: "social",
  path: `${accountId}/post/main`,
  blockHeight,
};

const modifications = Social.index("modify", item, { limit: 1, order: "desc" });

const [isEdited, setIsEdited] = useState(false);

if (modifications.length) {
  const modification = modifications[0].value;
  if (modification.type === "edit") {
    content = modification.value;
    setIsEdited(true);
  } else if (modification.type === "delete") {
    return <></>;
  }
}

const link =
  props.link ??
  props.fullPostLink ??
  `/abdullahi3000.near/widget/MainPage.N.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

const contentWidget = <>'hello'</>;

return (
  <>
    <StyledPost
      key={`Post-${item.path}-${item.blockHeight}`}
      style={{ width: props.width ? props.width : "auto" }}
    >
      <Wrapper
        className="w-100 mx-auto"
        style={
          props.hideComments || props.noBorder
            ? undefined
            : {
                borderBottom: "1px solid #eee",
              }
        }
      >
        <div className={`post ${props.reposted ? "reposted" : ""}`}>
          <div className="right d-flex flex-column gap-3">
            <Widget
              src="abdullahi3000.near/widget/components.post.Header"
              loading=""
              props={{
                accountId: accountId,
                blockHeight: modifications[0].blockHeight ?? blockHeight,
                pinned: pinned,
                hideMenu: hideMenu,
                link: link,
                postType: "post",
                item: item,
                content: content,
                customActions: customActions,
                modalToggles: props.modalToggles,
                setItem: props.setItem,
                isEdited: isEdited,
              }}
            />
            {fullPostLink ? (
              <a
                key="full-post-link"
                target="_blank"
                href={fullPostLink}
                className="text-decoration-none link-dark"
              >
                {contentWidget}
              </a>
            ) : (
              contentWidget
            )}
            {props.customButtons ? (
              props.customButtons
            ) : !pinned && !hideButtons && blockHeight !== "now" ? (
              <div className="buttons d-flex justify-content-between">
                <Widget
                  loading=""
                  src="mob.near/widget/N.LikeButton"
                  props={{
                    notifyAccountId,
                    item,
                  }}
                />
                <Widget
                  loading=""
                  src="mob.near/widget/MainPage.N.Post.ShareButton"
                  props={{ accountId, blockHeight, postType: "post", groupId }}
                />
              </div>
            ) : (
              <div className="buttons-placeholder" />
            )}
          </div>
        </div>
      </Wrapper>
    </StyledPost>
  </>
);
