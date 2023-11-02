const accessToken = `pk.eyJ1IjoiMzMzMzMzMzMiLCJhIjoiY2xuYnJvNGQ4MGlueTJqcjdlbng0cWpycCJ9.pVVNrWeRzrqSdWxg2n-lqw`;

const ownerId = "nearcon23.near";

const coordinateObject = {
  hacker: {
    coordinates: [-9.103527750504185, 38.741422291924266],
  },
  community: {
    coordinates: [-9.10412980335633, 38.74123958634596],
  },
  nearcon: {
    coordinates: [-9.1062259067202, 38.73516922235015],
  },
};

const DataMap = {
  "Community HQ": {
    img: "https://i.ibb.co/Hr1XRXj/community.png",
    address: "Garagem Lisboa",
    map: "https://www.google.com/maps/place/R.+Pereira+Henriques,+Lisboa,+Portugal/@38.7409173,-9.1060679,17z/data=!3m1!4b1!4m6!3m5!1s0xd1933df3bc717d7:0xa6dbc055f9d40a3f!8m2!3d38.7409131!4d-9.103493!16s%2Fg%2F1thhlsmg?entry=ttu",
    appleMaps:
      "https://maps.apple.com/?address=Rua%20Pereira%20Henriques%203,%201950-242%20Lisboa,%20Portugal&auid=6832312148092515891&ll=38.740628,-9.104362&lsp=9902&q=Garagem%20Lisboa",
    images: [
      "https://ipfs.near.social/ipfs/bafkreidjxdiy2g5pkij633driuuup32bj5cak2a4rfiwhq6e64cketjqki",
    ],
  },
  "NEARCON HQ": {
    img: "https://i.ibb.co/WzJYS9V/nearconhq.png",
    address: "Convento Do Beato",
    map: "https://www.google.com/maps/place/Convento+do+Beato/@38.7348554,-9.1088421,17z/data=!3m1!4b1!4m6!3m5!1s0xd1933e0e05a00ab:0x1ab47681c49d3234!8m2!3d38.7348512!4d-9.1062672!16s%2Fm%2F0_qdlv1?entry=ttu",
    appleMaps:
      "https://maps.apple.com/?address=Alameda%20do%20Beato%2041,%201950-042%20Lisboa,%20Portugal&auid=16456445038167086154&ll=38.735012,-9.106280&lsp=9902&q=Convento%20do%20Beato",
    images: [
      "https://ipfs.near.social/ipfs/bafkreihyehu2pzwoqy5msm6622mqajn5inhzkkstqxh3btgg4igg6mgqri",
      "https://ipfs.near.social/ipfs/bafkreihccmkk4earnxlzbr6bzhac4rwv6enmwn4g64j3t4rcbks4unvkii",
    ],
  },
  "Hacker HQ": {
    img: "https://i.ibb.co/YBdG3rk/hacker.png",
    address: "Armazem 16",
    map: "https://www.google.com/maps/place/R.+Pereira+Henriques+16,+1950-242+Lisboa,+Portugal/@38.7410407,-9.1060257,17z/data=!3m1!4b1!4m6!3m5!1s0xd1933df23292a97:0x66ead8aebe385527!8m2!3d38.7410365!4d-9.1034508!16s%2Fg%2F11c1yl_sby?entry=ttu",
    appleMaps:
      "https://maps.apple.com/?address=Rua%20Pereira%20Henriques%2016,%201950-242%20Lisboa,%20Portugal&ll=38.741024,-9.103644&q=Rua%20Pereira%20Henriques%2016",
    images: [
      "https://ipfs.near.social/ipfs/bafkreigk7ackjppk4gmrpq4brjo3blcb6g4iwks3gi4iaphmndqqmvyxdu",
    ],
  },
};

initState({
  coordinates: [-9.104958285463987, 38.73661701484848],
  zoom: 14,
  initialize: false,
});

if (props.hq) {
  const data = coordinateObject[props.hq];
  State.update({
    coordinates: data.coordinates,
    zoom: 17,
    initialize: true,
  });
} else {
  State.update({ initialize: true });
}

const NoFlexInMobile = styled.div`
  @media only screen and (max-width: 800px) {
  display:block;
  }
  width:100%;
  display:flex;
  a {
    font-size:10px !important;
    text-align:center;
  }
`;

const BackgroundImage = styled.div`
  height:100vh;
  position:relative;
  margin-top:-100vh;
`;

