const tokenList = [
  {
    ethereum_address: "0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4",
    near_address: "",
    aurora_address: "",
    name: "NEAR",
    symbol: "NEAR",
    decimals: 24,
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 288 288'%3E%3Cg id='Layer_1' data-name='Layer 1'%3E%3Cpath d='M187.58,79.81l-30.1,44.69a3.2,3.2,0,0,0,4.75,4.2L191.86,103a1.2,1.2,0,0,1,2,.91v80.46a1.2,1.2,0,0,1-2.12.77L102.18,77.93A15.35,15.35,0,0,0,90.47,72.5H87.34A15.34,15.34,0,0,0,72,87.84V201.16A15.34,15.34,0,0,0,87.34,216.5h0a15.35,15.35,0,0,0,13.08-7.31l30.1-44.69a3.2,3.2,0,0,0-4.75-4.2L96.14,186a1.2,1.2,0,0,1-2-.91V104.61a1.2,1.2,0,0,1,2.12-.77l89.55,107.23a15.35,15.35,0,0,0,11.71,5.43h3.13A15.34,15.34,0,0,0,216,201.16V87.84A15.34,15.34,0,0,0,200.66,72.5h0A15.35,15.35,0,0,0,187.58,79.81Z'/%3E%3C/g%3E%3C/svg%3E",
    reference: "",
    reference_hash: "",
  },

  {
    ethereum_address: "",
    near_address: "aurora",
    aurora_address: "",
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
    icon: "data:image/png;base64,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",
    reference: "",
    reference_hash: "",
  },

  {
    ethereum_address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    near_address:
      "dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near",
    aurora_address: "0x4988a896b1227218e4a686fde5eabdcabd91571f",
    name: "TetherUS",
    symbol: "USDT.e",
    decimals: 6,
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Ccircle cx='16' cy='16' r='16' fill='%2326A17B'/%3E%3Cpath fill='%23FFF' d='M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117'/%3E%3C/g%3E%3C/svg%3E",
    reference: "",
    reference_hash: "",
  },

  {
    ethereum_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    near_address:
      "a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near",
    aurora_address: "0xb12bfca5a55806aaf64e99521918a4bf0fc40802",
    name: "USD Coin",
    symbol: "USDC.e",
    decimals: 6,
    icon: "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Ccircle cx='16' cy='16' r='16' fill='%232775C9'/%3E%3Cpath d='M15.75 27.5C9.26 27.5 4 22.24 4 15.75S9.26 4 15.75 4 27.5 9.26 27.5 15.75A11.75 11.75 0 0115.75 27.5zm-.7-16.11a2.58 2.58 0 00-2.45 2.47c0 1.21.74 2 2.31 2.33l1.1.26c1.07.25 1.51.61 1.51 1.22s-.77 1.21-1.77 1.21a1.9 1.9 0 01-1.8-.91.68.68 0 00-.61-.39h-.59a.35.35 0 00-.28.41 2.73 2.73 0 002.61 2.08v.84a.705.705 0 001.41 0v-.85a2.62 2.62 0 002.59-2.58c0-1.27-.73-2-2.46-2.37l-1-.22c-1-.25-1.47-.58-1.47-1.14 0-.56.6-1.18 1.6-1.18a1.64 1.64 0 011.59.81.8.8 0 00.72.46h.47a.42.42 0 00.31-.5 2.65 2.65 0 00-2.38-2v-.69a.705.705 0 00-1.41 0v.74zm-8.11 4.36a8.79 8.79 0 006 8.33h.14a.45.45 0 00.45-.45v-.21a.94.94 0 00-.58-.87 7.36 7.36 0 010-13.65.93.93 0 00.58-.86v-.23a.42.42 0 00-.56-.4 8.79 8.79 0 00-6.03 8.34zm17.62 0a8.79 8.79 0 00-6-8.32h-.15a.47.47 0 00-.47.47v.15a1 1 0 00.61.9 7.36 7.36 0 010 13.64 1 1 0 00-.6.89v.17a.47.47 0 00.62.44 8.79 8.79 0 005.99-8.34z' fill='%23FFF'/%3E%3C/g%3E%3C/svg%3E",
    reference: "",
    reference_hash: "",
  },
  {
    ethereum_address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    aurora_address: "0xe3520349f477a5f6eb06107066048508498a291b",
    name: "Dai Stablecoin",
    symbol: "DAI",
    near_address:
      "6b175474e89094c44da98b954eedeac495271d0f.factory.bridge.near",
    decimals: 18,
    icon: "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Ccircle fill='%23F4B731' fillRule='nonzero' cx='16' cy='16' r='16'/%3E%3Cpath d='M9.277 8h6.552c3.985 0 7.006 2.116 8.13 5.194H26v1.861h-1.611c.031.294.047.594.047.898v.046c0 .342-.02.68-.06 1.01H26v1.86h-2.08C22.767 21.905 19.77 24 15.83 24H9.277v-5.131H7v-1.86h2.277v-1.954H7v-1.86h2.277V8zm1.831 10.869v3.462h4.72c2.914 0 5.078-1.387 6.085-3.462H11.108zm11.366-1.86H11.108v-1.954h11.37c.041.307.063.622.063.944v.045c0 .329-.023.65-.067.964zM15.83 9.665c2.926 0 5.097 1.424 6.098 3.528h-10.82V9.666h4.72z' fill='%23FFF'/%3E%3C/g%3E%3C/svg%3E",
    reference: "",
    reference_hash: "",
  },
  {
    ethereum_address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    near_address:
      "2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near",
    aurora_address: "0xf4eb217ba2454613b15dbdea6e5f22276410e89e",
    near_address:
      "2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near",
    name: "Wrapped BTC",
    symbol: "WBTC",
    decimals: 8,
    icon: "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Ccircle fill='%23201A2D' cx='16' cy='16' r='16'/%3E%3Cg fill='%23FFF'%3E%3Cpath d='M22.818 9.586l-.6.6a8.494 8.494 0 010 11.464l.6.6a9.352 9.352 0 000-12.678v.014zM10.2 9.638a8.494 8.494 0 0111.464 0l.6-.6a9.352 9.352 0 00-12.678 0l.614.6zm-.562 12.018a8.494 8.494 0 010-11.458l-.6-.6a9.352 9.352 0 000 12.678l.6-.62zm12.018.554a8.494 8.494 0 01-11.464 0l-.6.6a9.352 9.352 0 0012.678 0l-.614-.6zm-1.942-8.286c-.12-1.252-1.2-1.672-2.566-1.8V10.4h-1.056v1.692h-.844V10.4H14.2v1.736h-2.142v1.13s.78-.014.768 0a.546.546 0 01.6.464v4.752a.37.37 0 01-.128.258.366.366 0 01-.272.092c.014.012-.768 0-.768 0l-.2 1.262h2.122v1.764h1.056V20.12h.844v1.73h1.058v-1.744c1.784-.108 3.028-.548 3.184-2.218.126-1.344-.506-1.944-1.516-2.186.614-.302.994-.862.908-1.778zm-1.48 3.756c0 1.312-2.248 1.162-2.964 1.162v-2.328c.716.002 2.964-.204 2.964 1.166zm-.49-3.28c0 1.2-1.876 1.054-2.472 1.054v-2.116c.596 0 2.472-.188 2.472 1.062z'/%3E%3Cpath d='M15.924 26.852C9.89 26.851 5 21.959 5 15.925 5 9.892 9.892 5 15.925 5c6.034 0 10.926 4.89 10.927 10.924a10.926 10.926 0 01-10.928 10.928zm0-21c-5.559.004-10.062 4.513-10.06 10.072.002 5.559 4.51 10.064 10.068 10.064 5.559 0 10.066-4.505 10.068-10.064A10.068 10.068 0 0015.924 5.852z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
    reference: "",
    reference_hash: "",
  },
  {
    ethereum_address: "0xf5cfbc74057c610c8ef151a439252680ac68c6dc",
    aurora_address: "0x951cfdc9544b726872a8faf56792ef6704731aae",
    name: "Octopus Network Token",
    symbol: "OCT",
    near_address:
      "f5cfbc74057c610c8ef151a439252680ac68c6dc.factory.bridge.near",
    decimals: 18,
    icon: "data:image/svg+xml,%3Csvg version='1.1' id='O' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 113.39 113.39' style='enable-background:new 0 0 113.39 113.39;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23014299;%7D .st1%7Bfill:%23FFFFFF;%7D %3C/style%3E%3Ccircle class='st0' cx='56.69' cy='56.69' r='56.69'/%3E%3Cg%3E%3Cpath class='st1' d='M44.25,59.41c-1.43,0-2.59,1.16-2.59,2.59v20.28c0,1.43,1.16,2.59,2.59,2.59c1.43,0,2.59-1.16,2.59-2.59V62 C46.84,60.57,45.68,59.41,44.25,59.41z'/%3E%3Cpath class='st1' d='M56.69,59.41c-1.45,0-2.62,1.17-2.62,2.62v26.47c0,1.45,1.17,2.62,2.62,2.62s2.62-1.17,2.62-2.62V62.02 C59.31,60.58,58.14,59.41,56.69,59.41z'/%3E%3Cpath class='st1' d='M79.26,78.87c-0.33,0.15-0.64,0.28-0.95,0.38c0,0-0.01,0-0.01,0c-0.59,0.19-1.13,0.29-1.63,0.31h-0.06 c-1,0.03-1.84-0.27-2.59-0.75c-0.49-0.32-0.91-0.73-1.25-1.23c-0.3-0.43-0.53-0.93-0.71-1.51c0-0.01-0.01-0.02-0.01-0.03 c-0.22-0.74-0.34-1.61-0.34-2.59V62.02c0-1.45-1.17-2.62-2.62-2.62c-1.45,0-2.62,1.17-2.62,2.62v11.43c0,4.5,1.64,8.03,4.63,9.96 c1.5,0.97,3.21,1.45,5.04,1.45c1.68,0,3.45-0.41,5.25-1.22c1.32-0.59,1.9-2.14,1.31-3.46C82.13,78.86,80.57,78.27,79.26,78.87z'/%3E%3Cpath class='st1' d='M68.33,45.9c0-2.15-1.75-3.9-3.9-3.9c-2.15,0-3.9,1.75-3.9,3.9s1.75,3.9,3.9,3.9 C66.58,49.8,68.33,48.05,68.33,45.9z'/%3E%3Cpath class='st1' d='M48.96,41.99c-2.15,0-3.9,1.75-3.9,3.9s1.75,3.9,3.9,3.9s3.9-1.75,3.9-3.9S51.11,41.99,48.96,41.99z'/%3E%3Cpath class='st1' d='M56.69,22.28c-15.17,0-27.52,12.34-27.52,27.52v15.09c0,1.46,1.18,2.64,2.64,2.64s2.64-1.18,2.64-2.64V49.8 c0-12.26,9.98-22.24,22.24-22.24c12.26,0,22.24,9.98,22.24,22.24v15.09c0,1.46,1.18,2.64,2.64,2.64s2.64-1.18,2.64-2.64V49.8 C84.21,34.62,71.87,22.28,56.69,22.28z'/%3E%3C/g%3E%3C/svg%3E",
    reference: "",
    reference_hash: "",
  },
  {
    ethereum_address: "0x4691937a7508860f876c9c0a2a617e7d9e945d4b",
    near_address:
      "4691937a7508860f876c9c0a2a617e7d9e945d4b.factory.bridge.near",
    aurora_address: "0x99ec8f13b2afef5ec49073b9d20df109d25f78c0",
    name: "Wootrade Network",
    symbol: "WOO",
    decimals: 18,
    icon: "data:image/svg+xml,%3Csvg width='125' height='83' viewBox='0 0 125 83' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M102.422 0H122.958L113.203 30.9433H92.9243L102.422 0ZM75.982 29.4048L86.0788 53.3388L89.8436 41.0299H109.951L98.5713 78.0422C97.6301 80.9485 94.9776 82.9145 91.8972 82.9145H80.4314C77.6078 82.9145 75.0408 81.2049 73.9285 78.5551L61.2648 47.8682L48.8578 78.5551C47.831 81.2904 45.2641 83 42.3549 83H30.718C27.6376 83 24.9851 80.9485 24.0439 78.0422L0 5.85842e-05H20.1934L36.2797 53.3388L46.8898 29.3193C49.2857 23.3358 55.0185 19.4038 61.4359 19.4038C67.8533 19.4038 73.6718 23.3358 75.982 29.4048Z' fill='%2320252F'/%3E%3C/svg%3E",
    reference: "",
    reference_hash: "",
  },
];

