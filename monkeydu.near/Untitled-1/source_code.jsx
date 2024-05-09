// App.js

const initialEvents = [
  {
    id: 1,
    title: "NEAR INDIA Zealy",
    date: "2024-01-15 to 2024-02-01",
  },
  {
    id: 2,
    title: "NEAR POSITIVE VIBES Zealy",
    date: "recently ended on 2024-01-28",
  },
  {
    id: 3,
    title: "NEAR UKRAINE Zealy",
    date: "2024-01-22 to 2024-02-09",
  },
];

const EventList = ({ events }) => {
  return (
    <div style={eventListStyle}>
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> - {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

const EventForm = ({ onAddEvent, onFilterEvents }) => {
  const [newEvent, setNewEvent] = useState({ title: "", date: "" });
  const [filterDate, setFilterDate] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddButtonClick = () => {
    onAddEvent(newEvent);
    setNewEvent({ title: "", date: "" });
  };

  const handleFilterChange = (e) => {
    setFilterDate(e.target.value);
  };

  const handleFilterButtonClick = () => {
    onFilterEvents(filterDate);
  };

  return (
    <div style={eventFormStyle}>
      <h2>Add Event</h2>
      <label style={labelStyle}>Title:</label>
      <input
        type="text"
        name="title"
        value={newEvent.title}
        onChange={handleInputChange}
        style={inputStyle}
      />

      <label style={labelStyle}>Date:</label>
      <input
        type="text"
        name="date"
        placeholder="YYYY-MM-DD"
        value={newEvent.date}
        onChange={handleInputChange}
        style={inputStyle}
      />

      <button onClick={handleAddButtonClick} style={buttonStyle}>
        Add Event
      </button>

      <h2>Filter Events</h2>
      <label style={labelStyle}>Filter by date:</label>
      <input
        type="text"
        placeholder="YYYY-MM-DD"
        value={filterDate}
        onChange={handleFilterChange}
        style={inputStyle}
      />

      <button onClick={handleFilterButtonClick} style={buttonStyle}>
        Filter Events
      </button>
    </div>
  );
};

const [events, setEvents] = useState(initialEvents);

const handleAddEvent = (newEvent) => {
  const addedEvent = {
    id: events.length + 1,
    title: newEvent.title,
    date: newEvent.date,
  };

  setEvents([...events, addedEvent]);
};

const handleFilterEvents = (filterDate) => {
  const filteredEvents = initialEvents.filter((event) =>
    event.date.includes(filterDate)
  );
  setEvents(filteredEvents);
};
const appStyle = {
  textAlign: "center",
  padding: "20px",
  backgroundColor: "#F4924D",
};

const headerStyle = {
  color: "#333",
};

const eventFormStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
};

const eventListStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  padding: "20px",
  borderRadius: "10px",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "10px",
  boxSizing: "border-box",
};

const buttonStyle = {
  backgroundColor: "#4caf50",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
const imageStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  width: "50px",
};

const buttonHoverStyle = {
  backgroundColor: "#45a049",
};
return (
  <div style={appStyle}>
    <img
      src="https://i.ibb.co/hCGKDkT/avatar-1001375169474.png"
      alt="Logo"
      style={imageStyle}
    />
    <h1 style={headerStyle}>Event App</h1>

    <EventForm
      onAddEvent={handleAddEvent}
      onFilterEvents={handleFilterEvents}
    />
    <EventList events={events} />
  </div>
);

// Styles
