const latRange = props.latRange;
const lonRange = props.lonRange;
const locationName = props.locationName;
const IPAPI_TOKEN = props.IPAPI_TOKEN;

State.init({
  locationStatus: "UNDETERMINED", // UNDETERMINED, IN_LOCATION, OUTSIDE_LOCATION
  message: "",
});

const checkIfInLocation = (lat, lon) => {
  if (
    lat >= latRange[0] &&
    lat <= latRange[1] &&
    lon >= lonRange[0] &&
    lon <= lonRange[1]
  ) {
    State.update({ locationStatus: "IN_LOCATION", message: "" });
  } else {
    State.update({
      locationStatus: "OUTSIDE_LOCATION",
      message: `Sorry, you are not in ${locationName}.`,
    });
  }
};

const requestLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        checkIfInLocation(lat, lon);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          // Use IP-based geolocation as a fallback
          fetch(`https://pro.ip-api.com/json/?key=${IPAPI_TOKEN}`)
            .then((response) => response.json())
            .then((data) => {
              const [lat, lon] = data.loc.split(",");
              checkIfInLocation(parseFloat(lat), parseFloat(lon));
            })
            .catch((err) => {
              State.update({ message: "Unable to determine location." });
            });
        }
      }
    );
  } else {
    State.update({
      message: "Geolocation is not supported by this browser.",
    });
  }
};

return (
  <div>
    {state.locationStatus === "UNDETERMINED" ? (
      <div id="overlay">
        <div id="location-explainer">
          <p>
            We request your location to ensure you're in {locationName} in order
            to claim this. We respect your privacy and won't share or save your
            location.
          </p>
          <button onClick={requestLocation}>Allow Location</button>
          <p>{state.message}</p>
        </div>
      </div>
    ) : (
      <div id="main-content">
        {state.locationStatus === "IN_LOCATION" ? (
          <button id="submit-button">Submit</button>
        ) : (
          <p>{state.message}</p>
        )}
      </div>
    )}
  </div>
);
