const widgetPath = props.widgetPath;
const onChange = props.onChange;

let metadata = Social.getr(`${widgetPath}/metadata`);

if (metadata === null) {
  return "Loading";
}

const ccc = "cccc";

const kkk = () => {
  console.log("kkk");
  console.log("onChange", onChange);
  props.onChange({ title: "kkkkkkkkkkk" });
};

return (
  <div>
    <div onClick={kkk}>+++</div>
    <Widget
      key={widgetPath}
      src="golas.near/widget/MetadataEditor-fork"
      props={{
        initialMetadata: metadata,
        onChange,
        options: {
          name: { label: "Titlex" },
          image: { label: "Icon" },
          description: { label: "Description" },
          tags: {
            label: (
              <>
                Tags{" "}
                <span className="text-secondary">
                  {" "}
                  (add relevant tags to ensure the best discoverability of your
                  app/component)
                </span>
              </>
            ),
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
