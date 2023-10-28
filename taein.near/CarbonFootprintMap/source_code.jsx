const data = VM.require("ajluc.near/widget/data");
const markers = Social.get(`*/thing/carbonFootprint`, "final", {
  subscribe: "true",
});

const BG = styled.div`
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.375);
  box-shadow: 0 0.75rem 2rem 0 rgba(0, 0, 0, 0.1);
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.125);
  position: relative;
  z-index: 1;
  margin: 20px auto;
  width: 100%;
  height: 75vh;
`;

const Switch = styled.div`
  color: #999;
  font-size: 15px;
  font-weight: 800;
  font-family: 'Mona Sans', sans-serif;
  display: block;
  text-align: center;
  background: white;
  padding: 1px 6px;
  border-radius: 15px;
  margin-top: 15px;
  position: absolute;
  left: 50%;
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  z-index: 3;
`;

const Selected = styled.span`
  background: linear-gradient(
    120deg,
    #ffd50d 0%,
    #f29bc0 25%,
    #4f46e5 50%,
    #f29bc0 75%,
    #ffd50d 100%
  );
  color: #000;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 50s ease infinite;
  @keyframes shine {
    0% {
      background-position: -1000px;
    }
    100% {
      background-position: 1000px;
    }
  }
`;

const MAP_STYLE = "mapbox://styles/mapbox/streets-v12";
const MAP_TOKEN =
  "pk.eyJ1IjoidGVqMDEiLCJhIjoiY2xqcHZ2dGpkMDB5azNsbzQ0bmMwNjRjaCJ9.FVv2zRPaLwzZMgagbI2YZw";

const center = [-74.00596, 40.71421];
const zoom = 10;
const accountId = context.accountId;

const Container = styled.div`
  display: flex;
  width: 100%;
  border-radius: 2rem;
  margin-top: var(--header-height);
  height: calc(100vh - 70px);
  align-items: stretch;
  flex-direction: column;
  overflow: auto;
  position: relative;
  z-index: 2;
`;

const Button = styled.button`
  background: rgba(25, 26, 26, 0.75);
  border-radius: 6px;
  color: white;
  z-index: 1;
  padding: 6px 12px;
`;

const FormCard = styled.div`
  background: rgba(25, 26, 26, 0.9);
  color: #fff;
  border-radius: 1rem;
  padding: 12px;
  width: 360px;
  max-height: 1000px;
  position: absolute;
  left: 200px;
  top: 200px;
`;

const InspectCard = styled.div`
  background: rgba(25, 26, 26, 0.9);
  color: #fff;
  border-radius: 1rem;
  padding: 12px;
  width: 360px;
  max-height: 3600px;
  position: absolute;
  left: 0;
  top: 0;
`;

const Location = styled.div`
  position: absolute;
  bottom: 50px;
  @media (max-width: 510px) {
    padding: 6px 15px;
    bottom: 15px;
  }
`;

const MagicDot = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  background: radial-gradient(circle at 30% 30%, rgb(74, 73, 73), rgb(0, 0, 0));
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.06) 0px 2px 4px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px;
  
  img {
    opacity: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    transition: 0.3s;
  }
  &:hover img {
    opacity: 1;
  }
