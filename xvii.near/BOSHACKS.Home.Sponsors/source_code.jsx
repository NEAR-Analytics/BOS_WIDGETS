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
const judges = [
  {
    url: "https://pagoda.co",
    name: "Pagoda",
    image:
      "https://pbs.twimg.com/profile_images/1678452492739424257/kIn26g06_400x400.jpg",
  },
  {
    url: "https://urbit.org/",
    name: "Urbit",
    image:
      "https://pbs.twimg.com/profile_images/1571956374019637248/DNQHBb86_400x400.jpg",
  },

  {
    url: "https://proximity.dev",
    name: "Proximity Labs",
    image:
      "https://ipfs.near.social/ipfs/bafkreibvv4ivrm72zrvuu4w7oev5zncks372k2eoud6os2ldxcf7qjcjyy",
  },
  {
    url: "https://banyan.gg",
    name: "Banyan Collective",
    image:
      "https://pbs.twimg.com/profile_images/1594723683062484993/d8aDzWMN_400x400.jpg",
  },
  {
    url: "https://ow.academy/",
    name: "Open Web Academy",
    image:
      "https://ipfs.near.social/ipfs/bafkreidaqjryugkdvmwiereey7rc6zwix3bausjsvjxujbfsovkmbjnnwa",
  },
  {
    url: "https://neardevhub.org/",
    name: "NEAR DevHub",
    image:
      "https://ipfs.near.social/ipfs/bafkreid4hwxj7krtddzda53hwpekqmamlkqev46ghf337b27wmghdzpocy",
  },
  {
    url: "https://near.foundation",
    name: "NEAR Foundation",
    image:
      "https://pbs.twimg.com/profile_images/1509554611841114124/ma08E72p_400x400.jpg",
  },

  {
    url: "https://near.org/#/devgovgigs.near/widget/gigs-board.pages.community.activity?handle=akaia",
    name: "Akaia DAO",
    image:
      "https://ipfs.near.social/ipfs/bafkreie6yimk4of3amrxsswue7gnhtodxe5ziilxqa7raepaglr4uvvzv4",
  },
  {
    url: "https://mintbase.xyz",
    name: "Mintbase",
    image:
      "https://ipfs.near.social/ipfs/bafkreibldlfof5iskk7rjdd327mml3mquqn4bssmy2yyeg7elbiqwhsjlm",
  },
  {
    url: "https://keypom.xyz",
    name: "Keypom",
    image:
      "https://ipfs.near.social/ipfs/bafybeiacxpryfxmpy5s257kxvli3myumwlffyoxi4pcpfcia6oam55uylm",
  },
  {
    url: "https://www.metaweb.vc/",
    name: "MetaWeb Ventures",
    image:
      "https://ipfs.near.social/ipfs/bafkreicvclt6x75y7vi6z4rifaqlk4ufz2ftbdzc45l2f22pfjfbrtcfdm",
  },
  {
    url: "https://near.org/horizon",
    name: "NEAR Horizon",
    image:
      "https://ipfs.near.social/ipfs/bafkreihszpflge5j3g35td67xh7fw5z37rgyumh75uzabqrfnpcjfag2we",
  },
  {
    url: "https://metapool.app",
    name: "Meta Pool",
    image:
      "https://ipfs.near.social/ipfs/bafkreigfcftswq4eyvw4miwt5dncb6gnrvrw3gbxgciwugdf4iwghfctwm",
  },
  {
    url: "https://linktr.ee/nearvietnamhub",
    name: "NEAR Vietnam",
    image:
      "https://ipfs.near.social/ipfs/bafkreiaka3spk3f6bizas4472g52tl4v6ms3oykrkzso7uagjqlmd35fy4",
  },
  {
    url: "https://nearhub.club",
    name: "NEARHub",
    image:
      "https://ipfs.near.social/ipfs/bafkreigll53omi7xolt7lhujid4lzxvz6vjuxxqulosftigvhcz46s4x5u",
  },
];

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

return (
  <>
    <Section>
      <div>
        <h2>Bounty Sponsors</h2>
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
    <Section></Section>
    <Section></Section>
  </>
);
