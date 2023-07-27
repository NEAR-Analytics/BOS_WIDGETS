const initialMetadata = props.initialMetadata ?? {};
const onChange = props.onChange;
const options = props.options;

console.log(props);

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
  platform: "jutsu.ai",
};

if (
  onChange &&
  JSON.stringify(state.reportedMetadata) !== JSON.stringify(metadata)
) {
  State.update({
    reportedMetadata: metadata,
  });
  onChange(metadata);
}

return (
  <>
    {options.name && (
      <div className="mb-2" style={{ color: props.theme.textColor }}>
        {options.name.label ?? "Name"}
        <input
          style={{
            backgroundColor: props.theme.backgroundColor,
            borderColor: props.theme.borderColor,
            color: props.theme.textColor,
          }}
          type="text"
          value={state.metadata.name}
        />
      </div>
    )}
    {options.image && (
      <div className="mb-2" style={{ color: props.theme.textColor }}>
        {options.image.label ?? "Image"}
        <Widget
          src="saidulbadhon.near/widget/EditorPage.Metadata.ImageEditorTabs"
          props={{
            image: state.image,
            onChange: (image) => State.update({ image }),
            theme: props.theme,
          }}
        />
      </div>
    )}
    {options.backgroundImage && (
      <div className="mb-2" style={{ color: props.theme.textColor }}>
        {options.backgroundImage.label ?? "Background image"}
        <Widget
          src="saidulbadhon.near/widget/EditorPage.Metadata.ImageEditorTabs"
          props={{
            image: state.backgroundImage,
            onChange: (backgroundImage) => State.update({ backgroundImage }),
            theme: props.theme,
          }}
        />
      </div>
    )}
    {options.description && (
      <div className="mb-2" style={{ color: props.theme.textColor }}>
        {options.description.label ?? "Description"}
        <span className="text-secondary"> (supports markdown)</span>
        <textarea
          className="form-control"
          style={{
            backgroundColor: props.theme.backgroundColor,
            borderColor: props.theme.borderColor,
          }}
          rows={5}
          value={state.metadata.description}
          onChange={(e) => {
            state.metadata.description = e.target.value;
            State.update();
          }}
        />
      </div>
    )}
    {options.tags && (
      <div className="mb-2" style={{ color: props.theme.textColor }}>
        {options.tags.label ?? "Tags"}
        <Widget
          src="saidulbadhon.near/widget/EditorPage.Metadata.TagsEditor"
          props={{
            initialTagsObject: metadata.tags,
            tagsPattern: options.tags.pattern,
            placeholder:
              options.tags.placeholder ??
              "rust, engineer, artist, humanguild, nft, learner, founder",
            setTagsObject: (tags) => {
              state.metadata.tags = tags;
              State.update();
            },
            theme: props.theme,
          }}
        />
      </div>
    )}
    {options.linktree &&
      (options.linktree.links ?? []).map((link) => (
        <div className="mb-2" style={{ color: props.theme.textColor }}>
          {link.label}
          <div className="input-group">
            <span
              className="input-group-text"
              style={{
                backgroundColor: props.theme.borderColor,
                borderColor: props.theme.borderColor,
                color: props.theme.textColor2,
              }}
            >
              {link.prefix}
            </span>
            <input
              type="text"
              value={state.linktree[link.name]}
              style={{
                backgroundColor: props.theme.backgroundColor,
                borderColor: props.theme.borderColor,
              }}
            />
          </div>
        </div>
      ))}
  </>
);
