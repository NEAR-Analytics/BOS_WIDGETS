const pixelFont = fetch(
  "https://fonts.googleapis.com/css?family=Press+Start+2P"
).body;

const GameDescription = () => {
  const DescriptionContainer = styled.div`
  font-family: "Pixel Emulator", "Press Start 2P", "Courier new", "monospace";
  ${pixelFont}
  background: rgb(14, 14, 30);
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  `;

  const Title = styled.h3`
    text-align: center;
  `;

  const Description = styled.p`
  `;
  return (
    <DescriptionContainer className="col">
      <Title>{props.title}</Title>
      <Description>{props.description}</Description>
    </DescriptionContainer>
  );
};

return (
  <>
    <GameDescription />
  </>
);
