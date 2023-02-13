return (
  <div className="container">
    <div className="row mb-3"></div>

    <div className="row mb-3">
      <div>
        <h4>Activating Near Social Development</h4>
        <p>Create a project page for the Near Social hackathon!</p>
        <div className="mb-3"></div>
        <button
          className="nav-link"
          id="pills-explore-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-explore"
          type="button"
          role="tab"
          aria-controls="pills-explore"
          aria-selected="false"
          href="https://near.social/#/create.near/widget/Page?accountId=create.near"
        >
          Example
        </button>
        <button
          className="nav-link"
          id="pills-ideas-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-ideas"
          type="button"
          role="tab"
          aria-controls="pills-ideas"
          aria-selected="false"
          href="https://devgovgigs.near.social"
        >
          Ideas
        </button>
        <button
          className="nav-link"
          id="pills-info-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-info"
          type="button"
          role="tab"
          aria-controls="pills-info"
          aria-selected="false"
          href="https://nearbuilders.com"
        >
          More Info
        </button>
      </div>
    </div>
    <div className="row mb-3">
      <div>
        <h1>Guide for Builders</h1>
        <p>
          Together, open web devs are creating the future of decentralized
          applications. We coordinate to build meaningful solutions for
          everyone!
        </p>
        <h3>Why Participate?</h3>
        <h4>Learn, Collaborate, Grow</h4>
        <p>
          Are you looking for opportunities to explore groundbreaking
          technologies, connect with collaborators, and experiment with on-chain
          frontend tools?
        </p>
        <p>
          Near Social hackathons provide a welcoming environment for anyone to
          delve further into this open-source development platform and the
          underlying data protocol.
        </p>
        <p>
          Overall, the mission is to activate and support a growing community of
          JavaScript programmers in the NEAR ecosystem.
        </p>
        <h2>How To Participate</h2>
        <h3>1. EXPLORE IDEAS</h3>
        <p>
          Share potential project plans via the{" "}
          <a href="https://devgovgigs.near.social">Gigs Board</a>. Use the
          #hackathon tag, so your post will show up here. Add other tags to
          facilitate discovery!
        </p>
        <h3> 2. FORM TEAMS</h3>
        <p>
          Review ideas on the hackathon ideas board to discover projects and
          find collaborators. Reply to discuss plans with potential teammates.
          Once you have agreed to work as a team, complete the final steps to
          submit your project.
        </p>
        <h3> 3. SUBMIT PROJECTS</h3>
        <p>
          First, create a project-specific NEAR account and make a profile.
          Then, follow each member of the team, and they can follow back to
          indicate mutual support. Finally, be sure to save your widget(s) to
          this profile.
        </p>
        <div className="mb-3"></div>
        <button href="https://create.near.social">
          Create Project Submission
        </button>
      </div>
    </div>
  </div>
);
