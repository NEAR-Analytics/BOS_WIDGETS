const { page, ...passProps } = props;
if (!page) page = "home";

function Page() {
  switch (page) {
    case "home": {
      return (
        <Widget
          src={`ndcdev.near/widget/Dashboard.Pages.Home`}
          props={passProps}
        />
      );
    }

    default: {
      return (
        <Widget
          src={`ndcdev.near/widget/Dashboard.Pages.NotFound`}
          props={passProps}
        />
      );
    }
  }
}

return (
  <Widget
    src={`ndcdev.near/widget/Dashboard.Layouts.App`}
    props={{ page, children: <Page /> }}
  />
);
