const { linkId, CONTRACT_ADDRESS } = props

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
  img: null,
  amount: null,
  loading: false,
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
   State.update({ amount: target.value.trim(), wrongPrice: false });
};

const sendOnChange = () => {
  if (!/^\d+([.]\d+)?$/g.test(state.amount)) {
    State.update({ wrongPrice: true })
  } else {
    try {
      State.update({ loading: true })
      Near.call(
        CONTRACT_ADDRESS,
        "add_paid_content",
        {
          link: `https://ipfs.near.social/ipfs/${state.img.cid}`,
          cost: parseNearAmount(state.amount),
          context_id: linkId
        }
      );
    } catch (err) {
      console.error(err);
      State.update({ loading: false })
    }
  }
};

const cancelOnChange = () => {
  State.update({
    img: null,
    amount: null,
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 8L12 3L7 8"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 3V15"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WrapperWidget = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  min-width: 350px;
  max-width: 780px;
  width: 100%;
  padding: 10px;
  border-radius: 16px;
  box-sizing: border-box;
  border: 1px solid #8899a6;
  background: #fff;

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
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
    &:hover {
      opacity: 0.5;
    }
  }
`;

const Title = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: #222;
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
  padding-bottom: 10px;
`;

const InputsBlock = styled.div`
  border-radius: 4px;
  border: 1px solid #c1c6ce;
  padding: 10px;
  margin-bottom: 14px;
  box-sizing: border-box;
  position: relative;
`;

const UploadBlocker = styled.div`
  position: absolute;
  width: calc(100% - 16px);
  height: 50px;
  background: white;
  opacity: .5;
  top: 8px;
  left: 8px;
`;

const UploadBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  box-sizing: border-box;
`;

const FileInput = styled.input`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  border-radius: 4px;
  background: #e7ecef;
  display: flex;
  height: 44px;
  padding: 10px;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  color: #222;
  border: none;
  outline: none;
  box-sizing: border-box;
  flex-grow: 1;
  margin-right: 8px;
`;

const BlockAmount = styled.div`
  .default {
    border-radius: 4px;
    border: 1px solid #c1c6ce;
    background: #fff;

    display: flex;
    height: 44px;
    padding: 4px 10px;
    flex-direction: column;
    box-sizing: border-box;
  }

  .error {
    border-color: red;
  }
`;

const LabelAmount = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: #919191;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
`;

const InputAmount = styled.input`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: #222;
  font-size: 14px;
  background: #fff;
  font-weight: 400;
  line-height: normal;
  border: none;
  outline: none;
  height: 16px;
  box-sizing: border-box;
  &:disabled {
    color: #919191;
  }
`;

const WrongAmountMessage = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: red;
  padding: 8px 8px 0 12px;
  font-size: 14px;
`;

const ButtonsBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  box-sizing: border-box;
`;

const ButtonCancel = styled.button`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  border-radius: 4px;
  display: flex;
  background: #c1c6ce;
  border: none;
  outline: none;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 14px;
  max-width: 230px;
  width: 100%;
  height: 44px;
  font-weight: 400;
  line-height: 149%;
  box-sizing: border-box;
  margin: 0 4px;
  cursor: pointer;

  &:disabled {
    background: #dbdfe5 !important;
    cursor: default;
  }

  &:hover {
    background: #a9aeb5;
  }
`;

const ButtonSend = styled.button`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  border-radius: 4px;
  display: flex;
  background: #3d7fff;
  border: none;
  outline: none;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 14px;
  max-width: 230px;
  width: 100%;
  height: 44px;
  font-weight: 400;
  line-height: 149%;
  box-sizing: border-box;
  margin: 0 4px;
  cursor: pointer;

  &:disabled {
    background: #8db4ff !important;
    cursor: default;
  }

  &:hover {
    background: #2564df;
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
  <WrapperWidget>
    <Title>Configure your content</Title>
    <InputsBlock>
      <UploadBlocker style={{ display: state.loading ? 'block' : 'none'}} />
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
        <div className={state.wrongPrice? "default error" : "default"}>
          <LabelAmount>Price (NEAR)</LabelAmount>
          <InputAmount
            value={state.amount || ""}
            onChange={amountOnChange}
            disabled={state.loading}
          />
        </div>
      </BlockAmount>
      {state.wrongPrice
        ? (<WrongAmountMessage>
          The price must consist only of numbers separated by "."
          </WrongAmountMessage>)
        : null}
    </InputsBlock>
    <ButtonsBlock>
      <ButtonCancel
        onClick={cancelOnChange}
        disabled={!state.img && !state.amount || state.loading}
      >
        Clear
      </ButtonCancel>
      <ButtonSend
        onClick={sendOnChange}
        disabled={!state.img || !state.amount || state.wrongPrice || state.loading}
      >
        {state.loading ? <Loader /> : "Add"}
      </ButtonSend>
    </ButtonsBlock>
  </WrapperWidget>
);
