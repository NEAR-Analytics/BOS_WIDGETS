const { apiKey } = props;

// options based on https://flipsidecrypto.xyz/edit/queries/e1d765f3-2b01-4363-9e17-aea861260ee3
const addressOptions = {
  Sweat: "cb8bc5ce-fc6b-4bf6-9c65-7b23c8993d6d",
  "NEAR Crowd": "0f13df92-6c4c-4807-b47a-c956e9615a6f",
  "Aurora Faucet": "e42ce4b7-8768-43bf-85a9-37efcae037e9",
  Spin: "91d23b3b-bd94-40fe-9e75-b8a6138c2a6d",
  "Ref Finance": "013c4172-37fe-42d8-9be3-d1f84f5db5db",
  Orderly: "fb86b38c-c509-49e4-8b32-130136dfa624",
  PlayEmber: "ff831c8d-4672-4c02-b60b-47e0c4a6a10f",
  Tonic: "91e9e1be-3276-48d9-bc6d-91211f4aeb78",
  "Near Wrapper": "4f0fae62-c0dc-4baa-b4e3-bd28d2089801",
  "Tether  (USDT)": "37e17536-184d-4890-a34f-c9e13333c2c0",
  "Circle  (USDC)": "60652152-43ab-46ca-8072-5c19aa05669d",
  Paras: "d18c351f-750c-4e83-b262-f248356a8739",
  "Learn Near Club": "d0b3e412-d89b-414a-9191-03423e21c563",
};

State.init({
  startDate: "2023-01-01",
  endDate: "2023-12-31",
  addresses: [],
  customAddresses: [],
  isActivitiesSqlRunning: false,
  data: [],
});

/** input functions */
const onAddressSelectValueChange = (value) => {
  State.update({
    addresses: value,
    data: [],
  });
};

const onCustomAddressesValueChange = ({ target }) => {
  let customAddresses = target.value.split(",");
  State.update({
    customAddresses,
  });
};

const onStartDateChange = ({ target }) => {
  State.update({
    startDate: target.value,
    data: [],
  });
};

const onEndDateChange = ({ target }) => {
  State.update({
    endDate: target.value,
    data: [],
  });
};

const getData = () => {
  // clear data
  if (state.addresses.length === 0) {
    return;
  }

  State.update({ data: [], isActivitiesSqlRunning: true });

  let urls = state.addresses.map(
    (x) =>
      `https://api.flipsidecrypto.com/api/v2/queries/${addressOptions[x]}/data/latest`
  );
  let data = [];
  let loaded = 0;
  urls.forEach((url) => {
    asyncFetch(url).then((res) => {
      if (!res.ok) {
        return;
      }

      loaded++;
      data.push(...res.body);

      // fully loaded
      if (loaded === urls.length) {
        State.update({
          isActivitiesSqlRunning: false,
          data,
        });
      }
    });
  });
};

/** Main component */
const Component = () => {
  if (state.isActivitiesSqlRunning) {
    return (
      <button disabled className="btn btn-primary w-100">
        <div className="d-flex flex-row justify-content-center align-items-center w-100">
          <i className="spinner-grow spinner-grow-sm me-3"></i>
          <span>Getting Data...</span>
        </div>
      </button>
    );
  }

  return (
    <button onClick={getData} className="btn btn-primary w-100">
      <div className="d-flex flex-row justify-content-center align-items-center w-100">
        <span>Search</span>
      </div>
    </button>
  );
};

/** Page Layout */
const Layout = () => {
  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-lg-6 mb-3">
          <div className="input-group">
            <div className="input-group-prepend" style={{ width: 100 }}>
              <span className="input-group-text">
                <span>From</span>
              </span>
            </div>
            <input
              type="DATE"
              onChange={onStartDateChange}
              className="form-control"
              value={state.startDate}
              disabled={state.isActivitiesSqlRunning}
              // onBlur={getData}
            />
          </div>
        </div>
        <div className="col-sm-12 col-lg-6 mb-3">
          <div className="input-group">
            <div className="input-group-prepend" style={{ width: 100 }}>
              <span className="input-group-text">
                <span>To</span>
              </span>
            </div>
            <input
              type="DATE"
              onChange={onEndDateChange}
              className="form-control"
              value={state.endDate}
              disabled={state.isActivitiesSqlRunning}
              // onBlur={getData}
            />
          </div>
        </div>
        <div className="col-12 mb-3">
          <div className="input-group">
            <div className="input-group-prepend" style={{ width: 100 }}>
              <span className="input-group-text">
                <span>Addresses</span>
              </span>
            </div>
            <Typeahead
              options={Object.keys(addressOptions)}
              multiple
              onChange={onAddressSelectValueChange}
              placeholder="Choose a project(s).."
              disabled={state.isActivitiesSqlRunning}
              selected={state.addresses}
            />
          </div>
        </div>
        <div
          className={`col-12 mb-3 ${
            state.addresses.includes("Custom") ? "" : "d-none"
          }`}
        >
          <div className="d-flex flex-column">
            <input
              type="text"
              className="form-control"
              onChange={onCustomAddressesValueChange}
              value={state.customAddresses.join(",")}
              placeholder="Separate addresses using a comma, eg. Project1,Project2"
              disabled={state.isActivitiesSqlRunning}
            />
          </div>
        </div>
      </div>
    </>
  );
};

