const css = fetch(
  "https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap"
  // https://fonts.google.com/specimen/Roboto+Mono?preview.size=18&query=mono
).body;

if (!css) {
  return;
}

const Theme = styled.div`
* {
    //font-family: 'Roboto Mono';
}
  ${css}
`;

const HeroSection = styled.div`
  position: relative;
  //max-width: 1440px;
  width: 100%;
  height: 302.4px;
  margin: 0 auto;
  margin-top: 0; /* Remove the top margin to close the gap */
  display: flex; /* Make the container a flex container */
  justify-content: space-between; /* Space items horizontally */
  align-items: center; /* Center items vertically */
`;

const WebImage = styled.div`
  position: relative;
  width: 836px;
  width: 50%;
  height: 302px;
  //left: 689px;
  //top: 72px;
  background: url('https://ik.imagekit.io/n7h27i0lh/WebSize_sRGB_NEARCON_029%201.png?updatedAt=1695488619193') no-repeat;
  background-size: cover;
`;

const Rectangle48 = styled.div`
  position: relative;
  width: 880px;
  width: 60%;
  height: 302px;
  //left: 0px;
  //top: 72px;
  //right: -30px;
  background: #00EC97;
  //clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
  padding: 10px 24px; /* Add horizontal padding */
  align-items: center; /* Center items vertically */
`;

const RectangleCommunities = styled.div`
  position: relative;
  width: 880px;
  width: 60%;
  height: 302px;
//   left: 0px;
//   top: 72px;
  background: #292929;
  //clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
  align-items: center; /* Center items vertically */
  padding: 10px 24px;
`;

const FeaturedCommunities = styled.div`
  position: relative;
  width: 100%;
  height: auto;//302px;
  background: #292929;
  align-items: center; /* Center items vertically */
  padding: 10px 60px;
`;

const Explore = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  background: #292929;
  align-items: center; /* Center items vertically */
  padding: 10px 24px;
`;

const Text = styled.div`
  position: relative;
  width: 740px;
  height: 183px;
  //left: 48px;
  //top: 132px;
  //font-family: 'Aeonik';
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 100%;
  letter-spacing: -0.02em;
  color: #F4F4F4;
  text-align: start; /* Center the text horizontally */
  padding: 10px 24px;
`;

const TextCommunities = styled.div`
  position: relative;
  width: 740px;
  //height: 183px;
  //left: 25px;
  //top: 132px;
  //font-family: 'Aeonik';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 100%;
  letter-spacing: -0.02em;
  color: white;
  text-align: start; /* Center the text horizontally */
  padding: 10px 24px;
`;

const SubCommunities = styled.div`
  position: relative;
  width: 450px;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 100%;
  letter-spacing: -0.02em;
  color: white;
  text-align: start; /* Center the text horizontally */
  padding: 0px 24px;
`;

const SectionContainer = styled.div`
  //margin-top: 40px;
  //padding-top: 10px;
  //position: absolute;
  width: 100%;
  //width: 1554.29px;
  //max-width: 1440px;
  height: 292px;
  left: 0;
  //top: 406px;
  background: #FFFFFF;
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  padding: 10px 24px; /* Add horizontal padding */
  margin-left: auto; /* Center the section by pushing it to the right */
  margin-right: auto; /* Center the section by pushing it to the left */
`;

const SectionContainer2 = styled.div`
  //margin-top: 40px;
  //position: absolute;
  width: 100%;
  //width: 1554.29px;
  //max-width: 1440px;
  height: 292px;
  left: 0;
  top: 406px;
  background: #F4F4F4;
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  padding: 10px 24px; /* Add horizontal padding */
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

const CommunityTitle = styled.div`
  height: 43px;
  //font-family: 'Aeonik';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 120%;
  text-align: left;
  color: #292929;
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
  //position: absolute;
  padding-top: 20px;
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
   padding: 0 24px; /* Add horizontal padding */
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
      <Rectangle48>
        <Text>
          We are building{" "}
          <div style={{ color: "black" }}>a decentralized community</div> for
          NEAR Developers
        </Text>
      </Rectangle48>
      <WebImage></WebImage>
    </HeroSection>

    <SectionContainer>
      <DiveRightIn>Dive right in</DiveRightIn>
      <div
        style={{
          display: "flex",
          "justify-content": "space-between",
          "align-items": "center",
        }}
      >
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
      </div>
    </SectionContainer>
    <SectionContainer2>
      <DiveRightIn>Get Started</DiveRightIn>
      <div
        style={{
          display: "flex",
          "justify-content": "space-between",
          "align-items": "center",
        }}
      >
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
      </div>
    </SectionContainer2>
    <SectionContainer2>
      <div
        style={{
          display: "flex",
          "justify-content": "space-between",
          "align-items": "center",
        }}
      >
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
      </div>
    </SectionContainer2>
    <Explore>
      <DiveRightIn>Explore</DiveRightIn>
      <SubCommunities style={{ color: "#818181", width: "950px" }}>
        We firmly believe that communities form the sturdy foundation of a
        decentralized ecosystem. Here at /dev/hub, they are the driving force
        behind our most impactful innovations. Explore our diverse range of
        communities, discover their ongoing initiatives, and start engaging with
        them today to be a part of something bigger.
      </SubCommunities>
    </Explore>

    <HeroSection>
      <RectangleCommunities>
        <TextCommunities>Communities</TextCommunities>
        <SubCommunities>
          We firmly believe that communities form the sturdy foundation of a
          decentralized ecosystem. Here at /dev/hub, they are the driving force
          behind our most impactful innovations. Explore our diverse range of
          communities, discover their ongoing initiatives, and start engaging
          with them today to be a part of something bigger.
        </SubCommunities>
      </RectangleCommunities>
      <WebImage></WebImage>
    </HeroSection>
    <FeaturedCommunities>
      <div
        style={{
          display: "flex",
          "justify-content": "space-between",
          "align-items": "center",
        }}
      >
        <Article>
          <ArticleTitle style={{ color: "#00EC97", "font-size": "30px" }}>
            /BOS_community
          </ArticleTitle>
          <ArticleText
            style={{
              color: "#818181",
              "font-size": "20px",
              "margin-top": "10px",
            }}
          >
            Read NEAR Docs and build something new.
          </ArticleText>
        </Article>
        <Article>
          <ArticleTitle style={{ color: "#00EC97" }}>
            /zero_knowledge
          </ArticleTitle>
          <ArticleText
            style={{
              color: "#818181",
              "font-size": "20px",
              "margin-top": "10px",
            }}
          >
            Read BOS Docs and build something new.
          </ArticleText>
        </Article>
      </div>
      <div
        style={{
          display: "flex",
          "justify-content": "space-between",
          "align-items": "center",
        }}
      >
        <Article>
          <ArticleTitle style={{ color: "#00EC97", "font-size": "30px" }}>
            /protocol
          </ArticleTitle>
          <ArticleText
            style={{
              color: "#818181",
              "font-size": "20px",
              "margin-top": "10px",
            }}
          >
            Read NEAR Docs and build something new.
          </ArticleText>
        </Article>
        <Article>
          <ArticleTitle style={{ color: "#00EC97" }}>
            /contract_standards
          </ArticleTitle>
          <ArticleText
            style={{
              color: "#818181",
              "font-size": "20px",
              "margin-top": "10px",
            }}
          >
            Read BOS Docs and build something new.
          </ArticleText>
        </Article>
      </div>
    </FeaturedCommunities>
  </Theme>
);

export