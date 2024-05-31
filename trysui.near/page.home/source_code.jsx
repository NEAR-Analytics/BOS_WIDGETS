const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  min-height: 80vh;
`;
const Button = styled.button`
  padding: 12px 16px;
  border: none;
  border-radius: 4px;
  background-color: #000;
  color: #a5a5a5;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #1c1a1a;
  }
`;
const StlyedInput = styled.input`
  color: black;
  padding: 4px;
`;
const Dropdown = styled.select`
  background-color: #1c1c1c;
  width: 300px;
  height: 47px;
  padding: 10px 20px 10px 20px;
  border: 1px solid #444;
`;
const OptionComponent = styled.div`
  padding: 20px;
  border-radius: 4px;
  width: 80%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Separator = styled.div`
  height: 10px;
  width: 100%;
`;
const MonospaceText = styled.span`
  font-family: monospace;
`;
return (
  <Container>
    <br />
    <h3>Welcome!</h3>
    <p>
      Check out the{" "}
      <Link to={`/trysui.near/widget/Index?page=library`}>library</Link> of Sui
      components to use in your app, then go to the{" "}
      <Link to={`/trysui.near/widget/Index?page=sandbox`}>sandbox</Link> and try
      it out.
    </p>
    <br />
    <br />
    <h2>About</h2>
    <h5>Building Blocks for Deep Integrations</h5>
    <p>
      Our hackathon project combines the power of Sui packages with a flexible
      sandbox running on the NEAR blockchain operating system. Together, we can
      experiment with better ways to build!
    </p>
    <p>
      <b>Problem:</b> Even with such great documentation, onboarding developers
      to Sui and Enoki requires considerable time installing, configuring, and
      managing dependencies.
    </p>
    <p>
      <b>Solution:</b> Web components with pre-installed custom elements lower
      the barriers to entry for Sui developers. These highly accessible
      resources could help more and more people learn to create applications
      with Enoki, along with other tools for building on Sui.
    </p>
    <p>
      <i>
        Not only does our bos-sui-webcomponent make it easier for builders to
        create apps with Enoki and other Sui tooling, but also, it is a reusable
        and customizable component itself.
      </i>
    </p>
    <p>
      During the hackathon, Evan Cheng inspired us to reimagine how builders
      interact with software, and specifically, our main goals were to improve
      Sui onboarding processes and minimize the learning curve for builders.
    </p>
    <p>
      <b>Overview:</b> Our project is made to demonstrate how open web
      components can enhance functionality, usability, and scalability of
      applications built on Sui.
    </p>
    <h3>Features:</h3>
    <ul>
      <li>
        <b>ConnectButton</b> ~ for utilizing zkLogin through the UI Kit’s
        “ConnectButton”
      </li>
      <li>
        <b>EnokiFlow</b> ~ for submitting transactions to the Enoki Flow
      </li>
      <li>
        <b>SuiClientQuery</b> ~ for querying and interacting with account data
      </li>
      <li>
        <b>SuiSigner</b> ~ for signing transactions
      </li>
    </ul>
    <h3>Benefits:</h3>
    <ul>
      <li>
        <b>Ease of Use:</b> Our custom VM elements provide a straightforward way
        for developers to start building with Sui and Enoki, reducing the time
        and effort needed for setup.
      </li>
      <li>
        <b>Quality of Developer Experience:</b> Our solution aims to improve
        success rate of onboarding builders to Sui Typescript SDK, Enoki, etc.
        pre-configured components and a user-friendly environment for building
        and testing applications.
      </li>
      <li>
        <b>Framework Compatibility:</b> Web components, as a web standard,
        enable support across all frameworks. This ensures seamless integration
        and support, no matter the stack, making it easier for developers to
        incorporate Sui and Enoki into their existing projects.
      </li>
    </ul>
    <p>
      <h5>Implementation:</h5> We deployed on the Sui and NEAR testnets,
      showcasing the interoperability and unprecedented capabilities of our
      integrations. The product works like a documentation site with an online
      IDE (integrated developer environment) built-in. It offers the ability to
      build and deploy apps directly from the application, so developers can
      focus on shipping. Hopefully, this project will result in more developers
      building Sui apps and greater usage of zkLogin for onboarding the masses.
    </p>
    <br />
    <h3>Next Steps:</h3>
    <p>
      Moving forward, the goal is to support an integrated testing environment
      for smart contracts. This approach facilitates prototyping and open
      collaboration across teams / organizations.
    </p>
    <p>
      This project showcases how to achieve a synergistic effect by launching
      Sui apps with on-chain front ends on NEAR, cultivating shared
      opportunities to generally improve developer experience. By educating
      builders to use modular web components, we are contributing to mass
      adoption, impact, and evolution of blockchain technology.
    </p>
    <h2>Technical Explanation:</h2>
    <p>
      This near-bos-webcomponent is essentially a decentralized React app with
      the near-social-vm installed, along with Enoki and Sui dev tools
      integrated. We deployed to web4 in order to provide a live sandbox for Sui
      builders. See it live at trysui.near.page!
    </p>
    <p>
      The Sui stack was especially suitable for this implementation because of
      how the hooks and providers are structured, as well as the existing UI kit
      and patterns it follows. For example, the simple ConnectButton and wallet
      persistence are handled by the providers themselves, rather than managed
      manually. This made for an easy integration. We greatly benefited from the
      modularity of the functions, given how Sui separates wallet connection
      from transaction building and signing. Also, Sui provided helpers for
      querying and displaying data.
    </p>
    <a href="https://www.canva.com/design/DAGGy7IpEBM/mwE8rYsJ30WLVcO3hAkB7w/edit">
      <h5>Canva Slides</h5>
    </a>
    <a href="https://github.com/nearbuilders/bos-sui-webcomponent">
      <h5>GitHub</h5>
    </a>
  </Container>
);
