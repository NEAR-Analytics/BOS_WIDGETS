const style = props.style || {};
const props = props.props || {
  navItems: [
    {
      name: "Company",
      link: "#",
    },
    {
      name: "Technology",
      link: "#",
    },
    {
      name: "Solution",
      link: "#",
    },
    {
      name: "Latest news",
      link: "#",
    },
    {
      name: "Careers",
      link: "#",
    },
  ],
  buttonText: "Contact",
};

const bp = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

const [showNav, setShowNav] = useState(false);
const StyledNav = styled.div`
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 50;
    transition: all 0.2s;
    padding: ${({ style }) =>
      `${style?.paddingTop || 0}px ${style?.paddingRight || 0}px ${
        style?.paddingBottom || 0
      }px ${style?.paddingLeft || 0}px`};
    margin: ${({ style }) =>
      `${style?.marginTop || 0}px ${style?.marginRight || 0}px ${
        style?.marginBottom || 0
      }px ${style?.marginLeft || 0}px`};
  `;

const NavContainer = styled.div`
    display: flex;
    flex-direction: ${({ style }) => style?.flexDirection || "row"};
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    padding-block: 1.5rem;
    @media (min-width: ${bp.md}) {
      padding-left: 3rem /* 48px */;
      padding-right: 3rem /* 48px */;
    }
  `;

const NavList = styled.ul`
    display: none;
    font-size: 0.875rem /* 14px */;
    line-height: 1.25rem /* 20px */;
    font-weight: 600;
    align-items: center;
    gap: 1.5rem;
    @media (min-width: ${bp.lg}) {
      display: flex;
    }
  `;

const MenuIcon = styled.svg`
    display: block;
    height: 1.25rem;
    @media (min-width: ${bp.lg}) {
      display: none;
    }
    fill: black;
  `;

const NavButtomContainer = styled.div`
    display: none;

    @media (min-width: ${bp.lg}) {
      display: flex;
    }
    align-items: center;
    gap: 0.5rem;
  `;

const Button = styled.button`
    display: none;
    gap: 1rem;
    align-items: center;
    white-space: nowrap;
    padding: 0.5rem 1.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 600;
    color: white;
    border:none;
background: transparent;


    @media (min-width: ${bp.lg}) {
      display: flex;
    }
  `;

const MobileMenu = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    border-bottom: 1px solid;
    background-color: white;
    padding: 1.75rem;
    transition: all 0.2s;
    display: ${({ showNav }) => (showNav ? "inline-block" : "none")};

    @media (min-width: ${bp.md}) {
      padding-left: 3rem;
      padding-right: 3rem;
    }

    &:is(.dark *) {
      border-color: rgb(55 65 81);
      background-color: rgb(3 7 18);
    }
  `;

const CloseIcon = styled.svg`
    margin-left: auto;
    display: block;
    width: 100%;
    cursor: pointer;
    width: 1.5rem;
    fill: rgb(229 231 235);
  `;

const MobileNavList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    list-style:none;
  `;

const MobileNavListItem = styled.a`
    color: #4b5563;
    &:is(.dark *) {
      color: #d1d5db;
    }
  `;

const MobileButton = styled.button`
    display: flex;
    gap: 1rem;
    align-items: center;
    white-space: nowrap;
    padding: 0.5rem 1.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 600;
    color: black;
    border:none;
background: transparent;

    &:is(.dark *) {
      color: white;
    }
  `;
const NavImageLight = styled.img`
    width: 2rem;
  `;

// useEffect(() => {
//     const nav = document.getElementsByTagName("div")[0];
//     const handleScroll = () => {
//       if (window.scrollY > window.innerHeight - 90) {
//         nav.style.backgroundColor = "black";
//         nav.style.opacity = "0.7";
//       } else {
//         nav.style.backgroundColor = "transparent";
//         nav.style.opacity = "1";
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

return (
  <StyledNav
    id={id}
    style={{
      padding: `${style?.paddingTop || 0}px ${style?.paddingRight || 0}px ${
        style?.paddingBottom || 0
      }px ${style?.paddingLeft || 0}px`,
      margin: `${style?.marginTop || 0}px ${style?.marginRight || 0}px ${
        style?.marginBottom || 0
      }px ${style?.marginLeft || 0}px`,
    }}
  >
    <NavContainer>
      <NavImageLight
        src="https://ipfs.near.social/ipfs/bafkreici2x5ecmfgjks6r4cd2ntz5hcxo27xu7j4ykhcrsfjbtmoeyeve4"
        alt="logo"
      />

      <NavList>
        {props?.navItems?.map((item, index) => (
          <li
            key={index}
            style={{
              listStyle: "none",
              // color:'black'
            }}
          >
            <a
              href={item.link}
              style={{
                textWrap: "nowrap",
                color: "rgb(229 231 235)",
              }}
            >
              {item.name}
            </a>
          </li>
        ))}
      </NavList>
      {/* <MenuIcon
        onClick={() => setShowNav(true)}
      /> */}
      <MenuIcon
        onClick={() => setShowNav(true)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
      </MenuIcon>

      <NavButtomContainer>
        <Button>
          <div
            style={{
              backgroundColor: style?.accent || "#b9ff81",
              color: "black",
              height: "2rem",
              width: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "100%",
            }}
          >
            <svg
              style={{ width: "0.7rem", transform: "rotate(-0.25turn)" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
            </svg>
          </div>
          {props?.buttonText}
        </Button>
      </NavButtomContainer>

      <MobileMenu showNav={showNav}>
        <CloseIcon
          onClick={() => setShowNav(false)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </CloseIcon>
        <MobileNavList>
          {props?.navItems?.map((item, index) => (
            <li key={index}>
              <MobileNavListItem href={item.link}>
                {item.name}
              </MobileNavListItem>
            </li>
          ))}

          <MobileButton className="gap-4 items-center text-nowrap px-6 py-2 text-sm font-semibold text-black dark:text-white flex">
            <div
              style={{
                backgroundColor: style?.accent || "#b9ff81",
                color: "black",
                height: "2rem",
                width: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "100%",
              }}
            >
              <svg
                style={{
                  width: "0.7rem",
                  transform: "rotate(-0.25turn)",
                  fill: black,
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
              </svg>
            </div>
            {props?.buttonText}
          </MobileButton>
        </MobileNavList>
      </MobileMenu>
    </NavContainer>
  </StyledNav>
);
