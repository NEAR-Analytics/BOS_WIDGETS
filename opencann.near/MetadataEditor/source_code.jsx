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
  demographics: initialMetadata.demographics ?? {},
  skills: initialMetadata.skills ?? {},
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
  demographics:
    options.demographics && Object.keys(state.demographics).length > 0
      ? state.demographics
      : undefined,
  skills: options.skills ? state.metadata.skills : undefined,
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
const onDemographicsChange = debounce((e) => {
  State.update({
    demographics: {
      ...state.demographics,
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
    {options.demographics &&
      (options.demographics.data ?? []).map((data) => (
        <div className="mb-2">
          {data.label}
          <div className="input-group">
            <span className="input-group-text">{data.prefix}</span>
            <input
              type="text"
              id={data.name}
              defaultValue={state.demographics[data.name]}
              onChange={onDemographicsChange}
            />
          </div>
        </div>
      ))}
    {options.skills && (
      <div className="mb-2">
        {options.skills.label ?? "Skills"}
        <Widget
          src="opencann.near/widget/SkillsEditor"
          props={{
            initialSkillsObject: metadata.skills,
            skillsPattern: options.skills.pattern,
            placeholder:
              options.skills.placeholder ?? "ProgrammingBasics, TestingBasics",
            setSkillsObject: (skills) => {
              state.metadata.skills = skills;
              State.update();
            },
          }}
        />
      </div>
    )}
  </>
);
