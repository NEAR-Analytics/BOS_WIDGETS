const css = fetch(
  "https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap"
  // https://fonts.google.com/specimen/Roboto+Mono?preview.size=18&query=mono
).body;

if (!css) {
  return;
}

const Theme = styled.div`
* {
    font-family: 'Roboto Mono';
}
  ${css}
`;

// Styled components for the hero section and its elements
// const HeroSection = styled.div`
//   position: relative;
//   width: 1554.29px;
//   height: 302.4px;
//   left: 0px;
//   top: 72px;
//   margin-left: auto; /* Center the section by pushing it to the right */
//   margin-right: auto; /* Center the section by pushing it to the left */
// `;

const HeroSection = styled.div`
  //position: relative;
  //max-width: 1440px;
  width: 100%;
  height: 302.4px;
  margin: 0 auto;
  margin-top: 0; /* Remove the top margin to close the gap */
`;

const WebImage = styled.div`
  position: absolute;
  //width: 836px;
  width: 50%;
  height: 302px;
  left: 689px;
  top: 72px;
  background: url('https://ik.imagekit.io/n7h27i0lh/WebSize_sRGB_NEARCON_029%201.png?updatedAt=1695488619193') no-repeat;
  background-size: cover;
`;

const Rectangle48 = styled.div`
  position: absolute;
  //width: 880px;
  width: 60%;
  height: 302px;
  left: 0px;
  top: 72px;
  background: #00EC97;
  clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
`;

const Text = styled.div`
  position: absolute;
  width: 740px;
  height: 183px;
  left: 48px;
  top: 132px;
  //font-family: 'Aeonik';
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  line-height: 100%;
  letter-spacing: -0.02em;
  color: #F4F4F4;
`;

const Text2 = styled.div`
  position: absolute;
  width: 740px;
  height: 183px;
  left: 48px;
  top: 132px;
  //font-family: 'Aeonik';
  font-style: normal;
  font-weight: 700;
  font-size: 60px;
  line-height: 100%;
  letter-spacing: -0.02em;
  color: black;
`;

const SectionContainer = styled.div`
  //margin-top: 40px;
  position: absolute;
  width: 100%;
  //width: 1554.29px;
  //max-width: 1440px;
  height: 292px;
  left: 0;
  top: 406px;
  background: #FFFFFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px; /* Add horizontal padding */
  margin-left: auto; /* Center the section by pushing it to the right */
  margin-right: auto; /* Center the section by pushing it to the left */
`;

const SectionContainer2 = styled.div`
  margin-top: 40px;
  position: absolute;
  width: 100%;
  //width: 1554.29px;
  //max-width: 1440px;
  height: 292px;
  left: 0;
  top: 406px;
  background: #F4F4F4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px; /* Add horizontal padding */
  margin-left: auto; /* Center the section by pushing it to the right */
  margin-right: auto; /* Center the section by pushing it to the left */
`;

const Article = styled.div`
  flex: 1; /* Each column takes an equal width */
  padding: 24px;
`;

const ArticleTitle = styled.div`
  height: 43px;
  //font-family: 'Aeonik';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 120%;
  text-align: left;
  color: #101820;
`;

const ArticleText = styled.div`
  height: 87px;
  //font-family: 'Aeonik Fono';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 120%;
  letter-spacing: -0.03em;
  color: #101820;
`;

const ArticleLink = styled.div`
  height: 29px;
  //font-family: 'Aeonik Fono';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 120%;
  color: #00EC97;
`;

const DiveRightIn = styled.div`
  position: absolute;
  width: 300px;
  height: 29px;
  left: 48px;
  top: 24px;
  //font-family: 'Aeonik Fono';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #00EC97;
`;

// Styled components for the header
const Header = styled.div`
  background: white;
  color: white;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: black;
`;

const Nav = styled.div`
  display: flex;
  gap: 16px;
`;

const NavLink = styled.a`
  color: black;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

return (
  <Theme>
    <Header>
      <Logo>/dev/hub</Logo>
      <Nav>
        <NavLink href="/communities">/activity_feed</NavLink>
        <NavLink href="/communities">/communities</NavLink>
        <NavLink href="/blog">/blog</NavLink>
      </Nav>
    </Header>
    <HeroSection>
      <WebImage></WebImage>
      <Rectangle48></Rectangle48>
      <Text>
        We are building{" "}
        <div style={{ color: "black" }}>a decentralized community</div> for NEAR
        Developers
      </Text>
    </HeroSection>
    <SectionContainer>
      <Article>
        <ArticleTitle>Near Docs</ArticleTitle>
        <ArticleText>Read NEAR Docs and build something new.</ArticleText>
        <ArticleLink>Read</ArticleLink>
      </Article>
      <Article>
        <ArticleTitle>BOS</ArticleTitle>
        <ArticleText>Read BOS Docs and build something new.</ArticleText>
        <ArticleLink>Read</ArticleLink>
      </Article>
      <Article>
        <ArticleTitle>Github</ArticleTitle>
        <ArticleText>Read BOS Docs and build something new.</ArticleText>
        <ArticleLink>Read</ArticleLink>
      </Article>
      <DiveRightIn>Dive right in</DiveRightIn>
    </SectionContainer>
    <SectionContainer2 style={{ top: "706px" }}>
      <Article>
        <ArticleTitle>Action 1</ArticleTitle>
        <ArticleText>Read NEAR Docs and build something new.</ArticleText>
        <ArticleLink>Read</ArticleLink>
      </Article>
      <Article>
        <ArticleTitle>Action 2</ArticleTitle>
        <ArticleText>Read BOS Docs and build something new.</ArticleText>
        <ArticleLink>Read</ArticleLink>
      </Article>
      <Article>
        <ArticleTitle>Action 3</ArticleTitle>
        <ArticleText>Read BOS Docs and build something new.</ArticleText>
        <ArticleLink>Read</ArticleLink>
      </Article>
      <DiveRightIn>Get Started</DiveRightIn>
    </SectionContainer2>
    <SectionContainer2 style={{ top: "1000px" }}>
      <Article>
        <ArticleTitle>Action 4</ArticleTitle>
        <ArticleText>Read NEAR Docs and build something new.</ArticleText>
        <ArticleLink>Read</ArticleLink>
      </Article>
      <Article>
        <ArticleTitle>Action 5</ArticleTitle>
        <ArticleText>Read BOS Docs and build something new.</ArticleText>
        <ArticleLink>Read</ArticleLink>
      </Article>
      <Article>
        <ArticleTitle>Action 6</ArticleTitle>
        <ArticleText>Read BOS Docs and build something new.</ArticleText>
        <ArticleLink>Read</ArticleLink>
      </Article>
    </SectionContainer2>
  </Theme>
);

export