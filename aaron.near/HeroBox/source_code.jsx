const HeroText = styled.div`
    max-width: 800px;
    font-size: 36px;
    text-align: left;
    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

const HeroContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 20px;
    background-color: #ffffff;

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
    }
`;

const HeroImage = styled.img`
    max-width: 100%;
    max-height: 450px;
    height: auto;
`;

const Button = styled.a`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  background: #161615;
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid #e9ecef;
  gap: 8px;
  display: inline-flex;
  text-align: center;
  color: #FFFFFF;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;

  &:hover {
    text-decoration: none;
    cursor: ${props.disabled ? "not-allowed" : "pointer"};
  }
`;

return (
  <HeroContainer>
    <HeroText>
      <h1 style={{ fontSize: "60px" }}>{props.heroHeading}</h1>
      <p>{props.heroText}</p>
      <Button
        onClick={(e) => {
          if (props.disabled) {
            e.preventDefault();
            return;
          }
          if (props.onClick) {
            props.onClick(e);
          }
        }}
        disabled={props.disabled}
        style={{ ...props.style }}
      >
        {props.buttonText}
      </Button>
    </HeroText>
    <HeroImage src={props.image} />
  </HeroContainer>
);
