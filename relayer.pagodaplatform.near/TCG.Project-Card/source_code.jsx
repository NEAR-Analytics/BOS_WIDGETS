const title = props.title || "tcg-near-donation-title";
const descreption = props.descreption || "tcg-near-descreption";

let progressBarProps = {
  goalAmount: props.goalAmount,
  collectedAmount: props.collectedAmount,
};

const Container = styled.div`
  width: 390px;
  height: 319px;
  position: relative;
  border-radius: 8px 8px 0px 0px;
   background-color: ${(props) =>
     props.backgroundColor ? props.backgroundColor : "#D3E9B9"};`;

const Image = styled.img`
  width: 390px;
  height: 176px;
  left: 0;
  top: 0;
  object-fit: cover;
  position: absolute;
  background: linear-gradient(0deg, #D9D9D9 0%, #D9D9D9 100%);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const TextContainer = styled.div`
  height: 50px;
  left: 16px;
  top: 192px;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  display: inline-flex;
`;

const Title = styled.div`
color: var(--Black, #181021);
font-family: DM Sans;
font-size: 16px;
font-style: normal;
font-weight: 1000;
line-height: 150%; /* 24px */
`;

const Description = styled.div`
  width: 311px;
  opacity: 0.80;
  color: #181021;
  font-size: 12px;
  font-family: 'DM Sans';
  font-weight: 400;
  line-height: 18px;
  word-wrap: break-word;
`;

const ProgressBarContainer = styled.div`
  left: 16px;
  top: 265px;
  position: absolute;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  display: inline-flex;
`;

const IconContainer = styled.div`
  width: 79px;
  height: 30px;
  left: 212px;
  top: 265px;
  position: absolute;
`;

const RoundIcon = styled.div`
  width: 29.95px;
  height: 29.95px;
  left: 49.27px;
  top: 0;
  position: absolute;
  background: #181021;
  border-radius: 9999px;
`;

const IconText = styled.div`
  left: 7.92px;
  top: 9.38px;
  position: absolute;
  color: white;
  font-size: 9.38px;
  font-family: 'DM Sans';
  font-weight: 500;
  text-transform: capitalize;
  line-height: 11.25px;
  word-wrap: break-word;
`;

const SmallImage = styled.img`
  width: 29.95px;
  height: 29.95px;
  left: 24.32px;
  top: 0;
  position: absolute;
  border-radius: 9999px;
`;

const AnotherImage = styled.img`
  width: 28.95px;
  height: 28.97px;
  left: 0.37px;
  top: 1.03px;
  position: absolute;
  border-radius: 9999px;
`;

const DonateButton = styled.div`
  height: 30px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  left: 299px;
  top: 265px;
  position: absolute;
  background: white;
  border-radius: 24px;
  border-color: white;
  justify-content: center;
  align-items: center;
  gap: 4px;
  display: inline-flex;
`;

const DonateText = styled.div`
  text-align: right;
  color: #181021;
  font-size: 12px;
  font-family: 'DM Sans';
  font-weight: 700;
  line-height: 16px;
  word-wrap: break-word;
`;

return (
  <Container>
    <Image
      src={
        props.imageUrl ? props.imageUrl : "https://placehold.co/600x400?text=."
      }
    />
    <TextContainer>
      <Title>{title}</Title>
      <Description>{descreption}</Description>
    </TextContainer>
    <ProgressBarContainer>
      <Widget
        src={"devdan.near/widget/progress-bar-draft"}
        props={progressBarProps}
      />
    </ProgressBarContainer>
    <IconContainer>
      {props.danatorsCount && (
        <RoundIcon>
          <IconText>{props.donatorsCount}</IconText>
        </RoundIcon>
      )}
      {props.firstAvatorImageUrl && (
        <SmallImage src={props.firstAvatorImageUrl} />
      )}
      {props.secondAvatorImageUrl && (
        <AnotherImage src={props.secondAvatorImageUrl} />
      )}
    </IconContainer>
    <DonateButton>
      <DonateText>Donate</DonateText>
    </DonateButton>
  </Container>
);
