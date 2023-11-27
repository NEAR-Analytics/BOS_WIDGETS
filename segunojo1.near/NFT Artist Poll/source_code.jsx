const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 8px;

`;
const Nav = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 12px;
  font-weight: 500;

  a{
    color: #000000;
    font-size: 16px
  }
`;

const header = (
  <HeaderContainer>
    <h4 style={{ fontWeight: 700 }}>MO#</h4>

    <Nav>
      <a href="#">Home</a>
      <a href="#">FAQs</a>
      <a href="#">Login</a>
      <a
        href="#"
        style={{
          backgroundColor: "#000",
          color: "#FFF",
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingInline: 24,
        }}
      >
        Signup
      </a>
    </Nav>
  </HeaderContainer>
);

const content = (
  <div>
    <img
      style={{
        maxHeight: 400,
        width: "100%",
        objectFit: "cover",
      }}
      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1099&q=80"
      alt="art"
    />
  </div>
);

return (
  <div>
    {header}
    {content}
    {templateLandingPageContent}

    {/* Edit this Widget at https://jutsu.ai/editor/saidulbadhon.near/widget/Template.LandingPage.ContentItem */}
    <Widget
      src="saidulbadhon.near/widget/Template.LandingPage.ContentItem"
      props={{
        image:
          "https://images.unsplash.com/flagged/photo-1587302164675-820fe61bbd55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
        name: "orange (fruit)",
        description:
          "An orange is a fruit of various citrus species in the family Rutaceae (see list of plants known as orange); it primarily refers to Citrus sinensis, which is also called sweet orange, to distinguish it from the related Citrus aurantium, referred to as bitter orange. The sweet orange reproduces asexually (apomixis through nucellar embryony); varieties of the sweet orange arise through mutations.",
        rtl: false,
      }}
    />

    {/* Edit this Widget at https://jutsu.ai/editor/saidulbadhon.near/widget/Template.LandingPage.ContentItem */}
    <Widget
      src="saidulbadhon.near/widget/Template.LandingPage.ContentItem"
      props={{
        image:
          "https://images.unsplash.com/photo-1587578855694-7e2c29dfd6c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
        name: "Coffee",
        description:
          "Coffee is a beverage prepared from roasted coffee beans. Darkly colored, bitter, and slightly acidic, coffee has a stimulating effect on humans, primarily due to its caffeine content. It has the highest sales in the world market for hot drinks.",
        rtl: true,
      }}
    />

    {/* Edit this Widget at https://jutsu.ai/editor/saidulbadhon.near/widget/Template.LandingPage.ContentItem */}
    <Widget
      src="saidulbadhon.near/widget/Template.LandingPage.ContentItem"
      props={{
        image:
          "https://images.unsplash.com/photo-1587132117816-061b35073a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
        name: "Trunk",
        description:
          "In botany, the trunk is the stem and main wooden axis of a tree, which is an important feature in tree identification, and which often differs markedly from the bottom of the trunk to the top, depending on the species. The trunk is the most important part of the tree for timber production. ",
        rtl: false,
      }}
    />
  </div>
);
