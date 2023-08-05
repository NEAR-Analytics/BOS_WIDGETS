const accountId = context.accountId;

<Widget src="duocelot.near/widget/error_001" />;

// Array of possible choices for each part of the prompt
const imageTypes = [
  "a poster",
  "a painting",
  "a photo",
  "a 3D render",
  "a sketch",
  "a portrait",
  "a sculpture",
];
const subjects = [
  "a human",
  "a monster",
  "an animal",
  "a nature element",
  "a flower",
  "a dragon",
  "a dog",
  "a cat",
  "a lizard",
];
const actions = [
  "playing",
  "jumping",
  "posing",
  "flying",
  "running",
  "standing",
  "sitting",
  "dancing",
  "singing",
];
const orientations = [
  "facing forward",
  "to the left",
  "to the right",
  "upwards",
  "downwards",
  "at an angle",
];

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random prompt
function generatePrompt() {
  const imageType = imageTypes[getRandomInt(0, imageTypes.length - 1)];
  const subject = subjects[getRandomInt(0, subjects.length - 1)];
  const action = actions[getRandomInt(0, actions.length - 1)];
  const orientation = orientations[getRandomInt(0, orientations.length - 1)];

  return `${imageType} of ${subject} ${action} and ${orientation}`;
}

initState({
  img: {},
  prompt: generatePrompt(),
  seed: null,
  rollImg:
    "https://ipfs.fleek.co/ipfs/bafybeih7tutznkvbuecy3nfmpwo7q5w7kzyqwdvlipjtcyqevnkpz2jf44",
  blur: 0,
  width: "auto",
  steps: 20,
  scale: 7,
});

async function uploadGeneratedImageToIpfs(imgSrc) {
  const response = await fetch(imgSrc);
  const blob = await response.blob();
  const formData = new FormData();
  formData.append("file", blob);

  const ipfsResponse = await fetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  const ipfsData = await ipfsResponse.json();
  State.update({
    img: {
      cid: ipfsData.cid,
    },
  });
}

function rollImage() {
  var seed = Math.trunc(Math.random() * 100000000);
  state.seed = seed;
  state.blur = 3;
  State.update(state);

  var encodedPrompt = encodeURIComponent(state.prompt);
  var imgSrc = `https://i.gpux.ai/gpux/sdxl?return_grid=true&prompt=${state.seed}&scale=${state.scale}&image_count=1&steps=${state.steps}&prompt=${encodedPrompt}`;

  uploadGeneratedImageToIpfs(imgSrc);
}

var imgSrc =
  "https://ipfs.fleek.co/ipfs/bafybeih7tutznkvbuecy3nfmpwo7q5w7kzyqwdvlipjtcyqevnkpz2jf44";
if (state.seed) {
  imgSrc = `https://i.gpux.ai/gpux/sdxl?return_grid=true&prompt=${state.seed}&image_count=1&steps=${state.steps}&prompt=${state.prompt}`;
}

function deleteImage() {
  state.imgRaw = null;
  State.update(state);
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
      <div>
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
          <div
            style={{
              border: "2px solid red",
              backgroundImage:
                "url(https://fleek.ipfs.io/ipfs/bafybeih7tutznkvbuecy3nfmpwo7q5w7kzyqwdvlipjtcyqevnkpz2jf44)",
              backgroundSize: "auto",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "524px",
              width: "524px",
              color: "#333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="https://ipfs.fleek.co/ipfs/bafybeiburel4azxripu5f6awh6azhitxbptqovppliyav6ilwndswk6yeq"
              style={{ position: "absolute", zIndex: 1 }}
            />
            <img
              src={state.imgRaw}
              onLoad={(e) => {
                state.blur = 0;
                State.update(state);
              }}
              style={{
                filter: `blur(${state.blur}px)`,
                zIndex: 0,
                objectFit: "cover",
                width: "524px",
                height: "524px",
              }}
            />
          </div>
          {state.imgRaw && (
            <div>
              <button onClick={uploadImageToIpfs}>Upload to IPFS</button>
              <button onClick={deleteImage}>Delete</button>
            </div>
          )}
        </div>
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
