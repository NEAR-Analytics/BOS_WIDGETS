const GRAPHQL_ENDPOINT = "near-queryapi.api.pagoda.co";

const LIMIT = 10;
const accountId = props.accountId || "bucanero.near" || context.accountId;

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181c;
  margin: 0 0 24px;
`;
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: black;
`;
const SmallTitle = styled.h3`
  color: black;
  font-weight: 600;
  font-size: 18px;
  line-height: 15px;
  text-transform: uppercase;

  @media (max-width: 770px) {
    margin-bottom: 16px;
  }
`;
const TableElement = styled.td`
  word-wrap: break-word;
  font-family: "Roboto Mono", monospace;
  font-size: 11px;
  background-color: rgb(255, 255, 255);
  color: rgb(32, 33, 36);
`;
const Subheading = styled.h2`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 10px;
  color: ${(p) => (p.bold ? "#11181C !important" : "#687076 !important")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
  outline: none;
`;
const Card = styled.div`
  border-radius: 12px;
  background: #fff;
  border: ${(div) => (div.selected ? "1px solid black" : "1px solid #eceef0")};
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  padding: 10px;  
  margin: 10px;  
  width: 80%;     
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardBody = styled.div`
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: center;
  flex-direction: column;
  > * {
    min-width: 0;
  }
`;
const CardFooter = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
  border-top: 1px solid #eceef0;
`;

const TextLink = styled.a`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C !important" : "#687076 !important")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
  outline: none;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  align-items: center;

`;

const Text = styled.p`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: ${(p) => (p.bold ? "black !important" : "#687076 !important")};
  white-space: nowrap;
`;

State.init({
  widgetActivities: [],
  widgetActivityCount: 0,
  startWebSocketWidgetActivity: null,
  initialFetch: false,
});

const widgetActivitySubscription = `
  subscription IndexerQuery {
    bucanero_near_nft_v4_nfts(order_by: {block_timestamp: desc}, limit: ${LIMIT}) {
      block_height
      block_timestamp
      id
      marketplace
      nft_data
      receipt_id
      receiver_id
    }
  }
`;

const subscriptionWidgetActivity = {
  type: "start",
  id: "widgetNftActivity", // You can use any unique identifier
  payload: {
    operationName: "IndexerQuery",
    query: widgetActivitySubscription,
    variables: {},
  },
};
function processWidgetActivity(activity) {
  return { ...activity };
}
function startWebSocketWidgetActivity(processWidgetActivities) {
  let ws = State.get().ws_widgetActivity;

  if (ws) {
    ws.close();
    return;
  }

  ws = new WebSocket(`wss://${GRAPHQL_ENDPOINT}/v1/graphql`, "graphql-ws");

  ws.onopen = () => {
    console.log(`Connection to WS has been established`);
    ws.send(
      JSON.stringify({
        type: "connection_init",
        payload: {
          headers: {
            "Content-Type": "application/json",
            "Hasura-Client-Name": "hasura-console",
            "x-hasura-role": "bucanero_near",
          },
          lazy: true,
        },
      })
    );

    setTimeout(() => ws.send(JSON.stringify(subscriptionWidgetActivity)), 50);
  };

  ws.onclose = () => {
    State.update({ ws_widgetActivity: null });
    console.log(`WS Connection has been closed`);
  };

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    console.log("received data", data);
    if (data.type === "data" && data.id === "widgetNftActivity") {
      processWidgetActivities(data.payload.data);
    }
  };

  ws.onerror = (err) => {
    State.update({ ws_widgetActivity: null });
    console.log("WebSocket error", err);
  };

  State.update({ ws_widgetActivity: ws });
}

function processWidgetActivities(incoming_data) {
  let incoming_widgetActivities =
    incoming_data.bucanero_near_nft_v4_nfts.flatMap(processWidgetActivity);
  const newActivities = [
    ...incoming_widgetActivities.filter((activity) => {
      return (
        state.widgetActivities.length == 0 ||
        activity.block_timestamp > state.widgetActivities[0].block_timestamp
      );
    }),
  ];
  if (newActivities.length > 0 && state.widgetActivities.length > 0) {
  }
  const prevActivities = state.prevActivities || [];
  State.update({ widgetActivities: [...newActivities, ...prevActivities] });
}

if (state.ws_widgetActivity === undefined) {
  State.update({
    startWebSocketWidgetActivity: startWebSocketWidgetActivity,
  });
  state.startWebSocketWidgetActivity(processWidgetActivities);
}

return (
  <div>
    <Title>
      NFT Minting Activity Feed{" "}
      <TextLink href="https://near.org/dataplatform.near/widget/QueryApi.App">
        {" "}
        Powered By QueryAPI{" "}
      </TextLink>
    </Title>
    <RowContainer>
      {state.widgetActivities.map((activity, i) => (
        <Card>
          <div>
            <Widget
              src="mob.near/widget/TimeAgo"
              props={{ blockHeight: activity.block_height }}
            />{" "}
            ago
          </div>
          <CardBody>
            <div key={i}>
              <Text bold>NFT Marketplace: {activity.marketplace}</Text>
              <TextLink
                href={`https://nearblocks.io/address/${activity.receiver_id}`}
              >
                {activity.receiver_id}
              </TextLink>
              <Text bold>Receipt ID: {activity.receipt_id}</Text>
            </div>
          </CardBody>
          <CardFooter>
            <TextLink
              href={`https://legacy.explorer.near.org/?query=${activity.receipt_id}`}
            >
              View details on NEAR Explorer
            </TextLink>
          </CardFooter>
        </Card>
      ))}
    </RowContainer>
  </div>
);
