const Colored = styled.div`
  width: 0;
  background: ${props.color};
  animation: 1s in-out forwards;
  height: 100%;
  position: absolute;
  left: 0;

  @keyframes in-out {
    0% {
      width: 0;
    }
    100% {
      width: ${props.width}%;
    }
  }
`;

return <Colored />;
