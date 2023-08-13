const API_KEY = props.apiKey;
const id = props.id;
const query = props.query;
const catchTime = props?.queryOption?.catchTime ?? 5;
const queryRunId = props?.queryRunId;
const pageQuery =
  props?.queryOption?.page?.number && props?.queryOption?.page?.size
    ? props.queryOption.page
    : { number: 1, size: 10000 };
const sortQuery = props?.queryOption?.sortBy
  ? props.queryOption.sortBy
  : undefined;
const filterQuery = props?.queryOption?.filter
  ? props.queryOption.filter
  : undefined;
const test = (res) => {
  console.log("total res", res);
};
const onResult = props.onResult || test;
State.init({
  queryRunId: queryRunId,
  isQueryRunning: false,
  isInitialRun: true,
  isLoading: false,
  data: null,
  error: null,
});
let timeOutId;
if (state.isQueryRunning) {
  console.log("ti1");
  const refetch = () => {
    console.log("ti2");
    queryStatus(state.queryRunId).then(({ error, isRunning }) => {
      if (error) {
        State.update({ isLoading: false });
        State.update({ isQueryRunning: false });
        State.update({ error });
      } else if (isRunning) {
        console.log("ti runing");
        timeOutId = setTimeout(refetch, 5000);
      } else {
        queryResult(state.queryRunId).then(({ data, error }) => {
          if (error) {
            State.update({ isLoading: false });
            State.update({ isQueryRunning: false });
            State.update({ error });
          } else {
            console.log("data", data);
            State.update({ isLoading: false });
            State.update({ isQueryRunning: false });
            State.update({ data });
          }
        });
      }
    });
  };
  timeOutId = setTimeout(refetch, 5000);
} else {
  clearTimeout(timeOutId);
}
const sendQuery = (query) => {
  console.log("send q");
  State.update({ isLoading: true });
  runQuery(query).then(({ queryRunId, error }) => {
    if (error) {
      State.update({ isLoading: false });
      State.update({ isQueryRunning: false });
      State.update({ error });
    } else {
      State.update({ queryRunId });
    }
  });
};
const runQuery = async (query) => {
  if (state.queryRunId) {
    console.log("run q w id");
    return queryResult(state.queryRunId).then(({ data, error }) => {
      if (error) {
        State.update({ queryRunId: null, isInitialRun: true });
      } else {
        console.log("data", data);
        State.update({ isLoading: false });
        State.update({ isQueryRunning: false });
        State.update({ data });
      }
    });
  } else {
    console.log("run q wout id");
    return queryFetch(query).then(({ queryRunId, error }) => {
      if (error) return { queryRunId, error };
      return queryStatus(queryRunId).then(
        ({ error, isRunning, queryRunId }) => {
          if (error) return { queryRunId, error };
          if (isRunning) {
            State.update({ isQueryRunning: true });
            return { queryRunId, error };
          }
          queryResult(queryRunId).then(({ data, error }) => {
            if (error) {
              State.update({ isLoading: false });
              State.update({ isQueryRunning: false });
              State.update({ error });
            } else {
              console.log("data", data);
              State.update({ isLoading: false });
              State.update({ isQueryRunning: false });
              State.update({ data });
            }
          });
          return { queryRunId, error };
        }
      );
    });
  }
};
const queryFetch = async (query) => {
  console.log("qfetch");
  const raw = JSON.stringify({
    jsonrpc: "2.0",
    method: "createQueryRun",
    params: [
      {
        resultTTLHours: 1,
        maxAgeMinutes: catchTime,
        sql: query,
        dataSource: "snowflake-default",
        dataProvider: "flipside",
      },
    ],
    id: 1,
  });
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
    body: raw,
  };
  const result = { error: null, queryRunId: null };
  return asyncFetch(
    "https://api-v2.flipsidecrypto.xyz/json-rpc",
    requestOptions
  ).then((res) => {
    if (!res.ok && res.error) {
      result.error = res.error;
      return result;
    } else if (!res.ok) {
      result.error =
        res.status === 401
          ? "Invalid API Key."
          : res.status === 404
          ? "query sent to wrong api address"
          : res.status;
      return result;
    }
    const data = res.body;
    if (data.error) {
      result.error = `${data.error.message} - (code${data.error.code})`;
      return result;
    } else {
      const queryRunId = data.result.queryRun.id;
      result.queryRunId = queryRunId;
      return result;
    }
  });
};
const queryStatus = async (queryRunId) => {
  console.log("qstat");
  const raw = JSON.stringify({
    jsonrpc: "2.0",
    method: "getQueryRun",
    params: [{ queryRunId: queryRunId }],
    id: 1,
  });
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
    body: raw,
  };
  const result = { error: null, queryRunId, isRunning: false };
  return asyncFetch(
    "https://api-v2.flipsidecrypto.xyz/json-rpc",
    requestOptions
  ).then((res) => {
    if (!res.ok && res.error) {
      console.log("qstat err 1");
      result.error = res.error;
      return result;
    } else if (!res.ok) {
      console.log("qstat err 2");
      result.error =
        res.status === 401
          ? "Invalid API Key."
          : res.status === 404
          ? "query sent to wrong api address"
          : res.status;
      return result;
    }
    const data = res.body;
    if (data.error) {
      console.log("qstat err 3");
      result.error = `${data.error.message} - (code${data.error.code})`;
      return result;
    } else {
      if (data.result.queryRun.state === "QUERY_STATE_FAILED") {
        console.log("qstat 4 faild");
        result.isRunning = false;
        result.error = `Query run failed (code-${data.result.queryRun.errorData.code})`;
        return result;
      }
      if (data.result.queryRun.state !== "QUERY_STATE_SUCCESS") {
        console.log("qstat 5 no succses");
        result.isRunning = true;
        return result;
      }
      console.log("qstat 6 succses");
      result.isRunning = false;
      return result;
    }
  });
};
const queryResult = async (queryRunId) => {
  console.log("qres");
  const otherParams = {
    page: pageQuery,
    sortBy: sortQuery,
    filter: filterQuery,
  };
  const raw = JSON.stringify({
    jsonrpc: "2.0",
    method: "getQueryRunResults",
    params: [{ queryRunId: queryRunId, format: "json", ...otherParams }],
    id: 1,
  });
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
    body: raw,
  };
  const result = { error: null, data: null };
  return asyncFetch(
    "https://api-v2.flipsidecrypto.xyz/json-rpc",
    requestOptions
  ).then((res) => {
    if (!res.ok && res.error) {
      result.error = res.error;
      return result;
    } else if (!res.ok) {
      result.error =
        res.status === 401
          ? "Invalid API Key."
          : res.status === 404
          ? "query sent to wrong api address"
          : res.status;
      return result;
    }
    const data = res.body;
    if (data.error) {
      result.error = `${data.error.message} - (code${data.error.code})`;
      return result;
    } else {
      result.data = data.result;
      return result;
    }
  });
};
if (!API_KEY) {
  return onResult({
    data: null,
    error: "no api key provided",
    isLoading: false,
    queryRunId: null,
    id: id,
  });
}
if (!id) {
  return onResult({
    data: null,
    error: "no id provided",
    isLoading: false,
    queryRunId: null,
    id: id,
  });
}
if (!query) {
  return onResult({
    data: null,
    error: "no query provided",
    isLoading: false,
    queryRunId: null,
    id: id,
  });
}
if (state.isInitialRun) {
  State.update({ isInitialRun: false });
  sendQuery(query);
}
return onResult({
  data: state.data,
  error: state.error,
  isLoading: state.isLoading,
  queryRunId: state.data && state.queryRunId,
  id,
});
