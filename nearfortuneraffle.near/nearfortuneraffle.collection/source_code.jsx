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

const defaultnft =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588097/rafflestore/defaultnft_hrzyyp.jpg";

const limit = 50;
const offset = 0;

const data = fetch("https://graph.mintbase.xyz/mainnet", {
  method: "POST",
  headers: {
    "mb-api-key": "omni-site",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
          query MyQuery {
            mb_views_nft_tokens(
                limit: ${limit},
                offset: ${offset}
            where: {
          _or: [
            
            
            {nft_contract_id: {_eq: "mint.sharddog.near"}},
             {nft_contract_id: {_eq: "nft.genadrop.near"}},
           
          ]
        }
              order_by: {minted_timestamp: desc}
            ) {
              media
              owner
              title
              metadata_id
              token_id
            }
          }
        `,
  }),
});

State.init({ raffleData: {} });

console.log(data.body.data.mb_views_nft_tokens);

const nftData = [
  {
    id: 1,
    name: "SharDog Raffles",
    image: dog,
    nft: data.body.data.mb_views_nft_tokens,
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

State.init({
  selectedRaffle: undefined,
  selectedTitle: "",
  filteredRaffleData: [],
});

State.init({ nftStatus: "open" });

const handleRaffleClick = (raffleId, title) => {
  State.update({ selectedRaffle: raffleId, selectedTitle: title });

  const filteredData = data.body.data.mb_views_nft_tokens.filter(
    (item) => (item.title.includes = "comic")
  );

  console.log(filteredData);
  State.update({ filteredRaffleData: filteredData });
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

const RaffleMain = styled.h1`
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

const RaffleContent = styled.div`
display: flex;
flex-direction: column;
width: 22%;
margin-bottom: 4rem;
@media screen and (max-width: 768px){
 width: 100%;
}
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

const NewRaffleBtn = styled.button`
  color: white;
  padding: 1.2rem 1.5rem;
  cursor: pointer;
  border-width: 1px;
  border-radius: 0.75rem;
  background: #003C8C;
  font-size: 1rem;
`;

const ClosedRaffleBtn = styled.button`
  color: #000;
  padding: 1.2rem 1.5rem;
  cursor: pointer;
  border-radius: 0.75rem;
   font-size: 1rem;
`;

const RaffleListContainer = styled.div`
 text-align: center;
 display: flex;
 justify-content: center;
 flex-direction: column;

`;

const RaffleList = styled.div`
 display: flex;
 width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
`;

const RaffleListItem = styled.div`
display: flex;
width: 20%;
margin: 1rem 0;
border-radius: 1rem;
border: 1px solid #e5e7eb;
flex-direction: column;
overflow: hidden;
 transition: transform 0.3s ease-in-out;
   &:hover {
    transform: scale(1.1);
  }
@media screen and (max-width: 768px){
 width: 100%;
}
 
`;

const RaffleListImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  margin: 0;
  padding: 0;
`;
const RaffleBtnGroup = styled.div`
 text-align: center;
 margin-bottom: 1rem;
`;

const NftListContent = styled.div`
 
`;

const NftTitle = styled.h3`
 font-weight: 700;
font-size: 0.8rem;
margin-top: 15px;
`;
const NftName = styled.h3`
font-size: 0.8rem;
`;

const NfttBtn = styled.a`
 color: white;
 background: #003C8C;
 font-weight: 700;
 font-size: 12px;
 padding: 0.25rem 1rem;
 border: 1px solid #e5e7eb;
 cursor: pointer;
 border-radius: 0.5rem;
 margin: auto;
 width: 40%;
 text-decoration: none;
 &:hover {
   text-decoration: none;
  }
`;

const RaffleStatus = styled.h6`
 font-weight: 700;
 font-size: 0.8rem;
`;

const NftRaffleUnits = styled.div`
 font-size: 6px;
 margin-bottom: 15px;
`;

const MoreBtn = styled.button`
background: #003C8C;
color: #fff;
padding: 0.5rem 0;
border: none;
border-radius: 0.75rem;
text-align: center;
width: 6rem;
cursor: pointer;
font-size: 1rem;
margin: 0 auto;
`;

return (
  <>
    <Collection>
      <RaffleMain>
        {nftData.map((raffle) => (
          <RaffleContent key={raffle.id}>
            <RaffleTitle>{raffle.name}</RaffleTitle>
            <StyledImage
              onClick={() => handleRaffleClick(raffle.id, raffle.name)}
              src={raffle.image}
              alt={raffle.name}
            />
          </RaffleContent>
        ))}
      </RaffleMain>

      <RaffleListContainer>
        <RaffleName>{state.selectedTitle || nftData[0].name}</RaffleName>
        <RaffleBtnGroup>
          <NewRaffleBtn onClick={() => State.update({ nftStatus: "open" })}>
            New Raffles
          </NewRaffleBtn>
          <ClosedRaffleBtn onClick={() => State.update({ nftStatus: "close" })}>
            Closed Raffles
          </ClosedRaffleBtn>
        </RaffleBtnGroup>

        {state.selectedRaffle ? (
          <RaffleList>
            {nftData[state.selectedRaffle - 1].nft.map((nft, index) => (
              <RaffleListItem key={index}>
                <RaffleListImg src={nft.media} alt={nft.name} />
                <NftTitle>{nft.title}</NftTitle>
                <NftName>{nft.name}</NftName>
                <NfttBtn>
                  <a href="https://nearfortune.netlify.app/raffle">Enter</a>
                </NfttBtn>
                <RaffleStatus>{nft.status}</RaffleStatus>
                <NftRaffleUnits>Units: {nft.unit}</NftRaffleUnits>
              </RaffleListItem>
            ))}
          </RaffleList>
        ) : (
          <RaffleList>
            {nftData[0].nft.map((nft, index) => (
              <RaffleListItem key={index}>
                <RaffleListImg src={nft.media} alt={nft.name} />
                <NftTitle>{nft.title}</NftTitle>
                <NftName>{nft.name}</NftName>
                <NfttBtn href="https://nearfortune.netlify.app/raffle">
                  Enter
                </NfttBtn>
                <RaffleStatus>{nft.status}</RaffleStatus>
                <NftRaffleUnits>Units: {nft.unit}</NftRaffleUnits>
              </RaffleListItem>
            ))}
          </RaffleList>
        )}

        <MoreBtn>More</MoreBtn>
      </RaffleListContainer>
    </Collection>
  </>
);
