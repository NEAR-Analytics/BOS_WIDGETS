const { tokenId, balance } = props;
if (!tokenId) {
  throw "Missing tokenId";
}

const bigBalance =
  balance === null || balance === undefined ? null : Big(balance);

const metadata = Near.view(tokenId, "ft_metadata");

const bigToString = (b, p, len) => {
  if (b === null || b === undefined) {
    return "???";
  }
  b = Big(b);
  let s = b.toFixed();
  let pos = s.indexOf(".");
  p = p || 6;
  len = len || 7;
  if (pos > 0) {
    let ap = Math.min(p, Math.max(len - pos, 0));
    if (ap > 0) {
      ap += 1;
    }
    if (pos + ap < s.length) {
      s = s.substring(0, pos + ap);
    }
  } else {
    pos = s.length;
  }
  for (let i = pos - 4; i >= 0; i -= 3) {
    s = s.slice(0, i + 1) + "," + s.slice(i + 1);
  }

  if (s === "0.000000" && p === 6 && len === 7) {
    return "<0.000001";
  }

  return s;
};

function MutedDecimals(props) {
  const value = props.value;

  const dotPos = value.indexOf(".");
  if (dotPos > 0) {
    return (
      <span className="d-inline-flex">
        {value.charAt(0) === "<" ? (
          <>
            <span className="text-secondary">{"<"}</span>
            {value.substring(1, dotPos)}
          </>
        ) : (
          value.substring(0, dotPos)
        )}
        <span className="text-secondary">{value.substring(dotPos)}</span>
      </span>
    );
  }
  return value;
}

const adjustedBalance =
  !bigBalance || !metadata?.decimals
    ? bigBalance
    : bigBalance.div(Big(10).pow(metadata.decimals));

const name = metadata?.name || "";
const icon = metadata?.icon;
const symbol = metadata?.symbol || tokenAccountId;

const Wrapper = styled.div`
.token-badge {
  vertical-align: middle;
  width: 12rem;
  margin-right: 1rem;

  .token-name {
    color: #666;
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    vertical-align: middle;
    margin-right: 0.5em;
  }
}
`;

return (
  <Wrapper>
    <div className="d-inline-block token-badge">
      <div className="token-name text-truncate" title={name}>
        {name}
      </div>
      <div title={tokenAccountId}>
        {icon && <img src={icon} alt="Token Icon" />}
        <span className="font-monospace align-middle text-truncate">
          {symbol}
        </span>
      </div>
    </div>
    <span className="font-monospace fw-bold">
      <MutedDecimals value={bigToString(adjustedBalance.toString())} />
    </span>
  </Wrapper>
);
