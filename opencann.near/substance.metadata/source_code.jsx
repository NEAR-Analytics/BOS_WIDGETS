const substance =
  props.substance ?? "#/opencann.near/widget/substanceDB.cannabis";
const substanceMetadata = props.substanceMetadata ?? {};
const options = props.options;
const onChange = props.onChange;

State.init({
  substanceMetadata,
  metadata: substanceMetadata,
  reportedMetadata: substanceMetadata,
  substance: metadata.substance ?? {},
  description: substanceMetadata.description,
  consumptionMethod: substanceMetadata.consumptionMethod ?? {},
  physicalEffects: substanceMetadata.physicalEffects ?? {},
  visualEffects: substanceMetadata.visualEffects ?? {},
  auditoryEffects: substanceMetadata.auditoryEffects ?? {},
  cognitiveEffects: substanceMetadata.cognitiveEffects ?? {},
  multisensoryEffects: substanceMetadata.multisensoryEffects ?? {},
  category: substanceMetadata.category ?? {},
  image: substanceMetadata.image,
  backgroundImage: substanceMetadata.backgroundImage,
  tags: substanceMetadata.tags ?? {},
  experiences: substanceMetadata.experiences ?? {},
});

const metadata = {
  substance: options.substance ? state.metadata.substance : undefined,
  description: options.description ? state.metadata.description : undefined,
  consumptionMethod:
    options.consumptionMethod && Object.keys(state.consumptionMethod).length > 0
      ? state.consumptionMethod
      : undefined,
  physicalEffects:
    options.physicalEffects &&
    state.physicalEffects &&
    Object.keys(state.physicalEffects).length > 0
      ? state.physicalEffects
      : undefined,
  visuallEffects:
    options.visuallEffects &&
    state.visuallEffects &&
    Object.keys(state.visuallEffects).length > 0
      ? state.visuallEffects
      : undefined,
  auditoryEffects:
    options.auditoryEffects &&
    state.auditoryEffects &&
    Object.keys(state.auditoryEffects).length > 0
      ? state.auditoryEffects
      : undefined,
  cognitiveEffects:
    options.cognitiveEffects &&
    state.cognitiveEffects &&
    Object.keys(state.cognitiveEffects).length > 0
      ? state.cognitiveEffects
      : undefined,
  multisensoryEffects:
    options.multisensoryEffects &&
    state.multisensoryEffects &&
    Object.keys(state.multisensoryEffects).length > 0
      ? state.multisensoryEffects
      : undefined,
  category:
    options.category && state.category && Object.keys(state.category).length > 0
      ? state.category
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
  experiences:
    options.experiences && Object.keys(state.experiences).length > 0
      ? state.experiences
      : undefined,
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
const onConsumptionMethodChange = debounce((e) => {
  State.update({
    consumptionMethod: {
      ...state.consumptionMethod,
      [e.target.id]: e.target.value,
    },
  });
});
const onPhysicalEffectsChange = debounce((e) => {
  State.update({
    physicalEffects: {
      ...state.physicalEffects,
      [e.target.id]: e.target.value,
    },
  });
});
const onVisualEffectsChange = debounce((e) => {
  State.update({
    visualEffects: {
      ...state.visualEffects,
      [e.target.id]: e.target.value,
    },
  });
});
const onAuditoryEffectsChange = debounce((e) => {
  State.update({
    auditoryEffects: {
      ...state.auditoryEffects,
      [e.target.id]: e.target.value,
    },
  });
});
const onCognitiveEffectsChange = debounce((e) => {
  State.update({
    cognitiveEffects: {
      ...state.cognitiveEffects,
      [e.target.id]: e.target.value,
    },
  });
});
const onMultisensoryEffectsChange = debounce((e) => {
  State.update({
    multisensoryEffects: {
      ...state.multisensoryEffects,
      [e.target.id]: e.target.value,
    },
  });
});
const onCategoryChange = debounce((e) => {
  State.update({
    category: {
      ...state.category,
      [e.target.id]: e.target.value,
    },
  });
});
const onExperiencesChange = debounce((e) => {
  State.update({
    experiences: {
      ...state.experiences,
      [e.target.id]: e.target.value,
    },
  });
});

return (
  <>
    {substance.name && (
      <div className="mb-2">
        {options.name.label ?? "Substance Name"}
        <input
          type="text"
          defaultValue={state.metadata.substance}
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
            substanceTagsObject: metadata.tags,
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
    {options.category &&
      (options.category.links ?? []).map((link) => (
        <div className="mb-2">
          {link.label}
          <div className="input-group">
            <span className="input-group-text">{link.prefix}</span>
            <input
              type="text"
              id={link.name}
              defaultValue={state.category[link.name]}
              onChange={onCategoryChange}
            />
          </div>
        </div>
      ))}
    {options.experiences &&
      (options.experiences.data ?? []).map((data) => (
        <div className="mb-2">
          {data.label}
          <div className="input-group">
            <span className="input-group-text">{data.prefix}</span>
            <input
              type="text"
              id={data.name}
              defaultValue={state.experiences[data.name]}
              onChange={onExperiencesChange}
            />
          </div>
        </div>
      ))}
    {options.physicalEffects &&
      (options.physicalEffects.data ?? []).map((data) => (
        <div className="mb-2">
          {data.label}
          <div className="input-group">
            <span className="input-group-text">{data.prefix}</span>
            <input
              type="text"
              id={data.name}
              defaultValue={state.physicalEffects[data.name]}
              onChange={onPhysicalEffectsChange}
            />
          </div>
        </div>
      ))}
    {options.visualEffects &&
      (options.visualEffects.data ?? []).map((data) => (
        <div className="mb-2">
          {data.label}
          <div className="input-group">
            <span className="input-group-text">{data.prefix}</span>
            <input
              type="text"
              id={data.name}
              defaultValue={state.visualEffects[data.name]}
              onChange={onVisualEffectsChange}
            />
          </div>
        </div>
      ))}
    {options.auditoryEffects &&
      (options.auditoryEffects.data ?? []).map((data) => (
        <div className="mb-2">
          {data.label}
          <div className="input-group">
            <span className="input-group-text">{data.prefix}</span>
            <input
              type="text"
              id={data.name}
              defaultValue={state.auditoryEffects[data.name]}
              onChange={onAuditoryEffectsChange}
            />
          </div>
        </div>
      ))}
    {options.cognitiveEffects &&
      (options.cognitiveEffects.data ?? []).map((data) => (
        <div className="mb-2">
          {data.label}
          <div className="input-group">
            <span className="input-group-text">{data.prefix}</span>
            <input
              type="text"
              id={data.name}
              defaultValue={state.cognitiveEffects[data.name]}
              onChange={onCognitiveEffectsChange}
            />
          </div>
        </div>
      ))}
    {options.multisensoryEffects &&
      (options.multisensoryEffects.data ?? []).map((data) => (
        <div className="mb-2">
          {data.label}
          <div className="input-group">
            <span className="input-group-text">{data.prefix}</span>
            <input
              type="text"
              id={data.name}
              defaultValue={state.multisensoryEffects[data.name]}
              onChange={onMultisensoryEffectsChange}
            />
          </div>
        </div>
      ))}
  </>
);
