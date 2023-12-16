const res = fetch("https://data.cityofnewyork.us/resource/fi97-k4k6.json");

const data = res.body;
const myData = res.body;

const formattedData = data.map((item, index) => ({
  id: index + 1, // Create an ID starting at 1
  lat: item.location_point.latitude,
  lng: item.location_point.longitude,
  streetaddress: item.streetaddress,
  open_year_round: item.open_year_round,
  accepts_ebt: item.accepts_ebt,
  daysoperation: item.daysoperation,
  marketname: item.marketname,
  borough: item.borough,
  hoursoperations: item.hoursoperations,
  seasondates: item.seasondates,
}));

data = myData = formattedData; // Reassign 'data' to the new formatted array

// function Inspect(p) {
//   return (
//     <div style={{ backgroundColor: "#00C600" }}>
//       <h1>{p.marketname}</h1>
//       <pre>{JSON.stringify(p, null, 2)}</pre>
//     </div>
//   );
// }

function Inspect(p) {
  const style = {
    backgroundColor: "#e6f4ea", // A softer green
    color: "#004d00", // A dark green that complements the background
    padding: "20px", // Added padding for better spacing
    borderRadius: "8px", // Optional: rounded corners for modern UI
    fontFamily: "monospace", // Ensures JSON is in a readable font
    fontSize: "16px", // Ensures text is legible
    overflowX: "auto", // In case of overflow, allow scrolling
  };

  return (
    <div style={style}>
      <h1 style={{ marginBottom: "0.5em" }}>{p.marketname}</h1>
      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        {JSON.stringify(p, null, 2)}
      </pre>
    </div>
  );
}

function handleSave(v) {
  console.log(v);
}

// function Form({ data }) {
//   return (
//     <div style={{ backgroundColor: "green" }}>
//       <h1>Form</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//       <button onClick={() => handleSave("hello")}>Save</button>
//     </div>
//   );
// }

function Form({ data, onSave }) {
  const formStyle = {
    backgroundColor: "#e6f4ea", // Softer green background
    padding: "20px", // Padding for spacing around the content
    borderRadius: "8px", // Rounded corners for modern UI
    fontFamily: "Arial, sans-serif", // More suitable font for form content
    color: "#004d00", // Complementary dark green color for text
    margin: "20px", // Margin around the form for spacing within its container
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Subtle shadow for depth
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50", // Green color for the button
    color: "white", // White text for contrast
    padding: "10px 20px", // Padding for a larger clickable area
    border: "none", // Remove default border
    borderRadius: "4px", // Rounded corners for the button
    cursor: "pointer", // Cursor indicates a clickable button
    fontSize: "16px", // Font size for readability
    margin: "10px 0", // Margin for spacing around the button
  };

  // Event handler for when the form is saved
  const handleSave = (value) => {
    console.log(value);
    if (onSave) {
      onSave(value);
    }
  };

  return (
    <div style={formStyle}>
      <h1 style={{ textAlign: "center" }}>Form Details</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button style={buttonStyle} onClick={() => handleSave(data)}>
        Save
      </button>
    </div>
  );
}

return (
  <Widget
    src="efiz.near/widget/Map.index"
    props={{
      markers: data,
      myMarkers: myData,
      onMapClick: (e) => console.log("map click", e),
      onMarkerClick: (e) => console.log("marker click", e),
      inspect: (p) => <Inspect {...p} />,
      form: (p) => <Form {...p} />,
    }}
  />
);