const { accountId } = context;

const ethIcon =
  "https://ipfs.near.social/ipfs/bafkreicxwo5knrruycnmm4m3ays5qidadxsgxcpgrz3ijikvpzql7l7pee";

const nearIcon =
  "https://ipfs.near.social/ipfs/bafkreihnvs6cfknhtffsiloh5ea2qowajjcsndjh4by7bubbtyjia3yo6q";

const switchIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.0185 5.59976H0.981563C0.439 5.59976 4.29153e-05 5.20941 4.29153e-05 4.72692C4.29153e-05 4.24443 0.439 3.85408 0.981563 3.85408H10.6356L9.02696 2.4236C8.64254 2.08174 8.64254 1.52894 9.02696 1.1895C9.41139 0.84764 10.033 0.84764 10.4147 1.1895L13.6101 4.02865C13.8473 4.18867 14 4.44082 14 4.72692C14 5.20941 13.561 5.59976 13.0185 5.59976Z"
      fill="#787DA2"
    />
    <path
      d="M0.98152 9.33335H13.0184C13.561 9.33335 14 9.7237 14 10.2062C14 10.6887 13.561 11.079 13.0184 11.079H3.36443L4.97304 12.5095C5.35746 12.8514 5.35746 13.4042 4.97304 13.7436C4.58861 14.0855 3.96698 14.0855 3.58528 13.7436L0.389882 10.9045C0.152681 10.7444 0 10.4923 0 10.2062C0 9.7237 0.438958 9.33335 0.98152 9.33335Z"
      fill="#787DA2"
    />
  </svg>
);

