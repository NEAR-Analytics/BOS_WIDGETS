const accountId = context.accountId;
const getUserAddress = props.getUserAddress;
const update = props.update;
const token = props.token;
const action = props.action;

// STYLED COMPONENTS

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    margin: 0px auto;
    min-width: 380px;
    width: 100%;
    padding: 0px 12px 12px 12px;
    position: relative;
    margin-top: 8px;
    margin-bottom: 8px;
    background:  linear-gradient( rgb(206, 255, 26) 0%, rgb(206, 255, 26) 270px, rgb(247, 249, 251) 270px, rgb(247, 249, 251) 100%);
  `;

const StakeFormTopContainer = styled.div`
  margin-top: 0px;
  display: flex;
  margin: 10px 0px;
  `;

const StakeFormTopContainerLeft = styled.div`
margin-right: 8px;
flex-basis: 50%;
-webkit-box-flex: 1;
flex-grow: 1;
font-size: 12px;
line-height: 1.6em;
`;

const StakeFormTopContainerLeftContent1 = styled.div`
display: flex;
flex-direction: row;
-webkit-box-pack: start;
justify-content: flex-start;
-webkit-box-align: center;
align-items: center;
`;

const StakeFormTopContainerRightContent1Text = styled.div`
padding: 0px 6px;
font-weight: 400;
font-size: 16px;
background-color: #0002;
border: solid 4px #000B;
border-radius: 14px;
`;

const Header = styled.div`
    font-weight: 800;
    font-size: 26px;
    padding: 15px 20px 0 20px;
    margin-bottom: 0.2em;
    line-height: 1.2em;
    text-align: center;
  `;

const SelectionContainer = styled.div`
    width: 100%;
    max-width: 600px;
    align-self: center;
    background-color: white;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    font-weight: 400;
    font-size: 12px;
    line-height: 1.6em;
    border-radius: 20px;
    padding: 12px 26px;
    box-shadow: none;
    color: #fff;    
    margin-bottom: 1em;
    padding: 12px 26px 32px 26px;
  `;

const Spacer = styled.div`
    height: 20px;
  `;

const ButtonConnectContainer = styled.div`
    ${".buttonClass{ width: 100%;  border-radius: 1000px;  font-size: 20px;  font-weight: bold;  padding: 8px 0;  /* transition: all 0.3s ease-in-out;*/display: inline-flex;  align-items: center;  justify-content: center;  user-select: none;  position: relative;  white-space: nowrap;  vertical-align: middle;  line-height: 1.2;  border-radius: 1000px;  font-weight: 400;  min-height: 48px;  text-align: center;  box-sizing: border-box;  padding: 0 24px;  color: rgb(255, 255, 255);  background: rgb(12, 34, 70);  border: 2px solid transparent;  &:disabled { background: rgb(12, 34, 70);    color: white;    cursor: not-allowed } &:hover { border: 4px solid rgb(12, 34, 70);    color:  rgb(12, 34, 70);    background: transparent;    }}"}
  `;

const SelectToken = styled.div`
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding-block-end: 20px;
  width: 100%;
`;

const SelectAction = styled.div`
border-bottom-left-radius: 0px;
border-bottom-right-radius: 0px;
border-radius: 20px;
display: flex;
flex-direction: column;
width: 100%;
`;

const TokensList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const TokensItem = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 18px;
  width: 12em;
  text-align: left;
  align-items: center;

  border: 0.8px solid rgb(215, 224, 228);
  background: rgb(247, 249, 251);
  opacity: 0.8;

  border-radius: 38px;

  ${({ active }) =>
    active
      ? `
    background: rgb(206, 255, 26);
  `
      : `
    :hover {
      background: rgb(215, 224, 228);
    }
  `}

// add support for disabled 
  ${({ disabled }) =>
    disabled
      ? `
    background: rgb(215, 224, 228);
    opacity: 0.5;
    :hover {
      background: rgb(215, 224, 228);
    }
  `
      : ``}


  div {
    display: flex;
    flex-direction: column;
  }
`;

const ActionItem = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 16px;
  width: 12em;
  text-align: left;
  align-items: center;
  border: 0.8px solid rgb(215, 224, 228);
  background: rgb(247, 249, 251);
  opacity: 0.8;

  border-radius: 24px;

  ${({ active }) =>
    active
      ? `
    background: rgb(206, 255, 26);
  `
      : `
    :hover {
      background: rgb(215, 224, 228);
    }
  `}


  div {
    display: flex;
    flex-direction: column;
  }
`;

const Text = styled.p`
  color:#000000;
  font-size: 14px;
  line-height: 21px;
