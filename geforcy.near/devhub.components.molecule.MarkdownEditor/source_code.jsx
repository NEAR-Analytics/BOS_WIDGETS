const MarkdownEditor = ({ data, onChange, autoFocus }) => {
  return (
    <Widget
      src={"geforcy.near/widget/devhub.components.molecule.SimpleMDE"}
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
        autoFocus: autoFocus,
      }}
    />
  );
};

return MarkdownEditor(props);
