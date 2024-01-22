const { AppLayout } = VM.require(`memiko.near/widget/mem.Layouts.App`);

const { page, ...passProps } = props;

if (!AppLayout) return <Widget src="flashui.near/widget/Loading" />;
if (!page) page = "home";

const pageProps = {
  page,
  contractName: "memiko.near",
  ...passProps,
};

function Page() {
  switch (page) {
    case "home": {
      return (
        <Widget
          src={`memiko.near/widget/mem.Pages.Index`}
          props={pageProps}
        />
      );
    }

    default: {
      const NotFound = styled.div`
        width: 100%;
        height: 90vh;

        h1 {
          font-size: 6rem;
        }

        h2 {
          font-size: 1.2rem;
        }
      `;

      return (
        <NotFound className="justify-content-center align-items-center d-flex flex-grow-1 flex-column ">
          <h1>
            <b>404 / Not Found</b>
          </h1>
          <h2>Page not found</h2>
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
