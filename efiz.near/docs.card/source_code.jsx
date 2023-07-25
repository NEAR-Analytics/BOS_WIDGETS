const path = props.path ?? "mob.near/widget/WidgetSource";
const [accountId, type, thingName] = path.split("/");
const blockHeight = props.blockHeight;
const metadata = props.metadata ?? Social.getr(`${path}/metadata`);

const image = metadata.image;

const handleProposal = () => {};

const handleCreate = () => {};

const Card = styled.div`
  position: relative;
  border-radius: 12px;
  justify-content: center;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  textOverflow: "ellipsis";
  whiteSpace: "nowrap";
  padding: 23px;
`;

const StarButton = styled.div`
  position: absolute;
  top: 23px;
  right: 17px;
`;

const ForkButton = styled.div`
  position: absolute;
  bottom: 23px;
  right: 19px;
`;

State.init({
  tag: "",
});

function setTag() {
  Social.set({
    every: {
      [type]: {
        // widget, thing, type, etc
        [accountId]: {
          // owner/creator
          [thingName]: {
            // name
            tags: {
              [state.tag]: "",
            },
          },
        },
      },
    },
  });
}

const tagsPattern = `*/every/${type}/${accountId}/${thingName}/tags/*`;
const tagsObject = Social.keys(tagsPattern, "final");

if (tagsObject === null) {
  return "Loading";
}

const tagsCount = {};
const tagsAuthors = {};

const processTagsObject = (obj) => {
  Object.entries(obj).forEach((kv) => {
    if (kv[1] === null) {
      const tag = kv[0];

      tagsCount[tag] = (tagsCount[tag] || 0) - 1;
    } else if (typeof kv[1] === "object") {
      processTagsObject(kv[1]);
    } else {
      const tag = kv[0];
      tagsCount[tag] = (tagsCount[tag] || 0) + 1;
    }
  });
};

const getTags = () => {
  processTagsObject(tagsObject);
  const tags = Object.entries(tagsCount);
  tags.sort((a, b) => b[1] - a[1]);
  return tags.map((t) => {
    return {
      name: t[0],
      count: t[1],
      title: t[1] + (t[1] > 1 ? " votes" : " vote"),
    };
  });
};

const publicTags = getTags();

return (
  <>
    <Card>
      <div className="row">
        <div className="col-8">
          <div className="m-1 mb-3 text-truncate">
            <Widget
              src="mob.near/widget/ProfileLine"
              props={{ accountId, link: "" }}
            />
          </div>
          <div className="m-1 position-relative">
            <h5 className="card-title mb-2">{name}</h5>
            <div className="text-truncate mb-1">
              <a className="stretched-link" href={`#/${path}`}>
                <i className="bi bi-box-arrow-up-right text-secondary me-1" />
                {path}
              </a>
            </div>
          </div>
          <div className="card-text">
            <a
              href={`#/mob.near/widget/WidgetSource?src=${path}`}
              className="btn btn-sm btn-outline-secondary border-0"
              target="_blank"
            >
              <i className="bi bi-code me-1"></i>source
            </a>
            <a
              href={`#/bozon.near/widget/WidgetHistory?widgetPath=${path}`}
              className="btn btn-sm btn-outline-secondary border-0"
              target="_blank"
            >
              <i className="bi bi-clock me-1"></i>history
            </a>
            <small className="text-nowrap text-muted m-1">
              <i className="bi bi-hourglass me-1"></i>
              <Widget
                src="mob.near/widget/TimeAgo"
                props={{ keyPath: path, now: props.metadata, blockHeight }}
              />
            </small>
          </div>
        </div>
      </div>
      {publicTags &&
        publicTags.map((tag) => (
          <div>
            <span
              className={"badge bg-success position-relative"}
              title={tag.title}
              style={
                tag.count > 1
                  ? {
                      marginRight: "0.9em",
                      paddingRight: "0.85em",
                    }
                  : { marginRight: "0.25em" }
              }
            >
              #{tag.name}
              {tag.count > 1 && (
                <span
                  className={`badge translate-middle rounded-pill bg-danger position-absolute top-50 start-100`}
                >
                  {tag.count}
                </span>
              )}
            </span>
          </div>
        ))}
      <div className="col-3">
        <StarButton>
          <a className="btn btn-success" href={`#/${path}`}>
            <i className="bi bi-eye-fill me-1"></i>
            view
          </a>
        </StarButton>
        <div className="">
          <input onChange={(e) => State.update({ tag: e.target.value })} />
          <button onClick={() => setTag()}>tag</button>
        </div>
        <ForkButton>
          <a className="btn btn-outline-success" href={`#/edit/${path}`}>
            <i className="bi bi-git me-1"></i>
            {accountId === context.accountId ? "edit" : "fork"}
          </a>
        </ForkButton>
      </div>
    </Card>
    {/**
    <Modal isOpen={false} onClose={() => State.update({ modalIsOpen: false })}>
      <h2>This is the Modal Content</h2>
      <p>Feel free to add any content here!</p>
    </Modal>
    */}
  </>
);
