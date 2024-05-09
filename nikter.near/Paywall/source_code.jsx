const { contentId, nearAccountId } = props;
const userAccountId = context.accountId || nearAccountId

const CONTRACT_ADDRESS = "app.paywall.near";

const price = "0.05";

/**
 * From near-api-js/packages/near-api-js/src/utils/format.ts
 */
const NEAR_NOMINATION_EXP = 24;

function cleanupAmount(amount) {
  return amount.replace(/,/g, '').trim();
}

function trimLeadingZeroes(value) {
  value = value.replace(/^0+/, '');
  if (value === '') {
      return '0';
  }
  return value;
}

function parseNearAmount(amt) {
  if (!amt) { return null; }
  amt = cleanupAmount(amt);
  const split = amt.split('.');
  const wholePart = split[0];
  const fracPart = split[1] || '';
  if (split.length > 2 || fracPart.length > NEAR_NOMINATION_EXP) {
      throw new Error(`Cannot parse '${amt}' as NEAR amount`);
  }
  return trimLeadingZeroes(wholePart + fracPart.padEnd(NEAR_NOMINATION_EXP, '0'));
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
        content_id: contentId
      },
      '50000000000000',
      parseNearAmount(price)
    );
    setTimeout(() => State.update({ loading: false }), 3000)
  } catch (err) {
    console.error(err);
    State.update({ loading: false });
  }
};

function getContentById(contentId) {
  const S3_STORAGE_URL =
    "https://miscellaneous.s3-website.fr-par.scw.cloud/web3hackfest-2023";

  const contents = [
    {
      id: "1694994895662977529",
      blurred: S3_STORAGE_URL + "/MrConCreator/0001_blurred.png",
      original: S3_STORAGE_URL + "/MrConCreator/0001.png",
    },
    {
      id: "1694995203663290832",
      blurred: S3_STORAGE_URL + "/MrConCreator/0002_blurred.png",
      original: S3_STORAGE_URL + "/MrConCreator/0002.png",
    },
    {
      id: "1694995269547438149",
      blurred: S3_STORAGE_URL + "/MrConCreator/0003_blurred.png",
      original: S3_STORAGE_URL + "/MrConCreator/0003.png",
    },
    {
      id: "1694995303642939408",
      blurred: S3_STORAGE_URL + "/MrConCreator/0004_blurred.png",
      original: S3_STORAGE_URL + "/MrConCreator/0004.png",
    },
  ];

  return contents.find((x) => x.id === contentId);
}

const content = getContentById(contentId);

if (!content) {
  return <></>;
}

const isPurchased = userAccountId
  ? Near.view(
      CONTRACT_ADDRESS,
      "purchased",
      {
        account_id: userAccountId,
        content_id: contentId,
      },
      "final",
      true
    )
  : false;

const Wrapper = styled.div`
  .content-blur-wrapper {
    overflow: hidden;
    width: 100%;
    margin-top: 12px;
    border-radius: 16px;
    border: 1px solid rgb(207, 217, 222);
    aspect-ratio: 1.777;
    cursor: default;
    position: relative;
  }

  .content-wrapper-basic {
    overflow: hidden;
    width: 100%;
    border-radius: 4px;
    aspect-ratio: 1.777;
    position: relative;
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
      {isPurchased === null ? null : isPurchased ? (
        <img className="content-image" src={content.original} />
      ) : (
        <>
          <img className="content-image" src={content.blurred} />
          {userAccountId ? (
            <div className="unlock-content-overlay">
              <div className="text">Unlock this Tweet</div>
              <div className="price">{price} $NEAR</div>
              <button
                className="main-button"
                onClick={() => onBuy({ contentId, price })}
                disabled={state.loading}
              >
                {state.loading ? <Loader /> : "Buy"}
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  </Wrapper>
);