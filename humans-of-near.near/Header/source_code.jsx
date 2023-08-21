const LogoContainer = styled.div`
  position: absolute;
  top: 20px;
  left:10px;
  display:block;
  overflow:hidden;
  pointer-events:auto;
  @media (max-width: 510px) {
    width: 280px;
    top: 10px;
    left: 20px;
  }
`;
const Logo = () => (
  <LogoContainer>
    <svg
      width="135"
      height="135"
      //viewBox="0 0 135 135"
      //fill="none"
      //xmlns="http://www.w3.org/2000/svg"

      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.22515 82V0.931017H23.2341V32.5986H52.3683V0.931017H74.3772V82H52.3683V50.3324H23.2341V82H1.22515ZM124.57 55.3992V21.1983H146.421V82H125.679V70.4413H125.045C123.726 74.3206 121.417 77.3554 118.118 79.5458C114.819 81.7097 110.901 82.7917 106.361 82.7917C102.113 82.7917 98.3918 81.8153 95.1987 79.8624C92.0319 77.9096 89.5645 75.2179 87.7964 71.7872C86.0547 68.3566 85.1706 64.4245 85.1442 59.991V21.1983H106.995V55.3992C107.021 58.4077 107.787 60.7695 109.291 62.4849C110.821 64.2002 112.959 65.0578 115.703 65.0578C117.524 65.0578 119.094 64.6752 120.414 63.9099C121.76 63.1182 122.789 62.0098 123.502 60.5848C124.24 59.1334 124.597 57.4049 124.57 55.3992ZM157.534 82V21.1983H178.277V32.7569H178.91C180.177 28.9568 182.341 25.9484 185.402 23.7317C188.463 21.5149 192.105 20.4066 196.327 20.4066C200.602 20.4066 204.284 21.5413 207.371 23.8108C210.459 26.054 212.319 29.036 212.953 32.7569H213.586C214.615 29.036 216.805 26.054 220.157 23.8108C223.508 21.5413 227.44 20.4066 231.953 20.4066C237.785 20.4066 242.509 22.2802 246.124 26.0276C249.766 29.7749 251.587 34.7625 251.587 40.9905V82H229.736V46.5323C229.736 43.867 229.063 41.7822 227.718 40.278C226.372 38.7474 224.564 37.9821 222.294 37.9821C220.051 37.9821 218.27 38.7474 216.951 40.278C215.657 41.7822 215.011 43.867 215.011 46.5323V82H194.11V46.5323C194.11 43.867 193.437 41.7822 192.092 40.278C190.746 38.7474 188.938 37.9821 186.668 37.9821C185.164 37.9821 183.871 38.3251 182.789 39.0113C181.707 39.6974 180.863 40.687 180.256 41.9801C179.675 43.2468 179.385 44.7642 179.385 46.5323V82H157.534ZM279.306 82.95C275.427 82.95 271.996 82.3167 269.014 81.05C266.058 79.7569 263.736 77.804 262.047 75.1915C260.358 72.5789 259.514 69.2538 259.514 65.2162C259.514 61.8911 260.081 59.0542 261.216 56.7055C262.351 54.3305 263.934 52.3908 265.966 50.8866C267.998 49.3824 270.36 48.2345 273.052 47.4428C275.77 46.6511 278.699 46.1365 281.839 45.899C285.244 45.6351 287.975 45.3184 290.033 44.9489C292.118 44.5531 293.622 44.0121 294.546 43.326C295.47 42.6135 295.931 41.6766 295.931 40.5155V40.3571C295.931 38.7738 295.325 37.5598 294.111 36.7154C292.897 35.8709 291.34 35.4487 289.44 35.4487C287.355 35.4487 285.653 35.9105 284.333 36.8341C283.04 37.7314 282.262 39.1168 281.998 40.9905H261.889C262.153 37.2959 263.327 33.8917 265.412 30.7777C267.523 27.6373 270.597 25.1303 274.635 23.2567C278.673 21.3566 283.713 20.4066 289.756 20.4066C294.111 20.4066 298.016 20.9212 301.473 21.9504C304.93 22.9532 307.873 24.365 310.301 26.1859C312.728 27.9804 314.576 30.0916 315.842 32.5194C317.136 34.9209 317.782 37.5335 317.782 40.3571V82H297.357V73.4498H296.881C295.668 75.7193 294.19 77.5533 292.448 78.952C290.733 80.3506 288.767 81.3666 286.55 82C284.36 82.6334 281.945 82.95 279.306 82.95ZM286.431 69.1746C288.094 69.1746 289.651 68.8316 291.102 68.1454C292.58 67.4593 293.781 66.4697 294.704 65.1766C295.628 63.8835 296.09 62.3133 296.09 60.4661V55.3992C295.509 55.6367 294.889 55.8611 294.229 56.0722C293.596 56.2833 292.91 56.4812 292.171 56.6659C291.458 56.8507 290.693 57.0222 289.875 57.1805C289.083 57.3389 288.252 57.484 287.381 57.616C285.692 57.8799 284.307 58.3153 283.225 58.9223C282.169 59.5028 281.378 60.2285 280.85 61.0994C280.348 61.9439 280.098 62.8939 280.098 63.9495C280.098 65.6384 280.691 66.9315 281.879 67.8288C283.067 68.726 284.584 69.1746 286.431 69.1746ZM350.073 47.799V82H328.222V21.1983H348.965V32.7569H349.598C350.918 28.904 353.24 25.8824 356.565 23.6921C359.916 21.5017 363.822 20.4066 368.282 20.4066C372.583 20.4066 376.318 21.3962 379.484 23.3754C382.678 25.3282 385.145 28.02 386.887 31.4506C388.655 34.8813 389.526 38.8002 389.499 43.2072V82H367.649V47.799C367.675 44.7906 366.91 42.4287 365.353 40.7134C363.822 38.9981 361.685 38.1404 358.94 38.1404C357.146 38.1404 355.575 38.5363 354.229 39.3279C352.91 40.0932 351.894 41.2016 351.181 42.653C350.469 44.0781 350.1 45.7934 350.073 47.799ZM455.863 40.9905H435.754C435.648 39.7502 435.213 38.6814 434.447 37.7842C433.682 36.8869 432.693 36.2008 431.479 35.7258C430.291 35.2244 428.972 34.9737 427.52 34.9737C425.646 34.9737 424.037 35.3167 422.691 36.0029C421.345 36.689 420.685 37.6654 420.712 38.9321C420.685 39.8294 421.068 40.6606 421.86 41.4259C422.678 42.1912 424.248 42.785 426.57 43.2072L438.92 45.424C445.148 46.5587 449.78 48.472 452.815 51.1637C455.876 53.8291 457.42 57.4049 457.446 61.8911C457.42 66.219 456.127 69.9795 453.567 73.1727C451.033 76.3394 447.563 78.7937 443.156 80.5354C438.775 82.2507 433.774 83.1084 428.153 83.1084C418.864 83.1084 411.594 81.2083 406.342 77.4082C401.117 73.6081 398.201 68.5941 397.594 62.3661H419.287C419.577 64.2925 420.527 65.7836 422.137 66.8391C423.773 67.8683 425.831 68.3829 428.312 68.3829C430.317 68.3829 431.967 68.0399 433.26 67.3537C434.579 66.6676 435.252 65.6912 435.279 64.4245C435.252 63.2634 434.672 62.3397 433.537 61.6536C432.429 60.9675 430.687 60.4133 428.312 59.991L417.545 58.091C411.343 57.009 406.699 54.9506 403.611 51.9158C400.524 48.881 398.993 44.9753 399.019 40.1988C398.993 35.9765 400.101 32.4007 402.344 29.4714C404.614 26.5158 407.847 24.2727 412.043 22.7421C416.265 21.1851 421.266 20.4066 427.045 20.4066C435.833 20.4066 442.76 22.2275 447.827 25.8692C452.92 29.511 455.599 34.5514 455.863 40.9905ZM20.7007 182.95C16.7621 182.95 13.2786 181.951 10.2504 179.952C7.24199 177.952 4.88671 175.191 3.18458 171.668C1.48245 168.126 0.631382 164.039 0.631382 159.407C0.631382 154.736 1.48245 150.629 3.18458 147.087C4.88671 143.524 7.24199 140.753 10.2504 138.774C13.2786 136.775 16.7621 135.775 20.7007 135.775C24.6394 135.775 28.1129 136.775 31.1213 138.774C34.1297 140.773 36.485 143.544 38.1871 147.087C39.9091 150.629 40.77 154.736 40.77 159.407C40.77 164.039 39.919 168.126 38.2168 171.668C36.5147 175.191 34.1495 177.952 31.1213 179.952C28.1129 181.951 24.6394 182.95 20.7007 182.95ZM20.7007 178.111C23.8675 178.111 26.5493 177.26 28.7462 175.558C30.9432 173.855 32.6057 171.589 33.7339 168.759C34.8818 165.929 35.4558 162.811 35.4558 159.407C35.4558 156.003 34.8818 152.876 33.7339 150.026C32.6057 147.176 30.9432 144.89 28.7462 143.168C26.5493 141.446 23.8675 140.585 20.7007 140.585C17.5537 140.585 14.8719 141.446 12.6552 143.168C10.4582 144.89 8.78578 147.176 7.63783 150.026C6.50968 152.876 5.9456 156.003 5.9456 159.407C5.9456 162.811 6.50968 165.929 7.63783 168.759C8.78578 171.589 10.4582 173.855 12.6552 175.558C14.8521 177.26 17.5339 178.111 20.7007 178.111ZM71.1338 136.399V141H48.7191V136.399H71.1338ZM55.7255 182V129.719C55.7255 127.265 56.2896 125.196 57.4178 123.514C58.5657 121.832 60.06 120.555 61.9007 119.684C63.7414 118.813 65.6909 118.378 67.7493 118.378C69.1348 118.378 70.2827 118.497 71.1932 118.734C72.1234 118.952 72.8557 119.17 73.3901 119.387L71.8463 124.019C71.4505 123.9 70.9656 123.761 70.3916 123.603C69.8176 123.445 69.0952 123.366 68.2243 123.366C65.9284 123.366 64.157 124.009 62.9101 125.295C61.6632 126.582 61.0397 128.422 61.0397 130.817L61.0101 182H55.7255ZM153.645 121.198V182H148.242L112.319 131.084H111.844V182H106.292V121.198H111.666L147.707 172.173H148.182V121.198H153.645ZM169.81 182V121.198H205.08V126.186H175.362V149.076H203.21V154.063H175.362V177.012H205.674V182H169.81ZM219.538 182H213.719L235.837 121.198H241.775L263.893 182H258.074L239.014 128.413H238.598L219.538 182ZM223.724 158.695H253.888V163.682H223.724V158.695ZM274.313 182V121.198H293.937C298.252 121.198 301.854 121.98 304.744 123.544C307.653 125.087 309.84 127.235 311.305 129.986C312.79 132.717 313.532 135.854 313.532 139.397C313.532 142.94 312.79 146.067 311.305 148.779C309.84 151.49 307.663 153.608 304.774 155.132C301.884 156.656 298.302 157.418 294.026 157.418H277.312V152.341H293.878C297.045 152.341 299.677 151.817 301.775 150.768C303.893 149.719 305.466 148.225 306.496 146.285C307.545 144.345 308.069 142.049 308.069 139.397C308.069 136.745 307.545 134.429 306.496 132.45C305.447 130.451 303.863 128.907 301.745 127.819C299.647 126.73 296.995 126.186 293.789 126.186H279.865V182H274.313ZM301.122 154.568L316.085 182H309.672L294.858 154.568H301.122Z"
        fill="white"
      />
      <path
        d="M4.39078 230L4.39078 204.469H12.6309C14.4426 204.469 15.9552 204.818 17.1686 205.517C18.3902 206.206 19.3086 207.145 19.9236 208.334C20.5469 209.522 20.8585 210.86 20.8585 212.348C20.8585 213.836 20.551 215.178 19.936 216.375C19.321 217.563 18.4069 218.506 17.1935 219.204C15.9801 219.894 14.4717 220.239 12.6683 220.239H6.1859V218.145H12.606C13.944 218.145 15.0535 217.895 15.9344 217.397C16.8153 216.89 17.4719 216.2 17.9041 215.327C18.3445 214.455 18.5648 213.462 18.5648 212.348C18.5648 211.234 18.3445 210.241 17.9041 209.369C17.4719 208.496 16.8112 207.81 15.9219 207.312C15.041 206.813 13.9232 206.564 12.5686 206.564H6.72195L6.72195 230H4.39078ZM33.1065 230.399C31.4526 230.399 29.9899 229.979 28.7184 229.14C27.4552 228.3 26.4662 227.141 25.7515 225.662C25.0367 224.174 24.6794 222.458 24.6794 220.513C24.6794 218.552 25.0367 216.827 25.7515 215.34C26.4662 213.844 27.4552 212.68 28.7184 211.849C29.9899 211.01 31.4526 210.59 33.1065 210.59C34.7603 210.59 36.2189 211.01 37.4821 211.849C38.7453 212.689 39.7343 213.852 40.449 215.34C41.1721 216.827 41.5336 218.552 41.5336 220.513C41.5336 222.458 41.1762 224.174 40.4615 225.662C39.7468 227.141 38.7536 228.3 37.4821 229.14C36.2189 229.979 34.7603 230.399 33.1065 230.399ZM33.1065 228.367C34.4362 228.367 35.5623 228.01 36.4848 227.295C37.4073 226.58 38.1054 225.629 38.5791 224.44C39.0611 223.252 39.3021 221.943 39.3021 220.513C39.3021 219.084 39.0611 217.771 38.5791 216.574C38.1054 215.377 37.4073 214.417 36.4848 213.694C35.5623 212.971 34.4362 212.61 33.1065 212.61C31.7851 212.61 30.659 212.971 29.7282 213.694C28.8057 214.417 28.1034 215.377 27.6214 216.574C27.1477 217.771 26.9108 219.084 26.9108 220.513C26.9108 221.943 27.1477 223.252 27.6214 224.44C28.1034 225.629 28.8057 226.58 29.7282 227.295C30.6507 228.01 31.7768 228.367 33.1065 228.367ZM50.0043 230L44.22 210.852H46.5636L51.1013 226.647H51.2634L55.7886 210.852H58.1447L62.6325 226.609H62.807L67.3447 210.852H69.6883L63.904 230H61.6102L57.0726 214.305H56.8357L52.2981 230H50.0043ZM81.0917 230.399C79.3049 230.399 77.7591 229.983 76.4543 229.152C75.1495 228.313 74.1397 227.154 73.425 225.674C72.7186 224.187 72.3654 222.475 72.3654 220.538C72.3654 218.61 72.7186 216.898 73.425 215.402C74.1397 213.898 75.1246 212.722 76.3795 211.874C77.6427 211.018 79.1012 210.59 80.7551 210.59C81.7939 210.59 82.7954 210.781 83.7594 211.164C84.7235 211.538 85.5878 212.115 86.3524 212.896C87.1253 213.669 87.7361 214.646 88.1849 215.826C88.6337 216.998 88.8581 218.386 88.8581 219.99V221.087L73.8987 221.087V219.13L86.5892 219.13C86.5892 217.9 86.3399 216.794 85.8413 215.814C85.3509 214.825 84.6653 214.043 83.7844 213.47C82.9117 212.896 81.902 212.61 80.7551 212.61C79.5417 212.61 78.4738 212.934 77.5513 213.582C76.6288 214.23 75.9058 215.086 75.3822 216.15C74.8669 217.214 74.6051 218.377 74.5968 219.641V220.812C74.5968 222.333 74.8586 223.663 75.3822 224.802C75.9141 225.932 76.6662 226.809 77.6386 227.432C78.6109 228.055 79.762 228.367 81.0917 228.367C81.9975 228.367 82.7912 228.226 83.4727 227.943C84.1625 227.661 84.7401 227.282 85.2055 226.809C85.6792 226.327 86.0366 225.799 86.2776 225.225L88.3843 225.911C88.0935 226.717 87.6156 227.461 86.9507 228.143C86.2942 228.824 85.4714 229.373 84.4825 229.788C83.5018 230.195 82.3715 230.399 81.0917 230.399ZM93.7479 230V210.852H95.9045V213.794H96.0666C96.4489 212.83 97.1137 212.053 98.0612 211.463C99.0169 210.865 100.097 210.565 101.302 210.565C101.485 210.565 101.689 210.569 101.913 210.578C102.138 210.586 102.325 210.594 102.474 210.603V212.859C102.374 212.842 102.2 212.818 101.951 212.784C101.701 212.751 101.431 212.734 101.14 212.734C100.143 212.734 99.2538 212.946 98.4726 213.37C97.6997 213.786 97.0888 214.363 96.64 215.103C96.1913 215.843 95.9669 216.686 95.9669 217.634V230H93.7479ZM113.419 230.399C111.633 230.399 110.087 229.983 108.782 229.152C107.477 228.313 106.467 227.154 105.753 225.674C105.046 224.187 104.693 222.475 104.693 220.538C104.693 218.61 105.046 216.898 105.753 215.402C106.467 213.898 107.452 212.722 108.707 211.874C109.97 211.018 111.429 210.59 113.083 210.59C114.122 210.59 115.123 210.781 116.087 211.164C117.051 211.538 117.916 212.115 118.68 212.896C119.453 213.669 120.064 214.646 120.513 215.826C120.961 216.998 121.186 218.386 121.186 219.99V221.087H106.226V219.13H118.917C118.917 217.9 118.668 216.794 118.169 215.814C117.679 214.825 116.993 214.043 116.112 213.47C115.239 212.896 114.23 212.61 113.083 212.61C111.869 212.61 110.802 212.934 109.879 213.582C108.957 214.23 108.234 215.086 107.71 216.15C107.195 217.214 106.933 218.377 106.925 219.641V220.812C106.925 222.333 107.186 223.663 107.71 224.802C108.242 225.932 108.994 226.809 109.966 227.432C110.939 228.055 112.09 228.367 113.419 228.367C114.325 228.367 115.119 228.226 115.8 227.943C116.49 227.661 117.068 227.282 117.533 226.809C118.007 226.327 118.364 225.799 118.605 225.225L120.712 225.911C120.421 226.717 119.943 227.461 119.278 228.143C118.622 228.824 117.799 229.373 116.81 229.788C115.83 230.195 114.699 230.399 113.419 230.399ZM132.969 230.399C131.399 230.399 130.023 229.983 128.843 229.152C127.663 228.321 126.741 227.162 126.076 225.674C125.419 224.187 125.091 222.454 125.091 220.476C125.091 218.506 125.419 216.782 126.076 215.302C126.741 213.815 127.667 212.66 128.856 211.837C130.044 211.006 131.428 210.59 133.007 210.59C134.17 210.59 135.139 210.798 135.911 211.214C136.684 211.621 137.303 212.128 137.769 212.734C138.234 213.341 138.596 213.931 138.853 214.505H139.053V204.469H141.284V230H139.115V226.447H138.853C138.596 227.029 138.23 227.627 137.756 228.242C137.283 228.849 136.655 229.36 135.874 229.776C135.101 230.191 134.133 230.399 132.969 230.399ZM133.231 228.367C134.469 228.367 135.525 228.03 136.398 227.357C137.27 226.676 137.935 225.741 138.392 224.552C138.858 223.356 139.09 221.984 139.09 220.438C139.09 218.909 138.862 217.559 138.405 216.387C137.948 215.207 137.283 214.284 136.41 213.62C135.537 212.946 134.478 212.61 133.231 212.61C131.951 212.61 130.871 212.959 129.99 213.657C129.117 214.347 128.453 215.282 127.995 216.462C127.547 217.642 127.322 218.967 127.322 220.438C127.322 221.926 127.551 223.268 128.008 224.465C128.465 225.662 129.13 226.613 130.002 227.32C130.883 228.018 131.96 228.367 133.231 228.367ZM157.939 230V204.469H166.553C168.215 204.469 169.599 204.76 170.704 205.342C171.818 205.924 172.653 206.717 173.21 207.723C173.767 208.729 174.045 209.871 174.045 211.151C174.045 212.215 173.867 213.125 173.509 213.881C173.152 214.638 172.666 215.248 172.051 215.714C171.436 216.179 170.75 216.516 169.994 216.724V216.923C170.817 216.981 171.614 217.272 172.387 217.796C173.16 218.311 173.796 219.034 174.295 219.965C174.793 220.896 175.043 222.009 175.043 223.306C175.043 224.594 174.756 225.745 174.182 226.759C173.609 227.764 172.728 228.558 171.54 229.14C170.359 229.713 168.855 230 167.027 230H157.939ZM160.27 227.906H167.027C168.996 227.906 170.451 227.469 171.39 226.597C172.337 225.724 172.811 224.627 172.811 223.306C172.811 222.333 172.574 221.452 172.101 220.663C171.635 219.865 170.974 219.233 170.118 218.768C169.271 218.303 168.273 218.07 167.127 218.07H160.27V227.906ZM160.27 216.001H166.765C167.771 216.001 168.652 215.793 169.408 215.377C170.164 214.962 170.754 214.388 171.178 213.657C171.602 212.926 171.814 212.09 171.814 211.151C171.814 209.797 171.373 208.695 170.492 207.848C169.611 206.992 168.298 206.564 166.553 206.564H160.27V216.001ZM181.752 237.18C181.312 237.18 180.901 237.139 180.518 237.056C180.136 236.973 179.833 236.881 179.608 236.782L180.207 234.824C180.963 235.057 181.636 235.14 182.226 235.074C182.816 235.016 183.34 234.75 183.797 234.276C184.254 233.81 184.661 233.096 185.019 232.132L185.717 230.187L178.673 210.852H181.079L186.764 227.07H186.938L192.623 210.852H195.029L186.926 233.029C186.585 233.952 186.165 234.721 185.667 235.335C185.168 235.959 184.591 236.42 183.934 236.719C183.286 237.027 182.559 237.18 181.752 237.18Z"
        fill="white"
      />
      <g clip-path="url(#clip0_7_11)">
        <path
          d="M25.4853 305.708V274.197H36.3424L42.3548 301.657H43.1334V274.197H48.7566V305.708H37.8995L31.8871 278.249H31.1085V305.708H25.4853Z"
          fill="url(#paint0_linear_7_11)"
        />
        <path
          d="M53.1653 305.708V274.197H72.1976V279.599H58.8747V287.207H71.1595V292.609H58.8747V305.708H53.1653Z"
          fill="url(#paint1_linear_7_11)"
        />
        <path
          d="M81.9807 305.708V279.599H73.1571V274.197H96.5147V279.599H87.6906V305.708H81.9807Z"
          fill="url(#paint2_linear_7_11)"
        />
        <path
          d="M29.4623 341.134L25.5159 309.885H31.1352L34.0521 337.026H34.8242L38.599 309.885H48.3792L52.1542 337.026H52.9263L55.8429 309.885H61.4622L57.5161 341.134H47.7358L43.8752 313.366H43.1031L39.2425 341.134H29.4623Z"
          fill="url(#paint3_linear_7_11)"
        />
        <path
          d="M76.1576 341.758C74.0983 341.758 72.2255 341.282 70.5383 340.33C68.8795 339.348 67.5499 337.934 66.5489 336.089C65.5764 334.214 65.0906 331.937 65.0906 329.259V321.759C65.0906 317.741 66.1773 314.661 68.3504 312.518C70.5239 310.346 73.4694 309.26 77.187 309.26C80.8761 309.26 83.7214 310.286 85.7234 312.34C87.7537 314.363 88.7687 317.116 88.7687 320.599V320.777H83.1923V320.42C83.1923 319.319 82.9634 318.322 82.506 317.429C82.0771 316.536 81.4193 315.837 80.533 315.331C79.6463 314.795 78.5311 314.527 77.187 314.527C75.1851 314.527 73.6125 315.167 72.4684 316.447C71.3248 317.727 70.7528 319.468 70.7528 321.67V329.348C70.7528 331.52 71.3248 333.277 72.4684 334.616C73.6125 335.926 75.214 336.58 77.2728 336.58C79.3316 336.58 80.8333 336.015 81.7769 334.884C82.7205 333.753 83.1923 332.324 83.1923 330.598V330.152H76.0718V325.152H88.7687V341.134H83.5354V338.143H82.7634C82.5634 338.649 82.2342 339.184 81.7769 339.749C81.348 340.315 80.6901 340.791 79.8039 341.178C78.9171 341.565 77.7017 341.758 76.1576 341.758Z"
          fill="url(#paint4_linear_7_11)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M23.8386 255.223C15.0547 255.223 7.93393 262.642 7.93393 271.792C7.93393 273.787 6.38169 275.404 4.46695 275.404C2.55221 275.404 1 273.787 1 271.792C1 258.652 11.2252 248 23.8386 248H97.5981C110.522 248 121 258.915 121 272.379V330.709C121 332.703 119.448 334.321 117.533 334.321C115.618 334.321 114.066 332.703 114.066 330.709V272.379C114.066 262.904 106.693 255.223 97.5981 255.223H23.8386Z"
          fill="url(#paint5_linear_7_11)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.46695 287.549C6.38169 287.549 7.93393 289.166 7.93393 291.16V343.621C7.93393 353.095 15.3069 360.776 24.4019 360.776H53.1778C55.0925 360.776 56.6448 362.394 56.6448 364.388C56.6448 366.383 55.0925 368 53.1778 368H24.4019C11.4774 368 1 357.085 1 343.621V291.16C1 289.166 2.55221 287.549 4.46695 287.549Z"
          fill="url(#paint6_linear_7_11)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_7_11"
          x1="0.999988"
          y1="301.361"
          x2="114.428"
          y2="301.361"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#00C5FF" />
          <stop offset="0.335634" stop-color="#76A0D6" />
          <stop offset="0.617521" stop-color="#FEC9C4" />
          <stop offset="1" stop-color="#FAE2AD" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_7_11"
          x1="0.99999"
          y1="301.361"
          x2="114.428"
          y2="301.361"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#00C5FF" />
          <stop offset="0.335634" stop-color="#76A0D6" />
          <stop offset="0.617521" stop-color="#FEC9C4" />
          <stop offset="1" stop-color="#FAE2AD" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_7_11"
          x1="1"
          y1="301.361"
          x2="114.428"
          y2="301.361"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#00C5FF" />
          <stop offset="0.335634" stop-color="#76A0D6" />
          <stop offset="0.617521" stop-color="#FEC9C4" />
          <stop offset="1" stop-color="#FAE2AD" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_7_11"
          x1="0.999997"
          y1="301.361"
          x2="114.428"
          y2="301.361"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#00C5FF" />
          <stop offset="0.335634" stop-color="#76A0D6" />
          <stop offset="0.617521" stop-color="#FEC9C4" />
          <stop offset="1" stop-color="#FAE2AD" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_7_11"
          x1="1.00003"
          y1="301.361"
          x2="114.428"
          y2="301.361"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#00C5FF" />
          <stop offset="0.335634" stop-color="#76A0D6" />
          <stop offset="0.617521" stop-color="#FEC9C4" />
          <stop offset="1" stop-color="#FAE2AD" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_7_11"
          x1="4.90033"
          y1="282.456"
          x2="134.957"
          y2="328.163"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#0094E9" />
          <stop offset="0.479167" stop-color="#C154C5" />
          <stop offset="1" stop-color="#FF4B3C" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_7_11"
          x1="4.90032"
          y1="291.431"
          x2="41.0441"
          y2="362.865"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#00758C" />
          <stop offset="0.526042" stop-color="#00916A" />
          <stop offset="1" stop-color="#25A45B" />
        </linearGradient>
        <clipPath id="clip0_7_11">
          <rect
            width="120"
            height="120"
            fill="white"
            transform="translate(1 248)"
          />
        </clipPath>
      </defs>
    </svg>
  </LogoContainer>
);
return (
  <div className="logo">
    <Logo />
  </div>
);
