// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { HiOutlineHashtag, HiOutlineHome, HiOutlineMenu, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';
// import { RiCloseLine } from 'react-icons/ri';

// import { logo } from '../assets';

const StyledDiv = styled.div`
  .sidebar {

    height: 100vh;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    --tw-bg-opacity: 1;
    background-color: rgb(25 22 36 / var(--tw-bg-opacity));
    flex-direction: column;
    width: 240px;


    height: 100vh;
    z-index: 10;
    top: 0px;

    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-pan-x: ;
    --tw-pan-y: ;
    --tw-pinch-zoom: ;
    --tw-scroll-snap-strictness: proximity;
    --tw-ordinal: ;
    --tw-slashed-zero: ;
    --tw-numeric-figure: ;
    --tw-numeric-spacing: ;
    --tw-numeric-fraction: ;
    --tw-ring-inset: ;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / 0.5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    --tw-blur: ;
    --tw-brightness: ;
    --tw-contrast: ;
    --tw-grayscale: ;
    --tw-hue-rotate: ;
    --tw-invert: ;
    --tw-saturate: ;
    --tw-sepia: ;
    --tw-drop-shadow: ;
    --tw-backdrop-blur: ;
    --tw-backdrop-brightness: ;
    --tw-backdrop-contrast: ;
    --tw-backdrop-grayscale: ;
    --tw-backdrop-hue-rotate: ;
    --tw-backdrop-invert: ;
    --tw-backdrop-opacity: ;
    --tw-backdrop-saturate: ;
    --tw-backdrop-sepia: ;

    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb;

    line-height: inherit;

    --swiper-theme-color: #007aff;

    --tw-bg-opacity: 1;

    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    -moz-tab-size: 4;
    tab-size: 4;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

    img {
      object-fit: contain;
      height: 5rem;
    }
  }

  .menu-icon {
    display: block;
    right: 0.75rem;
    top: 1.5rem;
    position: absolute;
    background-color: red;

    svg {
      --tw-text-opacity: 1;
      color: rgb(255 255 255 / var(--tw-text-opacity));
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
      display: block;
      cursor: pointer;
    }
  }

  #mobile-sidebar {
    backdrop-filter: blur(16px) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
    padding: 1.5rem;
    background-image: linear-gradient(to top left, var(--tw-gradient-stops));
    width: 66.666667%;
    position: relative;
    transition: all 0.3s ease-in-out;



    --tw-gradient-to: #483D8B;
    --tw-gradient-from: rgb(255 255 255 / 0.1);
    --tw-gradient-to: rgb(255 255 255 / 0);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
  }

  .hidden {
    left: -100%;
  }
  .show{
    left: 0px;
  }

// Responsive design
@media (min-width: 768px) {
  .menu-icon, #mobile-sidebar {
    display: none;
  }
}
@media (max-width: 768px) {
  #sidebar {
    display: none;
  }
}

`;

const links = [
  {
    name: "Discover",
    to: "/",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="0"
        viewBox="0 0 24 24"
        class="w-6 h-6 mr-2"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        ></path>
      </svg>
    ),
  },
  {
    name: "Around You",
    to: "/around-you",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="0"
        viewBox="0 0 24 24"
        class="w-6 h-6 mr-2"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        ></path>
      </svg>
    ),
  },
  {
    name: "Top Artists",
    to: "/top-artists",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="0"
        viewBox="0 0 24 24"
        class="w-6 h-6 mr-2"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        ></path>
      </svg>
    ),
  },
  {
    name: "Top Charts",
    to: "/top-charts",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="0"
        viewBox="0 0 24 24"
        class="w-6 h-6 mr-2"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
        ></path>
      </svg>
    ),
  },
];

const StyledNav = styled.div`
  margin-top: 2.5rem;
  .active {
    --tw-text-opacity: 1;
    color: rgb(6 182 212 / var(--tw-text-opacity));
  }
  a {
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    display: flex;
    margin-top: 2rem;
    margin-bottom: 2rem;
    text-decoration: none;
    color: rgb(156 163 175 / 1);
  }
  a:hover {
  --tw-text-opacity: 1;
  color: rgb(6 182 212 / var(--tw-text-opacity));
  }
`;

const NavLinks = ({ handleClick }) => (
  <StyledNav className="mt-10">
    {links.map((item) => (
      <a
        key={item.name}
        href={item.to}
        className={`${
          item.to === "/" ? "active" : null
        } flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400`}
        onClick={() => handleClick && handleClick()}
      >
        {item.icon}
        {item.name}
      </a>
    ))}
  </StyledNav>
);

const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

return (
  <StyledDiv>
    <div
      className="sidebar md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]"
      id="sidebar"
    >
      <img src={logo} alt="logo" className="w-full h-20 object-contain" />
      <NavLinks />
    </div>
    {/* Mobile sidebar */}
    <div className="absolute md:hidden block top-6 right-3 menu-icon">
      {!mobileMenuOpen ? (
        <svg
          stroke="currentColor"
          fill="none"
          stroke-width="0"
          viewBox="0 0 24 24"
          class="w-6 h-6 mr-2 text-white"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setMobileMenuOpen(true)}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      ) : (
        /*<HiOutlineMenu className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(true)} />*/
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          class="w-6 h-6 mr-2 text-white"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setMobileMenuOpen(false)}
        >
          <g>
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
          </g>
        </svg>
        /*<RiCloseLine className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(false)} />*/
      )}
    </div>
    <div
      className={`sidebar absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
        mobileMenuOpen ? "show" : "hidden"
      }`}
      id="mobile-sidebar"
    >
      <img src={logo} alt="logo" className="w-full h-14 object-contain" />
      <NavLinks handleClick={() => setMobileMenuOpen(false)} />
    </div>
  </StyledDiv>
);

// export default Sidebar;
