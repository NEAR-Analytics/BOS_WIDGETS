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
];
const sponsors = [
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

const partners = [
  {
    url: "https://shard.dog/go",
    name: "ShardDog",
    image:
      "https://ipfs.near.social/ipfs/bafkreibh4jzae37fo6cpvasg7e6qxfmxjuku5mi3lfow4tni2why632gei",
  },
  {
    url: "https://marmaj.org/",
    name: "MarmaJ",
    image:
      "https://pbs.twimg.com/profile_images/1621907418467663877/JcB4OAXp_400x400.jpg",
  },
  {
    url: "https://nearpad.dev",
    name: "Jutsu",
    image:
      "https://ipfs.near.social/ipfs/bafkreidzmgel7mlhidphpbxhcsxol2lj6u6rd2kfcw5rqd2wyemthjffdi",
  },
  {
    url: "https://twitter.com/NEAR_Toronto",
    name: "NEAR Toronto",
    image:
      "https://pbs.twimg.com/profile_images/1658115879584911362/cLLS-pig_400x400.jpg",
  },

  {
    url: "https://wuipod.transistor.fm/",
    name: "Wuipod",
    image:
      "  https://ipfs.near.social/ipfs/bafybeib7z5q7rn4uwtelo36r4yp2exspih6cbv66velvpk3o77a3epz3fq",
  },
  {
    url: "https://popula.io",
    name: "Popula",
    image:
      "https://ipfs.near.social/ipfs/bafkreigco2l2zqlehfdmytd6cm3u3v2xc447x3qu3twrcjlo56qeqxvkbu",
  },

  {
    url: "https://near.foundation",
    name: "NEAR Foundation",
    image:
      "https://pbs.twimg.com/profile_images/1509554611841114124/ma08E72p_400x400.jpg",
  },
  {
    url: "https://minorityprogrammers.org",
    name: "Minority Programmers",
    image:
      "https://ipfs.near.social/ipfs/bafkreibmrhijv6etdsbvs4na5cndpge5nbjm2fflcldtpvscesdk2e2pt4",
  },
  {
    url: "https://nearnyc.org",
    name: "NEAR NYC",
    image:
      "https://pbs.twimg.com/profile_images/1535356873846755329/8K3CE_86_400x400.jpg",
  },
  {
    url: "https://nearsf.org",
    name: "NEAR SF",
    image:
      "https://ipfs.near.social/ipfs/bafkreicxkl63msjcqn37ooqq6wxz5xrjwralwtraldcj2e3tmhgftsu4fm",
  },
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
    <Section>
      <div>
        <Widget
          src={`ndcplug.near/widget/BOSHACKS.Home.Button`}
          props={{
            text: "🤝 Become a Sponsor/Partner",
            href: "http://nearbuilders.com/sponsor",
          }}
        />
        <h2>Community Partners</h2>
      </div>
      <Logos>
        {partners.map((partner) => (
          <a href={partner.url} target="blank">
            <img src={partner.image} />
          </a>
        ))}
      </Logos>
    </Section>
    <Section>
      <div>
        <h2>Judges & Mentors From</h2>
        <Widget
          src={`ndcplug.near/widget/BOSHACKS.Home.Button`}
          props={{
            text: "🧑🏿‍🏫 See Mentors + Judges",
            href: "http://nearbuilders.com/people",
          }}
        />
      </div>
      <Logos>
        {judges.map((judge) => (
          <a href={judge.url} target="blank">
            <img src={judge.image} />
          </a>
        ))}
      </Logos>
    </Section>
  </>
);
