const Container = styled.div`
  display: flex;
  min-height: fit-content;
  align-items: center;
  justify-content: center;
  background-color: #f0f4f8; /* Use your desired background color */
  margin:10px;
   width: fit-content;
`;

const FlexContainer = styled.div`
  display: flex;
  font-family: sans-serif;
`;

const ImageContainer = styled.div`
  flex: none;
  display:flex; 
  width: fit-content;
`;

const StyledImage = styled.img`
  width: 200px;
  height: 200px;
  object-cover;
`;

const FormContainer = styled.div`
  flex: auto;
  padding: 0 30px;

`;

const Title = styled.h1`
  flex: auto;
  text-xl;
  font-semibold;
  color: #1a202c; /* Use your desired text color */
`;

const Price = styled.div`
  text-lg;
  font-semibold;
  color: #1a202c; /* Use your desired text color */
`;

const Stock = styled.div`
  width: 100%;
  flex: none;
  text-sm;
  font-medium;
  color: #2d3748; /* Use your desired text color */
  margin-top: 0.5rem;
`;

const Button = styled.button`
  height: 2rem;
  padding: 0 1rem;
  font-semibold;
  rounded-md;
  background:blue;
  border-radious: 5px;
  width:100px;
  border: none; /* Use your desired border color */
  color: #2d3748; /* Use your desired text color */
`;
const HeartIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: currentColor;
`;

const ShippingText = styled.p`
  text-sm;
  color: #4a5568; /* Use your desired text color */
`;
const profile = {
  avatar:
    "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  title: "Ape Fest Poll",
  subtitle: "Discove Polls",
  links: [
    { title: "Portfolio", url: "#" },
    { title: "Blogs", url: "#" },
  ],
  socials: [
    { title: "Github", url: "#" },
    { title: "Twitter", url: "#" },
    { title: "Facebook", url: "#" },
    { title: "Whatsapp", url: "#" },
    { title: "Linkedin", url: "#" },
  ],
};

const titleToIcon = [
  {
    title: "Github",
    icon: <i class="bi bi-github"></i>,
  },
  {
    title: "Twitter",
    icon: <i class="bi bi-twitter"></i>,
  },
  {
    title: "Facebook",
    icon: <i class="bi bi-facebook"></i>,
  },
  {
    title: "Whatsapp",
    icon: <i class="bi bi-whatsapp"></i>,
  },
  {
    title: "Linkedin",
    icon: <i class="bi bi-linkedin"></i>,
  },
];

return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
      height: "fit-content",
      padding: "0 8px",
      width: "100%",
    }}
  >
    <img
      style={{
        height: "100%",
        maxHeight: 200,
        borderRadius: "50%",
        aspectRatio: 1 / 1,
        objectFit: "cover",
      }}
      src={profile.avatar}
      alt={profile.title}
    />

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: props.theme.textColor }}>{profile.title}</h2>
      <h5 style={{ color: props.theme.textColor2 }}>{profile.subtitle}</h5>
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        maxWidth: "100vw",
      }}
    >
      {profile.links?.map((link) => (
        <Container>
          <FlexContainer>
            <ImageContainer>
              <StyledImage
                src="https://images.unsplash.com/photo-1699412958387-2fe86d46d394?q=80&w=3329&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                loading="lazy"
              />
            </ImageContainer>
            <FormContainer role="form">
              <div>
                <Title>Pullover Unisex</Title>
                <Price>Vote Count</Price>
                <Stock>Artist: </Stock>
              </div>
              <div>
                <Button type="button">Vote </Button>
              </div>
              <div></div>
              <ShippingText>Status : </ShippingText>
            </FormContainer>
          </FlexContainer>
        </Container>
      ))}
    </div>

    <div style={{ display: "flex", gap: 16 }}>
      {profile.socials?.map((link) => (
        <a href={link.url} target="_blank" style={{ fontSize: "1.5rem" }}>
          {titleToIcon.find((ti) => ti.title === link.title).icon}
        </a>
      ))}
    </div>
  </div>
);
