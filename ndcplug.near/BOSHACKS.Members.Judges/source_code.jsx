const ownerId = "ndcplug.near";

const Container = styled.div`
  display: flex;
  padding: 3.125rem 3.25rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  font: arial;

  & > div {
    width: 25%;
  }

  @media screen and (max-width: 768px) {
    & > div {
      width: 100%;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    & > div {
      width: 50%;
    }
  }
`;

const judges = [
  {
    image:
      "https://ipfs.near.social/ipfs/bafkreihqiwouklh6qwvsino2hzvh5g5gakit3wwmqkq7b6yjaus3yqaeui",
    name: "Kendall Cole",
    org: "Co-Founder Proximity Labs",
    accountId: "",
  },
  // {
  //   image:
  //     "https://ipfs.near.social/ipfs/bafkreifmj6kdalupps7henvxaivzeokjjxq7rgmfkthxv5w6ikuxfqe3oa",
  //   name: "Tiffany Gao",
  //   org: "Product @ Pagoda",
  //   accountId: "tiffany.near",
  // },
  // {
  //   image:
  //     "https://ipfs.near.social/ipfs/bafkreic7einkd37nctfqnphe6outp3p2dqlkf7lgozujcmecxggeqjuo7m",
  //   name: "Josh Ford",
  //   org: "DevEx @ Pagoda",
  //   accountId: "joshua.near",
  // },
  // {
  //   image:
  //     "https://ipfs.near.social/ipfs/bafkreid6oubaatprc764rdgtdzqczcohpj3ilugznxzjz2jsupnobz3uae",
  //   name: "Damian Parrino",
  //   org: "Pagoda",
  //   accountId: "",
  // },
  {
    image:
      "https://ipfs.near.social/ipfs/bafkreies4jyoz6oovc6ufjk5fs3m3shjexzymrdcsrb3p22uwzmwqcydmu",
    name: "Gautham Ravi",
    org: "Pagoda",
    accountId: "root.near",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafkreigla4huhv2flyu5jyjemtf3fa6lhu5vnpixnrszhw3346ihofaefm",
    name: "Evgeny Kuzyakov",
    org: "Founder @ NEAR.Social",
    accountId: "mob.near",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafkreicahodss6wyvssxbiewergh2ewk6wsnsvqftaktjbff6mcbtp6g3e",
    name: "Alan Estrada",
    org: "Open Web Academy",
    accountId: "alan777.near",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafkreig3ikeylk2xb3qhjm73hg33zaagqyjavonepcf2x5m3hqwjtfz6ou",
    name: "Yair Nava",
    org: "Open Web Academy",
    accountId: "yairnava.near",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafkreidtsghfvilu5zvz6jkyeaulhe7bdpowunp7cdw3cfgwuvct74y6g4",
    name: "Samuel Henriquez",
    org: "Urbit Foundation",
    accountId: "",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafkreigxnzkbaal7c3gaxqga6tslcssteekj5gu75hmi6z6635m6e4i7k4",
    name: "Web3Plug",
    org: "The Crypto Streets",
    accountId: "ndcplug.near",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafkreiawtewwoi2msc7bmelnplu4wwewxsjf2acbfw7777ayddtzxnieuu",
    name: "James Waugh",
    org: "Build DAO",
    accountId: "james.near",
  },
];

// maybe get social profile image for each

const ContainerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.25em 1.25em 1.5em;
  gap: 0.625em;
  background: #ffffff;
  border-radius: 16px;
  font: arial;

  h3 {
    color: var(--black, #000);
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.5rem;
  }

  p {
    color: var(--blue, #6393F8);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
  }

   img {
    width: 100%;
    border-radius: 10px;
  }

  &:hover,
  &:visited,
  &:active {
    text-decoration: none;
  }
`;

return (
  <>
    {false && <h1>Judges</h1>}
    <Container>
      {judges.map((judge) => (
        <ContainerCard>
          <a
            href={`#/near/widget/ProfilePage?accountId=${judge.accountId}`}
            target="_blank"
          >
            <img src={judge.image} alt={judge.name} />
            <h3>{judge.name}</h3>
          </a>
          <p>{judge.org}</p>
        </ContainerCard>
      ))}
    </Container>
  </>
);
