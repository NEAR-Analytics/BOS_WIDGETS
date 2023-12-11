const IntroductionSectionWrapper = styled.div`
  background-color: #f8f8f8;
  padding: 50px 0;
  text-align: center;
  @media and (max-width: 768px){
  margin: 0 20px;
}
`;

const IntroductionContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #4caf50;
`;

const Paragraph = styled.p`
  font-size: 1.2em;
  margin-bottom: 15px;
`;

const CTAButton = styled.button`
  background-color: #4caf50;
  color: white;
  font-size: 1.2em;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const Link = styled.a`
color: white;

`;

return (
  <IntroductionSectionWrapper>
    <IntroductionContent>
      <Title>Welcome to Dispose And Earn</Title>
      <Paragraph>
        Join us in revolutionizing waste management. Dispose and Earn is not
        just a platform; it's a movement towards a cleaner, greener planet.
      </Paragraph>
      <Paragraph>
        Contribute to our mission by responsibly disposing of waste, earning
        rewards, and making a positive impact on the environment.
      </Paragraph>
      <CTAButton>
        <Link
          style={{ color: "white" }}
          href="https://near.social/yousouf.near/widget/dispose-to-earn"
        >
          Get Started
        </Link>
      </CTAButton>
    </IntroductionContent>
  </IntroductionSectionWrapper>
);
