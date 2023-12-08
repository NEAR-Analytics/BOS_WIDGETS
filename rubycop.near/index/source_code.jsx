const { app, provider } = VM.require(`rubycop.near/widget/mdao.config`);
const { AppLayout } = VM.require(`${provider}/widget/${app}.layouts.app`);
const { page, ...passProps } = props;

if (!AppLayout) return <p>Loading modules...</p>;
if (!page) page = "home";

function Page() {
  const routes = page.split(".");
  switch (routes[0]) {
    case "home": {
      return (
        <Widget src={`${provider}/widget/${app}.page.home`} props={passProps} />
      );
    }
    case "createProposal": {
      return (
        <Widget src={`${provider}/widget/${app}.page.home`} props={passProps} />
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
