const fontFamily = props.fontFamily ?? "Arial, sans-serif";
const fontSize = props.fontSize ?? "10px";
const textColor = props.textColor ?? "white";
const backgroundColor = props.backgroundColor ?? "black";
const height = props.height ?? "20px";
const width = props.width ?? "100%";

State.init({
  raw: [],
  show: [],
  count: 0,
  footerContent: [],
});

const ensureHttpOrHttps = (url) => {
  return !url.startsWith("http://") && !url.startsWith("https://")
    ? "https://" + url
    : url;
};

const fetchApi = (queryURI, method, data) => {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (data) options["body"] = JSON.stringify(data);
  return asyncFetch(queryURI, options);
};

const BillBOSAddress = [
  {
    chain: "25925",
    address: "0xD8D21C24F8513E35bdC26832aD366ac2F4EE0d7F",
    rpc: "https://rpc-testnet.bitkubchain.io",
  },
  {
    chain: "35011",
    address: "0x21559144afcD0C2E3Ba5D0A6e41c46276663983B",
    rpc: "https://rpc.j2o.io/",
  },
];

const BillBOSCoreABI = fetch(
  "https://gist.githubusercontent.com/Chayanonc/1c7b2cf1559ed20b342f76846966cb65/raw/fa27150e36d18d43d6298c8dd27f8c8e852dde23/billbos-core.json"
);
if (!BillBOSCoreABI.ok) {
  return "Loading";
}
const IBillBOSCore = new ethers.utils.Interface(BillBOSCoreABI.body);

const myList = state.footerContent.map((item) => {
  return (
    <>
      <p class="title">{item.topic}</p>
      <p class="value">{item.value}</p>
    </>
  );
});

const Marquee = `
    <style>
      body {
        margin: 0
      }

      .marquee {
        white-space: nowrap;
        overflow: hidden;
        position: relative;
        font-family: ${fontFamily};
        font-size: ${fontSize};
        color: white;
        height: ${height};
        width: ${width};
        display: flex;
        align-items: center;
        justify-content: start;
      }

      .marquee span {
        display: inline-block;
        padding-left: 100%;
        white-space: nowrap;
        will-change: transform;
        animation: marquee 3s linear infinite;
      }

      .marquee div {
        padding-left: 100%;
        display: flex;
      }

      .title {
        margin-left: 25px;
        color: yellow;
      }

      .value {
        margin-left: 5px;
        color: white;
      }

      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(-100%);
      }
    </style>

    <div class="marquee">
        <span class="text-white">
            <div>
                ${myListString}
            </div>
        </span>
    </div>
  `;

const MarqueeStyled = styled.div`
  .marquee {
    position: relative;
    width: 100vw;
    max-width: 100%;
    height: 20px;
    overflow-x: hidden;
    background-color: black;
  }

  .track {
    position: absolute;
    white-space: nowrap;
    will-change: transform;
    animation: marquee 200s linear infinite;
  }

  .content {
    font-size: 13px;
    width: 100%;
  }

  .title {
    margin-left: 25px;
    color: yellow;
  }

  .value {
    margin-left: 5px;
    color: white;
  }

  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-5000%);
    }
  }
`;

const [count, setCount] = useState(0);

function weightedRandomItems(arr) {
  const result = [];
  const originalArr = [...arr];
  for (let i = 0; i < 5; i++) {
    const totalWeight = originalArr.reduce(
      (sum, item) => sum + Number(item[2]),
      0
    );
    const randomNum = Math.random() * totalWeight;
    let cumulativeWeight = 0;

    for (let j = 0; j < originalArr.length; j++) {
      cumulativeWeight += Number(originalArr[j][2]);

      if (randomNum <= cumulativeWeight) {
        result.push(originalArr[j]);
        originalArr.splice(j, 1);
        break;
      }
    }
    State.update({
      show: result,
    });
    submit(result);
  }
}

const _fetch = () => {
  BillBOSAddress.map((billBOS) => {
    new ethers.Contract(
      billBOS.address,
      IBillBOSCore,
      new ethers.providers.JsonRpcProvider(billBOS.rpc)
    )
      .getActiveAds()
      .then((res) => {
        if (res) {
          State.update({
            raw: state.raw.concat(
              res.map((item) => ({ ...item, chain: billBOS.chain }))
            ),
            count: state.count + 1,
          });
        } else {
          State.update({ count: state.count + 1 });
        }
      })
      .catch((err) => console.log(err));
  });
};

const submit = (show) => {
  new ethers.Contract(
    BillBOSAddress[0].address,
    IBillBOSCore,
    new ethers.providers.JsonRpcProvider(BillBOSAddress[0].rpc)
  )
    .count()
    .then((month) => {
      const data = {
        webpageOwnerWalletAddress: props.webpageOwnerAddress,
        month: Number(month.toString()),
        ads: show.map((item) => ({
          ad_id: item[0].toString(),
          chainId: item.chain,
        })),
      };
      fetchApi("https://api-billbos.0xnutx.space/ads", "POST", data);
    });
};

useEffect(() => {
  _fetch();

  fetchApi("https://api-billbos.0xnutx.space/bond", "GET").then((res) => {
    const content = res.body.map((item) => ({
      topic: item.name_th,
      value: item.coupon_rate,
    }));
    State.update({ footerContent: content });
  });
}, []);
useEffect(() => {
  if (state.raw.length > 0 && state.show.length <= 0) {
    weightedRandomItems(state.raw);
  }
}, [state.raw]);

useEffect(() => {
  if (state.show.length > 0) {
    const len = state.show.length;
    setInterval(() => {
      setCount((prev) => (prev + 1) % (len > 5 ? 5 : len));
    }, 5000);

    console.log(state.show);
    console.log(state.show[0][1][2]);
  }
}, [state.show]);

return (
  <div
    style={{
      width: "728px",
    }}
  >
    <div style={{ width: 728, height: 90 }}>
      {state.show.length > 0 ? (
        <a
          href={ensureHttpOrHttps(state.show[count][1][2]) || ""}
          target="_blank"
        >
          <img
            src={`https://ipfs.near.social/ipfs/${state.show[count][1][1]}`}
            width={728}
            height={90}
          />
        </a>
      ) : (
        <>Loading...</>
      )}
    </div>
    <MarqueeStyled>
      <div class="marquee">
        <div class="track" style={{ width: "100%" }}>
          <div
            class="content"
            style={{
              display: "flex",
            }}
          >
            {myList}
          </div>
        </div>
      </div>
    </MarqueeStyled>
  </div>
);
