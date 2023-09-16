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
        const profile = Social.getr(`${item.account_id}/profile`);
        const image = profile?.image;

        const url = image.ipfs_cid
          ? `https://ipfs.near.social/ipfs/${image?.ipfs_cid}`
          : "https://thewiki.io/static/media/sasha_anon.6ba19561.png";
        return (
          <div
            style={{
              padding: 5,
              backgroundColor: "lightGray",
              width: "49.5%",
              margin: 3,
              borderRadius: 5,
            }}
          >
            <img
              style={{
                width: 100,
                height: 100,
                objectFit: "cover",
                borderRadius: "50%",
                outline: "2px solid #dbdcdd",
              }}
              src={url}
              alt="profile"
            />
            <p style={{ fontSize: 12, paddingTop: 10 }}>
              <span style={{ fontWeight: "bold" }}>Account Id</span> :{" "}
              {item.account_id}
            </p>
          </div>
        );
      })}
    </div>
  </div>
);
