State.init({
  img: "https://raw.githubusercontent.com/phamr39/ezidev-imagestorage/master/ads/Test%20Ads%20Banner%20728x90.png",
  url: "https://www.ezidev.tech",
  show: true,
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
  return (
    <iframe srcDoc={<a hreft="https://www.ezidev.tech" target="_blank" />} />
  );
};

const bannerStyle = {
  border: "5px solid #fff",
  width: "728px",
  height: "90px",
  position: "fixed",
  magin: "auto",
  bottom: "0%",
};

return (
  <div>
    <div
      className="mt-2"
      style={bannerStyle}
      onClick={onBannerClick}
      href={state.url}
    >
      <img src={state.img} alt="adbanner" />
    </div>
    {state.show && (
      <Button primary onClick={onBannerClick}>
        Primary
      </Button>
    )}
    <a
      href="https://www.ezidev.tech"
      style={{
        "background-color": "palevioletred",
      }}
    >
      {" "}
      Click me{" "}
    </a>
  </div>
);
