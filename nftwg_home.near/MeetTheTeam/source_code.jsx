const MainContainer = styled.div`
  position: absolute;
  width: 1200px;
  height: 800px;
  left: 0px;
  top: 0;
`;

const BackgroundContainer = styled.div`
  position: absolute;
  width: 1200px;
  height: 794px;
  left: 0px;
  top: 6px;
  background: #1B1B1B;
`;

const ContentContainer = styled.div`
  position: absolute;
  width: 1180px;
  height: 788px;
  left: 10px;
  top: 10px;
`;

const NFTText = styled.div`
  position: absolute;
  width: 600px;
  height: 165px;
  left: 50px;
  top: 50px;
  font-family: inherit;
  font-style: normal;
  font-weight: 700;
  font-size: 44px;
  line-height: 125.5%;
  color: #FFFFFF;
`;

const CharterText = styled.div`
  position: absolute;
  width: 428px;
  height: 90px;
  left: 832px;
  top: 50px;
  font-family: inherit;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 150.5%;
  color: #FFFFFF;
`;

const Rectangle = styled.div`
  position: absolute;
  width: 8px;
  height: 159px;
  left: 692px;
  top: 50px;
  background: #FEFEFE;
`;

const CharterButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 40px;
  gap: 10px;
  position: absolute;
  width: 137px;
  height: 48px;
  left: 750px;
  top: 180px;
  background: #FEFEFE;
  border-radius: 4px;
  cursor: pointer;
`;

const Charter = styled.div`
  width: 57px;
  height: 16px;
  font-family: inherit;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: #7B7B7B;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Star4 = styled.div`
  position: absolute;
  width: 113px;
  height: 113px;
  left: 1071px;
  top: 187px;
  
`;

const Star5 = styled.div`
  position: absolute;
  width: 65px;
  height: 65px;
  left: 835px;
  top: 300px;
  
`;

const Star6 = styled.div`
  position: absolute;
  width: 45px;
  height: 65px;
  left: 0px;
  top: 0px;
  
`;

const MeetTheTeamText = styled.div`
  position: absolute;
  width: 867px;
  height: 84px;
  left: calc(50% - 867px/2);
  top: 440px;
  font-family: inherit;
  font-style: normal;
  font-weight: 700;
  font-size: 70px;
  line-height: 120%;
  text-align: center;
  color: #FFFFFF;
`;

return (
  <MainContainer>
    <BackgroundContainer>
      <ContentContainer>
        <NFTText>
          NFTs will lead the Web 3 evolution with limitless utility and endless
          fun!
        </NFTText>
        <CharterText style={{ left: 750 }}>
          Our charter is the compass guiding the NFT Working Group—a roadmap of
          goals, plans, and vision, ensuring transparency and progress.
        </CharterText>
        <Rectangle />
        <CharterButton>
          <Charter>Charter</Charter>
        </CharterButton>
        <Star4>
          <svg
            width="113"
            height="113"
            viewBox="0 0 113 113"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M56.5 0L59.6961 53.3039L113 56.5L59.6961 59.6961L56.5 113L53.3039 59.6961L0 56.5L53.3039 53.3039L56.5 0Z"
              fill="#FFD88D"
            />
          </svg>
        </Star4>
        <Star5>
          <svg
            width="65"
            height="65"
            viewBox="0 0 65 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32.5 0L35.0279 29.9721L65 32.5L35.0279 35.0279L32.5 65L29.9721 35.0279L0 32.5L29.9721 29.9721L32.5 0Z"
              fill="#F29B9B"
            />
          </svg>
        </Star5>
        <Star6>
          <svg
            width="65"
            height="65"
            viewBox="0 0 65 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32.5 0L35.0279 29.9721L65 32.5L35.0279 35.0279L32.5 65L29.9721 35.0279L0 32.5L29.9721 29.9721L32.5 0Z"
              fill="#85EBB3"
            />
          </svg>
        </Star6>
        <MeetTheTeamText>Meet The Team</MeetTheTeamText>
      </ContentContainer>
    </BackgroundContainer>
  </MainContainer>
);
