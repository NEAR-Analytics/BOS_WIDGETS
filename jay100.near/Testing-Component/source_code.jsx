const pixelFont = fetch(
  "https://fonts.googleapis.com/css?family=Press+Start+2P"
).body;

const Carouselv2 = async () => {
  State.init({
    image_index: 0,
  });

  const slide_data = [
    {
      img_url:
        "https://user-images.githubusercontent.com/100770363/241330819-010617e4-b2b3-4d34-a59c-c1b58bf92d8d.png",
      title: "The Basics",
    },
    {
      img_url:
        "https://user-images.githubusercontent.com/100770363/241331374-56bd3f0c-7ed3-4923-bd48-4aac7367b280.png",
      title: "Main Menu",
      description:
        "From the main menu, you can see all of the main things you can do in the game. Battle, Mint Unit, Check the Leaderboard, Check Active Rooms, and the market. On the right hand side of your image, this is where the troops that you own will be displayed.",
    },
    {
      img_url:
        "https://user-images.githubusercontent.com/100770363/241335354-eaf25884-de02-4d7a-a8f2-3c4e59214d5f.png",
      title: "Battles",
      description:
        "This is what you'll see when you select battle. You will have the option to create a new challenge, or fight against someone's challenge. These matches are best 2 out of 3",
    },
    {
      img_url:
        "https://user-images.githubusercontent.com/100770363/241335498-727bf24d-a65c-4bff-b404-8bcadc558512.png",
      description:
        "This is the challenge you chose to accept. As you can see the opponent already set the field for the first round, and it is your job to assemble your own side so that you can attempt to take the first round.",
    },
    {
      img_url:
        "https://user-images.githubusercontent.com/100770363/241335871-e9c8e5fe-db38-4ada-b1ff-7d895e61f44e.png",
      description:
        "Thanks to the cheeky placement of the warlock, You were able to take the first round. From here, you will have to wait for the opponent to respond before you can attack again.",
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
  `;

  const Description = styled.p`
    color: white;
    font-size: 0.8rem;
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
    width: 1.5vw;
    height: 1.5vw;
    border-bottom: 5px solid white;
    border-right: 5px solid white;
    transform: rotate(45deg);
    margin: -10px;
  `;

  const next_slide = async () => {
    State.update({
      image_index: (state.image_index += 1),
    });

    if (state.image_index > slide_data.length - 1) {
      State.update({
        image_index: 0,
      });
    }
  };

  const prev_slide = async () => {
    State.update({
      image_index: (state.image_index -= 1),
    });

    if (state.image_index == 0) {
      State.update({
        image_index: slide_data.length - 1,
      });
    }
  };

  return (
    <div className="d-flex col">
      <CarouselContainer onClick={next_slide}>
        <ArrowLeftContainer>
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
        <ArrowRightContainer>
          <Arrow></Arrow>
        </ArrowRightContainer>
      </CarouselContainer>
    </div>
  );
};

return (
  <>
    <Carouselv2 />
  </>
);
