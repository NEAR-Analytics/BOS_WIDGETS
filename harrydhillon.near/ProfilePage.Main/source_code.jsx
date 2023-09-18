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

const totalCommits = Object.keys(widget ?? {})
  .map((key) => widget[key])
  .flat();

const widgets = Social.getr(`${accountId}/widget`) ?? {};

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
    State.update({ allImages: Object.values(data)[0] });
  });
}

const operationsDoc = `  query MyQuery {
    harrydhillon_near_jutsu_widget_activity_search_widget_activity(
      where: {account_id: {_iregex: "${accountId}"}, _and: {widget_image: {_neq: ""}}}
      distinct_on: widget_name
    ) {
      widget_image
      widget_name
    }
  }`;

console.log(operationsDoc);

function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, "MyQuery", {});
}

fetchMyQuery();

const FollowButton = styled.button`
    background-color: transparent;
    border: 2px solid ${props.theme.textColor};
    border-radius: 40px;
    color: ${props.theme.textColor};
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 30px;
    padding-right: 30px;
    margin-left:auto;
`;

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
        <div
          style={{
            width: "fit-content",
            marginLeft: "auto",
            paddingRight: 15,
            paddingTop: 15,
          }}
        >
          <FollowButton>+ Follow</FollowButton>
        </div>
        <div style={{ marginTop: 20 }} />
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
                    image: state?.allImages.filter(
                      (_) => _.widget_name === item
                    )?.[0]?.widget_image
                      ? JSON.parse(
                          state?.allImages.filter(
                            (_) => _.widget_name === item
                          )?.[0]?.widget_image
                        ).ipfs_cid
                      : null,
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
