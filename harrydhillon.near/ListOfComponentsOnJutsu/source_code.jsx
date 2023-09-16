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
  ) {
    widget_name
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
    <h3>Components on JUTSU</h3>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        paddingBottom: 60,
      }}
    >
      {state.widgetData[0].map((item) => {
        const profile = Social.getr(`${item.account_id}/profile`);
        const image = profile?.image;

        const url = image.ipfs_cid
          ? `https://ipfs.near.social/ipfs/${image?.ipfs_cid}`
          : "https://thewiki.io/static/media/sasha_anon.6ba19561.png";
        return (
          <a
            style={{
              padding: 5,
              borderRadius: 10,
              border: "1px solid lightgray",
              width: "48%",
              margin: 3,
              borderRadius: 5,
            }}
            target="_blank"
            href={`https://jutsu.ai/${item.account_id}/widget/${item.widget_name}`}
          >
            <p
              style={{
                fontSize: 12,
                paddingTop: 10,
                marginBottom: 0,
                color: "black",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Account Id</span> :{" "}
              {item.account_id}
            </p>
            <p style={{ fontSize: 12 }}>
              <span style={{ fontWeight: "bold", marginBottom: 0 }}>
                Widget Name
              </span>{" "}
              : {item.widget_name}
            </p>
          </a>
        );
      })}
    </div>
  </div>
);
