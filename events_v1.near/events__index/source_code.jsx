props.controller.setLayout('container', {
  title: 'ND Events',
  back: false,

  primaryAction: {
    label: 'Create new Event',
    onClick: () => {
      props.__engine.push('new', {});
    },
  },
});

const Button = props.__engine.Components.Button;
const Container = props.__engine.Components.Container;

return (
  <Container>
    <Button
      onClick={() => {
        props.__engine.push('new', {});
      }}
    >
      Create new Event
    </Button>

    <Button
      onClick={() => {
        props.__engine.push('my_events');
      }}
    >
      My Events
    </Button>

    <br />

    {props.__engine.renderComponent('index.list_container', {})}
  </Container>
);
