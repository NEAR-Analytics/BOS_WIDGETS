const withProfileImage = props.withProfileImage || false;

if (state.image === undefined) {
  State.init({
    image: {},
    text: props.initialText || "",
  });
}

const content = (state.text || state.image.cid) && {
  type: "md",
  text: state.text,
  image: state.image.cid ? { ipfs_cid: state.image.cid } : undefined,
};

const jContent = JSON.stringify(content);
if (props.onChange && jContent !== state.jContent) {
  console.log("update");
  State.update({
    jContent,
  });
  props.onChange({ content });
}

const onCompose = () => {
  State.update({
    image: {},
    text: "",
  });
};

const AvatarWrapper = styled.div`
  position: absolute;
  left: 1.5rem;
  top: 1.5rem;
`;

const Wrapper = styled.div`
  --padding: 12px;
  position: relative;
  margin-left: -12px;
  overflow: hidden;
  transition: all 200ms;
  border: 1px solid #eceef0;
  border-radius: 8px;

  &:focus-within {
    box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.05);
    border-color: #687076;
  }
`;

const Textarea = styled.div`
  display: grid;
  vertical-align: top;
  align-items: center;
  position: relative;
  align-items: stretch;

  &::after,
  textarea {
    width: 100%;
    min-width: 1em;
    height: unset;
    min-height: 124px;
    font: inherit;
    padding: var(--padding) var(--padding) calc(40px + (var(--padding) * 2))
      var(--padding);
    margin: 0;
    resize: none;
    background: none;
    appearance: none;
    border: none;
    grid-area: 1 / 1;
    overflow: hidden;
    outline: none;
  }

  &::after {
    content: attr(data-value) " ";
    visibility: hidden;
    white-space: pre-wrap;
  }
`;

const Actions = styled.div`
  display: inline-flex;
  gap: 12px;
  position: absolute;
  bottom: var(--padding);
  right: var(--padding);

  .commit-post-button {
    background: #59e692;
    color: #11181c;
    border-radius: 40px;
    height: 40px;
    padding: 0 35px;
    font-weight: 600;
    font-size: 14px;
    border: none;
    cursor: pointer;
    transition: background 200ms, opacity 200ms;

    &:hover,
    &:focus {
      background: rgb(112 242 164);
      outline: none;
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  .upload-image-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1f3f5;
    color: #11181c;
    border-radius: 40px;
    height: 40px;
    min-width: 40px;
    font-size: 0;
    border: none;
    cursor: pointer;
    transition: background 200ms, opacity 200ms;

    &::before {
      font-size: 16px;
    }

    &:hover,
    &:focus {
      background: #d7dbde;
      outline: none;
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    span {
      margin-left: 12px;
    }
  }

  .d-inline-block {
    display: flex !important;
    gap: 12px;
    margin: 0 !important;

    .overflow-hidden {
      width: 40px !important;
      height: 40px !important;
    }
  }
`;

const AutoComplete = styled.div`
  position: absolute;
  z-index: 5;
  bottom: 0;
  left: 0;
  right: 0;

  > div > div {
    padding: calc(var(--padding) / 2);
  }
`;

return (
  <Wrapper>
    {withProfileImage && (
      <AvatarWrapper>
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            accountId: withProfileImage,
            imageClassName: "rounded-circle w-100 h-100",
            imageStyle: {
              pointerEvents: "none",
              objectFit: "cover",
            },
          }}
        />
      </AvatarWrapper>
    )}
    <Textarea data-value={state.text}>
      <textarea
        placeholder={props.placeholder || "Write your reply..."}
        value={state.text || ""}
        onInput={(event) => State.update({ text: event.target.value })}
        style={{
          paddingLeft: withProfileImage ? "5.5rem" : "12px",
          paddingTop: withProfileImage ? "1.5rem" : "12px",
        }}
      />
    </Textarea>

    <Actions>
      <IpfsImageUpload
        image={state.image}
        className="upload-image-button bi bi-image"
      />
      {props.composeButton && props.composeButton(onCompose)}
    </Actions>
  </Wrapper>
);
