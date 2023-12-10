const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const fast = !props.profile;

const name = profile.name || "No-name profile";
const description = profile.description || "No Description";
const image = profile.image;
const title = props.title ?? `${name} @${accountId}`;
if (profile === null) {
  return "Loading";
}
State.init({
  listNFT: "",
});
const handleListNFT = () => {
  State.update({ [e.target.id]: e.target.value });
  console.log("test test", state.listNFT);
};

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vh;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const ModalBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 8px;
  color: blue;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1002;
`;

const CloseButton = styled.button`
  background: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  float: right;
`;

function Modal({ onClose, children }) {
  return (
    <ModalBackdrop>
      <ModalBox>
        <CloseButton onClick={onClose}>Close</CloseButton>
        <h3 style={{ paddingTop: "30px", paddingRight: "30px" }}>List NFT</h3>
        <select class="form-select" id="listNFT" onChange={handleListNFT}>
          <option value="opensea.io">Open Sea</option>
          <option value="rarible.com">Rarible</option>
          <option value="mintbase.xyz">Mintbase</option>
          <option value="paras.id">Paras</option>
          <option value="solsea.io">Solsea</option>
          <option value="solanart.io">Solanart</option>
          <option value="phantomgalaxies.com">Phantom Galaxy</option>
          <option value="floornfts.io">Floor</option>
        </select>
      </ModalBox>
    </ModalBackdrop>
  );
}

const {
  getSelectedShapes,
  getSnapshot,
  deleteShapes,
  getShapePageBounds,
  createShapeId,
  createShape,
  updateShape,
  asSvg,
  asPng,
  asDataUrl,
  snapshot,
} = props;

const [isModalOpen, setModalOpen] = useState(false);

const save = () => {
  Social.set({
    thing: {
      canvas: JSON.stringify(getSnapshot()),
    },
  });
};

const Button = styled.button`
  padding: 10px 20px;
`;

const toggleModal = () => {
  setModalOpen(!isModalOpen);
};

return (
  <>
    <div className="container-fluid">
      <img
        src="https://placekitten.com/1200/300"
        alt="Banner"
        className="img-fluid"
      />
    </div>
    {isModalOpen && (
      <Modal onClose={toggleModal}>
        <Widget
          key="everycanvas.near/widget/magic"
          src="everycanvas.near/widget/magic"
          props={{
            snapshot: JSON.stringify(snapshot),
          }}
          config={{
            redirectMap: redirectMapStore.redirectMap,
          }}
        />
      </Modal>
    )}
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <Widget
            src="mob.near/widget/Image"
            props={{
              image,
              alt: title,
              className: "img-fluid rounded-circle",
              style: {
                width: "50%",
                height: "50%",
                maxWidth: "130px",
                maxHeight: "130px",
                transform: "translate(1%, -50%)",
              },
              loading: "lazy",
              thumbnail,
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
            }}
          />

          <h3
            class="mt-0"
            style={{
              transform: "translate(15%, -180%)",
              fontSize: "12px",
              marginTop: "25px",
            }}
          >
            {title}
          </h3>
          <p
            class="mt-0"
            style={{ transform: "translate(15%, -120%)", marginTop: "10px" }}
          >
            Draft . %1 Royalty . Etheruem
          </p>
          <p class="mt-0" style={{ transform: "translate(15%, -80%)" }}>
            <p
              style={{
                marginTop: "40px",
              }}
            >
              {description}
            </p>
          </p>
        </div>
        <div class="col-md-8 mt-5 pt-3" style={{ textAlign: "right" }}>
          <a class="btn btn-success">CREATE CONTRACT</a>
          <a
            class="btn btn-success"
            href="https://near.org/mohaa.near/widget/mintNFT"
          >
            MINT NFT
          </a>
          <a class="btn btn-success" onClick={toggleModal}>
            LIST NFT
          </a>
          <h3 class="mt-3">{name}</h3>
          <div>button</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">0 Template</div>
        <div class="col-md-12">No NFTs to Display</div>
      </div>
    </div>
  </>
);
