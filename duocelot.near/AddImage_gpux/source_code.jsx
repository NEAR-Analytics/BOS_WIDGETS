const accountId = context.accountId;

<Widget src=“duocelot.near/widget/error_001”/>

initState({
  img: {},
  prompt:
    "a landscape mythical, clouds, sunset, sunrays, flare, 8k photorealistic, watercolor, cinematic lighting, HD, high details, atmospheric",
  scale: 7.5,
  seed: null,
  rollImg:
    "https://ipfs.fleek.co/ipfs/bafybeifigam7f4j64d5r4hhwxjzkutrdvg6uzz3mumf56byfigelaq4uki",
  ipfsUpload: {},
  blur: 0,
  width: "auto",
  margin: "4px",
});

function rollImage() {
  var seed = Math.trunc(Math.random() * state.scale);
  state.seed = seed;
  state.blur = 3;
  State.update(state);
}

function rollImageSINE() {
  var seed = Math.trunc(Math.sin(radians) * state.scale);
  state.seed = seed;
  state.blur = 3;
  State.update(state);
}

function rollImageCOMPLEX() {
  var seed = Math.trunc(Math.random() * math.complex("4 - 2i"));
  state.seed = seed;
  state.blur = 3;
  State.update(state);
}

var imgSrc =
  "https://ipfs.fleek.co/ipfs/bafybeih7tutznkvbuecy3nfmpwo7q5w7kzyqwdvlipjtcyqevnkpz2jf44";
if (state.seed) {
  imgSrc = `https://i.gpux.ai/gpux/sdxl?return_grid=true&prompt=${state.seed}&scale=${state.scale}&image_count=1&steps=8&prompt=${state.prompt}`;
}

const shadow = {
  boxShadow: "0px 12px 8px 14px rgba(0, 0, 0, 0.6)",
};

const txt1 = {
  fontFamily: "Arial",
  fontSize: "12px",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  position: "absolute",
  margin: "-44px 4px 4px 30px",
};

const txt2 = {
  fontFamily: "Arial",
  fontSize: "12px",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  position: "absolute",
  margin: "-44px 4px 4px 230px",
};

