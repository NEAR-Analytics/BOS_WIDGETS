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
  source: initialMetadata.source ?? {},
  schema: initialMetadata.schema ?? {},
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
  source: options.source ? state.metadata.source : undefined,
  schema: options.schema ? state.metadata.schema : undefined,
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
const debounce = (func, wait) => {
  const pause = wait || 350;
  let timeout;
  return (args) => {
    const later = () => {
      clearTimeout(timeout);
      func(args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, pause);
  };
};
const onNameChange = debounce((e) => {
  State.update({
    metadata: {
      ...state.metadata,
      name: e.target.value,
    },
  });
});
const onDescriptionChange = debounce((e) => {
  State.update({
    metadata: {
      ...state.metadata,
      description: e.target.value,
    },
  });
});
const onLinkTreeChange = debounce((e) => {
  State.update({
    linktree: {
      ...state.linktree,
      [e.target.id]: e.target.value,
    },
  });
});
const onSkillsChange = debounce((e) => {
  State.update({
    skills: {
      ...state.skills,
      [e.target.id]: e.target.value,
    },
  });
});
const onSourceChange = debounce((e) => {
  State.update({
    source: {
      ...state.source,
      [e.target.id]: e.target.value,
    },
  });
});
const onSchemaChange = debounce((e) => {
  State.update({
    schema: {
      ...state.schema,
      [e.target.id]: e.target.value,
    },
  });
});
return (
  <>
    {options.name && (
      <div className="mb-2">
        {options.name.label ?? "Name"}
        <input
          type="text"
          defaultValue={state.metadata.name}
          onChange={onNameChange}
        />
      </div>
    )}
    {options.image && (
      <div className="mb-2">
        {options.image.label ?? "Image"}
        <Widget
          src="near/widget/ImageEditorTabs"
          props={{
            image: state.image,
            onChange: (image) => State.update({ image }),
          }}
        />
      </div>
    )}
    {options.backgroundImage && (
      <div className="mb-2">
        {options.backgroundImage.label ?? "Background image"}
        <Widget
          src="near/widget/ImageEditorTabs"
          props={{
            image: state.backgroundImage,
            onChange: (backgroundImage) => State.update({ backgroundImage }),
            debounce,
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
          defaultValue={state.metadata.description}
          onChange={onDescriptionChange}
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
            setTagsObject: (tags) => {
              state.metadata.tags = tags;
              State.update();
            },
          }}
        />
      </div>
    )}
    {options.source && (
      <div className="mb-2">
        <Widget
          src="hyperfiles.near/widget/source.edit"
          props={{
            initialSourceObject: state.metadata.source,
            sourcePattern: options.source.pattern,
            placeholder: options.source.placeholder ?? "",
            setSourceObject: (source) => {
              state.metadata.source = source;
              State.update();
              onChange({ ...state.metadata, source }); // Trigger parent onChange with new metadata
            },
          }}
        />
      </div>
    )}
    {options.schema && (
      <div className="mb-2">
        <Widget
          src="hyperfiles.near/widget/schema.array"
          props={{
            initialSchemaObject: state.metadata.schema,
            schemaPattern: options.schema.pattern,
            placeholder: options.schema.placeholder ?? "",
            setSchemaObject: (schema) => {
              state.metadata.schema = schema;
              State.update();
              onChange({ ...state.metadata, schema }); // Trigger parent onChange with new metadata
            },
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
            <input
              type="text"
              id={link.name}
              defaultValue={state.linktree[link.name]}
              onChange={onLinkTreeChange}
            />
          </div>
        </div>
      ))}
  </>
);
