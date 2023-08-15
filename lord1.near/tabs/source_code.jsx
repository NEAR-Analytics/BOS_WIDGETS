State.init({
  data: [],
  columnNamesFinall: ["Near", "USD", "User", "Widget"],
  columnImg: {
    volume:
      "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/chart-line-solid.svg",
    widgets:
      "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/heart-solid.svg",
    volume_usd:
      "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/globe-solid.svg",
    user: "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/file-contract-solid.svg",
  },
  descriptions: {
    volume:
      "How many Near distributed among devs and analysts on Near by Flipside",
    volume_usd:
      "How much USD distributed among devs and analysts on Near by Flipside",
    user: "How many analysts and devs received initiatives from Flipside",
    widgets: "Number of Flipside-related widgets",
  },
});
const data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/1d836dc0-4d3c-43b5-9d66-c974cfccebee/data/latest"
);
State.update({ data: data.body });
const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "b";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num;
};
console.log(state.data);
const ParentDiv = styled.div`
width:30%;
margin:1rem;
min-height:150px;
max-height:300px;
background:#f3f3f3;
border-radius:25px;
padding:15px 25px;
box-shadow: "0px 0px 10px -1px  #806ce1";
@media only screen and (max-width: 1000px) {
  
 width:40%
  
}
@media only screen and (max-width: 770px) {
x{
  color: rgb(245, 245, 245);
}
 width:50%
  
}
>p{font-size:15px}
`;

return (
  <div style={{ padding: "1rem", display: "flex" }}>
    <ParentDiv onClick={res}>
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <img
          style={{ marginRight: "10px" }}
          width={20}
          src={state.columnImg.volume}
        />
        <h4>{state.columnNamesFinall[0]}</h4>
      </div>

      <h4>{formatNumber(state.data[0].VOLUME)}</h4>
      <p>{state.descriptions.volume}</p>
    </ParentDiv>{" "}
    <ParentDiv>
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <img
          style={{ marginRight: "10px" }}
          width={20}
          src={state.columnImg.volume_usd}
        />
        <h4>{state.columnNamesFinall[1]}</h4>
      </div>

      <h4>{formatNumber(state.data[0].VOLUME_USD)}</h4>
      <p>{state.descriptions.volume_usd}</p>
    </ParentDiv>{" "}
    <ParentDiv>
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <img
          style={{ marginRight: "10px" }}
          width={20}
          src={state.columnImg.user}
        />
        <h4>{state.columnNamesFinall[2]}</h4>
      </div>

      <h4>{formatNumber(state.data[0].USER)}</h4>
      <p>{state.descriptions.user}</p>
    </ParentDiv>{" "}
    <ParentDiv>
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <img
          style={{ marginRight: "10px" }}
          width={20}
          src={state.columnImg.widgets}
        />
        <h4>{state.columnNamesFinall[3]}</h4>
      </div>

      <h4>{formatNumber(state.data[0].WIDGETS)}</h4>
      <p>{state.descriptions.widgets}</p>
    </ParentDiv>
  </div>
);