const completeIconRight = (
  <svg
    width="14"
    height="11"
    viewBox="0 0 14 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 5.5H13M13 5.5L8.53125 1M13 5.5L8.53125 10" stroke="#979ABE" />
  </svg>
);

const SwitchWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  top: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 736px;
  color: #787da1;
  .new-transfer-title {
    display: flex;
    width: 100%;
    align-items: center;
    padding-bottom: 8px;
    justify-content: space-between;
    padding-left: 8px;
    .transfer-left {
      font-size: 18px;
      font-weight: 500;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: left;
      color: #787da1;
    }

    .transfer-right {
      font-size: 14px;
      font-weight: 400;
      line-height: 17px;
      letter-spacing: 0em;
      text-align: left;
      display: flex;
      align-items: center;
      color: #979abe;
    }
  }

  .bridge-title {
    color: #787da1;
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    padding-left: 8px;
    padding-bottom: 8px;
    padding-top: 8px;
  }

  .choose-bridge-wrapper {
    width: 100%;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #25283a;

    .choose-bridge-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

      .choose-bridge-box-select {
        display: flex;
        justify-content: space-between;
        padding: 8px;
        width: 313px;
        border-radius: 12px;
        background: #373a53;
        padding-top: 6px;
        .choose-bridge-box-select-name {
          font-size: 18px;
          font-weight: 500;
          line-height: 22px;
          letter-spacing: 0em;
          text-align: left;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 12px;
          .choose-bridge-box-icon {
            width: 36px;
            height: 36px;
            border-radius: 10px;
          }
        }

        /* button style here */
      }
    }
  }

  .choose-token-wrapper {
    background: #25283a;
    padding: 16px;
    padding-left: 20px;
    padding-right: 20px;
    width: 100%;
    border-radius: 12px;
    margin-top: 12px;

    .token-list-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
  }

  .input-wrapper {
    display: flex;
    align-items: center;

    .select-token {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 18px;
      font-weight: 500;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: left;

      .select-token-icon {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        background: white;
      }
    }
  }

  .price-and-balance-filed {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 8px;
    .balance-value {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .show-tokens-line {
    color: #787da1;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;

    padding-left: 8px;

    margin-bottom: 12px;

    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;

    .show-tokens-line-expand {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const Input = styled.input`
  background: none;
  color: white;
  text-align: left;
  border: none;
  outline: none;
  font-style: normal;
  font-size: 26px;
  line-height: 19px;
  padding: 8px 0px 8px 8px;
  width: 100%;
  font-size: 26px;
  font-weight: 500;
  line-height: 31px;
  letter-spacing: 0em;
  text-align: left;
  ::placeholder {
    color: #787da1;
  }
`;

const Separator = styled.div`
  width: 100%;
  background: #787da1;
  height: 1px;
  opacity: 0.5;
`;

const Button = styled.div`
  background: #00ffa3;
  width: 100%;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  height: 60px;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  margin-top: 26px;
`;

const Token = styled.div`
  opacity: ${(p) => (p.haveBalance ? "1" : "0.5")};
  width: max-content;
  height: 36px;
  color: white;
  border-radius: 23px;
  background: #373a53;
  border: 1px solid #787da1;
  display: flex;
  align-items: center;
  gap: 4px;
  padding-left: 2px;
  cursor: pointer;
  padding-right: 8px;
  :hover {
    background: #1e202f;
  }
  .token-icon {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background: white;
  }
`;

const sender = Ethers.send("eth_requestAccounts", [])[0];

const defaultToken = tokenList[0];

State.init({
  from: "eth",
  to: "near",
  selectToken: defaultToken,
  amount: "",
  onlyShowHasBalance: true,
  tab: "new-transfer",
  isApproved: true,
});

if (sender) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ selectedChainId: chainId });
    })
    .catch(() => {});
  State.update({ sender });
}