`;

const renderTokens = (
  <SelectToken>
    <Text>Select token</Text>
    <TokensList>
      <TokensItem
        onClick={() => {
          update({ token: "near" });
        }}
        href={`/meta-pool-official.near/widget/MetaPoolStake.Near?token=near`}
        active={token === "near"}
      >
        <div>
          <div>NEAR</div>
        </div>
        <img
          style={{
            height: "70%",
            width: "auto",
          }}
          src="https://ipfs.near.social/ipfs/bafkreiftukbt7zacsnbfmhppzgfk7jj4mn5qckd3j7dgto7kutgiqj3vgi"
          alt="Brand Logo"
          width={"auto"}
        />
      </TokensItem>
      <TokensItem
        onClick={() => {
          update({ token: "wnear" });
        }}
        href={`/meta-pool-official.near/widget/MetaPoolStake.Near.wNear?token=wnear`}
        active={token === "wnear"}
      >
        <div>
          <div>wNEAR</div>
        </div>
        <img
          style={{
            height: "70%",
            width: "auto",
          }}
          src="https://ipfs.near.social/ipfs/bafkreigbbmef2vo3jcnr2llayeyom7rplcyn7efqcuo2lzclf3mr2nevwy"
          alt="wnear Logo"
          width={"auto"}
        />
      </TokensItem>
    </TokensList>
  </SelectToken>
);

const renderActions = (
  <SelectAction>
    <Text>Select action</Text>
    <TokensList>
      <ActionItem
        onClick={() => {
          update({ action: "stake" });
        }}
        active={action === "stake"}
      >
        <div>Stake</div>
        <div>
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width="24"
            height="24"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M16,7,6,17l1.41,1.41L15,10.83V28H2v2H15a2,2,0,0,0,2-2V10.83l7.59,7.58L26,17Z"></path>
            <path d="M6,8V4H26V8h2V4a2,2,0,0,0-2-2H6A2,2,0,0,0,4,4V8Z"></path>
          </svg>
        </div>
      </ActionItem>
      <ActionItem
        onClick={() => {
          update({ action: "fast" });
        }}
        active={action === "fast"}
      >
        <div>Fast Unstake</div>
        <div>
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width="24"
            height="24"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M18,30H4a2,2,0,0,1-2-2V14a2,2,0,0,1,2-2H18a2,2,0,0,1,2,2V28A2,2,0,0,1,18,30ZM4,14V28H18V14Z"></path>
            <path d="M25,23H23V9H9V7H23a2,2,0,0,1,2,2Z"></path>
            <path d="M30,16H28V4H16V2H28a2,2,0,0,1,2,2Z"></path>
          </svg>
        </div>
      </ActionItem>
      {token == "near" && (
        <ActionItem
          onClick={() => {
            update({ action: "delayed" });
          }}
          active={action === "delayed"}
        >
          <div>Delayed Unstake</div>
          <div>
            <svg
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width="24"
              height="24"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M15 19H17V21H15zM15 23H17V25H15z"></path>
              <path d="M23,11.67V4h3V2H6V4H9v7.67a2,2,0,0,0,.4,1.2L11.75,16,9.4,19.13a2,2,0,0,0-.4,1.2V28H6v2H26V28H23V20.33a2,2,0,0,0-.4-1.2L20.25,16l2.35-3.13A2,2,0,0,0,23,11.67ZM21,4v7H11V4Zm0,16.33V28H11V20.33L14.25,16,12,13h8l-2.25,3Z"></path>
            </svg>
          </div>
        </ActionItem>
      )}
    </TokensList>
  </SelectAction>
);

return (
  <PageContainer>
    <Header>
      <StakeFormTopContainer>
        <StakeFormTopContainerLeft>
          <StakeFormTopContainerLeftContent1>
            <div style={{ marginTop: "10px" }}>
              <svg
                marginTop="10px"
                width="153"
                height="18"
                viewBox="0 0 153 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.83333 17.5L11.6667 11.6667L17.5 17.5L23.3333 11.6667L29.1667 17.5L35 11.6667L23.3333 0L17.5 5.83333L11.6667 0L0 11.6667L5.83333 17.5Z"
                  fill="#0C2246"
                />
                <path
                  d="M43 17.7546H45.752V4.9865L50.9584 17.7546H53.3632L58.5696 4.9865V17.7546H61.3216V0.399902H57.7019L52.2476 14.0605L46.6941 0.399902H43V17.7546Z"
                  fill="#0C2246"
                />
                <path
                  d="M70.2515 17.9033C73.4001 17.9033 75.5323 15.9943 75.9785 13.4903H73.301C72.9291 14.9035 71.739 15.7216 70.1027 15.7216C67.9954 15.7216 66.6318 14.3084 66.5574 12.1515V11.978H76.1273C76.1769 11.6309 76.2017 11.2838 76.2017 10.9615C76.1273 7.2426 73.6728 4.91212 70.0036 4.91212C66.2599 4.91212 63.7559 7.51532 63.7559 11.4325C63.7559 15.3249 66.2599 17.9033 70.2515 17.9033ZM66.6566 10.0194C66.8549 8.20951 68.3177 7.06906 70.0284 7.06906C71.8878 7.06906 73.2018 8.13513 73.4249 10.0194H66.6566Z"
                  fill="#0C2246"
                />
                <path
                  d="M79.1868 14.3084C79.1868 16.6141 80.2281 17.7546 82.6578 17.7546H85.137V15.3993H83.2528C82.2363 15.3993 81.8892 15.0274 81.8892 14.0357V7.41615H84.9883V5.06087H81.8892V1.51556H79.1868V5.06087H76.9803V7.41615H79.1868V14.3084Z"
                  fill="#0C2246"
                />
                <path
                  d="M98.2979 15.4241C97.7525 15.4241 97.4797 15.2505 97.4797 14.6059V9.52351C97.4797 6.52363 95.5459 4.91212 92.1742 4.91212C88.976 4.91212 86.8438 6.44925 86.5711 8.92849H89.1991C89.3974 7.81283 90.4635 7.06906 92.0502 7.06906C93.8105 7.06906 94.827 7.93679 94.827 9.34996V10.1185H91.6287C88.0834 10.1185 86.1992 11.5813 86.1992 14.1845C86.1992 16.5398 88.133 17.9033 90.9098 17.9033C92.9675 17.9033 94.2567 17.0108 95.0997 15.7216C95.0997 16.986 95.6947 17.7546 97.4302 17.7546H98.8433V15.4241H98.2979ZM94.827 12.5482C94.8022 14.5068 93.513 15.8208 91.2816 15.8208C89.8189 15.8208 88.9264 15.077 88.9264 14.0109C88.9264 12.7217 89.8437 12.1019 91.5048 12.1019H94.827V12.5482Z"
                  fill="#0C2246"
                />
                <path
                  d="M106.918 17.7546H109.769V11.4573H113.761C117.38 11.4573 119.76 9.27558 119.76 5.92861C119.76 2.55684 117.38 0.399902 113.761 0.399902H106.918V17.7546ZM113.537 2.87914C115.57 2.87914 116.86 4.04439 116.86 5.92861C116.86 7.78804 115.546 8.97807 113.513 8.97807H109.769V2.87914H113.537Z"
                  fill="#0C2246"
                />
                <path
                  d="M127.075 17.9033C130.943 17.9033 133.546 15.3001 133.546 11.4077C133.546 7.54011 130.943 4.91212 127.075 4.91212C123.207 4.91212 120.604 7.54011 120.604 11.4077C120.604 15.3001 123.207 17.9033 127.075 17.9033ZM127.075 15.6224C124.819 15.6224 123.356 13.8622 123.356 11.4077C123.356 8.95328 124.819 7.19302 127.075 7.19302C129.331 7.19302 130.819 8.95328 130.819 11.4077C130.819 13.8622 129.331 15.6224 127.075 15.6224Z"
                  fill="#0C2246"
                />
                <path
                  d="M141.699 17.9033C145.566 17.9033 148.169 15.3001 148.169 11.4077C148.169 7.54011 145.566 4.91212 141.699 4.91212C137.831 4.91212 135.228 7.54011 135.228 11.4077C135.228 15.3001 137.831 17.9033 141.699 17.9033ZM141.699 15.6224C139.442 15.6224 137.98 13.8622 137.98 11.4077C137.98 8.95328 139.442 7.19302 141.699 7.19302C143.955 7.19302 145.442 8.95328 145.442 11.4077C145.442 13.8622 143.955 15.6224 141.699 15.6224Z"
                  fill="#0C2246"
                />
                <path
                  d="M150.322 17.7546H153V0.399902H150.322V17.7546Z"
                  fill="#0C2246"
                />
              </svg>
            </div>
          </StakeFormTopContainerLeftContent1>
        </StakeFormTopContainerLeft>
        <StakeFormTopContainerRightContent1Text>
          {getUserAddress()}
        </StakeFormTopContainerRightContent1Text>
      </StakeFormTopContainer>
      <Spacer />
      <Widget
        src={`meta-pool-official.near/widget/MetaPoolStake.Common.Title`}
        props={{ title: "Stake" }}
      />
    </Header>
    <Spacer />
    <SelectionContainer>
      {renderTokens}
      {renderActions}
    </SelectionContainer>
    {props.children}
  </PageContainer>
);
