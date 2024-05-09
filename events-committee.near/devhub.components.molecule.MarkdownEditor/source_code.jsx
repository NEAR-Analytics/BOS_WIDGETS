const MarkdownEditor = ({ data, onChange, showAutoComplete }) => {
  return (
    <Widget
      src={"events-committee.near/widget/devhub.components.molecule.SimpleMDE"}
      props={{
        data,
        onChange,
        showAutoComplete,
      }}
    />
  );
};

return MarkdownEditor(props);
