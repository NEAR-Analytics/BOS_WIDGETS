let { ids, election_contract, registry_contract } = props;

ids = ids ? JSON.parse(ids) : [1, 2, 3, 4];
const budgetId = ids[3];

const electionContract = election_contract ?? "elections.ndc-gwg.near";
const registryContract = registry_contract ?? "registry.i-am-human.near";
const apiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const NFT_SERIES = [205, 206];
const QUERY_API_ENDPOINT = "https://graph.mintbase.xyz/mainnet";

const widgets = {
  header: "election.ndctools.near/widget/NDC.Elections.Header",
  filter: "election.ndctools.near/widget/NDC.Elections.Filter",
  houses: "election.ndctools.near/widget/NDC.Elections.Houses",
  progress: "election.ndctools.near/widget/NDC.Elections.Progress",
  candidates: "nearukraineguild.near/widget/NDC.Elections.Candidates",
  statistic: "election.ndctools.near/widget/NDC.Elections.Statistic",
  activities: "election.ndctools.near/widget/NDC.Elections.Activities",
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
  stepper: "election.ndctools.near/widget/NDC.Stepper",
};

State.init({
  electionStatus: "NOT_STARTED",
  selectedHouse: props.house ? parseInt(props.house) : ids[0],
  myVotes: [],
  winnerIds: [],
  iahToken: null,
  humanToken: 0,
  blacklisted: false,
  greylisted: false,
  candidateFilterId: "",
  isBonded: false,
  isBondedAmount: 0,
  reload: true,
  houses: [],
  acceptedPolicy: true,
  hasVotedOnAllProposals: false,
  hasPolicyNFT: null,
  hasIVotedNFT: null,
  iVotedToken: false,
});
const currentUser = context.accountId;

const steps = [
  {
    title: "Accepted Policy",
    completed: state.acceptedPolicy || state.myVotes.length > 0,
  },
  {
    title: 'Minted "Fair Voting Policy" NFT',
    completed: true,
  },
  {
    title: "Voting Completed",
    completed: state.hasVotedOnAllProposals,
  },
  {
    title: 'Minted "I Voted" NFT',
    completed: state.hasIVotedNFT,
  },
  {
    title: 'Unbonded & Minted "I Voted SBT"',
    completed: state.iVotedToken,
  },
];

function fetchGraphQL(series) {
  return asyncFetch(QUERY_API_ENDPOINT, {
    method: "POST",
    headers: { "mb-api-key": "anon", "x-hasura-role": electionContract },
    body: JSON.stringify({
      query: `
          query MyQuery {
            nft_tokens(
              where: {
                nft_contract_id: {
                  _eq: "mint.sharddog.near"
                },
                token_id: {_regex: "^${series}:"},
                owner: {_eq: "${currentUser}"}}
              order_by: {minted_timestamp: asc}
            ) {
              last_transfer_timestamp
            }
          }
        `,
      variables: {},
      operationName: "MyQuery",
    }),
  });
}

const processNFTAvailability = (result, key) => {
  if (result.status === 200) {
    let data = result.body.data;
    if (data) {
      const tokens = data.nft_tokens;

      State.update({
        [key]: tokens.length > 0 && tokens[0].last_transfer_timestamp === null,
      });
    }
  }
};

