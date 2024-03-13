// FETCH CSS

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Alatsi&family=Aldrich&family=Space+Grotesk:wght@300..700&display=swap"
).body;
const css = fetch(
  "https://silver-fascinating-bug-868.mypinata.cloud/ipfs/QmWofbBSn3eyhq45qU6Hhen3S4pNy2d4fV8waswmfnZhqL"
).body;

if (!cssFont || !css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: "Space Grotesk", "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
    ${cssFont}
    ${css}
`,
  });
}
const Theme = state.theme;

const links = ["Home", "Near", "Earn", "Learn"];

// OUTPUT UI

return (
  <Theme>
    <div className="main">
      <div className="nav">
        <h3>
          Educ<span className="logo-gradient">Near</span>
        </h3>
        <div>
          {links.map((link) => (
            <span key={`Nav-link-${link}`}>{link}</span>
          ))}
        </div>
        <button className="btn-1">Login</button>
      </div>

      <div className="hero">
        <h2 className="gradient-txt">Join EducNear</h2>
        <h1>Unlock the Power of Blockchain!</h1>
        <p>
          Simple, effective learning to understand blockchain technology. Choose
          a course, start exploring, and embark on a journey of discovery.
          Empower Yourself. Transform Africa. Dive into Blockchain with
          EducNear.
        </p>
        <div className="cta">
          <button className="cta-btn cta-btn-1">Start Learning</button>

          <button className="cta-btn cta-btn-2">Ecosystems</button>
        </div>
      </div>

      <div className="section-1">
        <h2>
          Our <span className="logo-gradient">Vision</span>
        </h2>
        <p>
          We envision a future where every individual in Africa is equipped with
          the knowledge and skills to navigate the blockchain landscape,
          enabling them to contribute to and benefit from the digital economy.
        </p>

        <h2>
          What <span className="gradient-txt">We Offer</span>
        </h2>
      </div>
    </div>
  </Theme>
);
