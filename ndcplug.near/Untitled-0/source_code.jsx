const { apiKey, component } = props;

State.init({
  data: [],
  hasError: false,
  isLoading: false,
  isRunning: false,
  queryId: "",
});

if (!apiKey) {
  return <div>Empty apiKey!</div>;
}

const getQueryResult = async () => {};

const getQueryStatus = async () => {};

const runQuery = async (sql) => {
  console.log("here2");
  let body = {
    jsonrpc: "2.0",
    method: "createQueryRun",
    params: [
      {
        resultTTLHours: 1,
        maxAgeMinutes: 0,
        sql: "SELECT date_trunc('''hour''', block_timestamp) as hourly_datetime, count(distinct tx_hash) as tx_count from ethereum.core.fact_transactions where block_timestamp >= getdate() - interval'''1 month''' group by 1 order by 1 desc",
        tags: {
          source: "postman-demo",
          env: "test",
        },
        dataSource: "snowflake-default",
        dataProvider: "flipside",
      },
    ],
    id: 1,
  };

  console.log("here");
  let ret = await fetch("", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey },
    body,
  });

  console.log(ret);
  return ret.body;
};

const cancelQuery = async () => {};
return (
  <div>
    <div>Rendering Child: </div>
    <>
      {component({
        data,
        hasError,
        isLoading,
        isRunning,
        runQuery,
        cancelQuery,
      })}
    </>
  </div>
);
