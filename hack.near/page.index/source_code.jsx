const { Footer } = VM.require("hack.near/widget/main.footer") || {
  Footer: () => <></>,
};

const { Button } = VM.require("buildhub.near/widget/components");

const imageUrl =
  props.imageUrl ??
  "https://builders.mypinata.cloud/ipfs/QmQmKGGJXhkhGrTbE4MgJ3G1wUUu8eo7mNKwRSCB5tihCw";

const HeaderContainer = styled.div`
  width: 100%;
  position: relative;

  padding: 9.375rem 3rem;

  @media screen and (max-width: 768px) {
    padding: 9.375rem 1.5rem;
  }
`;

const Logo = styled.img`
  height: 55px;
  object-fit: cover;
  margin: 8px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;

  margin: 0 auto;
`;

return (
  <>
    <HeaderContainer>
      <Content>
        <Logo src={imageUrl} />
        <Button variant="primary">
          <a
            style={{
              textDecoration: "none",
              color: "#000",
            }}
            href={`${props.buttonLink ?? "https://nearbuilders.org"}`}
          >
            <b>{props.buttonText ?? "START"}</b>
          </a>
        </Button>
      </Content>
    </HeaderContainer>
    <Footer />
  </>
);
