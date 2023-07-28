const { title, tags, accountId, subtitle, profile, navegateTo } = props;
/*
====================================================Tags example==================================================
    tags: [
        {
            text: string,
            href: string,
        },
    ]
==========(When modified to be web app we should delete action to replace it with a propper State.update)=========

==================================================Subtitle example================================================
    subtitle: {
        text: string,
        action: {
            href: string,
            target: string (set "_blank" for opening it in another tab or "_self" to open it in the current one)
        }
    }
    
==========(When modified to be web app we should delete action to replace it with a propper State.update)=========
*/

//==========================(When modified to be web app we should change this logic)=============================

if (!accountId || !title) {
  const basicPropMissingMsg = "The following props are missing:";
  return (
    <div>
      <h3 className="text-danger">{basicPropMissingMsg}</h3>
      <ul>
        {!title && <li className="text-danger">title</li>}
        {!accountId && <li className="text-danger">accountId</li>}
      </ul>
    </div>
  );
}

State.init({ hover: false });

if (!profile) profile = Social.getr(`${accountId}/profile`);

const name = profile.name;

function getSubtitleColor() {
  state.hover ? { color: "#D0D6D9" } : { color: "#828688" };
}

const inner = (
  <div className="d-flex flex-row mx-1">
    <Widget
      src="mob.near/widget/ProfileImage"
      props={{
        metadata,
        accountId,
        widgetName,
        style: {
          height: "2.5em",
          width: "2.5em",
          minWidth: "2.5em",
          overflow: "hidden",
        },
        className: "me-2 rounded-pill",
      }}
    />
  </div>
);

//============================================Styled components==================================================
const CardContainer = styled.a`
    color: black;
    font-size: 16px;
    line-height: 19.2px;
    font-family: inherit;
    box-shadow: 0px 0px 30px 0px #0000000D;
    cursor: pointer;
    with: fit-content;
    min-width: 18rem;
    display: flex;
    flex-wrap: nowrap;

    &:hover {
        color: white;
        text-decoration: none;
        background: linear-gradient(90deg, rgba(147,51,234,1) 0%, rgba(79,70,229,1) 100%);
    }
`;
//============================================End styled components==============================================
console.log(0, tags.length);

return (
  <div className="card-body" href={navegateTo}>
    <CardContainer
      onMouseEnter={State.update({ hover: true })}
      onMouseLeave={State.update({ hover: false })}
      className="p-3 rounded row"
    >
      <div className="d-flex col flex-grow-1">
        {props.tooltip ? (
          <Widget
            src="mob.near/widget/Profile.OverlayTrigger"
            props={{ accountId, children: inner }}
          />
        ) : (
          inner
        )}
        <div className="text-truncate lh-sm">
          <div className="text-truncate" style={{ fontWeight: "500" }}>
            {title}
          </div>
          {subtitle && (
            <a
              className="text-truncate text-muted"
              href={subtitle.action.href ?? "#"}
              target={subtitle.action.target ?? "_blank"}
            >
              <small>
                <span style={getSubtitleColor()}>{subtitle.text}</span>
              </small>
            </a>
          )}
        </div>
      </div>
      {tags.length > 0 && (
        <div
          className="d-flex justify-content-center align-items-center flex-wrap p-2 w-50 bg-light rounded"
          style={{ maxWidth: "fit-content" }}
        >
          {tags.map((tag) => {
            if (!tag.href || !tag.text) {
              return <p className="text-danger">Wrong props</p>;
            }
            return (
              <a className="m-1" href={tag.href}>
                <Widget
                  src="rubycop.near/widget/NDC.StyledComponents"
                  props={{
                    Tag: {
                      title: tag.text,
                      className: "white",
                    },
                  }}
                />
              </a>
            );
          })}
        </div>
      )}
    </CardContainer>
  </div>
);
