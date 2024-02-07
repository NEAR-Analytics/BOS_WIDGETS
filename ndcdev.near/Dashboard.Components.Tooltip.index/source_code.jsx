const { Container } = VM.require(
  `ndcdev.near/widget/Dashboard.Components.Tooltip.styled`,
);

if (!Container) return <Widget src="flashui.near/widget/Loading" />;

const { content, icon, minWidth } = props;

return (
  <Container minWidth={minWidth}>
    {icon}
    <div className="content">{content}</div>
  </Container>
);
