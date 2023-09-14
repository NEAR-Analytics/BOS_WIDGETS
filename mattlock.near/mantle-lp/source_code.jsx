const MANTLE_CHAIN_ID = 5000;
const MANTLE_TESTNET_CHAIN_ID = 5001;

const logo = (
  <svg width="138" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50.9651 14.2402H46.124V25.7616H48.6206V16.7368H49.3386L53.3258 25.7616H56.0555L50.9651 14.2402Z"
      fill="white"
    ></path>
    <path
      d="M94.5403 25.7616H97.0369V14.2402H94.5403V25.7616Z"
      fill="white"
    ></path>
    <path
      d="M61.1452 14.2402L56.0553 25.7616H58.7845L62.7717 16.7368H63.4897V25.7616H65.9863V14.2402H61.1452Z"
      fill="white"
    ></path>
    <path
      d="M77.151 14.2402H72.5836L67.4933 25.7616H70.2229L71.8813 22.0075H77.8533L79.5117 25.7616H82.2413L77.151 14.2402ZM72.9844 19.5109L74.2101 16.7368H75.5245L76.7501 19.5109H72.9844Z"
      fill="white"
    ></path>
    <path
      d="M89.4501 14.2402H83.6848V25.7616H86.1814V16.7368H87.8236L91.8108 25.7616H94.5404L89.4501 14.2402Z"
      fill="white"
    ></path>
    <path
      d="M98.4236 14.2402V16.7368H104.249V25.7616H106.746V16.7368H112.571V14.2402H98.4236Z"
      fill="white"
    ></path>
    <path
      d="M116.455 14.2402H113.958V25.7616H124.823V23.265H116.455V14.2402Z"
      fill="white"
    ></path>
    <path
      d="M138 16.7368V14.2402H126.21V25.7616H138V23.265H128.707V21.0828H136.763V18.5862H128.707V16.7368H138Z"
      fill="white"
    ></path>
    <path
      d="M7.51717 14.5454L1.97885 11.7256C1.54564 12.5767 1.1767 13.4691 0.883118 14.378L6.79685 16.2902C6.99011 15.6924 7.23237 15.1057 7.51764 14.5458L7.51717 14.5454Z"
      fill="white"
    ></path>
    <path
      d="M12.2217 9.57576L15.2893 14.8612C15.7373 14.6014 16.2168 14.4016 16.7156 14.2675L15.128 8.36583C15.532 8.25718 15.9426 8.16749 16.3555 8.1023L15.3799 1.96387C14.4363 2.11366 13.4987 2.33975 12.5925 2.63518L14.4895 8.44905C13.8861 8.64601 13.2985 8.89058 12.7326 9.18001L9.94425 3.73739C9.09633 4.17198 8.27615 4.67685 7.50543 5.23952L11.1694 10.2596C11.5069 10.0136 11.8597 9.78567 12.2213 9.5753L12.2217 9.57576Z"
      fill="white"
    ></path>
    <path
      d="M28.683 13.9549L23.3994 17.0253C23.6597 17.4728 23.8594 17.9527 23.994 18.4507L29.8952 16.8602C30.0039 17.2643 30.0936 17.6744 30.1592 18.0868L36.2967 17.1094C36.1465 16.1663 35.9199 15.2282 35.6236 14.3216L29.8106 16.2222C29.6132 15.6189 29.3686 15.0317 29.0787 14.4658L34.5195 11.6738C34.0849 10.8268 33.5791 10.0066 33.0165 9.23633L27.9978 12.9027C28.2442 13.2402 28.4722 13.5925 28.6825 13.9545L28.683 13.9549Z"
      fill="white"
    ></path>
    <path
      d="M26.5284 3.71251C25.6763 3.27977 24.784 2.91128 23.876 2.61816L21.967 8.53283C22.5643 8.72562 23.1515 8.96788 23.7123 9.25268L26.5284 3.71205V3.71251Z"
      fill="white"
    ></path>
    <path
      d="M24.3216 9.46746L21.2189 14.8523C21.6683 15.1112 22.0825 15.4284 22.451 15.7954L31.1531 7.06377C30.4781 6.39107 29.7448 5.76646 28.9736 5.20703L25.3845 10.1568C25.0424 9.90899 24.6882 9.67828 24.3221 9.46699L24.3216 9.46746Z"
      fill="white"
    ></path>
    <path
      d="M7.73299 13.9354L13.1164 17.0414C13.3753 16.5925 13.6934 16.1778 14.061 15.8088L5.33301 7.10352C4.65985 7.77853 4.03477 8.51133 3.47534 9.28204L8.42326 12.8735C8.17545 13.2151 7.94428 13.5693 7.73299 13.9354Z"
      fill="white"
    ></path>
    <path
      d="M20.1462 7.99785L21.0852 1.95558C20.1573 1.81133 19.2077 1.73828 18.2622 1.73828H18.2479V14.066H18.2622C18.7819 14.066 19.296 14.1326 19.7907 14.2639L21.3848 8.25675C20.977 8.14857 20.5637 8.06304 20.1462 7.99785Z"
      fill="white"
    ></path>
    <path
      d="M12.5261 18.4684L6.51986 16.8701C6.41121 17.2779 6.32522 17.6912 6.26003 18.1087L0.218685 17.1669C0.0735114 18.0981 0 19.0514 0 19.9997H12.3277C12.3277 19.4791 12.3948 18.9636 12.5265 18.4684H12.5261Z"
      fill="white"
    ></path>
    <path
      d="M29.0074 25.4558L34.5457 28.2756C34.9789 27.4244 35.3478 26.5321 35.6414 25.6232L29.7277 23.7109C29.5344 24.3087 29.2922 24.8954 29.0069 25.4553L29.0074 25.4558Z"
      fill="white"
    ></path>
    <path
      d="M24.3026 30.4241L21.235 25.1387C20.787 25.3985 20.3076 25.5982 19.8087 25.7323L21.3964 31.634C20.9918 31.7427 20.5817 31.8324 20.1689 31.8976L21.1439 38.0355C22.0876 37.8857 23.0252 37.6596 23.9314 37.3642L22.0344 31.5503C22.6382 31.3534 23.2254 31.1088 23.7913 30.8194L26.5796 36.262C27.4275 35.8274 28.2477 35.3225 29.0184 34.7599L25.3544 29.7398C25.0169 29.9858 24.6642 30.2137 24.3026 30.4241Z"
      fill="white"
    ></path>
    <path
      d="M7.84183 26.0465L13.1259 22.9762C12.8656 22.5286 12.6658 22.0487 12.5313 21.5508L6.63005 23.1412C6.5214 22.7371 6.43171 22.327 6.36606 21.9146L0.228088 22.892C0.378348 23.8352 0.604892 24.7733 0.901249 25.6799L6.7142 23.7792C6.91161 24.3826 7.15619 24.9698 7.44608 25.5357L2.00531 28.3277C2.4399 29.1747 2.9457 29.9949 3.50836 30.7651L8.52702 27.0988C8.28059 26.7613 8.05266 26.409 7.8423 26.047L7.84183 26.0465Z"
      fill="white"
    ></path>
    <path
      d="M9.99615 36.2882C10.8482 36.721 11.7405 37.0894 12.6486 37.3826L14.5576 31.4679C13.9602 31.2751 13.3731 31.0328 12.8122 30.748L9.99615 36.2887V36.2882Z"
      fill="white"
    ></path>
    <path
      d="M12.2029 30.534L15.3057 25.1492C14.8563 24.8903 14.442 24.5731 14.0735 24.2061L5.37146 32.9377C6.04647 33.6104 6.77974 34.235 7.55091 34.7945L11.14 29.8447C11.4822 30.0925 11.8363 30.3232 12.2025 30.5345L12.2029 30.534Z"
      fill="white"
    ></path>
    <path
      d="M28.7914 26.0659L23.4079 22.96C23.149 23.4089 22.8309 23.8236 22.4634 24.1925L31.1909 32.8983C31.8641 32.2233 32.4891 31.4905 33.0486 30.7198L28.1006 27.1284C28.3485 26.7867 28.5796 26.4326 28.7909 26.0664L28.7914 26.0659Z"
      fill="white"
    ></path>
    <path
      d="M16.7338 25.7363L15.1397 31.7435C15.5475 31.8516 15.9608 31.9372 16.3783 32.0024L15.4398 38.0446C16.3677 38.1889 17.3173 38.2619 18.2628 38.2619H18.2771V25.9342H18.2628C17.7431 25.9342 17.229 25.8676 16.7343 25.7363H16.7338Z"
      fill="white"
    ></path>
    <path
      d="M24.1969 20.001C24.1969 20.5216 24.1299 21.0366 23.9981 21.5322L30.0043 23.1305C30.113 22.7227 30.199 22.3094 30.2641 21.8919L36.306 22.8342C36.4511 21.903 36.5246 20.9497 36.5246 20.0014H24.1969V20.001Z"
      fill="white"
    ></path>
  </svg>
);

