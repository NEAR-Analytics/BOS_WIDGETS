const accountId = props.accountId ?? context.accountId ?? "every.near";

const defaultTools = [
  "devs.near/widget/Feed",
  "hyperfiles.near/widget/app",
  "everycanvas.near/widget/app",
  "video.every.near/widget/app",
];

const tools = Social.get(`${accountId}/settings/dev.tools`) ?? defaultTools;

const ToolbeltContainer = styled.div`
  display: flex;
  padding: 12px;
  flex-wrap: wrap;
`;

const Tool = styled.div`
  color: white;
  margin: 9px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;

return (
  <ToolbeltContainer>
    {tools.map((tool) => (
      <Tool key={tool}>
        <a href={`/${tool}`}>
          <Widget src="toolbelt.near/widget/tool.image" props={{ src: tool }} />
        </a>
      </Tool>
    ))}
  </ToolbeltContainer>
);
