const widgetPath = props.widgetPath;
const onChange = props.onChange;
console.log('-------WidgetMetadataEditor--------props', props)
let metadata = Social.getr(`${widgetPath}/metadata`);
if (metadata === null) {
  return "Loading";
}
return (
  <div>
    <Widget
      key={widgetPath}
      src="ref-admin.near/widget/MetadataEditor"
      props={{
        initialMetadata: metadata,
        onChange,
        options: {
          name: { label: "Title" },
          image: { label: "Icon" },
          banner: { label: "Banner" },
          description: { label: "Description" },
          chain: { label: "Chain" },
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
