const Hero = styled.div`
  display: grid;
  width: 100%;
  place-items: center;
  background-color: #191e24;
  background-size: cover;
  background-position: center;
  margin-top: 1.25rem;
  height: 100vh;
  padding-top: 10rem;
  padding-bottom: 10rem;
`;

const HeroContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
  gap: 1rem;
  grid-column-start: 1;
  grid-row-start: 1;
  justify-content: center;
  max-width: 80rem;
  padding: 1rem;
  z-index: 0;
`;

const HeroTitle = styled.div`
  color: rgb(229, 231, 235);
  font-weight: 700;
  font-size: 3rem;
  line-height: 1;
  margin: 0;
`;

const HeroSubtitle = styled.p`
  color: rgb(229, 231, 235);
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  text-align: center;
`;

const HeroActions = styled.div`
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  text-align: center;
`;

const Button = styled.a`
  align-items: center;
  background-color: transparent;
  border-radius: 0.5rem;
  border-style: solid;
  border-width: 1px;
  box-shadow:
    0 0 #0000,
    0 0 #0000,
    0 0 #0000;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  font-family: ui-sans-serif, system-ui, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  height: 3rem;
  justify-content: center;
  margin-left: 1.25rem;
  margin-right: 1.25rem;
  line-height: 1em;
  padding-left: 1rem;
  padding-right: 1rem;
  text-align: center;
  user-select: none;
`;

return (
  <>
    <Widget src="coolmouse.near/widget/KSTNAnvil.Navbar" />
    <Hero>
      <HeroContent>
        <div style={{ textAlign: "center" }}>
          <HeroTitle>Welcome to Keystone Index Portal</HeroTitle>
          <HeroSubtitle>
            Navigate to your desired option and execute commands to the
            contract.
          </HeroSubtitle>
          <HeroActions>
            <Button
              href="/coolmouse.near/widget/KSTNAnvil.Proposals.Keystone"
              style={{
                borderColor: "#7582FF",
                color: "#7582FF",
                outlineColor: "#7582FF",
              }}
            >
              Create new keystone proposal
            </Button>
            <Button
              href="/coolmouse.near/widget/KSTNAnvil.Proposals.Token"
              style={{
                borderColor: "#FF71CF",
                color: "#FF71CF",
                outlineColor: "#FF71CF",
              }}
            >
              Create new token proposal
            </Button>
          </HeroActions>
        </div>
      </HeroContent>
    </Hero>
  </>
);
