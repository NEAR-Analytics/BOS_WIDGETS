if (!context.accountId) {
  return <></>;
}

State.init({
  images: [],
  text: "",
  showPreview: false,
  isVisible: isVisible,
});

const profile = Social.getr(`${context.accountId}/profile`);
const autocompleteEnabled = true;

const content = {
  type: "md",
  images: Object.values(state).map((image) =>
    image.cid ? { ipfs_cid: image.cid } : undefined
  ),
  text: state.text,
};

function extractMentions(text) {
  const mentionRegex =
    /@((?:(?:[a-z\d]+[-_])*[a-z\d]+\.)*(?:[a-z\d]+[-_])*[a-z\d]+)/gi;
  mentionRegex.lastIndex = 0;
  const accountIds = new Set();
  for (const match of text.matchAll(mentionRegex)) {
    if (
      !/[\w`]/.test(match.input.charAt(match.index - 1)) &&
      !/[/\w`]/.test(match.input.charAt(match.index + match[0].length)) &&
      match[1].length >= 2 &&
      match[1].length <= 64
    ) {
      accountIds.add(match[1].toLowerCase());
    }
  }
  return [...accountIds];
}

function extractTagNotifications(text, item) {
  return extractMentions(text || "")
    .filter((accountId) => accountId !== context.accountId)
    .map((accountId) => ({
      key: accountId,
      value: {
        type: "mention",
        item,
      },
    }));
}

function composeData() {
  const data = {
    post: {
      main: JSON.stringify(content),
    },
    index: {
      post: JSON.stringify({
        key: "main",
        value: {
          type: "md",
        },
      }),
    },
  };

  const notifications = extractTagNotifications(state.text, {
    type: "social",
    path: `${context.accountId}/post/main`,
  });

  if (notifications.length) {
    data.index.notify = JSON.stringify(
      notifications.length > 1 ? notifications : notifications[0]
    );
  }

  return data;
}

function onCommit() {
  State.update({
    images: [],
    text: "",
  });
}

function textareaInputHandler(value) {
  const showAccountAutocomplete = /@[\w][^\s]*$/.test(value);
  State.update({ text: value, showAccountAutocomplete });
}

function autoCompleteAccountId(id) {
  let text = state.text.replace(/[\s]{0,1}@[^\s]*$/, "");
  text = `${text} @${id}`.trim() + " ";
  State.update({ text, showAccountAutocomplete: false });
}

const Modal = styled.div`
  position:fixed;
  top:0;
  left:0;
  z-index: 102;
  width: 100%;
  height: 80vh;
   background: #fff;
`;

const Wrapper = styled.div`
  --padding: 24px;
  position:fixed;
  top:0;
width: 100%;
  height: 100%;
  @media (max-width: 1200px) {
    --padding: 12px;
  }
  background: #fff;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #64a19d;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index:100;
`;

const PlusIcon = styled.span`
  position: relative;
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 26px;
    height: 4px;
    background-color: #fff;
    top: calc(50% - 2px);
    left: calc(50% - 13px);
  }
  &::before {
    transform: rotate(0deg);
  }
  &::after {
    transform: rotate(90deg);
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  pointer-events: none;
  position: absolute;
  top: var(--padding);
  left: var(--padding);

  img {
    object-fit: cover;
    border-radius: 40px;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 992px) {
    display: none;
  }
`;

const Textarea = styled.div`
  display: grid;
  vertical-align: top;
  align-items: center;
  top:0;
  align-items: stretch;
  height:100%; 
  background: white;

  &::after,
  textarea {
    width: 100%;
    min-width: 1em;
    height: 100%; 
    font: inherit;
    padding: var(--padding) var(--padding) calc(40px + (var(--padding) * 2))
      calc(40px + (var(--padding) * 2));
    margin: 0;
    resize: none;
    background: none;
    appearance: none;
    border: none;
    grid-area: 1 / 1;
    overflow: hidden;
    outline: none;

    @media (max-width: 1200px) {
      min-height: 124px;
    }

    @media (max-width: 992px) {
      padding-left: var(--padding);
    }
  }

  &::after {
    content: attr(data-value) " ";
    visibility: hidden;
    white-space: pre-wrap;
  }

  textarea {
    transition: all 200ms;

    &::placeholder {
      opacity: 1;
      color: #687076;
    }

    &:empty + p {
      display: block;
    }

    &:focus {
      box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.05);
    }
  }
`;

const TextareaDescription = styled.p`
  position: absolute;
  top: calc(var(--padding) + 24px);
  left: calc(42px + (var(--padding) * 2));
  right: var(--padding);
  font-size: 10px;
  line-height: 18px;
  font-weight: 400;
  color: #687076;
 
  display: none;

  a {
    color: #000;
    outline: none;
    font-weight: 600;
    pointer-events: auto;

    &:hover,
    &:focus {
      color: #000;
      text-decoration: underline;
    }
  }

  @media (max-width: 992px) {
    left: var(--padding);
  }
`;

