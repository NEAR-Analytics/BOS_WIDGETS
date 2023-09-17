const gateway = "https://near.social/#/";

initState({
  imageData: [],
});

const WidgetItem = styled.a`
  border: 1px solid ${props.theme.borderColor};

  gap: 5px;
  padding: 15px 20px 20px 20px;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;


  &:hover: {
    border: 1px solid #828a94;
    cursor: pointer;
    text-decoration: none;
  }
`;

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
    State.update({ imageData: Object.values(data) });
  });
}

const operationsDoc = `
query MyQuery {
    harrydhillon_near_jutsu_widget_activity_search_widget_activity(
      where: {widget_search_term: {_iregex: "${props.accountId}.${props.name}"}, _and: {widget_image: {_neq: ""}}}
    ) {
      widget_image
    }
  }
`;

function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, "MyQuery", {});
}

fetchMyQuery();

return (
  <WidgetItem
    href={`${gateway + props.accountId}/widget/${props.name}`}
    target="_blank"
  >
    <p>{JSON.stringify(state.imageData)}</p>
    <h3
      className="max1Lines"
      style={{
        color: props.theme.textColor,
        fontSize: "1.17em",
        fontWeight: 600,
        margin: 0,
        padding: 0,
      }}
    >
      {props.name}
    </h3>
    <p
      className="max1Lines"
      style={{
        fontSize: "0.9rem",
        color: props.theme.textColor3,
        overflowWrap: "break-word",
        margin: 0,
        padding: 0,
      }}
    >{`${props.accountId}/widget/${props.name}`}</p>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginTop: 15,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          color: props.theme.textColor3,
        }}
      >
        <Widget
          src={`harrydhillon.near/widget/SearchPage.ComponentItem.TimeAgo`}
          props={{
            blockHeight: props.commits[props.commits.length - 1],
          }}
        />
      </div>
    </div>
  </WidgetItem>
);
