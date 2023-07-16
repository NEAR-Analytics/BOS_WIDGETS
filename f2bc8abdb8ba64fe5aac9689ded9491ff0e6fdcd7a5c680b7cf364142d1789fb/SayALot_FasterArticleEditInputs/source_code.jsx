//======= Get props =======
const defaultStateUpdate = (obj) => State.update(obj);
const stateUpdate = props.stateUpdate ?? defaultStateUpdate;

const saveHandler = props.saveHandler;
const isSaving = props.isSaving;
const articleTags = props.articleTags ?? [];
const textAreaInitialText = props.firstTextareaText ?? "";
const isDebug = props.isDebug;

//======= Initialisation =======

State.init({ textAreaText: textAreaInitialText });
const authorForWidget =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

//======= Functions =======

const getTagObjectfromArray = (tagArray) => {
  if (!tagArray) return {};
  return tagArray.reduce((acc, value) => ({ ...acc, [value]: "" }), {});
};

//======= Render =======
return (
  <>
    {/* === BUTTON - EDIT ARTICLE === */}
    <div className="d-flex justify-content-center w-100">
      <button
        type="button"
        className="btn btn-outline-success mx-1"
        style={{ minWidth: "120px" }}
        onClick={saveHandler}
        onMouseEnter={() =>
          stateUpdate({ note: state.textAreaText, tags: state.tags })
        }
      >
        {isSaving && (
          <div
            className="spinner-border text-secondary"
            style={{ height: "1rem", width: "1rem" }}
            role="status"
          >
            <span className="sr-only" title="Loading..."></span>
          </div>
        )}
        Save Article
      </button>

      <button
        type="button"
        className="btn btn-outline-danger mx-1"
        style={{ minWidth: "120px" }}
        onClick={() => {
          stateUpdate({
            editArticle: false,
          });
        }}
      >
        Close
      </button>
    </div>
    <hr />
    <div className="d-flex gap-2" style={{ minHeight: "300px" }}>
      <div className="w-50">
        <Widget
          src="mob.near/widget/MarkdownEditorIframe"
          props={{
            initialText: state.textAreaText,
            onChange: (textAreaText) => State.update({ textAreaText }),
          }}
        />
      </div>
      <div className="w-50">
        <Widget
          src={`f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/TagsEditor`}
          props={{
            initialTagsObject: getTagObjectfromArray(articleTags),
            placeholder: "Input tags",
            setTagsObject: (tags) => {
              State.update({ tags });
            },
          }}
        />

        <Widget
          src="mob.near/widget/SocialMarkdown"
          props={{
            text: state.textAreaText,
            onHashtag: (hashtag) => (
              <span
                key={hashtag}
                className="d-inline-flex"
                style={{ fontWeight: 500 }}
              >
                <a
                  href={
                    isDebug
                      ? `https://near.social/#/${authorForWidget}/widget/SayALot_ArticlesByTag?tag=${hashtag}&isDebug=true`
                      : `https://near.social/#/${authorForWidget}/widget/SayALot_ArticlesByTag?tag=${hashtag}`
                  }
                >
                  #{hashtag}
                </a>
              </span>
            ),
          }}
        />
      </div>
    </div>
  </>
);
