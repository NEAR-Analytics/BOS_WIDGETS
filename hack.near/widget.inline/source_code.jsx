const accountId = "hack.near";
const Card = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  justify-content: center;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  padding: 23px;
  margin: 8px;
`;

const StarButton = styled.div`
  position: absolute;
  top: 23px;
  right: 18px;
`;

const ForkButton = styled.div`
  position: absolute;
  bottom: 23px;
  right: 18px;
`;

return (
  <Card>
    <div className="row m-2">
      <div className="col-8">
        <div className="m-1 mb-3 text-truncate">
          <Widget
            src="near/widget/AccountProfile"
            props={{ accountId, link: props.profileLink }}
          />
        </div>
        <div className="m-1 position-relative">
          <h5 className="card-title mb-2">{name}</h5>
          <div className="text-truncate mb-1">
            <a className="stretched-link" href={`#/${widgetPath}`}>
              <i className="bi bi-box-arrow-up-right text-secondary me-1" />
              {widgetPath}
            </a>
          </div>
        </div>
        <div className="card-text">
          <a
            href={`#/mob.near/widget/WidgetSource?src=${widgetPath}`}
            className="btn btn-sm btn-outline-secondary border-0"
            target="_blank"
          >
            <i className="bi bi-code me-1"></i>source
          </a>
          <a
            href={`#/bozon.near/widget/WidgetHistory?widgetPath=${widgetPath}`}
            className="btn btn-sm btn-outline-secondary border-0"
            target="_blank"
          >
            <i className="bi bi-clock me-1"></i>history
          </a>
          <div className="mt-1">
            <small className="text-nowrap text-muted">
              updated:
              <i className="bi bi-hourglass me-1"></i>
              <Widget
                src="mob.near/widget/TimeAgo"
                props={{
                  keyPath: widgetPath,
                  now: props.metadata,
                  blockHeight,
                }}
              />
            </small>
          </div>
        </div>
      </div>
      <div className="col-4 d-flex flex-column align-items-end">
        <StarButton>
          {starCount && (
            <h5>
              {starCount} builder{starCount !== 1 && "s"}
            </h5>
          )}
          <Widget src="hack.near/widget/star.button" props={{ widgetPath }} />
        </StarButton>
        <ForkButton>
          <a className="btn btn-outline-success" href={`#/edit/${widgetPath}`}>
            <i className="bi bi-git me-1"></i>
            {accountId === context.accountId ? "edit" : "fork"}
          </a>
        </ForkButton>
      </div>
    </div>
  </Card>
);
