// adapted from the `PublicTags` widget by zavodil.near

const accountId = props.accountId ?? context.accountId ?? "every.near";

const src = props.src ?? "apps.near/widget/demo";
const [creatorId, namespace, thingId] = src.split("/");

const blockheight = props.blockheight ?? "final";

const thingExists = Social.get(`${creatorId}/${namespace}/${thingId}`, "final");

const tagsObject = Social.get(
  `${creatorId}/${namespace}/${thingId}/metadata/tags/*`,
  blockheight
);

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

const contextObject = Social.get(
  `*/${creatorId}/${namespace}/${thingId}/metadata/tags/*`,
  blockheight
);

const tagsCount = {};
const tagsAuthors = {};

const processTagsObject = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null) {
      const tag = key;
      tagsCount[tag] = (tagsCount[tag] || 0) - 1;
    } else if (typeof obj[key] === "object") {
      processTagsObject(obj[key]);
    } else {
      const tag = key;
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
    };
  });
};

const setTags = (tags) => {
  const newTagsObject = {};

  tags.forEach((tag) => {
    newTagsObject[normalizeTag(tag.name)] = "";
  });

  State.update((prevState) => ({
    ...prevState,
    tagsObject: {
      ...prevState.tagsObject[creatorId][namespace][thingId].tags,
      ...newTagsObject,
    },
  }));
};

const publicTags = getTags();

return (
  <>
    <div className="m-2">
      {publicTags &&
        publicTags.map((tag) => (
          <a
            href={`/#/hack.near/widget/every.context?tag=${tag.name}`}
            className="text-white btn p-0 lh-1 m-1"
            key={tag}
          >
            <span
              className="badge bg-primary position-relative"
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
                  className={`ms-1 badge translate-middle rounded-pill bg-dark position-absolute top-50 start-100`}
                >
                  {tag.count}
                </span>
              )}
            </span>
          </a>
        ))}
    </div>
    {thingExists && (
      <div className="m-1 row">
        <div className="m-1 col-8">
          <Typeahead
            id={`tag-selector-${Date.now()}`}
            multiple
            labelKey="name"
            onChange={setTags}
            options={publicTags}
            placeholder="dev, art, gov, edu, social"
            positionFixed
            allowNew
          />
        </div>
        <div className="m-1 col-3">
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
