const hash = "fe16224c-e176-4479-a40f-2e720e1b8cdf";
const columnNamesFinall = [
  "Transactions",
  "Components",
  "History (day)",
  "Stars Received",
];

const columnImg = {
  nomination:
    "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/chart-line-solid.svg",
  transactions:
    "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/heart-solid.svg",
  fee: "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/house.svg",
  active_users:
    "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/file-contract-solid.svg",
};
State.init({
  searchedSinger: "",
  data: [],
  isLoading: true,
  error: [],
});
const checkNewSinger = () => {
  if (state.searchedSinger === props.singer) {
    return;
  } else {
    State.update({ searchedSinger: props.singer, isLoading: true });
  }
};
checkNewSinger();
const handleData = () => {
  const result = fetchData(hash);
  if (result.isLoading) {
    State.update({ isLoading: true, data: [] });
  }
  if (result.error) {
    const errors = state.error;
    errors.push(`error message is : "${result.error}"`);
    State.update({ error: errors, isLoading: false });
  }
  if (result.data) {
    const signerData = result.data.find(
      ({ singer }) => singer === state.searchedSinger
    );
    State.update({ data: signerData ? [signerData] : [], isLoading: false });
  }
};
const fetchData = (hash) => {
  const data = fetch(
    `https://api.flipsidecrypto.com/api/v2/queries/${hash}/data/latest`,
    {
      subscribe: true,
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    }
  );
  const result = {
    data: (data && data.body) || null,
    error: (data && !data.ok && (data.status || data.error)) || null,
    isLoading: !data && !error,
  };
  return result;
};
if (state.isLoading) {
  handleData();
}
if (state.error.length > 0) {
  function hide() {
    const errors = state.error;
    errors.shift();
    if (errors.length > 0) setTimeout(hide, 2500);
    State.update({ error: errors });
  }
  setTimeout(hide, 2500);
}

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

const noData = <div className="w-100 py-4 text-center">No data available</div>;

const ParentDiv = styled.div`
color:${props.textColor};
flex-basis:23%;
padding:1rem;
min-height:150px;
max-height:300px;
background:${props.backgroundColor};
border-radius:25px;
transition:0.3s all;
box-shadow: "0px 0px 10px -1px  #806ce1";
&:hover{
  transform:scale(1.1);
  opacity:0.9
}

@media only screen and (max-width: 770px) {
 flex-basis:50%
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
  <div className="d-flex flex-wrap justify-content-around gap-1">
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      {state.error.length > 0 &&
        state.error.map((er) => (
          <div
            className="toast show align-items-center text-bg-danger border-0"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body">{er}</div>
            </div>
          </div>
        ))}
    </div>
    {state.data.length > 0 ? (
      <>
        <ParentDiv>
          <OverlayTrigger
            key="top"
            overlay={
              <Tooltip>
                <div>
                  Transactions: Total transactions of a developer (Build +
                  Update + both) related to widget development
                </div>
                <div>
                  Build Transactions: The number of transactions resulting in
                  component builds
                </div>
                <div>
                  Update Transactions: The number of transactions resulting in
                  component updates
                </div>
                <div>
                  Your Rank: Developer rank based on the number of transactions
                  (the lower the better)
                </div>
              </Tooltip>
            }
          >
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
              }}
            >
              <img
                style={{ marginRight: "10px" }}
                width={20}
                src={columnImg.nomination}
              />
              <h5 style={{ color: props.headerColor }}>
                {columnNamesFinall[0]}
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

          <p>
            <div>
              Build | Update Trxs:
              <span style={{ color: props.numberintextColor }}>
                {formatNumber(state.data[0].build_trxs)}
              </span>
              |
              <span style={{ color: props.numberintextColor }}>
                {formatNumber(state.data[0].update_trxs)}
              </span>
            </div>
            <div>
              Forks:
              <span style={{ color: props.numberintextColor }}>
                {formatNumber(state.data[0].fork_of)}
              </span>
            </div>
            <Widget
              src={"rubycop.near/widget/NDC.StyledComponents"}
              props={{ Tag: { title: "", className: props.dark } }}
            />
            Your Rank 👉
            <span style={{ color: props.numberintextColor }}>
              {formatNumber(state.data[0].trx_rank)}
            </span>
          </p>
        </ParentDiv>
        <ParentDiv>
          <OverlayTrigger
            key="top"
            overlay={
              <Tooltip>
                <div>Components: Total widgets created by a developer</div>
                <div>
                  Active or Not: An active developer is equivalent to having a
                  widget rank of less than 50{" "}
                </div>
                <div>
                  Deposits: Deposited volume in Near token for BOS development
                  to social.near contract
                </div>
                <div>
                  Your Rank: Developer rank based on the number of widgets (the
                  lower the better)
                </div>
              </Tooltip>
            }
          >
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
              }}
            >
              <img
                style={{ marginRight: "10px" }}
                width={20}
                src={columnImg.fee}
              />
              <h6 style={{ color: props.headerColor }}>
                {columnNamesFinall[1]}
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
          <p>
            <div>
              Active dev or not ?:
              <span style={{ color: props.numberintextColor }}>
                {formatNumber(state.data[0].active_or_not)}
              </span>
            </div>
            <div>
              Deposits :
              <span style={{ color: props.numberintextColor }}>
                {formatNumber(state.data[0].deposit)}
              </span>
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
                When did you first start your development activity, how many
                days have you been active, and what is your rank based on your
                dev history
              </Tooltip>
            }
          >
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
              }}
            >
              <img
                style={{ marginRight: "10px" }}
                width={20}
                src={columnImg.active_users}
              />
              <h6 style={{ color: props.headerColor }}>
                {columnNamesFinall[2]}
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
          <p>
            <div>
              Active Since:
              <span style={{ color: props.numberintextColor }}>
                {onHandelDate(state.data[0].min_date)}
              </span>
            </div>
            <div>
              Active Days:
              <span style={{ color: props.numberintextColor }}>
                {formatNumber(state.data[0].active_date)}
              </span>
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
        </ParentDiv>
        <ParentDiv>
          <OverlayTrigger
            key="top"
            overlay={
              <Tooltip>Number of stars received or sent in total</Tooltip>
            }
          >
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
              }}
            >
              <img
                style={{ marginRight: "10px" }}
                width={20}
                src={columnImg.transactions}
              />
              <h6 style={{ color: props.headerColor }}>
                {columnNamesFinall[3]}
              </h6>
            </div>
          </OverlayTrigger>

          <h4 style={{ color: props.numberColor }}>
            {formatNumber(state.data[0].stars_received)}
          </h4>
          <Widget
            src={"rubycop.near/widget/NDC.StyledComponents"}
            props={{ Tag: { title: "", className: props.dark } }}
          />
          <p>
            <div>
              Star Received:
              <span style={{ color: props.numberintextColor }}>
                {formatNumber(state.data[0].stars_received)}
              </span>
            </div>
            <div>
              Star Sent:
              <span style={{ color: props.numberintextColor }}>
                {formatNumber(state.data[0].stars_sent)}
              </span>
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
      </>
    ) : (
      noData
    )}
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
