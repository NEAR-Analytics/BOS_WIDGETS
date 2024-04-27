// adapted from the `PublicTags` widget by zavodil.near

const accountId = props.accountId ?? context.accountId ?? "every.near";

const src = props.src ?? "apps.near/widget/demo";
const [creatorId, namespace, thingId] = src.split("/");

const blockheight = props.blockheight ?? "final";

const thingExists = Social.get(`${src}`, "final");

const tagsObject = Social.get(`${src}/metadata/tags/*`, blockheight);

if (!tagsObject) {
  return "";
}

const contextObject = Social.get(
  `*/${creatorId}/${namespace}/${thingId}/metadata/tags/*`,
  blockheight
);

if (!contextObject) {
  return "";
}

State.init({
  tagsObject,
});

const normalizeTag = (tag) =>
  tag
    .replaceAll(/[- \.]/g, "_")
    .replaceAll(/[^\w]+/g, "")
    .replaceAll(/_+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .toLowerCase()
    .trim("-");

const tagsCount = {};

const processTagsObject = (obj) => {
  Object.keys(obj).forEach((key) => {
    const normalizedKey = normalizeTag(key);
    if (obj[key] === null) {
      tagsCount[normalizedKey] = (tagsCount[normalizedKey] || 0) - 1;
    } else if (typeof obj[key] === "object") {
      processTagsObject(obj[key]);
    } else {
      tagsCount[normalizedKey] = (tagsCount[normalizedKey] || 0) + 1;
    }
  });
};

processTagsObject(State.update(tagsObject));

const getTags = () => {
  processTagsObject(contextObject);
  const tags = Object.entries(tagsCount);
  tags.sort((a, b) => b[1] - a[1]);
  return tags.map((t) => {
    return {
      name: t[0],
      count: t[1] - 1,
    };
  });
};

function updateTags(tags) {
  const newTagsObject = {};
  tags.forEach((tag) => {
    newTagsObject[normalizeTag(tag.name)] = "";
  });
  State.update({ tagsObject: newTagsObject });
}

const publicTags = getTags();

return (
  <>
    <div className="m-2">
      {publicTags.length > 0 ? (
        publicTags.map((tag) => (
          <a
            href={`/apps.near/widget/every.thing?context=${tag.name}`}
            className="text-white btn p-0 lh-1 m-1"
            key={tag.name}
          >
            <span
              className="badge bg-primary position-relative"
              style={{
                marginRight: tag.count > 1 ? "0.9em" : "0.25em",
                paddingRight: tag.count > 1 ? "0.85em" : undefined,
              }}
            >
              #{tag.name}
              {tag.count > 1 && (
                <span className="ms-1 badge translate-middle rounded-pill bg-dark position-absolute top-50 start-100">
                  {tag.count}
                </span>
              )}
            </span>
          </a>
        ))
      ) : (
        <p>No tags found.</p>
      )}
    </div>
    {thingExists && (
      <div className="m-1 d-flex flex-row">
        <div className="m-1">
          <Typeahead
            id={`tag-selector-${Date.now()}`}
            multiple
            labelKey="name"
            onChange={updateTags}
            options={publicTags}
            placeholder="dev, art, gov, edu, social"
            positionFixed
            allowNew
          />
        </div>
        <div className="m-1">
          {accountId === creatorId ? (
            <CommitButton
              disabled={state.tagsObject === null}
              data={{
                [namespace]: {
                  metadata: {
                    tags: state.tagsObject,
                  },
                },
              }}
            >
              <i className="bi bi-plus-lg" />
            </CommitButton>
          ) : (
            <CommitButton
              disabled={state.tagsObject === null}
              data={{
                [creatorId]: {
                  [namespace]: {
                    [thingId]: {
                      metadata: {
                        tags: state.tagsObject,
                      },
                    },
                  },
                },
              }}
            >
              <i className="bi bi-plus-lg"></i>
            </CommitButton>
          )}
        </div>
      </div>
    )}
  </>
);
