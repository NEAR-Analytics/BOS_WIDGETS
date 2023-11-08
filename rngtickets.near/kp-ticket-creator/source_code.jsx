const accountId = context.accountId ?? props.accountId;
if (!accountId) {
  return "U need to login first or create new NEAR account here:https://shard.dog/go";
}
State.init({
  amount: "0.01",
  drops: "2",
  name: "",
  poapTitle: "NEAR WORLDWIDE",
  poapDesc:
    "NEAR WORLDWIDE is an electrifying event bridging the gap between the many regional communities that represent the NEAR ecosystem worldwide. This event is a transformative experience focused on global connectivity, innovation, and community growth. Join us in celebrating the global community with this immersive experience and be ready to be amazed, inspired, and connected like never before.",
  img: null,
  desc: "",
  pw: "nww",
  publicKeys: [],
  privKeys: [],
  allPws: [],
});
if (Storage.privateGet("key_list")) {
  let obj = Storage.privateGet("key_list");
  State.update({
    publicKeys: obj.publicKeys,
    privKeys: obj.privKeys,
  });
}

const keypomContract = "v2.keypom.near";
const gatewayUrl = "https://near.org/mintlu.near/widget/kp-ticket-handler";

const Yocto2Near = (amount) =>
  new Big(amount).div(new Big(10).pow(24)).toString();

const Near2Yocto = (amount) =>
  new Big(amount).times(new Big(10).pow(24)).toFixed().toString();

function fromHex(h) {
  var s = "";
  for (var i = 0; i < h.length; i += 2) {
    s += String.fromCharCode(parseInt(h.substr(i, 2), 16));
  }
  return decodeURIComponent(escape(s));
}

function generatePasswords() {
  var allPass = [];
  var fullHashed1 = "";
  var fullHashed2 = "";
  state.publicKeys.forEach((e) => {
    var fullUnhashed = state.pw + e + "1";
    console.log(`unhashed: ${fullUnhashed}`);
    asyncFetch("https://keypom.sctuts.com/hashpw/" + fullUnhashed).then(
      (res) => {
        var hashedJson = JSON.parse(res.body);
        fullHashed1 = hashedJson.pw;
        console.log(`hashed: ${fullHashed1}`);
        asyncFetch(
          "https://keypom.sctuts.com/hashpw/" + fullHashed1 + "/" + true
        ).then((result) => {
          var hashedJson2 = JSON.parse(result.body);
          fullHashed2 = hashedJson2.pw;
          allPass.push([
            {
              pw: `${fullHashed2}`,
              key_use: 1,
            },
          ]);
          console.log(`double hashed: ${fullHashed2}`);
        });
      }
    );
  });
  var finalAllPass = allPass.reverse();
  return finalAllPass;
}

const createDrop = () => {
  const newDropId = Date.now();

  if (state.name) {
    newDropId = Number(state.name);
  }
  console.log(`State name: ${state.name}`);

  asyncFetch(
    "https://keypom.sctuts.com/keypair/" +
      state.drops +
      "/rootEntropy/" +
      newDropId.toString()
  ).then((res) => {
    let keyPairs = JSON.parse(res.body);
    console.log("keypairs:", keyPairs);
    let pubKeys = [];
    let privKeys = [];
    keyPairs.forEach((e) => {
      pubKeys.push(e.pub);
      privKeys.push(e.priv);
    });

    let obj = {
      publicKeys: pubKeys,
      privKeys: privKeys,
    };
    State.update(obj);

    const allPass = generatePasswords();
    console.log(`AAAALLLL PASS: ${allPass}`);

    Storage.privateSet("key_list", obj);

    const calls = [
      {
        contractName: keypomContract,
        methodName: "create_drop",
        gas: "100000000000000",

        args: {
          public_keys: state.publicKeys,
          deposit_per_use: Near2Yocto(state.amount ?? "0.05"),
          drop_id: newDropId.toString(),
          config: {
            uses_per_key: 2,
          },

          passwords_per_use: allPass,
          fc: {
            methods: [
              null,
              [
                // mint NFT
                {
                  receiver_id: `nft-v2.keypom.near`,
                  method_name: "nft_mint",
                  args: "",
                  drop_id_field: "mint_id",
                  account_id_field: "receiver_id",
                  attached_deposit: Near2Yocto(0.1),
                },
              ],
            ],
          },
        },
        deposit: Near2Yocto(0.1),
      },
    ];
    if (!state.name) {
      calls.unshift({
        contractName: "nft-v2.keypom.near",
        methodName: "create_series",
        gas: "100000000000000",
        args: {
          mint_id: newDropId,
          metadata: {
            title: `${state.poapTitle}`,
            media: `https://ipfs.near.social/ipfs/${
              state.img
                ? state.img.cid
                : "bafkreigkja2hmcudxmxm2nsaee3madvkzjj2wttzr7wiijwgf3hbtaznzy"
            }`,
            description: `${state.poapDesc}`,
            copies: parseInt(`${state.drops}`),
          },
        },
        deposit: Near2Yocto(0.1),
      });
    }
    Near.call(calls);
  });
};

