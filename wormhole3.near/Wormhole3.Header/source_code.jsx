const { config } = props;

const Header = styled.div`
  padding: 18px 15px;
  background: #0d1117;

  display: flex;
  justify-content: space-between;
`;

const Logo = () => (
  <a href="https://wormhole3.io/" target="_blank">
    <img
      height={25}
      src={`${config.ipfsPrefix}/bafkreieeryks2u5hpitmiplt6wgmqj5miudflb4kntptzproe6mg2clzp4`}
    />
  </a>
);

const Telegram = () => (
  <a
    href="https://t.me/wormhole3i"
    target="_blank"
    title="Need help? Contact us on Telegram"
  >
    <img
      height={25}
      src={`${config.ipfsPrefix}/bafkreiaodxghvfq6bneguwpxcm3jz46eimbkl3rmjxdfvjbqxl77j4dx5y`}
    />
  </a>
);

return (
  <Header>
    <Logo />
    <Telegram />
  </Header>
);
