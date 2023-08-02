const Owner = "humans-of-near.near";
const API_URL = "https://humans.nearverselabs.com/api";
const MAP_STYLE = "mapbox://styles/mapbox/dark-v10";
const MAP_TOKEN =
  "pk.eyJ1IjoidGVqMDEiLCJhIjoiY2xqcHZ2dGpkMDB5azNsbzQ0bmMwNjRjaCJ9.FVv2zRPaLwzZMgagbI2YZw";

const center = [0, 30];
const zoom = 1.7;

State.init({
  showModal: false,
  edit: false,
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
  color: "white",
  position: "absolute",
  left: 40,
  top: 130,
  zIndex: 1,
};

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
        Profile
      </button>
    </div>

    <Widget
      src={`efiz.near/widget/Mapbox`}
      props={{ accessToken: MAP_TOKEN, styleUrl: MAP_STYLE, center, zoom }}
    />
  </Wrapper>
);
