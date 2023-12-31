const data = VM.require("ajluc.near/widget/data");
const markers = Social.get(`*/thing/afforDWELL`, "final", {
  subscribe: "true",
});

if (!data) {
  return null;
}

const BG = styled.div`
	background-color: #fff;
	// background-image: linear-gradient(180deg, #fafcfd 0%, #b6dbfc 100%);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: -2;
`;

const Circle1 = styled.div`
	width: 500px;
	height: 500px;
	border-radius: 50%;
	// background: linear-gradient(90deg, #9333ea 0%, #f29bc0 100%), #03d69d;
	position: fixed;
	top: -100px;
	right: -100px;
	z-index: 0;
	opacity: 0.5;
	filter: blur(50px);
`;
const Circle2 = styled.div`
	width: 400px;
	height: 400px;
	border-radius: 100%;
	border: 1px solid #cbcbcb;
	position: fixed;
	top: 80px;
	right: -100px;
	z-index: 0;
	opacity: 0.8;
	filter: blur(100px);

	animation: move 3s ease infinite;

	@keyframes move {
		0% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(60px, 40px) scale(1.2);
		}
		100% {
			transform: translate(0, 0);
		}
	}
`;

const Card = styled.div`
	display: flex;
	flex-direction: column;
	background: rgba(255, 255, 255, 0.375);
	box-shadow: 0 0.75rem 2rem 0 rgba(0, 0, 0, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.125);
	position: relative;
	z-index: 1;
	margin: 20px auto;
	width: 100%;
	height: 30vh;
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

const center = [-74.00597, 40.71427];
const zoom = 10;
const accountId = context.accountId;

const Container = styled.div`
	display: flex;
	width: 100%;
	border-radius: 0;
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
	border-radius: 0px;
	color: white;
	z-index: 1;
	padding: 6px 12px;
`;

const FormCard = styled.div`
	background: rgba(25, 26, 26, 0.9);
	color: #fff;
	border-radius: 0;
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

const Units = styled.div`
	margin-top: 6px;
	border-top: 1px solid #fff;
	padding: 6px 12px;
`;

const Unit = styled.div`
	font-size: 15px;
	margin: 3px 0;
	padding-bottom: 6px;
	&:not(:last-child) {
		border-bottom: 1px dashed #fff;
	}
`;

const BuildingInfo = styled.div`
	font-size: 12px;
`;

const Tag = styled.span`
	background: #f9d74a;
	color: rgb(25, 26, 26);
	border-radius: 12px;
	padding: 2px 6px;
	margin-right: 3px;
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
	transition: transform 0.2s ease 0s, box-shadow 0.2s ease 0s;

	img {
		opacity: 0;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
		transition: 2s;
	}

	&:hover img {
		opacity: 1;
	}
`;

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
  if (markers[accountId].thing && markers[accountId].thing.afforDWELL) {
    const markerObj = JSON.parse(markers[accountId].thing.afforDWELL);
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
});

const onMagicDotClick = () => {
  const selected =
    dataMap.onMarket[Math.floor(Math.random() * dataMap.onMarket.length)];
  State.update({ focusedMarker: selected, showInspect: true });
};

