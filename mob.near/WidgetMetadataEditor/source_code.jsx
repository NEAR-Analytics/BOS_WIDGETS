const widgetPath = props.widgetPath;
const onChange = props.onChange;

let metadata = Social.getr(`${widgetPath}/metadata`);

if (metadata === null) {
  return "Loading";
}

return (
  <Widget
    key={widgetPath}
    src="mob.near/widget/MetadataEditor"
    props={{
      initialMetadata: metadata,
      onChange,
      options: {
        name: { label: "Title" },
        image: { label: "Icon" },
        description: { label: "Description" },
        tags: {
          label: "Tags",
          tagsPattern: "*/widget/metadata/tags/*",
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
);
