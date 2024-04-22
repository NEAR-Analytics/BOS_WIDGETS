const accountId = context.accountId;
const Owner = "dropcast.near";
const API_URL = props.API_URL || "http://localhost:2402";
const USER = props.USER || Storage.get("user", `${Owner}/widget/discord`);
const TOKEN = props.TOKEN || Storage.get("token", `${Owner}/widget/discord`);
const Logout = props.Logout;

const PAGES = [
  {
    title: "Dashboard",
    value: "dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        aria-hidden="true"
        style={{ width: 24, height: 24 }}
        className="text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    title: "Account",
    value: "account",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        aria-hidden="true"
        style={{ width: 24, height: 24 }}
        className="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    title: "Manager",
    value: "manager",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M10 12q-1.65 0-2.825-1.175T6 8q0-1.65 1.175-2.825T10 4q1.65 0 2.825 1.175T14 8q0 1.65-1.175 2.825T10 12m-8 8v-2.8q0-.825.425-1.55t1.175-1.1q1.275-.65 2.875-1.1T10 13h.35q.15 0 .3.05q-.2.45-.337.938T10.1 15H10q-1.775 0-3.187.45t-2.313.9q-.225.125-.363.35T4 17.2v.8h6.3q.15.525.4 1.038t.55.962zm14 1l-.3-1.5q-.3-.125-.562-.262T14.6 18.9l-1.45.45l-1-1.7l1.15-1q-.05-.35-.05-.65t.05-.65l-1.15-1l1-1.7l1.45.45q.275-.2.538-.337t.562-.263L16 11h2l.3 1.5q.3.125.563.275t.537.375l1.45-.5l1 1.75l-1.15 1q.05.3.05.625t-.05.625l1.15 1l-1 1.7l-1.45-.45q-.275.2-.537.338t-.563.262L18 21zm1-3q.825 0 1.413-.587T19 16q0-.825-.587-1.412T17 14q-.825 0-1.412.588T15 16q0 .825.588 1.413T17 18m-7-8q.825 0 1.413-.587T12 8q0-.825-.587-1.412T10 6q-.825 0-1.412.588T8 8q0 .825.588 1.413T10 10m.3 8"
        />
      </svg>
    ),
  },
  {
    title: "Custom Allowlist",
    value: "custom_allowlist",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: 24, height: 24 }}
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m10 0h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M10 13H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1m8 1h-2v2h-2v2h2v2h2v-2h2v-2h-2z"
        />
      </svg>
    ),
  },
  {
    title: "Airdrop",
    value: "airdrop",
    icon: (
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
      >
        <g id="_x30_9">
          <path
            d="m29 19h-6c-.265625 0-.5195313.1054688-.7070313.2929688l-3 3c-.2861328.2861328-.3720703.7158203-.2167969 1.0898438.154297.3735351.5195313.6171874.9238282.6171874h5v4h-4v-1h1c.5527344 0 1-.4477539 1-1s-.4472656-1-1-1h-5v-4h2c.5527344 0 1-.4477539 1-1v-2.7346191l3.8681641-6.7692871c.0859375-.150879.1318359-.3222657.1318359-.4960938 0-4.4111328-3.5888672-8-8-8s-8 3.5888672-8 8c0 .1738281.0458984.3452148.1318359.4960938l3.8681641 6.7692871v2.7346191c0 .5522461.4472656 1 1 1h2v4h-5c-.5527344 0-1 .4477539-1 1s.4472656 1 1 1h1v1h-4v-4h5c.4042969 0 .7695313-.2436523.9238281-.6171875.1552734-.3740234.0693359-.8037109-.2167969-1.0898438l-3-3c-.1874999-.1874999-.4414062-.2929687-.7070312-.2929687h-6c-.5527344 0-1 .4477539-1 1v6c0 .2651367.1054688.5195313.2929688.7070313l3 3c.0966796.0961914.2070312.1689453.3261718.2177734.116211.0483398.2441407.074707.3779297.0751953h.0029297 6c.5527344 0 1-.4477539 1-1v-2h6v2c0 .5522461.4472656 1 1 1h6 .0029297c.1337891-.0004883.2617188-.0268555.3779297-.0751953.1191406-.0488281.2294922-.121582.3261719-.2177734l3-3c.1875-.1875.2929687-.4418946.2929687-.7070313v-6c0-.5522461-.4472656-1-1-1zm-15.1804199-3h-.239502l-2.5800781-4.5161743v-.4838257c0-.5512695.4482422-1 1-1s1 .4487305 1 1c0 .057251.8195801 5 .8195801 5zm2.0275268 0-.8395386-5.0372925c.020813-.5331421.4539185-.9627075.9924317-.9627075s.9716187.4295654.9924316.9627075l-.8395385 5.0372925zm5.1528931-4.5161743-2.5800781 4.5161743h-.239502s.8195801-4.942749.8195801-5c0-.5512695.4482422-1 1-1s1 .4487305 1 1zm-5-7.4838257c2.8446045 0 5.2304688 1.9906616 5.843811 4.6513672-.5103759-.4016113-1.1453857-.6513672-1.843811-.6513672-.7675781 0-1.46875.2900391-2 .765625-.53125-.4755859-1.2324219-.765625-2-.765625s-1.46875.2900391-2 .765625c-.53125-.4755859-1.2324219-.765625-2-.765625-.6984253 0-1.3334351.2497559-1.843811.6513672.6133423-2.6607056 2.9992065-4.6513672 5.843811-4.6513672zm-2 15v-1h4v1zm-4.4140625 3h-3.171875l-1-1h3.171875zm-5.5859375 3.5859375v-3.171875l1 1v3.171875zm18.4140625-3.5859375 1-1h3.171875l-1 1zm4.5859375 4.5859375v-3.171875l1-1v3.171875z"
            fill="#000000"
            styl={{ fill: "rgb(255, 255, 255)" }}
          ></path>
        </g>
      </svg>
    ),
  },
  {
    title: "User Guide",
    value: "guide",
    link: "https://dropcast-user-guide.nearverselabs.com/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 256 256"
      >
        <path
          fill="currentColor"
          d="M224 48h-56a32 32 0 0 0-32 32v88a8 8 0 0 1-16 0V80a32 32 0 0 0-32-32H32a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h64a24 24 0 0 1 24 24a8 8 0 0 0 16 0a24 24 0 0 1 24-24h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16m-16 120h-40a8 8 0 0 1 0-16h40a8 8 0 0 1 0 16m0-32h-40a8 8 0 0 1 0-16h40a8 8 0 0 1 0 16m0-32h-40a8 8 0 0 1 0-16h40a8 8 0 0 1 0 16"
        />
      </svg>
    ),
  },
];

