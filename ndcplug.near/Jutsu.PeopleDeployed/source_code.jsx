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
  harrydhillon_near_jutsu_widget_activity_search_widget_activity(
    where: {widget_platform: {_iregex: "jutsu"}}
    distinct_on: account_id
  ) {
    widget_platform
    account_id
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
    return str.substring(0, 200) + "...";
  } else {
    return str;
  }
}
return (
  <div style={{ padding: 10 }}>
    <h3>List of People Deploying on JUTSU</h3>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        paddingBottom: 60,
      }}
    >
      {state.widgetData[0].map((item) => {
        return (

          <Widget src="near/widget/AccountProfileCard" props={{accountId: item.account_id}}/>

        );
      })}
    </div>
  </div>
);