return (
  <div
    style={{
      width: "auto",
      height: "auto",
      backgroundImage:
        "url(https://ipfs.fleek.co/ipfs/bafybeifzundjo6rz52y35ywisrneb4dshrl5ogdziucgpeef4fn6pqffvi)",
      backgroundSize: "100%",
      backgroundPosition: "center",
      position: "flex",
    }}
  >
    <div>
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeiexyyaohnej54mu7u4lbtrgiu3b42mk5b57lo5d5yndbtcm7z43ni)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "162px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="https://ipfs.fleek.co/ipfs/bafybeihjvub4e3yqyazxr62dxpbohji45wnx7hp7gadxjbiet2nrgkhapy"
          alt="VG Logo"
          style={{ width: "180px", height: "auto" }}
        />
      </div>
      <div>
        <div style={{ width: "auto" }}>
          <input
            type="text"
            value={state.prompt}
            style={{
              width: "380px",
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
          width: "100%",
          height: "100%",
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeighshx342jt65t4nuisdpko3tar747kyzb2g6ud64pwuiwhxcvs7u)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "15px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>{" "}
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeihpktcha4szt2imr6a2kjvruj2g7bome4ek2faqdb7qvtpyftx5ly)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "81px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "200px",
            color: "white",
            fontFamily: '"Press Start 2P", sans-serif',
            fontSize: "12px",
            margin: "0px 60px 0px 0px",
          }}
        >
         
        <div>
          <a
            className="btn btn-outline-primary"
            onClick={(e) => rollImage()}
            style={{
              width: "60px",
              backgroundColor: "black",
              color: "white",
              fontFamily: '"Press Start 2P", sans-serif',
              fontSize: "24px",
              margin: "2px 2px 2px 2px",
              border: "1px solid #3a0201",
            }}
          >
            〜
          </a>
          <a
            className="btn btn-outline-primary"
            onClick={(e) => rollImage()}
            style={{
              width: "60px",
              backgroundColor: "black",
              color: "white",
              fontFamily: '"Press Start 2P", sans-serif',
              fontSize: "24px",
              margin: "2px 2px 2px 2px",
              border: "1px solid #3a0201",
            }}
          >
            〜
          </a>
        </div>
      </div>{" "}
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeiefpyc2h5b5drmuovzezx2u2gmbapzym3ckow5qmszl5ygudqvbam)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "8px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeihpktcha4szt2imr6a2kjvruj2g7bome4ek2faqdb7qvtpyftx5ly)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "81px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        <div
          style={{
            backgroundImage:
              "url(https://ipfs.fleek.co/ipfs/bafybeiefpyc2h5b5drmuovzezx2u2gmbapzym3ckow5qmszl5ygudqvbam)",
            backgroundSize: "auto",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "8px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0px 0px 0px 0px",
          }}
        >
          
        </div>
        <a
          className="btn btn-outline-primary"
          onClick={(e) => rollImage()}
          style={{
            width: "200px",
            backgroundColor: "black",
            color: "white",
            fontFamily: '"Press Start 2P", sans-serif',
            margin: "0px 0px 0px 5px",
            border: "1px solid #3a0201",
          }}
        >
          Generate
        </a>
      </div>
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeiefpyc2h5b5drmuovzezx2u2gmbapzym3ckow5qmszl5ygudqvbam)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "8px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeid735sh3xy36obxkexecpgp62zvtagpqoceck6fqcwq2pj3fqlemi)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "512px",
          color: "#333",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            boxShadow: "0px 12px 8px 14px rgba(0, 0, 0, 0.6)",
            maxWidth: "512px",
            maxHeight: "512px",
            overflow: "auto",
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        >
          <img
            src="https://ipfs.fleek.co/ipfs/bafybeiburel4azxripu5f6awh6azhitxbptqovppliyav6ilwndswk6yeq"
            style={{
              maxWidth: "512px",
              maxHeight: "512px",
              overflow: "auto",
              width: "100%",
              display: "flex",
              height: "100%",
              position: "absolute",
              zIndex: 1,
            }}
          />
          <img
            src={imgSrc}
            onLoad={(e) => {
              state.blur = 0;
              State.update(state);
            }}
            style={{
              maxWidth: "512px",
              maxHeight: "512px",
              overflow: "auto",
              width: "100%",
              height: "100%",
              display: "flex",

              filter: `blur(${state.blur}px)`,
              position: "relative",
              zIndex: 0,
            }}
          />
          <p style={txt1}>
            powered by
            <a href="https://gpux.ai" style={{ margin: "4px" }}>
              GPUX.AI
            </a>
          </p>
          <p style={txt2}>Art by {accountId}</p>
        </div>
      </div>
    </div>
    <div
      style={{
        backgroundImage:
          "url(https://ipfs.fleek.co/ipfs/bafybeibpfdcxl4mfmuo3wnahlryrvd37cfna4dlk4l2zeuefe4akwatctu)",
        backgroundSize: "auto",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "123px",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {" "}
      <a
        className="btn btn-outline-primary"
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
        add to gallery
      </a>{" "}
      <a
        className="btn btn-outline-primary"
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
        DOWNLOAD
      </a>
    </div>
    <div
      style={{
        backgroundImage:
          "url(https://ipfs.fleek.co/ipfs/bafybeibzr66w7yg7haicqpjebn24qhltfwkyu44kc2qxaj23t5swglm2ue)",
        backgroundSize: "auto",
        backgroundPosition: "center",
        height: "523px",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          maxWidth: "524px",
          maxHeight: "524px",
          width: "100%",
          height: "100%",
          margin: "0px 0px 0px 0px",
          position: "relative",
          display: "flex",
          border: "2px solid white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            border: "2px solid white",
            display: "flex",
            maxWidth: "512px",
            maxHeight: "512px",
            overflow: "auto",
            width: "100%",
            height: "100%",
            position: "relative",
            margin: "4px 4px 4px 4px",
          }}
        ></div>
      </div>
    </div>{" "}
    <div
      style={{
        backgroundImage:
          "url(https://ipfs.fleek.co/ipfs/bafybeiefpyc2h5b5drmuovzezx2u2gmbapzym3ckow5qmszl5ygudqvbam)",
        backgroundSize: "auto",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "8px",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    ></div>
    <div style={{ backgroundColor: "red", width: "100%", height: "80px" }}>
      
    </div>{" "}
    <div
      style={{
        backgroundImage:
          "url(https://ipfs.fleek.co/ipfs/bafybeiefpyc2h5b5drmuovzezx2u2gmbapzym3ckow5qmszl5ygudqvbam)",
        backgroundSize: "auto",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "8px",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    ></div>{" "}
    <div
      style={{
        backgroundImage:
          "url(https://ipfs.fleek.co/ipfs/bafybeiefpyc2h5b5drmuovzezx2u2gmbapzym3ckow5qmszl5ygudqvbam)",
        backgroundSize: "auto",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "8px",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    ></div>
  </div>
);
