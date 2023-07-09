const Wrapper = styled.div`
  background: #f2f1ea;
  padding: 192px 24px;

  @media (max-width: 1000px) {
    padding: 112px 24px;
  }
`;

const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
`;

const Logo = styled.div`
  height: 32px;
  svg {
    height: 100%;
  }
`;

const Container = styled.div`
  display: grid;
  gap: 72px;
  max-width: 1040px;
  margin: 0 auto;
`;

const LogoAndIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 72px;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Icons = styled.div`
  display: flex;
  gap: 72px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;

  a {
    display: block;
    transition: all 200ms;

    &:hover,
    &:focus {
      opacity: 0.7;
      outline: none;
    }
  }

  @media (max-width: 1000px) {
    gap: 24px;
  }
`;

const LinkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  div {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  ul {
    display: grid;
    list-style: none;
    gap: 8px;
    margin: 0;
    padding: 0;
  }

  a {
    font-family: "FK Grotesk", sans-serif;
    font-size: 13px;
    line-height: 1.2;
    font-weight: 400;
    color: #000;

    &:hover,
    &:focus,
    &:active {
      color: #000;
      text-decoration: underline;
      outline: none;
    }
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

return (
  <Wrapper>
    <Container>
      <LogoAndIcons>
        <Logo>
          <img
            width="300px"
            src="https://ipfs.near.social/ipfs/bafkreiakpryyuqryxd7akq6vuslky2fsnay3lzlwj3l535wlo4zpbakhpq"
          />
        </Logo>

        <Icons>
          <a
            href="https://NEAReFi.org/telegram"
            target="_blank"
            title="Official Twitter account"
          >
            <svg width="27" height="24" viewBox="0 0 27 24" fill="none">
              <path
                d="M23.9906 6.34576C25.0082 5.53415 25.924 4.56022 26.6364 3.42396C25.7205 3.85682 24.652 4.18147 23.5835 4.28968C24.7029 3.58629 25.517 2.50414 25.924 1.15146C24.9064 1.80074 23.7362 2.28771 22.5659 2.55825C21.5483 1.42199 20.1745 0.772705 18.6481 0.772705C15.697 0.772705 13.3056 3.31575 13.3056 6.45398C13.3056 6.88683 13.3565 7.31969 13.4583 7.75255C9.03167 7.48202 5.06298 5.20951 2.41719 1.80074C1.95926 2.61235 1.70486 3.58629 1.70486 4.66843C1.70486 6.6163 2.62071 8.34773 4.09625 9.37577C3.23128 9.32166 2.36631 9.10524 1.65398 8.67238V8.72648C1.65398 11.486 3.48568 13.7585 5.92795 14.2995C5.52091 14.4078 5.0121 14.516 4.55418 14.516C4.19801 14.516 3.89273 14.4619 3.53656 14.4078C4.19801 16.6803 6.18236 18.3035 8.52286 18.3576C6.69116 19.8726 4.40153 20.7924 1.90838 20.7924C1.45046 20.7924 1.04341 20.7383 0.636368 20.6842C2.97688 22.3074 5.77531 23.2273 8.82815 23.2273C18.6481 23.2273 23.9906 14.6242 23.9906 7.10326C23.9906 6.83273 23.9906 6.6163 23.9906 6.34576Z"
                fill="#262626"
              />
            </svg>
          </a>

          <a
            href="https://NEAReFi.org/github"
            target="_blank"
            title="Official Github organization"
          >
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path
                d="M8.49926 19.2153C8.49926 19.1177 8.40395 19.0201 8.26099 19.0201C8.11802 19.0201 8.02272 19.1177 8.02272 19.2153C8.02272 19.3129 8.11802 19.4105 8.26099 19.3617C8.40395 19.3617 8.49926 19.3129 8.49926 19.2153ZM7.02198 18.9713C7.02198 19.0689 7.11729 19.2153 7.26025 19.2153C7.35556 19.2641 7.49852 19.2153 7.54618 19.1177C7.54618 19.0201 7.49852 18.9225 7.35556 18.8736C7.2126 18.8248 7.06964 18.8736 7.02198 18.9713ZM9.16641 18.9225C9.02345 18.9225 8.92814 19.0201 8.92814 19.1665C8.92814 19.2641 9.0711 19.3129 9.21407 19.2641C9.35703 19.2153 9.45234 19.1665 9.40468 19.0689C9.40468 18.9713 9.26172 18.8736 9.16641 18.9225ZM12.2639 0.181763C5.68767 0.181763 0.636353 5.35497 0.636353 12.0899C0.636353 17.5071 3.92448 22.1435 8.68987 23.8028C9.30937 23.9004 9.49999 23.51 9.49999 23.2172C9.49999 22.8756 9.49999 21.2162 9.49999 20.1914C9.49999 20.1914 6.16421 20.9234 5.4494 18.7272C5.4494 18.7272 4.92521 17.3119 4.16275 16.9703C4.16275 16.9703 3.0667 16.1894 4.2104 16.1894C4.2104 16.1894 5.40175 16.287 6.0689 17.4583C7.11729 19.3617 8.83283 18.8248 9.54764 18.4832C9.64295 17.7024 9.92888 17.1655 10.3101 16.8239C7.64149 16.5311 4.92521 16.1406 4.92521 11.4555C4.92521 10.089 5.30644 9.4545 6.0689 8.57603C5.92594 8.2344 5.54471 6.9655 6.21187 5.25737C7.16495 4.96454 9.49999 6.57507 9.49999 6.57507C10.4531 6.28225 11.4538 6.18464 12.4545 6.18464C13.5029 6.18464 14.5037 6.28225 15.4567 6.57507C15.4567 6.57507 17.7441 4.91574 18.7449 5.25737C19.412 6.9655 18.9831 8.2344 18.8878 8.57603C19.6503 9.4545 20.1268 10.089 20.1268 11.4555C20.1268 16.1406 17.3152 16.5311 14.6466 16.8239C15.0755 17.2143 15.4567 17.9464 15.4567 19.1177C15.4567 20.7282 15.4091 22.778 15.4091 23.1684C15.4091 23.51 15.6474 23.9004 16.2669 23.754C21.0322 22.1435 24.2727 17.5071 24.2727 12.0899C24.2727 5.35497 18.8878 0.181763 12.2639 0.181763ZM5.25879 17.0191C5.16348 17.0679 5.21113 17.2143 5.25879 17.3119C5.35409 17.3607 5.4494 17.4095 5.54471 17.3607C5.59236 17.3119 5.59236 17.1655 5.49706 17.0679C5.40175 17.0191 5.30644 16.9703 5.25879 17.0191ZM4.73459 16.6287C4.68694 16.7263 4.73459 16.7751 4.8299 16.8239C4.92521 16.8727 5.02052 16.8727 5.06817 16.7751C5.06817 16.7263 5.02052 16.6775 4.92521 16.6287C4.8299 16.5799 4.78225 16.5799 4.73459 16.6287ZM6.25952 18.3856C6.21187 18.4344 6.21187 18.5808 6.35483 18.6784C6.45014 18.776 6.5931 18.8248 6.64075 18.7272C6.68841 18.6784 6.68841 18.532 6.5931 18.4344C6.49779 18.3368 6.35483 18.288 6.25952 18.3856ZM5.73533 17.6536C5.64002 17.7024 5.64002 17.8488 5.73533 17.9464C5.83063 18.044 5.92594 18.0928 6.02125 18.044C6.0689 17.9952 6.0689 17.8488 6.02125 17.7512C5.92594 17.6536 5.83063 17.6047 5.73533 17.6536Z"
                fill="#262626"
              />
            </svg>
          </a>

          <a
            href="https://NEAReFI.org/telegram"
            target="_blank"
            title="Official Telegram channel"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12.0909 0.181763C5.56229 0.181763 0.272705 5.47135 0.272705 11.9999C0.272705 18.5285 5.56229 23.8181 12.0909 23.8181C18.6195 23.8181 23.9091 18.5285 23.9091 11.9999C23.9091 5.47135 18.6195 0.181763 12.0909 0.181763ZM17.857 8.28294L15.9509 17.4325C15.8079 18.0997 15.4267 18.2426 14.8548 17.9567L11.9003 15.7646L10.4707 17.1466C10.3277 17.2895 10.1847 17.4325 9.89881 17.4325L10.0894 14.4303L15.5696 9.47429C15.8079 9.28367 15.522 9.14071 15.1884 9.33132L8.42153 13.6202L5.51464 12.7148C4.89514 12.5241 4.89514 12.0476 5.6576 11.7617L17.0469 7.37751C17.5711 7.1869 18.0476 7.52047 17.857 8.28294Z"
                fill="#262626"
              />
            </svg>
          </a>

          <a
            href="https://www.youtube.com/@refinear"
            target="_blank"
            title="Official YouTube channel"
          >
            <svg width="27" height="18" viewBox="0 0 27 18" fill="none">
              <path
                d="M26.3387 2.9524C26.0535 1.84445 25.1504 0.967318 24.0571 0.69033C22.0133 0.136353 13.9328 0.136353 13.9328 0.136353C13.9328 0.136353 5.80485 0.136353 3.76098 0.69033C2.66774 0.967318 1.76463 1.84445 1.47944 2.9524C0.909058 4.89132 0.909058 9.04615 0.909058 9.04615C0.909058 9.04615 0.909058 13.1548 1.47944 15.1399C1.76463 16.2479 2.66774 17.0788 3.76098 17.3558C5.80485 17.8636 13.9328 17.8636 13.9328 17.8636C13.9328 17.8636 22.0133 17.8636 24.0571 17.3558C25.1504 17.0788 26.0535 16.2479 26.3387 15.1399C26.9091 13.1548 26.9091 9.04615 26.9091 9.04615C26.9091 9.04615 26.9091 4.89132 26.3387 2.9524ZM11.271 12.7855V5.30681L18.0206 9.04615L11.271 12.7855Z"
                fill="#262626"
              />
            </svg>
          </a>
        </Icons>
      </LogoAndIcons>

      <LinkGrid>
        <div>
          <Text size="16px" weight="500">
            Get Involved
          </Text>
          <ul>
            <li>
              <a href="https://NEAReFi.org/join">Join</a>
            </li>
            <li>
              <a href="https://NEAReFI.org/requests">Requests</a>
            </li>
            <li>
              <a href="https://NEAReFi.org/dao">DAO</a>
            </li>
            <li>
              <a href="https://NEAReFI.org/devs">DevHub</a>
            </li>
          </ul>
        </div>

        <div>
          <Text size="16px" weight="500">
            About
          </Text>
          <ul>
            <li>
              <a href="https://NEAReFI.org/charter">Charter</a>
            </li>
            <li>
              <a href="https://NEAReFi.org/github">Github</a>
            </li>
            <li>
              <a href="https://NEAReFi.org">Website</a>
            </li>
            <li>
              <a href="https://NEAReFi.org/bos">BOS Profile</a>
            </li>
          </ul>
        </div>

        <div>
          <Text size="16px" weight="500">
            Resources
          </Text>
          <ul>
            <li>
              <a href="https://NEAReFI.org">Contributor Guidelines</a>
            </li>
            <li>
              <a href="https://potlock.io/accelerator">Apply to Accelerator</a>
            </li>
            <li>
              <a href="https://NEAReFi.org/human">Verify As Human</a>
            </li>
            <li>
              <a href="https://NEAReFi.org/subscribe">Newsletter</a>
            </li>
          </ul>
        </div>
      </LinkGrid>
    </Container>
  </Wrapper>
);
