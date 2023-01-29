const Button = props.__engine.Components.Button;
const PageTitle = props.__engine.Components.PageTitle;

return (
  <div>
    <PageTitle>Events</PageTitle>

    <Button
      onClick={() => {
        props.__engine.push('new', {}, 'modal', {
          title: 'Create new Event',
          back: true,
        });
      }}
    >
      Create new Event
    </Button>

    <Button
      onClick={() => {
        props.__engine.push(
          'index.list_container',
          {
            forAccountId: props.__engine.accountId,
          },
          'container',
          {
            title: 'My Events',
            back: true,
          }
        );
      }}
    >
      My Events
    </Button>

    <br />

    {props.__engine.renderComponent('index.list_container', {})}
  </div>
);
