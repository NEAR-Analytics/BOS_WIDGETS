const TGas = Big(10).pow(12);
const OneNear = Big(10).pow(24);
const ContractId = "social.near";

const [awaitingTx, setAwaitingTx] = useState(null);

const awaitingTxData = awaitingTx
  ? Near.view(
      awaitingTx.contractId,
      awaitingTx.method,
      awaitingTx.args,
      "final",
      true
    )
  : null;

useEffect(() => {
  if (!awaitingTx || !awaitingTxData) return;

  if (JSON.stringify(awaitingTxData) === JSON.stringify(awaitingTx.expected)) {
    setAwaitingTx(null);
  }
}, [awaitingTxData, awaitingTx]);

const getTopContext = (ctx) => {
  return ctx.parent ? getTopContext(ctx.parent) : ctx;
};

const buildShareLink = (targetUrl, mutationId) => {
  const url = new URL("https://augm.link/mutate");

  url.searchParams.set("t", targetUrl);
  url.searchParams.set("m", mutationId);

  return url.href;
};

const buildRepostText = (shareLink, text) => {
  return `Forwarded from X with [MutableWeb](${shareLink}):\n\n${text}`;
};

const handleCrosspostClick = () => {
  const post = props.context.parsed;
  const { mutationId } = getTopContext(props.context).parsed;
  const shareLink = buildShareLink(post.url, mutationId);
  const repostText = buildRepostText(shareLink, post.text);

  const serializedPost = JSON.stringify({
    type: "md",
    text: repostText,
  });

  const args = {
    data: {
      [context.accountId]: {
        post: {
          main: serializedPost,
        },
        index: {
          post: JSON.stringify({
            key: "main",
            value: { type: "md" },
          }),
        },
      },
    },
  };

  const gas = TGas.mul(100).toFixed(0);
  const deposit = OneNear.div(100); // 0.01 NEAR // ToDo: calculate storage deposit

  setAwaitingTx({
    contractId: ContractId,
    method: "get",
    args: { keys: [`${context.accountId}/post/main`] },
    expected: {
      [context.accountId]: { post: { main: serializedPost } },
    },
  });

  Near.call(ContractId, "set", args, gas, deposit);
};

if (awaitingTx) {
  return (
    <button class="btn btn-primary" type="button" disabled>
      <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
      <span role="status">Loading...</span>
    </button>
  );
}

return (
  <button
    class="btn btn-primary"
    type="button"
    disabled={!context.accountId}
    onClick={handleCrosspostClick}
  >
    <span role="status">CrossPost</span>
  </button>
);
