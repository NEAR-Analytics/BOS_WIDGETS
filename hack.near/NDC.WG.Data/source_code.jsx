const groups = {
  RC: {
    title: "Regional Communities",
    creatorId: "rc-dao.near",
    members: {
      "abbakaka.near": "",
      "igboze_builder.near": "",
      "inspiratibiz.near": "",
      "james.near": "",
    },
    daoId: "rc-dao.sputnik-dao.near",
  },
  NFT: {
    title: "Non-Fungible Tokens",
    creatorId: "nearnftwg.near",
    members: {
      "aescobar.near": "",
      "krikkraktrak.near": "",
      "nearversedao.near": "",
    },
    daoId: "nearnftwg.sputnik-dao.near",
  },
  DeFi: {
    title: "Decentralized Finance",
    creatorId: "defindc.near",
    groupId: "DeFi",
    members: { "ntare.near": "" },
    daoId: "defi-ndc.sputnik-dao.near",
  },
  AI: {
    title: "Artificial Intelligence",
    creatorId: "ai-dao.near",
    members: { "damboy22.near": "" },
    daoId: "ai-dao.sputnik-dao.near",
  },
  Gaming: {
    title: "Gaming",
    creatorId: "haenko.near",
    members: { "haenko.near": "", "dazo_gaming.near": "", "jeffgold.near": "" },
  },
  Events: {
    title: "Events",
    creatorId: "neardigitalcollective.near",
    members: { "ogruss.near": "" },
  },
  FDAO: {
    title: "Freelancers",
    creatorId: "freelancerdao.near",
    members: {
      "blaze.near": "",
      "fiftycent.near": "",
      "atrox1382.near": "",
      "robert.near": "",
      "kazanderdad.near": "",
    },
    daoId: "freelancerdao.sputnik-dao.near",
  },
  NRC: {
    title: "Research",
    creatorId: "research-collective.near",
    members: {
      "chloe.near": "",
      "earnestetim.near": "",
      "xvii.near": "",
    },
    daoId: "research-collective.sputnik-dao.near",
  },
  ReFi: {
    title: "Regenerative Finance",
    creatorId: "nearefi.near",
    members: {
      "earnestetim.near": "",
      "liight.near": "",
      "trophy001.near": "",
      "skyempire.near": "",
      "ndcplug.near": "",
      "ntare.near": "",
      "wolfwood.near": "",
    },
    daoId: "refi.sputnik-dao.near",
  },
  Aurora: {
    title: "Aurora",
    creatorId: "ac-dao.near",
    members: { "whendacha.near": "", "techdir.near": "", "johanga.near": "" },
    daoId: "aurora-community-dao.sputnik-dao.near",
  },
  Tech: {
    title: "Technology",
    creatorId: "neardigitalcollective.near",
    members: {
      "robert.near": "",
      "jlw.near": "",
      "blaze.near": "",
    },
    daoId: "ndc-techwg.sputnik-dao.near",
  },
  GWG: {
    title: "Governance",
    creatorId: "govworkinggroup.near",
    members: {
      "yuensid.near": "",
      "fiftycent.near": "",
      "atrox1382.near": "",
      "robert.near": "",
      "kazanderdad.near": "",
    },
    daoId: "gwg.sputnik-dao.near",
  },
};

const handleSave = () => {
  const data = {
    directory: groups,
  };

  Social.set(data);
};

return (
  <>
    <p>{JSON.stringify(groups)}</p>
    <button onClick={handleSave}>Save</button>
  </>
);
