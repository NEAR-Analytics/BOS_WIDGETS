const API_KEY = "e79c2e9b-116c-4d8a-9617-5e2471e4deaa";
const themeColors = [
  "#A084E8",
  "#6F61C0",
  "#241468",
  "#9F0D7F",
  "#EA1179",
  "#F79BD3",
];
55;
const spinnerColors = { color1: "#6F61C0", color2: "#241468" };

const queries = [
  {
    hash: "14cd52e2-af58-4550-a848-ac2fe85b3b70",
    firstReqTime: 15,
    id: 1,
    query: `SELECT
              ADDRESS as "Address",
              ADDRESS_NAME as  "Address Name",
              PROJECT_NAME as "Project Type",
              LABEL_TYPE  as "Label Type",
              min(block_timestamp)::date  as "First day"
              FROM near.core.fact_transactions LEFT outer join near.core.dim_address_labels on TX_RECEIVER = ADDRESS
              where  TX_RECEIVER in ('{{address}}') GROUP BY 1,2,3,4`,
  },
  {
    hash: "5fe48402-2103-46f6-bdb8-3a02880ab69d",
    firstReqTime: 10,
    id: 2,
    query: `with a as
              (SELECT
              date_trunc('day',BLOCK_TIMESTAMP)::date as date ,
              count(DISTINCT tx_hash) as "Number of Transactions",
              round(sum(transaction_fee / power(10, 24)),3) as "Fee(Near)",
              sum(TX:actions[0]:FunctionCall:deposit / POW(10, 24)) as "Volume (Near)" ,
              sum("Number of Transactions") over (order by date asc) as "Cum Transactions" ,
              sum( "Fee(Near)") over (order by date asc) as "Cum Fee" ,
              sum("Volume (Near)") over (order by date asc) as "Cum Volume"
              FROM near.core.fact_transactions
              where TX_RECEIVER in ('{{address}}')
              group by 1 order by date asc )
              select
              date_part(epoch,to_timestamp(date)) as date ,
              "Number of Transactions" ,
              "Fee(Near)" ,
              round("Volume (Near)",2)as "Volume (Near)" ,
              "Cum Transactions"  ,
              round("Cum Fee",3) as "Cum Fee" ,
              round("Cum Volume",2) as "Cum Volume"
              from a
              where date is not null and "Volume (Near)" is not null`,
  },
  {
    hash: "099f61fd-22bf-49dc-a8e2-d87a8a4ecb99",
    firstReqTime: 10,
    id: 3,
    query: `SELECT
              count(DISTINCT tx_hash) as transactions,
              count(DISTINCT tx_signer) as users,
              round(transactions / users) as avg_txs_per_user ,
              round(sum(transaction_fee / power(10, 24)),3) as fee_usd,
              round((fee_usd/transactions),3) as avg_fee_per_user ,
              round(sum(case when TX:actions[0]:FunctionCall:deposit / POW(10, 24) is not null then TX:actions[0]:FunctionCall:deposit / POW(10, 24)
              when TX:actions[0]:Transfer:deposit / POW(10, 24) is not null then TX:actions[0]:Transfer:deposit / POW(10, 24)
              when TX:actions[0]:Delegate:delegate_action:actions[0]:FunctionCall:deposit / POW(10, 24) is not null then TX:actions[0]:Delegate:delegate_action:actions[0]:FunctionCall:deposit / POW(10, 24)
              end)) as AMOUNT_NEAR ,
              round((AMOUNT_NEAR/transactions),3) as avg_AMOUNT_per_user
              FROM near.core.fact_transactions
              where TX_RECEIVER in ('{{address}}')`,
  },
  {
    hash: "02d41371-2d86-4159-be7c-d79414df3168",
    firstReqTime: 10,
    id: 4,
    query: `with
              user as (
              select
              BLOCK_TIMESTAMP::date as date,
              COUNT(DISTINCT tx_signer) as user
              from near.core.fact_transactions
              where TX_RECEIVER in ('{{address}}')
              group by 1),
              raw as (
              select tx_signer ,BLOCK_TIMESTAMP::date as date
              FROM near.core.fact_transactions
              where TX_RECEIVER in ('{{address}}')),
              first as (
              SELECT tx_signer as news, MIN(date) as first_date
              FROM raw
              GROUP BY 1),
              b as
              (SELECT
              first_date as date,
              user as total_daily_user ,
              COUNT(DISTINCT news) as new_daily_user,
              SUM(new_daily_user) OVER (ORDER BY first_date ASC) as cum_daily_user
              FROM first inner join   user
              on first_date = date
              GROUP BY 1,2
              ORDER BY 1)
              select
              date_part(epoch,to_timestamp(date))::int as date ,
              total_daily_user ,
              new_daily_user ,
              cum_daily_user
              from b`,
  },
  // {
  //   hash: "53dbf2a1-cd23-4ddf-b9bd-451b2b84c100",
  //  firstReqTime:10,
  //  id: 5,
  //   query: `SELECT
  //             count(DISTINCT tx_hash) as transactions,
  //             tx_signer
  //             FROM near.core.fact_transactions
  //             where TX_RECEIVER in ('{{address}}')
  //             GROUP BY 2 order by 1  desc limit 10`,
  // },
  // {
  //   hash: "fa6edc9a-fbe2-43a1-854b-4d7d263f0b6c",
  //  firstReqTime:10,
  //  id: 6,
  //   query: `with a as
  //           (SELECT
  //           sum(TX:actions[0]:FunctionCall:deposit / POW(10, 24)) as AMOUNT_NEAR ,
  //           tx_signer
  //           FROM near.core.fact_transactions
  //           where TX_RECEIVER in ('{{address}}')
  //           GROUP BY 2 having AMOUNT_NEAR is not null
  //           order by 1  desc limit 10)
  //           select
  //           round(AMOUNT_NEAR)  as AMOUNT_NEAR ,
  //           tx_signer
  //           from a`,
  // },
  {
    hash: "64edecd3-2f66-44e3-a657-565e17bf612e",
    firstReqTime: 10,
    id: 7,
    query: `SELECT
              count(DISTINCT tx_hash) as transactions,
              round(sum(transaction_fee / power(10, 24)),3) as fee ,
              'Success' as status
              FROM near.core.fact_transactions
              where TX_RECEIVER in ('{{address}}')
              and TX_STATUS ='Success'
              union
              SELECT
              count(DISTINCT tx_hash) as transactions,
              round(sum(transaction_fee / power(10, 24)),3) as fee ,
              'Fail' as status
              FROM near.core.fact_transactions
              where TX_RECEIVER in ('{{address}}')
              and TX_STATUS !='Success'`,
  },
  {
    hash: "046a7cbd-4838-4cb3-90fd-6be9e4cfb114",
    firstReqTime: 10,
    id: 8,
    query: `with a as
              ( SELECT
              count(DISTINCT tx_hash) as transactions,
              tx_signer as users
              -- sum(TX:actions[0]:FunctionCall:deposit / POW(10, 24)) as AMOUNT_NEAR ,
              FROM near.core.fact_transactions
              where TX_RECEIVER in ('{{address}}')
              group by 2)
              select
              count(DISTINCT users) as users,
              case
              when transactions =1 then '1'
              when transactions =2 then '2'
              when transactions =3 then '3'
              when transactions between 3 and 10 then '(3-10]'
              when transactions between 10 and 50 then '(10-50]'
              when transactions between 50 and 100 then '(50-100]'
              when transactions > 100 then '> 100'
              else  'else'
              end as groups
              from a
              group by 2 order by 1 desc`,
  },
  {
    hash: "c04e2f1f-530c-4ce2-bb6a-d5a8cb60ac0f",
    firstReqTime: 10,
    id: 9,
    query: `with a as
              (SELECT
              sum(TX:actions[0]:FunctionCall:deposit / POW(10, 24)) as AMOUNT_NEAR,
              tx_signer as users
              FROM near.core.fact_transactions
              where TX_RECEIVER in ('{{address}}')
              group by 2)
              select
              count(DISTINCT users) as users,
              case
              when AMOUNT_NEAR < 1 then '< 1'
              when AMOUNT_NEAR between 1 and 2 then '1-2'
              when AMOUNT_NEAR between 2 and 5 then '2-3'
              when AMOUNT_NEAR between 5 and 10 then '(5-10]'
              when AMOUNT_NEAR between 10 and 50 then '(10-50]'
              when AMOUNT_NEAR between 50 and 100 then '(50-100]'
              when AMOUNT_NEAR > 100 then '> 100'
              else  null
              end as groups
              from a
              where groups is not null
              group by 2 order by 1 desc`,
  },
  {
    hash: "75684a26-d968-4566-9d27-8b9635182c33",
    firstReqTime: 20,
    id: 10,
    query: `with a as
            (select
            count(DISTINCT tx_hash) as transactions ,
            rank()over(  order by transactions desc)as rank_transactions ,
            count(DISTINCT tx_signer) as users,
            rank()over(  order by users desc)as rank_users ,
            round(sum(transaction_fee / power(10, 24)),3) as fee,
            rank()over(  order by fee desc)as rank_fee ,
            TX_RECEIVER as ADDRESS
            from(
            select distinct ADDRESS
            FROM  near.core.dim_address_labels
            where  LABEL_TYPE in (SELECT LABEL_TYPE  as "Label Type" FROM  near.core.dim_address_labels  where  ADDRESS in ('{{address}}'))
            ) as label
            inner join near.core.fact_transactions
            on ADDRESS = TX_RECEIVER
            group by 7)
            select * from  a
            order by 1 desc ,3 desc ,5 desc limit 4`,
  },
];
2;
State.init({
  propsCharts: {},
  result: { address: "" },
  address: "social.near",
  ui: { error: [], loading: true, isDisabledSearchButton: false },
  loader: false,
  initialLoad: true,
});
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

