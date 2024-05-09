// LAYOUT

const DaisyUIWrapper = ({ children }) => {
  return (
    <Widget
      src="igris.near/widget/DaisyUIWrapper"
      props={{
        children,
        daisyUiTheme: "forest",
      }}
    />
  );
};

// TOAST

const Toast = () => {
  return (
    <Widget
      src="near/widget/DIG.Toast"
      props={{
        title: state.titleToast,
        description: state.descriptionToast,
        type: state.typeToast,
        open: state.openToast,
        onOpenChange: (value) => State.update({ openToast: value }),
        providerProps: { duration: 3000 },
      }}
    />
  );
};

// ASSETS

const IconETH = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24.002"
      viewBox="0 0 24 24.002"
      width="24"
    >
      <path d="m0 .003h24v24h-24z" fill="none" />
      <path
        d="m23.64 14.905a12 12 0 1 1 -8.74-14.545 12 12 0 0 1 8.74 14.545z"
        fill="#fff"
        transform="translate(0 -.001)"
      />
      <g transform="translate(6.858 3.628)">
        <path
          d="m383.612 0-.112.382v11.075l.112.112 5.141-3.039z"
          fill="#343434"
          transform="translate(-378.471)"
        />
        <path d="m5.141 0-5.141 8.53 5.141 3.039z" fill="#8c8c8c" />
        <path
          d="m387.3 727.927-.063.077v3.945l.063.185 5.144-7.245z"
          fill="#3c3c3b"
          transform="translate(-382.162 -715.385)"
        />
        <path
          d="m5.141 732.135v-4.207l-5.141-3.038z"
          fill="#8c8c8c"
          transform="translate(0 -715.385)"
        />
        <path
          d="m392.07 477.706 5.141-3.039-5.141-2.337z"
          fill="#141414"
          transform="translate(-386.929 -466.137)"
        />
        <path
          d="m0 474.667 5.141 3.039v-5.376z"
          fill="#393939"
          transform="translate(0 -466.137)"
        />
      </g>
    </svg>
  );
};

