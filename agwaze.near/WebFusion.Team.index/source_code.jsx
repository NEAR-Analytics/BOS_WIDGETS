"bafkreief3msh3xc734huv2265hfu6ahohjaf2nwoghfqp4kh4wl77n2z2q";

const Root = styled.div`
    .hero {
        img {
            width: 100%;
        }
    }
    .teams {
      padding: 20px;
      margin: 20px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      gap: 40px;
      .team {
        img {
          width: 244px;
          height: 244px;
        }
        h1 {
          color: var(--apple-com-black, #000);
          font-family: Inter;
          font-size: 24px;
          font-style: normal;
          font-weight: 700;
          margin-bottom: 0;
          line-height: 40px; /* 166.667% */
        }
        span {
          color: var(--nearcon-app-black, #000);
          font-family: Inter;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 21px; /* 150% */
        }
        p {
          color: var(--nearcon-app-black, #000);
          font-family: Inter;
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: 21px; /* 150% */
        }
      }
    }
`;

const members = [
  {
    url: "bafkreid3fjm4p2xw2mwwvnyrmgm2yxwvw2xo5an2opd6fbgyqgy6yxjxza",
    name: "Victor Kanu",
    role: "Developer Relations",
    company: "NEAR DEVHUB",
  },
  {
    url: "bafkreiai3vuakxlmfskp5rbf46ukz56uojfoefvtbhe3ky3dozuar2i4ky",
    name: "Earnest Etim",
    role: "Community Member",
    company: "NEAR AFRICA",
  },
  {
    url: "bafkreico2ac4fq7xyezo3ayowobaba7jiz6i2mbt5bydcgkjrvrdalmhu4",
    name: "Emmy Paul",
    role: "Social Media & Content Writer",
    company: "NEAR AFRICA",
  },
  {
    url: "bafkreieug733lhxsvypjhlxgesbdgp5wq3jinj4wu6xprukprobw26shm4",
    name: "Blessed Ebube",
    role: "Marketing Lead",
    company: "NEAR AFRICA",
  },
  {
    url: "bafkreigryiqgx3yaiiy6fq3x3pw4lxvla3heztqose7hjh3de5xksunvt4",
    name: "Ekemini Umoh",
    role: "Brand Designer",
    company: "NEAR AFRICA",
  },
];

return (
  <Root>
    <div className="hero">
      <img src="https://ipfs.near.social/ipfs/bafkreief3msh3xc734huv2265hfu6ahohjaf2nwoghfqp4kh4wl77n2z2q" />
    </div>
    <div className="teams">
      {members.map((data) => (
        <div className="team">
          <img src={`https://ipfs.near.social/ipfs/${data.url}`} />
          <h1>{data.name}</h1>
          <span>{data.role}</span>
          <p>{data.company}</p>
        </div>
      ))}
    </div>
  </Root>
);
