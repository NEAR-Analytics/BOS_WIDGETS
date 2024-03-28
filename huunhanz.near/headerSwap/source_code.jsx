State.init({
  color: "#31cf34",
  image1:
    "https://bafkreidzrna3q6csqykuvzih6yywrijmdg4fn4tb53azjmmjuobfus4v2e.ipfs.nftstorage.link/",
  image2:
    "https://bafybeibuj22kfgmevy3os6akrswxosjyjv5q6tecyv5jsfpw7iccajp5qa.ipfs.nftstorage.link/",
});

const [dropdownVisible, setDropdownVisible] = useState(false);
const [visible, setVisible] = useState(true);

const toggleDropdown = () => {
  setDropdownVisible(!dropdownVisible);
};

const handlClick = () => {
  setVisible(!visible);
};

const Header = styled.div`
      .header{
          background-color:${state.color};
      }
  
      .py-3{
          padding-bottom: 1rem!important;
          padding-top: 1rem!important;
      }
      
      .container {
          max-width: 1140px;
          --bs-gutter-x: 1.5rem;
          --bs-gutter-y: 0;
          margin-left: auto;
          margin-right: auto;
          padding-left: calc(var(--bs-gutter-x)*.5);
          padding-right: calc(var(--bs-gutter-x)*.5);
          width: 100%;
      }
  
      .position-relative{
          position: relative!important;
      }
  
      header {
          display: block;
      }
  
  
      .justify-content-md-between{
          justify-content: space-between!important;
      }
  
      .align-items-center {
          align-items: center!important;
      }
  
      .col-lg-3 {
          flex: 0 0 auto;
          width: 25%;
      }
      
      .col-md-4 {
          flex: 0 0 auto;
          width: 33.33333333%;
      }
      
      .col-12 {
          flex: 0 0 auto;
          width: 100%;
      }
  
      .row {
          --bs-gutter-x: 1.5rem;
          --bs-gutter-y: 0;
          display: flex;
          flex-wrap: wrap;
          margin-left: calc(var(--bs-gutter-x)*-.5);
          margin-right: calc(var(--bs-gutter-x)*-.5);
          margin-top: calc(var(--bs-gutter-y)*-1);
      }
  
      .text-decoration-none {
          text-decoration: none!important;
      }
  
      .d-xl-none {
          display: none!important;
      }
  
      .burger {
          color: #fff;
          cursor: pointer;
          position: absolute;
          right: 10px;
          z-index: 3;
      }
  
      .burger-line {
          background-color: #fff;
          border-radius: 4px;
          display: block;
          height: 4px;
          margin-bottom: 3px;
          transition: all .3s ease-in-out;
          width: 30px;
      }
  
      .col-md-8 {
          flex: 0 0 auto;
          width: 66.66666667%;
      }
  
      .overlay {
          background-color: #000;
          height: 100%;
          left: 0;
          opacity: .6;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 2;
      }
  
      .d-none {
          display: none!important;
      }
  
      .navbar {
          background-color: transparent;
          height: auto;
          position: relative;
          right: auto;
          top: auto;
          width: 100%;
      }
  
      .justify-content-center {
          justify-content: center!important;
      }
  
      .navbar-nav {
          --bs-nav-link-padding-x: 0;
          --bs-nav-link-padding-y: 0.5rem;
          --bs-nav-link-font-weight: ;
          --bs-nav-link-color: var(--bs-navbar-color);
          --bs-nav-link-hover-color: var(--bs-navbar-hover-color);
          --bs-nav-link-disabled-color: var(--bs-navbar-disabled-color);
          display: flex;
          flex-direction: column;
          list-style: none;
          margin-bottom: 0;
          padding-left: 0;
      }
  
      ul {
          margin-bottom: 1rem;
          margin-top: 0;
      }
  
      .p-1 {
          padding: 0.25rem!important;
      }
  
      li {
          display: list-item;
          text-align: -webkit-match-parent;
      }
  
      .nav-link {
          color: #fff;
          font-family: Lakki Reddy,cursive;
          font-size: 1rem;
      }
  
      .col-lg-9 {
          flex: 0 0 auto;
          width: 75%;
      }
  
      .nav-link span {
          text-shadow: 0 4px 4px #00000040;
      }
  
      .nav-link {
          font-size: 1.5rem;
      }
  
      .dropdown-menu {
        border-radius: 10px; 
        position: absolute;
        top: 75px;
        left: 24px;
        z-index: 1000;
        min-width: 10rem;
        padding: 0.5rem 0;
        margin: 0.125rem 0 0;
        font-size: 1rem;
        color: #212529;
        text-align: left;
        list-style: none;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border: 1px solid #31cf34;
      }
  
      .dropdown-menu.show {
        display: block;
      }
  
      .dropdown li {
          margin-bottom: 0.7em;
      }
  
      .p-lg-3 {
          padding: 1rem!important;
      }
  
      .dropdown-item {
          font-size: 1.4rem;
          color: ${state.color};
          text-shadow: 0 3px 6px #00000040;
          font-family: Lakki Reddy,cursive;
      }
      @media (max-width: 768px) { 
          .logo{
              display:flex;
              flex-direction:row;
              align-items:start;
              justify-content:start;
          }
       }
      
      
`;
console.log(visible);
return (
  <Header>
    <div class="header py-3 position-relative" id="header">
      <div class="container">
        <span
          onClick={handlClick}
          class="d-x1-none burger position-absolute top-50"
          id="burger"
        >
          <span class="burger-line"></span>
          <span class="burger-line"></span>
          <span class="burger-line"></span>
          <span>Menu</span>
        </span>
        <div class="row ml-2 justify-content-start justify-content-md-between align-items-start">
          <div class="col-lg-3 justify-content-start align-items-start">
            <a class="text-decoration-none logo">
              <img src={state.image2} alt="Icon" width="70" height="70" />
              <img src={state.image1} alt="Logo" width="141" height="60" />
            </a>
          </div>
          <div class={`col-lg-9 ${visible ? "d-none" : "d-block"}`}>
            <div class="navbar justify-content-center" id="navbar">
              <ul class="navbar-nav d-xl-flex flex-xl-row justify-content-md-between">
                <li class="nav-item p-1 p-lg-3">
                  <a class="nav-link close-menu" aria-current="page" href="/">
                    <span>home</span>
                  </a>
                </li>
                <li class="nav-item p-1 p-lg-3">
                  <a class="nav-link close-menu" href="/#about">
                    <span>about</span>
                  </a>
                </li>
                <li class="nav-item p-1 p-lg-3">
                  <a class="nav-link close-menu" href="/#how">
                    <span>how to buy</span>
                  </a>
                </li>
                <li class="nav-item p-1 p-lg-3 position-relative">
                  <a
                    class={`nav-link dropdown-toggle ${
                      dropdownVisible ? "show" : ""
                    }`}
                    href="#"
                    id="toggle"
                    onClick={toggleDropdown}
                  >
                    <span>bridge to near</span>
                  </a>
                  <ul
                    class={`dropdown-menu ${dropdownVisible ? "show" : ""}`}
                    id="dropdown"
                  >
                    <li>
                      <a class="dropdown-item" href="/ethereum">
                        from <span class="text-capitalize">ethereum</span>
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/solana">
                        from <span class="text-capitalize">solana</span>
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/evm">
                        from <span class="text-capitalize">arbitrum</span>
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/evm">
                        from <span class="text-capitalize">optimism</span>
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/evm">
                        from <span class="text-capitalize">polygon</span>
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/evm">
                        from <span class="text-capitalize">fantom</span>
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/evm">
                        from <span class="text-capitalize">avalanche</span>
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/evm">
                        from <span class="text-capitalize">BSC</span>
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/suit-aptos">
                        from <span class="text-capitalize">sui</span>
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/suit-aptos">
                        from <span class="text-capitalize">aptos</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item p-1 p-lg-3">
                  <a class="nav-link close-menu" href="/#token">
                    <span>tokenomic</span>
                  </a>
                </li>
                <li class="nav-item p-1 p-lg-3">
                  <a class="nav-link close-menu" href="/#roadmap">
                    <span>roadmap</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="overlay d-none" id="overlay"></div>
  </Header>
);
