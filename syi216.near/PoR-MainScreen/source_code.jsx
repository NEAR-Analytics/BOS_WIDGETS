//Validaciones lado front
const nftContract = "proof-of-reputation.near";
State.init({
  metaComplete: null,
  ndcComplete: null,
  nftsUser: null,
  completedQuests: [],
  questClaimed: [],
});

const questList = [
  {
    id: 0,
    img: "QmSt8ngyrTE6JG5gwPRNsHK3VkVMv5MZf4z2d8usGoCgNg",
    title: "I'm Human",
    description: "Identify yourself as a human in the I am human app.",
    points: 40,
    task: "https://i-am-human.app/",
  },
  {
    id: 1,
    img: "bafkreicy5xyuftll33aoxx2nn2whbaapttc2ank6okosri52qjc3tiktvm",
    title: "I've stNEAR",
    description: "Stake NEAR in metapool to get stNEAR.",
    points: 15,
    task: "https://www.metapool.app/stake?token=near",
  },
  {
    id: 2,
    img: "bafkreihmvm6leueepchub6fx7yfntubm42otfodilbosnevsd4q32dgu5i",
    title: "I've META",
    description: "Get META token in your account.",
    points: 15,
    task: "https://www.metapool.app/stake?token=near",
  },
  {
    id: 3,
    img: "QmZ17TnjJZEGDn1ZpjTr7cMivdxBAPWFuJhpTsm1sZr3LE",
    title: "I've power",
    description: "Get voting power on the metapool page.",
    points: 30,
    task: "https://www.metapool.app/myvotes",
  },
];

const claimedCard = (data) => (
  <div
    class="bg-secondary bg-opacity-50 rounded-4 shadow p-3 "
    style={{ width: "260px" }}
  >
    <img
      src={`https://ipfs.near.social/ipfs/${data.img}`}
      style={{ height: "200px", width: "100%", "object-fit": "cover" }}
      class="rounded-2 mx-auto"
    />
    <div class="pt-3 fw-bold">{data.title}</div>
    <div class="fw-light" style={{ "font-size": "14px", height: "50px" }}>
      {data.description}
    </div>
    <div class=" pt-4 d-flex justify-content-between">
      <p class="fw-semibold my-auto">{data.points} Points</p>
      <button disabled class="btn btn btn-secondary">
        Claimed
      </button>
    </div>
  </div>
);

const unclaimedCard = (data) => (
  <div
    class="bg-secondary bg-opacity-25 rounded-4 shadow p-3"
    style={{ width: "260px" }}
  >
    <img
      src={`https://ipfs.near.social/ipfs/${data.img}`}
      style={{
        height: "200px",
        width: "100%",
        "object-fit": "cover",
        filter: "grayscale(90%)",
      }}
      class="rounded-2 mx-auto"
    />
    <div class="pt-3 fw-bold">{data.title}</div>
    <div class="fw-light" style={{ "font-size": "14px", height: "50px" }}>
      {data.description}
    </div>
    <div class=" pt-4 d-flex justify-content-between">
      <p class="fw-semibold my-auto">{data.points} Points</p>
      <button
        onClick={() => {
          mintQuest(data.id);
        }}
      >
        Claim
      </button>
    </div>
  </div>
);

const incompleteCard = (data) => (
  <div
    class="bg-secondary bg-opacity-25 rounded-4 shadow p-3"
    style={{ width: "260px" }}
  >
    <img
      src={`https://ipfs.near.social/ipfs/${data.img}`}
      style={{
        height: "200px",
        width: "100%",
        "object-fit": "cover",
        filter: "grayscale(90%)",
      }}
      class="rounded-2"
    />
    <div class="pt-3 fw-bold">{data.title}</div>
    <div class="fw-light" style={{ "font-size": "14px", height: "50px" }}>
      {data.description}
    </div>
    <div class=" pt-4 d-flex justify-content-between">
      <p class="fw-semibold my-auto">{data.points} Points</p>
      <OverlayTrigger
        key={placement}
        placement={"top"}
        overlay={<Tooltip id={`tooltip-top`}>Go to do the quest</Tooltip>}
      >
        <a class="btn btn-outline-primary" href={data.task}>
          Incomplete
        </a>
      </OverlayTrigger>
    </div>
  </div>
);

//I'm human
const verifyNDC = () => {
  const registryContract = "registry.i-am-human.near";
  const isHuman = Near.view(registryContract, "is_human", {
    account: context.accountId,
  });
  let string = "";
  if (isHuman[0][1].length > 0) {
    string = string + "0,";
    State.update({
      ndcComplete: string,
      profile: Social.getr(`${context.accountId}/profile`),
    });
  }
};

