// add contributors, change background, add devhub and request links // add footer
const Hero = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  grid-gap: .5em;
  gap: .5em;
  margin-bottom: 3em;
  padding: 9em 2em;
background: white;
}
`;
const MainHeading = styled.h1`
  font-weight: 700;
  font-size: 10vw;
  line-height: 1em;
  text-align: center;
  color: #2d3748;
  white-space: nowrap;
`;
const SubHeading = styled.h3`
font-size: 2.6vw;
font-weight: 500;
text-align: center;
color: #2d3748;
//  @media (max-width: 992px) {
//     text-align:center;
//   }
`;

const HeaderButtonsContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
text-align: center;
grid-gap: 2em;
gap: 2em;
margin-top: 1.5em;

`;

const PrimaryButton = styled.div`
padding: .75em 4em;
border-radius: .7em;
color: var(--main-color);
border: 1px solid transparent;
transition: all .3s;
cursor: pointer;
    color: #fff;
    background: #9BB486;
    &:hover{
        color: #9BB486;
        background:#fff;
    }
@media screen and (max-width: 540px){
    padding: .5em 2em;    
    }
`;
const SecondaryButton = styled.div`
    padding: .75em 4em;
    border-radius: .7em;
    color: var(--main-color);
    border: 1px solid transparent;
    transition: all .3s;
    cursor: pointer;
    color: #9BB486;
    background:#fff;
    &:hover{
        color: #fff;
        background: #9BB486;
    }
    @media screen and (max-width: 540px){
    padding: .5em 2em;    
    }
`;

const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1em;
    @media screen and (max-width: 1200px){
      font-size: 2.5rem;
    }
    @media screen and (max-width: 900px){
      font-size: 2rem;
    }
    @media screen and (max-width: 540px){
      font-size: 1.5rem;
    }
`;

const Accent = styled.span`
color: #9BB486;
`;

const Text = styled.p`

`;

const FeatureContainer = styled.div``;

return (
  <>
    <Hero>
      <MainHeading>🌸 NEAR ReFi</MainHeading>
      <SubHeading>{"Building Postive Impact on Scale on NEAR"}</SubHeading>
      <HeaderButtonsContainer>
        <a style={{ textDecoration: "none" }} href="https://NEAReFi.org/join">
          <PrimaryButton>Join</PrimaryButton>
        </a>
        <a
          style={{ textDecoration: "none" }}
          href="https://NEAReFi.org/bos-home"
        >
          <SecondaryButton>Explore</SecondaryButton>
        </a>
      </HeaderButtonsContainer>
    </Hero>
    <Widget src="nearefi.near/widget/ReFi.Home.apps" />
    <Widget src="nearefi.near/widget/ReFi.Home.orgs" />
    <Widget src="nearefi.near/widget/ReFi.footer.main" />
  </>
);
