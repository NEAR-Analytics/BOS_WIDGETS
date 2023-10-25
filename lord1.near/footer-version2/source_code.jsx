const Wrapper = styled.div`
    background: radial-gradient(
      circle,
       ${props.fromBackground}  30%,
       ${props.toBackground}  80%
    );

  padding: 10px 10px;
  border-radius:15px ;
  margin-top:40px ;
  margin-right:10px ;
  margin-left:10px ;


  @media (max-width: 1000px) {
    padding: 112px 24px;
  }
`;

const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? `${props.titlenelowBackground}`};
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

const Icons = styled.div`
  display: flex;
  gap: 7px;
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
  grid-template-columns: repeat(6, 1fr);
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
    color: ${props.belowBackground};

    &:hover,
    &:focus,
    &:active {
      color: ${props.belowBackground};
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
      <Logo
        style={{
          "font-size": "25px",
          "font-weight": "bold",
          color: `${props.titleBackground}`,
        }}
      >
        Flipside Crypto
      </Logo>

      <LinkGrid>
        <div>
          <Text size="16px" weight="400" style={{ "font-weight": "bold" }}>
            For Analysts
          </Text>
          <ul>
            <li>
              <a href="https://flipsidecrypto.xyz/earn" target="_blank">
                Bounties
              </a>
            </li>
            <li>
              <a
                href="https://science.flipsidecrypto.xyz/research/"
                target="_blank"
              >
                Tools & Apps
              </a>
            </li>
            <li>
              <a
                href="https://flipsidecrypto.xyz/account/api-keys"
                target="_blank"
              >
                API
              </a>
            </li>
          </ul>
        </div>

        <div>
          <Text size="16px" weight="500" style={{ "font-weight": "bold" }}>
            For Partners
          </Text>
          <ul>
            <li>
              <a href="https://data.flipsidecrypto.com/" target="_blank">
                Enterprise Data
              </a>
            </li>
          </ul>
        </div>

        <div>
          <Text size="16px" weight="500" style={{ "font-weight": "bold" }}>
            Company
          </Text>
          <ul>
            <li>
              <a href="https://flipsidecrypto.breezy.hr/" target="_blank">
                Careers
              </a>
            </li>
            <li>
              <a href="https://flipsidecrypto.xyz/terms" target="_blank">
                Terms & Privacy
              </a>
            </li>
          </ul>
        </div>

        <Icons>
          <a
            href="https://discord.com/invite/ZmU3jQuu6W"
            target="_blank"
            title="Official Discord server"
          >
            <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
              <path
                d="M22.044 2.12625C22.044 2.12625 22.044 2.12625 21.9998 2.12625C20.3188 1.36632 18.5494 0.859702 16.7357 0.564174C16.6914 0.521956 16.6472 0.564174 16.6472 0.564174C16.3818 0.986356 16.1606 1.45076 15.9837 1.87294C13.993 1.57741 12.0024 1.57741 10.0118 1.87294C9.83486 1.45076 9.61368 0.986356 9.34827 0.564174C9.34827 0.564174 9.30403 0.521956 9.2598 0.564174C7.44612 0.859702 5.67668 1.36632 3.99571 2.12625C3.95147 2.12625 3.95147 2.12625 3.95147 2.12625C0.589536 6.93913 -0.339421 11.6254 0.10294 16.2694C0.10294 16.2694 0.10294 16.3116 0.147176 16.3116C2.09356 17.7048 4.30536 18.7602 6.64987 19.4357C6.64987 19.478 6.69411 19.4357 6.73834 19.4357C7.22494 18.7602 7.6673 18.0848 8.06542 17.367C8.06542 17.3248 8.06542 17.2826 8.02119 17.2404C7.31341 16.9871 6.60563 16.6915 5.98633 16.3116C5.94209 16.3116 5.89786 16.2271 5.98633 16.1849C6.11904 16.1005 6.25175 16.0161 6.38445 15.8894C6.38445 15.8894 6.42869 15.8894 6.47293 15.8894C10.7196 17.747 15.3201 17.747 19.5226 15.8894C19.5668 15.8894 19.5668 15.8894 19.611 15.8894C19.7437 16.0161 19.8764 16.1005 20.0091 16.1849C20.0534 16.2271 20.0534 16.3116 20.0091 16.3116C19.3456 16.6915 18.6821 16.9871 17.9743 17.2404C17.9301 17.2826 17.9301 17.3248 17.9301 17.367C18.3282 18.0848 18.7705 18.7602 19.2571 19.4357C19.3014 19.4357 19.3014 19.478 19.3456 19.4357C21.6901 18.7602 23.9019 17.7048 25.8483 16.3116C25.8925 16.3116 25.8925 16.2694 25.8925 16.2694C26.4234 10.9076 24.9636 6.26364 22.044 2.12625ZM8.68473 13.4407C7.40188 13.4407 6.34022 12.3009 6.34022 10.9499C6.34022 9.55666 7.40188 8.45899 8.68473 8.45899C10.0118 8.45899 11.0292 9.55666 11.0292 10.9499C11.0292 12.3009 9.96757 13.4407 8.68473 13.4407ZM17.3108 13.4407C16.0279 13.4407 15.0105 12.3009 15.0105 10.9499C15.0105 9.55666 16.0279 8.45899 17.3108 8.45899C18.6378 8.45899 19.6995 9.55666 19.6553 10.9499C19.6553 12.3009 18.6378 13.4407 17.3108 13.4407Z"
                fill={`${props.svgBackground}`}
              />
            </svg>
          </a>

          <a
            href="https://twitter.com/flipsidecrypto"
            target="_blank"
            title="Official Twitter account"
          >
            <svg width="27" height="24" viewBox="0 0 27 24" fill="none">
              <path
                d="M23.9906 6.34576C25.0082 5.53415 25.924 4.56022 26.6364 3.42396C25.7205 3.85682 24.652 4.18147 23.5835 4.28968C24.7029 3.58629 25.517 2.50414 25.924 1.15146C24.9064 1.80074 23.7362 2.28771 22.5659 2.55825C21.5483 1.42199 20.1745 0.772705 18.6481 0.772705C15.697 0.772705 13.3056 3.31575 13.3056 6.45398C13.3056 6.88683 13.3565 7.31969 13.4583 7.75255C9.03167 7.48202 5.06298 5.20951 2.41719 1.80074C1.95926 2.61235 1.70486 3.58629 1.70486 4.66843C1.70486 6.6163 2.62071 8.34773 4.09625 9.37577C3.23128 9.32166 2.36631 9.10524 1.65398 8.67238V8.72648C1.65398 11.486 3.48568 13.7585 5.92795 14.2995C5.52091 14.4078 5.0121 14.516 4.55418 14.516C4.19801 14.516 3.89273 14.4619 3.53656 14.4078C4.19801 16.6803 6.18236 18.3035 8.52286 18.3576C6.69116 19.8726 4.40153 20.7924 1.90838 20.7924C1.45046 20.7924 1.04341 20.7383 0.636368 20.6842C2.97688 22.3074 5.77531 23.2273 8.82815 23.2273C18.6481 23.2273 23.9906 14.6242 23.9906 7.10326C23.9906 6.83273 23.9906 6.6163 23.9906 6.34576Z"
                fill={`${props.svgBackground}`}
              />
            </svg>
          </a>

          <a
            href="https://github.com/FlipsideCrypto"
            target="_blank"
            title="Official Github organization"
          >
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path
                d="M8.49926 19.2153C8.49926 19.1177 8.40395 19.0201 8.26099 19.0201C8.11802 19.0201 8.02272 19.1177 8.02272 19.2153C8.02272 19.3129 8.11802 19.4105 8.26099 19.3617C8.40395 19.3617 8.49926 19.3129 8.49926 19.2153ZM7.02198 18.9713C7.02198 19.0689 7.11729 19.2153 7.26025 19.2153C7.35556 19.2641 7.49852 19.2153 7.54618 19.1177C7.54618 19.0201 7.49852 18.9225 7.35556 18.8736C7.2126 18.8248 7.06964 18.8736 7.02198 18.9713ZM9.16641 18.9225C9.02345 18.9225 8.92814 19.0201 8.92814 19.1665C8.92814 19.2641 9.0711 19.3129 9.21407 19.2641C9.35703 19.2153 9.45234 19.1665 9.40468 19.0689C9.40468 18.9713 9.26172 18.8736 9.16641 18.9225ZM12.2639 0.181763C5.68767 0.181763 0.636353 5.35497 0.636353 12.0899C0.636353 17.5071 3.92448 22.1435 8.68987 23.8028C9.30937 23.9004 9.49999 23.51 9.49999 23.2172C9.49999 22.8756 9.49999 21.2162 9.49999 20.1914C9.49999 20.1914 6.16421 20.9234 5.4494 18.7272C5.4494 18.7272 4.92521 17.3119 4.16275 16.9703C4.16275 16.9703 3.0667 16.1894 4.2104 16.1894C4.2104 16.1894 5.40175 16.287 6.0689 17.4583C7.11729 19.3617 8.83283 18.8248 9.54764 18.4832C9.64295 17.7024 9.92888 17.1655 10.3101 16.8239C7.64149 16.5311 4.92521 16.1406 4.92521 11.4555C4.92521 10.089 5.30644 9.4545 6.0689 8.57603C5.92594 8.2344 5.54471 6.9655 6.21187 5.25737C7.16495 4.96454 9.49999 6.57507 9.49999 6.57507C10.4531 6.28225 11.4538 6.18464 12.4545 6.18464C13.5029 6.18464 14.5037 6.28225 15.4567 6.57507C15.4567 6.57507 17.7441 4.91574 18.7449 5.25737C19.412 6.9655 18.9831 8.2344 18.8878 8.57603C19.6503 9.4545 20.1268 10.089 20.1268 11.4555C20.1268 16.1406 17.3152 16.5311 14.6466 16.8239C15.0755 17.2143 15.4567 17.9464 15.4567 19.1177C15.4567 20.7282 15.4091 22.778 15.4091 23.1684C15.4091 23.51 15.6474 23.9004 16.2669 23.754C21.0322 22.1435 24.2727 17.5071 24.2727 12.0899C24.2727 5.35497 18.8878 0.181763 12.2639 0.181763ZM5.25879 17.0191C5.16348 17.0679 5.21113 17.2143 5.25879 17.3119C5.35409 17.3607 5.4494 17.4095 5.54471 17.3607C5.59236 17.3119 5.59236 17.1655 5.49706 17.0679C5.40175 17.0191 5.30644 16.9703 5.25879 17.0191ZM4.73459 16.6287C4.68694 16.7263 4.73459 16.7751 4.8299 16.8239C4.92521 16.8727 5.02052 16.8727 5.06817 16.7751C5.06817 16.7263 5.02052 16.6775 4.92521 16.6287C4.8299 16.5799 4.78225 16.5799 4.73459 16.6287ZM6.25952 18.3856C6.21187 18.4344 6.21187 18.5808 6.35483 18.6784C6.45014 18.776 6.5931 18.8248 6.64075 18.7272C6.68841 18.6784 6.68841 18.532 6.5931 18.4344C6.49779 18.3368 6.35483 18.288 6.25952 18.3856ZM5.73533 17.6536C5.64002 17.7024 5.64002 17.8488 5.73533 17.9464C5.83063 18.044 5.92594 18.0928 6.02125 18.044C6.0689 17.9952 6.0689 17.8488 6.02125 17.7512C5.92594 17.6536 5.83063 17.6047 5.73533 17.6536Z"
                fill={`${props.svgBackground}`}
              />
            </svg>
          </a>
        </Icons>
      </LinkGrid>
    </Container>
  </Wrapper>
);
