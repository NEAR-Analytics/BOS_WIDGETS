const fontFamily = props.fontFamily ?? "Arial, sans-serif";
const fontSize = props.fontSize ?? "10px";
const textColor = props.textColor ?? "white";
const backgroundColor = props.backgroundColor ?? "black";
const height = props.height ?? "20px";
const width = props.width ?? "100%";

const arrayPrice = [
  { topic: "KUSDT/USD", value: 1.01 },
  { topic: "KKUB/USD", value: 12.01 },
  { topic: "JFIN/USD", value: 8.35 },
];

let myListString = "";
const myList = arrayPrice.map((item) => {
  myListString =
    myListString +
    `
        <p class="title">${item.topic}</p>
        <p class="value">${item.value}</p>
    `;
  return myListString;
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
        0% { transform: translate(0, 0); }
        100% { transform: translate(-100%, 0); }
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

const content = (
  <div
    style={{
      width: "728px",
    }}
  >
    <img
      style={{
        width: "728px",
        height: "90px",
      }}
      class="w-full rounded-t-xl"
      src="https://ipfs.near.social/ipfs/bafkreiboh77ctmdmbmuwizrjkykcpbmlpc7sxgabvb3u5p3zybu7u4g3fi"
      alt="uploaded"
    />
    <iframe
      className="w-100"
      srcDoc={Marquee}
      style={{ height, backgroundColor }}
    />
  </div>
);

return (
  <Widget
    src="porx-dev.near/widget/billbos-css"
    props={{
      children: content,
    }}
  />
);
