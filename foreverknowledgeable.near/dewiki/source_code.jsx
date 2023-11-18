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
    <h4 style={{ fontWeight: 700 }}>Forever Knowledgable</h4>

    <Nav>
      <a href="#">Profile</a>
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

const res = fetch(
  "https://ipfs.io/ipfs/bafkreiacbg75gszys54j2fsupjt4zv7sgkaz2gvnphwje6psga62dq7gtm"
);


return (
  <div>
    {header}
    {templateLandingPageContent}
    


    {/* Edit this Widget at https://jutsu.ai/editor/saidulbadhon.near/widget/Template.LandingPage.ContentItem */}
    <Widget
      src="saidulbadhon.near/widget/Template.LandingPage.ContentItem"
      props={{
        image:
          res.body.image,
        name: res.body.title,
        description:
          res.body.markdown,
        rtl: false,
      }}
    />
  </div>
);
