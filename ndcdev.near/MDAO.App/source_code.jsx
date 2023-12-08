const { widgetPath } = VM.require(`/*__@widgetPath__*/.Config`);
const { AppLayout } = VM.require(`/*__@widgetPath__*/.Layouts.App`);
const { page, ...passProps } = props;

if (!AppLayout) return <Widget src="flashui.near/widget/Loading" />;
if (!page) page = "home";

function Page() {
  switch (page) {
    case "home": {
      return (
        <Widget src={`/*__@widgetPath__*//Pages.Home`} props={passProps} />
      );
    }
    case "createProposal": {
      return (
        <Widget
          src={`/*__@widgetPath__*//Pages.Proposals.Create`}
          props={passProps}
        />
      );
    }

    default: {
      // TODO: 404 page
      return <p>404</p>;
    }
  }
}

return (
  <AppLayout page={page}>
    <Page />
  </AppLayout>
);