const bothConnected = accountId && !!state.sender;

const formatBalance = (balance) => {
  if (!balance) return "-";
  if (Number(balance) === 0) return "0";
  if (Number(balance) < 0.0001) return "<0.0001";

  return Big(balance).toFixed(4);
};

const config = {
  ethLockerAddress: "0x23ddd3e3692d1861ed57ede224608875809e127f",
  enearAddress: "0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4",
  etherCustodianAddress: "0x6BFaD42cFC4EfC96f529D786D643Ff4A8B89FA52",

  lockerAbi: [
    {
      inputs: [
        {
          internalType: "bytes",
          name: "nearTokenFactory",
          type: "bytes",
        },
        {
          internalType: "contract INearProver",
          name: "prover",
          type: "address",
        },
        {
          internalType: "uint64",
          name: "minBlockAcceptanceHeight",
          type: "uint64",
        },
        {
          internalType: "address",
          name: "_admin",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "pausedFlags",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "accountId",
          type: "string",
        },
      ],
      name: "Locked",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint128",
          name: "amount",
          type: "uint128",
        },
        {
          indexed: false,
          internalType: "address",
          name: "recipient",
          type: "address",
        },
      ],
      name: "Unlocked",
      type: "event",
    },
    {
      inputs: [],
      name: "admin",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "target",
          type: "address",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "adminDelegatecall",
      outputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "flags",
          type: "uint256",
        },
      ],
      name: "adminPause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "adminReceiveEth",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "destination",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "adminSendEth",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "key",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "adminSstore",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "contract IERC20",
          name: "token",
          type: "address",
        },
        {
          internalType: "address",
          name: "destination",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "adminTransfer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "ethToken",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "accountId",
          type: "string",
        },
      ],
      name: "lockToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "minBlockAcceptanceHeight_",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "nearTokenFactory_",
      outputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "paused",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "prover_",
      outputs: [
        {
          internalType: "contract INearProver",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_from",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_value",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes",
        },
      ],
      name: "tokenFallback",
      outputs: [],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes",
          name: "proofData",
          type: "bytes",
        },
        {
          internalType: "uint64",
          name: "proofBlockHeight",
          type: "uint64",
        },
      ],
      name: "unlockToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      name: "usedProofs_",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
};

