const { Hero } = VM.require("builddao.near/widget/page.home.Hero") || {
  Hero: () => <></>,
};
const { Build } = VM.require("builddao.near/widget/page.home.Build") || {
  Build: () => <></>,
};
const { Cards } = VM.require("builddao.near/widget/page.home.Cards") || {
  Cards: () => <></>,
};
const { BuildSomething } = VM.require(
  "builddao.near/widget/page.home.BuildSomething"
) || {
  BuildSomething: () => <></>,
};
const { CTA } = VM.require("builddao.near/widget/page.home.CTA") || {
  CTA: () => <></>,
};
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  color: white;
  min-height: 100vh;
  overflow-x: clip;
`;
return (
  <HomeContainer>
    <Hero />
    <Build />
    {/* <BuildSomething />
    <Cards /> */}
    <CTA />
  </HomeContainer>
);
