const [accountId, setAccountId] = useState(
  props.accountId || context.accountId || "root.near"
);
const [actions, setActions] = useState(false);

const Limit = 50;

const actionsFilter = [
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
}));

const toCamel = (s) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

function processAction(action) {
  Object.fromEntries(Object.entries(action).map(([k, v]) => [toCamel(k), v]));
  action.time = new Date(action.blockTimestamp * 1000);
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
  const ws = connect();

  return () => {
    // shutdown
    ws.close();
  };
}, [accountId]);

const Wrapper = styled.div`
`;

return (
  <Wrapper>
    <div className="header">
      Actions of
      <Widget src="mob.near/widget/N.ProfileLine" props={{ accountId }} />
    </div>
    <div>{JSON.stringify(actions)}</div>
  </Wrapper>
);
