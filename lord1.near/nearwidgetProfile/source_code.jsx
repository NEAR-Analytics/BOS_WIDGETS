const accountId = props.accountId ?? context.accountId ?? "";
const themeColor = props.themeColor?.profileInlineBlock;
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const fast = props.fast ?? !props.profile;

const name = profile.name;
const description = profile.description;
const tags = Object.keys(profile.tags ?? {});

const imgWrapperStyle = { height: "3em", width: "3em" };

return (
  <div className="d-flex flex-row">
    <div className="me-2">
      <Widget
        src="mob.near/widget/ProfileImage"
        loading={<div style={imgWrapperStyle} />}
        props={{
          fast,
          profile,
          accountId,
          widgetName,
          style: imgWrapperStyle,
          imageClassName: "rounded-circle w-100 h-100",
        }}
      />
    </div>
    <div className="text-truncate">
      <div className="text-truncate">
        <span style={{ color: themeColor?.name }} className="fw-bold ">
          {name}
        </span>
        <Widget
          loading=""
          src="mob.near/widget/Checkmark"
          props={{ accountId }}
        />
        <small>
          <span
            style={{ color: themeColor?.accountId }}
            className="font-monospace"
          >
            @{accountId}
          </span>
        </small>
      </div>
      <div className="text-truncate ">
        {tags.length > 0 && (
          <>
            {tags.map((tag, i) => (
              <span
                style={{ color: themeColor?.tag }}
                key={i}
                className="me-1 fw-light badge border border-secondary "
              >
                #{tag}
              </span>
            ))}
          </>
        )}
        {!props.hideDescription && (
          <span style={{ color: themeColor?.description }}>{description}</span>
        )}
      </div>
    </div>
  </div>
);
