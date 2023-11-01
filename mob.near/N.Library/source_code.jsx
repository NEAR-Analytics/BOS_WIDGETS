const accountId = context.accountId || "root.near";
const authorId = "mob.near";

const components = [
  {
    name: "Profile",
    widgetName: "Profile.InlineBlock",
    demoProps: { accountId },
    props: [{}],
  },
];

const text = `
## Social Components Library

#### Profile

[mob.near/widget/Profile.InlineBlock](https://near.social/mob.near/widget/WidgetSource?src=mob.near/widget/Profile.InlineBlock)
[EMBED](https://near.social/mob.near/widget/Profile.InlineBlock?accountId=${accountId})

`;

const renderComponent = (c, i) => {
  const widgetSrc = `${authorId}/widget/${c.widgetName}`;
  return (
    <div className="component" key={i}>
      <h5>{c.name}</h5>
      <div className="path font-monospace">
        <Widget src="mob.near/widget/CopyButton" props={{ label: widgetSrc }} />
      </div>
      <div className="preview" style={c.previewStyle}>
        <Widget src={widgetSrc} props={c.demoProps} />
      </div>
      <div></div>
    </div>
  );
};

const Wrapper = styled.div`
  .component {
    .path {

    }
    .preview {
      padding: 12px 0;
    
    }
  }
`;

return (
  <Wrapper>
    <h3>Social Components Library</h3>
    {components.map(renderComponent)}
  </Wrapper>
);