const inputHandler = ({ target }) => {
  if (state.ui.loading) return;
  const address = target.value.toLowerCase().trim();
  State.update({ address: address, loader: false });
};
const createQuery = (address) => {
  const queriesArr = queries.map((q) => {
    const queryWithAddress = q.query.replaceAll("{{address}}", address);
    q.query = queryWithAddress;
    return q;
  });
  return queriesArr;
};

const updateResultState = ({ data, error, isLoading, queryRunId, id }) => {
  State.update(({ result }) => {
    const newResult = {
      ...result,
      [`query${id}`]: {
        data:
          data?.rows === undefined ? null : data.rows === null ? [] : data.rows,
        error: error,
        isLoading: isLoading,
        queryRunId: queryRunId,
        id: id,
      },
    };
    if (error) {
      const queryError = `query${id} : ${error}`;
      console.log(state.ui.error);
      return {
        ...state,
        result: { ...newResult },
        ui: { ...state.ui, error: [...state.ui.error, queryError] },
      };
    } else {
      return {
        ...state,
        result: { ...newResult },
      };
    }
  });
};

const runqueries = () => {
  if (state.address.length === 0) {
    State.update({
      ui: {
        ...state.ui,
        error: [...state.ui.error, "please add an contract address"],
      },
    });
    return;
  }
  const isNewquery = state.result.address !== state.address;
  if (!isNewquery) {
    State.update({
      ui: {
        ...state.ui,
        error: [...state.ui.error, "this query already has runed"],
      },
    });
    return;
  }
  const queriesArr = createQuery(state.address);
  const loader = queriesArr.map((q) => {
    const props = {
      apiKey: API_KEY,
      id: q.id,
      query: q.query,
      onResult: updateResultState,
      firstReqTime: q.firstReqTime,
      queryOption: {
        page: {
          number: 1,
          size: 1000,
        },
        cacheTime: 60,
        ...q?.queryOption,
      },
    };

    return <Widget src="lord1.near/widget/api-flipside" props={props} />;
  });
  State.update({
    loader: loader,
    ui: { ...state.ui, loading: true },
    result: { ...state.result, address: state.address },
  });
};
1;
const getMixProps = (data, serieses, colors, chartOption) => {
  data = data || [];
  serieses = serieses || [{ key: "", seriesName: "", type: "", id: 1 }];
  colors = colors || themeColors;
  chartOption = chartOption || {};

  const dataFormat = serieses.map((series) => {
    const dataFormated = data.map((d) => [d.date * 1000, d[series.key]]);
    return {
      data: dataFormated,
      name: series.seriesName,
      type: series.type,
      axisId: series.id,
    };
  });
  const props = {
    series: dataFormat,
    colors: colors,
    chartOption: {
      title: "chart title",
      subtitle: "chart subtitle",
      legend: true,
      stacking: "false",
      ...chartOption,
    },
    spinnerColors: ["#6F61C0", "#241468"],
  };
  return props;
};
const getPieProps = (data, [key, value], colors, chartOption) => {
  data = data || [];
  colors = colors || themeColors;
  chartOption = chartOption || {};

  const dataFormat = data.map((s) => [s[key], s[value]]);
  const props = {
    data: dataFormat,
    colors: colors,
    chartOption: {
      title: "chart title",
      type: "pie",
      legend: false,
      connector: false,
      ...chartOption,
    },
    spinnerColors: ["#6F61C0", "#241468"],
  };
  return props;
};

