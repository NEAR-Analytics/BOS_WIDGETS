State.init({
  data: [],
  columnNamesFinall: [
    "Transactions",
    "Components",
    "History (day)",
    "Stars Received",
  ],
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
  "https://api.flipsidecrypto.com/api/v2/queries/fe16224c-e176-4479-a40f-2e720e1b8cdf/data/latest"
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
const onHandelDate = (inputDate) => {
  let date = new Date(inputDate);
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = date.getDate();
  let month = monthNames[date.getMonth()];
  let year = date.getFullYear();
  let createdAt;
  createdAt = day + "th " + month + " " + year;
  return createdAt;
};

return (
  <div style={{ display: "flex" }}>
    <ParentDiv>
      <OverlayTrigger
        key="top"
        overlay={
          <Tooltip>
            Total number of transactions that include both build and update
            transactions, and your rank in terms of the number of dev
            transactions among other developers
          </Tooltip>
        }
      >
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
        {formatNumber(state.data[0].total_trxs)}
      </h4>
      <Widget
        src={"rubycop.near/widget/NDC.StyledComponents"}
        props={{ Tag: { title: "", className: props.dark } }}
      />

      <p style={{ color: props.textColor }}>
        <div>
          Build Transactions:{" "}
          <span style={{ color: props.numberintextColor }}>
            {formatNumber(state.data[0].build_trxs)}
          </span>{" "}
        </div>
        <div>
          Update Transactions:{" "}
          <span style={{ color: props.numberintextColor }}>
            {formatNumber(state.data[0].update_trxs)}
          </span>{" "}
        </div>
        <Widget
          src={"rubycop.near/widget/NDC.StyledComponents"}
          props={{ Tag: { title: "", className: props.dark } }}
        />
        Your Rank 👉
        <span style={{ color: props.numberintextColor }}>
          {formatNumber(state.data[0].widget_rank)}
        </span>
      </p>
    </ParentDiv>
    <ParentDiv onClick={res}>
      <OverlayTrigger
        key="top"
        overlay={
          <Tooltip>
            How many components have you developed, what is your rank based on
            the number of components, and are you considered an active developer
            (among the top 50 most active)
          </Tooltip>
        }
      >
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
        {formatNumber(state.data[0].widget)}
      </h4>
      <Widget
        src={"rubycop.near/widget/NDC.StyledComponents"}
        props={{ Tag: { title: "", className: props.dark } }}
      />
      <p style={{ color: props.textColor }}>
        <div>
          Total Components:{" "}
          <span style={{ color: props.numberintextColor }}>
            {formatNumber(state.data[0].widget)}
          </span>{" "}
        </div>
        <div>
          Active dev or not :{" "}
          <span style={{ color: props.numberintextColor }}>
            {formatNumber(state.data[0].active_or_not)}
          </span>{" "}
        </div>
        <Widget
          src={"rubycop.near/widget/NDC.StyledComponents"}
          props={{ Tag: { title: "", className: props.dark } }}
        />
        Your Rank 👉
        <span style={{ color: props.numberintextColor }}>
          {formatNumber(state.data[0].widget_rank)}
        </span>
      </p>
    </ParentDiv>
    <ParentDiv>
      <OverlayTrigger
        key="top"
        overlay={
          <Tooltip>
            When did you first start your development activity, how many days
            have you been active, and what is your rank based on your dev
            history
          </Tooltip>
        }
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
        {formatNumber(state.data[0].days)}
      </h4>
      <Widget
        src={"rubycop.near/widget/NDC.StyledComponents"}
        props={{ Tag: { title: "", className: props.dark } }}
      />
      <p style={{ color: props.textColor }}>
        <div>
          Active Since:{" "}
          <span style={{ color: props.numberintextColor }}>
            {onHandelDate(state.data[0].min_date)}
          </span>{" "}
        </div>
        <div>
          Active Days:{" "}
          <span style={{ color: props.numberintextColor }}>
            {formatNumber(state.data[0].active_date)}
          </span>{" "}
        </div>
        <Widget
          src={"rubycop.near/widget/NDC.StyledComponents"}
          props={{ Tag: { title: "", className: props.dark } }}
        />
        Your Rank 👉
        <span style={{ color: props.numberintextColor }}>
          {formatNumber(state.data[0].days_rank)}
        </span>
      </p>
    </ParentDiv>{" "}
    <ParentDiv>
      <OverlayTrigger
        key="top"
        overlay={<Tooltip>Number of stars received or sent in total</Tooltip>}
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
        {formatNumber(state.data[0].stars_received)}
      </h4>
      <Widget
        src={"rubycop.near/widget/NDC.StyledComponents"}
        props={{ Tag: { title: "", className: props.dark } }}
      />
      <p style={{ color: props.textColor }}>
        <div>
          Star Received:{" "}
          <span style={{ color: props.numberintextColor }}>
            {formatNumber(state.data[0].stars_received)}
          </span>{" "}
        </div>
        <div>
          Star Sent:
          <span style={{ color: props.numberintextColor }}>
            {formatNumber(state.data[0].stars_sent)}
          </span>{" "}
        </div>
        <Widget
          src={"rubycop.near/widget/NDC.StyledComponents"}
          props={{ Tag: { title: "", className: props.dark } }}
        />
        Your Rank 👉
        <span style={{ color: props.numberintextColor }}>
          {formatNumber(state.data[0].stars_received_rank)}
        </span>
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
