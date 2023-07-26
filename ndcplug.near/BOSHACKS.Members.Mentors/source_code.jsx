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
    {false && <h1>Mentors</h1>}
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