const buttonStyled = `
  background: rgba(255, 255, 255, 0.5);
  border: none;
  border-radius: 24px;
  font-size: 0.8rem;
  text-transform: uppercase;
  list-style: none;
  color: white;
  &:hover {
  background: rgba(255, 255, 255, 0.8);
  }
  &:disabled {
    color: black;
    background: rgba(255, 255, 255, 0.25);
  }
`;

const Theme = styled.div`
  box-sizing: border-box;
  color: white;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  padding-top: 64px;
  padding-bottom: 64px;
  margin: 0 auto;
  background: rgb(0,0,0);
  background: linear-gradient(135deg, rgba(0,0,0,1) 50%, #06dd76 100%);

  .background {
    position:fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  > .logo-wrap {
    text-align: center;
    margin-bottom: 16px;
    > h1 {
      color: white;
      margin-top: 16px;
    }
    > h2 {
      color: rgba(255, 255, 255, 0.8);
      font-size: 1.4rem;
    }
  }
  

  @media only screen and (min-device-width: 375px) and (orientation: portrait) {
    padding: 16px;
    padding-top: 90px !important;
    min-height: 100vh !important;
    min-width: 100vw !important;
    overflow: hidden !important;
    overflow-y: scroll !important;
    background: black !important;
    .grid {
      flex-direction: row-reverse !important;
      flex-flow: wrap-reverse !important;
    }
  }


  @media only screen and (min-device-width: 375px) {
    .apps {
      max-width: 350px;
    }
  }
  
  .swap-main-column {
    padding-top: 0 !important;
    margin-top: -16px !important;
  }

  .bridge-abs {
    ${buttonStyled}
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99999;
  }

  .connect-web3 {
    background: white;
    color: #44F;
    border-color: white;
    &:hover {
      background: #ddd;
      border-color: #bbb;
      color: black;
      color: #00F;
    }
  }

  .grid {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex-flow: row wrap;
    width: 100%;
    min-width: 375px;
  }

  .logo-grid {
    text-align: center;
    position: relative;
    cursor: pointer;
    > .logo {
        display: flex;
        justify-content: center;
      > div {
          margin-right: 16px;
          line-height: 40px;
            font-weight: bold !important;
            font-size: 2.5rem !important;
            }
    }
    > .bridge-button {
      ${buttonStyled}
      padding: 6px 12px;
      &:disabled {
        opacity: 0 !important;
      }
    }
    > p {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 32px;
      margin-bottom: 64px;
    }
  }

  .center {
    > div {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-wrap: wrap;
    }
  }


  .apps {
    text-align: left;

    .grid {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-right: 16px;

      > .logo {
        width: 260px;
        height: 40px;
        margin: 0;

            > span {
            
            font-weight: bold !important;
            font-size: 2.5rem !important;
            }
      }

    }

    > div {
      display: flex;
      flex-wrap: wrap;
      
    > div {
      width: 150px;
      height: 150px;
      margin: 8px;
      margin-bottom: 64px;
      text-align: center;
      > img {
        width: 100px;
        border-radius: 50%;
      }
      >h1 {
        margin: 16px 0;
        font-size: 1rem;
      }
      > button {
        ${buttonStyled}
      }
    }
  }

  .component {
    margin-top: 1.5rem;
  }
`;

