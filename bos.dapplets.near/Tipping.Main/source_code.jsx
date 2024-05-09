let accountId;
let itemGlobalId;

if (props.accountGId && props.itemGId) {
  accountId = props.accountGId;
  itemGlobalId = props.itemGId;
} else if ((props.accountId || props.notifyAccountId) && (props.blockHeight || props.item?.blockHeight)) {
  accountId = props.accountId || props.notifyAccountId;
  const blockHeight = props.blockHeight || props.item?.blockHeight;
  itemGlobalId = `bos/${blockHeight}/${accountId}/post/main`;
} else if (props.context && props.context.id && props.context.authorUsername) {
  accountId = props.context.authorUsername + '/twitter';
  itemGlobalId = 'tweet/' + props.context.id;
} else if (props.context?.parsed?.id && props.context?.parsed?.authorUsername) {
  accountId = props.context.parsed.authorUsername + '/twitter';
  itemGlobalId = 'tweet/' + props.context.parsed.id;
} else {
  console.error('The context should provide accountGId with itemGId or accountId with blockHeight props.');
  return <></>;
}

const { nearAccountId } = props
const userAccountId = nearAccountId || context.accountId

const TIPPING_CONTRACT_NAME = "v2.tipping.near";
const MAX_AMOUNT_PER_ITEM = '10000000000000000000000000'; // 10 NEAR
const MAX_AMOUNT_PER_TIP = '1000000000000000000000000'; // 1 NEAR
const STEP_YOCTO = '50000000000000000000000'; // 0.05 NEAR
const LIMIT_PER_ITEM = 10;
const STEP = 0.05
const DEBOUNCE_DELAY = 2000; // in ms

State.update({
  totalTipsByItemId: Near.view(TIPPING_CONTRACT_NAME, "getTotalTipsByItemId", {
    itemId: itemGlobalId
  }, "final", true) || '0'
})

/**
 * From near-api-js/blob/master/packages/utils/src/format.ts
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

/**
 * Convert account balance value from internal indivisible units to NEAR. 1 NEAR is defined by {@link NEAR_NOMINATION}.
 * Effectively this divides given amount by {@link NEAR_NOMINATION}.
 *
 * @param {string} balance decimal string representing balance in smallest non-divisible NEAR units (as specified by {@link NEAR_NOMINATION})
 * @param {number} fracDigits number of fractional digits to preserve in formatted string. Balance is rounded to match given number of digits.
 * @returns {string} Value in Ⓝ
 */
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

/**
 * Converts a yocto number to a number with two digits after the dot
 * 
 * @param {string} amount decimal string representing balance in smallest non-divisible NEAR units
 * @returns {number} examples: 0.3, 0.05, 0
 */

function formatNear(amount) {
  return Number(formatNearAmount(amount, 2))
}

/**
 * End
 */

// Sum of 2 or 3 values!!!
const sum = (value1, value2, value3) => {
  let _sum = Big('0');
  const values = value3 ? [value1, value2, value3] : [value1, value2]

  for (const v of values) {
    const _a = Big(_sum);
    const _b = Big(v);
    _sum = _a.plus(_b);
  }

  return _sum.toFixed();
}

const lte = (a, b) => {
  const _a = Big(a);
  const _b = Big(b);
  return _a.lte(_b);
}

const gte = (a, b) => {
  const _a = Big(a);
  const _b = Big(b);
  return _a.gte(_b);
}

const equals = (a, b) => {
  const _a = Big(a);
  const _b = Big(b);
  return _a.eq(_b);
}

function debounce(func, timeout, id) {
  return () => {
    state[`debounceTimer#${id}`] && clearTimeout(state[`debounceTimer#${id}`]);
    const timer = setTimeout(func, timeout);
    State.update({ [`debounceTimer#${id}`]: timer })
  };
}

function calculateFee(num) {
  Big.PE = 40
  const _num = Big(num)
  const a = _num.times(3)
  const b = a.div(100)
  return b.toString()
}

useEffect(() => {
  if (!userAccountId) {
    State.update({
      accountId,
      disabled: true,
      loading: false,
      amount: '0',
      tooltip: 'You must be Logged In to start using this',
    })
  } else if (equals(state.totalTipsByItemId, '0')) {
    State.update({
      accountId,
      disabled: false,
      loading: false,
      amount: '0',
      tooltip: 'Send donation',
    })
  } else if (formatNear(state.totalTipsByItemId) === LIMIT_PER_ITEM) {
    State.update({
      accountId,
      disabled: true,
      loading: false,
      amount: '0',
      tooltip: `The ${LIMIT_PER_ITEM} NEAR limit for this content has been exceeded`,
    })
  } else {
    State.update({
      accountId,
      disabled: false,
      loading: false,
      amount: '0',
      tooltip: 'Send donation',
    })
  }
}, [accountId, state.totalTipsByItemId, userAccountId]);

