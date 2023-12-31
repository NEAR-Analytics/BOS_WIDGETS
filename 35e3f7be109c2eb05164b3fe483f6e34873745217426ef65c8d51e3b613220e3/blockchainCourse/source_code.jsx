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
        <h2>Introduction to Blockchain</h2>
        <p>
          Welcome to the Blockchain Course! In this comprehensive course, you
          will gain a deep understanding of blockchain technology and its
          applications. By the end of the course, you will be equipped with the
          knowledge and skills to leverage blockchain technology in various
          domains.
        </p>
        <h2>Course Outline:</h2>
        <ol>
          <li>
            <h3>Module 1: Fundamentals of Blockchain</h3>
            <p>
              This module provides an overview of blockchain technology, its
              core concepts, and the underlying principles of decentralized
              systems. Topics covered include:
            </p>
            <ul>
              <li>What is Blockchain?</li>
              <li>How Does Blockchain Work?</li>
              <li>Blockchain Components</li>
              <li>Decentralization and Consensus</li>
            </ul>
          </li>
          <li>
            <h3>
              Module 2: Smart Contracts and Decentralized Applications (DApps)
            </h3>
            <p>
              This module dives into smart contracts, a powerful feature of
              blockchain technology, and explores the development of
              decentralized applications (DApps). Topics covered include:
            </p>
            <ul>
              <li>Introduction to Smart Contracts</li>
              <li>Ethereum and Solidity</li>
              <li>Building DApps on Blockchain</li>
            </ul>
          </li>
          <li>
            <h3>Module 3: Blockchain Use Cases and Industry Applications</h3>
            <p>
              This module explores real-world use cases of blockchain technology
              across various industries. It delves into the practical
              applications and potential disruptions blockchain can bring.
              Topics covered include:
            </p>
            <ul>
              <li>Finance and Payments</li>
              <li>Supply Chain and Logistics</li>
              <li>Healthcare and Identity Management</li>
              <li>Energy and Sustainability</li>
            </ul>
          </li>
          <li>
            <h3>Module 4: Blockchain Security and Privacy</h3>
            <p>
              This module focuses on the security and privacy aspects of
              blockchain technology. It covers best practices and considerations
              for secure blockchain implementations. Topics covered include:
            </p>
            <ul>
              <li>Cryptography in Blockchain</li>
              <li>Security Measures and Threats</li>
              <li>Privacy Enhancements</li>
            </ul>
          </li>
          <li>
            <h3>Module 5: Future Trends and Innovations in Blockchain</h3>
            <p>
              This module explores emerging trends and innovations in the
              blockchain space. It discusses the future potential and
              advancements in blockchain technology. Topics covered include:
            </p>
            <ul>
              <li>Scalability Solutions</li>
              <li>Interoperability and Cross-Chain Communication</li>
              <li>Governance Models</li>
              <li>Blockchain in IoT and AI</li>
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
