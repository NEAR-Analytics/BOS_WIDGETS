State.init({
  color: "#31cf34",
  image1: "https://lonk.meme/assets/images/logo.svg",
  image2: "https://lonk.meme/assets/images/dragon.svg",
});
const [isSize, setIsSize] = useState(false);
const Header = styled.div`
  @media screen and (max-width:768px){
    ${setIsSize(true)}
  }
  @media screen and (min-width:768px) and (max-width:1080){
    ${setIsSize(false)}
  }
    .header{
        background-color:${state.color};
    }

    .py-3{
        padding-bottom: 1rem!important;
        padding-top: 1rem!important;
    }

    .container {
        max-width: 540px;
    }

    .position-relative{
        position: relative!important;
    }

    header {
        display: block;
    }


    .justify-content-md-between{
        justify-content: space-between!important;
        align-items: center!important;
    }

    .align-items-center {
        align-items: center!important;
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
        height: -moz-fit-content;
        height: fit-content;
        max-width: 100%;
        position: fixed;
        right: -100%;
        top: 80px;
        transition: all .3s ease-in-out;
        width: 500px;
        z-index: 3;
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
`;
console.log("isSise", isSize);
return (
  <Header>
    <div class="header py-3 position-relative" id="header">
      <div class="container">
        <div class="row justify-content-center justify-content-md-between align-items-center">
          <div class="col-12 col-md-14 col-lg-3">
            <a class="text-decoration-none">
              <img src={state.image2} alt="Icon" width="70" height="70" />
              <img src={state.image1} alt="Logo" width="141" height="60" />
            </a>
            {isSize ? (
              <span class="d-x1-none burger" id="burger">
                <span class="burger-line"></span>
                <span class="burger-line"></span>
                <span class="burger-line"></span>
                <span>Menu</span>
              </span>
            ) : (
              <div class="col-lg-9">
                <div class="navbar justify-content-center" id="navbar">
                  <ul class="navbar-nav d-xl-flex flex-xl-row justify-content-md-between">
                    <li class="nav-item p-1 p-lg-3">
                      <a
                        class="nav-link close-menu"
                        aria-current="page"
                        href="/"
                      >
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
            )}
          </div>
          <div class="col-12 col-md-8 col-lg-9">
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
                  <a class="nav-link dropdown-toggle" href="#" id="toggle">
                    <span>bridge to near</span>
                  </a>
                  <ul class="dropdown" id="dropdown">
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