State.init({
  bridge: true,
  component: null,
});

const disableApps =
  state.sender === "" ||
  (state.chainId !== MANTLE_TESTNET_CHAIN_ID &&
    state.chainId !== MANTLE_CHAIN_ID);

console.log(state.chainId);

const sender = Ethers.send("eth_requestAccounts", [])[0] || "";

if (sender) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ chainId });
    });
}

if (state.sender === undefined) {
  State.update({ sender: Ethers.send("eth_requestAccounts", [])[0] || "" });
}

if (state.sender === "") {
  State.update({ sender: Ethers.send("eth_requestAccounts", [])[0] || "" });
}

const { bridge, component } = state;

const setComponent = (component) => {
  let update = { component, bridge: null };
  if (component === "bridge") update = { component: null, bridge: true };
  State.update(update);
};

if (bridge !== true && (state.sender === "" || disableApps)) {
  return (
    <Theme>
      <div className="logo-grid">
        <div className="logo">{logo}</div>
      </div>

      <div className="logo-wrap">
        <h1>Mass adoption of token-governed technologies.</h1>
        {!state.sender === undefined && (
          <Web3Connect
            connectLabel="Connect with Web3"
            className="connect-web3"
          />
        )}
      </div>
    </Theme>
  );
}

return (
  <Theme>
    <div className="background"></div>

    <div className="logo-grid" onClick={() => setComponent("bridge")}>
      <div className="logo">
        {!bridge && (
          <>
            <div>←</div>
          </>
        )}

        {logo}
      </div>
      {!bridge && <p>(back)</p>}
    </div>

    <div className="logo-wrap">
      {bridge && (
        <>
          <h1>Mass adoption of token-governed technologies.</h1>
        </>
      )}
    </div>

    <div className="grid">
      <div className="center">
        {bridge && (
          <div className="apps">
            {disableApps && (
              <p>
                To use apps, please switch to the Mantle Network using your
                wallet.
              </p>
            )}
            <div>
              <div>
                <img
                  src={
                    "https://assets.coingecko.com/coins/images/31588/large/lendle_logo_200_200_cg.png"
                  }
                />
                <h1>Lendle</h1>
                <button
                  disabled={disableApps || component === "lendle"}
                  onClick={() => setComponent("lendle")}
                >
                  Liquidity
                </button>
              </div>

              <div>
                <img
                  src={
                    "data:image/jpeg;base64,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"
                  }
                />
                <h1>FusionX</h1>
                <button
                  disabled={disableApps || component === "fusionx"}
                  onClick={() => setComponent("fusionx")}
                >
                  DEX
                </button>
              </div>

              <div>
                <img
                  src={
                    "https://logowik.com/content/uploads/images/agni4872.logowik.com.webp"
                  }
                  height="100"
                  style={{ objectFit: "contain", background: "white" }}
                />
                <h1>Agni</h1>
                <button
                  disabled={disableApps || component === "agni"}
                  onClick={() => setComponent("agni")}
                >
                  DEX
                </button>
              </div>

              <div>
                <img
                  src={
                    "https://assets.coingecko.com/markets/images/1247/large/iziswap.png?1692679139"
                  }
                />
                <h1>iziSwap</h1>
                <button
                  disabled={disableApps || component === "iziswap"}
                  onClick={() => setComponent("iziswap")}
                >
                  DEX
                </button>
              </div>

              <div>
                <img
                  src={
                    "data:image/svg+xml,%3Csvg width='48' height='48' data-testid='ammos-logo' class='_1g2fiy744p _1g2fiy74ej' viewBox='0 0 1080 1080' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M556.922 300.251C475.733 317.706 381.566 220.941 268.868 272.143C149.366 326.388 132.627 450.902 137.819 640.045C142.653 819.878 267.972 855.326 344.148 850.313C431.604 844.674 463.471 787.027 557.998 776.553C707.486 760.083 767.729 814.061 847.934 762.859C910.951 722.578 947.293 594.035 942.28 490.02C936.82 376.875 886.155 272.144 807.831 238.755C726.104 203.935 636.411 283.064 556.922 300.251Z' stroke='url(%23paint0_linear_1_51)' stroke-width='7.4028' stroke-miterlimit='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M556.058 312.403C478.969 328.976 389.556 237.098 282.549 285.714C169.082 337.22 153.188 455.447 158.117 635.039C162.707 805.791 281.698 839.449 354.028 834.69C437.067 829.335 467.325 774.599 557.079 764.654C699.019 749.016 756.22 800.268 832.374 751.651C892.21 713.404 926.716 591.352 921.957 492.59C916.772 385.157 868.666 285.715 794.297 254.013C716.697 220.95 631.533 296.084 556.058 312.403Z' stroke='url(%23paint1_linear_1_51)' stroke-width='7.40296' stroke-miterlimit='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M555.166 323.896C481.969 339.633 397.072 252.393 295.468 298.555C187.731 347.46 172.639 459.717 177.32 630.241C181.678 792.371 294.661 824.329 363.338 819.81C442.184 814.726 470.914 762.753 556.135 753.311C690.908 738.462 745.22 787.126 817.529 740.965C874.343 704.649 907.107 588.76 902.588 494.984C897.665 392.977 851.988 298.556 781.374 268.454C707.693 237.061 626.829 308.401 555.166 323.896Z' stroke='url(%23paint2_linear_1_51)' stroke-width='7.40037' stroke-miterlimit='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M554.421 334.839C484.92 349.781 404.31 266.947 307.836 310.778C205.539 357.214 191.21 463.802 195.654 625.715C199.792 779.658 307.07 810.003 372.279 805.712C447.144 800.884 474.423 751.536 555.341 742.571C683.308 728.472 734.879 774.679 803.536 730.848C857.482 696.366 888.591 586.329 884.3 497.288C879.626 400.432 836.256 310.779 769.207 282.197C699.246 252.389 622.466 320.127 554.421 334.839Z' stroke='url(%23paint3_linear_1_51)' stroke-width='7.40217' stroke-miterlimit='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M553.794 345.232C487.803 359.42 411.262 280.769 319.66 322.386C222.528 366.477 208.922 467.683 213.142 621.42C217.071 767.591 318.932 796.403 380.849 792.329C451.934 787.745 477.836 740.889 554.668 732.376C676.174 718.989 725.14 762.862 790.332 721.245C841.553 688.504 871.092 584.023 867.017 499.479C862.579 407.513 821.399 322.387 757.735 295.248C691.307 266.946 618.403 331.263 553.794 345.232Z' stroke='url(%23paint4_linear_1_51)' stroke-width='7.39947' stroke-miterlimit='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M553.011 355.103C490.352 368.574 417.677 293.894 330.701 333.41C238.474 375.275 225.555 471.371 229.562 617.345C233.292 756.134 330.009 783.492 388.8 779.623C456.295 775.271 480.889 730.78 553.841 722.698C669.211 709.986 715.705 751.645 777.604 712.129C826.239 681.041 854.286 581.836 850.417 501.561C846.203 414.239 807.102 333.411 746.654 307.643C683.58 280.769 614.358 341.839 553.011 355.103Z' stroke='url(%23paint5_linear_1_51)' stroke-width='7.39888' stroke-miterlimit='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M552.36 364.429C492.865 377.22 423.859 306.311 341.275 343.831C253.705 383.582 241.438 474.825 245.243 613.428C248.785 745.21 340.618 771.186 396.44 767.512C460.527 763.38 483.879 721.136 553.148 713.461C662.692 701.392 706.838 740.947 765.612 703.426C811.791 673.908 838.422 579.713 834.748 503.491C830.747 420.578 793.621 343.832 736.224 319.365C676.336 293.849 610.609 351.834 552.36 364.429Z' stroke='url(%23paint6_linear_1_51)' stroke-width='7.39916' stroke-miterlimit='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M551.772 373.297C495.281 385.442 429.759 318.114 351.345 353.74C268.196 391.483 256.549 478.119 260.161 609.724C263.525 734.851 350.721 759.515 403.725 756.027C464.575 752.103 486.749 711.993 552.52 704.706C656.533 693.246 698.45 730.803 754.256 695.177C798.103 667.15 823.389 577.71 819.901 505.337C816.102 426.611 780.85 353.741 726.352 330.509C669.488 306.281 607.079 361.339 551.772 373.297Z' stroke='url(%23paint7_linear_1_51)' stroke-width='7.39925' stroke-miterlimit='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M551.188 381.733C497.55 393.265 435.337 329.336 360.881 363.163C281.932 399.001 270.873 481.263 274.303 606.222C277.496 725.03 360.29 748.449 410.617 745.137C468.395 741.412 489.448 703.327 551.898 696.407C650.66 685.526 690.46 721.187 743.448 687.36C785.081 660.748 809.091 575.825 805.779 507.106C802.171 432.355 768.699 363.164 716.953 341.106C662.96 318.101 603.703 370.379 551.188 381.733Z' stroke='url(%23paint8_linear_1_51)' stroke-width='7.3982' stroke-miterlimit='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M550.548 389.786C499.618 400.736 440.547 340.035 369.851 372.154C294.888 406.182 284.388 484.29 287.644 602.939C290.677 715.748 369.29 737.985 417.075 734.84C471.935 731.303 491.926 695.141 551.222 688.571C644.996 678.239 682.787 712.099 733.099 679.98C772.63 654.712 795.427 574.077 792.282 508.828C788.857 437.852 757.075 372.155 707.942 351.21C656.676 329.367 600.411 379.005 550.548 389.786Z' stroke='url(%23paint9_linear_1_51)' stroke-width='7.40084' stroke-miterlimit='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M550.049 397.387C501.691 407.784 445.602 350.148 378.476 380.645C307.298 412.955 297.328 487.119 300.42 599.777C303.299 706.89 377.943 728.003 423.315 725.017C475.406 721.658 494.387 687.322 550.689 681.084C639.728 671.274 675.611 703.425 723.382 672.927C760.917 648.935 782.563 572.372 779.577 510.418C776.325 443.026 746.148 380.646 699.496 360.759C650.818 340.019 597.394 387.15 550.049 397.387Z' stroke='url(%23paint10_linear_1_51)' stroke-width='7.40035' stroke-miterlimit='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M549.485 404.59C503.569 414.461 450.313 359.736 386.576 388.693C318.993 419.372 309.526 489.79 312.462 596.759C315.196 698.464 386.07 718.511 429.151 715.676C478.611 712.487 496.634 679.885 550.093 673.962C634.636 664.647 668.707 695.174 714.066 666.217C749.706 643.436 770.258 570.739 767.423 511.913C764.335 447.924 735.682 388.694 691.386 369.811C645.166 350.118 594.44 394.87 549.485 404.59Z' stroke='url(%23paint11_linear_1_51)' stroke-width='7.40129' stroke-miterlimit='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M549.009 411.448C505.411 420.821 454.844 368.859 394.326 396.354C330.155 425.483 321.166 492.346 323.954 593.914C326.55 690.483 393.845 709.518 434.751 706.826C481.714 703.798 498.826 672.842 549.586 667.218C629.86 658.373 662.21 687.359 705.279 659.864C739.119 638.233 758.634 569.207 755.942 513.352C753.01 452.594 725.804 396.355 683.744 378.425C639.858 359.727 591.693 402.219 549.009 411.448Z' stroke='url(%23paint12_linear_1_51)' stroke-width='7.39768' stroke-miterlimit='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M548.55 417.947C507.154 426.846 459.14 377.509 401.678 403.615C340.748 431.273 332.213 494.76 334.86 591.199C337.324 682.892 401.222 700.966 440.062 698.41C484.653 695.534 500.902 666.141 549.098 660.801C625.319 652.403 656.035 679.925 696.929 653.819C729.061 633.28 747.59 567.74 745.034 514.705C742.25 457.015 716.418 403.616 676.482 386.592C634.812 368.837 589.079 409.183 548.55 417.947Z' stroke='url(%23paint13_linear_1_51)' stroke-width='7.39839' stroke-miterlimit='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M548.096 424.137C508.79 432.588 463.201 385.741 408.641 410.53C350.787 436.791 342.683 497.072 345.196 588.642C347.536 675.704 408.207 692.865 445.086 690.439C487.426 687.708 502.854 659.8 548.617 654.729C620.988 646.755 650.154 672.888 688.983 648.099C719.492 628.598 737.086 566.367 734.659 516.01C732.015 461.233 707.487 410.53 669.568 394.366C630.002 377.508 586.579 415.817 548.096 424.137Z' stroke='url(%23paint14_linear_1_51)' stroke-width='7.40183' stroke-miterlimit='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M547.656 430.006C510.335 438.03 467.047 393.549 415.242 417.086C360.31 442.021 352.615 499.258 355.001 586.204C357.223 668.87 414.831 685.165 449.847 682.861C490.049 680.269 504.698 653.769 548.15 648.955C616.867 641.383 644.56 666.196 681.429 642.66C710.397 624.143 727.102 565.054 724.798 517.24C722.288 465.229 698.998 417.086 662.994 401.738C625.426 385.732 584.195 422.106 547.656 430.006Z' stroke='url(%23paint15_linear_1_51)' stroke-width='7.39841' stroke-miterlimit='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M547.306 435.573C511.87 443.192 470.768 400.957 421.579 423.305C369.42 446.981 362.114 501.328 364.38 583.883C366.49 662.375 421.188 677.847 454.437 675.659C492.608 673.198 506.517 648.037 547.776 643.465C613.023 636.276 639.317 659.836 674.324 637.488C701.83 619.907 717.691 563.801 715.504 518.402C713.12 469.017 691.007 423.305 656.82 408.732C621.149 393.534 582.001 428.072 547.306 435.573Z' stroke='url(%23paint16_linear_1_51)' stroke-width='7.3999' stroke-miterlimit='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M546.922 440.862C513.275 448.096 474.249 407.993 427.544 429.213C378.019 451.694 371.081 503.296 373.233 581.683C375.236 656.211 427.172 670.902 458.742 668.825C494.986 666.487 508.193 642.597 547.368 638.256C609.321 631.43 634.287 653.8 667.526 632.581C693.643 615.887 708.704 562.615 706.626 519.508C704.364 472.617 683.367 429.213 650.907 415.376C617.037 400.945 579.865 433.739 546.922 440.862Z' stroke='url(%23paint17_linear_1_51)' stroke-width='7.40092' stroke-miterlimit='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M546.563 445.9C514.614 452.769 477.559 414.691 433.212 434.839C386.188 456.185 379.6 505.182 381.643 579.611C383.546 650.376 432.859 664.325 462.835 662.352C497.249 660.133 509.789 637.449 546.986 633.327C605.81 626.846 629.516 648.087 661.077 627.938C685.874 612.088 700.175 561.505 698.202 520.575C696.054 476.052 676.117 434.84 645.296 421.701C613.136 407.999 577.842 439.137 546.563 445.9Z' stroke='url(%23paint18_linear_1_51)' stroke-width='7.40059' stroke-miterlimit='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M546.224 450.676C515.889 457.198 480.705 421.043 438.597 440.174C393.948 460.442 387.693 506.965 389.633 577.635C391.439 644.827 438.263 658.071 466.725 656.198C499.401 654.091 511.308 632.552 546.626 628.639C602.48 622.485 624.989 642.653 654.956 623.522C678.502 608.472 692.08 560.444 690.207 521.58C688.167 479.305 669.237 440.174 639.972 427.699C609.437 414.689 575.924 444.254 546.224 450.676Z' stroke='url(%23paint19_linear_1_51)' stroke-width='7.40148' stroke-miterlimit='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_1_51' x1='137.013' y1='540.327' x2='925.337' y2='540.327' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.16' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.33' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.62' stop-color='%23EDF6FA'%3E%3C/stop%3E%3Cstop offset='1' stop-color='white'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_1_51' x1='157.352' y1='540.356' x2='905.869' y2='540.356' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.16' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.33' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.62' stop-color='%23EDF6FA'%3E%3C/stop%3E%3Cstop offset='1' stop-color='white'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='paint2_linear_1_51' x1='176.594' y1='540.339' x2='887.313' y2='540.339' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.16' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.33' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.62' stop-color='%23EDF6FA'%3E%3C/stop%3E%3Cstop offset='1' stop-color='white'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='paint3_linear_1_51' x1='194.964' y1='540.353' x2='869.796' y2='540.353' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.16' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.33' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.62' stop-color='%23EDF6FA'%3E%3C/stop%3E%3Cstop offset='1' stop-color='white'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='paint4_linear_1_51' x1='212.487' y1='540.369' x2='853.246' y2='540.369' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.16' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.33' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.62' stop-color='%23EDF6FA'%3E%3C/stop%3E%3Cstop offset='1' stop-color='white'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='paint5_linear_1_51' x1='228.94' y1='540.386' x2='837.341' y2='540.386' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.16' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.33' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.62' stop-color='%23EDF6FA'%3E%3C/stop%3E%3Cstop offset='1' stop-color='white'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='paint6_linear_1_51' x1='244.652' y1='540.356' x2='822.332' y2='540.356' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.16' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.33' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.62' stop-color='%23EDF6FA'%3E%3C/stop%3E%3Cstop offset='1' stop-color='white'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='paint7_linear_1_51' x1='259.601' y1='540.341' x2='808.112' y2='540.341' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.16' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.33' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.62' stop-color='%23EDF6FA'%3E%3C/stop%3E%3Cstop offset='1' stop-color='white'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='paint8_linear_1_51' x1='273.77' y1='540.342' x2='794.585' y2='540.342' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.16' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.33' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.62' stop-color='%23EDF6FA'%3E%3C/stop%3E%3Cstop offset='1' stop-color='white'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='paint9_linear_1_51' x1='287.139' y1='540.386' x2='781.654' y2='540.386' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.16' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.33' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.62' stop-color='%23EDF6FA'%3E%3C/stop%3E%3Cstop offset='1' stop-color='white'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='paint10_linear_1_51' x1='299.94' y1='540.382' x2='769.486' y2='540.382' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.16' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.33' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.62' stop-color='%23EDF6FA'%3E%3C/stop%3E%3Cstop offset='1' stop-color='white'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='paint11_linear_1_51' x1='312.006' y1='540.364' x2='757.841' y2='540.364' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.16' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.33' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.62' stop-color='%23EDF6FA'%3E%3C/stop%3E%3Cstop offset='1' stop-color='white'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='paint12_linear_1_51' x1='323.522' y1='540.367' x2='746.844' y2='540.367' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.16' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.33' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.62' stop-color='%23EDF6FA'%3E%3C/stop%3E%3Cstop offset='1' stop-color='white'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='paint13_linear_1_51' x1='334.449' y1='540.356' x2='736.395' y2='540.356' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.16' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.33' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.62' stop-color='%23EDF6FA'%3E%3C/stop%3E%3Cstop offset='1' stop-color='white'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='paint14_linear_1_51' x1='344.806' y1='540.365' x2='726.456' y2='540.365' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.16' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.33' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.62' stop-color='%23EDF6FA'%3E%3C/stop%3E%3Cstop offset='1' stop-color='white'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='paint15_linear_1_51' x1='354.631' y1='540.365' x2='717.009' y2='540.365' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.16' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.33' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.62' stop-color='%23EDF6FA'%3E%3C/stop%3E%3Cstop offset='1' stop-color='white'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='paint16_linear_1_51' x1='364.028' y1='540.359' x2='708.108' y2='540.359' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.16' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.33' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.62' stop-color='%23EDF6FA'%3E%3C/stop%3E%3Cstop offset='1' stop-color='white'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='paint17_linear_1_51' x1='372.899' y1='540.357' x2='699.605' y2='540.357' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.16' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.33' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.62' stop-color='%23EDF6FA'%3E%3C/stop%3E%3Cstop offset='1' stop-color='white'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='paint18_linear_1_51' x1='381.326' y1='540.371' x2='691.535' y2='540.371' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.16' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.33' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.62' stop-color='%23EDF6FA'%3E%3C/stop%3E%3Cstop offset='1' stop-color='white'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='paint19_linear_1_51' x1='389.332' y1='540.377' x2='683.877' y2='540.377' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.16' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.33' stop-color='white'%3E%3C/stop%3E%3Cstop offset='0.62' stop-color='%23EDF6FA'%3E%3C/stop%3E%3Cstop offset='1' stop-color='white'%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E"
                  }
                />
                <h1>Ammos</h1>
                <button
                  disabled={disableApps || component === "ammos"}
                  onClick={() => setComponent("ammos")}
                >
                  DEX
                </button>
              </div>

              <div>
                <img
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRcJGhRizkHQnODjAVYk5JoUVXFOSW8pWgGAZnDHzaSQ&s"
                  }
                  height="100"
                  style={{ objectFit: "contain" }}
                />
                <h1>Pendle</h1>
                <button
                  disabled={true || disableApps || component === "pendle"}
                  onClick={() => setComponent("pendle")}
                >
                  Yield
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="component">
        <div className="center">
          {bridge === true && component === null ? (
            <Widget src="ciocan.near/widget/op-stack-mantle-bridge" />
          ) : (
            <>
              {component === "lendle" && (
                <Widget src="lendle.near/widget/Lendle" />
              )}

              {component === "fusionx" && (
                <Widget
                  src="zavodil.near/widget/swap-mantle"
                  props={{
                    dex: "FusionX V3",
                  }}
                />
              )}

              {component === "agni" && (
                <Widget
                  src="zavodil.near/widget/swap-mantle"
                  props={{
                    dex: "Agni",
                  }}
                />
              )}

              {component === "iziswap" && (
                <Widget
                  src="zavodil.near/widget/swap-mantle"
                  props={{
                    dex: "iZiSwap",
                  }}
                />
              )}

              {component === "ammos" && (
                <Widget
                  src="zavodil.near/widget/swap-mantle"
                  props={{
                    dex: "Ammos Finance",
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  </Theme>
);
