const { Hero } = VM.require("abdullahi3000.near/widget/home.Hero") || {
  Hero: () => <></>,
};
const { Goals } = VM.require("buildhub.near/widget/home.Goals") || {
  Goals: () => <></>,
};
const { Join } = VM.require("buildhub.near/widget/home.Join") || {
  Join: () => <></>,
};
const { Purposes } = VM.require("abdullahi3000.near/widget/home.Purposes") || {
  Purposes: () => <></>,
};
const { AboutUs } = VM.require("buildhub.near/widget/home.AboutUs") || {
  AboutUs: () => <></>,
};
const { Governance } = VM.require(
  "abdullahi3000.near/widget/home.Governance"
) || {
  Governance: () => <></>,
};
const { Footer } = VM.require("abdullahi3000.near/widget/home.Footer") || {
  Footer: () => <></>,
};

return {
  Hero,
  Goals,
  Join,
  Purposes,
  AboutUs,
  Governance,
  Footer,
};
