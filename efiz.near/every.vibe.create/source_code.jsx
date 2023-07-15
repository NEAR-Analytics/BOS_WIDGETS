const allowPublicPosting = props.allowPublicPosting || false;
const isMember = props.isMember || false;
const communityDomain = props.communityDomain || null;
const embedHashtags = props.embedHashtags || [];
const exclusive = props.exclusive || false;
const key = props.key || "main";
const embedMentions = props.embedMentions || [];

const sources = [{ domain: "post", key: "main" }];

if (!context.accountId || (exclusive && !isMember)) return <></>;

State.init({
  image: {},
  text: "",
  showPreview: false,
  publicPosting: allowPublicPosting,
});

const profile = Social.getr(`${context.accountId}/profile`);
const autocompleteEnabled = true;

const content = {
  type: "md",
  image: state.image.cid ? { ipfs_cid: state.image.cid } : undefined,
  text: state.text,
  metadata: {
    tastemaker: embedMentions,
  },
};

function extractMentions(text) {
  const mentionRegex =
    /@((?:(?:[a-z\d]+[-_])*[a-z\d]+\.)*(?:[a-z\d]+[-_])*[a-z\d]+)/gi;
  return Array.from(text.matchAll(mentionRegex), (match) =>
    match[1].toLowerCase()
  );
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

const extractHashtags = (text) => {
  const hashtagRegex = /#(\w+)/gi;
  return Array.from(text.matchAll(hashtagRegex), (match) =>
    match[1].toLowerCase()
  );
};

function composeData() {
  const data = {
    post: {
      [key]: JSON.stringify(content),
    },
    index: {},
  };

  const hashtags = extractHashtags(content.text);
  hashtags = hashtags.concat(embedHashtags);
  if (state.publicPosting) {
    data.index.post = JSON.stringify({
      key,
      value: {
        type: "md",
      },
    });
  }
  if (isMember && communityDomain) {
    data.index[communityDomain] = JSON.stringify({
      key,
      value: {
        type: "md",
      },
    });
  }
  const item = {
    type: "social",
    path: `${context.accountId}/post/${key}`,
  };
  if (hashtags.length) {
    if (state.publicPosting) {
      data.index.hashtag = JSON.stringify(
        hashtags.map((hashtag) => ({
          key: hashtag,
          value: item,
        }))
      );
    } else if (isMember && communityDomain) {
      data.index.hashtag = JSON.stringify(
        hashtags.map((hashtag) => ({
          key: hashtag,
          value: {
            type: "social",
            path: `${context.accountId}/${communityDomain}/${key}`,
          },
        }))
      );
    }
  }

  const notifications = extractTagNotifications(state.text, item);

  if (embedMentions.length) {
    const mentions = embedMentions.map((accountId) => ({
      key: accountId,
      value: {
        type: "mention",
        item,
      },
    }));
    notifications = notifications.concat(mentions);
  }
  if (notifications.length) {
    data.index.notify = JSON.stringify(
      notifications.length > 1 ? notifications : notifications[0]
    );
  }

  return data;
}

function onCommit() {
  State.update({
    image: {},
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

const Wrapper = styled.div`
  --padding: 24px;
  position: relative;

  @media (max-width: 1200px) {
    --padding: 12px;
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
  position: relative;
  align-items: stretch;

  &::after,
  textarea {
    width: 100%;
    min-width: 1em;
    height: unset;
    min-height: 164px;
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
  pointer-events: none;
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

const Domain = styled.div`
  display: inline-flex;
  gap: 12px;
  position: absolute;
  bottom: var(--padding);
  left: var(--padding);
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

const PillSelectButton = styled.button`
  border: 1px solid #e6e8eb;
  padding: 3px 24px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 18px;
  color: ${state.publicPosting ? "#fff" : "#687076"};
  background: ${state.publicPosting ? "#006ADC !important" : "#FBFCFD"};
  font-weight: 600;
  transition: all 200ms;
`;

return (
  <Wrapper>
    {state.showPreview ? (
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
    ) : (
      <>
        <Avatar>
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: profile.image,
              alt: profile.name,
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
            }}
          />
        </Avatar>
        <Textarea data-value={state.text}>
          <textarea
            placeholder="What's happening?"
            onInput={(event) => textareaInputHandler(event.target.value)}
            onKeyUp={(event) => {
              if (event.key === "Escape") {
                State.update({ showAccountAutocomplete: false });
              }
            }}
            value={state.text}
          />
          <TextareaDescription>
            <a
              href="https://www.markdownguide.org/basic-syntax/"
              target="_blank"
            >
              Markdown
            </a>
            is supported
          </TextareaDescription>
        </Textarea>
      </>
    )}
    {autocompleteEnabled && state.showAccountAutocomplete && (
      <AutoComplete>
        <Widget
          src="near/widget/AccountAutocomplete"
          props={{
            term: state.text.split("@").pop(),
            onSelect: autoCompleteAccountId,
            onClose: () => State.update({ showAccountAutocomplete: false }),
          }}
        />
      </AutoComplete>
    )}
    {!state.showPreview && isMember && allowPublicPosting && (
      <Domain>
        <PillSelectButton
          type="button"
          onClick={() => State.update({ publicPosting: !state.publicPosting })}
          selected={state.publicPosting}
        >
          {state.publicPosting
            ? "Public Posting Enabled"
            : "Public Posting Disabled"}
        </PillSelectButton>
      </Domain>
    )}

    <Actions>
      {!state.showPreview && (
        <IpfsImageUpload
          image={state.image}
          className="upload-image-button bi bi-image"
        />
      )}
      <button
        type="button"
        disabled={!state.text}
        className="preview-post-button"
        title={state.showPreview ? "Edit Post" : "Preview Post"}
        onClick={() => State.update({ showPreview: !state.showPreview })}
      >
        {state.showPreview ? (
          <i className="bi bi-pencil" />
        ) : (
          <i className="bi bi-eye-fill" />
        )}
      </button>
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
);
