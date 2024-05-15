const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: white;
`;
const Asset = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: white;
`;
const UsdValue = styled.div`
  font-size: 14px;
  color: #b2b4bd;
`;
const IconWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Icon = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
`;
const Symbol = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  display: flex;
  align-items: center;
`;
const StyledExpand = styled.div`
  cursor: pointer;
  transform-origin: center;
  transform: rotate(-90deg);
  transition: 0.3s;

  &.expand {
    transform: rotate(0deg);
  }
`;

const { key, expand, data, value, type, from, prices } = props;

function formatAmount(number) {
  if (typeof Number(number) !== "number") return "-";
  if (isNaN(Number(number))) return "-";
  if (Number(number) === 0) return "0";

  let str_num;

  if (number >= 1e3 && number < 1e6) {
    str_num = number / 1e3;
    return str_num.toFixed(2) + "K";
  } else if (number >= 1e6) {
    str_num = number / 1e6;
    return str_num.toFixed(2) + "M";
  } else {
    return Big(number || 0).lt(0.01) ? "< 0.01" : Number(number).toFixed(2);
  }
}
function formatValue(value, digits) {
  if (isNaN(Number(value))) return "";
  if (Number(value) === 0) return "0";
  return Big(value || 0).lt(0.01)
    ? "< 0.01"
    : `${Number(value).toFixed(digits || 2)}`;
}
function renderDom() {
  switch (type) {
    case "AMOUNT":
      if (key === "totalSupplied" || key === "yourLends") {
        return (
          <Asset>
            <Symbol>
              {formatAmount(value)} {data.TOKEN_B.symbol}
            </Symbol>
            <UsdValue>
              ${" "}
              {formatAmount(
                Big(prices[data.TOKEN_B.symbol] || 0)
                  .times(Big(value || 0))
                  .toFixed(2)
              )}
            </UsdValue>
          </Asset>
        );
      }
      return <Wrap>{formatAmount(value)}</Wrap>;

    case "TEXT":
      return <Wrap>{value}</Wrap>;
    case "PERCENT":
      return (
        <Wrap>
          {Big(value || 0)
            .times(100)
            .toFixed(2)}
          %
        </Wrap>
      );
    case "TOKEN_WITH_ICON":
      if (key === "Collateral") {
        return (
          <IconWrap>
            <Icon src={data.TOKEN_A.icon} />
            <Symbol>{data.TOKEN_A.symbol}</Symbol>
          </IconWrap>
        );
      }
      if (key === "Borrow") {
        return (
          <IconWrap>
            <Icon src={data.TOKEN_B.icon} />
            <Symbol>{data.TOKEN_B.symbol}</Symbol>
          </IconWrap>
        );
      }

    case "HANDLER":
      return (
        <StyledExpand className={expand ? "expand" : ""}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="8"
            viewBox="0 0 11 8"
            fill="none"
          >
            <path
              d="M5.94103 7.02391C5.5407 7.52432 4.77961 7.52432 4.37929 7.02391L0.459914 2.1247C-0.0638966 1.46993 0.402276 0.499999 1.24078 0.499999L9.07953 0.5C9.91804 0.5 10.3842 1.46993 9.8604 2.12469L5.94103 7.02391Z"
              fill="#979ABE"
            />
          </svg>
        </StyledExpand>
      );
    default:
      return <Symbol>{value}</Symbol>;
  }
}

return renderDom();
