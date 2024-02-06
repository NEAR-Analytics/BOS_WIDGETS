if (!props.content) return <></>;

const { nearAccountId, CONTRACT_ADDRESS } = props;
const { content, is_purchased } = props.content;

const userAccountId = context.accountId || nearAccountId

/**
 * From near-api-js/packages/near-api-js/src/utils/format.ts
 */
const NEAR_NOMINATION_EXP = 24;
const NEAR_NOMINATION = new BN('10', 10).pow(new BN(NEAR_NOMINATION_EXP, 10));
const ROUNDING_OFFSETS = [];
const BN10 = new BN(10);

for (let i = 0, offset = new BN(5); i < NEAR_NOMINATION_EXP; i++) {
  ROUNDING_OFFSETS[i] = offset;
  offset = offset.mul(BN10)
}

function trimTrailingZeroes(value) {
  return value.replace(/\.?0*$/, '');
}

function formatWithCommas(value) {
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(value)) {
    value = value.replace(pattern, '$1,$2');
  }
  return value;
}

function formatNearAmount(balance, fracDigitsExternal) {
  const fracDigits = fracDigitsExternal || NEAR_NOMINATION

  const balanceBN = new BN(balance, 10);
  if (fracDigits !== NEAR_NOMINATION_EXP) {
    const roundingExp = NEAR_NOMINATION_EXP - fracDigits - 1;
    if (roundingExp > 0) {
      balanceBN.iadd(ROUNDING_OFFSETS[roundingExp]);
    }
  }

  balance = balanceBN.toString();
  const wholeStr = balance.substring(0, balance.length - NEAR_NOMINATION_EXP) || '0';
  const fractionStr = balance
    .substring(balance.length - NEAR_NOMINATION_EXP)
    .padStart(NEAR_NOMINATION_EXP, '0')
    .substring(0, fracDigits);

  return trimTrailingZeroes(`${formatWithCommas(wholeStr)}.${fractionStr}`);
}

function formatNear(amount) {
  return Number(formatNearAmount(amount, 3));
}
/**
 * End
 */

State.init({
  basic: false,
  loading: false
})

const onBuy = () => {
  try {
    State.update({ loading: true })
    Near.call(
      CONTRACT_ADDRESS,
      "buy",
      {
        content_id: content.id
      },
      '50000000000000',
      content.cost
    );
  } catch (err) {
    console.error(err);
    State.update({ loading: false });
  }
};

const Wrapper = styled.div`
  .content-blur-wrapper {
    overflow: hidden;
    width: 100%;
    border-radius: 16px;
    border: 1px solid rgb(207, 217, 222);
    aspect-ratio: 1.777;
    cursor: default;
    position: relative;
    box-sizing: border-box;
  }

  .content-wrapper-basic {
    overflow: hidden;
    width: 100%;
    border-radius: 4px;
    aspect-ratio: 1.777;
    position: relative;
    box-sizing: border-box;
  }

  .unlock-content-overlay {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    background-color: rgba(255, 255, 255, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .unlock-content-overlay > .text {
    color: #000;
    text-align: center;
    font-family: Helvetica;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .unlock-content-overlay > .price {
    color: #000;
    text-align: center;
    font-family: Helvetica;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .unlock-content-overlay > .main-button {
    display: flex;
    padding: 10px 40px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 20px;
    background: #1d9bf0;
    color: #fff;
    text-align: center;
    font-family: Helvetica;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border: none;
    cursor: pointer;
    transition-duration: 0.2s;
  }

  .unlock-content-overlay > .main-button:hover {
    background-color: rgb(26, 140, 216);
  }

  .unlock-content-overlay > .main-button:disabled {
    background: #99cdf8;
    cursor: default;
  }

  .content-image {
    width: 100%;
  }

  .blurred {
    filter: blur(1em);
  }
`;

const Loader = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20px"
    height="20px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      stroke="#ffffff"
      strokeWidth="10"
      r="35"
      strokeDasharray="164.93361431346415 56.97787143782138"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
      ></animateTransform>
    </circle>
  </svg>
);

return (
  <Wrapper>
    <div className={state.basic ? "content-wrapper-basic" : "content-blur-wrapper"}>
    {is_purchased ? (
        <>
          <img className="content-image" src={content.link} />
          <Widget src="bos.dapplets.near/widget/Paywall.Badge"  props={{ accountId: content.author }}/>
        </>
      ) : (
        <>
          <img className="content-image blurred" src={content.link} />
          {userAccountId ? (
            <div className="unlock-content-overlay">
              <div className="text">Unlock this content</div>
              <div className="price">{formatNear(content.cost)} $NEAR</div>
              <button
                className="main-button"
                onClick={() => onBuy(contentId, content.cost)}
                disabled={state.loading}
              >
                {state.loading ? <Loader /> : "Buy"}
              </button>
            </div>
          ) : (
            <div className="unlock-content-overlay">
              <div className="text">Login and unlock this content</div>
              <div className="price">{formatNear(content.cost)} $NEAR</div>
              <button
                className="main-button"
                onClick={() => onBuy(contentId, content.cost)}
                disabled={true}
              >
                {state.loading ? <Loader /> : "Buy"}
              </button>
            </div>
          )}
          <Widget src="bos.dapplets.near/widget/Paywall.Badge"  props={{ accountId: content.author }}/>
        </>
      )}
    </div>
  </Wrapper>
);