const IconUSDC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clip-path="url(#clip0_18_305)">
        <path
          d="M12 24.375C14.3734 24.375 16.6935 23.6712 18.6669 22.3526C20.6403 21.0341 22.1783 19.1599 23.0866 16.9672C23.9948 14.7745 24.2325 12.3617 23.7695 10.0339C23.3064 7.70615 22.1635 5.56795 20.4853 3.88972C18.8071 2.21149 16.6689 1.0686 14.3411 0.605582C12.0133 0.142559 9.60055 0.380199 7.40783 1.28845C5.21512 2.1967 3.34098 3.73477 2.0224 5.70816C0.703823 7.68155 3.47299e-05 10.0016 3.47299e-05 12.375C-0.00376359 13.9519 0.304033 15.5141 0.905744 16.9717C1.50746 18.4293 2.39122 19.7537 3.50628 20.8688C4.62134 21.9838 5.94572 22.8676 7.40334 23.4693C8.86097 24.071 10.4231 24.3788 12 24.375Z"
          fill="#2775CA"
        />
        <path
          d="M15.2995 14.2754C15.2995 12.5252 14.2495 11.9252 12.1495 11.6756C10.6495 11.4758 10.3495 11.0756 10.3495 10.3754C10.3495 9.67516 10.8493 9.22516 11.8495 9.22516C12.7495 9.22516 13.2493 9.52516 13.4995 10.2752C13.5253 10.3476 13.5726 10.4104 13.6351 10.4552C13.6977 10.4999 13.7724 10.5244 13.8493 10.5254H14.6491C14.6953 10.5264 14.7413 10.5181 14.7842 10.5009C14.8272 10.4837 14.8661 10.458 14.8988 10.4253C14.9315 10.3926 14.9573 10.3536 14.9745 10.3107C14.9917 10.2677 15 10.2218 14.9989 10.1756V10.1258C14.9022 9.58385 14.6292 9.08908 14.2223 8.71833C13.8154 8.34757 13.2975 8.1216 12.7489 8.07556V6.87556C12.7489 6.67576 12.5989 6.52574 12.3487 6.47534H11.5987C11.3989 6.47534 11.2489 6.62536 11.1985 6.87556V8.02575C9.69853 8.22555 8.74872 9.22576 8.74872 10.4756C8.74872 12.1256 9.74892 12.7754 11.8489 13.0256C13.2487 13.2758 13.6987 13.5758 13.6987 14.3756C13.6987 15.1754 12.9985 15.7256 12.0487 15.7256C10.7485 15.7256 10.2985 15.1754 10.1485 14.4254C10.1335 14.3428 10.0906 14.2679 10.0269 14.2133C9.96317 14.1586 9.88261 14.1276 9.79872 14.1254H8.94853C8.9023 14.1243 8.85632 14.1326 8.8134 14.1498C8.77047 14.167 8.73151 14.1927 8.69881 14.2254C8.66611 14.2581 8.64039 14.2971 8.62319 14.34C8.60599 14.383 8.59766 14.4289 8.59872 14.4752V14.5249C8.79852 15.7747 9.59892 16.6747 11.2489 16.9249V18.1249C11.2489 18.3247 11.3989 18.4748 11.6491 18.5252H12.3973C12.5971 18.5252 12.7471 18.3751 12.7975 18.1249V16.9249C14.2975 16.6747 15.2977 15.6247 15.2977 14.2747L15.2995 14.2754Z"
          fill="white"
        />
        <path
          d="M9.44988 19.5246C8.01084 18.9973 6.76846 18.0407 5.89077 16.7843C5.01308 15.5278 4.54242 14.0322 4.54242 12.4995C4.54242 10.9669 5.01308 9.47126 5.89077 8.21483C6.76846 6.9584 8.01084 6.00181 9.44988 5.47444C9.54566 5.43269 9.62603 5.36212 9.6798 5.27253C9.73358 5.18294 9.75808 5.0788 9.74988 4.97463V4.27444C9.75682 4.18271 9.73022 4.09158 9.67504 4.01798C9.61987 3.94438 9.53987 3.89331 9.44988 3.87424C9.37949 3.86675 9.30871 3.8844 9.25007 3.92405C7.43105 4.50388 5.84355 5.64713 4.71704 7.18856C3.59054 8.73 2.9834 10.5897 2.9834 12.4989C2.9834 14.4081 3.59054 16.2679 4.71704 17.8093C5.84355 19.3507 7.43105 20.494 9.25007 21.0738C9.29163 21.0979 9.33829 21.1118 9.38625 21.1144C9.43421 21.1169 9.4821 21.1081 9.526 21.0886C9.56989 21.0692 9.60855 21.0395 9.63881 21.0022C9.66906 20.9649 9.69006 20.921 9.70007 20.874C9.74987 20.8242 9.74988 20.7738 9.74988 20.6742V19.9728C9.73389 19.8813 9.69893 19.7942 9.64727 19.717C9.5956 19.6398 9.52837 19.5743 9.44988 19.5246ZM14.7497 3.92463C14.7081 3.90056 14.6614 3.88667 14.6135 3.88409C14.5655 3.88152 14.5176 3.89035 14.4737 3.90984C14.4298 3.92933 14.3912 3.95893 14.3609 3.99623C14.3307 4.03353 14.3097 4.07747 14.2997 4.12444C14.2499 4.17424 14.2499 4.22464 14.2499 4.32424V5.02444C14.2585 5.1251 14.29 5.22246 14.342 5.30908C14.394 5.3957 14.4651 5.4693 14.5499 5.52424C15.9889 6.05162 17.2313 7.00819 18.109 8.26462C18.9867 9.52105 19.4573 11.0167 19.4573 12.5493C19.4573 14.082 18.9867 15.5776 18.109 16.834C17.2313 18.0905 15.9889 19.0471 14.5499 19.5744C14.4541 19.6162 14.3737 19.6868 14.3199 19.7764C14.2662 19.8659 14.2417 19.9701 14.2499 20.0742V20.7744C14.2429 20.8662 14.2695 20.9573 14.3247 21.0309C14.3799 21.1045 14.4599 21.1556 14.5499 21.1746C14.6203 21.1821 14.691 21.1645 14.7497 21.1248C16.5692 20.5382 18.1558 19.3897 19.2812 17.8443C20.4067 16.299 21.013 14.4365 21.013 12.5247C21.013 10.613 20.4067 8.75052 19.2812 7.20517C18.1558 5.65982 16.5692 4.51124 14.7497 3.92463Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_18_305">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.375)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const IconWBTC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clip-path="url(#clip0_175_4972)">
        <path
          d="M24.1427 14.9023C23.5687 17.2049 22.3247 19.2855 20.5679 20.8811C18.8112 22.4768 16.6207 23.5157 14.2734 23.8666C11.9261 24.2174 9.5274 23.8645 7.38073 22.8523C5.23405 21.8402 3.43577 20.2143 2.21329 18.1803C0.990817 16.1463 0.399049 13.7956 0.512823 11.4253C0.626598 9.05502 1.4408 6.77172 2.85248 4.86412C4.26416 2.95651 6.2099 1.5103 8.44365 0.708347C10.6774 -0.0936015 13.0988 -0.215262 15.4017 0.35875C18.4896 1.12868 21.1451 3.09343 22.7841 5.82084C24.4232 8.54825 24.9115 11.8149 24.1417 14.9023H24.1427Z"
          fill="#F7931A"
        />
        <path
          d="M17.6147 10.3273C17.8467 8.78452 16.6667 7.95567 15.0527 7.40276L15.5767 5.31315L14.2987 4.99618L13.7887 7.03082C13.4527 6.94783 13.1077 6.86885 12.7647 6.79087L13.2777 4.74323L12.0007 4.42627L11.4767 6.51491C11.1987 6.45192 10.9257 6.38995 10.6607 6.32396V6.31695L8.8977 5.87903L8.55768 7.23781C8.55768 7.23781 9.50566 7.45376 9.48566 7.46775C9.66299 7.48717 9.82551 7.57575 9.93787 7.7143C10.0502 7.85284 10.1034 8.03013 10.0857 8.20762L9.48566 10.5883C9.53088 10.5993 9.57537 10.6133 9.61871 10.6303L9.4837 10.5972L8.6477 13.9317C8.62898 13.9899 8.59893 14.0438 8.55933 14.0904C8.51973 14.137 8.47136 14.1753 8.41693 14.2032C8.3625 14.2311 8.30308 14.2479 8.24213 14.2528C8.18117 14.2577 8.11988 14.2505 8.06171 14.2316C8.07471 14.2506 7.13269 14.0007 7.13269 14.0007L6.49768 15.4564L8.16168 15.8694C8.47068 15.9464 8.77469 16.0274 9.07269 16.1033L8.5437 18.217L9.82068 18.5339L10.3447 16.4432C10.6937 16.5372 11.0317 16.6242 11.3637 16.7062L10.8417 18.7869L12.1197 19.1038L12.6487 16.9942C14.8287 17.4051 16.4677 17.2392 17.1577 15.2775C17.2987 15.0004 17.3801 14.6969 17.3967 14.3865C17.4133 14.0761 17.3647 13.7657 17.2541 13.4752C17.1436 13.1847 16.9734 12.9205 16.7546 12.6997C16.5358 12.4788 16.2732 12.3062 15.9837 12.193C16.4238 12.1055 16.8226 11.8749 17.1178 11.537C17.413 11.1992 17.5881 10.7731 17.6157 10.3253L17.6147 10.3273ZM14.6937 14.4016C14.2937 15.9813 11.6257 15.1275 10.7597 14.9135L11.4597 12.114C12.3267 12.329 15.1047 12.7549 14.6917 14.4026L14.6937 14.4016ZM15.0937 10.3023C14.7337 11.7391 12.5087 11.0092 11.7877 10.8302L12.4237 8.29062C13.1457 8.46959 15.4687 8.80355 15.0937 10.3023Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_175_4972">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.501709)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const IconZLP = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      viewBox="0 0 100 100"
      fill="none"
    >
      <g clip-path="url(#clip0_252_8935)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M50 88C70.9868 88 88 70.9868 88 50C88 29.0132 70.9868 12 50 12C29.0132 12 12 29.0132 12 50C12 70.9868 29.0132 88 50 88ZM80 65.8182L50 88L20 65.8182V27L35 38.0909V57.5L50 68.5909L65 57.5V38.0909L80 27V65.8182ZM50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100ZM50 24L60 41.5L50 59L40 41.5L50 24Z"
          fill="#ADADAD"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M50 88C70.9868 88 88 70.9868 88 50C88 29.0132 70.9868 12 50 12C29.0132 12 12 29.0132 12 50C12 70.9868 29.0132 88 50 88ZM80 65.8182L50 88L20 65.8182V27L35 38.0909V57.5L50 68.5909L65 57.5V38.0909L80 27V65.8182ZM50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100ZM50 24L60 41.5L50 59L40 41.5L50 24Z"
          fill="url(#paint0_linear_252_8935)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_252_8935"
          x1="80"
          y1="8.7"
          x2="22.5"
          y2="91"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.296875" stop-color="#43F574" />
          <stop offset="1" stop-color="#2F0461" />
        </linearGradient>
        <clipPath id="clip0_252_8935">
          <rect width="100" height="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const LogoZkEra = () => {
  return (
    <svg
      width="85"
      height="31"
      viewBox="0 0 85 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_257_433)">
        <path d="M14 14V0.5L11 10L6 14H14Z" fill="#ADADAD" />
        <path
          d="M14 14V0.5L11 10L6 14H14Z"
          fill="url(#paint0_linear_257_433)"
        />
        <path d="M16 16.5V29.5L19 20.5L24 16.5H16Z" fill="#ADADAD" />
        <path
          d="M16 16.5V29.5L19 20.5L24 16.5H16Z"
          fill="url(#paint1_linear_257_433)"
        />
        <path d="M19 11L16 0.5L17 13L24 14L19 11Z" fill="#ADADAD" />
        <path
          d="M19 11L16 0.5L17 13L24 14L19 11Z"
          fill="url(#paint2_linear_257_433)"
        />
        <path
          d="M11 19L14 29.5L13 17L6 16L11 19Z"
          fill="url(#paint3_linear_257_433)"
        />
      </g>
      <g clip-path="url(#clip1_257_433)">
        <path
          d="M36.3401 13.583H32.2106V10.8296H39.7884V13.4361L35.2402 21.3072H39.7884V24.0606H32V21.454L36.3401 13.583Z"
          fill="white"
        />
        <path
          d="M45.3402 15.7735H45.3897L48.1865 10.7341H51.9692L48.7736 16.0451L52.6455 24.0631H48.8628L46.2469 19.031L45.3402 20.2009V24.0631H41.9043V10.7341H45.3402V15.7735Z"
          fill="white"
        />
        <path
          d="M75.0168 14.5669C75.0168 13.7959 75.1407 13.1522 75.3909 12.6358C75.6411 12.1194 75.9755 11.7009 76.3991 11.3827C76.8228 11.0621 77.3206 10.8345 77.8929 10.695C78.4651 10.5555 79.0746 10.4869 79.7235 10.4869C80.7516 10.4869 81.5814 10.5848 82.2131 10.7831C82.8448 10.9789 83.3329 11.2579 83.6821 11.6201C84.0315 11.9799 84.2668 12.4106 84.3906 12.9124C84.5145 13.4117 84.5765 13.9575 84.5765 14.5473V21.5079C84.5765 22.132 84.6061 22.6142 84.6632 22.9593C84.7201 23.3043 84.834 23.6739 85 24.0655H81.7153C81.5988 23.8526 81.5121 23.6274 81.4526 23.39C81.3932 23.1526 81.3412 22.9201 81.2916 22.69H81.2421C80.8433 23.3778 80.3825 23.8256 79.8598 24.0312C79.3371 24.2368 78.6608 24.3396 77.831 24.3396C77.2339 24.3396 76.7261 24.2368 76.3124 24.0312C75.8962 23.8256 75.5668 23.5442 75.3166 23.1819C75.0688 22.8222 74.8855 22.4159 74.7691 21.9655C74.6527 21.5152 74.5957 21.0674 74.5957 20.6244C74.5957 20.0027 74.6626 19.4642 74.7939 19.0139C74.9277 18.5635 75.1308 18.1769 75.4033 17.8587C75.6783 17.5381 76.025 17.2738 76.4487 17.0584C76.8722 16.8455 77.3826 16.657 77.9796 16.493L79.9218 15.9767C80.437 15.8444 80.7937 15.6658 80.9919 15.4357C81.1901 15.2057 81.2916 14.8704 81.2916 14.4274C81.2916 13.9183 81.1702 13.5218 80.93 13.2354C80.6897 12.9491 80.2785 12.8047 79.6988 12.8047C79.1686 12.8047 78.7698 12.9613 78.5048 13.2722C78.2397 13.583 78.1059 14.0015 78.1059 14.5253V14.8948H75.0194V14.5742L75.0168 14.5669ZM80.5436 17.8758C80.2785 17.9836 80.0381 18.0594 79.8226 18.1084C79.1266 18.2552 78.6286 18.5024 78.3289 18.8451C78.0291 19.1902 77.8805 19.6576 77.8805 20.2474C77.8805 20.7565 77.9796 21.1897 78.1802 21.552C78.3784 21.9117 78.7104 22.0928 79.1761 22.0928C79.409 22.0928 79.6492 22.0562 79.8969 21.9827C80.1446 21.9093 80.3726 21.7894 80.5807 21.6254C80.7887 21.4614 80.9572 21.2485 81.091 20.9865C81.2247 20.7247 81.2891 20.4139 81.2891 20.0517V17.4451C81.0563 17.6262 80.8086 17.7682 80.5436 17.8758Z"
          fill="white"
        />
        <path
          d="M72.2823 10.4845V10.5016C71.715 10.5555 71.222 10.7415 70.8058 11.0621C70.3079 11.4488 69.8843 11.9603 69.535 12.5991H69.4855V10.8271H66.1982V24.0581H69.6341V16.1162C69.6341 15.6732 69.7084 15.3011 69.8571 14.9976C70.0057 14.6941 70.2063 14.4494 70.454 14.2609C70.7018 14.0725 70.9768 13.9379 71.2765 13.8547C71.554 13.7788 71.8314 13.7396 72.1089 13.7347V13.7421H73.6794V10.4869H72.2798L72.2823 10.4845Z"
          fill="white"
        />
        <path
          d="M57.4159 21.1232L54.0791 18.2307V23.9535H64.2605V21.1232H57.4159Z"
          fill="white"
        />
        <path
          d="M54.0791 6.5V9.33029H57.6636H64.0103V6.5H54.0791Z"
          fill="white"
        />
        <path
          d="M54.2031 11.2171V16.4061H57.7876H63.7602V13.5757H57.5399L54.2031 11.2171Z"
          fill="white"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_257_433"
          x1="10"
          y1="0.5"
          x2="10"
          y2="30.3929"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.343851" stop-color="#43F574" />
          <stop offset="1" stop-color="#2F0461" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_257_433"
          x1="13"
          y1="32.5"
          x2="26.9531"
          y2="12.6162"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#2F0461" />
          <stop offset="0.730907" stop-color="#43F574" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_257_433"
          x1="20"
          y1="0.5"
          x2="20"
          y2="30.3929"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.353222" stop-color="#43F574" />
          <stop offset="1" stop-color="#2F0461" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_257_433"
          x1="12"
          y1="30"
          x2="19"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#2F0461" />
          <stop offset="0.964704" stop-color="#43F574" />
        </linearGradient>
        <clipPath id="clip0_257_433">
          <rect y="0.5" width="30" height="30" rx="15" fill="white" />
        </clipPath>
        <clipPath id="clip1_257_433">
          <rect
            width="53"
            height="18"
            fill="white"
            transform="translate(32 6.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

// CONSTANTS

const ZKSYNC_MAINNET = 324;
const ZKSYNC_TESTNET = 280;
const ZKSYNC_MAINNET_CHAIN_ID_HEX = "0x144";
const ZKSYNC_TESTNET_CHAIN_ID_HEX = "0x118";
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
const USD_DECIMALS = 30;
const ZLP_DECIMALS = 18;
const USDG_DECIMALS = 18;
const ZKE_DECIMALS = 18;
const MINT_BURN_FEE_BASIS_POINTS = 25;
const TAX_BASIS_POINTS = 60;
const BASIS_POINTS_DIVISOR = 10000;
const PLACEHOLDER_ACCOUNT = "0x769Fc809C22747F73D98D3E7a79921CFa840BFCc";
const SECONDS_PER_YEAR = 31536000;

// CHAINS

const CHAINS = {
  [ZKSYNC_MAINNET]: {
    CHAIN_ID: ZKSYNC_MAINNET,
    NETWORK_INFO: {
      blockExplorerUrls: ["https://explorer.zksync.io/"],
      iconUrls: ["https://zksync.io/favicon-32x32.png"],
      rpcUrls: ["https://mainnet.era.zksync.io"],
      chainId: ZKSYNC_MAINNET_CHAIN_ID_HEX,
      chainName: "zkSync Era Mainnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
    },
  },
  [ZKSYNC_TESTNET]: {
    CHAIN_ID: ZKSYNC_TESTNET,
    NETWORK_INFO: {
      blockExplorerUrls: ["https://goerli.explorer.zksync.io/"],
      iconUrls: ["https://zksync.io/favicon-32x32.png"],
      rpcUrls: ["https://testnet.era.zksync.dev"],
      chainId: ZKSYNC_TESTNET_CHAIN_ID_HEX,
      chainName: "zkSync Era Testnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
    },
  },
};

// TOKENS

const TOKENS = {
  [ZKSYNC_MAINNET]: [
    {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      address: "0x0000000000000000000000000000000000000000",
      isNative: true,
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
      isStable: true,
    },
    {
      name: "Wrapped Bitcoin",
      symbol: "WBTC",
      decimals: 8,
      address: "0xBBeB516fb02a01611cBBE0453Fe3c580D7281011",
    },
  ],
  [ZKSYNC_TESTNET]: [
    {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      address: "0x0000000000000000000000000000000000000000",
      isNative: true,
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0xbb30022950dc346136b4286628C1a6bcf93C1AAb",
      isStable: true,
    },
    {
      name: "Wrapped Bitcoin",
      symbol: "WBTC",
      decimals: 8,
      address: "0x5796F3E984eCF25C2Da3601D27830fA6131Cfded",
    },
  ],
};

// CONTRACTS

const CONTRACTS = {
  [ZKSYNC_MAINNET]: {
    Reader: "0xb46d1A66941a755649c240D447598BB43F1c3514",
    PythReader: "0x439B5A74C44E33f2C95fe77F8330496cC1a4a676",
    Vault: "0xBC918775C20959332c503d51a9251C2405d9cF88",
    PositionRouter: "0x33d339e9922cc296Cbc52BB8BEd1165ab628Bc06",
    NativeToken: "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91",
    ZlpManager: "0x76FC5695b0D310151f9c9363C537a7456Cb114b5",
    Zlp: "0x9e5a36eE37925325FEf6FF62171Cd675c0F9fDc2",
    RewardTracker: "0x2dF5B3bdDf75bF4aE6dd825092f67372f66551cb",
    StakedZlpTracker: "0xB13a8400e0a75aDa3d6393CedbD7f6AC723Ac6Da",
    Usdg: "0x5f90c37eC885fca36fBBd035650eb6B3DF10c55c",
    RewardRouter: "0xf05bd35Ab2Ce4Ab1639D5a895B6E5563c7c6d254",
    Pyth: "0xf087c864AEccFb6A2Bf1Af6A0382B0d0f6c5D834",
    RewardReader: "0x7e94820D7a4161c5d2F79D6A0Bd32B6B307432a1",
    FeeZlpTracker: "0x2dF5B3bdDf75bF4aE6dd825092f67372f66551cb",
  },
  [ZKSYNC_TESTNET]: {
    Reader: "0x45F4d76009D8C89bA688329145E89364300b19bb",
    PythReader: "0x84476f650B7C5e06cDa8E7eCc85aC3ccd6fDa8A1",
    Vault: "0xaB597d260C868770867A2d1dBb960075C291aF7F",
    PositionRouter: "0xbf46e3D1005f19c3428EC132ebDEc5975CB0DF69",
    NativeToken: "0xc023d6bAE4DbA3E2cB0575be2A5C2Ba6571DFfcf",
    ZlpManager: "0x0c22158E9D537b2ad8E2F7BA177c4ff06c7B88E8",
    Zlp: "0x58E0E14E4E5F909C07b39CaE8C2d226550e99Ba1",
    RewardTracker: "0x99F3251beF877EF2a11c29b943534940f074493d",
    StakedZlpTracker: "0x2ae067eEDB90738072bbE71b07DA6932ffDB253C",
    Usdg: "0xaAEfAC305118Bbe4292d534f96DF12431318353D",
    RewardRouter: "0xC16d813fA94526a40160893002A03d4BbC70FaB7",
    Pyth: "0xC38B1dd611889Abc95d4E0a472A667c3671c08DE",
    RewardReader: "0xC8bfc1559afc3e27b747a88D3a83C5D29519CFF2",
    FeeZlpTracker: "0x99F3251beF877EF2a11c29b943534940f074493d",
  },
};

// PYTH

const PYTH = {
  [ZKSYNC_MAINNET]: {
    PythEndpoint: "https://hermes.pyth.network",
    EthPriceFeedId:
      "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    UsdcPriceFeedId:
      "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a",
    BtcPriceFeedId:
      "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
  },
  [ZKSYNC_TESTNET]: {
    PythEndpoint: "https://hermes-beta.pyth.network",
    EthPriceFeedId:
      "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
    UsdcPriceFeedId:
      "0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722",
    BtcPriceFeedId:
      "0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b",
  },
};

// BACKEND

const BACKEND_URLS = {
  [ZKSYNC_MAINNET]: "https://api.zkera.fi",
  [ZKSYNC_TESTNET]: "https://api-dev.zkera.fi",
};

// UTILS

function getTokens(chainId) {
  if (!chainId || chainId === "unsupported") chainId = ZKSYNC_MAINNET;
  return TOKENS[chainId];
}

function getContract(chainId, name) {
  if (!chainId || chainId === "unsupported") chainId = ZKSYNC_MAINNET;
  return CONTRACTS[chainId][name];
}

function getPythConfig(chainId, name) {
  if (!chainId || chainId === "unsupported") chainId = ZKSYNC_MAINNET;
  return PYTH[chainId][name];
}

function getServerBaseUrl(chainId) {
  if (!chainId || chainId === "unsupported") chainId = ZKSYNC_MAINNET;
  return BACKEND_URLS[chainId];
}

function getPriceIdsConfig(chainId) {
  const ethPriceFeedId = getPythConfig(chainId, "EthPriceFeedId");
  const usdcPriceFeedId = getPythConfig(chainId, "UsdcPriceFeedId");
  const btcPriceFeedId = getPythConfig(chainId, "BtcPriceFeedId");
  return [ethPriceFeedId, usdcPriceFeedId, btcPriceFeedId];
}

function convertToDecimals(rawPrice, conf, expo, targetDecimals) {
  const priceDecimals = expo.mul(-1);
  let powerOfTen;

  if (priceDecimals.lte(targetDecimals)) {
    powerOfTen = ethers.BigNumber.from(10).pow(
      priceDecimals.add(targetDecimals)
    );
  } else {
    powerOfTen = ethers.BigNumber.from(10).pow(
      priceDecimals.sub(targetDecimals)
    );
  }

  return [rawPrice.mul(powerOfTen), conf.mul(powerOfTen)];
}

function bigNumberifyStruct(priceStruct) {
  const conf = ethers.BigNumber.from(priceStruct.conf);
  const expo = ethers.BigNumber.from(priceStruct.expo);
  const price = ethers.BigNumber.from(priceStruct.price);

  return [conf, expo, price];
}

function bigNumberify(n) {
  try {
    return ethers.BigNumber.from(n);
  } catch (e) {
    console.log("bigNumberify error", e);
    return undefined;
  }
}

function expandDecimals(n, decimals) {
  return bigNumberify(n).mul(bigNumberify(10).pow(decimals));
}

function getTokenAddress(token, nativeTokenAddress) {
  if (token.address === ADDRESS_ZERO) {
    return nativeTokenAddress;
  }
  return token.address;
}

// NUMBERS

function exponentialToDecimal(exponential) {
  let decimal = exponential.toString().toLowerCase();
  if (decimal.includes("e+")) {
    const exponentialSplitted = decimal.split("e+");
    let postfix = "";
    for (
      let i = 0;
      i <
      +exponentialSplitted[1] -
        (exponentialSplitted[0].includes(".")
          ? exponentialSplitted[0].split(".")[1].length
          : 0);
      i++
    ) {
      postfix += "0";
    }
    const addCommas = (text) => {
      let j = 3;
      let textLength = text.length;
      while (j < textLength) {
        text = `${text.slice(0, textLength - j)},${text.slice(
          textLength - j,
          textLength
        )}`;
        textLength++;
        j += 3 + 1;
      }
      return text;
    };
    decimal = addCommas(exponentialSplitted[0].replace(".", "") + postfix);
  }
  if (decimal.toLowerCase().includes("e-")) {
    const exponentialSplitted = decimal.split("e-");
    let prefix = "0.";
    for (let i = 0; i < +exponentialSplitted[1] - 1; i++) {
      prefix += "0";
    }
    decimal = prefix + exponentialSplitted[0].replace(".", "");
  }
  return decimal;
}

function limitDecimals(amount, maxDecimals) {
  let amountStr = amount.toString();
  if (maxDecimals === undefined) {
    return amountStr;
  }
  if (maxDecimals === 0) {
    return amountStr.split(".")[0];
  }
  const dotIndex = amountStr.indexOf(".");
  if (dotIndex !== -1) {
    let decimals = amountStr.length - dotIndex - 1;
    if (decimals > maxDecimals) {
      amountStr = amountStr.substr(
        0,
        amountStr.length - (decimals - maxDecimals)
      );
    }
  }
  return amountStr;
}

function padDecimals(amount, minDecimals) {
  let amountStr = amount.toString();
  const dotIndex = amountStr.indexOf(".");
  if (dotIndex !== -1) {
    const decimals = amountStr.length - dotIndex - 1;
    if (decimals < minDecimals) {
      amountStr = amountStr.padEnd(
        amountStr.length + (minDecimals - decimals),
        "0"
      );
    }
  } else {
    amountStr = amountStr + ".0000";
  }
  return amountStr;
}

function numberWithCommas(x) {
  if (!x) {
    return "...";
  }

  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function trimZeroDecimals(amount) {
  if (parseFloat(amount) === parseInt(amount)) {
    return parseInt(amount).toString();
  }
  return amount;
}

function formatAmountFree(amount, tokenDecimals, displayDecimals) {
  if (!amount) {
    return "";
  }
  let amountStr = ethers.utils.formatUnits(amount, tokenDecimals);
  amountStr = limitDecimals(amountStr, displayDecimals);
  return trimZeroDecimals(amountStr);
}

function formatAmount(
  amount,
  tokenDecimals,
  displayDecimals,
  useCommas,
  defaultValue
) {
  if (!defaultValue) {
    defaultValue = "...";
  }
  if (amount === undefined || amount.toString().length === 0) {
    return defaultValue;
  }
  if (displayDecimals === undefined) {
    displayDecimals = 4;
  }
  let amountStr = ethers.utils.formatUnits(amount, tokenDecimals);
  amountStr = limitDecimals(amountStr, displayDecimals);
  if (displayDecimals !== 0) {
    amountStr = padDecimals(amountStr, displayDecimals);
  }
  if (useCommas) {
    return numberWithCommas(amountStr);
  }
  return amountStr;
}

function parseValue(value, decimals) {
  const pValue = parseFloat(value);

  if (isNaN(pValue)) {
    return undefined;
  }

  value = limitDecimals(value, decimals);
  const amount = ethers.utils.parseUnits(value, decimals);
  return bigNumberify(amount);
}

// LEGACY

function usePythPrices(pricesStruct, tokens) {
  let minPrices = [];
  let maxPrices = [];
  let indexPrices = {};

  for (let i = 0; i < tokens.length; i++) {
    const [conf, expo, price] = bigNumberifyStruct(pricesStruct[i].price);
    if (price.lt(0) || expo.gt(0) || expo.lt(-255)) {
      console.log("invalid priceStruct");
    }

    const DECIMALS = 14;
    let [convertedPrice, convertedConf] = convertToDecimals(
      price,
      conf,
      expo,
      DECIMALS
    );

    const maxPrice = convertedPrice.add(convertedConf);
    const minPrice = convertedPrice.sub(convertedConf);

    minPrices.push(minPrice);
    maxPrices.push(maxPrice);
    indexPrices[tokens[i].address] = { minPrice, maxPrice };
  }

  return { minPrices, maxPrices, indexPrices };
}

function getSpread(p) {
  const diff = p.maxPrice.sub(p.minPrice);

  return diff.mul(expandDecimals(1, 30)).div(p.maxPrice.add(p.minPrice).div(2));
}

function useInfoTokens(tokens, tokenBalances, indexPrices, vaultTokenInfo) {
  return {
    infoTokens: getInfoTokens(
      tokens,
      tokenBalances,
      vaultTokenInfo,
      indexPrices
    ),
  };
}

function getInfoTokens(tokens, tokenBalances, vaultTokenInfo, indexPrices) {
  const vaultPropsLength = 15;
  const infoTokens = {};

  for (let i = 0; i < tokens.length; i++) {
    const token = JSON.parse(JSON.stringify(tokens[i]));

    if (vaultTokenInfo && indexPrices) {
      token.balance = tokenBalances[i];
      token.poolAmount = vaultTokenInfo[i * vaultPropsLength];
      token.reservedAmount = vaultTokenInfo[i * vaultPropsLength + 1];
      token.availableAmount = token.poolAmount.sub(token.reservedAmount);
      token.usdgAmount = vaultTokenInfo[i * vaultPropsLength + 2];
      token.redemptionAmount = vaultTokenInfo[i * vaultPropsLength + 3];
      token.weight = vaultTokenInfo[i * vaultPropsLength + 4];
      token.bufferAmount = vaultTokenInfo[i * vaultPropsLength + 5];
      token.maxUsdgAmount = vaultTokenInfo[i * vaultPropsLength + 6];
      token.globalShortSize = vaultTokenInfo[i * vaultPropsLength + 7];
      token.maxGlobalShortSize = vaultTokenInfo[i * vaultPropsLength + 8];
      token.maxGlobalLongSize = vaultTokenInfo[i * vaultPropsLength + 9];
      token.minPrice = vaultTokenInfo[i * vaultPropsLength + 10];
      token.maxPrice = vaultTokenInfo[i * vaultPropsLength + 11];
      token.spread = getSpread({
        minPrice: token.minPrice,
        maxPrice: token.maxPrice,
      });
      token.guaranteedUsd = vaultTokenInfo[i * vaultPropsLength + 12];
      token.maxPrimaryPrice = vaultTokenInfo[i * vaultPropsLength + 13];
      token.minPrimaryPrice = vaultTokenInfo[i * vaultPropsLength + 14];

      token.contractMinPrice = token.minPrice;
      token.contractMaxPrice = token.maxPrice;

      token.maxAvailableShort = bigNumberify(0);

      token.hasMaxAvailableShort = false;
      if (token.maxGlobalShortSize.gt(0)) {
        token.hasMaxAvailableShort = true;
        if (token.maxGlobalShortSize.gt(token.globalShortSize)) {
          token.maxAvailableShort = token.maxGlobalShortSize.sub(
            token.globalShortSize
          );
        }
      } else {
        token.maxAvailableShort = token.poolAmount.sub(token.reservedAmount);
      }

      if (token.maxAvailableShort && token.maxAvailableShort.gt(0)) {
        token.maxAvailableShort = token.maxAvailableShort.mul(95).div(100);
      }

      if (token.maxUsdgAmount.eq(0)) {
        token.maxUsdgAmount = expandDecimals(200 * 1000 * 1000, 18);
      }

      token.availableUsd = token.isStable
        ? token.poolAmount
            .mul(token.minPrice)
            .div(expandDecimals(1, token.decimals))
        : token.availableAmount
            .mul(token.minPrice)
            .div(expandDecimals(1, token.decimals));

      token.maxAvailableLong = bigNumberify(0);
      token.hasMaxAvailableLong = false;
      if (token.maxGlobalLongSize.gt(0)) {
        token.hasMaxAvailableLong = true;

        if (token.maxGlobalLongSize.gt(token.guaranteedUsd)) {
          const remainingLongSize = token.maxGlobalLongSize.sub(
            token.guaranteedUsd
          );

          token.maxAvailableLong = remainingLongSize.lt(token.availableUsd)
            ? remainingLongSize
            : token.availableUsd;
        }
      } else {
        token.maxAvailableLong = token.availableUsd;
      }

      if (token.maxAvailableLong && token.maxAvailableLong.gt(0)) {
        token.maxAvailableLong = token.maxAvailableLong.mul(95).div(100);
      }

      token.maxLongCapacity =
        token.maxGlobalLongSize.gt(0) &&
        token.maxGlobalLongSize.lt(token.availableUsd.add(token.guaranteedUsd))
          ? token.maxGlobalLongSize
          : token.availableUsd.add(token.guaranteedUsd);

      token.managedUsd = token.availableUsd.add(token.guaranteedUsd);
      token.managedAmount = token.managedUsd
        .mul(expandDecimals(1, token.decimals))
        .div(token.minPrice);
    }

    infoTokens[token.address] = token;
  }

  return infoTokens;
}

function getTargetUsdgAmount(token, usdgSupply, totalTokenWeights) {
  if (!token || !token.weight || !usdgSupply) {
    return;
  }

  if (usdgSupply.eq(0)) {
    return bigNumberify(0);
  }

  return token.weight.mul(usdgSupply).div(totalTokenWeights);
}

function getFeeBasisPoints(
  token,
  tokenUsdgAmount,
  usdgDelta,
  feeBasisPoints,
  taxBasisPoints,
  increment,
  usdgSupply,
  totalTokenWeights
) {
  if (!token || !tokenUsdgAmount || !usdgSupply || !totalTokenWeights) {
    return 0;
  }

  feeBasisPoints = bigNumberify(feeBasisPoints);
  taxBasisPoints = bigNumberify(taxBasisPoints);

  const initialAmount = tokenUsdgAmount;
  let nextAmount = initialAmount.add(usdgDelta);
  if (!increment) {
    nextAmount = usdgDelta.gt(initialAmount)
      ? bigNumberify(0)
      : initialAmount.sub(usdgDelta);
  }

  const targetAmount = getTargetUsdgAmount(
    token,
    usdgSupply,
    totalTokenWeights
  );
  if (!targetAmount || targetAmount.eq(0)) {
    return feeBasisPoints.toNumber();
  }

  const initialDiff = initialAmount.gt(targetAmount)
    ? initialAmount.sub(targetAmount)
    : targetAmount.sub(initialAmount);
  const nextDiff = nextAmount.gt(targetAmount)
    ? nextAmount.sub(targetAmount)
    : targetAmount.sub(nextAmount);

  if (nextDiff.lt(initialDiff)) {
    const rebateBps = taxBasisPoints.mul(initialDiff).div(targetAmount);
    return rebateBps.gt(feeBasisPoints)
      ? 0
      : feeBasisPoints.sub(rebateBps).toNumber();
  }

  let averageDiff = initialDiff.add(nextDiff).div(2);
  if (averageDiff.gt(targetAmount)) {
    averageDiff = targetAmount;
  }
  const taxBps = taxBasisPoints.mul(averageDiff).div(targetAmount);
  return feeBasisPoints.add(taxBps).toNumber();
}

function adjustForDecimals(amount, divDecimals, mulDecimals) {
  return amount
    .mul(expandDecimals(1, mulDecimals))
    .div(expandDecimals(1, divDecimals));
}

function getBuyZlpToAmount(
  fromAmount,
  swapToken,
  zlpPrice,
  usdgSupply,
  totalTokenWeights
) {
  const defaultValue = { amount: bigNumberify(0), feeBasisPoints: 0 };

  if (
    !fromAmount ||
    !swapToken ||
    !swapToken.minPrice ||
    !zlpPrice ||
    !usdgSupply ||
    !totalTokenWeights
  ) {
    return defaultValue;
  }

  let zlpAmount = fromAmount.mul(swapToken.minPrice).div(zlpPrice);
  zlpAmount = adjustForDecimals(zlpAmount, swapToken.decimals, USDG_DECIMALS);

  let usdgAmount = fromAmount
    .mul(swapToken.minPrice)
    .div(expandDecimals(1, 30));
  usdgAmount = adjustForDecimals(usdgAmount, swapToken.decimals, USDG_DECIMALS);
  const feeBasisPoints = getFeeBasisPoints(
    swapToken,
    swapToken.usdgAmount,
    usdgAmount,
    MINT_BURN_FEE_BASIS_POINTS,
    TAX_BASIS_POINTS,
    true,
    usdgSupply,
    totalTokenWeights
  );

  zlpAmount = zlpAmount
    .mul(BASIS_POINTS_DIVISOR - feeBasisPoints)
    .div(BASIS_POINTS_DIVISOR);

  return { amount: zlpAmount, feeBasisPoints };
}

function getBuyZlpFromAmount(
  toAmount,
  fromToken,
  zlpPrice,
  usdgSupply,
  totalTokenWeights
) {
  const defaultValue = { amount: bigNumberify(0), feeBasisPoints: 0 };
  if (
    !toAmount ||
    !fromToken ||
    !fromToken.minPrice ||
    !zlpPrice ||
    !usdgSupply ||
    !totalTokenWeights
  ) {
    return defaultValue;
  }

  let fromAmount = toAmount.mul(zlpPrice).div(fromToken.minPrice);
  fromAmount = adjustForDecimals(fromAmount, ZLP_DECIMALS, fromToken.decimals);

  const usdgAmount = toAmount.mul(zlpPrice).div(expandDecimals(1, 30));
  const feeBasisPoints = getFeeBasisPoints(
    fromToken,
    fromToken.usdgAmount,
    usdgAmount,
    MINT_BURN_FEE_BASIS_POINTS,
    TAX_BASIS_POINTS,
    true,
    usdgSupply,
    totalTokenWeights
  );

  fromAmount = fromAmount
    .mul(BASIS_POINTS_DIVISOR)
    .div(BASIS_POINTS_DIVISOR - feeBasisPoints);

  return { amount: fromAmount, feeBasisPoints };
}

const getStakingData = (stakingInfo) => {
  if (!stakingInfo || stakingInfo.length === 0) {
    return;
  }

  const keys = ["stakedZlpTracker", "feeZlpTracker"];
  const data = {};
  const propsLength = 5;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    data[key] = {
      claimable: stakingInfo[i * propsLength],
      tokensPerInterval: stakingInfo[i * propsLength + 1],
      averageStakedAmounts: stakingInfo[i * propsLength + 2],
      cumulativeRewards: stakingInfo[i * propsLength + 3],
      totalSupply: stakingInfo[i * propsLength + 4],
    };
  }

  return data;
};

function getFeeZlpTrackerApr(stakingData, nativeToken, zlpSupplyUsd) {
  if (!stakingData || !nativeToken || !zlpSupplyUsd) {
    return;
  }
  const feeZlpTrackerAnnualRewardsUsd =
    stakingData.feeZlpTracker.tokensPerInterval
      .mul(SECONDS_PER_YEAR)
      .mul(nativeToken.minPrice)
      .div(expandDecimals(1, 18));
  return feeZlpTrackerAnnualRewardsUsd
    .mul(BASIS_POINTS_DIVISOR)
    .div(zlpSupplyUsd);
}

function getSteckedTotalApr(zkePrice, stakingData, zlpSupplyUsd) {
  if (!zkePrice || !stakingData || !zlpSupplyUsd) {
    return;
  }

  const stakedZlpTrackerAnnualRewardsUsd =
    stakingData.stakedZlpTracker.tokensPerInterval
      .mul(SECONDS_PER_YEAR)
      .mul(zkePrice)
      .div(expandDecimals(1, 18));
  const stakedZlpTrackerApr = stakedZlpTrackerAnnualRewardsUsd
    .mul(BASIS_POINTS_DIVISOR)
    .div(zlpSupplyUsd);

  return stakedZlpTrackerApr;
}

// STATE

State.init({
  payValue: "",
  receiveValue: "",
  sender: undefined,
  zlpBalance: undefined,
  network: undefined,
  chainId: undefined,
  tokenBalances: undefined,
  vaultTokenInfo: undefined,
  zlpPrice: undefined,
  fromToken: undefined,
  balancesAndSupplies: undefined,
  totalTokenWeights: undefined,
  usdgSupply: undefined,
  feeBasisPoints: undefined,
  loading: false,
  titleToast: "",
  descriptionToast: "",
  typeToast: "",
  openToast: false,
  stakingInfo: undefined,
  zlpSupply: undefined,
  aum: undefined,
  chainsMap: Object.values(CHAINS),
});
const {
  payValue,
  receiveValue,
  sender,
  zlpBalance,
  network,
  chainId,
  tokenBalances,
  vaultTokenInfo,
  zlpPrice,
  fromToken,
  balancesAndSupplies,
  totalTokenWeights,
  usdgSupply,
  feeBasisPoints,
  loading,
  titleToast,
  descriptionToast,
  typeToast,
  openToast,
  stakingInfo,
  zlpSupply,
  aum,
  chainsMap,
} = state;

// RECONNECT TO WALLET

if (sender === undefined && Ethers.provider()) {
  Ethers.provider()
    .send("eth_requestAccounts", [])
    .then((accounts) => {
      if (accounts.length) {
        State.update({ sender: accounts[0] });
      }
    });
}

// FETCH ABI

const readerAbiResponse = fetch(
  "https://gist.githubusercontent.com/af4n/e1b6c199110dd1885107cadb02563fc0/raw/c809ee9754a20bc4b6542cfd27ef54f278bb87e5/reader.json"
);
const pythReaderAbiResponse = fetch(
  "https://gist.githubusercontent.com/af4n/1d21d7de80ad485f10c221d4e5969e71/raw/5a5124e451e6876be99fb55445942b838647bc20/pythReader.json"
);
const erc20AbiResponse = fetch(
  "https://gist.githubusercontent.com/af4n/85f257a83b79061c3b6ba7f9797b02d9/raw/7a8c2264d55c791c21327f43e82fcfbaddfb325d/erc20.json"
);
const rewardTrackerAbiResponse = fetch(
  "https://gist.githubusercontent.com/af4n/e463be8c84945782973ca8c5648584b6/raw/b322e147975e428a70c9c9e616de4a3b3fba7244/rewardTracker.json"
);
const vaultAbiResponse = fetch(
  "https://gist.githubusercontent.com/af4n/2591116cd5ec38aac58194416cf0fbaa/raw/9dc506e3a495c27089d280f80565eca59e2ed55f/vault.json"
);
const rewardRouterAbiRespose = fetch(
  "https://gist.githubusercontent.com/af4n/8c5b5097969fff2ec3bfa4b2c303d499/raw/fd637ee7e56b1908cce60de41bd971e5cfa9e9c3/rewardRouter.json"
);
const rewardReaderAbiResponse = fetch(
  "https://gist.githubusercontent.com/af4n/57271e25185a1b3b0d1f31e68314b674/raw/72c36cbe82001a98fa3bfe9ca16e8a4915283a17/rewardReader.json"
);

if (
  !readerAbiResponse.ok ||
  !pythReaderAbiResponse.ok ||
  !erc20AbiResponse.ok ||
  !rewardTrackerAbiResponse.ok ||
  !vaultAbiResponse.ok ||
  !rewardRouterAbiRespose.ok ||
  !rewardReaderAbiResponse.ok
)
  "Loading ABI...";

const readerAbi = readerAbiResponse.body;
const pythReaderAbi = pythReaderAbiResponse.body;
const erc20Abi = erc20AbiResponse.body;
const rewardTrackerAbi = rewardTrackerAbiResponse.body;
const vaultAbi = vaultAbiResponse.body;
const rewardRouterAbi = rewardRouterAbiRespose.body;
const rewardReaderAbi = rewardReaderAbiResponse.body;

// ZKE PRICE

const zkePriceResponse = fetch("https://api-dev.zkera.fi/price-monitor");

if (!zkePriceResponse.ok) {
  ("Loading Price");
}

const zkePrice = zkePriceResponse.body;

// DATA

const readerAddress = getContract(chainId, "Reader");
const pythReaderAddress = getContract(chainId, "PythReader");
const vaultAddress = getContract(chainId, "Vault");
const positionRouterAddress = getContract(chainId, "PositionRouter");
const nativeTokenAddress = getContract(chainId, "NativeToken");
const zlpManagerAddress = getContract(chainId, "ZlpManager");
const zlpAddress = getContract(chainId, "Zlp");
const rewardTrackerAddress = getContract(chainId, "RewardTracker");
const stakedZlpTrackerAddress = getContract(chainId, "StakedZlpTracker");
const usdgAddress = getContract(chainId, "Usdg");
const rewardRouterAddress = getContract(chainId, "RewardRouter");
const rewardReaderAddress = getContract(chainId, "RewardReader");
const feeZlpTrackerAddress = getContract(chainId, "FeeZlpTracker");

const tokens = getTokens(chainId);
const tokenAddresses = tokens.map((token) => token.address);
const whitelistedTokenAddresses = tokens.map((token) =>
  getTokenAddress(token, nativeTokenAddress)
);
const tokensForBalanceAndSupplyQuery = [stakedZlpTrackerAddress, usdgAddress];
const rewardTrackersForStakingInfo = [
  stakedZlpTrackerAddress,
  feeZlpTrackerAddress,
];

// PYTH PRICE FEEDS

const priceIdsConfig = getPriceIdsConfig(chainId);
const idsParam = priceIdsConfig.map((id) => `ids[]=${id}`).join("&");
const pricesStruct = fetch(
  `${getPythConfig(chainId, "PythEndpoint")}/api/latest_price_feeds?${idsParam}`
);

if (!pricesStruct.ok) {
  return "Loading Price...";
}

const { minPrices, maxPrices, indexPrices } = usePythPrices(
  pricesStruct.body,
  tokens
);

// LOAD DATA

const readerContract = new ethers.Contract(
  readerAddress,
  readerAbi,
  Ethers.provider() && Ethers.provider().getSigner()
);

readerContract
  .getTokenBalances(sender || PLACEHOLDER_ACCOUNT, tokenAddresses)
  .then((result) => {
    State.update({ tokenBalances: result });
  });

readerContract
  .getTokenBalancesWithSupplies(
    sender || PLACEHOLDER_ACCOUNT,
    tokensForBalanceAndSupplyQuery
  )
  .then((result) => {
    State.update({ balancesAndSupplies: result });
  });

readerContract
  .getTokenBalancesWithSupplies(sender || PLACEHOLDER_ACCOUNT, [zlpAddress])
  .then((result) => {
    State.update({ zlpSupply: result[1] });
  });

const rewardTrackerContract = new ethers.Contract(
  rewardTrackerAddress,
  rewardTrackerAbi,
  Ethers.provider() && Ethers.provider().getSigner()
);

rewardTrackerContract
  .stakedAmounts(sender || PLACEHOLDER_ACCOUNT)
  .then((result) => {
    State.update({ zlpBalance: result });
  });

const vaultContract = new ethers.Contract(
  vaultAddress,
  vaultAbi,
  Ethers.provider() && Ethers.provider().getSigner()
);

vaultContract.totalTokenWeights().then((result) => {
  State.update({ totalTokenWeights: result });
});

const pythReaderContract = new ethers.Contract(
  pythReaderAddress,
  pythReaderAbi,
  Ethers.provider() && Ethers.provider().getSigner()
);

pythReaderContract
  .getVaultTokenInfoV5(
    vaultAddress,
    positionRouterAddress,
    nativeTokenAddress,
    expandDecimals(1, 18),
    whitelistedTokenAddresses,
    minPrices,
    maxPrices
  )
  .then((result) => {
    State.update({ vaultTokenInfo: result });
  });

pythReaderContract
  .getPrice(zlpManagerAddress, whitelistedTokenAddresses, maxPrices)
  .then((result) => {
    State.update({ zlpPrice: result });
  });

pythReaderContract
  .getAums(zlpManagerAddress, whitelistedTokenAddresses, minPrices, maxPrices)
  .then((result) => {
    State.update({ aum: result[0].add(result[1]).div(2) });
  });

if (balancesAndSupplies && balancesAndSupplies && balancesAndSupplies[3]) {
  State.update({ usdgSupply: balancesAndSupplies[3] });
}

const { infoTokens } = useInfoTokens(
  tokens,
  tokenBalances,
  indexPrices,
  vaultTokenInfo
);

const tokensInfo = Object.values(infoTokens);
if (
  infoTokens &&
  infoTokens[ADDRESS_ZERO].balance &&
  !fromToken &&
  sender !== PLACEHOLDER_ACCOUNT
) {
  State.update({ fromToken: infoTokens[ADDRESS_ZERO] });
}

const rewardReaderContract = new ethers.Contract(
  rewardReaderAddress,
  rewardReaderAbi,
  Ethers.provider() && Ethers.provider().getSigner()
);

rewardReaderContract
  .getStakingInfo(sender || PLACEHOLDER_ACCOUNT, rewardTrackersForStakingInfo)
  .then((result) => {
    State.update({ stakingInfo: result });
  });

const stakingData = getStakingData(stakingInfo);
const nativeToken = infoTokens[ADDRESS_ZERO];

const zlpSupplyUsd =
  zlpSupply &&
  aum &&
  zlpSupply
    .mul(aum.mul(expandDecimals(1, ZLP_DECIMALS)).div(zlpSupply))
    .div(expandDecimals(1, ZLP_DECIMALS));

const zkePriceUsdStr = exponentialToDecimal(zkePrice);
const zkePriceBN = parseValue(zkePriceUsdStr, ZKE_DECIMALS);
const zkePriceUsd = zkePriceBN.mul(minPrices[0]).div(expandDecimals(1, 18));

const feeZlpTracker = getFeeZlpTrackerApr(
  stakingData,
  nativeToken,
  zlpSupplyUsd
);

const totalApr = getSteckedTotalApr(zkePriceUsd, stakingData, zlpSupplyUsd);

const payAmount = parseValue(payValue, fromToken.decimals);

const payValueDisplay =
  payAmount > 0 &&
  payAmount.mul(fromToken.minPrice).div(expandDecimals(1, fromToken.decimals));

const receiveAmount = parseValue(receiveValue, ZLP_DECIMALS);

const receiveValueDisplay =
  receiveAmount > 0 &&
  receiveAmount.mul(zlpPrice).div(expandDecimals(1, ZLP_DECIMALS));

// ICON TOKEN

const getIconForToken = () => {
  switch (fromToken.symbol) {
    case "ETH":
      return <IconETH />;
    case "USDC":
      return <IconUSDC />;
    case "WBTC":
      return <IconWBTC />;
    default:
      return <IconETH />;
  }
};

// BUTTON TEXT

const primaryButtonText =
  chainId === "unsupported"
    ? "Switch network"
    : payValue <= 0
    ? "Enter an amount"
    : Number(payValue) >
      Number(formatAmountFree(fromToken.balance, fromToken.decimals, 18))
    ? `Insufficient ${fromToken.symbol} balance`
    : "Buy";
const primaryButtonDisabled =
  chainId === "unsupported"
    ? false
    : Number(payValue) >
        Number(formatAmountFree(fromToken.balance, fromToken.decimals, 18)) ||
      payValue <= 0;

if (sender) {
  Ethers.provider()
    .getNetwork()
    .then((network) => {
      if (network.chainId === ZKSYNC_MAINNET) {
        State.update({ chainId: network.chainId });
      } else if (network.chainId === ZKSYNC_TESTNET) {
        State.update({ chainId: network.chainId });
      } else {
        State.update({ chainId: "unsupported" });
      }
    });
}

// CALL CONTRACT

function callContract() {
  const rewardRouterContract = new ethers.Contract(
    rewardRouterAddress,
    rewardRouterAbi,
    Ethers.provider().getSigner()
  );

  asyncFetch(`${getServerBaseUrl(chainId)}/zk/price-data`).then((response) => {
    const { priceUpdateData, updateFee } = response.body;

    const method =
      fromToken.address === ADDRESS_ZERO
        ? "mintAndStakeZlpETH"
        : "mintAndStakeZlp";

    const params =
      fromToken.address === ADDRESS_ZERO
        ? [
            bigNumberify(0), // _minUsdg
            bigNumberify(0), // _minZlp
            priceUpdateData, // _priceUpdateData
          ]
        : [
            fromToken.address, // _token
            payAmount, // _amount
            bigNumberify(0), // _minUsdg
            bigNumberify(0), // _minZlp
            priceUpdateData, // _priceUpdateData
          ];

    const value =
      fromToken.address === ADDRESS_ZERO
        ? payAmount.add(updateFee) // _payableAmount + _updateFee
        : updateFee; // _updateFee

    rewardRouterContract[method](...params, { value })
      .then((response) => {
        response.wait().then((res) => {
          State.update({
            titleToast: "Success",
            descriptionToast: "Buy completed!",
            typeToast: "success",
            openToast: true,
          });
        });
      })
      .catch((e) => {
        State.update({
          titleToast: "Error",
          descriptionToast: "Buy failed!",
          typeToast: "error",
          openToast: true,
        });
      })
      .finally(() => {
        State.update({
          payValue: "",
          receiveValue: "",
          feeBasisPoints: undefined,
          loading: false,
        });
        setTimeout(() => {
          readerContract
            .getTokenBalances(sender, tokenAddresses)
            .then((result) => {
              State.update({ tokenBalances: result });
            });
        }, 5000);
      });
  });
}

// BUY ZLP

function handleClickSubmitBuyZlp() {
  State.update({ loading: true });

  if (fromToken.address !== ADDRESS_ZERO) {
    const tokenContract = new ethers.Contract(
      fromToken.address,
      erc20Abi,
      Ethers.provider().getSigner()
    );

    tokenContract.allowance(sender, zlpManagerAddress).then((allowance) => {
      if (!allowance || payAmount.gt(allowance)) {
        tokenContract
          .approve(
            zlpManagerAddress,
            "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
          )
          .then((response) => {
            response.wait().then((res) => {
              callContract();
            });
          })
          .catch((e) => {
            State.update({
              titleToast: "Error",
              descriptionToast: "Failed to approve token!",
              typeToast: "error",
              openToast: true,
              loading: false,
            });
          });
      } else {
        callContract();
      }
    });
  } else {
    callContract();
  }
}

// HANDLES

function handleChangeFromToken(address) {
  State.update({
    fromToken: infoTokens[address],
  });
}

function handleClickMax() {
  State.update({
    payValue: formatAmountFree(fromToken.balance, fromToken.decimals, 18),
  });

  handleChangePayValue(
    formatAmountFree(fromToken.balance, fromToken.decimals, 18)
  );
}

function handleClickSwitchNetwork(network) {
  try {
    Ethers.send("wallet_switchEthereumChain", [
      { chainId: ethers.utils.hexValue(network) },
    ]);
  } catch (e) {
    console.log("error switching network", e);
  }
  try {
    Ethers.send("wallet_addEthereumChain", [CHAINS[network].NETWORK_INFO]);
  } catch (e) {
    console.log("error adding new network", e);
  }
}

function handleChangePayValue(value) {
  if (value === "." && !payValue) {
    State.update({
      payValue: "0.",
    });
  }
  if (isNaN(value)) {
    return;
  }

  State.update({
    payValue: value,
  });

  const amount = parseValue(value, fromToken.decimals);

  const { amount: nextAmount, feeBasisPoints: feeBps } = getBuyZlpToAmount(
    amount,
    fromToken,
    zlpPrice,
    usdgSupply,
    totalTokenWeights
  );
  const nextValue = formatAmountFree(nextAmount, ZLP_DECIMALS, 18);

  State.update({
    receiveValue: nextValue,
    feeBasisPoints: feeBps,
  });
}

function handleChangeReceiveValue(value) {
  if (value === "." && !receiveValue) {
    State.update({
      receiveValue: "0.",
    });
  }
  if (isNaN(value)) {
    return;
  }

  State.update({
    receiveValue: value,
  });

  const amount = parseValue(value, ZLP_DECIMALS);

  const { amount: nextAmount, feeBasisPoints: feeBps } = getBuyZlpFromAmount(
    amount,
    fromToken,
    zlpPrice,
    usdgSupply,
    totalTokenWeights
  );
  const nextValue = formatAmountFree(nextAmount, fromToken.decimals, 18);

  State.update({
    payValue: nextValue,
    feeBasisPoints: feeBps,
  });
}

// WATCH

useEffect(() => {
  handleChangePayValue(payValue);
}, [fromToken]);

return (
  <>
    <DaisyUIWrapper>
      <div class="card max-w-2xl mx-auto bg-gray-900 text-white">
        <div class="px-4 pt-4">
          <div class="relative flex justify-center">
            <LogoZkEra />
            {chainId && (
              <select
                onChange={(e) => {
                  handleClickSwitchNetwork(e.target.value);
                }}
                class="btn btn-xs btn-outline absolute right-0 top-0 text-white hover:bg-gray-900"
              >
                {chainId === "unsupported" ? (
                  <option value="unsupported">Unsupported network</option>
                ) : (
                  chainsMap.map((chain) => (
                    <option
                      value={chain.CHAIN_ID}
                      selected={chain.CHAIN_ID === chainId}
                    >
                      {chain.NETWORK_INFO.chainName}
                    </option>
                  ))
                )}
              </select>
            )}
          </div>

          <label class="label">
            <span class="label-text text-lg text-white">Buy ZLP</span>
          </label>

          <div class="bg-gray-800 rounded p-2 mb-2">
            <label class="label pl-4">
              <span class="label-text text-gray-400">
                {payValueDisplay
                  ? `Pay: $${formatAmount(
                      payValueDisplay,
                      USD_DECIMALS,
                      2,
                      true
                    )} `
                  : "Pay"}
              </span>
              <span class="label-text text-gray-400">
                Balance:
                <span class="text-white">
                  {formatAmount(
                    fromToken && fromToken.balance,
                    fromToken && fromToken.decimals,
                    4,
                    true
                  )}
                </span>
              </span>
            </label>
            <div class="flex">
              <input
                class="input w-full bg-gray-800 text-2xl focus:outline-none"
                onChange={(e) => handleChangePayValue(e.target.value)}
                value={payValue}
                placeholder="0.0"
              />
              <div class="flex items-center space-x-1">
                <button
                  style={{ background: "#43f574" }}
                  class="btn btn-sm border-none font-normal rounded-4 px-2 mx-1 hover:bg-green-600 focus:bg-green-600 text-black"
                  onClick={handleClickMax}
                >
                  MAX
                </button>
                {getIconForToken()}
                <select
                  onChange={(e) => {
                    handleChangeFromToken(e.target.value);
                  }}
                  class="select-ghost bg-gray-800  text-2xl"
                >
                  {tokensInfo.map((token) => (
                    <option value={token.address}>{token.symbol}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div class="bg-gray-800 rounded p-2">
            <label class="label pl-4 pr-2">
              <span class="label-text text-gray-400">
                {receiveValueDisplay
                  ? `Receive: $${formatAmount(
                      receiveValueDisplay,
                      USD_DECIMALS,
                      2,
                      true
                    )} `
                  : "Receive"}
              </span>
              <span class="label-text">
                <span class="label-text text-gray-400">
                  Balance:
                  <span class="text-white">
                    {formatAmount(zlpBalance, ZLP_DECIMALS, 4, true)}
                  </span>
                </span>
              </span>
            </label>
            <div class="flex">
              <input
                onChange={(e) => handleChangeReceiveValue(e.target.value)}
                class="input w-full bg-gray-800 text-2xl focus:outline-none"
                value={receiveValue}
                placeholder="0.0"
              />
              <div class="flex items-center space-x-1 ">
                <IconZLP />
                <span class="text-2xl pl-1 pr-2">ZLP</span>
              </div>
            </div>
          </div>

          <label class="label pt-3">
            <span class="label-text text-gray-400">APR</span>
            <span class="label-text">
              {feeZlpTracker && totalApr
                ? `ETH ${formatAmount(
                    feeZlpTracker,
                    2,
                    2,
                    true
                  )}% | esZKE ${formatAmount(totalApr, 2, 2, true)}%`
                : "-"}
            </span>
          </label>
          <label class="label pt-0">
            <span class="label-text text-gray-400">Fees</span>
            <span class="label-text">
              {feeBasisPoints && payValue > 0
                ? `${formatAmount(feeBasisPoints, 2, 2, true)}%`
                : "-"}
            </span>
          </label>
        </div>

        <div class="px-4 pb-4">
          {sender ? (
            <button
              disabled={loading}
              style={{ background: "#43f574" }}
              class={`btn w-full hover:bg-green-600 focus:bg-green-600 mt-2 text-black ${
                primaryButtonDisabled && "cursor-not-allowed"
              }`}
              onClick={
                chainId === "unsupported"
                  ? () => handleClickSwitchNetwork(ZKSYNC_MAINNET)
                  : !primaryButtonDisabled && handleClickSubmitBuyZlp
              }
            >
              {primaryButtonText}
            </button>
          ) : (
            <button
              disabled={sender && payValue <= 0}
              style={{ background: "#43f574" }}
              class="relative btn w-full hover:bg-green-600 focus:bg-green-600 mt-2 text-black"
            >
              Connect Wallet
              <Web3Connect
                className="opacity-0 absolute w-full h-full"
                connectLabel="Connect with Web3"
              />
            </button>
          )}
        </div>
      </div>

      <label class="label max-w-2xl mx-auto ">
        <span class="label-text text-lg text-black">
          *to manage your position, go to{" "}
          <a
            href="https://app.zkera.fi/"
            target="_blank"
            class="underline font-semibold"
          >
            app.zkera.fi
          </a>
        </span>
      </label>
    </DaisyUIWrapper>

    <Toast />
  </>
);
