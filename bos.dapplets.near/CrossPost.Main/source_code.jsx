const TGas = Big(10).pow(12);
const OneNear = Big(10).pow(24);
const ContractId = "social.near";

const [isLoading, setIsLoading] = useState(false);

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

  Near.call(ContractId, "set", args, gas, deposit);

  // ToDo: use tx
  setIsLoading(true);
  setTimeout(() => setIsLoading(false), 5000);
};

const ShareIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.2002 0.5C4.0752 0.5 0.700195 3.875 0.700195 8C0.700195 12.125 4.0752 15.5 8.2002 15.5C12.3252 15.5 15.7002 12.125 15.7002 8C15.7002 3.875 12.3252 0.5 8.2002 0.5ZM9.7002 11V8.75C6.9927 8.75 5.0577 9.8225 3.7002 11.75C4.2402 8.9975 5.9052 6.2975 9.7002 5.75V3.5L13.4502 7.25L9.7002 11Z"
      fill="#5B7083"
    />
  </svg>
);

const Button = styled.button`
  display: flex;
  color: #5b7083;
  font-family: sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
  border: none;
  background: none;
  gap: 6px;

  &:hover {
    color: #4e5459;
  }

  &:active {
    color: #2d3031;
  }
`;

if (isLoading) {
  return (
    <Button disabled>
      <div>
        <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
      </div>
      <div>Sending...</div>
    </Button>
  );
}

return (
  <Button disabled={!context.accountId} onClick={handleCrosspostClick}>
    <div>
      <ShareIcon />
    </div>
    <div>Share</div>
  </Button>
);
