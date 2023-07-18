const Wrapper = styled.div`
  --section-gap: 23px;
  padding-top: 42px;
  background-color: skyblue ; 
  height: 100vh;


  @media (max-width: 1155px) {
    .line-rounded-corners {
      display: none !important;
    }
  }

  @media (max-width: 998px) {
    padding-top: 0;
  }

  
  
`;

const H1 = styled.h1`
  font-family: "FK Grotesk", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 90px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #000;
  margin: 0;
  max-width: 700px;



  span {
    display: inline-block;
    background: #87CEEB;
    border-radius: 20px;
    position: relative;
    padding: 0.1em 0.2em 0;

    svg {
      position: absolute;
      bottom: -8px;
      right: -10px;
      width: 24px;
    }
  }

  @media (max-width: 900px) {
    font-size: 50px;

    span {
      border-radius: 12px;
      svg {
        position: absolute;
        bottom: -6px;
        right: -7px;
        width: 16px;
      }
    }
  }
`;

const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
  max-width: 670px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Flex = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-direction: column;
  flex-wrap: "nowrap";

  @media (max-width: 998px) {
    flex-direction: column;
    gap: var(--section-gap);
  }
`;

const Container = styled.div`
  display: flex;
  max-width: 1080px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 24px;
  

  
  

  @media (max-width: 768px) {
    padding: var(--section-gap) 12px;
  }
`;

const ChatContainer = styled.div`
  border: 1px solid white;
  border-radius: 10px;
  width: 650px;
  height: 530px;
  display: flex;
  padding: 1px;
  overflow: hidden;
    background-color: skyblue; 
`;

const Sidebar = styled.div`
  flex: 0.9;
  text-align: left;
  border-right: 1px solid #3e3c61;
  background-color: #3e3c61;

 
  
  
`;

const Chat = styled.div`
  flex: 2;
  text-align: Center;
  
`;

const NavBar = styled.div`
display: flex;
align-text: center;
align-items: center;
background-color: purple;
height: 50px;
padding: 10px 
justify-content: space-between;
color: white; 
gap: 20px;

`;

const NewChat = styled.div`
  border bottom: 1px solid gray;
  
  
`;

return (
  <Wrapper>
    <Container>
      <Flex>
        <H1>
          Dev Talk
          <span>
            💬
            <svg viewBox="0 0 26 24" fill="none" aria-hidden="true">
              <path
                d="M24.3767 8.06326L1.51965 0.0649912C1.10402 -0.0830767 0.639031 0.026026 0.327308 0.340346C0.0181841 0.657263 -0.0831256 1.12225 0.0701378 1.53788L8.071 23.2519C8.23726 23.7013 8.66587 24 9.14385 24H9.14644C9.62702 24 10.0556 23.6961 10.2167 23.2441L13.734 13.495L24.3325 10.2349C24.8053 10.0895 25.13 9.65824 25.1378 9.16468C25.1482 8.67112 24.8391 8.22691 24.3715 8.06326H24.3767Z"
                fill="#323330"
              />
            </svg>
          </span>
        </H1>
      </Flex>
      <input type="text" className="input" placeholder="Enter your name" />
      <button className="button" type="submit">
        <span>Join Dev Talk</span>
      </button>
      <ChatContainer>
        <Sidebar>
          <NavBar>
            DevTalk
            <span> Vic </span>
            <button> Logout </button>
          </NavBar>
          <button> New Chat + </button>
        </Sidebar>

        <Chat>Chat</Chat>
      </ChatContainer>
    </Container>
  </Wrapper>
);