const onDebounceDonate = () => {
  State.update({
    loading: true,
    disabled: true,
  })
  const fee = calculateFee(state.amount);
  const total = sum(state.amount, fee);
  Near.call(
    TIPPING_CONTRACT_NAME,
    "sendTips",
    {
      accountGId: accountId,
      itemId: itemGlobalId,
    },
    '50000000000000',
    total,
  ).catch((e) => {
    console.error(e);
    State.update({
      disabled: false,
      loading: false,
      amount: '0',
    })
  })
};

const debouncedDonate = debounce(onDebounceDonate, DEBOUNCE_DELAY, 'donate')

const onClick = () => {
  const result = formatNear(sum(state.totalTipsByItemId, state.amount, STEP_YOCTO));
  if (result > LIMIT_PER_ITEM) {
    if (state.amount === '0') {
      State.update({
        disabled: true,
        exceeded: true,
        tooltip: `The ${LIMIT_PER_ITEM} NEAR limit for this content has been exceeded`,
      })
      setTimeout(() => State.update({
        disabled: false,
        exceeded: false,
        tooltip: 'Send donation',
      }), 3000)
      return 
    }
    State.update({
      disabled: true,
      tooltip: `The ${LIMIT_PER_ITEM} NEAR limit for this content has been exceeded`,
    })
    return
  }
  const expectedItemAmount = sum(state.totalTipsByItemId, state.amount, STEP_YOCTO)
  const expectedExpenses = sum(state.amount, STEP_YOCTO)
  if (lte(expectedItemAmount, MAX_AMOUNT_PER_ITEM) && lte(expectedExpenses, MAX_AMOUNT_PER_TIP)) {
    State.update({
      disabled: result === LIMIT_PER_ITEM,
      amount: expectedExpenses,
    })
  }

  debouncedDonate();
};

const TippingButton = styled.button`
  display: flex;
  position: relative;
  width: 85px;
  padding: 0;
  align-items: center;
  flex-shrink: 0;
  overflow: hidden;

  border: 1px solid #C1C6CE;
  border-radius: 9em;
  background: none;

  color: #5B7083;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  user-select: none;
  transition: color .3s ease-out;

  .icon {
    display: flex;
    padding: 3px 3px 3px 6px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex: 1 0 0;
    align-self: stretch;
    border-right: 1px solid #C1C6CE;
    z-index: 2;
  }

  .cost {
    display: flex;
    width: 51px;
    justify-content: center;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
    white-space: nowrap;
    flex-grow: 1;
    z-index: 2;
  }

  &:not([disabled]) {
    cursor: pointer;
  }

  &:not([disabled]):hover {
    opacity: 1 !important;
    color: #3D7FFF;
  }

  .progress-bar { 
    display: block;
    position: absolute;
    top:0;
    left: 0;
    width: 0;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #3D7FFF;
    z-index: 1;
  }

  &.loading {
    @keyframes progressAnimationStrike {
        from { width: 0 }
        to   { width: 100% }
    }
  
    @keyframes waitingAnimation {
      0% {
        background: none;
        border-color: #C1C6CE;
        color: #5B7083;
      }
      98% {
        background: none;
        border-color: #3D7FFF;
        color: white;
      }
      100% {
        background: rgb(61, 127, 255);
        border-color: #3D7FFF;
        color: white;
      }
    }

    animation: waitingAnimation 10s linear forwards;

    .progress-bar {
      animation: progressAnimationStrike 10s linear forwards;
    }
  }
`;

const createLabel = () => {
  if (state.totalTipsByItemId === '0' && state.amount === '0') return state.isHovered ? '+ ' + STEP : 'Tip'
  if (state.amount === '0') {
    return state.isHovered ? '+ ' + STEP : formatNear(state.totalTipsByItemId)
  } else {
    return '+ ' + (state.isHovered ? formatNear(sum(state.amount, STEP_YOCTO)) : formatNear(state.amount))
  }
}

return (
    <TippingButton
      disabled={state.disabled}
      title={state.tooltip}
      onMouseEnter={() => State.update({ isHovered: true })}
      onMouseLeave={() => State.update({ isHovered: false })}
      onClick={onClick}
      className={state.loading ? "loading " : ""}
      style={{ height: props.context?.parent?.parsed?.websiteName === 'YouTube' ? 36 : 18 }}
    >
      <div className="progress-bar"/>
      <div className="icon">
        <Widget src="bos.dapplets.near/widget/Tipping.TipIcon" />
      </div>
      <div className="cost">
        {createLabel()}
        <Widget src="bos.dapplets.near/widget/Tipping.NearIcon" />
      </div>
    </TippingButton>
);
