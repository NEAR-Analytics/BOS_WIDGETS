const Layout = styled.div``;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;

  .flex-grow {
    flex-grow: 1;
  }
  .contentOut {
    /* padding-top: 25px;
    margin-left: 35px; */
  }
  .contentOut p {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #ffffff;
  }
  @media (max-width: 900px) {
    display: grid;
    .contentOut {
      padding: 0;
      margin: 0 0 36px 0;
    }
    .contentOut p {
      display: none;
    }
  }
`;

const MenuContainer = styled.div`
  margin-right: 35px;
  .item {
    display: flex;
    align-items: center;
    padding-left: 40px;
    width: 180px;
    height: 64px;
    font-weight: 500;
    font-size: 16px;
    color: #7e8a93;
    cursor: pointer;
    margin-bottom: 2px;
    border-right: "none";
    transition: 0.5s;
    border-radius: 16px;
    :hover {
      background: linear-gradient(270deg, #373a53 0%, rgba(55, 58, 83, 0) 100%);
      color: #ffffff;
    }
  }
  .item.active {
    color: #ffffff;
    background: linear-gradient(270deg, #373a53 0%, rgba(55, 58, 83, 0) 100%);
  }
  .item.disable {
    cursor: not-allowed;
  }
  .icon {
    width: 26px;
  }
  @media (max-width: 900px) {
    margin: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 16px;
    background: #222436;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    padding: 0 16px;
    .item {
      width: auto;
      padding: 0;
      height: 76px;
      display: grid;
      text-align: center;
      align-items: center;
      span {
        margin-left: 26px;
        margin-bottom: -28px;
      }
    }
    .item.active {
      background-image: none;
      color: #e9f456;
      border-color: transparent;
    }
  }
`;

const { activeMenu } = state;

const storedActiveMenu = Storage.get(
  "activeMenu",
  "bluebiu.near/widget/Base.All-in-one"
);

State.init({
  activeMenu: storedActiveMenu || "Bridge",
});

State.init({
  activeMenu: "Bridge",
});
function changeTab(menu) {
  State.update({
    activeMenu: menu,
  });
  Storage.set("activeMenu", menu);
}

const bridgeIcon = (
  <svg
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0_1328_7364"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="18"
      height="18"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.7684 3.3323C16.5569 2.49226 15.0859 2 13.5 2C9.35786 2 6 5.35786 6 9.5C6 13.6421 9.35786 17 13.5 17C13.9539 17 14.3984 16.9597 14.8302 16.8824C13.3983 17.5946 11.7518 18 10 18C4.47715 18 0 13.9706 0 9C0 4.02944 4.47715 0 10 0C13.1361 0 15.935 1.29925 17.7684 3.3323Z"
        fill="currentColor"
      />
    </mask>
    <g mask="url(#mask0_1328_7364)">
      <rect width="19" height="11" fill="currentColor" />
    </g>
    <mask
      id="mask1_1328_7364"
      maskUnits="userSpaceOnUse"
      x="8"
      y="4"
      width="11"
      height="13"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.99975 5.42751C9.28439 5.37792 9.5772 5.35206 9.87604 5.35206C12.6763 5.35206 14.9463 7.62209 14.9463 10.4223C14.9463 13.1425 12.8042 15.3623 10.1149 15.487C10.9532 15.9225 11.9057 16.1686 12.9157 16.1686C16.276 16.1686 19 13.4446 19 10.0843C19 6.72403 16.276 4 12.9157 4C11.4242 4 10.058 4.5367 8.99975 5.42751Z"
        fill="currentColor"
      />
    </mask>
    <g mask="url(#mask1_1328_7364)">
      <rect
        width="9.99974"
        height="6.66649"
        transform="matrix(-1 0 0 1 19 4)"
        fill="currentColor"
      />
    </g>
  </svg>
);

const swapIcon = (
  <svg
    width="19"
    height="18"
    viewBox="0 0 16 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.2571 7.76056C11.1005 7.61142 10.8919 7.52941 10.6756 7.53205C10.4594 7.53468 10.2527 7.62176 10.0998 7.77467C9.94692 7.92758 9.85984 8.13422 9.85721 8.35045C9.85457 8.56669 9.93658 8.77539 10.0857 8.93199L10.7343 9.58056H4.41429C3.68252 9.5798 2.98095 9.28877 2.46351 8.77134C1.94607 8.2539 1.65505 7.55232 1.65429 6.82056C1.65416 6.18756 1.83563 5.56781 2.17715 5.03484C2.29574 4.85033 2.33617 4.62626 2.28955 4.41193C2.24294 4.19761 2.11309 4.01058 1.92858 3.89199C1.74406 3.7734 1.51999 3.73296 1.30567 3.77958C1.09134 3.82619 0.904308 3.95604 0.785718 4.14056C0.271637 4.93979 -0.00115865 5.87027 3.69903e-06 6.82056C0.00151569 7.99083 0.467076 9.11275 1.29459 9.94026C2.1221 10.7678 3.24401 11.2333 4.41429 11.2348H10.6486L10.0771 11.8063C9.93601 11.9643 9.86075 12.1703 9.86684 12.3821C9.87293 12.5939 9.95991 12.7953 10.1099 12.9449C10.2599 13.0945 10.4615 13.181 10.6733 13.1866C10.8851 13.1921 11.0909 13.1164 11.2486 12.9748L13.2657 10.9577C13.3425 10.881 13.4034 10.7899 13.445 10.6897C13.4866 10.5894 13.508 10.4819 13.508 10.3734C13.508 10.2649 13.4866 10.1574 13.445 10.0572C13.4034 9.9569 13.3425 9.86582 13.2657 9.78913L11.2571 7.76056Z"
      fill="currentColor"
    />
    <path
      d="M11.5857 2.132H4.80001L5.55144 1.38057C5.69258 1.22258 5.76784 1.01652 5.76175 0.804751C5.75566 0.592982 5.66868 0.39159 5.51869 0.241968C5.3687 0.0923464 5.1671 0.00586073 4.95532 0.000287087C4.74354 -0.00528655 4.53766 0.0704751 4.38001 0.212001L2.36287 2.22914C2.28607 2.30583 2.22514 2.39691 2.18357 2.49717C2.142 2.59743 2.12061 2.7049 2.12061 2.81343C2.12061 2.92196 2.142 3.02943 2.18357 3.12969C2.22514 3.22995 2.28607 3.32102 2.36287 3.39771L4.38001 5.41486C4.53766 5.55638 4.74354 5.63214 4.95532 5.62657C5.1671 5.621 5.3687 5.53451 5.51869 5.38489C5.66868 5.23527 5.75566 5.03388 5.76175 4.82211C5.76784 4.61034 5.69258 4.40428 5.55144 4.24629L5.09144 3.78629H11.5857C12.3175 3.78704 13.0191 4.07807 13.5365 4.59551C14.0539 5.11294 14.345 5.81452 14.3457 6.54629C14.3463 7.19597 14.1544 7.83126 13.7943 8.372C13.6748 8.5549 13.6323 8.77761 13.6762 8.99165C13.7201 9.20569 13.8467 9.39374 14.0286 9.51486C14.1644 9.60396 14.3233 9.65161 14.4857 9.652C14.6223 9.6521 14.7568 9.6182 14.877 9.55336C14.9972 9.48851 15.0994 9.39477 15.1743 9.28057C15.7132 8.47055 16.0005 7.51921 16 6.54629C15.9985 5.37601 15.5329 4.2541 14.7054 3.42658C13.8779 2.59907 12.756 2.13351 11.5857 2.132Z"
      fill="currentColor"
    />
  </svg>
);

const lendingIcon = (
  <svg
    width="19"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.25111 5.3989C3.24948 4.69153 3.38798 3.99077 3.6587 3.33662C3.92943 2.68247 4.32708 2.08776 4.82896 1.58642C5.33083 1.08509 5.92709 0.686954 6.58371 0.414755C7.24032 0.142557 7.94442 0.00162261 8.65581 0C11.6415 0 14.0605 2.41768 14.0605 5.3989C14.0615 6.35734 13.806 7.29877 13.3202 8.12656C12.8343 8.95434 12.1357 9.63863 11.296 10.1092C11.0196 10.9003 10.5025 11.5862 9.81645 12.0719C9.13035 12.5576 8.30926 12.8189 7.46706 12.8196H4.7965V10.9311H7.46982C8.66411 10.9311 9.6317 9.96487 9.6317 8.77184V8.63714H1.92275L1.89234 16.1115H13.9168C15.1097 16.1115 16.0786 15.1439 16.0786 13.9522L16.1077 11.3352H13.0902V9.4467H18L17.9696 13.9522C17.9714 15.0232 17.5456 16.0511 16.7857 16.8101C16.0257 17.5691 14.9938 17.9971 13.9168 18H0L0.03041 6.74725H3.42113C3.30789 6.30666 3.25077 5.85366 3.25111 5.3989ZM5.41161 6.74725H11.5213V7.42761C11.929 6.85446 12.1696 6.15486 12.1696 5.3989C12.1706 4.93906 12.0806 4.48351 11.9046 4.05827C11.7286 3.63303 11.4701 3.24644 11.1438 2.92058C10.8175 2.59472 10.4298 2.33598 10.0029 2.15913C9.57602 1.98228 9.11827 1.89079 8.65581 1.88989C8.19336 1.89079 7.73561 1.98228 7.30872 2.15913C6.88183 2.33598 6.49416 2.59472 6.16786 2.92058C5.84156 3.24644 5.58303 3.63303 5.40702 4.05827C5.23101 4.48351 5.14098 4.93906 5.14207 5.3989C5.14207 5.87584 5.23883 6.33354 5.41161 6.74725Z"
      fill="currentColor"
    />
  </svg>
);

const liquidityIcon = (
  <svg
    width="20"
    height="18"
    viewBox="0 0 20 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.67689 9.5C3.42392 8.81656 3.28571 8.07718 3.28571 7.30542C3.28571 3.82303 6.09992 1 9.57142 1C13.0429 1 15.8571 3.82303 15.8571 7.30542C15.8571 8.93781 15.2388 10.4253 14.2242 11.5451"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M1 10.5189C8.5 6.99986 11 14 18.1429 10.5189M1 15.5C8.5 11.9809 11 18.9811 18.1429 15.5"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

return (
  <Layout>
    <Container>
      <MenuContainer>
        <div
          onClick={() => {
            changeTab("Bridge");
          }}
          className={`item ${activeMenu == "Bridge" ? "active" : ""}`}
        >
          <span className="icon">{bridgeIcon}</span>Bridge
        </div>
        <div
          onClick={() => {
            changeTab("swap");
          }}
          className={`item ${activeMenu == "swap" ? "active" : ""}`}
        >
          <span className="icon">{swapIcon}</span>Swap
        </div>
        <div
          onClick={() => {
            changeTab("Liquidity");
          }}
          className={`item ${activeMenu == "Liquidity" ? "active" : ""}`}
        >
          <span className="icon">{liquidityIcon}</span>Liquidity
        </div>
        <div
          onClick={() => {
            changeTab("Lending");
          }}
          className={`item ${activeMenu == "Lending" ? "active" : ""}`}
        >
          <span className="icon">{lendingIcon}</span>Lending
        </div>
      </MenuContainer>
      <div className="flex-grow contentOut">
        {activeMenu == "Bridge" ? (
          <>
            <Widget
              src="bluebiu.near/widget/Linea.Bridge"
              props={{
                layout: "center",
              }}
            />
          </>
        ) : null}
        {activeMenu == "swap" ? (
          <>
            <Widget
              src="bluebiu.near/widget/Linea.Swap.Dex"
              props={{
                layout: "center",
              }}
            />
          </>
        ) : null}
        {activeMenu == "Liquidity" ? (
          <>
            <Widget src="bluebiu.near/widget/Linea.Liquidity.GAMMA" />
          </>
        ) : null}
        {activeMenu == "Lending" ? (
          <>
            <Widget src="bluebiu.near/widget/Linea.Lending" />
          </>
        ) : null}
      </div>
    </Container>
  </Layout>
);