const BackButton = styled.button`
  background-color: black;
  color: white;
  width:50px;
  height: 50px;
  border-radius:15px;
`;
const DownloadLink = styled.a`
  background-color: black;
  color: white;
  width:50px;
  height: 50px;
  border-radius:15px;
`;

const MapButton = styled.a`
  background-color: black;
  width: 300px;
  padding:10px;
  color: white;
  margin:auto;
  border-radius:15px;
  display:flex;
  text-align:center;
  justify-content:center;
  align-items:center;
  font-family:Mona Sans;
`;

const TopFlowButton = styled.div`
  padding:10px;
  display: flex;
  justify-content: space-between;
`;

const TabDiv = styled.div`
 background-color: black;
 overflow:hidden;
 border-radius:15px;
 gap:10px;
 height:52px;
 padding:5px;
 p {
  color:#FFFFFF;
  transform: translate(0px,8px);
  padding-left:10px;
  padding-right: 10px;
 }
 display:flex;
 button {
  display:flex !important;
  border-radius:15px;
  justify-content:center !important;
  align-items: center !important;
 }
`;

const [activeTab, setActiveTab] = useState(0);

const Tabs = () => {
  return DataMap[state.location].images.length === 2 ? (
    <TabDiv>
      <button
        onClick={() => {
          setActiveTab(0);
        }}
        style={{
          backgroundColor: activeTab === 0 ? "#282826" : "black",
          opacity: activeTab === 1 ? 0.5 : 1,
          borderWidth: 0,
        }}
      >
        <p>Floor 0</p>
      </button>
      {DataMap[state.location].images.length === 2 && (
        <button
          onClick={() => {
            setActiveTab(1);
          }}
          style={{
            backgroundColor: activeTab === 1 ? "#282826" : "black",
            opacity: activeTab === 0 ? 0.5 : 1,
            borderWidth: 0,
          }}
        >
          <p>Floor 1</p>
        </button>
      )}
    </TabDiv>
  ) : (
    <></>
  );
};

