const BG = styled.div`
	background-color: #fff;
	background-image: linear-gradient(180deg, #fafcfd 0%, #b6dbfc 100%);
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
	background: linear-gradient(90deg, #9333ea 0%, #f29bc0 100%), #03d69d;
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
	border-radius: 50%;
	border: 1px solid #cbcbcb;
	background: linear-gradient(90deg, #f9d74a 0%, #ffd50d 100%);
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

const MAP_STYLE = "mapbox://styles/mapbox/outdoors-v12";
const MAP_TOKEN =
  "pk.eyJ1IjoidGVqMDEiLCJhIjoiY2xqcHZ2dGpkMDB5azNsbzQ0bmMwNjRjaCJ9.FVv2zRPaLwzZMgagbI2YZw";

const center = [-74.00597, 40.71427];
const zoom = 10;
const accountId = context.accountId;

const questions = [
  { key: 1, value: "How would you recognize someone from your borough?" },
  { key: 2, value: "What's a popular dish?" },
  { key: 3, value: "Name a famous landmark." },
  { key: 4, value: "What's some slang from your neighborhood?" },
  { key: 5, value: "What are the top 3 destinations?" },
  { key: 6, value: "What are people most likely doing on a Saturday?" },
  { key: 7, value: "What are you most likely to see on the train?" },
  { key: 8, value: "How do people say goodbye?" },
  { key: 9, value: "What’s the first thing a stranger asks when visiting?" },
  { key: 10, value: "Where do the locals go?" },
];

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
	background: #191a1a;
	border-radius: 6px;
	color: white;
	z-index: 1;
	padding: 10px 22px;
`;

const Profile = styled.div`
	position: absolute;
	right: 50px;
	top: 30px;
	@media (max-width: 510px) {
		padding: 6px 15px;
		right: 15px;
		top: 15px;
	}
`;

const Inspect = styled.div`
	position: absolute;
	left: 50px;
	top: 30px;
	@media (max-width: 510px) {
		padding: 6px 15px;
		right: 15px;
		top: 15px;
	}
`;

const Location = styled.div`
	position: absolute;
	bottom: 50px;
	@media (max-width: 510px) {
		padding: 6px 15px;
		bottom: 15px;
	}
`;

const markers = Social.get(`*/thing/libertyMarker`, "final", {
  subscribe: "true",
});

if (!markers) {
  return <></>;
}

const dataMap = {};

Object.keys(markers).forEach((accountId) => {
  if (markers[accountId].thing && markers[accountId].thing.libertyMarker) {
    const markerObj = JSON.parse(markers[accountId].thing.libertyMarker);
    dataMap[accountId] = { accountId, ...markerObj };
  }
});

State.init({
  locations: [],
  edit: false,
  currentLocation: (dataMap[accountId] && dataMap[accountId].coordinates) || {},
});

const handleSave = (data) => {
  if (!data) {
    data = dataMap[accountId].data;
  }
  Social.set(
    {
      thing: {
        libertyMarker: {
          "": JSON.stringify({
            coordinates: state.currentLocation,
            data,
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

function DownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 48 48"
    >
      <mask id="ipSDownOne0">
        <path
          fill="#fff"
          stroke="#fff"
          strokeLinejoin="round"
          strokeWidth="4"
          d="M36 19L24 31L12 19h24Z"
        />
      </mask>
      <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSDownOne0)" />
    </svg>
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
      <Switch>
        <Selected>Map</Selected> | List
      </Switch>
      <Container>
        {state.showInspect && (
          <Widget
            src={"libertydao.near/widget/boroughs.inspect"}
            props={{
              focusedMarker: state.focusedMarker,
              questions,
            }}
          />
        )}

        {/* Absolute Positioning */}
        {accountId && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Location>
              <Button
                onClick={
                  state.edit
                    ? () => handleSave()
                    : () => State.update({ edit: !state.edit })
                }
              >
                {`${!state.edit ? "Add Rent-Stabilized Apartment" : "Save"}`}
                <LocationIcon />
              </Button>
              {state.edit && (
                <Button
                  onClick={() => State.update({ edit: false, showForm: false })}
                >
                  Cancel
                </Button>
              )}
            </Location>
          </div>
        )}

        <Widget
          src={"libertydao.near/widget/boroughs.map"}
          props={{
            API_URL,
            accessToken: MAP_TOKEN,
            styleUrl: MAP_STYLE,
            center,
            zoom,
            markers: Object.values(dataMap),
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
      </Container>
    </Card>
    <Circle1 />
    <Circle2 />
  </div>
);
