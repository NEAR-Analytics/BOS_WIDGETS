const Wrapper = styled.div`
  .SwitchRoot {
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 200px;
  background-color: #f2f2f2;
  border-radius: 10px;
}

h1 {
  font-size: 28px;
  color: #006600;
  text-align: center;
}

h2 {
  font-size: 20px;
  color: #006600;
}

p {
  font-size: 16px;
  color: #009900;
  line-height: 1.5;
}

ul {
  font-size: 16px;
  color: #009900;
  line-height: 1.5;
  margin-left: 20px;
}

strong {
  color: #006600;
}
} .SwitchThumb { } `;
return (
  <Wrapper>
    <Switch.Root className="SwitchRoot">
      <div class="container">
        <h1>Introduction to Decentralized Finance (DeFi)</h1>
        <p>
          Decentralized Finance (DeFi) refers to the use of blockchain
          technology and cryptocurrencies to recreate traditional financial
          systems in a decentralized and permissionless manner.
        </p>
        <h2>What is DeFi?</h2>
        <p>
          DeFi aims to eliminate intermediaries such as banks and financial
          institutions by utilizing smart contracts and decentralized
          applications (DApps). It allows users to access financial services
          such as lending, borrowing, trading, and earning interest directly
          from their digital wallets.
        </p>
        <p>
          Unlike traditional finance, DeFi operates on public blockchains,
          ensuring transparency, security, and accessibility for anyone with an
          internet connection. It enables global financial inclusion by removing
          barriers and providing financial services to the unbanked and
          underbanked populations.
        </p>
        <h2>Key Features of DeFi</h2>
        <ul>
          <li>
            <strong>Openness:</strong> DeFi protocols and applications are
            open-source, allowing anyone to review the code and contribute to
            its development.
          </li>
          <li>
            <strong>Interoperability:</strong> DeFi projects can interact with
            each other, enabling composability and the creation of complex
            financial products and services.
          </li>
          <li>
            <strong>Permissionless:</strong> Anyone with an internet connection
            and a cryptocurrency wallet can participate in DeFi without
            requiring permission or approval.
          </li>
          <li>
            <strong>Transparency:</strong> All transactions and financial
            activities on DeFi platforms are publicly verifiable on the
            blockchain.
          </li>
        </ul>
        <h2>Applications of DeFi</h2>
        <p>
          DeFi has a wide range of applications, including decentralized lending
          platforms, decentralized exchanges (DEXs), stablecoins, yield farming,
          liquidity provision, and more. These applications provide users with
          greater control over their financial activities and opportunities to
          earn passive income.
        </p>
        <a href="https://jutsu.ai/35e3f7be109c2eb05164b3fe483f6e34873745217426ef65c8d51e3b613220e3/widget/Articles">
          <button> Articles</button>
        </a>
      </div>
      <Switch.Thumb className="SwitchThumb" />
    </Switch.Root>
  </Wrapper>
);
