const [name, setName] = useState("");
const [showName, setShowName] = useState(false);
const [reminder, setReminder] = useState(false);
const [selectedTime, setSelectedTime] = useState([]);
const [medication, setMedication] = useState({
  medicationName: "",
  dose: "",
  duration: "",
  time: "",
});

const [showTimes, setShowTimes] = useState(false);

function handleShowTimes() {
  setShowName(true);
  setReminder(false);
}

function changeName(e) {
  setName(e.target.value);
}

function handleShowName() {
  setShowName(true);
}

function handleShowReminder() {
  setReminder(true);
  setShowName(false);
}

const patientStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "#f0f0f0",
  padding: "20px",
};

const componentStyle = {
  backgroundColor: "blue",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  marginBottom: "20px",
};

const inputStyle = {
  margin: "10px 0",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "100%",
};

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "5px",
  background: "#3498db",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const reminderFormStyle = {
  display: "flex",
  flexDirection: "column",
};

const entryStyle = {
  display: "bloc",
  padding: "10px",
  margin: "5px 0",
  borderRadius: "5px",
  marginBottom: "10px",
  paddingBottom: "20px",
};

const iconStyle = {
  cursor: "pointer",
  color: "red", // You can customize the trash icon color
};

function handleTimeChange(e) {
  setMedication({
    ...medication,
    time: e.target.value,
  });
}

function handleTimeAdd() {
  setSelectedTime((prevTimes) => [...prevTimes, medication.time]);
  setMedication({
    ...medication,
    time: "",
  });
  console.log(selectedTime);
}

const handleDeleteTime = (timeToDelete) => {
  const updatedTimes = selectedTime.filter((time) => time !== timeToDelete);
  setSelectedTime(updatedTimes);
};

const formatTime = (inputTime) => {
  if (!inputTime) return "";
  const [hours, minutes] = inputTime.split(":");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
  const formattedTime = `${formattedHours}:${minutes} ${ampm}`;
  return formattedTime;
};

const handleChange = (event) => {
  const { name, value } = event.target;
  setMedication((prevMedication) => ({
    ...prevMedication,
    [name]: value,
  }));
};

return (
  <div style={patientStyle}>
    {!showName && !reminder && (
      <div style={componentStyle}>
        <label>Enter your Name to Set Your Reminder</label>
        <input
          type="text"
          name="name"
          style={inputStyle}
          onChange={changeName}
        />
        <button type="submit" style={buttonStyle} onClick={handleShowName}>
          Set Name
        </button>
      </div>
    )}

    {showName && !reminder && (
      <div style={componentStyle}>
        <div>
          <h2>Hello {name}</h2>
          <h3>Your Current Medication Time</h3>
          {selectedTime.map((time) => (
            <p key={time} className="times">
              {formatTime(time)}
              <i
                className="fas fa-trash-alt"
                onClick={() => handleDeleteTime(time)}
              ></i>
            </p>
          ))}
        </div>
        <button style={buttonStyle} onClick={handleShowReminder}>
          Add Reminder
        </button>
      </div>
    )}

    {!showName && reminder && (
      <div style={componentStyle}>
        <div style={reminderFormStyle}>
          <label htmlFor="doctorName">Name of Medication</label>
          <input
            type="text"
            name="medicationName"
            style={inputStyle}
            placeholder="Type"
            required
          />

          <label htmlFor="dose">Number of Dosage</label>
          <input
            type="number"
            name="dose"
            style={inputStyle}
            placeholder="Type a Number"
            required
          />

          <label htmlFor="duration">Duration</label>
          <input
            type="number"
            name="duration"
            style={inputStyle}
            placeholder="Type Number of Days"
            required
          />

          <label htmlFor="time">
            Time
            <div className="time-input">
              <input
                type="time"
                name="time"
                style={inputStyle}
                value={medication.time}
                onChange={handleTimeChange}
              />
              <button type="button" onClick={handleTimeAdd}>
                Add
              </button>
            </div>
          </label>
          <div style={entryStyle}>
            {selectedTime.map((time) => (
              <p key={time} className="times">
                {formatTime(time)}
                <i
                  className="fas fa-trash-alt"
                  onClick={() => handleDeleteTime(time)}
                ></i>
              </p>
            ))}
          </div>
          <button type="button" style={buttonStyle} onClick={handleShowTimes}>
            Submit
          </button>
        </div>
      </div>
    )}
  </div>
);
