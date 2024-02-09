State.init({
  data: [],
  columnNamesFinall: ["Trans Volume", "Fees", "Users", "Trans Number"],
  columnImg: {
    AMOUNT_NEAR:
      "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/chart-line-solid.svg",
    transactions:
      "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/heart-solid.svg",
    fee: "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/globe-solid.svg",
    active_users:
      "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/file-contract-solid.svg",
  },
  descriptions: {
    AMOUNT_NEAR:
      "Total developers' transaction volume in the whole Near ecosystem",
    fee: "Total developer' transaction fees (in NEAR) in the whole Near ecosystem",
    active_users: "Number of developer",
    transactions:
      "Number of developer' transactions in the whole Near ecosystem",
  },
});
const data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/fdd47bda-8e98-4cb0-a16c-3e3bd8c31837/data/latest"
);
State.update({ data: data.body });
const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2).replace(/\.0$/, "") + "b";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2).replace(/\.0$/, "") + "m";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2).replace(/\.0$/, "") + "k";
  }
  return num;
};
console.log(state.data);
const ParentDiv = styled.div`
color:${props.textColor};
width:30%;
padding:1rem;
margin-right:1rem;
min-height:150px;
max-height:300px;
background:${props.backgroundColor};
border-radius:25px;
transition:1s all;
box-shadow: "0px 0px 10px -1px  #806ce1";
&:hover{
  transform:scale(1.1)
}

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
  <div style={{ display: "flex" }}>
    <ParentDiv onClick={res}>
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <img
          style={{ marginRight: "10px" }}
          width={20}
          src={state.columnImg.AMOUNT_NEAR}
        />
        <h4 style={{ color: props.headerColor }}>
          {state.columnNamesFinall[0]}
        </h4>
      </div>

      <h4 style={{ color: props.numberColor }}>
        {formatNumber(state.data[0].AMOUNT_NEAR)}
      </h4>
      <p style={{ color: props.textColor }}>{state.descriptions.AMOUNT_NEAR}</p>
    </ParentDiv>{" "}
    <ParentDiv>
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <img
          style={{ marginRight: "10px" }}
          width={20}
          src={state.columnImg.fee}
        />
        <h4 style={{ color: props.headerColor }}>
          {state.columnNamesFinall[1]}
        </h4>
      </div>

      <h4 style={{ color: props.numberColor }}>
        {formatNumber(state.data[0].fee)}
      </h4>
      <p style={{ color: props.textColor }}>{state.descriptions.fee}</p>
    </ParentDiv>{" "}
    <ParentDiv>
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <img
          style={{ marginRight: "10px" }}
          width={20}
          src={state.columnImg.active_users}
        />
        <h4 style={{ color: props.headerColor }}>
          {state.columnNamesFinall[2]}
        </h4>
      </div>

      <h4 style={{ color: props.numberColor }}>
        {formatNumber(state.data[0].active_users)}
      </h4>
      <p style={{ color: props.textColor }}>
        {state.descriptions.active_users}
      </p>
    </ParentDiv>{" "}
    <ParentDiv>
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <img
          style={{ marginRight: "10px" }}
          width={20}
          src={state.columnImg.transactions}
        />
        <h4 style={{ color: props.headerColor }}>
          {state.columnNamesFinall[3]}
        </h4>
      </div>

      <h4 style={{ color: props.numberColor }}>
        {formatNumber(state.data[0].transactions)}
      </h4>
      <p style={{ color: props.textColor }}>
        {state.descriptions.transactions}
      </p>
    </ParentDiv>
  </div>
);
