return (
  <div>
    <div class="">
      <p>
        <strong>Overview</strong>
      </p>

      <p>Patron works now on Polkadot ecosystem https://patron.works</p>
      <p>
        Nowadays, smart contracts are one of the main instruments of development
        in the blockchain world. As blockchain itself should be open and
        reliable, we want to create a registry of all available contracts, so
        everyone could understand the risks and check whether a specific
        contract is safe or not.
      </p>
      <p>
        The other side of it - manager of smart contracts, so every developer
        could manage his own contracts just like using GitHub. It is very
        important for users to have connection with what developers do, so that
        will increase trust between them.
      </p>
      <p>
        <strong>Existing problems</strong>
      </p>
      <p>
        1. Seamless verification ✅. An ability to seamless get your on-chain
        deployed contract logic verified and matched with existing source code,
        using the usual deployment flow without obscure actions.
      </p>
      <p>
        2. Cumbersome build/local deploy/debug flow. No automatic
        build/deploy/debug flow results in multiple repetitive manual actions.
      </p>
      <p>
        3. Inefficient contract deployment. CLI/script deployment usually are
        not sufficient for local/testnet development while existing UI
        instruments are rather complicated . Also, there is no common deploy
        flow for every stage - local/testnet/production, a tool that would
        combine both CLI automation and UI playground.
      </p>
      <p>
        4. Unified contract management. Deployed smart contract management is
        currently done with the usage of hard-to-use CLI tools or UI instruments
        with just the basic features available. Also, developer contract
        management(UI used during development) and post-deployment contract
        management are different tools and interfaces(UIs).
      </p>
      <p>
        5. Vulnerability research is done mostly ad-hoc, with no unified
        platform being available to assist users in covering common
        vulnerabilities. Ecosystem also lacks automatic vulnerability scanning
        platform, which will catch common mistakes in smart contracts that could
        lead to security issues.
      </p>
      <p>
        6. Interaction with external resources (like HTTP APIs) based on events
        is obscure and has to be implemented manually.
      </p>

      <p>
        <strong>Solution</strong>
      </p>
      <p>
        The Patron team is requesting $159,000 over 6 months ($26,500/mo) to
        integrate the smart contract verification in the Near ecosystem. The
        expected outcomes from this proposal include:
      </p>
      <p>
        <strong>Milestone 1 (Integration with ecosystem)</strong>
      </p>
      <ol>
        <li>
          We will provide API documentation for contributors to get along with
          the codebase.
        </li>
        <li>
          Ensure that database supports different networks with their own
          traits. Migrate existing data to this new database schema.
        </li>
        <li>
          Refactoring of internal infrastructure to handle different networks
          with different RPC SDKs. Implementation of initialize and watch
          commands using NEAR Lake Framework(traverse command is not needed
          here, since initialization process is done starting from the genesis
          block).
        </li>
        <li>
          Support different build schemas for various chains, choosing the
          required one based on the build session configuration. Test image
          isolation capabilities with the existing build schema.
        </li>
        <li>
          Ensure that routes that accept signed messages support NEAR's SDK for
          signature checks (primarily used for authentication purposes). If
          possible, migrate the payment check route to use NEAR's SDK.
        </li>
        <li>Integrate NEAR Wallet Selector. Updates to use new api.</li>
      </ol>
      <p>
        <strong>Milestone 2 (Server image update, Caller UI)</strong>
      </p>
      <ol>
        <li>
          We will provide API documentation for contributors to get along with
          the codebase.
        </li>
        <li>
          Utilize ecosystem verification image on a server in an isolated manner
          to ensure server safety of both our and self-hosted environments.
        </li>
        <li>
          We will implement a new subcommand, which automatically checks server
          code hash against the local build code hash using the local source
          code. This will ensure that developer can trust our remote build
          server, because code hash of the remote build is the same as local
          machine’s local builds.
        </li>
        <li>
          We will provide users with functionality to perform calls to smart
          contracts from our UI. We will implement a dynamically generated
          front-end for smart contract invocation purposes. Parsing of contract
          metadata will be implemented on the client-side.
        </li>
      </ol>
      <p>
        <strong>Milestone 3 (Build developer environment)</strong>
      </p>
      <ol>
        <li>
          We will implement local build capabilities that don’t use Docker, to
          improve user flow for contract testing cases, where quick builds are
          required. To improve the developer experience itself, we are planning
          to implement the watch command, which will handle the automatic
          upload, instantiation and debug UI loading.
        </li>
        <li>
          Automatic or guided tool installation will be implemented where
          possible, simplifying user interaction with CLI.
        </li>
        <li>
          We will design CLI in a way reduces any usage friction as much as
          possible. Website UI will be extended with local node information.
        </li>
        <li>
          We will support projects where multiple crates are providing multiple
          contracts.
        </li>
        <li>
          Integrate filesystem watch capabilities that will automatically open
          contract method call UI.
        </li>
      </ol>

      <p>
        <strong>Budget &amp; Financing</strong>
      </p>
      <p>Monthly breakdown as follows :</p>
      <p>
        The team consists of 4 engineering roles, 1 design role and 1 business
        development role. The team has been working together since 2020 and are
        all based in Ukraine. Below salaries include 13th-month wages, local tax
        and corporate taxes. NearBlocks does not rent or own an office. With
        this transition, each team member will be able to work full-time on
        Nearblocks.
      </p>
      <ul>
        <li>Co-Founders ($4,000/mo)</li>
        <li>Lead Engineer ($6,500/mo)</li>
        <li>Senior Full Stack ($4,000/mo)</li>
        <li>Sys/Devops ($3,500/mo)</li>
        <li>Front-end ($2,500/mo)</li>
        <li>Web Designer ($2,000/mo)</li>
        <li>Product Lead/Business Development ($3,000/mo)</li>
        <li>Server Hosting, Database, High Availability, Backups ($1000/mo)</li>
      </ul>
      <p>
        <strong>Technical Timeline</strong>
      </p>
      <ul>
        <li>Milestone 1 (0-2 months) – Integration with ecosystem;</li>
        <li>Milestone 2 (2-4 months) – Server image update, Caller UI;</li>
        <li>Milestone 3 (4-6 months) – Build developer environment.</li>
      </ul>
      <p>
        <strong>Reporting Structure &amp; Payment Schedule</strong>
      </p>
      <p>
        To ensure Patron meets the expectations of DevHub, we propose to break
        up the proposed funding into milestones that are paid out before the
        start of a new milestone.
      </p>
      <ul>
        <li>Milestone 1 ($59,625): September 2023</li>
        <li>Milestone 2 ($66,250): November 2023</li>
        <li>Milestone 3 ($33,125): February 2024</li>
      </ul>
    </div>
  </div>
);
