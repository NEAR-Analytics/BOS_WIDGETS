const { app, provider } = VM.require(`rubycop.near/widget/mdao.config`);
const { AppLayout } = VM.require(`${provider}/widget/${$app}.layouts.app`);
const { page, ...passProps } = props;

const Theme = styled.div`
  a {
    color: inherit;
  }

  .attractable {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
    transition: box-shadow 0.6s;

    &:hover {
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    }
  }
`;

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

    default: {
      // TODO: 404 page
      return <p>404</p>;
    }
  }
}

return (
  <Theme>
    <AppLayout page={page}>
      <Page />
    </AppLayout>
  </Theme>
);
