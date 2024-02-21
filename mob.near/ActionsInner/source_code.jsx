const accountId = props.accountId;
if (!accountId) {
  return "";
}
const [actions, setActions] = useState(false);

const Limit = 50;

const actionsFilter = useMemo(
  () =>
    [
      "account_id",
      "args_account_id",
      "args_new_account_id",
      "args_nft_contract_id",
      "args_owner_id",
      "args_receiver_id",
      "args_sender_id",
      "predecessor_id",
      "signer_id",
    ].map((key) => ({
      [key]: accountId,
      status: "SUCCESS",
    })),
  [accountId]
);

const toCamel = (s) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

function processAction(action) {
  action = Object.fromEntries(
    Object.entries(action).map(([k, v]) => [toCamel(k), v])
  );
  action.time = new Date(action.blockTimestamp * 1000);
  action.id = `${action.receiptId}:${action.actionIndex}`;
  return action;
}

const processActions = (newActions) => {
  newActions = newActions.flatMap(processAction);
  newActions.reverse();

  setActions((prevActions) =>
    [
      ...newActions.filter(
        (event) =>
          !prevActions ||
          prevActions.length === 0 ||
          event.time.getTime() > prevActions[0].time.getTime()
      ),
      ...(prevActions || []),
    ].slice(0, Limit)
  );
};

function connect() {
  console.log("Triggered connect");
  const ws = new WebSocket("wss://actions.near.stream/ws");

  ws.onopen = () => {
    console.log(`Connection to WS has been established`);
    ws.send(
      JSON.stringify({
        secret: `near-social-actions-${new Date().getTime()}}`,
        filter: actionsFilter,
        fetch_past_actions: Limit,
      })
    );
  };
  ws.onclose = () => {
    console.log(`WS Connection has been closed`);
    connect();
  };
  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    processActions(data.actions);
  };
  ws.onerror = (err) => {
    console.log("WebSocket error", err);
  };

  return ws;
}

useEffect(() => {
  setActions(false);
  const ws = connect();

  return () => {
    // shutdown
    console.log("Shutdown");
    ws.close();
  };
}, [accountId]);

const Wrapper = styled.div`
.header {
  margin-bottom: 1em;
}
.action {
  margin-bottom: 1em;
  overflow: hidden;
}
`;

const renderAction = (action) => {
  return (
    <div>
      <div>
        Time:{" "}
        <Widget
          loading="Xs"
          src="mob.near/widget/TimeAgoMs"
          props={{ timeMs: action.blockTimestamp * 1000 }}
        />{" "}
        ago
      </div>
      <div>Type: {action.action}</div>
      {action.methodName && <div>Method: {action.methodName}</div>}
      <div>Receipt: {action.receiptId}</div>
      <div className="text-nowrap">
        Predecessor:{" "}
        <Widget
          src="mob.near/widget/N.ProfileLine"
          props={{ accountId: action.predecessorId }}
        />
      </div>
    </div>
  );
};

return (
  <Wrapper>
    <div className="header">
      Actions of
      <Widget src="mob.near/widget/N.ProfileLine" props={{ accountId }} />
    </div>
    <div className="actions">
      {actions
        ? actions.map((action) => (
            <div key={action.id} className="action">
              {renderAction(action)}
            </div>
          ))
        : "Loading"}
    </div>
  </Wrapper>
);
