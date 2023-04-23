const widgetPath = props.widgetPath;
const onChange = props.onChange;

let metadata = Social.getr(`${widgetPath}/metadata`);
console.log("99999999999-meta", metadata);
if (!metadata) {
  return "Loading";
}
return (
  <div style={{ backgroundColor: "#000" }}>
    <Widget
      key={widgetPath}
      src="ref-admin.near/widget/MetadataEditor"
      props={{
        initialMetadata: metadata,
        onChange,
        options: {
          name: { label: "Title" },
          image: { label: "Icon" },
          description: { label: "Description" },
          tags: {
            label: "Tags",
            pattern: "*/widget/*/metadata/tags/*",
            placeholder: "profile, editor, social, finance, app, image, nft",
          },
          linktree: {
            links: [
              {
                label: "Website",
                prefix: "https://",
                name: "website",
              },
            ],
          },
        },
      }}
    />
  </div>
);
