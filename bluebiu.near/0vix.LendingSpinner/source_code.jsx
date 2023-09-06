const Spinner = styled.div`
  position: absolute;
  z-index: 8001;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const SpinnerImg = styled.img``;

return (
  <Spinner>
    <SpinnerContainer>
      <SpinnerImg src="https://ipfs.near.social/ipfs/bafkreigxis5i2vafexhyfbafhwfvkebnk7epluyshqrzvkkbixrkkinudu" />
    </SpinnerContainer>
  </Spinner>
);
