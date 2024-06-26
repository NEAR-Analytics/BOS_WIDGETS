const Asset = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: white;
`;
const IconWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 44px;
`;
const Icon = styled.img`
  position: absolute;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  left: 0;
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

const Badge = styled.div`
  color: white;
  background-color: ${(props) =>
    props.type === "ACTIVE" ? "#28a745" : "#6c757d"};
  display: inline-block;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const { key, expand, data, amount, from } = props;

function formatAmount(number) {
  if (typeof Number(number) !== "number") return "-";
  if (isNaN(Number(number))) return "-";

  let str_num;

  if (number >= 1e3 && number < 1e6) {
    str_num = number / 1e3;
    return str_num.toFixed(2) + "K";
  } else if (number >= 1e6) {
    str_num = number / 1e6;
    return str_num.toFixed(2) + "M";
  } else {
    return Number(str_num).toFixed(2);
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
  switch (key) {
    case "POOL_NAME":
      return (
        <Asset>
          <IconWrap>
            <Icon src={data.TOKEN_A.icon} />
            <Icon src={data.TOKEN_B.icon} style={{ left: 14 }} />
          </IconWrap>
          <Symbol>{data.POOL_NAME}</Symbol>
        </Asset>
      );
    case "YourDeposited":
      return (
        <Asset>
          {formatValue(data.yourDeposited, 2)}
          {data.depositSymbol}
        </Asset>
      );
    case "TotalDeposits":
      return (
        <Asset>
          {formatValue(data.totalAssets, 2)}
          {data.depositSymbol}
        </Asset>
      );

    case "Debt":
      return (
        <Asset>
          {formatValue(data.yourBorrowed, 2)}
          {data.borrowSymbol}
        </Asset>
      );
    case "Rate":
      return <Asset>{Big(data.Rate).times(100).toFixed(2)}%</Asset>;
    case "APY":
      return <Asset>{Big(data.Rate).times(100).toFixed(2)}%</Asset>;
    case "AvailableBorrow":
      return (
        <Asset>
          {formatValue(data.availableBorrow, 2)}
          {data.borrowSymbol}
        </Asset>
      );

    case "TotalCollateral":
      return (
        <Asset>
          {formatValue(data.totalCollateral, 2)}
          {data.collateralSymbol}
        </Asset>
      );

    case "Utilization":
      return (
        <Asset>
          {data.utilization ? `${Big(data.utilization).toFixed(2)}%` : ""}
        </Asset>
      );
    //
    ///
    case "BORROW":
      return (
        <Asset>
          <Icon src={data.BORROW_URL} />
          <Symbol>{data.BORROW_TOKEN}</Symbol>
        </Asset>
      );
    case "MAX_LTV":
      return <Symbol>{Big(amount).mul(100).toFixed(2)}%</Symbol>;
    case "MCR":
      return <Symbol>{Big(amount).mul(100).toFixed(2)}%</Symbol>;
    case "ONE_TIME_FEE":
      return <Symbol>{Big(amount).toFixed(2)}% or less</Symbol>;
    case "MIN_DEBT":
      return (
        <Asset>
          <Icon src={data.BORROW_URL} />
          <Symbol>{amount}</Symbol>
        </Asset>
      );
    case "MINTED_CAP":
      return (
        <Symbol>
          {formatAmount(data["MINTED"])}/{formatAmount(amount)}
        </Symbol>
      );
    case "LOAN_STATUS":
      return <Badge type={data.vesselStatus}>{data.vesselStatus}</Badge>;
    case "handler":
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
      return <Symbol>{amount}</Symbol>;
  }
}

return renderDom();
