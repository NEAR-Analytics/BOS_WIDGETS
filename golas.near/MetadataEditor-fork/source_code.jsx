const initialMetadata = props.initialMetadata ?? {};
const onChange = props.onChange;
const options = props.options;

State.init({
  initialMetadata,
  metadata: initialMetadata,
  reportedMetadata: initialMetadata,
  linktree: initialMetadata.linktree ?? {},
  image: initialMetadata.image,
  backgroundImage: initialMetadata.backgroundImage,
  screenshots: initialMetadata.screenshots ?? {},
});

const metadata = {
  name: options.name ? state.metadata.name : undefined,
  description: options.name ? state.metadata.description : undefined,
  linktree:
    options.linktree && Object.keys(state.linktree).length > 0
      ? state.linktree
      : undefined,
  image:
    options.image && state.image && Object.keys(state.image).length > 0
      ? state.image
      : undefined,
  backgroundImage:
    options.backgroundImage &&
    state.backgroundImage &&
    Object.keys(state.backgroundImage).length > 0
      ? state.backgroundImage
      : undefined,
  tags: options.tags ? state.metadata.tags : undefined,
  screenshots: options.screenshots ? state.metadata.screenshots : undefined,
};

const ccc = "0";

// if (
//   onChange &&
//   JSON.stringify(state.reportedMetadata) !== JSON.stringify(metadata)
// ) {
//   ccc = "1";
//   State.update({
//     reportedMetadata: metadata,
//   });
//   onChange(metadata);
//   ccc = "2";
// }

const onClickX = () => {
  console.log("PPP-1");
  console.log("state.reportedMetadata", state.reportedMetadata);
  console.log("metadata", metadata);
  onChange(metadata);
};

const handleOnChange = (e) => {
  console.log("e", e);
  const { id, value } = e.target;
  const newMetadata = { ...metadata, [id]: value };

  console.log("id", id);
  console.log("value", value);
  console.log("newMetadata", newMetadata);

  onChange(newMetadata);
  State.update({
    metadata: newMetadata,
  });
};

const handleImage = (image) => {
  const newMetadata = { ...metadata, image };
  State.update(metadata: newMetadata,);
  onChange(newMetadata);
};

const handleBackgroundImage = (backgroundImage) => {
  const newMetadata = { ...metadata, backgroundImage };
  State.update(metadata: newMetadata,);
  onChange(newMetadata);
};

const handleTags = (tags) => {
  const newMetadata = { ...metadata, tags };
  State.update(metadata: newMetadata,);
  onChange(newMetadata);
};

return (
  <>
    <div onClick={onClickX}>{ccc}</div>
    {options.name && (
      <div className="mb-2">
        {options.name.label ?? "Name"}
        <input
          onChange={handleOnChange}
          id="name"
          type="text"
          value={state.metadata.name}
        />
      </div>
    )}
    {options.image && (
      <div className="mb-2">
        {options.image.label ?? "Image"}
        <Widget
          src="mob.near/widget/ImageEditorTabs"
          props={{
            image: state.image,
            onChange: handleImage,
          }}
        />
      </div>
    )}
    {options.backgroundImage && (
      <div className="mb-2">
        {options.backgroundImage.label ?? "Background image"}
        <Widget
          src="mob.near/widget/ImageEditorTabs"
          props={{
            image: state.backgroundImage,
            onChange: handleBackgroundImage,
          }}
        />
      </div>
    )}
    {options.description && (
      <div className="mb-2">
        {options.description.label ?? "Description"}
        <span className="text-secondary"> (supports markdown)</span>
        <textarea
          className="form-control"
          rows={5}
          id="description"
          value={state.metadata.description}
          onChange={handleOnChange}
        />
      </div>
    )}
    {options.tags && (
      <div className="mb-2">
        {options.tags.label ?? "Tags"}
        <Widget
          src="mob.near/widget/TagsEditor"
          props={{
            initialTagsObject: metadata.tags,
            tagsPattern: options.tags.pattern,
            placeholder:
              options.tags.placeholder ??
              "rust, engineer, artist, humanguild, nft, learner, founder",
            setTagsObject: handleTags,
          }}
        />
      </div>
    )}
    {options.linktree &&
      (options.linktree.links ?? []).map((link) => (
        <div className="mb-2">
          {link.label}
          <div className="input-group">
            <span className="input-group-text">{link.prefix}</span>
            <input type="text" value={state.linktree[link.name]} />
          </div>
        </div>
      ))}
  </>
);
