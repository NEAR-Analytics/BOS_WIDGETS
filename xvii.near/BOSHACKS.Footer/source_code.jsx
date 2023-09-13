const SocialLinks = styled.ul`
  display: flex;
  justify-content: center;
  align-items: stretch;
  color: #262626;
  gap: 2rem;
  flex-wrap: wrap;
  font-size: 1.5rem;
  line-height: 1.5;
  list-style: none;

  & > li {
    height: 1.5rem;

    & > a {
      height: 100%;
      width: auto;
      position: relative;
      color: inherit;
      text-decoration: none;
      transition: color 0.5s ease-in-out;

      &:hover {
        color: #a7a7a7;
        text-decoration: none;
      }

      & > svg {
        height: 100%;
      }
    }
  }
`;

const social = (
  <SocialLinks>
    <li
      id="menu-item-13398"
      class="no-auto-link menu-item menu-item-type-custom menu-item-object-custom menu-item-13398"
    >
      <a
        title="Official Telegram channel"
        target="_blank"
        rel="noopener"
        href="https://t.me/ResearchWG"
      >
        <svg
          class="svg-inline--fa fa-telegram fa-w-16"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="telegram"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512"
          data-fa-i2svg=""
        >
          <path
            fill="currentColor"
            d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z"
          ></path>
        </svg>
      </a>
    </li>
    <li
      id="menu-item-13395"
      class="no-auto-link menu-item menu-item-type-custom menu-item-object-custom menu-item-13395"
    >
      <a
        title="Official Twitter account"
        target="_blank"
        rel="noopener"
        href="https://twitter.com/researchWG"
      >
        <svg
          class="svg-inline--fa fa-twitter fa-w-16"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="twitter"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          data-fa-i2svg=""
        >
          <path
            fill="currentColor"
            d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
          ></path>
        </svg>
      </a>
    </li>
    <li
      id="menu-item-13396"
      class="no-auto-link menu-item menu-item-type-custom menu-item-object-custom menu-item-13396"
    >
      <a
        title="Official GitHub Repo"
        target="_blank"
        rel="noopener"
        href="https://github.com/nearbuilders"
      >
        <svg
          class="svg-inline--fa fa-github fa-w-16"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="github"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512"
          data-fa-i2svg=""
        >
          <path
            fill="currentColor"
            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
          ></path>
        </svg>
      </a>
    </li>

    <li
      id="menu-item-13400"
      class="no-auto-link menu-item menu-item-type-custom menu-item-object-custom menu-item-13400"
    >
      <a
        title="Official YouTube channel"
        target="_blank"
        rel="noopener"
        href="https://www.youtube.com/@banyanus"
      >
        <svg
          class="svg-inline--fa fa-youtube fa-w-18"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="youtube"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          data-fa-i2svg=""
        >
          <path
            fill="currentColor"
            d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
          ></path>
        </svg>
      </a>
    </li>
  </SocialLinks>
);

const Legal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a7a7a7;
  gap: 1rem;

  & > span.separator {
    display: inline-block;
    height: 1.5rem;
    width: 1px;
    background-color: #d1d1d1;
    margin: 0;
    padding: 0;
  }

  & > a {
    color: inherit;
    text-decoration: none;
    margin: 0;
    padding: 0;
    transition: color 0.5s ease-in-out;

    &:hover {
      color: #676767;
      text-decoration: none;
    }
  }
`;

//const links = (
//  <Legal>
//    <a href="https://Banyan.gg">Made with ❤️ by Banyan Collective</a>
//  </Legal>
//);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem 0;
  background-color: #f2f1ea;
`;

return (
  <Container>
    {social}
    {links}
  </Container>
);