const onChangeValue = (t, v) => {
  State.update({
    [t]: v,
  });
  if (t == "drops" && v > 100) {
    State.update({
      drops: 100,
    });
  }
  if (t == "name") {
    State.update({
      name: v.replace(/\s+/g, "-").toLowerCase(),
    });
  }
  if (t == "password") {
    State.update({
      pw: v,
    });
  }
  console.log(t + " : ", v);
};

const getListLink = () => {
  let links = "";
  state.privKeys.map((e, i) => {
    let data = JSON.stringify({ u: accountId, k: e });
    //base64 encoded
    let link =
      gatewayUrl + "?key=" + state.publicKeys[i] + "&pk=" + state.privKeys[i];
    links += link + "   \n   ";
  });

  return links;
};

const saveDropInfo = () => {
  let obj = {
    img: state.img.cid,
    desc: state.desc,
  };
  console.log(obj);
};

return (
  <div className="mb-3 container row">
    <div className="container">
      <h2 className="mt-3">Create Ticket Drop</h2>
      <h4>Event Information</h4>
      <div className="input-field mt-3">
        Drop id (leave empty to create new):
        <input
          type="string"
          value={state.name}
          onChange={(e) => onChangeValue("name", e.target.value)}
        />
        Number of Tickets:
        <input
          type="number"
          min="1"
          max="100"
          defaultValue="2"
          value={state.drops}
          onChange={(e) => onChangeValue("drops", e.target.value)}
        />
        NEAR per Drop:
        <input
          type="number"
          min="0"
          step="0.001"
          defaultValue="0.001"
          onChange={(e) => onChangeValue("amount", e.target.value)}
        />
        Ticket Password (Case Sensitive):
        <input
          type="string"
          value={state.pw}
          onChange={(e) => onChangeValue("password", e.target.value)}
        />
      </div>
    </div>
    {!state.name && (
      <div className="container mt-3 pt-3 border-top border-3">
        <div className="config-drop">
          <h4>POAP Information</h4>
          {/*<h6 style={{ color: "orange" }}>
          Save this information before creating your drop
        </h6>*/}
          Set POAP Image
          <br />
          <IpfsImageUpload image={state.img} />
          <div className="mt-2">
            {state.img && (
              <img
                style={{ maxWidth: 500 }}
                src={`https://ipfs.near.social/ipfs/${
                  state.img.cid ?? state.img
                }`}
                alt="uploaded"
              />
            )}
          </div>
          POAP Title:
          <input
            type="string"
            value={state.poapTitle}
            onChange={(e) => onChangeValue("poapTitle", e.target.value)}
          />
          POAP Description:
          <input
            type="string"
            value={state.poapDesc}
            onChange={(e) => onChangeValue("poapDesc", e.target.value)}
          />
          <br />
          <Markdown className="mt-3" text={state.desc} />
          {/*
        <CommitButton
          className="btn btn-info"
          data={{
            keypomConfig: {
              img: state.img.cid ?? state.img,
              desc: state.desc,
            },
          }}
        >
          Save linkdrop info
        </CommitButton>
        */}
        </div>
      </div>
    )}
    <button
      className="btn btn-lg btn-primary mt-3"
      onClick={(e) => createDrop()}
    >
      Create Ticket Drop
    </button>

    <div className="result-field mt-4 border-top border-3 ">
      <h2 className="mt-3">Results</h2>
      {state.publicKeys.length > 0 && (
        <>
          <button
            className="btn btn-sm btn-dark"
            onClick={() => clipboard.writeText(JSON.stringify(getListLink()))}
          >
            Copy all {state.publicKeys.length} linkdrop to Clipboard
          </button>
        </>
      )}
      <br />
      <small>Make sure to save these links to use later!</small>

      <div className="link-list">
        {state.privKeys.length > 0 &&
          state.privKeys.map((e, i) => {
            // let link =
            //   "https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/" +
            //   e;
            let data = JSON.stringify({ u: accountId, k: e });

            //base64 encoded
            let link =
              gatewayUrl +
              "?key=" +
              state.publicKeys[i] +
              "?pk=" +
              state.privKeys[i];
            //Buffer.from(data, "utf-8").toString("base64")

            return (
              <>
                <div class="input-group mb-3">
                  <a
                    class="btn btn-outline-secondary"
                    target="_blank"
                    href={link}
                  >
                    {" "}
                    Drop #{i + 1}
                  </a>{" "}
                  <br />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    onClick={(e) => clipboard.writeText(link)}
                  >
                    Copy
                  </button>
                </div>
              </>
            );
          })}
      </div>
    </div>
  </div>
);
