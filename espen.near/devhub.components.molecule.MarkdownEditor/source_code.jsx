const MarkdownEditor = ({ data, onChange }) => {
  return (
    <Widget
      src={"espen.near/widget/devhub.components.molecule.SimpleMDE"}
      props={{
        data,
        onChange,
        toolbar: [
          "heading",
          "bold",
          "italic",
          "quote",
          "code",
          "link",
          "unordered-list",
          "ordered-list",
          "checklist",
          "mention",
        ],
        statusConfig: [],
        spellChecker: false,
      }}
    />
  );
};

return MarkdownEditor(props);
