const accountId = props.accountId || context.accountId;

if (!accountId) return "Login or send accountId in the props";

const profile = Social.getr(`${accountId}/profile`);

const allWidgetsHistoryChangesBlocks = Social.keys(
  `${accountId}/widget/*`,
  "final",
  {
    return_type: "History",
  }
);

if (allWidgetsHistoryChangesBlocks === null) return "Loading...";

const widget = allWidgetsHistoryChangesBlocks[accountId].widget;

const totalCommits = Object.keys(widget)
  .map((key) => widget[key])
  .flat();

const widgets = Social.getr(`${accountId}/widget`) ?? {};

const allGraphqlQueries = Object.keys(widgets).map((item)=>(
  `query MyQuery {
    harrydhillon_near_jutsu_widget_activity_search_widget_activity(
      where: {widget_search_term: {_iregex: "${accountId}.${item}"}, _and: {widget_image: {_neq: ""}}}
    ) {
      widget_image
    }
  }`
))

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
    console.log(data)
  });
}

const operationsDoc = allGraphqlQueries.join('\n')

console.log(operationsDoc)

function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, "MyQuery", {});
}

fetchMyQuery();



return (
  <div style={{ display: "flex", width: "100%", gap: "20px" }}>
    <div style={{ width: "50%" }}>
      <Widget
        src="harrydhillon.near/widget/ProfilePage.UserInfo"
        props={props}
      />
    </div>
    <div style={{ width: "50%" }}>
      <div>
        <div style={{ marginTop: 40 }} />
        <h4
          style={{
            lineHeight: "16px",
            fontWeight: 500,
            color: props.theme.textColor,
            textAlign: "left",
          }}
        >
          Contributions
        </h4>
        <div style={{ marginTop: 16 }} />
        <Widget
          src="harrydhillon.near/widget/ProfilePage.Contributions"
          props={{ theme: props.theme, accountId }}
        />
        <p style={{ color: props.theme.textColor3, marginTop: 5 }}>
          {totalCommits.length} contributions in the last year
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 35,
        }}
      >
        <div>
          <h4
            style={{
              lineHeight: "16px",
              fontWeight: 600,
              fontWeight: 500,
              color: props.theme.textColor,
              textAlign: "left",
            }}
          >
            Widgets
          </h4>
        </div>
        {Object.keys(widgets)?.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              marginTop: 16,
              gap: 16,
            }}
          >
            {Object.keys(widgets)?.map((item, index) => (
              <>
                <Widget
                  src="harrydhillon.near/widget/ProfilePage.WidgetItem"
                  props={{
                    name: item,
                    accountId,
                    commits:
                      allWidgetsHistoryChangesBlocks[accountId].widget[item],
                    theme: props.theme,
                  }}
                />
              </>
            ))}
          </div>
        ) : (
          <p
            style={{
              padding: 20,
              textAlign: "center",
              color: "rgba(0,0,0,.75)",
            }}
          >
            {profile?.name} does not have any widget.
          </p>
        )}
      </div>
    </div>
  </div>
);
