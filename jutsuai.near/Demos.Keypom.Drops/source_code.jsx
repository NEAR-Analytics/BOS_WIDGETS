const accountId = context.accountId ?? props.accountId;
const KEYPOM_CONTRACT = "v2.keypom.near";
// const KEYPOM_CONTRACT = "v2.keypom.testnet";

if (!accountId) {
  return "Please Sign In!";
}

let dropInfo = Social.getr(`${accountId}/keypomConfig`);

const [amount, setAmount] = useState("0.05");
const [numOfdrops, setNumOfDrops] = useState("2");
const [publicKeys, setPublicKeys] = useState([]);
const [privKeys, setPrivKeys] = useState([]);

if (dropInfo === null) {
  console.log("dropinfo", dropInfo);
  return "Please wait...";
}

if (Storage.privateGet("key_list")) {
  let obj = Storage.privateGet("key_list");
  console.log("get from storage", obj);
  setPublicKeys(obj.publicKeys);
  setPrivKeys(obj.privKeys);
}

const Yocto2Near = (amount) =>
  new Big(amount).div(new Big(10).pow(24)).toString();

const Near2Yocto = (amount) =>
  new Big(amount).times(new Big(10).pow(24)).toFixed().toString();

const createDrop = () => {
  const randomKeypairsGeneratorUrl =
    "https://aem5mn8nr3.execute-api.us-east-1.amazonaws.com/production/api/v1/generator/keys/" +
    numOfdrops;
  asyncFetch(randomKeypairsGeneratorUrl).then((res) => {
    let keyPairs = res.body;
    console.log("keypairs:", res.body);
    let pubKeys = [];
    let privKeys = [];
    keyPairs.forEach((e) => {
      pubKeys.push(e.pub);
      privKeys.push(e.priv);
    });

    setPublicKeys(pubKeys);
    setPrivKeys(privKeys);

    Storage.privateSet("key_list", obj);

    console.log("public keys:", publicKeys, "priv keys:", privKeys);

    Near.call([
      {
        contractName: KEYPOM_CONTRACT,
        methodName: "create_drop",
        gas: "100000000000000",

        args: {
          public_keys: publicKeys,
          deposit_per_use: Near2Yocto(amount ?? "0.05"),
        },
        deposit: Near2Yocto(publicKeys.length * amount + 0.3),
      },
    ]);
  });
};

const getListLink = () => {
  let links = "";
  privKeys.map((e, i) => {
    let data = JSON.stringify({ u: accountId, k: e });
    //base64 encoded
    let link =
      gatewayUrl + "?k=" + Buffer.from(data, "utf-8").toString("base64");
    links += link + "   \n   ";
  });

  return links;
};

return (
  <div className="mb-3 container row">
    <div className="container">
      <h2 className="mt-3">Create new linkdrops</h2>
      <div className="input-field mt-5">
        Number of linkdrop:
        <input
          type="number"
          min="1"
          max="50"
          defaultValue="5"
          value={numOfdrops}
          onChange={(e) => setNumOfDrops(e.target.value)}
        />
        NEAR per Drop:
        <input
          type="number"
          min="0"
          step="0.01"
          defaultValue="0.05"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="btn btn-lg btn-primary mt-3"
          onClick={(e) => createDrop()}
        >
          Create
        </button>
      </div>
    </div>

    <div className="result-field mt-5 border-top border-3 ">
      <h2 className="mt-3">Results</h2>
      {publicKeys.length > 0 && (
        <>
          <button
            className="btn btn-sm btn-dark"
            onClick={() => clipboard.writeText(JSON.stringify(getListLink()))}
          >
            Copy all {publicKeys.length} linkdrop to Clipboard
          </button>
        </>
      )}
      <br />
      <small>Make sure to save these links to use later!</small>

      <div className="link-list">
        {privKeys.length > 0 &&
          privKeys.map((e, i) => {
            // let link =
            //   "https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/" +
            //   e;
            let data = JSON.stringify({ u: accountId, k: e });

            //base64 encoded
            let link =
              gatewayUrl +
              "?k=" +
              Buffer.from(data, "utf-8").toString("base64");

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
