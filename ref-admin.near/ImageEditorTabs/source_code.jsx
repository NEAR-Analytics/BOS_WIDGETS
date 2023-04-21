const Container = styled.div`
  .tabContent{
    display:inline-flex;
    align-items:center;
    background: rgba(26, 46, 51, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    padding:3px 4px;
    list-style-type:none;
  }
  .tab-item .active{
    background: #304352;
  }
  .tab-item button{
    background-color:transparent;
    border-radius: 8px;
    font-weight: 500;
    font-size: 14px;
    color:#fff;
    height:30px;
    padding:0 22px;
    border:none;
  }
  .uploadButton .btn{
    background: #304352;
    border-radius: 10px;
    font-weight: 500;
    font-size: 14px;
    color:#fff;
    border:none;
  }
  .title{
     font-weight: 500;
     font-size: 16px;
     color: #FFFFFF;
     margin-bottom:10px;
   }
   .form-input{
     display:block;
     background: rgba(26, 46, 51, 0.25);
     border: 0.5px solid rgba(255, 255, 255, 0.3);
     border-radius: 10px;
     height: 47px;
     width:100%;
     color:rgba(255, 255, 255, 0.3);
     padding:0 10px
   }
   .form-input:focus-visible{
     outline:none;
   }
`;
const image = props.image;
const onChange = props.onChange;

const Tab = {
  Upload: "Upload",
  NFT: "NFT",
  URL: "URL",
};

const origTab = () =>
  image.nft.contractId || image.nft.tokenId
    ? Tab.NFT
    : !image.ipfs_cid && image.url
    ? Tab.URL
    : Tab.Upload;

State.init({
  origImage: image,
  tab: origTab(),
  url: image.url,
  nft: image.nft ?? {},
  img: { cid: image.ipfs_cid },
});

const setTab = (tab) => State.update({ tab });

if (JSON.stringify(image) !== JSON.stringify(state.image)) {
  State.update({
    image,
  });
}

let localImage = {};

if (state.origImage.nft.contractId || state.origImage.nft.tokenId) {
  localImage.nft = {};
  if (state.origImage.nft.contractId) {
    localImage.nft.contractId = null;
  }
  if (state.origImage.nft.tokenId) {
    localImage.nft.tokenId = null;
  }
}
if (state.origImage.ipfs_cid) {
  localImage.ipfs_cid = null;
}
if (state.origImage.url) {
  localImage.url = null;
}

if (state.tab === Tab.NFT && (state.nft.contractId || state.nft.tokenId)) {
  localImage.nft = {
    contractId: state.nft.contractId || "",
    tokenId: state.nft.tokenId || "",
  };
} else if (state.tab === Tab.Upload && state.img.cid) {
  localImage.ipfs_cid = state.img.cid;
}
if (state.tab === Tab.URL && state.url) {
  localImage.url = state.url;
}

if (onChange && JSON.stringify(image) !== JSON.stringify(localImage)) {
  onChange(localImage);
}

return (
  <Container>
    <ul className="tabContent">
      <li className="tab-item">
        <button
          className={`${state.tab === Tab.Upload ? "active" : ""}`}
          aria-current="page"
          onClick={() => setTab(Tab.Upload)}
        >
          Upload
        </button>
      </li>
      <li className="tab-item">
        <button
          className={`${state.tab === Tab.NFT ? "active" : ""}`}
          aria-current="page"
          onClick={() => setTab(Tab.NFT)}
        >
          NFT
        </button>
      </li>
      <li className="tab-item">
        <button
          className={`${state.tab === Tab.URL ? "active" : ""}`}
          aria-current="page"
          onClick={() => setTab(Tab.URL)}
        >
          URL
        </button>
      </li>
    </ul>
    <div
      className="py-2"
      style={{
        background: "transparent",
        minHeight: "9em",
      }}
    >
      <div
        className={`uploadButton ${
          state.tab === Tab.Upload ? "" : "visually-hidden"
        }`}
      >
        <IpfsImageUpload image={state.img} />
      </div>
      <div className={`${state.tab === Tab.NFT ? "" : "visually-hidden"}`}>
        <label class="title">NFT contract</label>
        <input class="form-input" type="text" value={state.nft.contractId} />
        <label class="title">NFT token id</label>
        <input class="form-input" type="text" value={state.nft.tokenId} />
      </div>
      <div className={`${state.tab === Tab.URL ? "" : "visually-hidden"}`}>
        <label class="title">Image URL</label>
        <input class="form-input" type="text" value={state.url} />
      </div>
    </div>
  </Container>
);
