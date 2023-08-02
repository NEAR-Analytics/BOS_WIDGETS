const Owner = "humans-of-near.near";
const API_URL = "https://humans.nearverselabs.com/api";
const MAP_STYLE = "mapbox://styles/mapbox/dark-v10";
const MAP_TOKEN =
  "pk.eyJ1IjoidGVqMDEiLCJhIjoiY2xqcHZ2dGpkMDB5azNsbzQ0bmMwNjRjaCJ9.FVv2zRPaLwzZMgagbI2YZw";

const center = [0, 30];
const zoom = 1.7;

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

return (
  <Wrapper>
    <Header>
      <Widget src={`${Owner}/widget/Header`} />
    </Header>

    <Widget
      src={`efiz.near/widget/Mapbox`}
      props={{ accessToken: MAP_TOKEN, styleUrl: MAP_STYLE, center, zoom }}
    />
  </Wrapper>
);
