const {
  firstIconName,
  firstIconUrl,
  secondIconName,
  secondIconUrl,
  componentType,
  apy_value,
} = props; // liNEAR, xref, NearX
const BannerData = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  .apr {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #fff;
    margin-right: 30px;
    .value {
      font-weight: 700;
      font-size: 22px;
      color: #00ffa3;
      margin-left: 8px;
    }
  }

  @media (max-width: 770px) {
    .apr {
      font-size: 12px;
      .value {
        font-size: 16px;
      }
    }
  }
`;
const ExchangeRoute = styled.div`
  position: relative;
  padding-left: 96px;
  .bigIcon {
    position: absolute;
    left: 20px;
    top: -24px;
    background: #1a2e33;
    border-radius: 100%;
    padding: 7px;
    margin-right: 13px;
    img {
      width: 46px;
      height: 46px;
      border-radius: 100px;
    }
  }

  .flex-center {
    display: flex;
    align-items: center;
  }
  .boldText {
    font-weight: 700;
    font-size: 22px;
    color: #fff;
  }
  .thinText {
    font-weight: 400;
    font-size: 16px;
    color: #fff;
  }
  .mx-10 {
    margin: 0 10px 0 10px;
  }
  .smallIcon {
    width: 26px;
    height: 26px;
    margin-right: 10px;
    border-radius: 100px;
  }

  @media (max-width: 770px) {
    padding-left: 75px;

    .bigIcon {
      position: absolute;
      left: 20px;
      top: -20px;
      background: #1a2e33;
      border-radius: 100%;
      padding: 7px;
      margin-right: 13px;
      img {
        width: 32px;
        height: 32px;
        border-radius: 100px;
      }
    }

    .boldText {
      font-weight: 700;
      font-size: 16px;
      color: #fff;
    }
  }
`;
const arrowIcon = (
  <svg
    width="16"
    height="6"
    viewBox="0 0 16 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      d="M1 5H13.5L9.5 1"
      stroke="#7C7F96"
      stroke-width="2"
    />
  </svg>
);
function getAPY() {
  const result = fetch("https://metrics.linearprotocol.org", {
    method: "GET",
  });
  const apy = result.body.apy;
  if (!apy) return "-";
  return Big(apy).mul(100).toFixed(2) + "%";
}
function getxrefAPY() {
  const result = Near.view("xtoken.ref-finance.near", "contract_metadata");
  if (!result) return "-%";
  const { locked_token_amount, reward_per_sec } = result;
  const apr =
    (1 / locked_token_amount) *
    (Number(reward_per_sec) * 365 * 24 * 60 * 60 * 100);
  return Big(apr).toFixed(2) + "%";
}
function getNearXAPY() {
  if (apy_value) {
    return `${apy_value}%`;
  } else {
    return "-";
  }
}
let apy;
if (componentType == "liNEAR") {
  apy = getAPY();
} else if (componentType == "NearX") {
  apy = getNearXAPY();
} else {
  apy = getxrefAPY();
}
return (
  <BannerData>
    <ExchangeRoute>
      <div class="bigIcon">
        <img src={firstIconUrl} />
      </div>
      <div class="flex-center">
        <span class="boldText">{firstIconName}</span>
        <span class="mx-10">{arrowIcon}</span>
        <img class="smallIcon" src={secondIconUrl} />
        <span class="thinText">{secondIconName}</span>
      </div>
    </ExchangeRoute>
    <div class="apr">
      APR<span class="value">{apy}</span>
    </div>
  </BannerData>
);
