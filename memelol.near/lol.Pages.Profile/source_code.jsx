const { assets, contractName } = props;
const { Navigation } = VM.require(
  `memelol.near/widget/lol.Components.Navigation`,
);

const Container = styled.div`
  width: 100%;
  height: max-content;
  overflow: hidden;

  .buy-token {
    width: 600px;

    &:hover {
      text-decoration: none;
    }

    @media screen and (max-width: 786px) {
      width: 100%;
    }
  }
`;

const Section = styled.div`
  padding: 1rem 3rem;
  border: 3px solid black;
  border-radius: 20px;
  width: 100%;
  background: ${(props) => props.color};
  justify-content: center;

  &.banner-img {
    border-radius: 20px;
    width: 100%;
    background-image: url(${assets.banner});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .wrapper {
    width: 100%;
    flex-direction: row;

    @media screen and (max-width: 786px) {
      width: 100%;
      flex-direction: column;
    }

    .mint-section {
      box-shadow: 0px 20px 30px 0px rgba(0, 0, 0, 0.5);
      width: 100%;
      max-width: 600px;
      background: rgb(255 255 255 / 90%);
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
      border: 3px solid black;
      border-radius: 20px;
      z-index: 2;

      @media screen and (max-width: 786px) {
        max-width: 100%;
      }
    }
  }

  .stat {
    width: 25%;
    margin: 0;
    flex-direction: column;

    @media screen and (max-width: 786px) {
      flex-direction: row;
      margin: 10px;
      justify-content: space-between;
      width: 100%;
    }
  }

  @media screen and (max-width: 786px) {
    padding: 1rem;
  }
`;

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  border-radius: 18px;
  padding: 3rem;
  background-color: ${(props) => props.color};

  @media screen and (max-width: 786px) {
    padding: 2rem;
  }
`;

return (
  <Container className="d-flex flex-column gap-4">
    <Navigation />
    <Section className="p-0 position-relative banner-img">
      <Overlay color="rgb(89 110 255 / 80%)">
        <div className="wrapper d-flex flex-column align-items-center gap-3 justify-content-center">
          <Widget
            src={`memelol.near/widget/lol.Components.MyTradingStats`}
            props={{ contractName }}
          />
        </div>
      </Overlay>
    </Section>
  </Container>
);
