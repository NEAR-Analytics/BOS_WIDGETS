State.init({
  img: "https://ipfs.near.social/ipfs/bafkreidwo34qd2lc7zbesiwbz6cykdc4flch5er7z6vbtzc4zy564nbvre",
  url: "https://www.ezidev.tech",
  closeIcon:
    "https://ipfs.near.social/ipfs/bafkreibvngnwnkmyvjpe5c23v4nckervvqx3s7usxb6vyyqvuzx34mvlii",
  showAds: "true",
});

const bannerStyle = {
  border: "5px solid #fff",
  width: "728px",
  height: "90px",
  position: "fixed",
  magin: "auto",
  bottom: "0%",
};

const closeBtnStyle = {
  position: "absolute",
  top: "0px",
  right: "-10px",
  cursor: "pointer",
  width: "20px",
};

const onClose = () => {
  State.update({
    showAds: !state.showAds,
  });
};

return (
  <div className="mb-2" style={bannerStyle}>
    <div>
      {state.showAds && (
        <div>
          <a href={state.url} target="_blank">
            <img src={state.img} alt="adbanner" />
          </a>
        </div>
      )}
      {state.showAds && (
        <img src={state.closeIcon} style={closeBtnStyle} onClick={onClose} />
      )}
    </div>
  </div>
);
