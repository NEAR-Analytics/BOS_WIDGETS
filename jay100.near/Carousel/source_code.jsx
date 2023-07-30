const pixelFont = fetch(
  "https://fonts.googleapis.com/css?family=Press+Start+2P"
).body;

const Carousel = async () => {
  State.init({
    image_index: 0,
    auto: false,
  });

  const slide_data = [
    {
      img_url: "https://pd.marmaj.org/pixelparty2.jpg",
      title: "Who made Pixelparty?",
      description:
        "PixelParty was created by a talented team of developers and artists who poured their passion and expertise into bringing this extraordinary NFT Frame showcase to life. The collective efforts of these visionary individuals, fueled by their unwavering dedication and innovative spirit, culminated in the birth of PixelParty, an immersive platform that seamlessly blends technology, art, and creativity to redefine the boundaries of the NFT space.",
    },
    {
      img_url:
        "https://user-images.githubusercontent.com/93423666/238833011-3538bfcb-082f-41bb-8a12-8670735f6b12.png",
      description:
        "Each token you possess grants you the privilege of unleashing your creative prowess on a well designed canvas, carefully measured at 20x20px, affording you the space to weave your artistic vision, imprinting a mesmerizing tapestry of boundless imagination and boundless possibilities.",
    },
    {
      img_url:
        "https://user-images.githubusercontent.com/93423666/238837072-34abe80a-a9c5-4ade-8b52-5cd359c7d723.png",
      description:
        "Should the bounds of a singular 20x20px frame fail to contain your grand vision, fear not, for a world of expansive artistic possibilities beckons. By acquiring multiple interconnected frames, seamlessly merging together in harmonious unity, you transcend the limitations of a confined canvas, creating a vast expanse where your creativity knows no bounds. With each additional frame, your artistic dominion expands, allowing you to fashion a larger, more captivating frame that embodies the magnitude of your imagination, enabling your artistic dreams to unfurl on an awe-inspiring scale that leaves onlookers spellbound in wonderment.",
    },
  ];

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
