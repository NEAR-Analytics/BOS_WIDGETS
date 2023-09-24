const StyledLandingPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
`;

const StyledChild = styled.div`
  width: 100%;
  height: 100px;
  background-color: #ddd;
`;

const StyledBannerHeading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  text-align: center;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 20px;
  background-color: #333;
  color: white;
  margin-top:20px;
`;

const StyledLogo = styled.img`
  width: 150px;
  height: auto;
`;

const StyledText = styled.div`
  margin-top: 10px;
  color: #666;
  font-size: 14px;
`;

const TickItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  
  ${TickImage} {
    margin-right: 10px;
  }
`;

const TickImage = styled.img`
  width: 20px;
  height: 20px;
`;

const StyledWhyClientsTrust = styled.div`
  margin-top: 30px;
  font-size: 18px;
  font-weight: bold;
  color: #444;
`;

const StyledFrameParent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  background-color: white;
`;
return (
  <StyledLandingPage>
    <StyledChild />
    <StyledBannerHeading>
      <div>
        <div>Welcome to ThePeoplesPlace</div>
        <StyledText>
          A revolutionary governance system for market users seeking just and
          transparent method for dispute resolution.
        </StyledText>
      </div>
      <StyledButton>Connect your wallet</StyledButton>
    </StyledBannerHeading>
    <StyledHeader>
      <StyledButton>Community</StyledButton>
    </StyledHeader>
    <StyledText>
      Born out of the necessity to bridge the trust gap in decentralized
      platforms, ThePeoplesPlace stands as a testament to community-driven
      justice.
    </StyledText>
    <div>
      <TickItemContainer>
        <StyledText>
          Operating on principles of fairness, community engagement, and
          transparency.
        </StyledText>
      </TickItemContainer>
      <TickItemContainer>
        <StyledText>
          Members can propose resolutions, vote on outcomes, and stake tokens.
        </StyledText>
      </TickItemContainer>
    </div>
    <StyledWhyClientsTrust>Why our members trust us</StyledWhyClientsTrust>
    <div>
      <div>Empowering Community-driven Justice</div>
      <StyledText>
        Ensures that the decision-making process is swift, reflective of a wider
        community consensus, and recorded on the blockchain, ensuring immutable
        proof of the process and the final verdict.
      </StyledText>
    </div>
    <StyledFrameParent>
      <div>
        <div>Join The Movement</div>
        <StyledText>
          A platform that acts as a knowledge repository and encourages
          participation from all its members. Propelling us toward a future
          where market disputes are resolved by the very community they affect.
        </StyledText>
      </div>
      <StyledButton>Learn More</StyledButton>
    </StyledFrameParent>
  </StyledLandingPage>
);
