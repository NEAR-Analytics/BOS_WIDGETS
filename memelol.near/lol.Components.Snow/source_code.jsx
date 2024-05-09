const Container = styled.div`
  width: 100vw;
  height: 100%;
  position: absolute;
  display: flex;
  overflow: hidden;
  z-index: 1;
`;

const Snowfake = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: -15px;
  left: ${(props) => props.left}vw;

  &:nth-child(4n) {
    filter: blur(1.5px);
  }

  @keyframes snowfall {
    0% {
      transform: translate3d(${(props) => props.start}vw, 0, 0);
    }
    100% {
      transform: translate3d(${(props) => props.end}vw, 100vh, 0);
    }
  }

  animation: snowfall ${(props) => props.snowfall}s linear infinite;
  animation-delay: ${(props) => -props.delay}s;
`;

const Snow = () => (
  <Container>
    {[...Array(70).keys()].map((i) => (
      <Snowfake
        className="snowfake"
        i={i}
        size={parseInt(((Math.random() * 100) / 20) * 3)}
        left={Math.random() * 100}
        start={(Math.random() * 100) / 5 - 10}
        end={(Math.random() * 100) / 5 - 10}
        snowfall={(Math.random() * 100) / 10 + 5}
        delay={(-Math.random() * 100) / 10}
      />
    ))}
  </Container>
);

return { Snow };
