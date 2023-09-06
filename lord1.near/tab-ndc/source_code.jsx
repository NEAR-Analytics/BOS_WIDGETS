State.init({
  data: [],
  columnNamesFinall: ["Total", "HOM", "COA", "TC"],
  columnImg: {
    nomination:
      "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/chart-line-solid.svg",
    transactions:
      "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/heart-solid.svg",
    fee: "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/house.svg",
    active_users:
      "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/file-contract-solid.svg",
  },
});
const data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/c77c9dbb-43a6-4978-9857-096e52d300be/data/latest"
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
      <OverlayTrigger key="top" overlay={<Tooltip>Total</Tooltip>}>
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          <img
            style={{ marginRight: "10px" }}
            width={20}
            src={state.columnImg.nomination}
          />
          <h5 style={{ color: props.headerColor }}>
            {state.columnNamesFinall[0]}
          </h5>
        </div>
      </OverlayTrigger>

      <h4 style={{ color: props.numberColor }}>
        {formatNumber(state.data[0].total_alive)}
      </h4>
      <Widget
        src={"rubycop.near/widget/NDC.StyledComponents"}
        props={{ Tag: { title: "", className: props.dark } }}
      />
      <p style={{ color: props.textColor }}>
        Out of{" "}
        <span style={{ color: props.numberintextColor }}>
          {formatNumber(state.data[0].total_actions)}
        </span>{" "}
        nomination in total,
        <span style={{ color: props.numberintextColor }}>
          {formatNumber(state.data[0].deleted_actions)}
        </span>
        were revoked.
      </p>
    </ParentDiv>{" "}
    <ParentDiv>
      <OverlayTrigger key="top" overlay={<Tooltip>House Of Merit</Tooltip>}>
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          <img
            style={{ marginRight: "10px" }}
            width={20}
            src={state.columnImg.fee}
          />
          <h6 style={{ color: props.headerColor }}>
            {state.columnNamesFinall[1]}
          </h6>
        </div>
      </OverlayTrigger>

      <h4 style={{ color: props.numberColor }}>
        {formatNumber(state.data[0].houseofmerit_alive)}
      </h4>
      <Widget
        src={"rubycop.near/widget/NDC.StyledComponents"}
        props={{ Tag: { title: "", className: props.dark } }}
      />
      <p style={{ color: props.textColor }}>
        Out of{" "}
        <span style={{ color: props.numberintextColor }}>
          {formatNumber(state.data[0].houseofmerit_actions)}
        </span>{" "}
        nomination in total,
        <span style={{ color: props.numberintextColor }}>
          {formatNumber(state.data[0].houseofmerit_deleted_actions)}
        </span>
        were revoked.
      </p>
    </ParentDiv>
    <ParentDiv>
      <OverlayTrigger
        key="top"
        overlay={<Tooltip>Council Of Advisors</Tooltip>}
      >
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          <img
            style={{ marginRight: "10px" }}
            width={20}
            src={state.columnImg.active_users}
          />
          <h6 style={{ color: props.headerColor }}>
            {state.columnNamesFinall[2]}
          </h6>
        </div>
      </OverlayTrigger>

      <h4 style={{ color: props.numberColor }}>
        {formatNumber(state.data[0].transparencycommission_alive)}
      </h4>
      <Widget
        src={"rubycop.near/widget/NDC.StyledComponents"}
        props={{ Tag: { title: "", className: props.dark } }}
      />
      <p style={{ color: props.textColor }}>
        Out of{" "}
        <span style={{ color: props.numberintextColor }}>
          {formatNumber(state.data[0].transparencycommission_actions)}
        </span>{" "}
        nomination in total,
        <span style={{ color: props.numberintextColor }}>
          {formatNumber(state.data[0].transparencycommission_deleted_actions)}
        </span>
        were revoked.
      </p>
    </ParentDiv>{" "}
    <ParentDiv>
      <OverlayTrigger
        key="top"
        overlay={<Tooltip>Transparency Commission</Tooltip>}
      >
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          <img
            style={{ marginRight: "10px" }}
            width={20}
            src={state.columnImg.transactions}
          />
          <h6 style={{ color: props.headerColor }}>
            {state.columnNamesFinall[3]}
          </h6>
        </div>{" "}
      </OverlayTrigger>

      <h4 style={{ color: props.numberColor }}>
        {formatNumber(state.data[0].councilofadvisors_alive)}
      </h4>
      <Widget
        src={"rubycop.near/widget/NDC.StyledComponents"}
        props={{ Tag: { title: "", className: props.dark } }}
      />
      <p style={{ color: props.textColor }}>
        Out of{" "}
        <span style={{ color: props.numberintextColor }}>
          {formatNumber(state.data[0].councilofadvisors_actions)}
        </span>{" "}
        nomination in total,
        <span style={{ color: props.numberintextColor }}>
          {formatNumber(state.data[0].councilofadvisors_deleted_actions)}
        </span>
        were revoked.
      </p>
    </ParentDiv>
  </div>
);
//{
//  "backgroundColor": "#d2cafa",
//  "textColor": "#806ce1",
//  "headerColor": "#806ce1",
//  "numberColor": "#fff",
//  "numberintextColor": "#fff",
//  "dark": "dark" or ""
//}
