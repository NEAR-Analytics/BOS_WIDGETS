const Wrapper = styled.div`
  .SwitchRoot {
 /* CSS styles for the course outline */
h2 {
  color: #337ab7;
  font-size: 24px;
  margin-bottom: 10px;
}

h3 {
  color: #5cb85c;
  font-size: 20px;
  margin-bottom: 8px;
}

p {
  color: #777;
  font-size: 16px;
  margin-bottom: 16px;
}

ol {
  list-style-type: decimal;
  margin-left: 20px;
}

ul {
  list-style-type: disc;
  margin-left: 20px;
}

li {
  margin-bottom: 8px;
}

/* Additional styles for specific elements */
h2:first-of-type {
  margin-top: 0;
}

h3:first-of-type {
  margin-top: 0;
}

ul li {
  margin-left: 20px;
}
}
} .SwitchThumb { } `;
return (
  <Wrapper>
    <Switch.Root className="SwitchRoot">
      <>
        <h2>Introduction to Cryptocurrency</h2>
        <p>
          Welcome to the Cryptocurrency Basics Course! In this comprehensive
          course, you will gain a deep understanding of cryptocurrencies,
          blockchain technology, and their impact on the financial landscape. By
          the end of the course, you will have the knowledge and skills to
          navigate the world of cryptocurrencies confidently.
        </p>
        <h2>Course Outline:</h2>
        <ol>
          <li>
            <h3>Module 1: Fundamentals of Cryptocurrency</h3>
            <p>
              This module provides an overview of cryptocurrencies, their
              origins, and the underlying technology. You will learn about the
              key concepts, including decentralized networks, cryptography, and
              distributed ledger technology. Topics covered include:
            </p>
            <ul>
              <li>What is Cryptocurrency?</li>
              <li>History and Evolution of Cryptocurrencies</li>
              <li>Blockchain Technology and its Role in Cryptocurrency</li>
              <li>Cryptocurrency Mining and Proof-of-Work</li>
              <li>Cryptocurrency Wallets and Security</li>
            </ul>
          </li>
          <li>
            <h3>Module 2: Popular Cryptocurrencies</h3>
            <p>
              This module focuses on some of the most well-known
              cryptocurrencies in the market. You will explore their features,
              use cases, and potential advantages and challenges. Topics covered
              include:
            </p>
            <ul>
              <li>Bitcoin (BTC)</li>
              <li>Ethereum (ETH)</li>
              <li>Ripple (XRP)</li>
              <li>Litecoin (LTC)</li>
              <li>Bitcoin Cash (BCH)</li>
            </ul>
          </li>
          <li>
            <h3>Module 3: Cryptocurrency Trading and Investment</h3>
            <p>
              This module delves into the world of cryptocurrency trading and
              investment. You will learn about different trading strategies,
              market analysis techniques, and risk management. Topics covered
              include:
            </p>
            <ul>
              <li>Cryptocurrency Exchanges and Trading Platforms</li>
              <li>Technical Analysis and Chart Patterns</li>
              <li>
                Fundamental Analysis and Evaluating Cryptocurrency Projects
              </li>
              <li>Managing Risks in Cryptocurrency Investments</li>
              <li>Cryptocurrency Taxation and Legal Considerations</li>
            </ul>
          </li>
          <li>
            <h3>Module 4: Cryptocurrency Security and Privacy</h3>
            <p>
              This module focuses on the importance of security and privacy in
              the cryptocurrency ecosystem. You will explore best practices for
              securing your cryptocurrencies and safeguarding your personal
              information. Topics covered include:
            </p>
            <ul>
              <li>Cryptocurrency Security Measures and Wallet Types</li>
              <li>
                Two-Factor Authentication (2FA) and Multi-Signature Wallets
              </li>
              <li>Protecting Against Phishing and Scams</li>
              <li>Anonymity and Privacy Coins</li>
              <li>Regulatory Landscape and Privacy Considerations</li>
            </ul>
          </li>
          <li>
            <h3>Module 5: Future of Cryptocurrency</h3>
            <p>
              This module explores the future developments and potential of
              cryptocurrencies. You will learn about emerging trends,
              technological advancements, and the impact of cryptocurrencies on
              various industries. Topics covered include:
            </p>
            <ul>
              <li>Decentralized Finance (DeFi) and Smart Contracts</li>
              <li>Blockchain Scalability and Interoperability Solutions</li>
              <li>Central Bank Digital Currencies (CBDCs)</li>
              <li>Cryptocurrency Regulations and Global Adoption</li>
              <li>Exploring Cryptocurrency Innovations and Beyond</li>
            </ul>
          </li>
        </ol>
      </>
      <button> Register to the online Course </button>
      <button> downald course </button>
      <a href="https://jutsu.ai/35e3f7be109c2eb05164b3fe483f6e34873745217426ef65c8d51e3b613220e3/widget/courses">
        <button> Courses </button>
      </a>
      <Switch.Thumb className="SwitchThumb" />
    </Switch.Root>
  </Wrapper>
);
