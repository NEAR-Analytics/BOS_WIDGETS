/**Add place to check out current bounties */
const Section = styled.div`
  display: flex;
  width: 100%;
  padding: 3.125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 3rem;

  & > div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;

    & > h2 {
      display: flex;
      flex-direction: column;
      color: var(--black, #000);
      font-size: 2rem;
      font-weight: 500;
    }

    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
  }
`;

const Logos = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  gap: 3rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }

  & > a > img {
    width: 100%;
    object-fit: contain;
  }
`;


const sponsors = [
  {
    url: "https://neardevhub.org",
    name: "NEAR DevHub",
    image:
      "https://ipfs.near.social/ipfs/bafkreid4hwxj7krtddzda53hwpekqmamlkqev46ghf337b27wmghdzpocy",
  },
  {
    url: "https://creativesdao.org",
    name: "CreativesDAO",
    image:
      "https://ipfs.near.social/ipfs/bafkreibb4m4rszlhf46wgob25lhpuxgfbjpc23swd4qne5e6y7eccinkge",
  },
  {
    url: "https://osec.io",
    name: "Ottersec",
    image:
      "https://pbs.twimg.com/profile_images/1628618156611870720/3dq8OUcH_400x400.jpg",
  },
  {
    url: "https://genadrop.io",
    name: "GenaDrop",
    image:
      "https://ipfs.near.social/ipfs/bafkreib2sswfwxwwsaaegzhuc454rgkdyycg6dx4gprxgwk5vy6ysrkfpm",
  },
  {
    url: "https://mailchain.xyz",
    name: "Mailchain",
    image:
      "https://ipfs.near.social/ipfs/bafkreicq46boifskg476ln4zz5psijyojixizkhxd6uzeoabdtoutxvoni",
  },
  {
    url: "https://neardc.org",
    name: "NDC GWG",
    image:
      "https://ipfs.near.social/ipfs/bafkreicdzm3aop7qrbzuwinafbf26p7oq3fmjqnwbyz2clvelxglbazjdm",
  },

  {
    url: "https://proofofvibes.com",
    name: "Proof Of Vibes",
    image:
      "https://ipfs.near.social/ipfs/bafkreibmc23xhip63mxv2mulb7xko5htpiqszrch4fo3optszuctjtlrau",
  },
  {
    url: "https://nearefi.org",
    name: "NEAR ReFi",
    image:
      "https://ipfs.io/ipfs/bafkreibg5iyag6xaqi7xrmizqqx4uuvro7fnaw3ulnqkhltwivmwqmqxhu",
  },
  {
    url: "https://indexer.xyz",
    name: "Indexer.xyz",
    image:
      "https://ipfs.near.social/ipfs/bafkreifkghgzfygpha2ylolki5mhsbfir4hrhnv27kjyw4tqa3lyshrqnm",
  },
];



  // {
  //   url: "https://nearweek.com",
  //   name: "NEARWEEK",
  //   image:
  //     "https://ipfs.near.social/ipfs/bafkreifkghgzfygpha2ylolki5mhsbfir4hrhnv27kjyw4tqa3lyshrqnm",
  // },
];

return (
  <>
    <Section>
      <div>
        <h2>Sponsors</h2>
        <Widget
          src={`ndcplug.near/widget/BOSHACKS.Home.Button`}
          props={{
            text: "💰 See Bounties",
            href: "http://nearbuilders.com/bounty",
          }}
        />
      </div>
      <Logos>
        {sponsors.map((sponsor) => (
          <a href={sponsor.url} target="blank">
            <img src={sponsor.image} />
          </a>
        ))}
      </Logos>
    </Section>
  </>
);