const ethereumBox = (
  <div className="choose-bridge-box">
    <div className="choose-bridge-box-select">
      <div className="choose-bridge-box-select-name">
        <img className="choose-bridge-box-icon" src={ethIcon} />

        <span>Ethereum</span>
      </div>

      <Widget
        src="bluebiu.near/widget/RainbowBridge.Connect"
        props={{
          sourceBridge: "eth",
          sender: state.sender,
        }}
      />
    </div>
  </div>
);

const nearBox = (
  <div className="choose-bridge-box">
    <div className="choose-bridge-box-select">
      <div className="choose-bridge-box-select-name">
        <img className="choose-bridge-box-icon" src={nearIcon} />

        <span>NEAR</span>
      </div>

      <Widget
        src="bluebiu.near/widget/RainbowBridge.Connect"
        props={{
          sourceBridge: "near",
          sender: state.sender,
        }}
      />
    </div>
  </div>
);

const showTokensLine = (
  <div className="show-tokens-line">
    {state.onlyShowHasBalance
      ? "Showing tokens with balances"
      : "Showing all tokens"}

    <span
      className="show-tokens-line-expand"
      onClick={() => {
        State.update({
          onlyShowHasBalance: !state.onlyShowHasBalance,
        });
      }}
    >
      {state.onlyShowHasBalance
        ? "Show all tokens"
        : "Hide tokens without balances"}
    </span>
  </div>
);

