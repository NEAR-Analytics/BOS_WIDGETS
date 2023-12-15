const res = fetch("https://data.cityofnewyork.us/resource/fi97-k4k6.json");

console.log(res.body);

const data = res.body;
const myData = res.body;

// const formattedData = data.map((item, index) => ({
//   id: index + 1, // Create an ID starting at 1
//   latitude: item.location_point.latitude,
//   longitude: item.location_point.longitude,
// }));

const formattedData = data.map((item, index) => ({
  id: index + 1, // Create an ID starting at 1
  lat: item.location_point.latitude,
  lng: item.location_point.longitude,
}));

data = myData = formattedData; // Reassign 'data' to the new formatted array

console.log(data); // 'data' now has the value of 'formattedData'

console.log(formattedData);

// fetchData();
// const data = [
//   {
//     id: "1",
//     lng: -73.93799209472691,
//     lat: 40.70073671683767,
//   },
// ];

// const myData = [
//   {
//     id: "1",
//     lng: -73.93799209472691,
//     lat: 40.70073671683767,
//   },
// ];

function Inspect(p) {
  return (
    <div style={{ backgroundColor: "blue" }}>
      <h1>Inspect</h1>
      <pre>{JSON.stringify(p, null, 2)}</pre>
    </div>
  );
}

function handleSave(v) {
  console.log(v);
}

function Form({ data }) {
  return (
    <div style={{ backgroundColor: "blue" }}>
      <h1>Form</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => handleSave("hello")}>Save</button>
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
