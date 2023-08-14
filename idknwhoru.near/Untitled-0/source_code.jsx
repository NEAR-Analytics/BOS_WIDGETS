State.init({
  page: 0,
  content: "",
});

console.log("social.index?", Social.get("idknwhoru.near/collegium/post/*"));

const updateContent = (changeEvent) => {
  const content = changeEvent.target.value;
  State.update({ content });
};

const EditorWrapper = styled.div`
    width: 100%;
    height: 600px;

    .editor {
        width: 100%;
        height: 100%;
        padding-left: 10px;
    }
`;

const data = { collegium: { post: state.content } };

return (
  <>
    <div>
      <button onClick={(_) => State.update({ page: 0 })}>Edit</button>
      <button onClick={(_) => State.update({ page: 1 })}>Preview</button>
      <CommitButton force data={data}>
        Commit
      </CommitButton>
    </div>
    {state.page === 0 ? (
      <EditorWrapper>
        <textarea
          className="editor"
          onChange={updateContent}
          value={state.content}
        ></textarea>
      </EditorWrapper>
    ) : (
      <Markdown text={state.content} />
    )}
  </>
);
