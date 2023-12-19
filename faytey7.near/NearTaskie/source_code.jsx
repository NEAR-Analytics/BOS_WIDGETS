const Container = styled.div`
background: #e9e9e9;
`;

const Span = styled.h3`
color: white;
`;

const Navbar = styled.div`
background: rgba(0,0,0,0.8);
width: full;
padding: 2em;
display: flex;
justify-content: space-between;
`;

const Ul = styled.div`
display: flex;
`;

const Li = styled.a`
color: white;
text-decoration: none;
margin: 0.3em;
`;

const Home = styled.div`
margin: 2em;
display: flex;
gap: 2em;
height: h-screen;
align-items: center;
justify-content: space-around;
`;

const Paragraph = styled.p`
font-size: 2em;
letter-spacing: 0.05em;
font-weight: bold;
color: #303030;
text-align: center;
width: 100%;
`;

const Gold = styled.span`
background: goldenrod;
padding: 0.1em 0.5em;
color: white;
border-radius: 0.2em;
text-stroke: 2px black;
`;

const Image = styled.img`
border-radius: 0.3em;
box-shadow: 1em 1em 3em rgba(0,0,0,0.3);
width: 100%;
`;

const About = styled.div`
background: rgba(0,0,0,0.8);
text: white;
padding: 2em;
`;

const H3 = styled.h3`
text-align: center;
color: white;
`;

const P = styled.p`
color: white;
font-size: 1.1em;
text-align: center;
padding: 1em 5em;
`;

const Create = styled.div`
padding: 2em;
`;

const Button = styled.button`
background: rgba(0,0,0,0.8);
color: white;
padding: 0.5em;
margin: 1em 0;
border: none;
border-radius: 0.3em;
`;

const Buttons = styled.button`
width: 100%;
background: rgba(0,0,0,0.8);
color: white;
padding: 0.5em;
margin: 1em 0;
border: none;
border-radius: 0.3em;
`;

const Footer = styled.div`
background: rgba(0,0,0,0.8);
padding: 2em 4em;
color: white;
text-align: center;
`;

const Heading = styled.h3`
text-align: center;
`;

const Input = styled.input`
margin: 1em 0;
display: block;
width: 100%;
padding: 0.3em;
border-radius: 0.5em;
border: none;
box-shadow: 0.1em 0.1em 0.3em rgba(0,0,0, 0.5);
`;

const Spans = styled.span`
font-weight: bold;
`;

return (
  <Container>
    <div>
      <div>
        <Navbar>
          <Span>NEAR TASKIE</Span>
          <Ul>
            <Li href="#home">HOME</Li>
            <Li href="#about">ABOUT</Li>
            <Li href="#contact">CONTACT</Li>
            <Li href="https://near.social/faytey7.near/widget/Create">
              OPEN APP
            </Li>
          </Ul>
        </Navbar>
      </div>
      <Home id="home">
        <Paragraph>
          NearTaskie <br /> built on <br /> <Gold>BOS</Gold>
        </Paragraph>
        <Image
          src="https://static.vecteezy.com/system/resources/thumbnails/007/117/264/small/working-and-meeting-workers-online-team-thinking-and-brainstorming-company-information-analytics-self-isolation-flat-design-modern-illustration-vector.jpg"
          alt="Team meeting"
        />
      </Home>
      <About id="about">
        <H3>ABOUT</H3>
        <P>
          NearTaskie is a dApp that helps teams and organizations organize,
          prioritize, and track their work-related tasks, with the aim of
          enhancing productivity and efficiency using a decentralized platform
          for planning and monitoring tasks.
        </P>
      </About>
    </div>
    <Footer id="contact">
      <H3>Contact</H3>
      <p>Email: neartaskie@gmail.com</p>
      <p>Phone: +2348123456789</p>
      <p>Address: 126, Boulevard ST. NY</p>
      <p>Copyright &copy; NEAR TASKIE. All Rights Reserved.</p>
    </Footer>
  </Container>
);
