// helper function to fetch all events
const fetchAllEvents = () => {
  const index = Social.index("every", "every.near/type/event");

  let fetchedEvents = [];

  index.map((item) => {
    const path = `${item.accountId}/thing/${item.value.id}`;
    const blockHeight = item.blockHeight;

    const eventThing = Social.getr(path, blockHeight);
    fetchedEvents.push(eventThing.data);
  });

  return fetchedEvents;
};


const fetchedEvents = fetchAllEvents();

const formattedEvents = fetchedEvents.map((event) => {
  return {
    title: event.title,
    start: new Date(`${event.start} ${event.startTime}`),
    end: new Date(`${event.end} ${event.endTime}`),
    url: event.link,
    allDay: event.isAllDay === "true",
    editable: false,
    extendedProps: {
      category: event.category,
    },
  };
});

if (!formattedEvents) {
  return <div>Loading...</div>;
}

return (
  <Widget
    src="itexpert120-contra.near/widget/Calendar"
    props={{ events: formattedEvents }}
  />
);