// "USERS": 0,
//"TRANSACTIONS": 0,
//"CALL_CONTRACTS": 0,
//"NEAR_AMOUNT": 20778.625208997,
//"AVG_NEAR_AMOUNT": 164.909723881,
//"GAS_AMOUNT": 0.01069878758,
//"AVG_GAS_AMOUNT": 0.0000849110125

// rerendering issues need to be solved
const Graphs = () => {
  let { data } = state;

  let txByDate = {};

  let totalTransactions = 0;
  let totalVolume = 0;
  let totalGas = 0;
  let totalCallContracts = 0;

  let maxTransaction = 0;
  let maxUser = 0;
  let maxContractCalls = 0;
  let maxVolume = 0;
  let maxAvgAmount = 0;
  let maxGas = 0;
  let maxAvgGasAmount = 0;
  let startDateTimestamp = new Date(state.startDate).getTime();
  let endDateTimestamp = new Date(state.endDate).getTime();

  let lowerAddressOptions = state.addresses.map((x) => x.toLowerCase());

  let newData = [];
  let years = [];

  data.forEach((x) => {
    let xDate = new Date(x.DATE);
    let year = xDate.getFullYear();
    let timestamp = xDate.getTime();

    // filter time
    if (timestamp < startDateTimestamp || timestamp > endDateTimestamp) {
      return;
    }

    if (!years.includes(year)) {
      years.push(year);
    }

    // filter addresses
    if (!lowerAddressOptions.includes(x.PROJECT_NAME)) {
      return;
    }

    totalTransactions += x.TRANSACTIONS;
    totalVolume += x.NEAR_AMOUNT;
    totalGas += x.GAS_AMOUNT;
    totalCallContracts += x.CALL_CONTRACTS;
    maxUser = maxUser < x.USERS ? x.USERS : maxUser;
    maxContractCalls =
      maxContractCalls < x.CALL_CONTRACTS ? x.CALL_CONTRACTS : maxContractCalls;
    maxVolume = maxVolume < x.NEAR_AMOUNT ? x.NEAR_AMOUNT : maxVolume;
    maxAvgAmount =
      maxAvgAmount < x.AVG_NEAR_AMOUNT ? x.AVG_NEAR_AMOUNT : maxAvgAmount;
    maxGas = maxGas < x.GAS_AMOUNT ? x.GAS_AMOUNT : maxGas;
    maxAvgGasAmount =
      maxAvgGasAmount < x.AVG_GAS_AMOUNT ? x.AVG_GAS_AMOUNT : maxAvgGasAmount;

    if (!txByDate[x.DATE]) {
      txByDate[x.DATE] = 0;
    }

    txByDate[x.DATE] += x.TRANSACTIONS;
    newData.push(x);
  });

  let txByDateArray = [];
  for (const [DATE, TRANSACTIONS] of Object.entries(txByDate)) {
    txByDateArray.push({ DATE, TRANSACTIONS });
    maxTransaction =
      maxTransaction < TRANSACTIONS ? TRANSACTIONS : maxTransaction;
  }

  return (
    <>
      {state.data.length > 0 && (
        <>
          <div className="mt-5"></div>
          <div className="row mb-3">
            <div className="col-sm-12 col-lg-4 p-2">
              <div className="card shadow p-3 d-flex flex-column align-items-center justify-content-center">
                <span>Total Transactions</span>
                <strong style={{ fontSize: 25 }}>
                  {totalTransactions.toLocaleString("en", {
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                  })}
                </strong>
              </div>
            </div>
            <div className="col-sm-12 col-lg-4 p-2">
              <div className="card shadow p-3 d-flex flex-column align-items-center justify-content-center">
                <span>Total Near Volume (NEAR)</span>
                <strong style={{ fontSize: 25 }}>
                  {totalVolume.toLocaleString("en", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </strong>
              </div>
            </div>
            <div className="col-sm-12 col-lg-4 p-2">
              <div className="card shadow p-3 d-flex flex-column align-items-center justify-content-center">
                <span>Total Gas (NEAR)</span>
                <strong style={{ fontSize: 25 }}>
                  {totalGas.toLocaleString("en", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </strong>
              </div>
            </div>
          </div>

          <div className="mt-5"></div>

          {/** Line Chart */}
          <div className="row">
            <div className="col-12">
              <Widget
                src="leslug.near/widget/CalendarChartv2"
                props={{
                  dateColumn: "DATE",
                  dataColumn: "TRANSACTIONS",
                  data: txByDateArray,
                  legendMax: maxTransaction,
                  legendMin: 0,
                  label: "Count",
                  title: "Number of Transactions by Date",
                  heightMultiplier: years.length,
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <Widget
                src="leslug.near/widget/LineChart"
                props={{
                  xColumn: "DATE",
                  yColumn: "USERS",
                  data: newData,
                  legendMax: maxUser,
                  legendMin: 0,
                  label: "Count",
                  strokeColumn: "PROJECT_NAME",
                  isXDate: true,
                  title: "Number of Unique Wallets by Date",
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <Widget
                src="leslug.near/widget/LineChart"
                props={{
                  xColumn: "DATE",
                  yColumn: "CALL_CONTRACTS",
                  data: newData,
                  legendMax: maxContractCalls,
                  legendMin: 0,
                  label: "Count",
                  strokeColumn: "PROJECT_NAME",
                  isXDate: true,
                  title: "Number of Contract Calls by Date",
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <Widget
                src="leslug.near/widget/LineChart"
                props={{
                  xColumn: "DATE",
                  yColumn: "NEAR_AMOUNT",
                  data: newData,
                  legendMax: maxVolume,
                  legendMin: 0,
                  label: "Volume",
                  strokeColumn: "PROJECT_NAME",
                  isXDate: true,
                  title: "NEAR Volume by Date",
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <Widget
                src="leslug.near/widget/LineChart"
                props={{
                  xColumn: "DATE",
                  yColumn: "AVG_NEAR_AMOUNT",
                  data: newData,
                  legendMax: maxAvgAmount,
                  legendMin: 0,
                  label: "Volume",
                  strokeColumn: "PROJECT_NAME",
                  isXDate: true,
                  title: "Average Near Volume by Date",
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <Widget
                src="leslug.near/widget/LineChart"
                props={{
                  xColumn: "DATE",
                  yColumn: "GAS_AMOUNT",
                  data: newData,
                  legendMax: maxGas,
                  legendMin: 0,
                  label: "Gas Used",
                  strokeColumn: "PROJECT_NAME",
                  isXDate: true,
                  title: "Gas Used by Date",
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <Widget
                src="leslug.near/widget/LineChart"
                props={{
                  xColumn: "DATE",
                  yColumn: "AVG_GAS_AMOUNT",
                  data: newData,
                  legendMax: maxAvgGasAmount,
                  legendMin: 0,
                  label: "Gas Used",
                  strokeColumn: "PROJECT_NAME",
                  isXDate: true,
                  title: "Average Gas Used by Date",
                }}
              />
            </div>

            {/** Area Chart */}
            <div className="col-sm-12 col-lg-6">
              <Widget
                src="leslug.near/widget/AreaChart"
                props={{
                  xColumn: "DATE",
                  yColumn: "CUM_NEAR_AMOUNT",
                  data: newData,
                  legendMax: totalVolume,
                  legendMin: 0,
                  label: "Volume",
                  strokeColumn: "PROJECT_NAME",
                  isXDate: true,
                  title: "Cumulative Volume (NEAR)",
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <Widget
                src="leslug.near/widget/AreaChart"
                props={{
                  xColumn: "DATE",
                  yColumn: "CUM_TRANSACTIONS",
                  data: newData,
                  legendMax: totalTransactions,
                  legendMin: 0,
                  label: "Count",
                  strokeColumn: "PROJECT_NAME",
                  isXDate: true,
                  title: "Cumulative Number of TRANSACTIONS",
                }}
              />
            </div>
            <div className="col-12">
              <Widget
                src="leslug.near/widget/AreaChart"
                props={{
                  xColumn: "DATE",
                  yColumn: "CUM_CALL_CONTRACTS",
                  data: newData,
                  legendMax: totalCallContracts,
                  legendMin: 0,
                  label: "Count",
                  strokeColumn: "PROJECT_NAME",
                  isXDate: true,
                  title: "Cumulative Contract Calls",
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

return (
  <div className="p-2" style={{ minHeight: "60vh" }}>
    {/* <iframe className="w-100" style={{ height: "300px" }} srcDoc={content} /> */}

    <Layout />

    <Component />

    <Graphs />
  </div>
);
