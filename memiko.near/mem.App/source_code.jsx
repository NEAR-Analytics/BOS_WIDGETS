const { AppLayout } = VM.require(`memiko.near/widget/mem.Layouts.App`);
const { Config } = VM.require(`./.Config.App`);

const { page, ...passProps } = props;

if (!AppLayout) return <Widget src="flashui.near/widget/Loading" />;
if (!page) page = "index";

const pageProps = {
  page,
  contractName: Config.contract,
  ...passProps,
};

function Page() {
  switch (page) {
    case "index": {
      return (
        <Widget
          src={`memiko.near/widget/mem.Pages.Index`}
          props={pageProps}
        />
      );
    }
  }
}

return (
  <AppLayout pageProps={pageProps}>
    <Page />
  </AppLayout>
);
