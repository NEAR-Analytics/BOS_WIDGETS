const tagsPattern = props.tagsPattern ?? "*/profile/tags/*";
const placeholder = props.placeholder ?? "Tags";
const initialTagsObject = props.initialTagsObject || {};

const normalizeTag = (tag) =>
  tag
    .replaceAll(/[- \.]/g, "_")
    .replaceAll(/[^\w]+/g, "")
    .replaceAll(/_+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .toLowerCase()
    .trim("-");

return (
  <>
    <Typeahead
      id={state.id}
      multiple
      labelKey="name"
      onChange={setTags}
      options={[]}
      placeholder={placeholder}
      selected={state.tags}
      positionFixed
      allowNew
    />
    {props.debug && (
      <div>
        Debugging tags:
        <pre>{JSON.stringify(state.tags)}</pre>
      </div>
    )}
  </>
);
