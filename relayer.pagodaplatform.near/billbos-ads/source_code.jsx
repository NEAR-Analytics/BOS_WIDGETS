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
      class="w-full"
      src="https://ipfs.near.social/ipfs/bafkreiboh77ctmdmbmuwizrjkykcpbmlpc7sxgabvb3u5p3zybu7u4g3fi"
      alt="uploaded"
    />
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

return (
  <Widget
    src="porx-dev.near/widget/billbos-css"
    props={{
      children: content,
    }}
  />
);