//Styles
const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 88vh;
    align-items: stretch;
    background: rgb(23,23,23);
    overflow: auto;
    position: relative;
    @media (max-width: 620px) {
        .sidebar-btn {
            display: flex;
        }
    }
`;

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  color: rgb(229 229 229);
`;

const SidebarButton = styled.button`
    top: 5px;
    left: 5px;
    padding: 0;
    z-index: 1;
    width: 29px;
    height: 29px;
    color: white;
    display: none;
    border: 1px solid;  
    position: absolute;
    align-items: center;
    justify-content: center;
`;

State.init({
  sidebar: false,
  page: "dashboard",
});

const changePage = (page) => {
  State.update({
    page,
    sidebar: false,
  });
};

const openSidebar = (value) => {
  State.update({
    sidebar: value,
  });
};

if (!accountId || !USER || !TOKEN)
  return <Widget src={`${Owner}/widget/login`} />;

return (
  <Wrapper className="root">
    <Widget
      src={`${Owner}/widget/sidebar`}
      props={{
        USER,
        PAGES,
        Logout,
        API_URL,
        changePage,
        openSidebar,
        sidebar: state.sidebar,
        currentPage: state.page,
      }}
    />
    <SidebarButton
      className="btn sidebar-btn"
      onClick={() => openSidebar(true)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M3 7h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2m18 10H7a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2m0-8H7a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2m0 4H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2"
        />
      </svg>
    </SidebarButton>
    <PageWrapper>
      {state.page === "dashboard" && (
        <Widget
          src={`${Owner}/widget/dashboard`}
          props={{ API_URL, USER, TOKEN, Logout }}
        />
      )}
      {state.page === "account" && (
        <Widget
          src={`${Owner}/widget/account`}
          props={{ API_URL, USER, TOKEN, Logout }}
        />
      )}
      {state.page === "manager" && (
        <Widget
          src={`${Owner}/widget/manager`}
          props={{ API_URL, USER, TOKEN, Logout, changePage }}
        />
      )}
      {state.page === "custom_allowlist" && (
        <Widget
          src={`${Owner}/widget/allowlist`}
          props={{ API_URL, USER, TOKEN, Logout }}
        />
      )}
      {state.page === "airdrop" && (
        <Widget
          src={`${Owner}/widget/airdrop`}
          props={{ API_URL, USER, TOKEN, Logout }}
        />
      )}
    </PageWrapper>
  </Wrapper>
);
