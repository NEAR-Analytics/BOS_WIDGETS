const pixelFont = fetch(
  "https://fonts.googleapis.com/css?family=Press+Start+2P"
).body;

const Carousel = async () => {
  State.init({
    image_index: 0,
    auto: false,
  });

  const slide_data = props;

  const CarouselContainer = styled.div`
    @keyframes fade {
      from {opacity: .8}
      to {opacity: 1}
    }
    animation: fade 1.5s;
    width: 100%;
    height: 100%%;
    background-color: #0e0e1e;
    display: flex;
    align-items: center;
    font-family: "Pixel Emulator", "Press Start 2P", "Courier new", "monospace";
    ${pixelFont}
    padding: 1rem;
    transition: all 1.5s ease;
  `;

  const ImageContainer = styled.img`
    margin: 1rem;
    width: 75%;
  `;

  const Title = styled.h5`
    color: white;
    text-align: center;
  `;

  const Description = styled.p`
    color: white;
    font-size: 0.8rem;
    text-align: center;
  `;

  const ArrowLeftContainer = styled.div`
    transform: translate(-50%, -50%);
    transform: rotate(90deg);
    cursor: pointer;
    `;

  const ArrowRightContainer = styled.div`
    transform: translate(-50%, -50%);
    transform: rotate(-90deg);
    cursor: pointer;
    `;

  const Arrow = styled.span`
      display: block;
    width: 2vw;
    height: 2vw;
    border-bottom: 5px solid white;
    border-right: 5px solid white;
    transform: rotate(45deg);
    margin: -5px;
  `;

  const next_slide = async () => {
    State.update({
      image_index: (state.image_index += 1),
      auto: false,
    });

    if (state.image_index > slide_data.length - 1) {
      State.update({
        image_index: 0,
        auto: false,
      });
    }
  };

  const prev_slide = async () => {
    State.update({
      image_index: (state.image_index -= 1),
      auto: false,
    });

    if (state.image_index < 0) {
      State.update({
        image_index: slide_data.length - 1,
        auto: false,
      });
    }
  };

  const auto_slide = async () => {
    console.log("triggered!!");
    State.update({
      image_index: (state.image_index += 1),
      auto: true,
    });

    if (state.image_index > slide_data.length - 1) {
      State.update({
        image_index: 0,
      });
    }

    if (state.auto === true) {
      setInterval(() => {
        auto_slide();
      }, 10000);
    }
  };

  return (
    <div className="d-flex col">
      <CarouselContainer>
        <ArrowLeftContainer onClick={prev_slide}>
          <Arrow></Arrow>
        </ArrowLeftContainer>
        <div
          className="col"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ImageContainer
            className="img-thumbnail"
            src={slide_data[state.image_index].img_url}
          />
          <Title>{slide_data[state.image_index].title}</Title>
          <Description>{slide_data[state.image_index].description}</Description>
        </div>
        <ArrowRightContainer onClick={next_slide}>
          <Arrow></Arrow>
        </ArrowRightContainer>
      </CarouselContainer>
    </div>
  );
};

return (
  <>
    <Carousel />
  </>
);
