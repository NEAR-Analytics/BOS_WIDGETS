/*
This is an example snippet - you should consider tailoring it
to your service.
*/
State.init({ widgetData: [] });

async function fetchGraphQL(operationsDoc, operationName, variables) {
  asyncFetch("https://near-queryapi.api.pagoda.co/v1/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
    headers: {
      "x-hasura-role": "harrydhillon_near",
      "content-type": "application/json",
    },
  }).then(({ body: { data } }) => {
    State.update({ widgetData: Object.values(data) });
  });
}

const operationsDoc = `
query MyQuery {
  harrydhillon_near_widget_search_widget_activity(limit: 10) {
    widget_code
    widget_name
    widget_search_term
    receipt_id
    id
    block_timestamp
    account_id
    block_height
  }
}
`;

function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, "MyQuery", {});
}

async function startFetchMyQuery() {
  const { errors, data } = fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data, "mydatssa");
}
startFetchMyQuery();
console.log(state.widgetData[0][0]);

function addEllipsis(str) {
  if (str.length > 200) {
    return str.substring(0, 200) + '...';
  } else {
    return str;
  }
}
return (
  <div>
    {state.widgetData[0].map((item) => (
      <div style={{ padding: 10, backgroundColor: "lightGray", margin: 3 }}>
        <p style={{ paddingBottom: -20 }}>
          <span style={{ fontWeight: "bold" }}>Widget Name</span> :{" "}
          {item.widget_name}{" "}
        </p>
        <p>
          {" "}
          <span style={{ fontWeight: "bold" }}>Widget Name</span> :{" "}
          {item.widget_search_term}{" "}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Widget Code</span> :{" "}
          {addEllipsis(item.widget_code)}{" "}
        </p>
      </div>
    ))}
  </div>
);
