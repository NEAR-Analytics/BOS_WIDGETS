//======= Get props =======
const defaultStateUpdate = (obj) => State.update(obj);
const stateUpdate = props.stateUpdate ?? defaultStateUpdate;

const isOverSaveButton = props.isOverSaveButton;
console.log(isOverSaveButton ? "si" : "no");
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

// Next function cames from parent widget. Not sure what it was used for.
// const filterTagsFromNull = (tagsObj) => {
//   const entries = Object.entries(tagsObj);

//   const result = entries.reduce((acc, value) => {
//     if (value[1] !== null) {
//       return [...acc, value[0]];
//     } else {
//       return acc;
//     }
//   }, []);
//   return result;
// };

console.log(state.note);

//======= Render =======
return (
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
        src="mob.near/widget/TagsEditor"
        props={{
          initialTagsObject: getTagObjectfromArray(articleTags),
          placeholder: "Input tags",
          setTagsObject: (tags) => {
            // console.log(filterTagsFromNull(tags));
            // Next line is from parent widget. Not sure what it was used for.
            // state.tags = filterTagsFromNull(tags);
            stateUpdate({ tags: tags });
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
);