function loadHouses() {
  let houses = [
    Near.view(electionContract, "proposal", { prop_id: ids[0] }),
    Near.view(electionContract, "proposal", { prop_id: ids[1] }),
    Near.view(electionContract, "proposal", { prop_id: ids[2] }),
    Near.view(electionContract, "proposal", { prop_id: ids[3] }),
  ];

  houses[0].result = [
    ["achoski.near", 29],
    ["alan777.near", 0],
    ["auroracfo.near", 129],
    ["bearmans.near", 75],
    ["berynteoh.near", 27],
    ["cameron.near", 197],
    ["chloe.near", 180],
    ["cronus.near", 56],
    ["cryptocredit.near", 37],
    ["davidweinstein.near", 71],
    ["davletuner.near", 151],
    ["dedeukwu.near", 55],
    ["denbite.near", 96],
    ["derymars.near", 81],
    ["dk_51.near", 157],
    ["dleer.near", 128],
    ["earnestetim.near", 39],
    ["eschnoeckel.near", 22],
    ["frado.near", 58],
    ["fritzwagner.near", 0],
    ["gcohen.near", 80],
    ["guaschingmachines.near", 52],
    ["haenko.near", 205],
    ["iamgalt.near", 84],
    ["igboze_builder.near", 63],
    ["kazanderdad.near", 69],
    ["kekiboh.near", 19],
    ["kelsontoh.near", 45],
    ["kemo.near", 62],
    ["kennyj.near", 75],
    ["kiskesis.near", 154],
    ["klint.near", 46],
    ["lolson.near", 99],
    ["louisliu.near", 131],
    ["luciotato.near", 125],
    ["masterofcode.near", 0],
    ["maxkott.near", 111],
    ["mob.near", 241],
    ["monish016.near", 44],
    ["nguyencuong.near", 33],
    ["ntrucchinh.near", 0],
    ["odins_eyehole.near", 142],
    ["ogruss.near", 95],
    ["p3ter.near", 126],
    ["planetaworld.near", 27],
    ["psalm.near", 90],
    ["rexux.near", 136],
    ["rileytran.near", 121],
    ["sahilmassey.near", 74],
    ["salikc9.near", 33],
    ["thisthatjosh.near", 36],
    ["tiffany.near", 113],
    ["tutmt.near", 66],
    ["ugxnear.near", 32],
    ["vadim.near", 258],
    ["vandal.near", 107],
    ["vlad.near", 268],
    ["web3hedge.near", 0],
    ["whendacha.near", 234],
    ["wizzow.near", 64],
    ["woben.near", 147],
  ];

  houses[1].result = [
    ["983dcdc8e0d80d1f8938118161e1ec08be6557809afccd5ec396354f28a2ce78", 29],
    ["achildhoodhero.near", 100],
    ["ahsas.near", 137],
    ["alphaflexhub.near", 28],
    ["alyonushka.near", 28],
    ["antmarshall360.near", 27],
    ["as.near", 252],
    ["bennyblanco.near", 94],
    ["bishi.near", 30],
    ["blaze.near", 176],
    ["chefsale.near", 79],
    ["duocelot.near", 43],
    ["evangel.near", 134],
    ["flame1.near", 57],
    ["frol.near", 143],
    ["gagdiez.near", 21],
    ["harveys.near", 79],
    ["iamanansari.near", 127],
    ["ilerik.near", 23],
    ["izcc.near", 50],
    ["jgold.near", 63],
    ["jloc.near", 71],
    ["jlw.near", 96],
    ["joespano.near", 132],
    ["kangaroojack.near", 68],
    ["kennethjay.near", 0],
    ["keyokey.near", 53],
    ["kumarkrsronit.near", 0],
    ["kwhyc.near", 109],
    ["marieke.near", 165],
    ["mattlock.near", 160],
    ["ndcplug.near", 127],
    ["nearkat.near", 100],
    ["reespect.near", 48],
    ["robert.near", 50],
    ["rubycop.near", 110],
    ["sammiee1.near", 36],
    ["techdir.near", 116],
    ["vianftbrasil.near", 21],
    ["yesn.near", 87],
  ];
  houses[2].result = [
    ["abdulkareem.near", 21],
    ["alejandro.near", 231],
    ["andersonr.near", 30],
    ["arezhas.near", 36],
    ["aurorafinance1.near", 45],
    ["blessedchidi.near", 63],
    ["christinas.near", 50],
    ["cjpd.near", 50],
    ["crans.near", 100],
    ["cryptois.near", 139],
    ["dabbie3229.near", 55],
    ["danieldao.near", 0],
    ["escobarindo.near", 161],
    ["izubair.near", 156],
    ["jarednotjerry.near", 147],
    ["johanga108.near", 169],
    ["kriptoraptor.near", 72],
    ["larkim.near", 25],
    ["maks1mk_a.near", 0],
    ["manchutsca.near", 41],
    ["manutegus.near", 13],
    ["mohaa.near", 20],
    ["moska.near", 0],
    ["nftmuse.near", 44],
    ["ntare.near", 33],
    ["pironi.near", 106],
    ["rahulgoel.near", 176],
    ["ramgor.near", 0],
    ["rektdegen.near", 0],
    ["sallymg.near", 76],
    ["tolmindev.near", 79],
    ["vikash.near", 145],
    ["vincentcfpun.near", 0],
    ["waverlymaven.near", 92],
    ["williamxx.near", 84],
    ["yashank.near", 47],
    ["yonota.near", 115],
    ["yourdad.near", 220],
  ];

  State.update({ houses });
}

