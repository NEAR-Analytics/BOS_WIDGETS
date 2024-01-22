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
  <Widget
    src={`ndcdev.near/widget/Dashboard.Layouts.App`}
    props={{ page, children: <Page /> }}
  />
);
