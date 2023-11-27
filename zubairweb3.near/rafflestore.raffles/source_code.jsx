const first =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588104/rafflestore/arm_ztddgz.jpg";
const second =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588104/rafflestore/second_kyzzas.png";
const third =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588122/rafflestore/third_kfbwtw.jpg";
const fourth =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588111/rafflestore/fourth_rjhmaz.png";
const fifth =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588106/rafflestore/fifth_ezz3ox.jpg";
const sixth =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588106/rafflestore/sixth_ulpy9d.png";
const seven =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588102/rafflestore/seven_c7elf0.jpg";
const eight =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588097/rafflestore/eight_i2lrlt.jpg";
const close =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588097/rafflestore/closenft_slzdzg.jpg";

const newspaper =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588107/rafflestore/newspaper_kf09vu.png";
const event =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588117/rafflestore/event_tq6dhm.png";

const hat =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588114/rafflestore/hat_szxoc2.png";
const dog =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588097/rafflestore/dog_f1ptbq.png";

const nftData = [
  {
    id: 1,
    name: "SharDog Raffles",
    image: dog,
    nft: [
      {
        title: "SharDog Raffle",
        name: "META-TK #1",
        status: "open",
        unit: 2,
        image: first,
      },
      {
        title: "SharDog Raffle",
        name: "META-TK #2",
        status: "open",
        unit: 2,
        image: second,
      },
      {
        title: "SharDog Raffle",
        name: "META-TK #3",
        status: "open",
        unit: 2,
        image: third,
      },
      {
        title: "SharDog Raffle",
        name: "META-TK #4",
        status: "open",
        unit: 2,
        image: fourth,
      },
      {
        title: "SharDog Raffle",
        name: "META-TK #5",
        status: "open",
        unit: 2,
        image: fifth,
      },
      {
        title: "SharDog Raffle",
        name: "META-TK #6",
        status: "open",
        unit: 2,
        image: sixth,
      },
      {
        title: "SharDog Raffle",
        name: "META-TK #7",
        status: "open",
        unit: 2,
        image: seven,
      },
      {
        title: "SharDog Raffle",
        name: "META-TK #8",
        status: "open",
        unit: 2,
        image: eight,
      },
      {
        title: "SharDog Raffle",
        name: "META-TK #9",
        status: "close",
        unit: 2,
        image: close,
      },
    ],
  },
  {
    id: 2,
    name: "NearWeek Raffles",
    image: newspaper,
    nft: [
      {
        name: "Default",
        status: "open",
        unit: 2,
        image: defaultnft,
      },
      {
        name: "Default",
        status: "open",
        unit: 2,
        image: defaultnft,
      },
      {
        name: "Default",
        status: "open",
        unit: 2,
        image: defaultnft,
      },
      {
        name: "Default",
        status: "open",
        unit: 2,
        image: defaultnft,
      },
      {
        name: "Default",
        status: "open",
        unit: 2,
        image: defaultnft,
      },
    ],
  },
  {
    id: 3,
    name: "Community Rafflest",
    image: event,
    nft: [
      {
        name: "Default",
        status: "open",
        unit: 2,
        image: defaultnft,
      },
      {
        name: "Default",
        status: "open",
        unit: 2,
        image: defaultnft,
      },
      {
        name: "Default",
        status: "open",
        unit: 2,
        image: defaultnft,
      },
      {
        name: "Default",
        status: "open",
        unit: 2,
        image: defaultnft,
      },
      {
        name: "Default",
        status: "open",
        unit: 2,
        image: defaultnft,
      },
    ],
  },
  {
    id: 4,
    name: "El Café Cartel Raffles",
    image: hat,
    nft: [
      {
        name: "Default",
        status: "open",
        unit: 2,
        image: defaultnft,
      },
      {
        name: "Default",
        status: "open",
        unit: 2,
        image: defaultnft,
      },
      {
        name: "Default",
        status: "open",
        unit: 2,
        image: defaultnft,
      },
      {
        name: "Default",
        status: "open",
        unit: 2,
        image: defaultnft,
      },
      {
        name: "Default",
        status: "open",
        unit: 2,
        image: defaultnft,
      },
    ],
  },
];

State.init({ selectedRaffle: undefined });

const handleRaffleClick = (raffleId) => {
  State.update({ selectedRaffle: raffleId });
};

const Heading = styled.h1`
color: green;
text-align: center;
font-size: 3em;
`;

const Collection = styled.h1`
max-width: 80%;
margin: 5rem auto;
`;

const Raffles = styled.h1`
display: flex;
gap: 0.5rem;
justify-content: space-between;
align-items: center;
width: 100%;
@media screen and (max-width: 768px){
  flex-direction: column;
  margin-bottom: 20px;
  gap: 0;
}
`;

const raffleContent = styled.div`
display: flex;
flex-direction: column;
width: 22%;
margin-bottom: 4rem;
 transition: transform 0.3s ease-in-out;
   &:hover {
    transform: scale(1.1);
  }
`;

const RaffleTitle = styled.h3`
font-size: 1.1rem;
margin-bottom: 1rem;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  margin: 0;
  padding: 0;
`;

const RaffleName = styled.h1`
font-weight: 700;
font-size: 36px;
margin-bottom: 1.5rem;
text-align: center;

`;
console.log(nftData);

return (
  <>
    <Collection>
      <Raffles>
        {nftData.map((raffle) => (
          <raffleContent key={raffle.id}>
            <RaffleTitle>{raffle.name}</RaffleTitle>
            <StyledImage
              onClick={() => handleRaffleClick(raffle.id)}
              src={raffle.image}
              alt={raffle.name}
            />
          </raffleContent>
        ))}
      </Raffles>

      <RaffleName>
        {nftData[state.selectedRaffle].name || nftData[0].name}
      </RaffleName>

      {(state.selectedRaffle !== null) &
        (state.selectedRaffle !== undefined) && (
        <div>
          <ul>
            {nftData[state.selectedRaffle - 1].nft.map((nft, index) => (
              <li key={index}>
                <img src={nft.image} alt={nft.name} />
                <p>{nft.name}</p>
                <p>Status: {nft.status}</p>
                <p>Units: {nft.unit}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Collection>
  </>
);
