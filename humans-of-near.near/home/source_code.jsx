const Owner = "humans-of-near.near";
const API_URL = "https://humans.nearverselabs.com/api";
const MAP_STYLE = "mapbox://styles/mapbox/dark-v10";
const MAP_TOKEN =
  "pk.eyJ1IjoidGVqMDEiLCJhIjoiY2xqcHZ2dGpkMDB5azNsbzQ0bmMwNjRjaCJ9.FVv2zRPaLwzZMgagbI2YZw";

const center = [0, 30];
const zoom = 1.7;
const accountId = context.accountId;

State.init({
  showModal: false,
  edit: false,
  user: {
    name: "",
    social: "",
    twitter: "",
  },
  loocations: [],
});

//Styles

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: stretch;
  flex-direction: column;
  background: black;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  position: absolute;
  padding: 30px 40px;
`;

const BtnStyle = {
  background: "#191a1a",
  padding: "10px 22px",
  borderRadius: "6px",
  border: "1px solid rgb(255, 255, 255)",
  color: "white",
  position: "absolute",
  left: "58px",
  top: "130px",
  zIndex: 1,
};

const BtnStyle2 = {
  background: "unset",
  padding: "10px 22px",
  borderRadius: "6px",
  border: "1px solid rgb(255, 255, 255)",
  color: "white",
  position: "absolute",
  bottom: 50,
  zIndex: 1,
};

const getMyData = () => {
  return asyncFetch(API_URL + `/auth/account?accountId=${accountId}`).then(
    (res) => {
      if (res.ok) {
        return res.body.user;
      }
    }
  );
};

const getLocations = () => {
  return asyncFetch(API_URL + `/location`).then((res) => {
    if (res.ok) {
      return res.body;
    }
  });
};

const getMyInfor = async () => {
  getMyData().then((user) => {
    State.update({
      user,
    });
  });
};

const getLocationsData = async () => {
  getLocations().then((data) => {
    State.update({
      locations: data,
    });
  });
};

const onClose = () => {
  State.update({ showModal: false });
};

getMyInfor();
getLocationsData();

return (
  <Wrapper>
    <Header>
      <Widget src={`${Owner}/widget/Header`} />
    </Header>

    <div>
      <button
        class="btn"
        style={BtnStyle}
        onClick={() => {
          State.update({ showModal: true });
        }}
      >
        {`Profile`}
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
              stroke-linejoin="round"
              stroke-width="4"
              d="M36 19L24 31L12 19h24Z"
            />
          </mask>
          <path
            fill="currentColor"
            d="M0 0h48v48H0z"
            mask="url(#ipSDownOne0)"
          />
        </svg>
      </button>
    </div>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        class="btn"
        style={BtnStyle2}
        onClick={() => {
          State.update({ edit: true });
        }}
      >
        {`Edit location`}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M13 9a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z" />
            <path d="M17.5 9.5c0 3.038-2 6.5-5.5 10.5c-3.5-4-5.5-7.462-5.5-10.5a5.5 5.5 0 1 1 11 0Z" />
          </g>
        </svg>
      </button>
    </div>

    {state.showModal && (
      <Widget
        src={`${Owner}/widget/Modal`}
        props={{ onClose, API_URL, user: state.user, getMyInfor }}
      />
    )}

    <Widget
      src={`${Owner}/widget/Mapbox`}
      props={{
        accessToken: MAP_TOKEN,
        styleUrl: MAP_STYLE,
        center,
        zoom,
        markers: state.loocations,
      }}
    />
  </Wrapper>
);
