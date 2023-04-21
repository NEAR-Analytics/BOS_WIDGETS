const Container = styled.div`
  .rbt-input-multi{
     display:flex;
     align-items:center;
     background-color: rgba(26, 46, 51, 0.25);
     border: 1px solid rgba(255, 255, 255, 0.3);
     border-radius: 10px;
     height: 47px;
     width:100%;
     color:rgba(255, 255, 255, 0.3);
     padding:0 10px;
  }
  .rbt-input-multi.focus{
    box-shadow:none;
  }
  .rbt-input-multi .rbt-input-wrapper{
    width:100%;
  }
  .dropdown-menu{
    background: #13181A;
    border: 1px solid #3A4244;
    border-radius: 10px;
    margin-top:3px;
  }
  .dropdown-menu .dropdown-item {
    font-weight: 500;
    font-size: 16px;
    color:#fff;
    text-decoration:none;
  }
  .dropdown-menu .dropdown-item:hover{
    background-color:#304352;
  }
  .rbt-token{
    display:flex;
    align-items:center;
    height:26px;
    background-color:rgba(26, 46, 51, 0.25);
    border: 0.5px solid rgba(255, 255, 255, 0.3);
    border-radius: 38px;
    color:#fff;
    padding:0 10px;
  }
  .rbt-token .rbt-token-remove-button{
      align-items:center;
  }
  .rbt-token-label {
      padding:0;
  }
  .btn-close{
    padding:0;
    color:#7E8A93;
    font-weight: 700;
  }
`;
const tagsPattern = props.tagsPattern ?? "*/profile/tags/*";
const placeholder = props.placeholder ?? "Tags";
const initialTagsObject = props.initialTagsObject || {};

const tagsObject = Social.keys(tagsPattern, "final");

if (tagsObject === null) {
  return "Loading";
}

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
  Object.entries(obj).forEach((kv) => {
    if (typeof kv[1] === "object") {
      processTagsObject(kv[1]);
    } else {
      const tag = normalizeTag(kv[0]);
      tagsCount[tag] = (tagsCount[tag] || 0) + 1;
    }
  });
};

const getTags = () => {
  processTagsObject(tagsObject);
  const tags = Object.entries(tagsCount);
  tags.sort((a, b) => b[1] - a[1]);
  return tags.map((t) => ({
    name: t[0],
    count: t[1],
  }));
};

if (!state.allTags) {
  initState({
    allTags: getTags(),
    tags: Object.keys(initialTagsObject).map((tag) => ({
      name: normalizeTag(tag),
    })),
    originalTags: Object.fromEntries(
      Object.keys(initialTagsObject).map((tag) => [tag, null])
    ),
    id: `tags-selector-${Date.now()}`,
  });
}

const setTags = (tags) => {
  tags = tags.map((o) => {
    o.name = normalizeTag(o.name);
    return o;
  });
  State.update({ tags });
  if (props.setTagsObject) {
    props.setTagsObject(
      Object.assign(
        {},
        state.originalTags,
        Object.fromEntries(tags.map((tag) => [tag.name, ""]))
      )
    );
  }
};

return (
  <Container>
    <Typeahead
      id={state.id}
      multiple
      labelKey="name"
      onChange={setTags}
      options={state.allTags}
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
  </Container>
);
