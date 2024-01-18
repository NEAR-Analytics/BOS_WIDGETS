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
} else {
  console.error('The context should provide accountGId with itemGId or accountId with blockHeight props.');
  return <></>;
}

const MAX_AMOUNT_PER_ITEM = '10000000000000000000000000'; // 10 NEAR
const MAX_AMOUNT_PER_TIP = '1000000000000000000000000'; // 1 NEAR
const TIPPING_CONTRACT_NAME = "v2.tipping.near";

const STEP = 0.05
const DELAY = 2;

State.update({
  totalTipsByItemId: Near.view(TIPPING_CONTRACT_NAME, "getTotalTipsByItemId", {
    itemId: itemGlobalId
  }, "final", true) || '0'
})

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

function formatNear(amount) {
  return Number(formatNearAmount(amount, 4)).toFixed(2);
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

function getMilliseconds(seconds) {
  return seconds * 1000;
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

const limitPerItem = Number(formatNear(MAX_AMOUNT_PER_ITEM));

useEffect(() => {
  if (equals(state.totalTipsByItemId, '0')) {
    State.update({
      accountId,
      disabled: false,
      loading: false,
      label: 'Tip',
      tooltip: 'Send donation',
      donationsAmount: state.totalTipsByItemId,
      amount: state.amount || '0',
    })
  } else if (Number(formatNear(state.totalTipsByItemId)) === limitPerItem) {
    State.update({
      accountId,
      disabled: true,
      loading: false,
      label: formatNear(state.totalTipsByItemId) + ' NEAR',
      tooltip: `The ${limitPerItem} NEAR limit for this content has been exceeded`,
      donationsAmount: state.totalTipsByItemId,
      amount: state.amount || '0',
    })
  } else {
    State.update({
      accountId,
      disabled: false,
      loading: false,
      label: formatNear(state.totalTipsByItemId) + ' NEAR',
      tooltip: 'Send donation',
      donationsAmount: state.totalTipsByItemId,
      amount: state.amount || '0',
    })
  }
}, [accountId, state.totalTipsByItemId]);

const onDebounceDonate = () => {
  try {
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
    );
    setTimeout(() => State.update({
      disabled: false,
      loading: false,
      label: equals(state.donationsAmount, '0') ? 'Tip' : formatNear(state.donationsAmount) + ' NEAR',
      donationsAmount: state.totalTipsByItemId,
      amount: '0',
    }), 3000)
  } catch (e) {
    console.error(e);
    State.update({
      disabled: false,
      loading: false,
      label: equals(state.donationsAmount, '0') ? 'Tip' : formatNear(state.donationsAmount) + ' NEAR',
      donationsAmount: state.totalTipsByItemId,
      amount: '0',
    });
  }
};

const stepYocto = parseNearAmount(STEP.toString());
const debounceDelay = getMilliseconds(DELAY);
const debouncedDonate = debounce(onDebounceDonate, debounceDelay, 'donate')

const onClick = () => {
  const donationsAmountStr = formatNear(state.donationsAmount)
  const donationsAmount = Number(donationsAmountStr);
  const donation = Number(formatNear(state.amount));
  const result = Number((donationsAmount + donation + STEP).toFixed(2));
  if (result > limitPerItem) {
    if (donation === 0) {
      State.update({
        disabled: true,
        label: donationsAmountStr + ' + ' + STEP + ' NEAR',
        tooltip: `The ${limitPerItem} NEAR limit for this content has been exceeded`,
      })
      setTimeout(() => State.update({
        disabled: false,
        label: donationsAmountStr + ' NEAR',
        tooltip: 'Send donation',
      }), 3000)
      return 
    }
    State.update({
      disabled: true,
      tooltip: `The ${limitPerItem} NEAR limit for this content has been exceeded`,
    })
    return
  }
  const expectedItemAmount = sum(state.donationsAmount, state.amount, stepYocto)
  const expectedExpenses = sum(state.amount, stepYocto)
  if (lte(expectedItemAmount, MAX_AMOUNT_PER_ITEM) && lte(expectedExpenses, MAX_AMOUNT_PER_TIP)) {
    const newLabel = formatNear(state.donationsAmount) + ' + ' + formatNear(expectedExpenses) + ' NEAR'
    State.update({
      disabled: result === limitPerItem,
      label: newLabel,
      amount: expectedExpenses,
    })
  }
  debouncedDonate();
};

// styles
const LikeButton = styled.button`
  line-height: 20px;
  min-height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: left;
  background: inherit;
  color: inherit;
  font-size: 16px;
  user-select: none;
  border: none;
  margin: 0;
  padding: 0;
  .icon {
    position: relative;
    &:before {
      margin: -8px;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      border-radius: 50%;
    }
  }

  .count {
    margin-left: 8px;
  }

  &:not([disabled]) {
    cursor: pointer;
  }

  &:not([disabled]):hover {
    opacity: 1 !important;
    color: green;

    .icon:before {
      background: rgba(0, 255, 0, 0.1);
    }
  }

  .loading {
    @keyframes scaleAnimation {
     0%, 100% {
        transform: scale(1) rotate(0deg);
      }
      25% {
        transform: scale(1.2) rotate(-15deg);
      }
      50% {
        transform: scale(1) rotate(0deg);
      }
      75% {
        transform: scale(1.2) rotate(15deg);
      }
    }

    transform-origin: center;
    animation: scaleAnimation 1s ease-in-out infinite;
  }
`;

return (
  <div className="d-inline-flex align-items-center">
    <LikeButton
      disabled={state.disabled}
      title={state.tooltip}
      onClick={onClick}
    >
      <span className={`icon ${state.loading ? "loading " : ""}`}>
        <Widget src="bos.dapplets.near/widget/Tipping.TipIcon" />
      </span>
      <span className={`count`}>
        {state.label}
      </span>
    </LikeButton>
  </div>
);