const fetchInitialData = (hash) => {
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
  console.log("data", data);

  const result = {
    data: data && data.body,
    error: (data && data.error) || null,
    isLoading: !data && !error,
  };
  return result;
};
if (state.initialLoad) {
  const data = {};
  const errors = [];
  queries.forEach(({ hash, id }) => {
    const result = fetchInitialData(hash);
    if (result.error) errors.push(`query${id} : ${result.error}`);
    data[`query${id}`] = {
      ...result,
      id,
      queryRunId: undefined,
    };
  });

  if (Object.values(data).every((d) => !d.isLoading)) {
    State.update({
      result: { address: "social.near", ...data },
      ui: { ...state.ui, error: [...state.ui.error, ...errors] },
      initialLoad: false,
    });
  }
}
const isAllDataLoaded = () => {
  const resultArr = Object.entries(state.result);
  if (resultArr.length <= 1) return true;
  return resultArr.every((query, i) => {
    if (i === 0) return true;
    return !query[1].isLoading;
  });
};
if (isAllDataLoaded()) {
  State.update({ ui: { ...state.ui, loading: false } });
}
if (state.ui.error.length > 0) {
  function hide() {
    const errors = state.ui.error;
    errors.shift();
    if (errors.length > 0) setTimeout(hide, 2500);
    State.update({ ui: { ...state.ui, error: errors } });
  }
  setTimeout(hide, 2500);
}
console.log("11", state);
// #############################################################
// return to dom
// #############################################################
return (
  <div className="container-fluid">
    {state.loader && <div className="d-none">{state.loader}</div>}
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      {state.ui.error.length > 0 &&
        state.ui.error.map((er) => (
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
    <div className="header p-5 text-center bg-secondary">header</div>
    <div className="search py-4">
      <div className="row">
        <div className="col-8 ">
          <input
            defaultValue="social.near"
            onBlur={inputHandler}
            type="Address"
            className="form-control"
            id="address"
            placeholder="contract address"
          />
        </div>
        <div className="col-4 col-lg-auto">
          <button
            disabled={state.ui.loading}
            onClick={runqueries}
            type="button"
            style={{ backgroundColor: themeColors[1] }}
            className="btn w-100 text-white"
          >
            {state.ui.loading ? (
              <div className="text-center px-4">
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              "search"
            )}
          </button>
        </div>
      </div>
    </div>
    <div className="section1 py-4">
      <div className="row">
        <div className=" col-lg-4">
          <div className="shadow-sm rounded bg-light h-100">
            {state.result?.query1?.isLoading && (
              <div className="d-flex justify-content-center align-items-center h-100 p-4 py-5">
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {state.result?.query1?.error && (
              <div className="d-flex justify-content-center align-items-center h-100 py-5">
                An error occurred for this section
              </div>
            )}
            {state.result?.query1?.data[0]?.address === null && (
              <div className="d-flex justify-content-center align-items-center h-100 py-5">
                This address is not a contract
              </div>
            )}
            {state.result?.query1?.data[0]?.address && (
              <>
                <div className="py-3">
                  <span className="fw-bold fs-5">
                    {state.result.query1.data[0]["project type"]}
                  </span>
                  <span className="fw-bold">
                    ({state.result.query1.data[0]["label type"]})
                  </span>
                </div>
                <div className="py-1">
                  <span className="fw-semibold">contract address :</span>
                  <span>({state.result.query1.data[0]["address"]})</span>
                </div>
                <div className="py-1">
                  <span className="fw-semibold">developed :</span>
                  <span>
                    (
                    {new Date(
                      state.result.query1.data[0]["first day"]
                    ).toLocaleDateString("en")}
                    )
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className=" col-lg-8">
          <div className="shadow-sm rounded bg-light">
            {state.result?.query10?.isLoading && (
              <div className="d-flex justify-content-center align-items-center h-100 p-4 py-5">
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {state.result?.query10?.error && (
              <div className="d-flex justify-content-center align-items-center h-100 py-5">
                An error occurred for this section
              </div>
            )}
            {state.result?.query10?.data && (
              <div className=" table-responsive">
                <table className="table table-hover table-striped table-borderless ">
                  <thead>
                    <tr>
                      <th className="col-2" scope="col">
                        Same contracts ({state.address})
                      </th>
                      <th className="col-1" scope="col">
                        Transaction
                      </th>
                      <th className="col-1" scope="col">
                        Transaction rank
                      </th>
                      <th className="col-1" scope="col">
                        Fee
                      </th>
                      <th className="col-1" scope="col">
                        Fee rank
                      </th>
                      <th className="col-1" scope="col">
                        User
                      </th>
                      <th className="col-1" scope="col">
                        User rank
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {state.result?.query10?.data.length === 0 && (
                      <tr>
                        <td className="text-center p-4" colspan="8">
                          No same contracts
                        </td>
                      </tr>
                    )}
                    {state.result?.query10?.data.length > 1 &&
                      state.result.query10.data.map((row) => {
                        return (
                          <tr key={row.address}>
                            <td>{row.address}</td>
                            <td>{formatNumber(row.transactions)}</td>
                            <td>{row.rank_transactions}</td>
                            <td>{row.fee}</td>
                            <td>{row.rank_fee}</td>
                            <td>{formatNumber(row.users)}</td>
                            <td>{row.rank_users}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <div className="section2 py-4">
      <div className="row g-2">
        <div className="col-6 col-xl-3">
          <div className="shadow-sm rounded bg-light">
            <div className="">
              <div
                style={{ backgroundColor: themeColors[1] }}
                className="text-white text-center p-1 rounded-4"
              >
                {state.result?.query3?.isLoading && (
                  <div className="text-center p-4 pb-1">
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                {state.result?.query3?.error && (
                  <div className="d-flex justify-content-center align-items-center h-100 p-4 pb-1">
                    error
                  </div>
                )}
                {state.result?.query3?.data && (
                  <div className="fs-4 fw-bold d-flex justify-content-center align-items-center h-100 p-4 pb-1 ">
                    {formatNumber(state.result?.query3?.data[0].transactions)}
                  </div>
                )}
                <div className="">Number of transactions</div>
              </div>
              <div
                style={{ backgroundColor: themeColors[0] }}
                className="text-white mx-auto w-75 mt-2 text-center p-1 rounded-4"
              >
                {state.result?.query3?.isLoading && (
                  <div className="text-center p-4 pb-1">
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                {state.result?.query3?.error && (
                  <div className="d-flex justify-content-center align-items-center h-100 p-4 pb-1">
                    error
                  </div>
                )}
                {state.result?.query3?.data && (
                  <div className="fs-4 fw-bold d-flex justify-content-center align-items-center h-100 p-4 pb-1 ">
                    {formatNumber(
                      state.result?.query3?.data[0].avg_txs_per_user
                    )}
                  </div>
                )}
                <div className="">avg of transactions</div>
              </div>
            </div>
            <div
              className="chart d-flex justify-content-center align-items-center "
              style={{ minHeight: "12rem" }}
            >
              <div
                className={`w-100 ${
                  state.result?.query7?.isLoading ? "d-block" : "d-none"
                }`}
              >
                <Widget
                  src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
                  props={{ ...spinnerColors }}
                />
              </div>
              {state.result?.query7?.error && (
                <div className="">An error occurred for this section</div>
              )}
              <div className={`${state.result?.query7?.data ? "" : "d-none"}`}>
                <Widget
                  src="lord1.near/widget/Pie-chart"
                  props={getPieProps(
                    state.result.query7.data,
                    ["status", "transactions"],
                    undefined,
                    { title: "Trans Status" }
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-xl-3">
          <div className="shadow-sm rounded bg-light">
            <div className="">
              <div
                style={{ backgroundColor: themeColors[1] }}
                className="text-white text-center p-1 rounded-4"
              >
                {state.result?.query3?.isLoading && (
                  <div className="text-center p-4 pb-1">
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                {state.result?.query3?.error && (
                  <div className="d-flex justify-content-center align-items-center h-100 p-4 pb-1">
                    error
                  </div>
                )}
                {state.result?.query3?.data && (
                  <div className="fs-4 fw-bold d-flex justify-content-center align-items-center h-100 p-4 pb-1 ">
                    {formatNumber(state.result?.query3?.data[0].users)}
                  </div>
                )}
                <div className="">Number of users</div>
              </div>
              <div
                style={{ backgroundColor: themeColors[0] }}
                className="text-white mx-auto w-75 mt-2 text-center p-1 rounded-4"
              >
                {state.result?.query3?.isLoading && (
                  <div className="text-center p-4 pb-1">
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                {state.result?.query3?.error && (
                  <div className="d-flex justify-content-center align-items-center h-100 p-4 pb-1">
                    error
                  </div>
                )}
                {state.result?.query3?.data && (
                  <div className="fs-4 fw-bold d-flex justify-content-center align-items-center h-100 p-4 pb-1 ">
                    {"-"}
                  </div>
                )}
                <div className="">avg of users</div>
              </div>
            </div>
            <div
              className="chart d-flex justify-content-center align-items-center "
              style={{ minHeight: "12rem" }}
            >
              <div
                className={`w-100 ${
                  state.result?.query8?.isLoading ? "d-block" : "d-none"
                }`}
              >
                <Widget
                  src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
                  props={{ ...spinnerColors }}
                />
              </div>
              {state.result?.query8?.error && (
                <div className="">An error occurred for this section</div>
              )}
              <div className={`${state.result?.query8?.data ? "" : "d-none"}`}>
                <Widget
                  src="lord1.near/widget/Pie-chart"
                  props={getPieProps(
                    state.result.query8.data,
                    ["groups", "users"],
                    undefined,
                    { title: "Share of Users", type: "donut" }
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-xl-3">
          <div className="shadow-sm rounded bg-light">
            <div className="">
              <div
                style={{ backgroundColor: themeColors[1] }}
                className="text-white text-center p-1 rounded-4"
              >
                {state.result?.query3?.isLoading && (
                  <div className="text-center p-4 pb-1">
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                {state.result?.query3?.error && (
                  <div className="d-flex justify-content-center align-items-center h-100 p-4 pb-1">
                    error
                  </div>
                )}
                {state.result?.query3?.data && (
                  <div className="fs-4 fw-bold d-flex justify-content-center align-items-center h-100 p-4 pb-1 ">
                    {formatNumber(state.result?.query3?.data[0].amount_near)}
                  </div>
                )}
                <div className="">Amount (near)</div>
              </div>
              <div
                style={{ backgroundColor: themeColors[0] }}
                className="text-white mx-auto w-75 mt-2 text-center p-1 rounded-4"
              >
                {state.result?.query3?.isLoading && (
                  <div className="text-center p-4 pb-1">
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                {state.result?.query3?.error && (
                  <div className="d-flex justify-content-center align-items-center h-100 p-4 pb-1">
                    error
                  </div>
                )}
                {state.result?.query3?.data && (
                  <div className="fs-4 fw-bold d-flex justify-content-center align-items-center h-100 p-4 pb-1 ">
                    {formatNumber(
                      state.result?.query3?.data[0].avg_amount_per_user
                    )}
                  </div>
                )}
                <div className="">avg of Amount (near)</div>
              </div>
            </div>
            <div
              className="chart d-flex justify-content-center align-items-center "
              style={{ minHeight: "12rem" }}
            >
              <div
                className={`w-100 ${
                  state.result?.query7?.isLoading ? "d-block" : "d-none"
                }`}
              >
                <Widget
                  src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
                  props={{ ...spinnerColors }}
                />
              </div>
              {state.result?.query7?.error && (
                <div className="">An error occurred for this section</div>
              )}
              <div className={`${state.result?.query7?.data ? "" : "d-none"}`}>
                <Widget
                  src="lord1.near/widget/Pie-chart"
                  props={getPieProps(
                    state.result.query7.data,
                    ["status", "fee"],
                    undefined,
                    { title: "Fee Status" }
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-xl-3">
          <div className="shadow-sm rounded bg-light">
            <div className="">
              <div
                style={{ backgroundColor: themeColors[1] }}
                className="text-white text-center p-1 rounded-4"
              >
                {state.result?.query3?.isLoading && (
                  <div className="text-center p-4 pb-1">
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                {state.result?.query3?.error && (
                  <div className="d-flex justify-content-center align-items-center h-100 p-4 pb-1">
                    error
                  </div>
                )}
                {state.result?.query3?.data && (
                  <div className="fs-4 fw-bold d-flex justify-content-center align-items-center h-100 p-4 pb-1 ">
                    {formatNumber(state.result?.query3?.data[0].fee_usd)}
                  </div>
                )}
                <div className="">Fee usd</div>
              </div>
              <div
                style={{ backgroundColor: themeColors[0] }}
                className="text-white mx-auto w-75 mt-2 text-center p-1 rounded-4"
              >
                {state.result?.query3?.isLoading && (
                  <div className="text-center p-4 pb-1">
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                {state.result?.query3?.error && (
                  <div className="d-flex justify-content-center align-items-center h-100 p-4 pb-1">
                    error
                  </div>
                )}
                {state.result?.query3?.data && (
                  <div className="fs-4 fw-bold d-flex justify-content-center align-items-center h-100 p-4 pb-1 ">
                    {formatNumber(
                      state.result?.query3?.data[0].avg_fee_per_user
                    )}
                  </div>
                )}
                <div className="">avg of Fee usd</div>
              </div>
            </div>
            <div
              className="chart d-flex justify-content-center align-items-center "
              style={{ minHeight: "12rem" }}
            >
              <div
                className={`w-100 ${
                  state.result?.query9?.isLoading ? "d-block" : "d-none"
                }`}
              >
                <Widget
                  src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
                  props={{ ...spinnerColors }}
                />
              </div>
              {state.result?.query9?.error && (
                <div className="">An error occurred for this section</div>
              )}
              <div className={`${state.result?.query9?.data ? "" : "d-none"}`}>
                <Widget
                  src="lord1.near/widget/Pie-chart"
                  props={getPieProps(
                    state.result.query9.data,
                    ["groups", "users"],
                    undefined,
                    { title: "Share of Volume", type: "donut" }
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="section3-area py-4">
      <div className="row g-2">
        <div style={{ minHeight: "12rem" }} className=" col-lg-6">
          <div className="h-100 shadow-sm rounded bg-light ">
            <div
              className={`w-100 ${
                state.result?.query2?.isLoading ? "d-block" : "d-none"
              }`}
            >
              <Widget
                src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
                props={{ ...spinnerColors }}
              />
            </div>
            {state.result?.query2?.error && (
              <div className="">An error occurred for this section</div>
            )}
            <div className={`${state.result?.query2?.data ? "" : "d-none"}`}>
              <Widget
                src="lord1.near/widget/mix-chart"
                props={getMixProps(
                  state.result.query2.data,
                  [
                    {
                      key: "cum transactions",
                      seriesName: "Cum Trans",
                      type: "areaspline",
                      id: 2,
                    },
                    {
                      key: "number of transactions",
                      seriesName: "Number of Trans",
                      type: "line",
                      id: 1,
                    },
                  ],
                  undefined,
                  {
                    title: "Number of Transaction",
                    subtitle: "Daily / Cumulative",
                  }
                )}
              />
            </div>
          </div>
        </div>
        <div style={{ minHeight: "12rem" }} className=" col-lg-6">
          <div className="h-100 shadow-sm rounded bg-light ">
            <div
              className={`w-100 ${
                state.result?.query2?.isLoading ? "d-block" : "d-none"
              }`}
            >
              <Widget
                src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
                props={{ ...spinnerColors }}
              />
            </div>
            {state.result?.query2?.error && (
              <div className="">An error occurred for this section</div>
            )}
            <div className={`${state.result?.query2?.data ? "" : "d-none"}`}>
              <Widget
                src="lord1.near/widget/mix-chart"
                props={getMixProps(
                  state.result.query2.data,
                  [
                    {
                      key: "cum volume",
                      seriesName: "Cum Volume",
                      type: "areaspline",
                      id: 2,
                    },
                    {
                      key: "volume (near)",
                      seriesName: "Volume",
                      type: "line",
                      id: 1,
                    },
                  ],
                  undefined,
                  {
                    title: "Volume of Transaction",
                    subtitle: "Daily / Cumulative",
                  }
                )}
              />
            </div>
          </div>
        </div>
        <div style={{ minHeight: "12rem" }} className=" col-lg-6">
          <div className="h-100 shadow-sm rounded bg-light ">
            <div
              className={`w-100 ${
                state.result?.query4?.isLoading ? "d-block" : "d-none"
              }`}
            >
              <Widget
                src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
                props={{ ...spinnerColors }}
              />
            </div>
            {state.result?.query4?.error && (
              <div className="">An error occurred for this section</div>
            )}
            <div className={`${state.result?.query4?.data ? "" : "d-none"}`}>
              <Widget
                src="lord1.near/widget/mix-chart"
                props={getMixProps(
                  state.result.query4.data,
                  [
                    {
                      key: "cum_daily_user",
                      seriesName: "Cum User",
                      type: "areaspline",
                      id: 2,
                    },
                    {
                      key: "new_daily_user",
                      seriesName: "New Users",
                      type: "line",
                      id: 1,
                    },
                    {
                      key: "total_daily_user",
                      seriesName: "Total Users",
                      type: "line",
                      id: 3,
                    },
                  ],
                  undefined,
                  {
                    title: "Number of Users",
                    subtitle: "User / Cumulative",
                  }
                )}
              />
            </div>
          </div>
        </div>
        <div style={{ minHeight: "12rem" }} className=" col-lg-6">
          <div className="h-100 shadow-sm rounded bg-light ">
            <div
              className={`w-100 ${
                state.result?.query2?.isLoading ? "d-block" : "d-none"
              }`}
            >
              <Widget
                src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
                props={{ ...spinnerColors }}
              />
            </div>
            {state.result?.query2?.error && <div className="">error</div>}
            <div className={`${state.result?.query2?.data ? "" : "d-none"}`}>
              <Widget
                src="lord1.near/widget/mix-chart"
                props={getMixProps(
                  state.result.query2.data,
                  [
                    {
                      key: "cum fee",
                      seriesName: "Cum Fee",
                      type: "areaspline",
                      id: 2,
                    },
                    {
                      key: "fee(near)",
                      seriesName: "Fee",
                      type: "line",
                      id: 1,
                    },
                  ],
                  undefined,
                  {
                    title: "Fee",
                    subtitle: "Daily / Cumulative",
                  }
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="footer">footer</div>
  </div>
);
