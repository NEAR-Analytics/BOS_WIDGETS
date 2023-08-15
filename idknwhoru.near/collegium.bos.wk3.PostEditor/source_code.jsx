State.init({
  page: 0,
  title: "",
  content: "",
});

console.log(Social.index("collegium.post", "main"));

const updateTitle = (titlechangeEvent) => {
  State.update({ title: titlechangeEvent.target.value });
};

const updateContent = (changeEvent) => {
  const content = changeEvent.target.value;
  State.update({ content });
};

const PostEditorWrapper = styled.div`
    width: 100%;

    .commit-wrapper {
        display: flex;
        justify-content: flex-end;
    }

    .content-tab-wrapper {
        display: flex;
        margin: 10px 0 0;
    }

    .content-tab-button {
        padding: 5px;
        border-radius: 4px;
    }

    .editor {
        width: 100%;
        height: 600px;
        padding: 10px;
    }

    .preview {
        width: 100%;
        height: 600px;
        border: 1px solid;
        padding-left: 10px;
    }
`;

const data = {
  collegium: { post: { [state.title]: state.content } },
  index: {
    "collegium.post": JSON.stringify({
      key: "main",
      value: {
        type: "md",
      },
    }),
  },
};

return (
  <PostEditorWrapper>
    <div className="commit-wrapper">
      <CommitButton disabled={state.title === ""} force data={data}>
        게시하기
      </CommitButton>
    </div>
    <input
      type="text"
      placeHolder="제목을 입력해주세요."
      onChange={updateTitle}
    />
    <div className="content-tab-wrapper">
      <button
        className="content-tab-button"
        onClick={(_) => State.update({ page: 0 })}
      >
        Edit
      </button>
      <button
        className="content-tab-button"
        onClick={(_) => State.update({ page: 1 })}
      >
        Preview
      </button>
    </div>
    {state.page === 0 ? (
      <textarea
        className="editor"
        onChange={updateContent}
        value={state.content}
        placeHolder="이 에디터는 markdown 형식을 지원합니다. Preview 탭을 눌러 확인해주세요."
      ></textarea>
    ) : (
      <div className="preview">
        <Markdown text={state.content} />
      </div>
    )}
  </PostEditorWrapper>
);
