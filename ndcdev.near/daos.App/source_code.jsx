const { AppLayout } = VM.require(`ndcdev.near/widget/daos.Layouts.App`);
const { page, ...passProps } = props;

if (!AppLayout) return <Widget src="flashui.near/widget/Loading" />;
if (!page) page = "home";

function Page() {
  switch (page) {
    case "comments": {
      return (
        <Widget
          src={`ndcdev.near/widget/daos.Pages.Comments.Index`}
          props={passProps}
        />
      );
    }
    case "activity": {
      return (
        <Widget
          src={`ndcdev.near/widget/daos.Pages.Activity`}
          props={passProps}
        />
      );
    }
    case "home": {
      return (
        <Widget
          src={`ndcdev.near/widget/daos.Pages.Home`}
          props={passProps}
        />
      );
    }
    case "info": {
      return (
        <Widget
          src={`ndcdev.near/widget/daos.Pages.Info`}
          props={passProps}
        />
      );
    }
    case "councils": {
      return (
        <Widget
          src={`ndcdev.near/widget/daos.Pages.Councils`}
          props={passProps}
        />
      );
    }
    case "achievements": {
      return (
        <Widget
          src={`ndcdev.near/widget/daos.Pages.Achievements`}
          props={passProps}
        />
      );
    }
    case "guidance": {
      return (
        <Widget
          src={`ndcdev.near/widget/daos.Pages.Guidance`}
          props={passProps}
        />
      );
    }
    case "reports": {
      return (
        <Widget
          src={`ndcdev.near/widget/daos.Pages.Proposals.List`}
          props={{ type: "Report", ...passProps }}
        />
      );
    }
    case "proposals": {
      return (
        <Widget
          src={`ndcdev.near/widget/daos.Pages.Proposals.List`}
          props={{ type: "Proposal", ...passProps }}
        />
      );
    }
    case "proposal": {
      return (
        <Widget
          src={`ndcdev.near/widget/daos.Pages.Proposals.Index`}
          props={{ ...passProps }}
        />
      );
    }
    case "communities": {
      return <Widget src={`ndcdev.near/widget/daos.Pages.Communities`} />;
    }
    case "create_proposal": {
      return (
        <Widget
          src={`ndcdev.near/widget/daos.Pages.Proposals.Create`}
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
  <AppLayout page={page} props={props}>
    <Page />
  </AppLayout>
);
