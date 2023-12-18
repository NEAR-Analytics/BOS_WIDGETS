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
});

const BillBOSAddress = [
  {
    chain: "25925",
    address: "0x8995e9741A2b9c7f1Bb982d08c360F2951a23c24",
    rpc: "https://rpc-testnet.bitkubchain.io",
  },
  {
    chain: "35011",
    address: "0x9d8b5e3C762167a409Db7f11a38b17dE9192E136",
    rpc: "https://rpc.j2o.io/",
  },
];

const BillBOSCoreABI = fetch(
  "https://gist.githubusercontent.com/jimmy-ez/0344bb9cce14ced6c6e7f89d7d1654ce/raw/e7dd9962a90819f71de155b1f68f276eed07790a/BillBOSCoreABIV3.json"
);
if (!BillBOSCoreABI.ok) {
  return "Loading";
}
const IBillBOSCore = new ethers.utils.Interface(BillBOSCoreABI.body);

// Come from APIs
const arrayPrice = [
  { topic: "KUSDT/USD", value: 1.01 },
  { topic: "KKUB/USD", value: 12.01 },
  { topic: "JFIN/USD", value: 8.35 },
];

const myList = arrayPrice.map((item) => {
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

      @keyframes marquee {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
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
    animation: marquee 10s linear infinite;
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
    from { transform: translateX(100%); }
    to { transform: translateX(-50%); }
  }
`;

const [count, setCount] = useState(0);

function weightedRandomItems(arr) {
  const result = [];
  for (let i = 0; i < 5; i++) {
    const totalWeight = arr.reduce((sum, item) => sum + Number(item[2]), 0);
    const randomNum = Math.random() * totalWeight;
    let cumulativeWeight = 0;
    for (const item of arr) {
      cumulativeWeight += Number(item[2]);
      if (randomNum <= cumulativeWeight) {
        result.push(item);
        break;
      }
    }
  }
  return result;
}

const _fetch = () => {
  BillBOSAddress.map((billBOS) => {
    new ethers.Contract(
      billBOS.address,
      IBillBOSCore,
      new ethers.providers.JsonRpcProvider(billBOS.rpc)
    )
      .getAds()
      .then((res) => {
        State.update({
          raw: state.raw.concat(
            res.map((item) => ({ ...item, chain: billBOS.chain }))
          ),
          count: state.count + 1,
        });
      });
  });
};

const fetchApi = (queryURI, method, data) => {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (data) options[body] = JSON.stringify(data);
  return asyncFetch(queryURI, options);
};

const submit = (show) => {
  new ethers.Contract(
    BillBOSAddress[0].address,
    IBillBOSCore,
    new ethers.providers.JsonRpcProvider(BillBOSAddress[0].rpc)
  )
    .monthCount()
    .then((month) => {
      const data = {
        webpageOwnerWalletAddress: props.webpageOwnerAddress,
        month: Number(month.toString()),
        ads: show.map((item) => ({
          ad_id: item[0].toString(),
          chainId: item.chain,
        })),
      };
      console.log("data", data);
      fetchApi("https://api-billbos.0xnutx.space/ads", "POST", data);
    });
};

useEffect(() => {
  const intervalId = setInterval(() => {
    setCount((prev) => (prev + 1) % 5);
  }, 5000);
  return () => clearInterval(intervalId);
}, []);
useEffect(() => {
  _fetch();
}, []);
useEffect(() => {
  if (count === BillBOSAddress.length && state.show.length <= 0) {
    let show = weightedRandomItems(state.raw);
    State.update({
      show: show,
    });
    console.log("raw", state.raw);
    console.log("show", show);
    submit(show);
  }
}, [count]);

const content = (index) => {
  return (
    <div
      style={{
        width: "728px",
      }}
    >
      {state.show.length > 0 ? (
        <img
          src={`https://ipfs.near.social/ipfs/${state.show[index][1][1]}`}
          style={{ width: 728, height: 90 }}
        />
      ) : (
        <div style={{ width: 728, height: 90 }}>Loading...</div>
      )}

      <MarqueeStyled>
        <div class="marquee">
          <div class="track w-full">
            <div class="content flex flex-row">{myList}</div>
          </div>
        </div>
      </MarqueeStyled>
      <p class="absolute buttom-10 right-0 text-red-400">X</p>
    </div>
  );
};
return (
  <Widget
    src="porx-dev.near/widget/billbos-css"
    props={{
      children: content(count),
    }}
  />
);
