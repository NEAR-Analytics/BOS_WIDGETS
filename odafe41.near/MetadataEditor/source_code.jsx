const initialMetadata = props.initialMetadata ?? {};
const onChange = props.onChange;
const options = props.options;

State.init({
  initialMetadata,
  metadata: initialMetadata,
  reportedMetadata: initialMetadata,
  image: initialMetadata.image,
  bookFile: initialMetadata.bookFile,
  author: initialMetadata.author,
  published: initialMetadata.published,
});

const metadata = {
  name: options.name ? state.metadata.name : undefined,
  description: options.name ? state.metadata.description : undefined,
  image:
    options.image && state.image && Object.keys(state.image).length > 0
      ? state.image
      : undefined,
  bookFile:
    options.bookFile && state.bookFile && Object.keys(state.bookFile).length > 0
      ? state.bookFile
      : undefined,
  tags: options.tags ? state.metadata.tags : undefined,
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

const onAuthorChange = debounce((e) => {
  State.update({
    metadata: {
      ...state.metadata,
      author: e.target.value,
    },
  });
});

const onPublishedChange = debounce((e) => {
  State.update({
    metadata: {
      ...state.metadata,
      published: e.target.value,
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
    {options.bookFile && (
      <div className="mb-2">
        {options.bookFile.label ?? "Book File"}
        <Widget
          src="near/widget/ImageEditorTabs"
          props={{
            image: state.bookFile,
            onChange: (bookFile) => State.update({ bookFile }),
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

    {options.author && (
      <div className="mb-2">
        {options.author.label ?? "Author"}
        <input
          type="text"
          defaultValue={state.metadata.author}
          onChange={onAuthorChange}
        />
      </div>
    )}

    {options.published && (
      <div className="mb-2">
        {options.published.label ?? "Published"}
        <input
          type="number"
          defaultValue={state.metadata.published}
          onChange={onPublishedChange}
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
  </>
);
