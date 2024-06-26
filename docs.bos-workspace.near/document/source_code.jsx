const { basePath, param, _params } = props;
let adapter = "docs.bos-workspace.near/widget/utils.db"; // this could come from props
const Template = VM.require("docs.bos-workspace.near/widget/PR.Template");
const { get } = VM.require(adapter);
const data = get(_params);
if (!data) {
  // this could be a part of the template
  return <p>Page not found</p>;
}
const { MarkdownViewer } = VM.require("devs.near/widget/markdown.view");
return (
  <Template theme={{ "--main-bg-color": "white" }} style={{}}>
    <div
      style={{
        backgroundColor: "var(--main-bg-color)",
        width: "100%",
        height: "100%",
      }}
      className="content"
    >
      <MarkdownViewer value={data} />
    </div>
  </Template>
);
