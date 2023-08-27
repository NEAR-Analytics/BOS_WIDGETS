const endorsements = [
  {
    accountId: "ogruss.near",
    body: "HouseOfMerit",
    reason:
      "Community Behind NEAR, natural born hustler, been putting on for NEAR IRL, has NEAR tatted on him, yall not about this life. Certified BLUNT DAO OG",
  },
  {
    accountId: "cameron.near",
    body: "HouseOfMerit",
    reason: "Onboarding more people into NEAR than you can imagine. Certified BluntDAO OG",
  },
  {
    accountId: "vadim.near",
    body: "HouseOfMerit",
    reason: "OG BOS DEV before it was BOS, Holding it down at Proximity",
  },
  {
    accountId: "gagdiez.near",
    body: "CouncilOfAdvisors",
    reason: "OG Dev Rel at Pagoda",
  },
  // {
  //   accountId: "kiskesis.near",
  //   body: "HouseOfMerit",
  //   reason: "Dev and holding it down for NEAR Ukraine community",
  // },
  {
    accountId: "louisliu.near",
    body: "HouseOfMerit",
    reason: "Fouder of Octopus.network and OG Dev.",
  },
    {
    accountId: "vlad.near",
    body: "HouseOfMerit",
    reason: "Co-Founder of Human Guild. Built Web4 the BOS before the BOS. Early NEAR OG, like no windows with Alex and Illia.. Certified BluntDAO OG",
  },
  {
    accountId: "chloe.near",
    body: "HouseOfMerit",
    reason:
      "Steward of community and social good. Birth'd alot of you DAOs and you dont know about it. Built NFTs at Mintbase. Literally put me onto AstroDAO, and I run the DAO builder group.",
  },
  {
    accountId: "vandal.near",
    body: "HouseOfMerit",
    reason: "Watchu know about Web3 Creatives winning a grammy?",
  },
  {
    accountId: "kennyj.near",
    body: "HouseOfMerit",
    reason: "BluntDAO over everything",
  },
  {
    accountId: "alan777.near",
    body: "HouseOfMerit",
    reason: "History of developing and building community in Latam",
  },
  {
    accountId: "web3hedge.near",
    body: "HouseOfMerit",
    reason:
      "OG NFT launchpad founder and favorite wallet on NEAR founder. Always on community call, always shipping new NEAR feature. Yall probably going to vote with his wallets",
  },
  {
    accountId: "ntare.near",
    body: "HouseOfMerit",
    reason:
      "Dev, Putting on for Green Tech in Rwanda, and building public goods and NEAR ReFi",
  },
  {
    accountId: "ndcplug.near",
    body: "CouncilOfAdvisors",
    reason:
      "I'm ths shit. LIke i do so much for these NEAR streets you probably out the game if you don't know about me.",
  },
  {
    accountId: "antmarshall360.near",
    body: "CouncilOfAdvisors",
    reason:
      "Been putting on for Hip Hop since you were in your diapers, do your research. Vibes Co-Founder and NDC Marketing",
  },
  {
    accountId: "marieke.near",
    body: "CouncilOfAdvisors",
    reason:
      "Known operator in the space with technical background, CEO of NEAR Foundation, former MD at Circle",
  },
  {
    accountId: "achildhoodhero.near",
    body: "CouncilOfAdvisors",
    reason:
      "You wouldn't even know whats going on in NEAR if it weren't for this mans right here. NEARWEEK over everything",
  },
  // {
  //   accountId: "chefsale.near",
  //   body: "CouncilOfAdvisors",
  //   reason: "Watchu know about private shards",
  // },
  {
    accountId: "blaze.near",
    body: "CouncilOfAdvisors",
    reason:
      "Champion behind NDC, without him we wouldn't be here. Founder of Cheddar, ran Open Shards Alliance",
  },
  {
    accountId: "kwhyc.near",
    body: "CouncilOfAdvisors",
    reason:
      "Jordan built DAOs and NFTs on NEAR at TenK and AstroDAO, Steward of culture, onboarding those in ecosystem",
  },
  {
    accountId: "pironi.near",
    body: "TransparencyCommission",
    reason:
      "History of developing analytics and DeFI infrastructure, working with NDC and shipping effectively.",
  },
  {
    accountId: "cryptois.near",
    body: "TransparencyCommission",
    reason:
      "Deep tech background, OG at Octopus Network, community based organizing and BluntDAO OG.",
  },
  {
    accountId: "crans.near",
    body: "TransparencyCommission",
    reason:
      "Dont disrespect creatives dao or well smack the paintbrush right out yo hand .",
  },
    {
    accountId: "robert.near",
    body: "CouncilOfAdvisors",
    reason:
      "Regen, built NDC systems, built the token to even let you vote.",
  },
];

const Column = styled.div`
  display: flex;
  gap: 16px;
   

.endorsement {
    width: 70%
}

  .petition {
width: 30%

  }
`;
return (
  <>
    <h1> 🔌Plug's Endorsements</h1>
    <a href="https://neardc.org/vote-plug">neardc.org/vote-plug</a>
      <div className="endorsment">
        {endorsements.map((endorsement) => (
          <Widget
            src="ndcplug.near/widget/NDC.CandidateCard"
            props={{
              accountId: endorsement.accountId,
              body: endorsement.body,
              reason: endorsement.reason,
            }}
          />
        ))}
      </div>
  </>
);
