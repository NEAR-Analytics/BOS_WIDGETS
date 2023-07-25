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
    image: "",
    name: "Kendall Cole",
    org: "Proximity Labs",
    accountId: "",
  },
  {
    image: "",
    name: "Tiffany Gao",
    org: "Pagoda",
    accountId: "",
  },
  {
    image: "",
    name: "Josh Ford",
    org: "Pagoda",
    accountId: "",
  },
  {
    image: "",
    name: "Damian Parrino",
    org: "Pagoda",
    accountId: "",
  },
  {
    image: "",
    name: "Gautham Ravi",
    org: "Pagoda",
    accountId: "",
  },
  {
    image: "",
    name: "Samuel Henriquez",
    org: "Urbit Foundation",
    accountId: "",
  },
  {
    image: "",
    name: "Code Web3 Plug",
    org: "The Crypto Streets",
    accountId: "",
  },
  {
    image: "",
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
  <Container>
    {judges.map((judge) => (
      <Container>
        <a
          href={`#/near/widget/ProfilePage?accountId=${judge.accountId}`}
          target="_blank"
        >
          <img src={judge.image} alt={judge.name} />
          <h3>{judge.name}</h3>
        </a>
        <p>{judge.org}</p>
      </Container>
    ))}
  </Container>
);