const findToken = (sbts, issuer) => {
  let token;
  if (sbts)
    token = sbts.find((token) => token[0] === issuer && token[1].length > 0);
  if (token) return token[1].find((t) => t.metadata.class === 1).token;
};

function loadSBTs() {
  const issuer = {
    fractal: "fractal.i-am-human.near",
    election: electionContract,
  };
  const sbts = Near.view(registryContract, "sbt_tokens_by_owner", {
    account: currentUser,
  });

  State.update({
    iahToken: findToken(sbts, issuer.fractal),
    iVotedToken: findToken(sbts, issuer.election),
  });
}

function loadBond() {
  asyncFetch(
    `https://api.pikespeak.ai/election/is-bonded?account=${currentUser}&registry=${registryContract}`,
    { headers: { "x-api-key": apiKey } }
  ).then((resp) => {
    if (resp.body) {
      const amount = resp.body.bond ? parseFloat(resp.body.bond) : 0;
      State.update({ isBonded: amount > 0 });
    }
  });
}

function loadFlagged() {
  const flagged = Near.view(registryContract, "account_flagged", {
    account: currentUser,
  });

  State.update({
    blacklisted: flagged === "Blacklisted",
    greylisted: flagged !== "Blacklisted" && flagged !== "Verified",
  });
}

function loadPolicy() {
  // const acceptedPolicy = Near.view(electionContract, "accepted_policy", {
  //   user: currentUser,
  // });
  // State.update({ acceptedPolicy });
}

function loadWinners() {
  const winnerIds = Near.view(electionContract, "winners_by_proposal", {
    prop_id: state.selectedHouse,
  });

  State.update({ winnerIds });
}

function loadElectionStatus() {
  const electionStatus = Near.view(electionContract, "proposal_status", {
    prop_id: state.selectedHouse,
  });

  State.update({ electionStatus });
}

function loadMyVotes() {
  asyncFetch(
    `https://api.pikespeak.ai/election/votes-by-voter?voter=${currentUser}&contract=${electionContract}`,
    { headers: { "x-api-key": apiKey } }
  ).then((resp) => {
    if (resp.body) {
      const myVotes = resp.body.filter((vote) =>
        ids.includes(parseInt(vote.proposal_id))
      );

      const votes = ids
        .map((id) => myVotes.find((vote) => parseInt(vote.proposal_id) === id))
        .filter((el) => el);

      State.update({
        myVotes,
        reload: false,
        hasVotedOnAllProposals: votes.length === 4,
      });
    }
  });
}

function loadNFT(id, key) {
  fetchGraphQL(NFT_SERIES[id]).then((result) =>
    processNFTAvailability(result, key)
  );
}

loadHouses();
loadSBTs();
loadElectionStatus();
loadFlagged();
loadWinners();
loadPolicy();
loadNFT(0, "hasPolicyNFT");
loadNFT(1, "hasIVotedNFT");

if (state.reload) {
  loadMyVotes();
  loadBond();
}

const handleUnbond = () => {
  Near.call(
    registryContract,
    "is_human_call",
    { ctr: electionContract, function: "unbond", payload: "{}" },
    "110000000000000"
  ).then((data) => State.update({ isBonded: false }));
};

const handleFilter = (e) => State.update({ candidateFilterId: e.target.value });

const votesLeft = (house) =>
  house.seats - state.myVotes.filter((vote) => vote.house === house.typ).length;

const Container = styled.div`
  padding: 20px 0;
`;

const ActivityContainer = styled.div`
  overflow-y: scroll;
`;

