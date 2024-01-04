const HeroText = styled.div`
    max-width: 800px;
    font-size: 36px;
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
    height: auto;
`;

return (
  <HeroContainer>
    <HeroText>
      <h1 style={{ fontSize: "60px" }}>{props.heroHeading}</h1>
      <p>{props.heroText}</p>
      <a href="#" class="cta-button">
        Call to Action
      </a>
    </HeroText>
    <HeroImage src={props.image} />
  </HeroContainer>
);
