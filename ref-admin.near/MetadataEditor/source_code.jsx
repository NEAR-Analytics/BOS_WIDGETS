const Container = styled.div`
   .title{
     font-weight: 500;
     font-size: 16px;
     color: #FFFFFF;
     margin-bottom:10px;
   }
   .form-input{
     display:block;
     background: rgba(26, 46, 51, 0.25);
     border: 0.5px solid rgba(255, 255, 255, 0.3);
     border-radius: 10px;
     height: 47px;
     width:100%;
     color:rgba(255, 255, 255, 0.3);
     padding:0 10px
   }
   .form-input:focus-visible{
     outline:none;
   }
   .form-textarea{
     display:block;
     background: rgba(26, 46, 51, 0.25);
     border: 0.5px solid rgba(255, 255, 255, 0.3);
     border-radius: 10px;
     width:100%;
     color:rgba(255, 255, 255, 0.3);
     padding:10px;
   }
   .form-textarea:focus-visible{
     outline:none;
   }
   .websit .input-group{
     display:flex;
     align-items:stretch;
     flex-wrap:nowrap;
     overflow:hidden;
   }
   
   .websit .input-group-text{
     background-color:#304352;
     color:#fff;
     border:none;
   }
   .websit .input-group{
     border: 1px solid rgba(255, 255, 255, 0.3);
     border-radius: 10px;
   }
`;
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
  <Container>
    {options.name && (
      <div className="mb-2">
        <label class="title">{options.name.label ?? "Name"}</label>
        <input class="form-input" type="text" value={state.metadata.name} />
      </div>
    )}
    {options.image && (
      <div className="mb-2">
        <label class="title">{options.image.label ?? "Image"}</label>
        <Widget
          src="ref-admin.near/widget/ImageEditorTabs"
          props={{
            image: state.image,
            onChange: (image) => State.update({ image }),
          }}
        />
      </div>
    )}
    {options.backgroundImage && (
      <div className="mb-2">
        <label class="title">
          {options.backgroundImage.label ?? "Background image"}
        </label>
        <Widget
          src="ref-admin.near/widget/ImageEditorTabs"
          props={{
            image: state.backgroundImage,
            onChange: (backgroundImage) => State.update({ backgroundImage }),
          }}
        />
      </div>
    )}
    {options.description && (
      <div className="mb-2">
        <label class="title">
          {options.description.label ?? "Description"}
        </label>
        <span className="text-white"> (supports markdown)</span>
        <textarea
          className="form-textarea"
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
      <div className="mb-2">
        <label class="title">{options.tags.label ?? "Tags"}</label>
        <Widget
          src="ref-admin.near/widget/TagsEditor"
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
        <div className="mb-2 websit">
          <label class="title">{link.label}</label>
          <div className="input-group">
            <span className="input-group-text">{link.prefix}</span>
            <input
              class="form-input"
              type="text"
              value={state.linktree[link.name]}
            />
          </div>
        </div>
      ))}
  </Container>
);
