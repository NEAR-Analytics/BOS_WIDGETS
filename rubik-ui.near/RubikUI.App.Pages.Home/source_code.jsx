const { Rubik: Theme } = VM.require(
  "rubik-ui.near/widget/RubikUI.Themes.RubikTheme"
) || {
  Rubik: () => <></>,
};

const { RubikLogo: Logo } = VM.require(
  "rubik-ui.near/widget/RubikUI.Components.Core"
) || {
  RubikLogo: () => <></>,
};

const { Accordion, AccordionItem } = VM.require(
  "rubik-ui.near/widget/RubikUI.Cubes.AccordionCubes"
) || {
  Accordion: () => <></>,
  AccordionItem: () => <></>,
};

const { AccordionFacet } = VM.require(
  "rubik-ui.near/widget/RubikUI.Facets.AccordionFacets"
) || {
  AccordionFacet: () => <></>,
};

const Wrapper = styled.div`
  width:100%;
  min-height:100vh;
  background-color:#fafafa;
  padding:20px;
  border-radius:10px;
`;

const Navbar = styled.div`
  color: var(--color-text-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius:10px;
`;

const NavbarLogo = styled.div`
  font-weight:bold;
  display:flex;
  align-items:center;
  justify-content:center;

  p {
    padding:0;
    margin:0;
    font-weight:bold;
    font-size:1.4rem;
  }
`;

const NavbarContent = styled.div``;

const NavbarLink = styled.a`
    color: var(--color-text-primary);
    font-size: var(--font-size-sm);
    text-decoration: none;
    margin-left: 20px;

    &:hover {
        text-decoration: underline;
    }
`;

const Search = styled.input`
  width:300px;
  border-radius:20px;
  background-color:#fff;
  border:1px solid rgba(0,0,0,.05);
  padding:.5rem 1.2rem;
`;

const MyAccordionFacet = styled(AccordionFacet || styled.div)`
  background-color:lightgreen;
  font-weight:bold;
  border-radius:5px;
  margin-top:20px;
`;

return (
  <Theme>
    <Wrapper>
      <Navbar>
        <NavbarLogo>
          <Logo></Logo>
          <p>rubik</p>
        </NavbarLogo>
        <NavbarContent>
          <Search placeholder="Search a cube" />
        </NavbarContent>
      </Navbar>
      <br/>
      <p>Standard Accordion Cube:</p>
      <Accordion>
        {Array.from([1, 2, 3]).map((data, idx) => (
          <AccordionItem>{idx}</AccordionItem>
        ))}
      </Accordion>
      <br />
      <br />
      <p>Inline Customized Accordion Cube (and inline media query at 800px) :</p>
      <Accordion
        mediaMaxWidth800="background-color:red"
        onClick={() => console.log("Accordion clicked!")}
        width="800px"
        fontStyle="italic"
      >
        {Array.from([1, 2, 3]).map((data, idx) => (
          <AccordionItem>{idx}</AccordionItem>
        ))}
      </Accordion>
      <br />
      <br />

      <p>Accordion Cube with extended Facet:</p>
      <Accordion apply={MyAccordionFacet}>
        {Array.from([1, 2, 3]).map((data, idx) => (
          <AccordionItem>{idx}</AccordionItem>
        ))}
      </Accordion>

      <Widget src="rubik-ui.near/widget/RubikUI.App.Pages.Elements" />
    </Wrapper>
  </Theme>
);
