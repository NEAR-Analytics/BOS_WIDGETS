State.init({
  data: [],
  columnNamesFinall: ["Voter", "Bonder", "Policy", "Revoked"],
  columnImg: {
    voter:
      "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/chart-line-solid.svg",
    revoker:
      "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/heart-solid.svg",
    bond: "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/globe-solid.svg",
    policy:
      "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/file-contract-solid.svg",
  },
  descriptions: {
    voter: "Total Number of voters",
    bond: "Total Number of bonder",
    policy: "Total number of policy adopters",
    revoker: "Total number of voters revoked",
  },
});
const data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/075eb36e-0b04-47da-a820-0ef0ede08a56/data/latest"
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
          src={state.columnImg.voter}
        />
        <h4 style={{ color: props.headerColor }}>
          {state.columnNamesFinall[0]}
        </h4>
      </div>

      <h4 style={{ color: props.numberColor }}>
        {formatNumber(state.data[0].voter)}
      </h4>
      <p style={{ color: props.textColor }}>{state.descriptions.voter}</p>
    </ParentDiv>{" "}
    <ParentDiv>
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <img
          style={{ marginRight: "10px" }}
          width={20}
          src={state.columnImg.bond}
        />
        <h4 style={{ color: props.headerColor }}>
          {state.columnNamesFinall[1]}
        </h4>
      </div>

      <h4 style={{ color: props.numberColor }}>
        {formatNumber(state.data[0].bond)}
      </h4>
      <p style={{ color: props.textColor }}>{state.descriptions.bond}</p>
    </ParentDiv>{" "}
    <ParentDiv>
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <img
          style={{ marginRight: "10px" }}
          width={20}
          src={state.columnImg.policy}
        />
        <h4 style={{ color: props.headerColor }}>
          {state.columnNamesFinall[2]}
        </h4>
      </div>

      <h4 style={{ color: props.numberColor }}>
        {formatNumber(state.data[0].policy)}
      </h4>
      <p style={{ color: props.textColor }}>{state.descriptions.policy}</p>
    </ParentDiv>{" "}
    <ParentDiv>
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <img
          style={{ marginRight: "10px" }}
          width={20}
          src={state.columnImg.revoker}
        />
        <h4 style={{ color: props.headerColor }}>
          {state.columnNamesFinall[3]}
        </h4>
      </div>

      <h4 style={{ color: props.numberColor }}>
        {formatNumber(state.data[0].revoker)}
      </h4>
      <p style={{ color: props.textColor }}>{state.descriptions.revoker}</p>
    </ParentDiv>
  </div>
);
