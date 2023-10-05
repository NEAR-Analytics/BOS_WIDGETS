State.init({
  img: "https://raw.githubusercontent.com/phamr39/ezidev-imagestorage/master/ads/Test%20Ads%20Banner%20728x90.png",
  url: "ezidev.tech",
});

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 10px;
`;

const onBannerClick = () => {
  window.open(state.url, "_blank");
};

const bannerStyle = {
  border: "5px solid #fff",
  width: "728px",
  height: "90px",
  position: "fixed",
  magin: "auto",
  left: "30%",
  bottom: "0%",
  transform: "'translate(-50%, -10%)'",
};

return (
  <div className="container row">
    <div className="mt-2" style={bannerStyle}>
      <img src={state.img} alt="adbanner" onClick={onBannerClick} />
    </div>
    <Button primary>Primary</Button>
  </div>
);