const handleSave = (data) => {
  if (!data) {
    data = {
      unit: "1A",
      beds: 1,
      baths: 1,
      onMarket: true,
      verified: true,
      rating: 5,
      priceHistory: {},
      reviews: [],
    };
  }

  Social.set(
    {
      thing: {
        afforDWELL: {
          "": JSON.stringify({
            id: data.address || "",
            lng: state.currentLocation.lng,
            lat: state.currentLocation.lat,
            units: [data],
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

function VerificationIcon() {
  return (
    <img
      src="https://i.ibb.co/sHQcy2B/icons8-verified-96.png"
      width="18"
      height="18"
    />
  );
}

function RatingIcon({ value, max }) {
  const fill = Math.round((value / max) * 5);
  const unfill = 5 - fill;

  return (
    <span>
      {value}
      {[...Array(fill)].map(() => (
        <img
          src="https://i.ibb.co/vcZ4HT1/icons8-star-96.png"
          width="18"
          height="18"
        />
      ))}
      {[...Array(unfill)].map(() => (
        <img
          src="https://i.ibb.co/F8RZxTp/icons8-star-96-empty.png"
          width="18"
          height="18"
        />
      ))}
    </span>
  );
}

function Form() {
  return (
    <FormCard>
      <label>Apartment #:</label>
      <input
        type="text"
        onChange={(e) => {
          State.update({ ...State, data: { ...State.data, unit: e.data } });
        }}
      />
      <div>
        <label for="name">Price:</label>
        <input
          type="number"
          onChange={(e) => {
            State.update({
              ...State,
              data: { ...State.data, price: e.data },
            });
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "45%" }}>
          <label># Beds:</label>
          <input
            type="number"
            onChange={(e) => {
              State.update({ ...State, data: { ...State.data, beds: e.data } });
            }}
          />
        </div>
        <div style={{ width: "45%" }}>
          <label for="name"># Baths:</label>
          <input
            type="number"
            onChange={(e) => {
              State.update({
                ...State,
                data: { ...State.data, baths: e.data },
              });
            }}
          />
        </div>
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
    </FormCard>
  );
}

function Inspect() {
  return (
    <InspectCard>
      <img
        src={state.focusedMarker.imgSrc}
        height={150}
        style={{ width: "100%", objectFit: "cover" }}
      />
      {state.focusedMarker.address}
      <BuildingInfo>
        {state.focusedMarker.stories} Stories | {state.focusedMarker.built}{" "}
        Built
      </BuildingInfo>
      <Units>
        {state.focusedMarker.units.map((unit) => (
          <Unit></Unit>
        ))}
      </Units>
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

const data2 = fetch("https://data.cityofnewyork.us/resource/knr6-vurn.json");

if (!data2) {
  return <p>Loading...</p>;
}

const Container2 = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  height: 220px; /* 예시로 400px을 사용했으나 원하는 높이로 조절 가능합니다. */
  overflow: hidden;
`;

const OrganizationName = styled.h2`
  font-size: 1.5rem;
`;

const Mission = styled.div`
  margin-top: 10px;
`;

const VolunteerProgramDescription = styled.p`
  margin-top: 10px;
`;

const Address = styled.p`
  margin-top: 10px;
`;

const Website = styled.a`
  margin-top: 10px;
  display: block;
`;

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

const OrganizationCard = ({ organization, index }) => {
  return (
    <>
      <Container2>
        <div key={index}>
          Area
          <OrganizationName>{organization.borough}</OrganizationName>
          <Mission
            dangerouslySetInnerHTML={{ __html: formatDate(organization.date) }}
          />
          <VolunteerProgramDescription>
            {formatDate(organization.date)}
          </VolunteerProgramDescription>
          <h6>Reason</h6>
          <Address>{organization.contributing_factors}</Address>
          <Website
            href={organization.website.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {organization.website.url}
          </Website>
        </div>
      </Container2>
    </>
  );
};

const renderItem = (a, index) => {
  return (
    <div key={JSON.stringify(a)}>
      <OrganizationCard organization={a} index={index} />
    </div>
  );
};

return (
  <div>
    <img
      src="https://www.empirecenter.org/wp-content/uploads/2023/03/Lower-Manhattan-skyline.jpg"
      alt="Description"
      style={{ width: "100%", display: "block" }}
    />

    {/* 상단바 */}
    <div
      style={{
        backgroundColor: "black",
        height: "50px",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      The Number of Car Accidents in New York City
    </div>

    <div
      style={{
        backgroundColor: "white",
        height: "90px",
        color: "black",
        display: "flex",
        alignItems: "center",
        padding: "10px 10px 10px 10px",
        justifyContent: "center",
        border: "solid",
      }}
    >
      This page shows data related to car accident statistics in New York City.
      Users can view information about the number of accidents in each borough,
      the date of the most recent accident, and other related details.
    </div>

    {/* 통계 정보 */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      <div
        style={{ width: "45%", border: "1px solid #e0e0e0", padding: "10px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <span>Top Accidents Area</span>
          <span style={{ color: "green" }}>New York City</span>
        </div>
        <div style={{ fontSize: "24px", marginBottom: "10px" }}>Manhattan</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "blue" }}>Counts</span>
          <span style={{ color: "red" }}>Latest</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>103</span>
          <span>2022-12-02</span>
        </div>
      </div>

      {/* Total Savings */}
      <div
        style={{ width: "45%", border: "1px solid #e0e0e0", padding: "20px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <span>Latest Accident</span>
          <span style={{ color: "green" }}>2022-12-02</span>
        </div>
        <div style={{ fontSize: "24px", marginBottom: "10px" }}>Manhattan</div>
        <h6>Reason</h6>
        vehicle 2 not paying attention
        {/* Bar chart representation (simplified) */}
      </div>
    </div>

    <div>
      <div className="position-relative h-100 w-100 p-1">
        <BG />
        <Card>
          <Switch>
            <Selected>Map</Selected> | List
          </Switch>
          <Container2>
            {accountId && state.showForm && <Form />}

            {accountId && (
              <div
                style={{
                  display: state.edit ? "none" : "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Location></Location>
              </div>
            )}

            {state.showInspect && (
              <Widget
                src={"efiz.near/widget/Map.Inspect"}
                props={{
                  focusedMarker: state.focusedMarker,
                  children: (p) => <Inspect {...p} />,
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
                markerAsset: "https://i.ibb.co/j464rX1/on.png",
                markers: [...dataMap.onMarket, ...dataMap.offMarket],
                myMarkerAsset: "https://i.ibb.co/fYs8b1d/off.png",
                myMarkers: dataMap.offMarket,
                edit: state.edit,
                onMapClick: (e) => {
                  State.update({
                    currentLocation: e.coordinates,
                    showInspect: false,
                  });
                },
                onMarkerClick: (e) => {
                  State.update({ focusedMarker: e, showInspect: true });
                },
              }}
            />
          </Container2>
        </Card>
        <Circle1 />
        <Circle2 />
      </div>
    </div>

    <div
      style={{
        backgroundColor: "black",
        height: "50px",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Car Accident History
    </div>

    <Widget
      src="efiz.near/widget/ItemFeed"
      props={{ items: data2.body || [], renderItem }}
    />
  </div>
);