const Left = styled.div`
  padding: 20px;
  background: #f8f8f9;
  border-radius: 8px;
`;

const Filter = styled.div`
  margin-top: 20px;
`;

const Stepper = styled.div`
  margin-top: 32px;
`;

const Right = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  background: #f8f8f9;
  border-radius: 8px;
`;

const H5 = styled.h5`
  margin-bottom: 20px;
`;

const UnbondContainer = styled.div`
  background: #fdfeff;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px;
  h3,
  h4 {
    margin: 0 3px;
  }
  h3 {
    font-weight: 900;
  }
  .text-secondary {
    margin: 0 10px;
  }
  &.not-verified {
    h4 {
      font-size: 16px;
      margin: 0 0 5px 0;
      font-weight: 600;
    }
    h5 {
      margin: 0;
      font-size: 12px;
    }
  }
`;

const rand = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

return (
  <>
    <div>
      {state.houses.map((house) => (
        <>
          {house.id === state.selectedHouse && (
            <Widget
              key={i}
              src={widgets.header}
              props={{
                startTime: house.start,
                endTime: house.end,
                cooldown: house.cooldown,
                type: "Election",
                isWhistleblower: true,
                ids,
              }}
            />
          )}
        </>
      ))}
      <Stepper>
        <Widget src={widgets.stepper} props={{ steps }} />
      </Stepper>
      {state.selectedHouse !== budgetId && (
        <Filter>
          <Widget
            src={widgets.filter}
            props={{
              handleFilter,
              candidateId: state.candidateFilterId,
              placeholder: "Search by candidate name",
            }}
          />
        </Filter>
      )}
      <Container className="d-flex row">
        <Left className="h-screen col-lg-3 d-flex flex-column justify-content-between">
          <div>
            <H5>To Vote</H5>
            <Widget
              src={widgets.houses}
              props={{
                urlProps: props,
                selectedHouse: state.selectedHouse,
                houses: state.houses,
                ids,
                votesLeft: !!state.iahToken
                  ? (house) => votesLeft(house)
                  : null,
              }}
            />
          </div>

          {currentUser &&
          !!state.iahToken &&
          state.winnerIds.length > 0 &&
          !state.iVotedToken ? (
            <UnbondContainer className={`not-verified d-flex flex-column`}>
              <div>
                <h4>Unbond NEAR & Mint SBT</h4>
                <h5 className="text-secondary">
                  Congratulations! You can now unbond NEAR and mint the “I
                  Voted” SBT
                </h5>
              </div>
              <div className="mt-3">
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Button: {
                      className: "primary w-100 justify-content-center",
                      disabled: !state.isBonded,
                      text: "Unbond & Mint I Voted SBT",
                      onClick: handleUnbond,
                    },
                  }}
                />
              </div>
            </UnbondContainer>
          ) : (
            <>
              {!!state.iahToken && (
                <Widget
                  src={widgets.progress}
                  props={{ houses: state.houses, votesLeft }}
                />
              )}
            </>
          )}
        </Left>

        <div className="col-lg-6 p-2 p-md-3">
          {state.houses.map((house) => (
            <>
              {house.id === state.selectedHouse && (
                <Widget
                  key={i}
                  src={widgets.candidates}
                  props={{
                    electionContract,
                    registryContract,
                    ndcOrganization: "NDC",
                    ids,
                    ...state,
                    ...house,
                    result: house.result.sort((a, b) => b[1] - a[1]),
                  }}
                />
              )}
            </>
          ))}
        </div>

        <div className="col-lg-3">
          <Right className="col">
            <H5>General</H5>
            <div className="d-flex justify-content-center">
              <Widget src={widgets.statistic} props={{ electionContract }} />
            </div>
          </Right>
          {state.myVotes.length > 0 && (
            <Right className="col">
              <H5>My voting activity</H5>
              <ActivityContainer className="d-flex justify-content-center">
                <Widget
                  src={widgets.activities}
                  props={{ myVotes: state.myVotes }}
                />
              </ActivityContainer>
            </Right>
          )}
        </div>
      </Container>
    </div>
  </>
);
