const accountId = props.accountId || props.notifyAccountId
const blockHeight = props.blockHeight || props.item?.blockHeight
const itemGlobalId = `bos/${blockHeight}/${accountId}/post/main`;

// const link =
//   props.link ||
//   props.fullPostLink ||
//   `/mob.near/widget/MainPage.N.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}`;
// console.log('link', link)

// const content = JSON.parse(
//   Social.get(`${accountId}/post/main`, blockHeight) ?? "null"
// );
// console.log('content', content)

const MAX_AMOUNT_PER_ITEM = '10000000000000000000000000'; // 10 NEAR
const MAX_AMOUNT_PER_TIP = '1000000000000000000000000'; // 1 NEAR
const TIPPING_CONTRACT_NAME = "v2.tipping.near";

const STEP = 0.05
const DELAY = 2;
// if (STEP <= 0) throw new Error('The tip step must be more than zero. Change the step parameter in the dapplet settings.');
// if (DELAY <= 0) throw new Error('A delay must be greater than zero. Change the delay parameter in the dapplet settings.');

let totalTipsByItemId = Near.view(TIPPING_CONTRACT_NAME, "getTotalTipsByItemId", {
  // itemId: "tweet/1716756421742854174"
  // itemId: "tweet/1719653676875202681"
  itemId: itemGlobalId
});

totalTipsByItemId = totalTipsByItemId === null ? '0' : totalTipsByItemId

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

function debounce(func, timeout) {
  return () => {
    const timer = setTimeout(func, timeout);
    clearTimeout(timer - 1); // ToDo: dangerous!!!!!!!
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
  if (accountId && blockHeight) {
    if (equals(totalTipsByItemId, '0')) {
      State.update({
        accountId,
        blockHeight,
        totalTipsByItemId,
        hidden: false,
        disabled: false,
        loading: false,
        label: 'Tip',
        tooltip: 'Send donation',
        donationsAmount: totalTipsByItemId,
        amount: state.amount || '0',
      })
    } else {
      const limit = Number(formatNear(MAX_AMOUNT_PER_ITEM));
      if (Number(formatNear(totalTipsByItemId)) === limit) {
        State.update({
          accountId,
          blockHeight,
          totalTipsByItemId,
          hidden: false,
          disabled: true,
          loading: false,
          label: formatNear(totalTipsByItemId) + ' NEAR',
          tooltip: `The ${limit} NEAR limit for this content has been exceeded`,
          donationsAmount: totalTipsByItemId,
          amount: state.amount || '0',
        })
      } else {
        State.update({
          accountId,
          blockHeight,
          totalTipsByItemId,
          hidden: false,
          disabled: false,
          loading: false,
          label: formatNear(totalTipsByItemId) + ' NEAR',
          tooltip: 'Send donation',
          donationsAmount: totalTipsByItemId,
          amount: state.amount || '0',
        })
      }
    }
  }
}, [accountId, blockHeight, totalTipsByItemId]);

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
    // ToDo: Wait?
    // ToDo: Done! to label
    // State.update({
    //   label: 'Done!',
    //   tooltip: 'The transfer was successful',
    // })
    // setTimeout(() => State.update({
    //   loading: false,
    //   disabled: false,
    //   label: state.donationsAmount + ' NEAR',
    //   tooltip: 'Send donation',
    // }), 3000)
  } catch (e) {
    console.error(e);
    State.update({
      loading: true,
      disabled: true,
    })
  // } finally {
  //   State.update({
  //     disabled: false,
  //     loading: false,
  //     label: equals(state.donationsAmount, '0') ? 'Tip' : formatNear(state.donationsAmount) + ' NEAR',
  //     donationsAmount: totalTipsByItemId,
  //     amount: '0',
  //   })
  }
};

const stepYocto = parseNearAmount(STEP.toString());
const debounceDelay = getMilliseconds(DELAY);
const debouncedDonate = debounce(onDebounceDonate, debounceDelay)

const onClick = () => {
  const donationsAmount = Number(formatNear(state.donationsAmount));
  const donation = Number(formatNear(state.amount));
  const result = Number((donationsAmount + donation + STEP).toFixed(2));
  const limit = Number(formatNear(MAX_AMOUNT_PER_ITEM));
  if (result > limit) {
    if (donation === 0) {
      State.update({
        disabled: true,
        label: donationsAmount + ' + ' + STEP + ' NEAR',
        tooltip: `The ${MAX_AMOUNT_PER_ITEM} NEAR limit for this content has been exceeded`,
      })
      setTimeout(() => State.update({
        disabled: false,
        label: donationsAmount + ' NEAR',
        tooltip: 'Send donation',
      }), 3000)
      return 
    }
    State.update({
      disabled: true,
      tooltip: `The ${MAX_AMOUNT_PER_ITEM} NEAR limit for this content has been exceeded`,
    })
    return
  }
  const expectedItemAmount = sum(state.donationsAmount, state.amount, stepYocto)
  const expectedExpenses = sum(state.amount, stepYocto)
  if (lte(expectedItemAmount, MAX_AMOUNT_PER_ITEM) && lte(expectedExpenses, MAX_AMOUNT_PER_TIP)) {
    const newLabel = formatNear(state.donationsAmount) + ' + ' + formatNear(expectedExpenses) + ' NEAR'
    State.update({
      disabled: result === limit,
      label: newLabel,
      amount: expectedExpenses,
    })
  }
  debouncedDonate();
};

