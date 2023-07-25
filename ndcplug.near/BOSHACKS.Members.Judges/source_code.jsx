const ownerId = "ndcplug.near";

const Container = styled.div`
  display: flex;
  padding: 3.125rem 3.25rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;

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
      "https://paras.id/_next/image?url=https%3A%2F%2Fparas-ipfs.paras.id%2Fbeefc56481ea7b4697fd9c04606a1c10b238e4d9&w=3840&q=75",
    name: "Kendall Cole",
    org: "Proximity Labs",
    accountId: "",
  },
  {
    image:
      "https://paras.id/_next/image?url=https%3A%2F%2Fparas-ipfs.paras.id%2Fbeefc56481ea7b4697fd9c04606a1c10b238e4d9&w=3840&q=75",
    name: "Tiffany Gao",
    org: "Pagoda",
    accountId: "tiffany.near",
  },
  {
    image:
      "https://paras.id/_next/image?url=https%3A%2F%2Fparas-ipfs.paras.id%2Fbeefc56481ea7b4697fd9c04606a1c10b238e4d9&w=3840&q=75",
    name: "Josh Ford",
    org: "Pagoda",
    accountId: "joshua.near",
  },
  {
    image:
      "https://paras.id/_next/image?url=https%3A%2F%2Fparas-ipfs.paras.id%2Fbeefc56481ea7b4697fd9c04606a1c10b238e4d9&w=3840&q=75",
    name: "Damian Parrino",
    org: "Pagoda",
    accountId: "",
  },
  {
    image:
      "https://paras.id/_next/image?url=https%3A%2F%2Fparas-ipfs.paras.id%2Fbeefc56481ea7b4697fd9c04606a1c10b238e4d9&w=3840&q=75",
    name: "Gautham Ravi",
    org: "Pagoda",
    accountId: "root.near",
  },
  {
    image:
      "https://paras.id/_next/image?url=https%3A%2F%2Fparas-ipfs.paras.id%2Fbeefc56481ea7b4697fd9c04606a1c10b238e4d9&w=3840&q=75",
    name: "Samuel Henriquez",
    org: "Urbit Foundation",
    accountId: "",
  },
  {
    image:
      "https://paras.id/_next/image?url=https%3A%2F%2Fparas-ipfs.paras.id%2Fbeefc56481ea7b4697fd9c04606a1c10b238e4d9&w=3840&q=75",
    name: "Web3Plug",
    org: "The Crypto Streets",
    accountId: "ndcplug.near",
  },
  {
    image:
      "https://paras.id/_next/image?url=https%3A%2F%2Fparas-ipfs.paras.id%2Fbeefc56481ea7b4697fd9c04606a1c10b238e4d9&w=3840&q=75",
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

  h3 {
    color: var(--black, #000);
    font-size: 1.3rem;
    font-family: FK Grotesk;
    font-style: normal;
    font-weight: 700;
    line-height: 2.5rem;
  }

  p {
    color: var(--green, #00ec97);
    font-size: 0.875rem;
    font-family: Mona Sans;
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
    <h1>Judges</h1>
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
