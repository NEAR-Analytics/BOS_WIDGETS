State.init({ files: [] });

const handleAddFile = (files) => {
  files.forEach((file) => {
    console.log("file", file);
    State.update((prev) => {
      if (
        prev.files.some(
          (local) =>
            local.name === file.name &&
            local.size === file.size &&
            local.lastModifiedDate.toString() ===
              file.lastModifiedDate.toString()
        )
      ) {
        return prev;
      }

      return {
        files: [...prev.files, file],
      };
    });
  });
};

console.log("state_files: ", state.files);

return (
  <div className="d-inline-block">
    <Files
      multiple={true}
      accepts={[".lock", ".json", ".toml", ".ts", ".rs"]}
      minFileSize={1}
      clickable
      className="btn btn-outline-primary"
      onChange={(files) => handleAddFile(files)}
    >
      {"Add file"}
    </Files>
    {state.files.length > 0 ? (
      <ul class="list-disc list-inside">
        {state.files.map((file) => (
          <li>{file.name}</li>
        ))}
      </ul>
    ) : null}
  </div>
);
