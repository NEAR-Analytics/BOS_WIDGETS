let event = props.event || null;

// return data;
if (!event) {
  return '';
}

const BG_CARD = '#ffffff';

const Card = props.__engine.Components.Card;

const EventHeaderImage = styled.div`
  height: auto;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 14px 14px 0 0;
  border-bottom: 0.1vw solid #cccccc;
  flex-shrink: 0;
  flex-grow: 0;
`;

const EventTitle = styled.h1`
  font-size: calc(max(1.25rem, 1.25vw));
  font-weight: 500;
  margin: 0;
  padding: 1vw calc(max(0.5rem, 0.5vw));
  width: 100%;
`;

const EventDate = styled.div`
  font-size: 0.8vw;
  font-weight: 400;
  margin: 0;
  padding: calc(max(0.5rem, 0.5vw));
  height: 42px;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  border-top: 0.1vw solid #cccccc;
`;

const EventBody = styled.div`
  width: 100%;
  height: auto;
  flex-grow: 100;
  flex-shrink: 0;
`;

function showEvent() {
  props.__engine.push('show', { event_id: event.id });
}

return (
  <Card
    onClick={() => {
      showEvent();
    }}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        showEvent();
      }
    }}
    role="button"
    tabIndex={0}
  >
    <EventHeaderImage>
      {props.__engine.renderComponent('components.event_image_slider', {
        event,
        mode: 'tile',
      })}
    </EventHeaderImage>

    <EventBody>
      <EventTitle>{event.name}</EventTitle>
    </EventBody>

    <EventDate>
      {props.__engine.renderComponent('components.event_date', { event })}
    </EventDate>
  </Card>
);
