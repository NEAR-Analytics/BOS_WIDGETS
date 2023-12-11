const HowItWorksSectionWrapper = styled.div`
  background-color: #fff;
  padding: 50px 0;
  text-align: center;
  @media and (max-width: 768px){
  margin: 0 20px;
}
`;

const HowItWorksContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #4caf50;
`;

const Step = styled.div`
  margin-bottom: 30px;
`;

const StepTitle = styled.h3`
  font-size: 1.8em;
  margin-bottom: 10px;
  color: #4caf50;
`;

const StepDescription = styled.p`
  font-size: 1.2em;
`;

return (
  <HowItWorksSectionWrapper>
    <HowItWorksContent>
      <Title>How It Works</Title>
      <Step>
        <StepTitle>1. Dispose Your Waste</StepTitle>
        <StepDescription>
          Collect your waste and hand it over to our authorized collecting
          agents. Each kilogram earns you points.
        </StepDescription>
      </Step>
      <Step>
        <StepTitle>2. Earn Points</StepTitle>
        <StepDescription>
          Receive points based on the weight of your disposed waste. Earn 1
          point for every kilogram, equivalent to N200.
        </StepDescription>
      </Step>
      <Step>
        <StepTitle>3. Get Paid</StepTitle>
        <StepDescription>
          Accumulate points and convert them to real earnings. Receive your
          well-deserved payment through Near BOS.
        </StepDescription>
      </Step>
    </HowItWorksContent>
  </HowItWorksSectionWrapper>
);
