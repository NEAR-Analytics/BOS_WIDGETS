const { AppLayout } = VM.require(`memelol.near/widget/lol.Layouts.App`);
const config = VM.require(`memelol.near/widget/lol.Config`);
const { page, ...passProps } = props;

if (!config || !AppLayout) return <Widget src="flashui.near/widget/Loading" />;
if (!page) page = "home";

const pageProps = {
  page,
  ...config,
  ...passProps,
};

function Page() {
  switch (page) {
    case "home": {
      return (
        <Widget
          src={`memelol.near/widget/lol.Pages.Home`}
          props={pageProps}
        />
      );
    }
    case "profile": {
      return (
        <Widget
          src={`memelol.near/widget/lol.Pages.Profile`}
          props={pageProps}
        />
      );
    }
    case "puzzle": {
      return (
        <Widget
          src={`memelol.near/widget/lol.Pages.Puzzle`}
          props={pageProps}
        />
      );
    }
    case "mint": {
      return (
        <Widget
          src={`memelol.near/widget/lol.Pages.Mint`}
          props={pageProps}
        />
      );
    }

    default: {
      const NotFound = styled.div`
        width: 100%;
        height: 70vh;

        h1 {
          font-size: 10rem;
        }

        h2 {
          font-size: 2rem;
        }
      `;

      return (
        <NotFound className="d-flex flex-grow-1 flex-column justify-content-center align-items-center">
          <h1>
            <b>404</b>
          </h1>
          <h2>Page does not exist</h2>
        </NotFound>
      );
    }
  }
}

return (
  <AppLayout pageProps={pageProps}>
    <Page />
  </AppLayout>
);
