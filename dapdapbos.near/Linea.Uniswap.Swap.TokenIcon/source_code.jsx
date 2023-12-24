const TokenIcon = styled.img`
  border-radius: 50%;
`;

const DEFAULT_TOKEN_ICON = "/defalut_token.png";

const cached_icons = Storage.privateGet("cached_icons") || {};

const getIconByAddress = (address) => {
  return `https://assets.dapdap.net/images/${address.toLowerCase()}.png`;
};

const size = props.size || 22;
const token = props.token || {};
const symbol = token.symbol || "";

const _src =
  props.src ||
  token.icon ||
  cached_icons[symbol] ||
  (token.address && getIconByAddress(token.address)) ||
  DEFAULT_TOKEN_ICON ||
  "";
if (!state.src || (state.src !== _src && !state.deadlinks[symbol])) {
  State.update({
    src: _src,
  });
}
if (state.deadlinks[symbol]) {
  State.update({
    src: DEFAULT_TOKEN_ICON,
  });
}
return (
  <TokenIcon
    src={state.src}
    style={{
      width: size + "px",
      height: size + "px",
    }}
    onLoad={() => {
      if (symbol) {
        cached_icons[symbol] = state.src;
        Storage.privateSet("cached_icons", cached_icons);
      }
    }}
    onError={() => {
      const deadlinks = state.deadlinks || {};
      deadlinks[symbol] = state.src;
      State.update({
        src: DEFAULT_TOKEN_ICON,
        deadlinks,
      });
    }}
  ></TokenIcon>
);