//Verificar metapool
const verifyMetapool = () => {
  const stNearContract = "meta-pool.near";
  const metaContract = "meta-token.near";
  const metaVoteContract = "meta-vote.near";
  const sTNearBalance = Near.view(stNearContract, "ft_balance_of", {
    account_id: context.accountId,
  });
  const metaBalance = Near.view(metaContract, "ft_balance_of", {
    account_id: context.accountId,
  });
  const votingBalance = Near.view(metaVoteContract, "get_locked_balance", {
    voter_id: context.accountId,
  });

  let strings = "";
  if (sTNearBalance > 0) {
    strings = strings + "1,";
  }
  if (metaBalance > 0) {
    strings = strings + "2,";
  }
  if (votingBalance > 0) {
    strings = strings + "3,";
  }
  State.update({
    metaComplete: strings,
  });
};

const getClaimedQuest = () => {
  let data = Near.view(nftContract, "nft_tokens_for_owner", {
    account_id: context.accountId,
    from_index: "0",
    limit: 50,
  });
  State.update({ nftsUser: data });
};

const mintQuest = (quest) => {
  Near.call([
    {
      contractName: nftContract,
      methodName: "nft_mint_quest",
      args: {
        quest_number: quest,
      },
      gas: 300000000000000,
      deposit: 100000000000000000000000,
    },
  ]);
};

if (context.accountId) {
  verifyMetapool();
  verifyNDC();
  getClaimedQuest();
}
console.log(state);
if (
  state.ndcComplete != null &&
  state.metaComplete != null &&
  state.nftsUser != null
) {
  let data = state.ndcComplete + state.metaComplete;
  if (data.length > 0) {
    data = data.substring(0, data.length - 1);
    let arr = data.split(",");
    State.update({ completedQuests: arr, loadedCompleted: true });
  } else {
    State.update({ completedQuests: [] });
  }
  let json = state.nftsUser.find(
    (quest) => quest.metadata.title == "Proof Of Reputation NFT"
  ).metadata.extra;
  if (json) {
    json = json.split(",")[0].split(":")[1];
  }
  let titleArr = ["I'm Human", "stNEAR", "Meta Token", "Voting Power"];
  let claimedID = [];
  titleArr.map((title) => {
    let data = state.nftsUser.find((info) => info.metadata.title == title);
    if (data) {
      switch (title) {
        case "I'm Human":
          claimedID.push("0");
          break;
        case "stNEAR":
          claimedID.push("1");
          break;
        case "Meta Token":
          claimedID.push("2");
          break;
        case "Voting Power":
          claimedID.push("3");
          break;
      }
    }
  });
  console.log("claimed", claimedID);
  State.update({ claimedQuests: claimedID, userScore: json });
}

return (
  <div class="m-10">
    {context.accountId ? (
      <>
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-row gap-4 px-2">
            <img
              src={`https://ipfs.near.social/ipfs/bafkreib23axs6i6qwtxmc3qrbcvbe4uegf2rhjx6qpvz7swe4mrc466q4m`}
              style={{ height: "50px", width: "50px", "object-fit": "cover" }}
              class="my-auto"
            />
            <a
              class="btn bg-info bg-gradient my-auto fw-semibold shadow bg-opacity-50"
              href="#/syi216.near/widget/PoR-Loan"
            >
              Apply for loan
            </a>
          </div>
          <div class="d-flex flex-row bg-secondary bg-opacity-25 rounded-4 py-2 px-3 shadow-sm gap-2">
            <img
              src={`https://ipfs.near.social/ipfs/${state.profile.image.ipfs_cid}`}
              style={{ height: "40px", width: "40px", "object-fit": "cover" }}
              class="rounded-circle my-auto"
            />
            <div class="d-flex flex-row gap-3">
              <div class="my-auto fw-bold">{context.accountId}</div>
              <div class="my-auto">
                <div class="fw-semibold">Score</div>
                <div>{state.userScore ? state.userScore : 0}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-2 my-4">
          <p class="h2 fw-semibold pb-2">Proof of Reputation Quests</p>
          <div class="d-flex flex-row bg-secondary bg-opacity-10 rounded-2 shadow-sm p-4 gap-4 flex-wrap justify-content-around">
            {state.loadedCompleted &&
              questList.map((quest) =>
                state.claimedQuests.some((data) => data == quest.id.toString())
                  ? claimedCard(quest)
                  : state.completedQuests.some(
                      (data) => data == quest.id.toString()
                    )
                  ? unclaimedCard(quest)
                  : incompleteCard(quest)
              )}
          </div>
        </div>
      </>
    ) : (
      <h1>Log in with your NEAR account</h1>
    )}
  </div>
);