// image
const icon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.35231 19C6.18917 18.7603 5.12315 18.2531 4.00627 17.8797L3.84671 17.8312C3.83052 17.9163 3.8205 17.991 3.80355 18.0642C3.76769 18.2289 3.67504 18.377 3.54084 18.4839C3.40664 18.5909 3.23887 18.6504 3.06512 18.6527C2.63604 18.6597 2.20696 18.6597 1.77788 18.6527C1.67509 18.6527 1.57332 18.6328 1.47858 18.5942C1.38383 18.5555 1.29802 18.4989 1.2262 18.4277C1.15438 18.3564 1.09799 18.2719 1.06036 18.1792C1.02273 18.0865 1.00462 17.9875 1.00709 17.8879C1.00246 17.2083 1.00709 16.5294 1.00709 15.8497C1.00709 14.5263 1.0225 13.2028 1.00015 11.8794C0.990899 11.2924 1.41561 10.9585 1.91586 10.9884C2.25886 11.0078 2.60495 10.9884 2.9495 10.9921C3.49985 10.9921 3.81125 11.2841 3.83438 11.8204C3.83438 11.8436 3.839 11.866 3.84286 11.907L4.62445 11.9683C4.62445 11.6404 4.60287 11.3185 4.62907 11.0011C4.72003 9.87556 5.13395 8.85236 5.73517 7.89637C6.44353 6.76264 7.38468 5.82682 8.44915 5.00153C8.51341 4.95674 8.56616 4.89822 8.60331 4.8305C8.43451 4.84469 8.26416 4.84992 8.0969 4.87456C7.43247 4.97166 6.83202 5.18078 6.44508 5.76632C6.42751 5.79556 6.40394 5.82099 6.37582 5.84105C6.3477 5.8611 6.31563 5.87535 6.2816 5.88291C6.24757 5.89047 6.2123 5.89119 6.17797 5.885C6.14364 5.87882 6.11099 5.86588 6.08203 5.84698C6.05147 5.82859 6.02502 5.80445 6.00426 5.77599C5.9835 5.74752 5.96883 5.71531 5.96115 5.68126C5.95346 5.64721 5.95289 5.61201 5.95949 5.57774C5.96609 5.54347 5.97971 5.51084 5.99955 5.48176C6.2028 5.15071 6.49863 4.88218 6.85283 4.70727C7.32841 4.45781 7.84562 4.35101 8.38055 4.31367C8.44684 4.30919 8.51313 4.30769 8.57942 4.30396C8.58944 4.30396 8.59869 4.29425 8.63415 4.27483C8.3713 3.96414 8.05759 3.76398 7.63982 3.75203C7.38699 3.74456 7.13263 3.76696 6.87981 3.75576C6.4786 3.73059 6.09104 3.60473 5.75521 3.39055C5.58332 3.28673 5.53476 3.14632 5.61647 3.0089C5.69817 2.87147 5.86158 2.83787 6.03964 2.94392C6.42141 3.17653 6.87321 3.27708 7.32148 3.22922C7.90882 3.17171 8.42218 3.32781 8.84766 3.72813C8.93168 3.8073 8.98794 3.7946 9.055 3.71244C8.90084 3.44805 8.74668 3.18964 8.60254 2.91778C8.4268 2.58319 8.26185 2.23963 8.25337 1.85723C8.2488 1.6947 8.2798 1.53307 8.34433 1.38298C8.45918 1.13427 8.69812 1.04614 8.94709 1.17012C9.2161 1.30455 9.43655 1.28065 9.68937 1.12829C9.99769 0.943819 10.3314 0.963985 10.6336 1.15219C10.8779 1.3053 11.0922 1.30157 11.3366 1.15219C11.4825 1.05462 11.6556 1.00237 11.833 1.00237C12.0103 1.00237 12.1834 1.05462 12.3294 1.15219C12.4218 1.21701 12.5314 1.25513 12.6453 1.26213C12.7592 1.26914 12.8728 1.24474 12.973 1.19178C13.3168 1.03195 13.632 1.18058 13.6867 1.55102C13.7279 1.79207 13.7065 2.03925 13.6243 2.27025C13.4085 2.79305 13.1341 3.29569 12.8689 3.83866C12.9827 3.94662 13.0685 4.07921 13.1192 4.22554C13.1698 4.37187 13.1839 4.52775 13.1603 4.68038C13.1557 4.7222 13.2081 4.78121 13.2489 4.81481C13.5256 5.03887 13.8124 5.25696 14.0852 5.48699C14.2664 5.64085 14.2217 5.89553 14.0028 5.94034C13.899 5.94981 13.7954 5.9207 13.7129 5.85893C13.4308 5.64906 13.1626 5.42202 12.8936 5.20617C12.2831 5.54824 11.6241 5.59379 10.9666 5.5796C10.4324 5.56541 9.90057 5.48027 9.36795 5.42575C9.33143 5.42465 9.29583 5.41435 9.26466 5.39587C9.02494 5.2241 8.85845 5.35704 8.67423 5.50492C7.54655 6.40638 6.56609 7.43108 5.88856 8.70224C5.38523 9.64852 5.1008 10.6486 5.14242 11.7226C5.14336 11.8161 5.15291 11.9093 5.17094 12.0011C5.17716 12.0243 5.18881 12.0458 5.20498 12.064C5.22116 12.0821 5.24142 12.0964 5.26421 12.1057C5.90475 12.261 6.48207 12.5538 7.03705 12.8884C7.61207 13.2372 8.25337 13.3134 8.9047 13.3798C9.68552 13.4598 10.4687 13.5292 11.2433 13.6472C12.1182 13.7794 12.6762 14.4568 12.6739 15.3105C12.6739 15.3628 12.6739 15.4151 12.6739 15.492C12.7387 15.4711 12.7872 15.4591 12.8327 15.4397C13.8604 15.002 14.8882 14.5624 15.9159 14.1207C16.0067 14.0795 16.084 14.0149 16.1394 13.934C16.7314 13.0333 16.9164 12.0385 16.8023 10.9914C16.6273 9.37815 15.8296 8.04799 14.745 6.85599C14.7032 6.81389 14.6636 6.76977 14.6263 6.7238C14.6043 6.6976 14.5878 6.66742 14.5778 6.635C14.5679 6.60258 14.5647 6.56857 14.5684 6.53494C14.5721 6.50131 14.5827 6.46874 14.5995 6.4391C14.6164 6.40947 14.6391 6.38337 14.6664 6.36232C14.6909 6.34057 14.7195 6.32373 14.7507 6.31274C14.7819 6.30176 14.8151 6.29686 14.8482 6.29832C14.8814 6.29977 14.9139 6.30756 14.944 6.32124C14.974 6.33491 15.001 6.3542 15.0233 6.378C15.1543 6.50721 15.2769 6.64463 15.3964 6.78429C16.2759 7.81198 16.9434 8.9502 17.2316 10.2654C17.4791 11.3984 17.4213 12.5105 16.9434 13.586C16.9326 13.6114 16.9264 13.639 16.9102 13.692C17.086 13.6174 17.2363 13.5516 17.392 13.4964C18.1258 13.2365 18.8018 13.571 18.9706 14.2753C19.0237 14.4964 19.0046 14.7279 18.9159 14.938C18.8273 15.1481 18.6734 15.3263 18.4757 15.4479L13.5642 18.4645C13.1392 18.7358 12.6555 18.9088 12.1505 18.9701C12.1216 18.9763 12.0934 18.9856 12.0665 18.9978L7.35231 19ZM3.82821 12.45C3.82821 12.6845 3.82821 12.8981 3.82821 13.1162C3.82821 13.3343 3.71953 13.4545 3.54379 13.4486C3.36804 13.4426 3.28557 13.3291 3.2848 13.1147C3.2848 12.6927 3.2848 12.2715 3.2848 11.8495C3.2848 11.6008 3.20309 11.5202 2.95181 11.5194C2.59211 11.5194 2.22957 11.5194 1.86421 11.5194C1.63297 11.5194 1.54665 11.5986 1.54665 11.8241C1.54665 13.8272 1.54665 15.8298 1.54665 17.8319C1.54665 18.0522 1.62373 18.1262 1.85496 18.1307C2.21185 18.1307 2.56795 18.1307 2.92483 18.1307C3.21851 18.1307 3.28788 18.0634 3.28865 17.7811V14.8683C3.28865 14.719 3.2848 14.5756 3.28865 14.4292C3.28677 14.3612 3.31254 14.2952 3.36042 14.2455C3.40829 14.1957 3.47443 14.1662 3.54456 14.1633C3.61485 14.1621 3.683 14.1868 3.73522 14.2324C3.78745 14.278 3.81986 14.3412 3.8259 14.409C3.82975 14.4617 3.82975 14.5147 3.8259 14.5674C3.8259 15.4106 3.8259 16.2538 3.8259 17.097C3.81782 17.1468 3.82967 17.1978 3.85904 17.2394C3.8884 17.281 3.93307 17.3102 3.98391 17.3211C4.85646 17.6295 5.72669 17.9462 6.59615 18.2621C6.9501 18.3986 7.32674 18.4715 7.70765 18.4772C9.0437 18.4742 10.3798 18.4742 11.7158 18.4772C12.2387 18.483 12.7521 18.3422 13.1942 18.0716C14.8581 17.0529 16.521 16.0322 18.1828 15.0095C18.3021 14.9372 18.3909 14.826 18.4333 14.696C18.4756 14.566 18.4688 14.4256 18.4141 14.3C18.3675 14.171 18.2721 14.0639 18.1472 14.0004C18.0223 13.9368 17.8772 13.9217 17.7411 13.9579C17.6186 13.9884 17.4991 14.0296 17.3843 14.0812C15.799 14.7548 14.2135 15.4292 12.6277 16.1044C12.5121 16.1522 12.388 16.1776 12.2623 16.1791C11.3258 16.1858 10.3893 16.1836 9.45274 16.1791C9.37566 16.1791 9.27314 16.1896 9.22612 16.1477C9.1445 16.0799 9.08793 15.9881 9.06502 15.8863C9.04729 15.7653 9.1421 15.6839 9.27237 15.6623C9.33217 15.6549 9.3925 15.6524 9.45274 15.6548H11.9193C11.9833 15.6548 12.048 15.6496 12.1343 15.6458V15.2836C12.1401 15.0083 12.0403 14.7408 11.8542 14.5327C11.6681 14.3247 11.4089 14.1909 11.1269 14.1573C10.3661 14.0677 9.60458 13.9729 8.84072 13.9079C8.0599 13.8422 7.31531 13.6838 6.64086 13.2775C6.45201 13.1633 6.25546 13.0647 6.05428 12.9646C5.36847 12.6151 4.60301 12.4381 3.82821 12.45ZM8.76518 1.68023C8.7991 1.85275 8.79833 2.00586 8.85999 2.12835C9.08429 2.58617 9.33172 3.0328 9.56527 3.48689C9.62925 3.61087 9.73177 3.6512 9.8628 3.67883C10.6461 3.83735 11.457 3.81535 12.2299 3.6146C12.275 3.60295 12.3144 3.57657 12.3417 3.53992C12.65 3.07985 12.9545 2.61381 13.121 2.08129C13.1565 1.93895 13.184 1.79484 13.2034 1.64961C12.7533 1.88561 12.3833 1.81242 12.0249 1.58313C11.9602 1.5432 11.8842 1.52376 11.8076 1.52751C11.7309 1.53125 11.6574 1.558 11.5971 1.60405C11.1901 1.87142 10.7854 1.8662 10.3792 1.60853C10.1996 1.495 10.0293 1.5189 9.85586 1.62795C9.59533 1.79226 9.3163 1.85649 9.01184 1.75342C8.94555 1.73699 8.87772 1.71682 8.76518 1.68023ZM10.8941 5.10833C11.3736 5.03365 11.8569 4.97315 12.3348 4.88427C12.566 4.84245 12.6647 4.6408 12.6053 4.40927C12.5529 4.20388 12.4003 4.12098 12.1644 4.16355C11.9285 4.20612 11.715 4.24795 11.4884 4.27782C10.8462 4.35054 10.1958 4.31031 9.56836 4.15907C9.49286 4.1348 9.4106 4.13975 9.33878 4.17288C9.26696 4.206 9.21113 4.26474 9.18296 4.33682C9.06734 4.58403 9.18296 4.84469 9.45505 4.89324C9.92755 4.97912 10.4047 5.03738 10.8941 5.10833Z" stroke-width="1"/>
        <path d="M10.0075 8.32734C9.98929 8.53101 10.0296 8.70886 10.1425 8.85292C10.2539 8.99493 10.4263 9.09165 10.6479 9.15467L10.6752 9.05849H10.7752V7.69696V7.58483L10.6638 7.59761C10.316 7.63752 10.0396 7.96272 10.0075 8.32734ZM10.0075 8.32734L10.1071 8.33627M10.0075 8.32734C10.0075 8.32741 10.0075 8.32748 10.0075 8.32755L10.1071 8.33627M10.1071 8.33627C10.1324 8.04849 10.3279 7.7963 10.5752 7.71835V9.02626C10.2265 8.89923 10.0768 8.67518 10.1071 8.33627ZM11.2023 12.1731L11.1271 12.1924V12.27C11.1271 12.3196 11.1277 12.3672 11.1282 12.4137C11.1292 12.5025 11.1302 12.5871 11.1272 12.6729C11.1238 12.7432 11.1015 12.7888 11.0744 12.816C11.0479 12.8426 11.008 12.8604 10.9507 12.8594C10.8927 12.8583 10.856 12.8396 10.8325 12.8136C10.8079 12.7864 10.7873 12.7399 10.7852 12.6653V12.6652V12.6644V12.6637V12.663V12.6623V12.6616V12.6609V12.6602V12.6595V12.6587V12.658V12.6573V12.6566V12.6559V12.6552V12.6545V12.6537V12.653V12.6523V12.6516V12.6509V12.6502V12.6495V12.6488V12.648V12.6473V12.6466V12.6459V12.6452V12.6445V12.6438V12.643V12.6423V12.6416V12.6409V12.6402V12.6395V12.6388V12.638V12.6373V12.6366V12.6359V12.6352V12.6345V12.6338V12.6331V12.6323V12.6316V12.6309V12.6302V12.6295V12.6288V12.6281V12.6273V12.6266V12.6259V12.6252V12.6245V12.6238V12.6231V12.6223V12.6216V12.6209V12.6202V12.6195V12.6188V12.6181V12.6173V12.6166V12.6159V12.6152V12.6145V12.6138V12.613V12.6123V12.6116V12.6109V12.6102V12.6095V12.6088V12.608V12.6073V12.6066V12.6059V12.6052V12.6045V12.6037V12.603V12.6023V12.6016V12.6009V12.6002V12.5995V12.5987V12.598V12.5973V12.5966V12.5959V12.5952V12.5944V12.5937V12.593V12.5923V12.5916V12.5909V12.5901V12.5894V12.5887V12.588V12.5873V12.5866V12.5858V12.5851V12.5844V12.5837V12.583V12.5823V12.5815V12.5808V12.5801V12.5794V12.5787V12.5779V12.5772V12.5765V12.5758V12.5751V12.5744V12.5736V12.5729V12.5722V12.5715V12.5708V12.57V12.5693V12.5686V12.5679V12.5672V12.5664V12.5657V12.565V12.5643V12.5636V12.5629V12.5621V12.5614V12.5607V12.56V12.5593V12.5585V12.5578V12.5571V12.5564V12.5557V12.5549V12.5542V12.5535V12.5528V12.552V12.5513V12.5506V12.5499V12.5492V12.5484V12.5477V12.547V12.5463V12.5456V12.5448V12.5441V12.5434V12.5427V12.5419V12.5412V12.5405V12.5398V12.5391V12.5383V12.5376V12.5369V12.5362V12.5354V12.5347V12.534V12.5333V12.5325V12.5318V12.5311V12.5304V12.5296V12.5289V12.5282V12.5275V12.5267V12.526V12.5253V12.5246V12.5238V12.5231V12.5224V12.5217V12.5209V12.5202V12.5195V12.5188V12.518V12.5173V12.5166V12.5159V12.5151V12.5144V12.5137V12.513V12.5122V12.5115V12.5108V12.51V12.5093V12.5086V12.5079V12.5071V12.5064V12.5057V12.505V12.5042V12.5035V12.5028V12.502V12.5013V12.5006V12.4998V12.4991V12.4984V12.4977V12.4969V12.4962V12.4955V12.4947V12.494V12.4933V12.4925V12.4918V12.4911V12.4904V12.4896V12.4889V12.4882V12.4874V12.4867V12.486V12.4852V12.4845V12.4838V12.483V12.4823V12.4816V12.4808V12.4801V12.4794V12.4786V12.4779V12.4772V12.4764V12.4757V12.475V12.4742V12.4735V12.4728V12.472V12.4713V12.4706V12.4698V12.4691V12.4683V12.4676V12.4669V12.4661V12.4654V12.4647V12.4639V12.4632V12.4625V12.4617V12.461V12.4602V12.4595V12.4588V12.458V12.4573V12.4565V12.4558V12.4551V12.4543V12.4536V12.4529V12.4521V12.4514V12.4506V12.4499V12.4492V12.4484V12.4477V12.4469V12.4462V12.4454V12.4447V12.444V12.4432V12.4425V12.4417V12.441V12.4403V12.4395V12.4388V12.438V12.4373V12.4365V12.4358V12.435V12.4343V12.4336V12.4328V12.4321V12.4313V12.4306V12.4298V12.4291V12.4283V12.4276V12.4268V12.4261V12.4254V12.4246V12.4239V12.4231V12.4224V12.4216V12.4209V12.4201V12.4194V12.4186V12.4179V12.4171V12.4164V12.4156V12.4149V12.4141V12.4134V12.4126V12.4119V12.4111V12.4104V12.4096V12.4089V12.4081V12.4074V12.4066V12.4059V12.4051V12.4044V12.4036V12.4029V12.4021V12.4014V12.4006V12.3999V12.3991V12.3983V12.3976V12.3968V12.3961V12.3953V12.3946V12.3938V12.3931V12.3923V12.3915V12.3908V12.39V12.3893V12.3885V12.3878V12.387V12.3862V12.3855V12.3847V12.384V12.3832V12.3825V12.3817V12.3809V12.3802V12.3794V12.3787V12.3779V12.3771V12.3764V12.3756V12.3749V12.3741V12.3733V12.3726V12.3718V12.371V12.3703V12.3695V12.3688V12.368V12.3672V12.3665V12.3657V12.3649V12.3642V12.3634V12.3626V12.3619V12.3611V12.3603V12.3596V12.3588V12.358V12.3573V12.3565V12.3557V12.355V12.3542V12.3534V12.3527V12.3519V12.3511V12.3504V12.3496V12.3488V12.3481V12.3473V12.3465V12.3457V12.345V12.3442V12.3434V12.3427V12.3419V12.3411V12.3403V12.3396V12.3388V12.338V12.3372V12.3365V12.3357V12.3349V12.3341V12.3334V12.3326V12.3318V12.331V12.3303V12.3295V12.3287V12.3279V12.3272V12.3264V12.3256V12.3248V12.324V12.3233V12.3225V12.3217V12.3209V12.3202V12.3194V12.3186V12.3178V12.317V12.3162V12.3155V12.3147V12.3139V12.3131V12.3123V12.3116V12.3108V12.31V12.3092V12.3084V12.3076V12.3069V12.3061V12.3053V12.3045V12.3037V12.3029V12.3021V12.3014V12.3006V12.2998V12.299V12.2982V12.2974V12.2966V12.2958V12.295V12.2943V12.2935V12.2927V12.2919V12.2911V12.2903V12.2895V12.2887V12.2879V12.1916L10.689 12.188C10.3263 12.1743 9.97432 12.0663 9.67007 11.8753L9.66972 11.8751C9.5798 11.8192 9.53808 11.7693 9.52322 11.7311C9.51107 11.6998 9.51166 11.6632 9.54609 11.6113C9.58091 11.5588 9.618 11.5391 9.65735 11.5353C9.70161 11.5311 9.76549 11.5456 9.85184 11.5973C10.0986 11.7603 10.3897 11.848 10.6879 11.8494L10.7883 11.8499V11.7494V11.376C10.7883 11.2075 10.7878 11.0394 10.7873 10.8715C10.7863 10.5363 10.7852 10.2018 10.7883 9.86677H10.7883V9.86585C10.7883 9.79152 10.781 9.71393 10.7422 9.64546C10.7017 9.57388 10.6358 9.52709 10.5499 9.49493C10.4337 9.44684 10.3218 9.38938 10.2155 9.32315L10.2156 9.32302L10.2108 9.32037C9.99373 9.20119 9.846 9.05311 9.75873 8.88175C9.67146 8.7104 9.6407 8.50798 9.67064 8.2735L9.67072 8.27351L9.67108 8.26931C9.68964 8.05106 9.77287 7.84231 9.91118 7.66821C10.0495 7.49407 10.2372 7.36193 10.4518 7.28814L10.4519 7.2882L10.4552 7.28692C10.4722 7.28037 10.491 7.27495 10.5137 7.26897C10.5182 7.26776 10.5231 7.26649 10.5282 7.26518C10.5464 7.26043 10.5673 7.255 10.5874 7.24884L10.5874 7.24889L10.5903 7.2479L10.7175 7.20458L10.7852 7.1815V7.10992V7.10923V7.10853V7.10783V7.10714V7.10644V7.10575V7.10505V7.10436V7.10366V7.10297V7.10227V7.10158V7.10088V7.10018V7.09949V7.09879V7.0981V7.0974V7.09671V7.09601V7.09532V7.09462V7.09393V7.09323V7.09254V7.09184V7.09115V7.09045V7.08976V7.08906V7.08837V7.08767V7.08698V7.08628V7.08559V7.0849V7.0842V7.08351V7.08281V7.08212V7.08142V7.08073V7.08003V7.07934V7.07864V7.07795V7.07726V7.07656V7.07587V7.07517V7.07448V7.07379V7.07309V7.0724V7.0717V7.07101V7.07032V7.06962V7.06893V7.06823V7.06754V7.06685V7.06615V7.06546V7.06477V7.06407V7.06338V7.06268V7.06199V7.0613V7.0606V7.05991V7.05922V7.05852V7.05783V7.05714V7.05644V7.05575V7.05506V7.05436V7.05367V7.05298V7.05228V7.05159V7.0509V7.05021V7.04951V7.04882V7.04813V7.04743V7.04674V7.04605V7.04536V7.04466V7.04397V7.04328V7.04258V7.04189V7.0412V7.04051V7.03981V7.03912V7.03843V7.03774V7.03704V7.03635V7.03566V7.03497V7.03427V7.03358V7.03289V7.0322V7.03151V7.03081V7.03012V7.02943V7.02874V7.02805V7.02735V7.02666V7.02597V7.02528V7.02459V7.02389V7.0232V7.02251V7.02182V7.02113V7.02044V7.01974V7.01905V7.01836V7.01767V7.01698V7.01629V7.01559V7.0149V7.01421V7.01352V7.01283V7.01214V7.01145V7.01075V7.01006V7.00937V7.00868V7.00799V7.0073V7.00661V7.00592V7.00523V7.00453V7.00384V7.00315V7.00246V7.00177V7.00108V7.00039V6.9997V6.99901V6.99832V6.99763V6.99694V6.99624V6.99555V6.99486V6.99417V6.99348V6.99279V6.9921V6.99141V6.99072V6.99003V6.98934V6.98865V6.98796V6.98727V6.98658V6.98589V6.9852V6.98451V6.98382V6.98313V6.98244V6.98175V6.98106V6.98037V6.97968V6.97899V6.9783V6.97761V6.97692V6.97623V6.97554V6.97485V6.97416V6.97347V6.97278V6.97209V6.9714V6.97071V6.97002V6.96933V6.96864V6.96795V6.96726V6.96657V6.96588V6.96519V6.9645V6.96382V6.96313V6.96244V6.96175V6.96106V6.96037V6.95968V6.95899V6.9583V6.95761V6.95692V6.95623V6.95555V6.95486V6.95417V6.95348V6.95279V6.9521V6.95141V6.95072V6.95003V6.94935V6.94866V6.94797V6.94728V6.94659V6.9459V6.94521V6.94452V6.94384V6.94315V6.94246V6.94177V6.94108V6.94039V6.9397V6.93902V6.93833V6.93764V6.93695V6.93626V6.93557V6.93489V6.9342V6.93351V6.93282V6.93213V6.93145V6.93076V6.93007V6.92938V6.92869V6.92801V6.92732V6.92663V6.92594V6.92525V6.92457V6.92388V6.92319V6.9225V6.92182V6.92113V6.92044V6.91975V6.91906V6.91838V6.91769V6.917V6.91631V6.91563V6.91494V6.91425V6.91356V6.91288V6.91219V6.9115V6.91081V6.91013V6.90944V6.90875V6.90807V6.90738V6.90669V6.906V6.90532V6.90463V6.90394V6.90325V6.90257V6.90188V6.90119V6.90051V6.89982V6.89913V6.89845V6.89776V6.89707V6.89639V6.8957V6.89501V6.89432V6.89364V6.89295V6.89226V6.89158V6.89089V6.8902V6.88952V6.88883V6.88814V6.88746V6.88677V6.88609V6.8854V6.88471V6.88403V6.88334V6.88265V6.88197V6.88128V6.88059V6.87991V6.87922V6.87854V6.87785V6.87716V6.87648V6.87579V6.8751V6.87442V6.87373V6.87305V6.87236V6.87167V6.87099V6.8703V6.86962V6.86893V6.86824V6.86756V6.86687V6.86619V6.8655V6.86482V6.86413V6.86344V6.86276V6.86207V6.86139V6.8607V6.86002V6.85933V6.85864V6.85796V6.85727V6.85659V6.8559V6.85522V6.85453V6.85385V6.85316V6.85248V6.85179V6.8511V6.85042V6.84973V6.84905V6.84836V6.84768V6.84699V6.84631V6.84562V6.84494V6.84425V6.84357V6.84288V6.8422V6.84151V6.84083V6.84014V6.83946V6.83877V6.83809V6.8374V6.83672V6.83603V6.83535V6.83466V6.83398V6.83329V6.83261V6.83192V6.83124V6.83055V6.82987V6.82918V6.8285V6.82782V6.82713V6.82645V6.82576V6.82508V6.82439V6.82371V6.82302V6.82234V6.82165V6.82097V6.82029V6.8196V6.81892V6.81823V6.81755V6.81686V6.81618V6.8155V6.81481V6.81413V6.81344V6.81276V6.81207V6.81139V6.81071V6.81002V6.80934V6.80865V6.80797V6.80729V6.8066V6.80592V6.80523V6.80455V6.80387V6.80318V6.8025V6.80181V6.80113V6.80045V6.79976V6.79908V6.7984V6.79771V6.79703V6.79634V6.79566V6.79498V6.79429V6.79361V6.79293V6.79224V6.79156V6.79087V6.79019V6.78951V6.78882V6.78814V6.78746V6.78677V6.78609V6.78541V6.78472V6.78404V6.78336V6.78267V6.78199V6.78131V6.78062V6.77994V6.77926V6.77857V6.77789V6.77721V6.77652V6.77584V6.77516V6.77447V6.77379V6.77311V6.77243V6.77174V6.77106V6.77038V6.76969V6.76901V6.76833V6.76764V6.76696V6.76628V6.7656V6.76491V6.76423V6.76355V6.76286V6.76218V6.7615V6.76082V6.76013V6.75945V6.75901C10.7876 6.68991 10.809 6.64228 10.8361 6.61303C10.8625 6.58452 10.9008 6.56613 10.9535 6.56613C11.0058 6.56613 11.045 6.58464 11.0727 6.6141C11.1009 6.64411 11.1231 6.69201 11.1271 6.75945V6.75973V6.76007V6.76041V6.76075V6.76109V6.76144V6.76178V6.76212V6.76246V6.7628V6.76314V6.76349V6.76383V6.76417V6.76451V6.76485V6.76519V6.76554V6.76588V6.76622V6.76656V6.7669V6.76724V6.76759V6.76793V6.76827V6.76861V6.76895V6.7693V6.76964V6.76998V6.77032V6.77066V6.77101V6.77135V6.77169V6.77203V6.77237V6.77272V6.77306V6.7734V6.77374V6.77408V6.77443V6.77477V6.77511V6.77545V6.7758V6.77614V6.77648V6.77682V6.77716V6.77751V6.77785V6.77819V6.77853V6.77888V6.77922V6.77956V6.7799V6.78024V6.78059V6.78093V6.78127V6.78161V6.78196V6.7823V6.78264V6.78298V6.78333V6.78367V6.78401V6.78435V6.7847V6.78504V6.78538V6.78572V6.78607V6.78641V6.78675V6.78709V6.78744V6.78778V6.78812V6.78847V6.78881V6.78915V6.78949V6.78984V6.79018V6.79052V6.79086V6.79121V6.79155V6.79189V6.79223V6.79258V6.79292V6.79326V6.79361V6.79395V6.79429V6.79463V6.79498V6.79532V6.79566V6.79601V6.79635V6.79669V6.79703V6.79738V6.79772V6.79806V6.79841V6.79875V6.79909V6.79943V6.79978V6.80012V6.80046V6.80081V6.80115V6.80149V6.80184V6.80218V6.80252V6.80286V6.80321V6.80355V6.80389V6.80424V6.80458V6.80492V6.80527V6.80561V6.80595V6.8063V6.80664V6.80698V6.80732V6.80767V6.80801V6.80835V6.8087V6.80904V6.80938V6.80973V6.81007V6.81041V6.81076V6.8111V6.81144V6.81179V6.81213V6.81247V6.81282V6.81316V6.8135V6.81385V6.81419V6.81453V6.81488V6.81522V6.81556V6.81591V6.81625V6.81659V6.81694V6.81728V6.81762V6.81797V6.81831V6.81865V6.819V6.81934V6.81968V6.82003V6.82037V6.82071V6.82106V6.8214V6.82174V6.82209V6.82243V6.82277V6.82312V6.82346V6.8238V6.82415V6.82449V6.82483V6.82518V6.82552V6.82586V6.82621V6.82655V6.82689V6.82724V6.82758V6.82792V6.82827V6.82861V6.82895V6.8293V6.82964V6.82998V6.83033V6.83067V6.83101V6.83136V6.8317V6.83205V6.83239V6.83273V6.83308V6.83342V6.83376V6.83411V6.83445V6.83479V6.83514V6.83548V6.83582V6.83617V6.83651V6.83685V6.8372V6.83754V6.83788V6.83823V6.83857V6.83892V6.83926V6.8396V6.83995V6.84029V6.84063V6.84098V6.84132V6.84166V6.84201V6.84235V6.84269V6.84304V6.84338V6.84372V6.84407V6.84441V6.84476V6.8451V6.84544V6.84579V6.84613V6.84647V6.84682V6.84716V6.8475V6.84785V6.84819V6.84853V6.84888V6.84922V6.84956V6.84991V6.85025V6.8506V6.85094V6.85128V6.85163V6.85197V6.85231V6.85266V6.853V6.85334V6.85369V6.85403V6.85437V6.85472V6.85506V6.8554V6.85575V6.85609V6.85643V6.85678V6.85712V6.85747V6.85781V6.85815V6.8585V6.85884V6.85918V6.85953V6.85987V6.86021V6.86056V6.8609V6.86124V6.86159V6.86193V6.86227V6.86262V6.86296V6.8633V6.86365V6.86399V6.86433V6.86468V6.86502V6.86536V6.86571V6.86605V6.86639V6.86674V6.86708V6.86742V6.86777V6.86811V6.86846V6.8688V6.86914V6.86949V6.86983V6.87017V6.87052V6.87086V6.8712V6.87155V6.87189V6.87223V6.87258V6.87292V6.87326V6.8736V6.87395V6.87429V6.87463V6.87498V6.87532V6.87566V6.87601V6.87635V6.87669V6.87704V6.87738V6.87772V6.87807V6.87841V6.87875V6.8791V6.87944V6.87978V6.88013V6.88047V6.88081V6.88116V6.8815V6.88184V6.88219V6.88253V6.88287V6.88321V6.88356V6.8839V6.88424V6.88459V6.88493V6.88527V6.88562V6.88596V6.8863V6.88665V6.88699V6.88733V6.88767V6.88802V6.88836V6.8887V6.88905V6.88939V6.88973V6.89007V6.89042V6.89076V6.8911V6.89145V6.89179V6.89213V6.89248V6.89282V6.89316V6.8935V6.89385V6.89419V6.89453V6.89488V6.89522V6.89556V6.8959V6.89625V6.89659V6.89693V6.89727V6.89762V6.89796V6.8983V6.89865V6.89899V6.89933V6.89967V6.90002V6.90036V6.9007V6.90104V6.90139V6.90173V6.90207V6.90241V6.90276V6.9031V6.90344V6.90378V6.90413V6.90447V6.90481V6.90515V6.9055V6.90584V6.90618V6.90652V6.90687V6.90721V6.90755V6.90789V6.90824V6.90858V6.90892V6.90926V6.90961V6.90995V6.91029V6.91063V6.91098V6.91132V6.91166V6.912V6.91234V6.91269V6.91303V6.91337V6.91371V6.91405V6.9144V6.91474V6.91508V6.91542V6.91577V6.91611V6.91645V6.91679V6.91713V6.91748V6.91782V6.91816V6.9185V6.91884V6.91919V6.91953V6.91987V6.92021V6.92055V6.9209V6.92124V6.92158V6.92192V6.92226V6.9226V6.92295V6.92329V6.92363V6.92397V6.92431V6.92465V6.925V6.92534V6.92568V6.92602V6.92636V6.9267V6.92705V6.92739V6.92773V6.92807V6.92841V6.92875V6.9291V6.92944V6.92978V6.93012V6.93046V6.9308V6.93114V6.93149V6.93183V6.93217V7.0427V7.10698L11.1856 7.13367C11.274 7.17403 11.3591 7.21157 11.4415 7.24795C11.6375 7.33441 11.8186 7.41428 11.9931 7.50958C12.0228 7.53045 12.0474 7.55685 12.0657 7.58701C12.0844 7.61771 12.096 7.65167 12.1002 7.68669C12.103 7.74435 12.0742 7.78331 12.0248 7.80409C11.971 7.82671 11.8911 7.8262 11.8129 7.7825C11.6927 7.71342 11.5658 7.65258 11.4272 7.58616C11.3758 7.56155 11.3228 7.53617 11.268 7.50931L11.124 7.43878V7.59912V7.59972C11.124 8.18569 11.124 8.71168 11.1279 9.23772L11.128 9.25029L11.1312 9.26245C11.1408 9.29913 11.1583 9.33322 11.1822 9.36256C11.2061 9.3919 11.236 9.41582 11.2697 9.43294L11.2697 9.43295L11.2714 9.43378C11.3524 9.47304 11.4361 9.50674 11.522 9.53464C11.8384 9.65155 12.0732 9.81981 12.2269 10.0264C12.3802 10.2327 12.4574 10.4832 12.4491 10.7734L12.4491 10.774C12.4423 11.0737 12.3396 11.3643 12.1548 11.6056C11.9705 11.8461 11.7136 12.026 11.419 12.1199C11.401 12.1243 11.3826 12.1287 11.3634 12.1333C11.3169 12.1445 11.2654 12.1569 11.2023 12.1731ZM12.549 10.7763C12.5418 11.0974 12.4318 11.4085 12.2342 11.6664C12.0366 11.9244 11.7612 12.1165 11.446 12.2162C11.4263 12.2211 11.4065 12.2258 11.386 12.2308C11.3397 12.2419 11.2895 12.254 11.2271 12.27L12.549 10.7763ZM11.1356 11.7084V11.8363L11.2597 11.8054C11.5108 11.7429 11.7323 11.5978 11.8861 11.3941C12.0398 11.1904 12.1162 10.9409 12.1016 10.6881C12.0796 10.2234 11.7375 9.87711 11.2492 9.8101L11.1356 9.79451V9.90917V11.7084Z" stroke-width="1"/>
    </svg>    
);

// styles
const LikeButton = styled.div`
  line-height: 20px;
  min-height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: left;
  background: inherit;
  color: inherit;
  font-size: 16px;
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
        {icon}
      </span>
      <span className={`count`}>
        {state.label}
      </span>
    </LikeButton>
  </div>
);
