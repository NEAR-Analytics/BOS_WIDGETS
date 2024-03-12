// FETCH CSS

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://silver-fascinating-bug-868.mypinata.cloud/ipfs/QmbsHCZ4QE1kdwffqFtZ5DKsmbRhcJG6JvvZcForaki6Gz"
).body;

if (!cssFont || !css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
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
    <nav>
      <h3>
        Educ<span class="logo-gradient">Near</span>
      </h3>
      <div>
        {links.map((link) => (
          <span key={`Nav-link-${link}`}>{link}</span>
        ))}
      </div>
      <button class="btn-1">Login</button>
    </nav>

    <div className="hero">
      <h2>Join EducNear</h2>
      <h1>Unlock the Power of Blockchain!</h1>
      <p>
        Simple, effective learning to understand blockchain technology. Choose a
        course, start exploring, and embark on a journey of discovery. Empower
        Yourself. Transform Africa. Dive into Blockchain with EducNear.
      </p>
      <div class="cta">
        <button class="cta-btn cta-btn-1">Start Learning</button>

        <button class="cta-btn cta-btn-2">Start Learning</button>
      </div>
    </div>
  </Theme>
);
