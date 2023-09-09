const accountId = context.accountId;

<Widget src="duocelot.near/widget/error_001" />;

initState({
  img: {},
  imgRaw: null,
  prompt: "a rusty cyborg at a mechanical enviroment, 3D render",
  seed: null,
  rollImg:
    "https://ipfs.fleek.co/ipfs/bafybeih7tutznkvbuecy3nfmpwo7q5w7kzyqwdvlipjtcyqevnkpz2jf44",
  blur: 0,
  width: "auto",
  scale: 7,
  steps: 20,
});

function rollImage() {
  var seed = Math.trunc(Math.random() * 100000000);
  state.seed = seed;
  state.blur = 3;
  State.update(state);

  var imgSrc = `https://i.gpux.ai/gpux/sdxl?return_grid=true&prompt=${state.seed}&scale=${state.scale}&image_count=1&steps=20&prompt=${state.prompt}`;

  // Instead of uploading to IPFS right away, save the generated image to the state
  state.imgRaw = imgSrc;
  State.update(state);
}

function deleteImage() {
  state.imgRaw = null;
  State.update(state);
}

function uploadImageToIpfs() {
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: state.imgRaw,
  })
    .then((res) => {
      const cid = res.body.cid;
      console.log(res.body);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

return (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "linear-gradient(to right, black, #3a0201, black)",
      backgroundSize: "100% 100%",
      backgroundPosition: "center",
      position: "relative",
      overflow: "hidden",
      zIndex: 0,
    }}
  >
    <div style={{ width: "100%" }}>
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeihafj7gtw6jrwxb5xjyk22hy642hgwn2rjqguarkpvun5myovtb5i)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "162px",
          width: "100%",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="https://ipfs.fleek.co/ipfs/bafybeihjvub4e3yqyazxr62dxpbohji45wnx7hp7gadxjbiet2nrgkhapy"
          alt="VG Logo"
        />
      </div>

      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeiazlfekaws35jiqvesssae66xybdsutug7ab7moumr2t35vntbleu)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "81px",
          width: "100%",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ width: "auto" }}>
          <input
            type="text"
            value={state.prompt}
            style={{
              width: "auto",
              backgroundColor: "black",
              color: "white",
              fontFamily: '"Press Start 2P", sans-serif',
              border: "1px solid #3a0201",
            }}
            onChange={(e) => {
              state.prompt = e.target.value;
              State.update(state);
            }}
          />
        </div>
      </div>
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeiapzstltgyd6pyibvlgkg62wdsuqvbp2wqbwuqxmjhazxm7tgh2ee)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "15px",
          width: "100%",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      ></div>
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeibzasxppb76w62uje25cioacxzh5olpf76jezydpiywno5ab2zmqy)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "81px",
          width: "100%",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div>
          <input
            type="range"
            min={0}
            max={20}
            value={state.scale}
            onChange={(e) => {
              state.scale = e.target.value;
              State.update(state);
            }}
            style={{
              width: "100px",
              backgroundColor: "black",
              color: "white",
              fontFamily: '"Press Start 2P", sans-serif',
              margin: "10px 10px 10px 10px",
              border: "1px solid #3a0201",
            }}
          />
          <a>CFG {state.scale}</a>
        </div>
        <div>
          <input
            type="range"
            min={1}
            max={150}
            value={state.steps}
            onChange={(e) => {
              state.steps = e.target.value;
              State.update(state);
            }}
            style={{
              width: "100px",
              backgroundColor: "black",
              color: "white",
              fontFamily: '"Press Start 2P", sans-serif',
              margin: "10px 10px 10px 10px",
              border: "1px solid #3a0201",
            }}
          />
          <a>STEPS {state.steps}</a>
        </div>

        <button
          onClick={(e) => rollImage()}
          style={{
            width: "200px",
            backgroundColor: "black",
            color: "white",
            fontFamily: '"Press Start 2P", sans-serif',
            margin: "20px 20px 20px 20px",
            border: "1px solid #3a0201",
          }}
        >
          Generate
        </button>
        <a
          className="btn btn-outline-primary"
          onClick={(e) => uploadImageToIpfs()}
          style={{
            width: "200px",
            backgroundColor: "black",
            color: "white",
            fontFamily: '"Press Start 2P", sans-serif',
            margin: "20px 20px 20px 20px",
            border: "1px solid #3a0201",
          }}
        >
          Upload to IPFS
        </a>
      </div>
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeiaye7rrdceoz44waxyn5ozulhopx6pbq7d4336cn6nenjwxuftsbe)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "8px",
          width: "100%",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      ></div>
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeihdd765olkr6w2d5p7tiv3cyjqae4eh3b3aokyezyksi65alswybu)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "526px",
          color: "#333",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="https://ipfs.fleek.co/ipfs/bafybeiburel4azxripu5f6awh6azhitxbptqovppliyav6ilwndswk6yeq"
          style={{ position: "absolute", zIndex: 0 }}
        />
        <img
          src={state.imgRaw}
          onLoad={(e) => {
            state.blur = 0;
            State.update(state);
          }}
          style={{
            backgroundImage:
              "url(https://ipfs.fleek.co/ipfs/bafybeih7tutznkvbuecy3nfmpwo7q5w7kzyqwdvlipjtcyqevnkpz2jf44)",
            filter: `blur(${state.blur}px)`,
            zIndex: 0,
            objectFit: "contain", // ensure that the aspect ratio of the image is maintained
            maxHeight: "500px", // maximum height of the image
            maxWidth: "500px", // maximum width of the image
          }}
        />
      </div>
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeihm5fiwy6dos2f4hiz67yaan3jafkndw5zkh23mb5rnue7qu6rh2y)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "123px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeiamgwdx5uhhbgt7usn2wjxybn2b265mubicdj7bkyawgzjrmb22l4)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "523px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>
    </div>
  </div>
);
