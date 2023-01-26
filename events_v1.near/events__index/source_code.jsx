const Button = props.Components.Button;
const PageTitle = props.Components.PageTitle;

return (
  <div>
    <PageTitle>Events</PageTitle>

    <Button
      onClick={() => {
        props.engine.push('new', {}, 'modal', {
          title: 'Create new Event',
          back: true,
        });
      }}
    >
      Create new Event
    </Button>

    <Button
      onClick={() => {
        props.engine.push(
          'index.list_container',
          {
            forAccountId: props.accountId,
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

    {props.engine.renderComponent('index.list_container', {})}
  </div>
);
