const { linkId, CONTRACT_ADDRESS } = props

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
  return Number(formatNearAmount(amount, 3));
}
/**
 * End
 */

State.init({
  img: null,
  isUpload: false,
  amount: 1,
});

const uploadFileUpdateState = (body) => {
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  }).then((res) => {
    const cid = res.body.cid;
    State.update({ img: { cid } });
  });
};

const filesOnChange = (files) => {
  if (files) {
    State.update({ img: { uploading: true, cid: null } });
    uploadFileUpdateState(files[0]);
  }
};

const amountOnChange = ({ target }) => {
  State.update({ amount: target.value });
};

const sendOnChange = () => {
  try {
    // State.update({ loading: true })
    Near.call(
      CONTRACT_ADDRESS,
      "add_paid_content",
      {
        link: `https://ipfs.near.social/ipfs/${state.img.cid}`,
        cost: parseNearAmount(state.amount),
        context_id: linkId
      }
    );
    // setTimeout(() => State.update({ loading: false }), 3000)
  } catch (err) {
    console.error(err);
    // State.update({ isUpload: false });
  }
};

const cancelOnChange = () => {
  State.update({
    img: null,
    isUpload: false,
    amount: 1,
  });
};

const iconBtnUpload = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17 8L12 3L7 8"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 3V15"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const WrapperWidget = styled.div`
  display: flex;
  flex-direction: column;
  width: 509px;
  padding: 10px;
  height: 247px;
  border-radius: 16px;
  border: 1px solid #8899a6;
  background: #fff;
  box-sizing: border-box;
  .ButtonUpload {
    cursor: pointer;
    border-radius: 4px;
    background: #3d7fff;
    box-sizing: border-box;
    width: 128px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px;
    color: #fff;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
    &:hover {
      opacity: 0.5;
    }
  }
`;

const Title = styled.div`
  color: #222;
  font-family: Roboto;
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
  padding-bottom: 10px;
`;

const InputsBlock = styled.div`
  border-radius: 4px;
  border: 1px solid #c1c6ce;
  padding: 10px;
  width: 489px;
  height: 142px;
  margin-bottom: 14px;
  box-sizing: border-box;
`;

const UploadBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  box-sizing: border-box;
`;

const FileInput = styled.input`
  border-radius: 4px;
  background: #e7ecef;
  display: flex;
  height: 44px;
  padding: 10px;
  width: 331px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  color: #222;
  border: none;
  outline: none;
  box-sizing: border-box;
`;

const BlockAmount = styled.div`
  border-radius: 4px;
  border: 1px solid #c1c6ce;
  background: #fff;

  display: flex;
  height: 44px;
  padding: 4px 10px;
  width: 469px;
  flex-direction: column;
  box-sizing: border-box;
`;

const LabelAmount = styled.div`
  color: #919191;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
`;

const ButtonsBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  width: 489px;
  box-sizing: border-box;
`;

const InputAmount = styled.input`
  color: #222;
  font-family: Roboto;
  font-size: 14px;
  background: #fff;
  font-weight: 400;
  line-height: normal;
  border: none;
  outline: none;
  width: 449px;
  height: 16px;
  box-sizing: border-box;
`;

const ButtonCancel = styled.button`
  border-radius: 4px;
  display: flex;
  background: #c1c6ce;
  border: none;
  outline: none;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: Roboto;
  font-size: 14px;
  width: 230px;
  height: 44px;
  font-weight: 400;
  line-height: 149%;
  box-sizing: border-box;
  &:hover {
    opacity: 0.3;
  }
`;

const ButtonSend = styled.button`
  border-radius: 4px;
  display: flex;
  background: #3d7fff;
  border: none;
  outline: none;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: Roboto;
  font-size: 14px;
  width: 230px;
  height: 44px;
  font-weight: 400;
  line-height: 149%;
  box-sizing: border-box;
  &:hover {
    opacity: 0.5;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

return (
  <>
    {state.img.cid && state.isUpload ? null : (
      <WrapperWidget>
        <Title>Configure your content</Title>
        <InputsBlock>
          <UploadBlock>
            <FileInput readOnly value={state.img.cid ? state.img.cid : ""} />

            <Files
              multiple={false}
              accepts={["image/*"]}
              minFileSize={1}
              clickable
              className="ButtonUpload"
              onChange={filesOnChange}
            >
              {iconBtnUpload}
              {state.img?.uploading ? <> Uploading </> : "Upload image"}
            </Files>
          </UploadBlock>

          <BlockAmount>
            <LabelAmount>Price (NEAR)</LabelAmount>
            <InputAmount
              value={state.amount ? state.amount : ""}
              onChange={amountOnChange}
            />
          </BlockAmount>
        </InputsBlock>
        <ButtonsBlock>
          <ButtonCancel onClick={cancelOnChange}>Cancel</ButtonCancel>
          <ButtonSend
            onClick={sendOnChange}
            disabled={!state.img || !state.amount}
          >
            Send
          </ButtonSend>
        </ButtonsBlock>
      </WrapperWidget>
    )}
  </>
);