const CustomLink = ({ heading, image, link, subtitle, appleLink, images }) => (
  <>
    <img
      src={images[activeTab]}
      style={{
        width: "100%",
        height: "100vh",
        padding: 14,
        objectFit: "contain",
        top: 0,
        left: 0,
        backgroundColor: "#3D434D",
      }}
    />
    <BackgroundImage>
      <TopFlowButton>
        <BackButton
          onClick={() => {
            State.update({ location: undefined });
            setActiveTab(0);
          }}
        >
          <div style={{ margin: "auto", width: "fit-content" }}>
            <Widget src={`${ownerId}/widget/Icons.Back`} />
          </div>
        </BackButton>
        <Tabs />
        <DownloadLink target="_blank" download href={images[activeTab]}>
          <div style={{ margin: "auto", width: "fit-content", marginTop: 12 }}>
            <Widget src={`${ownerId}/widget/Icons.Download`} />
          </div>
        </DownloadLink>
      </TopFlowButton>
      <div
        style={{
          width: "fit-content",
          margin: "auto",
          width: "90%",
          position: "absolute",
          textAlign: "center",
          bottom: 90,
          marginLeft: "5%",
        }}
      >
        <MapButton target="_blank" href={appleLink}>
          <span style={{ marginRight: 5 }}>Open in Apple Maps</span>{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M17.5938 6.9375C17.5938 7.211 17.4851 7.47331 17.2917 7.6667C17.0983 7.8601 16.836 7.96875 16.5625 7.96875C16.289 7.96875 16.0267 7.8601 15.8333 7.6667C15.6399 7.47331 15.5312 7.211 15.5312 6.9375V3.92969L10.4171 9.04383C10.2234 9.23756 9.96062 9.3464 9.68664 9.3464C9.41266 9.3464 9.1499 9.23756 8.95617 9.04383C8.76244 8.8501 8.6536 8.58734 8.6536 8.31336C8.6536 8.03938 8.76244 7.77662 8.95617 7.58289L14.0703 2.46875H11.0625C10.789 2.46875 10.5267 2.3601 10.3333 2.1667C10.1399 1.97331 10.0312 1.711 10.0312 1.4375C10.0312 1.164 10.1399 0.901693 10.3333 0.708296C10.5267 0.514899 10.789 0.40625 11.0625 0.40625H16.5625C16.836 0.40625 17.0983 0.514899 17.2917 0.708296C17.4851 0.901693 17.5938 1.164 17.5938 1.4375V6.9375ZM13.8125 9C13.539 9 13.2767 9.10865 13.0833 9.30205C12.8899 9.49544 12.7812 9.75775 12.7812 10.0312V15.5312H2.46875V5.21875H7.96875C8.24225 5.21875 8.50456 5.1101 8.69795 4.9167C8.89135 4.72331 9 4.461 9 4.1875C9 3.914 8.89135 3.65169 8.69795 3.4583C8.50456 3.2649 8.24225 3.15625 7.96875 3.15625H2.125C1.66916 3.15625 1.23199 3.33733 0.90966 3.65966C0.587332 3.98199 0.40625 4.41916 0.40625 4.875V15.875C0.40625 16.3308 0.587332 16.768 0.90966 17.0903C1.23199 17.4127 1.66916 17.5938 2.125 17.5938H13.125C13.5808 17.5938 14.018 17.4127 14.3403 17.0903C14.6627 16.768 14.8438 16.3308 14.8438 15.875V10.0312C14.8438 9.75775 14.7351 9.49544 14.5417 9.30205C14.3483 9.10865 14.086 9 13.8125 9Z"
              fill="white"
            />
          </svg>
        </MapButton>
        <MapButton target="_blank" href={link} style={{ marginTop: 15 }}>
          <span style={{ marginRight: 5 }}>Open in Google Maps</span>{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M17.5938 6.9375C17.5938 7.211 17.4851 7.47331 17.2917 7.6667C17.0983 7.8601 16.836 7.96875 16.5625 7.96875C16.289 7.96875 16.0267 7.8601 15.8333 7.6667C15.6399 7.47331 15.5312 7.211 15.5312 6.9375V3.92969L10.4171 9.04383C10.2234 9.23756 9.96062 9.3464 9.68664 9.3464C9.41266 9.3464 9.1499 9.23756 8.95617 9.04383C8.76244 8.8501 8.6536 8.58734 8.6536 8.31336C8.6536 8.03938 8.76244 7.77662 8.95617 7.58289L14.0703 2.46875H11.0625C10.789 2.46875 10.5267 2.3601 10.3333 2.1667C10.1399 1.97331 10.0312 1.711 10.0312 1.4375C10.0312 1.164 10.1399 0.901693 10.3333 0.708296C10.5267 0.514899 10.789 0.40625 11.0625 0.40625H16.5625C16.836 0.40625 17.0983 0.514899 17.2917 0.708296C17.4851 0.901693 17.5938 1.164 17.5938 1.4375V6.9375ZM13.8125 9C13.539 9 13.2767 9.10865 13.0833 9.30205C12.8899 9.49544 12.7812 9.75775 12.7812 10.0312V15.5312H2.46875V5.21875H7.96875C8.24225 5.21875 8.50456 5.1101 8.69795 4.9167C8.89135 4.72331 9 4.461 9 4.1875C9 3.914 8.89135 3.65169 8.69795 3.4583C8.50456 3.2649 8.24225 3.15625 7.96875 3.15625H2.125C1.66916 3.15625 1.23199 3.33733 0.90966 3.65966C0.587332 3.98199 0.40625 4.41916 0.40625 4.875V15.875C0.40625 16.3308 0.587332 16.768 0.90966 17.0903C1.23199 17.4127 1.66916 17.5938 2.125 17.5938H13.125C13.5808 17.5938 14.018 17.4127 14.3403 17.0903C14.6627 16.768 14.8438 16.3308 14.8438 15.875V10.0312C14.8438 9.75775 14.7351 9.49544 14.5417 9.30205C14.3483 9.10865 14.086 9 13.8125 9Z"
              fill="white"
            />
          </svg>
        </MapButton>
      </div>
    </BackgroundImage>
  </>
);

return (
  <div>
    {state.location && (
      <CustomLink
        heading={state.location}
        image={DataMap[state.location].img}
        subtitle={DataMap[state.location].address}
        link={DataMap[state.location].map}
        appleLink={DataMap[state.location].appleMaps}
        images={DataMap[state.location].images}
      />
    )}
    {!state.location && state.initialize && (
      <Widget
        src={`${ownerId}/widget/Map.Iframe`}
        props={{
          state,
          update: (d) => {
            State.update(d);
          },
        }}
      />
    )}
  </div>
);
