const ownerId = "ndcplug.near";

const Navbar = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0 2.5rem 0;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  position: sticky;
  top: 0;
  margin-bottom: 0.75rem;
  max-height: 2.5em;
`;

const LogoArea = styled.a`
  display: block;
  width: 14em;
  padding: 0px;
  gap: 0.7em;
  font-style: normal;
  font-weight: 700;
  font-size: 1em;
  line-height: 1em;
  color: #11181c;
  transform: translateY(0.675em);

  &:hover {
    text-decoration: none;
    color: #11181c;
  }
`;

const ActionArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0px;
  gap: 1em;
`;

const logo = (
  <LogoArea>
    <svg
      width="254"
      height="53"
      viewBox="0 0 254 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M46.4834 42.8092V17.8373H58.684C61.8233 17.8373 64.1778 18.4319 65.7474 19.621C67.341 20.8101 68.1376 22.3798 68.1376 24.33C68.1376 25.638 67.8165 26.7796 67.1744 27.7547C66.5323 28.706 65.6522 29.4433 64.5345 29.9665C63.4168 30.4897 62.1326 30.7513 60.6817 30.7513L61.3595 29.2887C62.9292 29.2887 64.3205 29.5503 65.5334 30.0735C66.7463 30.5729 67.6856 31.3221 68.3517 32.321C69.0412 33.3199 69.3862 34.5447 69.3862 35.9954C69.3862 38.1359 68.5418 39.8125 66.8533 41.0255C65.1649 42.2145 62.6795 42.8092 59.3974 42.8092H46.4834ZM52.2269 38.4569H58.9694C60.4677 38.4569 61.5975 38.219 62.3584 37.7435C63.1432 37.244 63.5356 36.4592 63.5356 35.389C63.5356 34.3425 63.1432 33.5696 62.3584 33.0701C61.5975 32.5469 60.4677 32.2853 58.9694 32.2853H51.7988V28.0758H57.9705C59.3735 28.0758 60.4438 27.8379 61.1812 27.3623C61.9421 26.8628 62.3227 26.1137 62.3227 25.1148C62.3227 24.1397 61.9421 23.4143 61.1812 22.9387C60.4438 22.4392 59.3735 22.1895 57.9705 22.1895H52.2269V38.4569ZM84.2855 43.2373C82.3117 43.2373 80.4802 42.9162 78.7917 42.2741C77.1268 41.6319 75.6763 40.7283 74.4394 39.5628C73.2265 38.3974 72.2751 37.03 71.5855 35.4603C70.9195 33.8906 70.5866 32.1783 70.5866 30.3232C70.5866 28.4682 70.9195 26.7558 71.5855 25.1861C72.2751 23.6165 73.2383 22.249 74.4751 21.0836C75.7119 19.9182 77.1625 19.0145 78.8274 18.3724C80.4923 17.7302 82.2995 17.4092 84.2498 17.4092C86.2237 17.4092 88.0313 17.7302 89.6723 18.3724C91.3372 19.0145 92.776 19.9182 93.9889 21.0836C95.2257 22.249 96.1889 23.6165 96.8785 25.1861C97.5681 26.732 97.913 28.4444 97.913 30.3232C97.913 32.1783 97.5681 33.9025 96.8785 35.496C96.1889 37.0656 95.2257 38.433 93.9889 39.5985C92.776 40.7401 91.3372 41.6319 89.6723 42.2741C88.0313 42.9162 86.2358 43.2373 84.2855 43.2373ZM84.2498 38.3142C85.3675 38.3142 86.3903 38.1241 87.3178 37.7435C88.2693 37.3628 89.1015 36.8159 89.815 36.1024C90.5285 35.389 91.0754 34.5447 91.456 33.5696C91.8602 32.5945 92.0625 31.5124 92.0625 30.3232C92.0625 29.1341 91.8602 28.052 91.456 27.0769C91.0754 26.1018 90.5285 25.2575 89.815 24.544C89.1254 23.8305 88.3049 23.2835 87.3535 22.903C86.4021 22.5225 85.3675 22.3322 84.2498 22.3322C83.1322 22.3322 82.0976 22.5225 81.1462 22.903C80.2187 23.2835 79.3982 23.8305 78.6847 24.544C77.9712 25.2575 77.4122 26.1018 77.008 27.0769C76.6273 28.052 76.4372 29.1341 76.4372 30.3232C76.4372 31.4886 76.6273 32.5707 77.008 33.5696C77.4122 34.5447 77.9594 35.389 78.649 36.1024C79.3625 36.8159 80.1948 37.3628 81.1462 37.7435C82.0976 38.1241 83.1322 38.3142 84.2498 38.3142ZM108.856 43.2373C106.858 43.2373 104.944 42.9758 103.113 42.4524C101.281 41.9056 99.8066 41.2038 98.689 40.3477L100.651 35.9954C101.721 36.7563 102.982 37.3867 104.432 37.8861C105.907 38.3617 107.393 38.5996 108.892 38.5996C110.033 38.5996 110.949 38.4926 111.639 38.2786C112.352 38.0406 112.876 37.7195 113.208 37.3154C113.541 36.9112 113.708 36.4474 113.708 35.9241C113.708 35.2581 113.446 34.7349 112.923 34.3544C112.4 33.9501 111.71 33.629 110.854 33.3912C109.998 33.1296 109.046 32.8918 108 32.6777C106.977 32.4399 105.943 32.1545 104.896 31.8215C103.873 31.4886 102.934 31.0605 102.078 30.5373C101.222 30.014 100.52 29.3243 99.9732 28.4682C99.4499 27.612 99.1884 26.518 99.1884 25.1861C99.1884 23.7592 99.569 22.463 100.33 21.2977C101.115 20.1085 102.28 19.1691 103.826 18.4794C105.396 17.7659 107.358 17.4092 109.712 17.4092C111.282 17.4092 112.828 17.5994 114.35 17.98C115.872 18.3367 117.216 18.8837 118.381 19.621L116.597 24.0089C115.432 23.343 114.267 22.8554 113.101 22.5463C111.936 22.2133 110.794 22.0468 109.677 22.0468C108.559 22.0468 107.643 22.1776 106.93 22.4392C106.216 22.7008 105.705 23.0457 105.396 23.4738C105.086 23.8781 104.932 24.3538 104.932 24.9008C104.932 25.5429 105.193 26.0661 105.717 26.4704C106.24 26.851 106.93 27.1601 107.786 27.3979C108.642 27.6358 109.581 27.8736 110.604 28.1114C111.65 28.3493 112.685 28.6227 113.708 28.9319C114.754 29.2411 115.706 29.6573 116.562 30.1805C117.418 30.7038 118.107 31.3935 118.631 32.2496C119.178 33.1058 119.451 34.1879 119.451 35.496C119.451 36.899 119.059 38.1833 118.274 39.3488C117.489 40.5143 116.312 41.4536 114.742 42.167C113.197 42.8805 111.234 43.2373 108.856 43.2373Z"
        fill="#6393F8"
      />
      <path
        d="M147.417 17.8373H153.196V42.8092H147.417V17.8373ZM136.072 42.8092H130.293V17.8373H136.072V42.8092ZM147.845 32.5707H135.644V27.6833H147.845V32.5707ZM154.216 42.8092L165.347 17.8373H171.055L182.221 42.8092H176.156L167.023 20.7626H169.307L160.138 42.8092H154.216ZM159.782 37.4581L161.316 33.0701H174.158L175.728 37.4581H159.782ZM194.809 43.2373C192.882 43.2373 191.087 42.928 189.422 42.3097C187.781 41.6676 186.354 40.764 185.141 39.5985C183.928 38.433 182.977 37.0656 182.287 35.496C181.621 33.9263 181.288 32.2021 181.288 30.3232C181.288 28.4444 181.621 26.7201 182.287 25.1505C182.977 23.5808 183.928 22.2133 185.141 21.0479C186.378 19.8826 187.816 18.9907 189.457 18.3724C191.099 17.7302 192.894 17.4092 194.844 17.4092C197.009 17.4092 198.959 17.7897 200.695 18.5508C202.455 19.288 203.929 20.382 205.118 21.8328L201.408 25.2575C200.552 24.2824 199.601 23.557 198.554 23.0814C197.508 22.5819 196.366 22.3322 195.13 22.3322C193.965 22.3322 192.894 22.5225 191.919 22.903C190.944 23.2835 190.1 23.8305 189.386 24.544C188.673 25.2575 188.114 26.1018 187.709 27.0769C187.329 28.052 187.139 29.1341 187.139 30.3232C187.139 31.5124 187.329 32.5945 187.709 33.5696C188.114 34.5447 188.673 35.389 189.386 36.1024C190.1 36.8159 190.944 37.3628 191.919 37.7435C192.894 38.1241 193.965 38.3142 195.13 38.3142C196.366 38.3142 197.508 38.0763 198.554 37.6008C199.601 37.1013 200.552 36.3522 201.408 35.3533L205.118 38.778C203.929 40.2289 202.455 41.3348 200.695 42.0957C198.959 42.8566 196.997 43.2373 194.809 43.2373ZM212.589 37.1013L212.268 30.4302L224.218 17.8373H230.64L219.866 29.4314L216.655 32.8561L212.589 37.1013ZM207.416 42.8092V17.8373H213.159V42.8092H207.416ZM224.504 42.8092L215.621 31.9286L219.402 27.826L231.246 42.8092H224.504ZM239.9 43.2373C237.903 43.2373 235.988 42.9758 234.157 42.4524C232.325 41.9056 230.851 41.2038 229.733 40.3477L231.695 35.9954C232.766 36.7563 234.026 37.3867 235.477 37.8861C236.951 38.3617 238.438 38.5996 239.936 38.5996C241.078 38.5996 241.993 38.4926 242.683 38.2786C243.396 38.0406 243.919 37.7195 244.253 37.3154C244.585 36.9112 244.752 36.4474 244.752 35.9241C244.752 35.2581 244.49 34.7349 243.967 34.3544C243.444 33.9501 242.754 33.629 241.898 33.3912C241.042 33.1296 240.091 32.8918 239.044 32.6777C238.021 32.4399 236.987 32.1545 235.941 31.8215C234.918 31.4886 233.978 31.0605 233.122 30.5373C232.266 30.014 231.564 29.3243 231.018 28.4682C230.494 27.612 230.233 26.518 230.233 25.1861C230.233 23.7592 230.613 22.463 231.374 21.2977C232.159 20.1085 233.324 19.1691 234.87 18.4794C236.44 17.7659 238.402 17.4092 240.757 17.4092C242.326 17.4092 243.872 17.5994 245.394 17.98C246.916 18.3367 248.26 18.8837 249.425 19.621L247.642 24.0089C246.476 23.343 245.311 22.8554 244.146 22.5463C242.98 22.2133 241.839 22.0468 240.721 22.0468C239.603 22.0468 238.687 22.1776 237.974 22.4392C237.26 22.7008 236.749 23.0457 236.44 23.4738C236.131 23.8781 235.976 24.3538 235.976 24.9008C235.976 25.5429 236.238 26.0661 236.761 26.4704C237.284 26.851 237.974 27.1601 238.83 27.3979C239.686 27.6358 240.626 27.8736 241.648 28.1114C242.695 28.3493 243.729 28.6227 244.752 28.9319C245.798 29.2411 246.75 29.6573 247.606 30.1805C248.462 30.7038 249.152 31.3935 249.675 32.2496C250.222 33.1058 250.496 34.1879 250.496 35.496C250.496 36.899 250.103 38.1833 249.318 39.3488C248.534 40.5143 247.356 41.4536 245.787 42.167C244.241 42.8805 242.278 43.2373 239.9 43.2373Z"
        fill="black"
      />
      <path
        d="M34.3515 21.7983C33.3349 21.7983 32.391 22.3227 31.8584 23.1848L26.1209 31.6602C25.934 31.9395 26.0099 32.3161 26.2906 32.502C26.5182 32.653 26.8192 32.6343 27.0265 32.4569L32.6741 27.5832C32.7679 27.4991 32.9126 27.5077 32.997 27.6011C33.0354 27.6439 33.0557 27.6991 33.0557 27.7559V43.0151C33.0557 43.1411 32.9532 43.2423 32.8266 43.2423C32.7585 43.2423 32.6944 43.2127 32.6514 43.1606L15.5795 22.8285C15.0235 22.1757 14.2071 21.7991 13.3477 21.7983H12.751C11.1362 21.7983 9.82715 23.1008 9.82715 24.7075V46.1989C9.82715 47.8055 11.1362 49.108 12.751 49.108C13.7676 49.108 14.7115 48.5836 15.2441 47.7215L20.9816 39.2462C21.1685 38.9669 21.0926 38.5903 20.8119 38.4043C20.5843 38.2534 20.2833 38.2721 20.076 38.4495L14.4284 43.3232C14.3346 43.4072 14.1899 43.3987 14.1055 43.3053C14.0672 43.2625 14.0468 43.2073 14.0476 43.1505V27.8874C14.0476 27.7613 14.15 27.6602 14.2767 27.6602C14.344 27.6602 14.4089 27.6898 14.4519 27.7419L31.5214 48.0779C32.0774 48.7307 32.8938 49.1072 33.7532 49.108H34.3499C35.9647 49.1088 37.2746 47.8071 37.2761 46.2004V24.7075C37.2761 23.1008 35.9671 21.7983 34.3522 21.7983H34.3515Z"
        fill="black"
      />
      <path
        d="M19.1995 27.9377C19.1995 27.9377 22.077 28.223 26.2031 27.9734C28.6958 27.8239 32.0267 24.9313 33.8165 23.5586C35.6085 22.1828 38.6288 19.6235 37.2594 19.0606C35.8901 18.4979 32.2522 17.5971 32.2522 17.5971C32.2522 17.5971 36.7206 20.8609 19.1995 27.9377Z"
        fill="white"
        stroke="black"
        stroke-width="3"
        stroke-linejoin="round"
      />
      <path
        d="M33.9552 18.0499C34.724 19.8921 29.8361 23.6861 23.0367 26.5238C16.2379 29.3612 10.1041 30.1672 9.3352 28.3248C10.3241 26.705 9.75801 25.9249 9.75801 25.9249L32.0094 16.6385C32.0094 16.6385 32.1732 17.5867 33.9552 18.0499Z"
        fill="white"
        stroke="black"
        stroke-width="3"
        stroke-linejoin="round"
      />
      <path
        d="M8.35864 18.7658C8.37181 18.0229 8.53302 15.4088 10.0637 12.9771C12.8371 8.56534 17.9312 7.06019 21.4909 7.528C23.8974 7.84635 25.8371 8.74123 27.7835 10.4313C28.2586 10.8443 29.2031 11.7545 30.1958 13.2061C31.0562 14.4654 31.4465 15.3231 32.0949 16.7476C32.5982 17.9537 30.7608 19.998 27.0375 22.1739C21.8258 25.2169 14.8864 27.359 11.5397 26.9579C10.5822 26.8434 10.0219 26.5301 9.83406 26.0756C9.11253 24.1867 8.29966 22.0449 8.35864 18.7658Z"
        fill="white"
      />
      <path
        d="M8.35864 18.7658C8.37181 18.0229 8.53302 15.4088 10.0637 12.9771C12.8371 8.56534 17.9312 7.06019 21.4909 7.528C23.8974 7.84635 25.8371 8.74123 27.7835 10.4313C28.2586 10.8443 29.2031 11.7545 30.1958 13.2061C31.0562 14.4654 31.4465 15.3231 32.0949 16.7476C32.5982 17.9537 30.7608 19.998 27.0375 22.1739C21.8258 25.2169 14.8864 27.359 11.5397 26.9579C10.5822 26.8434 10.0219 26.5301 9.83406 26.0756C9.11253 24.1867 8.29966 22.0449 8.35864 18.7658Z"
        fill="#74FC00"
        stroke="black"
        stroke-width="3"
        stroke-linejoin="round"
      />
      <path
        d="M19.0855 27.921C19.0855 27.921 21.9627 28.2039 26.0889 27.9566C28.5801 27.8059 31.9113 24.915 33.7006 23.5403C35.4934 22.1665 38.5142 19.6069 37.1439 19.042C35.7747 18.4795 32.1387 17.5792 32.1387 17.5792C32.1387 17.5792 36.6058 20.8438 19.0855 27.921Z"
        fill="#FFBD34"
        stroke="#FFBD34"
        stroke-width="3"
        stroke-linejoin="round"
      />
      <path
        d="M33.8387 18.0337C34.6076 19.8761 29.7208 23.6681 22.9206 26.5061C16.122 29.3434 9.9878 30.1513 9.21877 28.3086C10.2086 26.6887 9.64089 25.9096 9.64089 25.9096L31.8939 16.6226C31.8939 16.6226 32.183 17.6877 33.9639 18.1512L33.8387 18.0337Z"
        fill="#FFBD34"
        stroke="#FFBD34"
        stroke-width="3"
        stroke-linejoin="round"
      />
      <path
        d="M8.2424 18.749C8.2557 18.0066 8.41783 15.3931 9.94731 12.9602C12.7203 8.54874 17.8143 7.04435 21.3747 7.51162C23.7824 7.82952 25.7213 8.72457 27.6661 10.4133C28.1418 10.8261 29.0873 11.7358 30.0788 13.1889C30.938 14.4477 31.3289 15.306 31.9772 16.7283C32.4807 17.9346 30.6429 19.9811 26.9182 22.1554C21.7076 25.2002 14.7679 27.3401 11.422 26.9387C10.4644 26.8242 9.90411 26.5128 9.71568 26.0567C8.99785 24.1697 8.18487 22.0276 8.2424 18.749Z"
        fill="#FFD520"
      />
      <path
        d="M8.2424 18.749C8.2557 18.0066 8.41783 15.3931 9.94731 12.9602C12.7203 8.54874 17.8143 7.04435 21.3747 7.51162C23.7824 7.82952 25.7213 8.72457 27.6661 10.4133C28.1418 10.8261 29.0873 11.7358 30.0788 13.1889C30.938 14.4477 31.3289 15.306 31.9772 16.7283C32.4807 17.9346 30.6429 19.9811 26.9182 22.1554C21.7076 25.2002 14.7679 27.3401 11.422 26.9387C10.4644 26.8242 9.90411 26.5128 9.71568 26.0567C8.99785 24.1697 8.18487 22.0276 8.2424 18.749Z"
        stroke="black"
        stroke-width="3"
        stroke-linejoin="round"
      />
      <path
        d="M8.2424 18.749C8.2557 18.0066 8.41783 15.3931 9.94731 12.9602C12.7203 8.54874 17.8143 7.04435 21.3747 7.51162C23.7824 7.82952 25.7213 8.72457 27.6661 10.4133C28.1418 10.8261 29.0873 11.7358 30.0788 13.1889C30.938 14.4477 31.3289 15.306 31.9772 16.7283C32.4807 17.9346 30.6429 19.9811 26.9182 22.1554C21.7076 25.2002 14.7679 27.3401 11.422 26.9387C10.4644 26.8242 9.90411 26.5128 9.71568 26.0567C8.99785 24.1697 8.18487 22.0276 8.2424 18.749Z"
        fill="url(#paint0_radial_133_492)"
        stroke="#FAC44B"
        stroke-width="3"
        stroke-linejoin="round"
      />
      <path
        d="M10.2859 12.3302C16.353 3.60831 29.2623 10.9335 31.9014 17.9958L32.7999 17.9851C29.6368 10.407 16.7631 2.66368 10.2859 12.3302Z"
        fill="#CCCCCC"
      />
      <path
        d="M33.6933 18.9478L32.7987 17.985L31.9002 17.9956L33.6933 18.9478Z"
        fill="#CCCCCC"
      />
      <path
        d="M30.0378 20.412C27.1753 13.5529 18.6224 4.57466 12.2229 10.0942C19.0486 4.08664 29.9261 11.1026 32.7981 17.9844L33.6927 18.9475L30.9301 21.3738L30.0378 20.412Z"
        fill="#FFD467"
      />
      <path
        d="M30.0388 20.411L30.9331 21.3743L28.4965 20.8397C25.8579 13.7767 16.355 3.60846 10.2864 12.3286C16.7642 2.66367 26.8755 12.8312 30.0388 20.411Z"
        fill="#CCCCCC"
      />
      <path
        d="M30.0388 20.411L30.9331 21.3743L28.4965 20.8397C25.8579 13.7767 16.355 3.60846 10.2864 12.3286C16.7642 2.66367 26.8755 12.8312 30.0388 20.411Z"
        fill="#FFBD34"
      />
      <path
        d="M17.161 20.6299L16.6841 21.7945L17.9412 25.1804L18.2065 22.7831L17.161 20.6299Z"
        fill="#FFBD34"
        stroke="#FFBD34"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.8654 22.3789L11.6147 22.9886L12.873 26.375L12.745 24.1408L11.8654 22.3789Z"
        fill="black"
      />
      <path
        d="M17.9407 25.1798C17.9407 25.1798 13.1943 26.5036 12.8735 26.3719C12.5529 26.2423 11.615 22.9865 11.615 22.9865L16.6831 21.7917L17.9407 25.1798Z"
        fill="#FFD467"
        stroke="#FFD467"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.6161 22.9894L12.0949 21.8249L17.162 20.6304L16.6851 21.795L11.6161 22.9894Z"
        fill="#F4B253"
        stroke="#F4B253"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <radialGradient
          id="paint0_radial_133_492"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(22.6797 11.3983) rotate(157.347) scale(21.0114 21.0114)"
        >
          <stop offset="0.5" stop-color="#FFD046" />
          <stop offset="1" stop-color="#F0A957" />
        </radialGradient>
      </defs>
    </svg>
  </LogoArea>
);

const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 0.5em;
  flex: none;
  order: 0;
  align-self: stretch;
  font-style: normal;
  font-weight: 500;
  font-size: 1em;
  line-height: 1em;
  text-align: right;
  color: #666666;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const info = <Info>Aug 25- Sep 10 </Info>;

const actions = (
  <ActionArea>
    {info}
    <Widget src={`${ownerId}/widget/BOSHACKS.Register.Button`} />
  </ActionArea>
);

return (
  <Navbar>
    {logo}
    {actions}
  </Navbar>
);
