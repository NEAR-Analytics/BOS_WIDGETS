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
        image: seventh,
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
    image: dog,
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
    image: dog,
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
    image: dog,
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

const dog =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588098/rafflestore/dog_osurck.jpg";

State.init({ selectedRaffle: undefined });

const handleRaffleClick = (raffleId) => {
  State.update({ selectedRaffle: raffleId });
  console.log(state.selectedRaffle);
};

const Heading = styled.h1`
color: green;
text-align: center;
font-size: 3em;
`;

console.log(nftData);

return (
  <>
    <div>
      <Heading>NFT DATA</Heading>
    </div>
    <div>
      <ul>
        {nftData.map((raffle) => (
          <li key={raffle.id}>
            <button onClick={() => handleRaffleClick(raffle.id)}>
              {raffle.name}
            </button>
          </li>
        ))}
      </ul>

      {(state.selectedRaffle !== null) &
        (state.selectedRaffle !== undefined) && (
        <div>
          <h2>{nftData[state.selectedRaffle - 1].name}</h2>

          <ul>
            {nftData[state.selectedRaffle - 1].nft.map((nft, index) => (
              <li key={index}>
                <p>{nft.name}</p>
                <p>Status: {nft.status}</p>
                <p>Units: {nft.unit}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </>
);