const Actions = styled.div`
  display: inline-flex;
  gap: 12px;
  position: absolute;
  bottom: var(--padding);
  right: var(--padding);

  .commit-post-button,
  .preview-post-button {
    background: #59e692;
    color: #09342e;
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

  .preview-post-button {
    color: #11181c;
    background: #f1f3f5;
    padding: 0;
    width: 40px;

    &:hover,
    &:focus {
      background: #d7dbde;
      outline: none;
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

const PreviewWrapper = styled.div`
  position: relative;
  padding: var(--padding);
  padding-bottom: calc(40px + (var(--padding) * 2));
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

function toggleModal() {
  State.update({ isVisible: !state.isVisible });
}

// Initialize the state
State.init({
  searchTerm: "",
  gifs: [],
  showGifs: false,
});

const fetchGiphyData = (queryURI) => {
  return asyncFetch(
    `https://api.giphy.com/v1/gifs/search?q=${queryURI}&api_key=Wjhf2pRJKiqRzIPvYiyEMhFovaDeyt3v&limit=20`,
    {
      method: "GET",
    }
  );
};

// Handle change
const handleChange = (event) => {
  const searchTerm = event.target.value;
  State.update({ searchTerm: searchTerm });

  fetchGiphyData(searchTerm).then((res) => {
    const data = res.body.data;
    const gifs = data.map((gif) => ({
      imageUrl: gif.images.fixed_height_small.url,
      value: `https://media.giphy.com/media/${gif.id}/giphy.gif`,
    }));
    console.log(gifs);
    State.update({ gifs: gifs, showGifs: true });
  });
};

const copyToClipboard = (url) => {
  console.log("Copying to clipboard:", url);
  navigator.clipboard
    .writeText(url)
    .then(() => {
      alert("Gif URL copied to clipboard!");
    })
    .catch((err) => {
      // handle error if any
      console.error("Error copying to clipboard", err);
    });
};

return (
  <div>
    <FloatingButton className="floating-button" onClick={toggleModal}>
      <PlusIcon />
    </FloatingButton>
    {state.isVisible && (
      <Modal>
        <Wrapper>
          <button
            style={{
              position: "absolute",
              left: "2%",
              bottom: "2%",
              zIndex: 102,
              backgroundColor: "#64a19d",
              width: "12",
              height: "12",
            }}
            onClick={toggleModal}
            focusable="false"
          >
            X
          </button>
          <>
            <Avatar>
              <Widget
                src="mob.near/widget/Image"
                props={{
                  image: profile.image,
                  alt: profile.name,
                  fallbackUrl:
                    "https://ipfs.near.social/ipfs/bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi",
                }}
              />
            </Avatar>
            <Textarea data-value={state.text}>
              <div
                style={{
                  background:
                    "linear-gradient(to top, #f7f7f7 0%, #fff 50%, #f7f7f7 100%)",
                }}
              >
                <div>
                  <div>
                    Search & Post Gifs
                    <small>
                      <i>(experimental)</i>
                    </small>
                    <br />
                    <small>
                      <i>Click on the image and it will add to your post</i>
                    </small>
                    <input
                      type="text"
                      placeholder="Find That Gif!"
                      value={state.searchTerm}
                      onChange={handleChange}
                      width="300"
                    />
                    {state.showGifs && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "space-around",
                        }}
                      >
                        {state.gifs.map((gif, index) => (
                          <div
                            key={index}
                            onClick={() =>
                              State.update({
                                text: state.text + "\n" + gif.imageUrl,
                                searchTerm: "",
                                gifs: [],
                              })
                            }
                          >
                            <img src={gif.imageUrl} alt="Gif" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <textarea
                placeholder="What the dog doin'?"
                onInput={(event) => textareaInputHandler(event.target.value)}
                onKeyUp={(event) => {
                  if (event.key === "Escape") {
                    State.update({ showAccountAutocomplete: false });
                  }
                }}
                value={state.text}
              />
              <TextareaDescription>
                <br />
                <a
                  href="https://www.markdownguide.org/basic-syntax/"
                  target="_blank"
                >
                  Markdown
                </a>
                is supported
                <br />
                Examples: **bold text** *emphasis* `code`
                <br />
                Lists can be with numbers 1. or *
                <br />
                You can paste links here directly and some will auto-expand
                and/or hyperlink
                <br />
                Youtube and Spotify links will auto-embed
              </TextareaDescription>
              <PreviewWrapper>
                <Widget
                  src="near/widget/Posts.Post"
                  props={{
                    accountId: context.accountId,
                    blockHeight: "now",
                    content,
                  }}
                />
              </PreviewWrapper>
            </Textarea>
          </>
          {autocompleteEnabled && state.showAccountAutocomplete && (
            <AutoComplete>
              <Widget
                src="near/widget/AccountAutocomplete"
                props={{
                  term: state.text.split("@").pop(),
                  onSelect: autoCompleteAccountId,
                  onClose: () =>
                    State.update({ showAccountAutocomplete: false }),
                }}
              />
            </AutoComplete>
          )}

          <Actions>
            {!state.showPreview && (
              <IpfsImageUpload
                image={state.images}
                className="upload-image-button bi bi-image"
              />
            )}

            <CommitButton
              disabled={!state.text}
              force
              data={composeData}
              onCommit={onCommit}
              className="commit-post-button"
            >
              Post
            </CommitButton>
          </Actions>
        </Wrapper>
      </Modal>
    )}
  </div>
);