const inputOnChange = (e) => {
  const targetValue = e.target.value;
  if (targetValue !== "" && !targetValue.match(/^\d*(\.\d*)?$/)) {
    return;
  }

  let amount = targetValue.replace(/^0+/, "0"); // remove prefix 0

  State.update({
    amount,
  });
};

const chainBalance =
  state.from === "near" ? state.nearBalance : state.ethBalance;

const insufficientBalance =
  chainBalance !== "" &&
  Big(chainBalance || 0).lt(state.amount || 0) &&
  !!state.sender &&
  Big(state.amount || 0).gt(0);

const canBridge =
  !!state.sender &&
  Big(chainBalance || 0).gte(state.amount || 0) &&
  Big(state.amount || 0).gt(0) &&
  !insufficientBalance;

const buttonText = insufficientBalance
  ? "Insufficient Balance"
  : !state.isApproved
  ? "Approve"
  : "Transfer";

const onButtonClick = () => {
  if (insufficientBalance) {
    return;
  }
  if (!state.isApproved) {
    state.handleApprove();
    return;
  }
  if (canBridge) {
    state.transfer && state.transfer();
    return;
  }
};

return (
  <Wrapper>
    <div className="new-transfer-title">
      <div className="transfer-left">New Transfer</div>

      <div
        className="transfer-right"
        onClick={() => {
          State.update({
            tab: "completed-transfers",
          });
        }}
      >
        <span>Completed Transfers</span>

        {completeIconRight}
      </div>
    </div>

    <div className="choose-bridge-wrapper ">
      <div>
        <div className="bridge-title">From</div>

        {state.from === "eth" ? ethereumBox : nearBox}
      </div>

      <SwitchWrapper
        onClick={() => {
          State.update({
            from: state.to,
            to: state.from,
          });
        }}
      >
        {switchIcon}
      </SwitchWrapper>

      <div>
        <div className="bridge-title">To</div>

        {state.from === "near" ? ethereumBox : nearBox}
      </div>
    </div>

    <div className="choose-token-wrapper">
      <div className="bridge-title">Choose token</div>

      {bothConnected && showTokensLine}

      <div className="token-list-wrapper">
        {tokenList.map((token) => {
          return (
            <Widget
              src="bluebiu.near/widget/RainbowBridge.TokenItem"
              props={{
                token,
                sender: state.sender,
                sourceBridge: state.from,
                selectToken: state.selectToken,
                bothConnected: bothConnected,
                onlyShowHasBalance: state.onlyShowHasBalance,
                onSelectToken: (data) => {
                  State.update({
                    nearBalance: data.nearBalance,
                    ethBalance: data.ethBalance,
                    selectToken: data.token,
                  });
                },
              }}
              key={token.ethereum_address + "-" + token.near_address}
            />
          );
        })}
      </div>

      <div
        className="bridge-title"
        style={{
          paddingTop: "24px",
        }}
      >
        Enter Amount
      </div>

      <div className="input-wrapper">
        <Input
          value={state.amount}
          onChange={inputOnChange}
          placeholder="0.0"
        />

        <div className="select-token">
          <img className="select-token-icon" src={state.selectToken.icon} />

          <span>{state.selectToken.symbol}</span>
        </div>
      </div>

      <Separator />

      {bothConnected && (
        <div className="price-and-balance-filed">
          <div className="price-filed">≈$</div>

          <div>
            Balance:{" "}
            <span
              className="balance-value"
              style={{
                textDecoration:
                  Number(
                    state.from === "near" ? state.nearBalance : state.ethBalance
                  ) === 0
                    ? "none"
                    : "underline",
              }}
              onClick={() => {
                if (
                  Number(
                    state.from === "near" ? state.nearBalance : state.ethBalance
                  ) === 0
                ) {
                  return;
                } else {
                  State.update({
                    amount:
                      state.from === "near"
                        ? state.nearBalance
                        : state.ethBalance,
                  });
                }
              }}
            >
              {state.from === "near"
                ? formatBalance(state.nearBalance)
                : formatBalance(state.ethBalance)}
            </span>
          </div>
        </div>
      )}

      <Button
        style={{
          background: insufficientBalance ? "#FF61D3" : "#00ffe0",
          cursor: !canBridge ? "not-allowed" : "pointer",
          opacity: !canBridge ? 0.5 : 1,
        }}
        disable={!canBridge}
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    </div>

    <Widget
      src="bluebiu.near/widget/RainbowBridge.getBalanceOnToken"
      props={{
        token: state.selectToken,
        sender: state.sender,
        forceReload: state.forceReload,
        onLoad: (data) => {
          console.log("data balance load: ", data);
          State.update({
            nearBalance: data.nearBalance,
            ethBalance: data.ethBalance,
          });
        },
      }}
    />

    <Widget
      src="bluebiu.near/widget/RainbowBridge.transfer"
      props={{
        token: state.selectToken,
        config,
        sender: state.sender,
        amountIn: state.amount,
        forceReload: state.forceReload,
        sourceBridge: state.from,
        callBack: () => {
          State.update({
            forceReload: !state.forceReload,
          });
        },
        loadTransder: (data) => {
          State.update({
            transfer: data.transfer,
          });
        },
      }}
    />

    {state.token && !state.nearBalance && !state.ethBalance && (
      <Widget
        src="bluebiu.near/widget/RainbowBridge.checkApprove"
        props={{
          token: state.selectToken,
          config,
          sender: state.sender,
          amountIn: state.amount,
          isApprovedOut: state.isApproved,
          forceReload: state.forceReload,
          sourceBridge: state.from,
          loadApprove: (data) => {
            State.update({
              isApproved: data.isApproved,
              forceReload: data.forceReload,
              handleApprove: data.handleApprove,
            });
          },
        }}
      />
    )}
  </Wrapper>
);
