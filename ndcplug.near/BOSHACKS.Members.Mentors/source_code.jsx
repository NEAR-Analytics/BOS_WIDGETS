// would be easier to get from rpfoile
const ownerId = "ndcplug.near";
/**Add robert yan */
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
  {
    image:
      "https://ipfs.near.social/ipfs/bafybeicfi24nukahjdz52t4gk2bvt7m3w3luf5sbw7hb6k7l7dbgyltv6a",
    name: "Joe Spano ",
    org: "ShardDog",
    accountId: "orangejoe.near",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafkreihi3qh72njb3ejg7t2mbxuho2vk447kzkvpjtmulsb2njd6m2cfgi",
    name: "Elliot Braem",
    org: "Everything.dev",
    accountId: "efiz.near",
  },
  {
    image: "https://avatars.githubusercontent.com/u/46699230?v=4",
    name: "Robert Yan",
    org: "MetaWeb",
    accountId: "robertyan.near",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafkreihaqpumilrwohmxli77n6jy74na2rhs6rzt3672rlssv7j4mbnydy",
    name: "Chloe",
    org: "MarmaJ",
    accountId: "chloe.near",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafybeigsukz57cxlgj2qhuplgnsquq4qmgx2nkuiuyhoxrdaqvg5jbbody",
    name: "Luis",
    org: "DevEx @ Mintbase",
    accountId: "microchipgnu.near",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafybeiduhfptclvhfgwawhkos5dvz2aql3xzk2blahopm5w2sel7ddflou",
    name: "Jeff Gold",
    org: "Tomago / NEARHub",
    accountId: "jeffgold.near",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafkreid4uojezsx3pecuaezqjbal7hv3tz3cglavfdvlsrqvkehto4tl5y",
    name: "Markeljan",
    org: "Boto.ai",
    accountId: "markeljan.near",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafkreif6isq3htqvj62rrpbmebn3k53wx24in6cuqdy6grndfe5nwohdgq",
    name: "Eamon",
    org: "VBI Academy",
    accountId: "eamondang.near",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafkreihg5anscwipdcv7vtf4vjqnplr7p5ppqtu5q5hbp52taehitl54rq",
    name: "Min Lu",
    org: "Keypom",
    accountId: "minlu.near",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafkreigo2egrq7yh5hiy4d5bavy4qnucjuw64z6aidark52a3okrscxzce",
    name: "Altan Tutar",
    org: "Engineer @ NEAR Foundation",
    accountId: "dapppunk.near",
  },
  {
    image: "https://arweave.net/6qo6hXTE6RjZqbGg9skpEBrIyV-uG0jIELtC_oXAHZc",
    name: "Ken",
    org: "NEAR Horizon",
    accountId: "kenjon.near",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafkreibexc5petoq6ixwmu6oxmjzpeupuzhjwucrimmgrgv6k47ntl7twq",
    name: "Zahidul Islam",
    org: "Founder at Jutsu.ai",
    accountId: "zahidulislam.near",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafkreihneeew6e7voz6oa7l7q7lvq4skatly4sjcwgn5id6nt57s2vtgca",
    name: "Peter Salomonsen",
    org: "Contributor @ DevHub",
    accountId: "petersalomonsen.near",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafkreieqsart7mrvsmboinmmugtxcloijva2kezsyubyuf4lsz4ox3jkru",
    name: "Jaswinder Singh",
    org: "Harmonic Guild",
    accountId: "jass.near",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafkreibcuwf7mbwy55yq3vslozelzo2zvn2awp2qpxbdz43ugezccarizi",
    name: "Manza",
    org: "Full Stack @ Meta Pool",
    accountId: "manzanal.near",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafybeibzfsbq6o3dailxycngmje7fnjazavlwmk43c4syxqsurwppqarpu",
    name: "Carina.Akaia",
    org: "DevHub Contributor / Akaia DAO",
    accountId: "carina.akaia.near",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafkreidcm6kzojswgosmt5dffj7duiw4ouiasr647zyxfvtdysbf5gln7i",
    name: "Kent",
    org: "NEAR Vietnam",
    accountId: "cuongdcdev.near",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafkreif7657hba6uyseq7j4jvmdrz4k5covpuvgrjpda65hzjbdouxg4eu",
    name: "Achraf",
    org: "Dev @ NDC / Astra++",
    accountId: "sking.near",
  },
  {
    image:
      "https://ipfs.near.social/ipfs/bafkreibtcpvf6b3smzf2nkvo4kuqt3ogra6yqt5kolq437rh7kx6s7yxpa",
    name: "Scott Lee",
    org: "BM & NEAR Korea",
    accountId: "builddao.near",
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
