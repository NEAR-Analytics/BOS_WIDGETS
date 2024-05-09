const { Hero, Goals, Join, Purposes, AboutUs, Governance, Footer } = VM.require(
  "abdullahi3000.near/widget/home.Home"
) || {
  Hero: () => <></>,
  Goals: () => <></>,
  Join: () => <></>,
  Purposes: () => <></>,
  AboutUs: () => <></>,
  Governance: () => <></>,
  Footer: () => <></>,
};

const Root = styled.div`
  background-color: var(--bg-1, #000);
  color: var(--text-color, #fff);
  width: 100%;
`;

return (
  <Root>
    <Hero {...props} />
    {/* <Goals /> */}
    {/* <Join /> */}
    <Purposes />
    {/* <AboutUs /> */}
    <Governance />
    <Footer />
  </Root>
);
