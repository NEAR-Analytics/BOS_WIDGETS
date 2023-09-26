const QUERYAPI_ENDPOINT = `https://near-queryapi.api.pagoda.co/v1/graphql/`;

State.init({
  data: [],
});

const query = `query user_activity {
    roshaan_near_user_activity_user_last_activity(order_by: {block_height: desc} limit: 50) {
      activity_id
      block_height
      account_id
      activity_type
      block_timestamp
    }
  }`;

function fetchGraphQL(operationsDoc, operationName, variables) {
  return asyncFetch(QUERYAPI_ENDPOINT, {
    method: "POST",
    headers: { "x-hasura-role": `roshaan_near` },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });
}

fetchGraphQL(query, "user_activity", {}).then((result) => {
  if (result.status === 200) {
    if (result.body.data) {
      const data =
        result.body.data.roshaan_near_user_activity_user_last_activity;
      State.update({ data });
    }
  }
});

const Activity = styled.div`
  position: relative;

  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 19px;
    top: 52px;
    bottom: 12px;
    width: 2px;

    background: #eceef0;
  }
`;

const Header = styled.div`
  margin-bottom: 0;
  display: inline-flex;
`;

const Body = styled.div`
  padding-left: 52px;
  padding-bottom: 1px;
`;

const Content = styled.div`
  img {
    display: block;
    max-width: 100%;
    max-height: 80vh;
    margin: 0 0 12px;
  }
`;

const Text = styled.p`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #687076;
  white-space: nowrap;
`;

const renderData = (a) => {
  const timeMs = parseFloat(a.block_timestamp) / 1e6;
  const date = new Date(timeMs);

  return (
    <Activity style={{ margin: "10px" }}>
      <Header>
        <div className="row">
          <div className="col-auto">
            <Widget
              src="near/widget/AccountProfile"
              props={{
                accountId: a.account_id,
                hideAccountId: false,
                inlineContent: (
                  <>
                    <Text as="span">･</Text>
                    <Text className="col-auto">
                      Last Online: {date.toDateString()}
                    </Text>
                    <>
                      <Widget
                        src="mob.near/widget/TimeAgo"
                        props={{ blockHeight: a.block_height }}
                      />{" "}
                      ago
                    </>
                  </>
                ),
              }}
            />
          </div>
        </div>
      </Header>
    </Activity>
  );
};

const renderedData = state.data.map(renderData);
return (
  <div style={{ border: "0.5px solid black", borderRadius: "20px" }}>
    {renderedData}
  </div>
);