`;

const onMarkerClick = (marker) => {};

const dataMap = {
  onMarket: [],
  offMarket: [],
};

data.forEach((building) => {
  if (building.onMarket) {
    const markerObj = {
      ...building,
      id: building.address,
      lat: building.latitude,
      lng: building.longitude,
    };
    dataMap.onMarket = [...dataMap.onMarket, markerObj];
  } else if (!building.onMarket) {
    const markerObj = {
      ...building,
      id: building.address,
      lat: building.latitude,
      lng: building.longitude,
    };
    dataMap.offMarket = [...dataMap.offMarket, markerObj];
  }
});

Object.keys(markers).forEach((accountId) => {
  if (markers[accountId].thing && markers[accountId].thing.carbonFootprint) {
    const markerObj = JSON.parse(markers[accountId].thing.carbonFootprint);
    if (markerObj.onMarket) {
      dataMap.onMarket = [...dataMap.onMarket, markerObj];
    }

    dataMap.offMarket = [...dataMap.offMarket, markerObj];
  }
});

State.init({
  edit: false,
  currentLocation: {},
  data: {},
  newMarkers: [], // Added state variable to keep track of new markers
  carbonFootprints: {},
  formData: {
    electricityUsage: 0,
    gasUsage: 0,
    waterUsage: 0,
    wasteProduction: 0,
    travel: 0,
    foodConsumption: 0,
    useRenewableEnergy: false,
    recycle: false,
  },
  carbonFootprint: null,
});

const onMagicDotClick = () => {
  const selected =
    dataMap.onMarket[Math.floor(Math.random() * dataMap.onMarket.length)];
  State.update({ focusedMarker: selected, showInspect: true });
};

const handleSave = (formData) => {
  Social.set(
    {
      thing: {
        carbonFootprint: {
          "": JSON.stringify({
            id: formData.address || "",
            lng: state.currentLocation.lng,
            lat: state.currentLocation.lat,
            electricityUsage: formData.electricityUsage,
            gasUsage: formData.gasUsage,
            waterUsage: formData.waterUsage,
            wasteProduction: formData.wasteProduction,
            travel: formData.travel,
            foodConsumption: formData.foodConsumption,
            carbonFootprint: 14303,
          }),
        },
      },
    },
    {
      onCommit: () => {
        State.update({ edit: false, showForm: false, showInspect: false });
      },
      onCancel: () =>
        State.update({ edit: false, showForm: false, showInspect: false }),
    }
  );
};

const onMapClick = (e) => {
  if (state.edit) {
    const newMarker = {
      id: new Date().getTime().toString(),
      lat: e.coordinates.lat,
      lng: e.coordinates.lng,
    };
    State.update((prevState) => ({
      ...prevState,
      newMarkers: [...prevState.newMarkers, newMarker],
      showInspect: false,
    }));
  } else {
    State.update({
      currentLocation: e.coordinates,
      showInspect: false,
    });
  }
};

const calculateCarbonFootprint = (e) => {
  e.preventDefault(); // Prevent the default behavior
  State.update({
    edit: !state.edit,
    showForm: true,
    showInspect: false,
  });
};

function Form() {
  // Initialize the form state
  State.init({
    formData: {
      electricityUsage: 0,
      gasUsage: 0,
      waterUsage: 0,
      wasteProduction: 0,
      travel: 0,
      foodConsumption: 0,
    },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    // Update the form data in the state
    State.update({
      formData: {
        ...state.formData,
        [id]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(state.formData);
  };

  // Calculate the sum of all the form values
  const sum = Object.values(state.formData).reduce(
    (acc, val) => acc + parseFloat(val || 0),
    0
  );

  return (
    <FormCard>
      <div onSubmit={handleSubmit}>
        <div>
          <label>Electricity Usage (kWh):</label>
          <input
            type="number"
            id="electricityUsage"
            value={state.formData.electricityUsage}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gas Usage (therms):</label>
          <input
            type="number"
            id="gasUsage"
            value={state.formData.gasUsage}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Water Usage (gallons):</label>
          <input
            type="number"
            id="waterUsage"
            value={state.formData.waterUsage}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Waste Production (lbs):</label>
          <input
            type="number"
            id="wasteProduction"
            value={state.formData.wasteProduction}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Travel (miles):</label>
          <input
            type="number"
            id="travel"
            value={state.formData.travel}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Food Consumption (lbs):</label>
          <input
            type="number"
            id="foodConsumption"
            value={state.formData.foodConsumption}
            onChange={handleChange}
          />
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <input
            style={{ width: "45%" }}
            type="submit"
            value="Submit"
            onClick={() => handleSave(State.data)}
          />
          <input
            style={{ width: "45%" }}
            type="button"
            value="Cancel"
            onClick={() =>
              State.update({ edit: false, showForm: false, data: {} })
            }
          />
        </div>
      </div>
    </FormCard>
  );
}

function Inspect() {
  const carbonFootprint = Math.floor(Math.random() * 20000) + 1;
  return (
    <InspectCard>
      Your Neighbor's Carbon Footprint: {carbonFootprint}
    </InspectCard>
  );
}

function LocationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M13 9a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z" />
        <path d="M17.5 9.5c0 3.038-2 6.5-5.5 10.5c-3.5-4-5.5-7.462-5.5-10.5a5.5 5.5 0 1 1 11 0Z" />
      </g>
    </svg>
  );
}

return (
  <div className="position-relative h-100 w-100 p-1">
    <BG />
    <Card>
      <Container>
        {accountId && state.showForm && <Form />}

        {accountId && (
          <div
            style={{
              display: state.edit ? "none" : "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Location>
              <Button onClick={calculateCarbonFootprint}>
                Share My Carbon Footprint
              </Button>
            </Location>
          </div>
        )}

        {state.showInspect && (
          <Widget
            src={"efiz.near/widget/Map.Inspect"}
            props={{
              focusedMarker: state.focusedMarker,
              children: (p) => <Inspect {...p} />,
              markers: [
                ...dataMap.onMarket,
                ...dataMap.offMarket,
                ...state.newMarkers, // Include new markers in the markers prop
              ],
            }}
          />
        )}
        <Widget
          src={"efiz.near/widget/Map.Mapbox"}
          props={{
            API_URL,
            accessToken: MAP_TOKEN,
            styleUrl: MAP_STYLE,
            center,
            zoom,
            markerAsset:
              "https://www.clker.com//cliparts/G/e/o/0/f/m/map-pin-red-hi.png",
            markers: [
              ...dataMap.onMarket,
              ...dataMap.offMarket,
              ...state.newMarkers, // Include new markers in the markers prop
            ],
            onMapClick: (e) => {
              if (state.edit) {
                const newMarker = {
                  id: new Date().getTime().toString(),
                  lat: e.coordinates.lat,
                  lng: e.coordinates.lng,
                  // Add any other properties you need for the marker
                };
                State.update({
                  newMarkers: [...state.newMarkers, newMarker],
                  showInspect: false,
                });
              } else {
                State.update({
                  currentLocation: e.coordinates,
                  showInspect: false,
                });
              }
            },
            onMarkerClick: (e) => {
              State.update({ focusedMarker: e, showInspect: true });
            },
          }}
        />
      </Container>
    </Card>

    <MagicDot onClick={onMagicDotClick}>
      <img src="https://img.freepik.com/free-vector/hand-drawn-flat-halloween-background_23-2149077569.jpg?size=626&ext=jpg" />
    </MagicDot>
  </div>
);
