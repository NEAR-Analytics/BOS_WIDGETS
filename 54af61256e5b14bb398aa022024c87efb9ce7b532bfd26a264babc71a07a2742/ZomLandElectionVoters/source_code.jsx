const apiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";
const accounts = [
  "flugg.near",
  "shamani.near",
  "semyon.near",
  "nathanbyars.near",
  "marior.near",
  "e0cf5b63e5586b1908e82b4c750ce19a4492b6bb722cc1e3911f90fb8e04f4d3",
  "needb.near",
  "you_are_out_of_place_here.near",
  "sookast.near",
  "nearpavel.near",
  "rubycop.near",
  "kaspars86.near",
  "vlodkow.near",
  "denbite.near",
  "cryptogarik.near",
  "rambergen.near",
  "betrin.near",
  "nz3000.near",
  "anjass.near",
  "liight.near",
  "mi4ka.near",
  "flawl3ss.near",
  "nate.near",
  "59583199fc8d2b7207ad71f5213b3e7c917cbf07579d0e63fe1d7cebd9a2cd00",
  "938c83fcf90350e4e5ad7f1a802d3db742718e194efbc77cf5a250742f61aeb9",
  "annastoilova.near",
  "isho.near",
  "tolmindev.near",
  "2218af17e2a3f8ee57e870f5af5a45a5be3d0a733fb08e4c64f5bf4ffdbef09a",
  "maryrazel.near",
  "red34.near",
  "toni2411992.near",
  "1001k.near",
  "andreloft.near",
  "root.near",
  "7418d5cb7d7657e526b8bccf28750939105828d0f5b34a7254bd107477d84a2c",
  "cryptois.near",
  "vvr.near",
  "koles.near",
  "3misfits.near",
  "lesha_vecher.near",
  "kriptoraptor.near",
  "8d896e439b3111e1107403f1a8e64400de5283897a09b4dbc9102759c2bfef1c",
  "rubenzmart.near",
  "riqi.near",
  "vlad.near",
  "chezhe.near",
  "mrmachine1903.near",
  "georgemarlow.near",
  "aryonchain.near",
  "henryis.near",
  "vertfromage.near",
  "aliaksandrh.near",
  "fgex.near",
  "honestdsk.near",
  "monish016.near",
  "rootx.near",
  "maks1mk_a.near",
  "buythefear.near",
  "omajari199.near",
  "c3f1e6ce50f5a3e33a1db4a966bec3c35897cb6e63aa8f90aa6b6a2b34eb7c74",
  "kiskesis.near",
  "explorebivab.near",
  "microchipgnu.near",
  "p0k.near",
  "vinhdao286.near",
  "vu260797.near",
  "ardisaz.near",
  "jehoti.near",
  "steven4293.near",
  "rebzay.near",
  "dushek.near",
  "lolson.near",
  "14a738378c279cb548cae697aea8b4fcf9893b598d9699af313e20de6679b303",
  "billybones.near",
  "monza.near",
  "izullubiez.near",
  "markmklsn.near",
  "a99448ef6d5804ddfde7121eddd815f9d32b4128e97eceb8c41132995baa2010",
  "yabloko.near",
  "illli.near",
  "wohon.near",
  "rayha.near",
  "iben.near",
  "18e28ed26ef42687b19cba6d471b7ce87b5f683d253e89e5121c4e790471310f",
  "mnaveed.near",
  "chloe.near",
  "31ad8a4fa1085cfb1605a189037762a496fb588fb3fce4ffa536adf09763ce90",
  "femioguns04.near",
  "reup.near",
  "fandix.near",
  "davletuner.near",
  "yonota.near",
  "e51346889b17c60253bb7ed3b6710c3d0f9c2743171763cb61b700757059da83",
  "bishi.near",
  "29baf90a4010321e8d7edf9c569304d3768ba041fca11302b9ffc6d487ce4007",
  "hardexe.near",
  "39cb88955904c2b2f3ad484e45e8241fbe0785e64ca8f56995550591dffd15db",
  "neversettleinterstellar.near",
  "1ce2567f7f49cb34cea72179223ec7fc4ba91077da3e01364d0c729dfbe26467",
  "cronus.near",
  "uncle_alex.near",
  "svetik.near",
  "bigdawg.near",
  "anmatig.near",
  "cd0c33b4dddffe6e177696a64e219cd9e9a8878965d38bb7ce4d2cc06f91437b",
  "planetaworld.near",
  "f3ff09992bcdb90a76b0f48cc6575924c1592bd7d1c67c6891cdf77f71009318",
];

State.init({
  voters: [],
  otherVoters: {},
  data: [],
  community: props.community || "zomland",
});

asyncFetch(
  `https://api.pikespeak.ai/election/votes-by-candidate?contract=elections.ndc-gwg.near&candidate=${props.candidate}`,
  { headers: { "x-api-key": apiKey } }
).then((resp) => {
  State.update({ voters: resp.body.map((el) => el.voter) });
});

asyncFetch(`https://scoreboard-ophc7vkxsq-uc.a.run.app/scoreboard`, {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}).then((res) => {
  if (res.body) State.update({ data: res.body.data });
});

const Container = styled.div`
  flex-direction: row;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const Section = styled.div`
  background: #fdfeff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  font-size: 14px;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const Name = styled.div`
  background-color: ${(props) =>
    props.isVotedForOthers
      ? "#ccc"
      : props.isVoted
      ? "#46ff7d"
      : "inherit !important"};
  width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;

  @media (max-width: 400px) {
    width: 120px;
  }
`;

const Chart = styled.div`
  width: 150px;
  aspect-ratio: 1;
  position: relative;
  display: inline-grid;
  place-content: center;
  margin: 5px;
  font-size: 25px;
  font-weight: bold;

  &:before {
    content: "";
    position: absolute;
    border-radius: 50%;
    inset: 0;
    background: ${(props) =>
      `conic-gradient(#4ba6ee, calc(${props.voted}*1%), #d4e5f4 0)`};
    -webkit-mask: radial-gradient(
      farthest-side,
      #0000 calc(99% - 15px),
      #000 calc(100% - 15px)
    );
    mask: radial-gradient(
      farthest-side,
      #0000 calc(99% - 15px),
      #000 calc(100% - 15px)
    );
  }

  span {
    font-weight: 800;
    font-size: 32px;
    line-height: 120%;
    color: #4ba6ee;
  }
`;

function getVoted(list) {
  return state.voters.filter((u) => list.includes(u));
}

function isVoted(acc) {
  return state.voters.some((u) => acc === u);
}

const data = fetch(
  "https://raw.githubusercontent.com/zavodil/near-nft-owners-list/main/output_election_votes.txt"
);

if (data.ok) {
  let otherVoters = {};

  Object.values(
    data.body
      .split("\n")
      .map((line) => line.split("|"))
      .filter((data) => data.length === 5)
  ).map((item) => {
    const account_id = item[0];
    if (otherVoters[account_id] == undefined) {
      otherVoters[account_id] = {};
    }
    otherVoters[account_id][item[3]] = item[4].toLowerCase();
  });

  State.update({ otherVoters });
} else return "Loading";

console.log(state.otherVoters);
const formData = {};

state.data.map((item) => {
  if (formData[item["community-name"]])
    formData[item["community-name"]].push(item);
  else formData[item["community-name"]] = [item];
});

const ndcAccounts = formData[state.community]
  .map((user) => user.account)
  .filter((user) => accounts.includes(user));
const totalPercentage = (getVoted(accounts).length / accounts.length) * 100;
const ndcPercentage = (getVoted(ndcAccounts).length / ndcAccounts.length) * 100;
const getOtherVoter = (acc) => state.otherVoters[acc][2];

return (
  <div className="d-flex flex-column justify-content-center w-100">
    <Container className="d-flex mt-3 mb-3 w-100 gap-3 justify-content-center">
      <Section className="d-flex flex-column gap-2 align-items-center">
        <h5>Total Whitelisted ({accounts.length})</h5>
        <div className="d-flex flex-column gap-2">
          {accounts.map((accountId) => (
            <Name
              isVoted={isVoted(accountId)}
              isVotedForOthers={
                getOtherVoter(accountId).length > 0 &&
                !getOtherVoter(accountId).includes(context.accountId)
              }
            >
              <Widget
                src="mob.near/widget/ProfileLine"
                props={{ accountId, tooltip: false }}
              />
            </Name>
          ))}
        </div>
      </Section>
      <Section className="d-flex flex-column gap-2 align-items-center">
        <h5>NDC Whitelisted ({ndcAccounts.length})</h5>
        <div className="d-flex flex-column gap-2">
          {ndcAccounts.map((accountId) => (
            <Name
              isVoted={isVoted(accountId)}
              isVotedForOthers={
                getOtherVoter(accountId).length > 0 &&
                !getOtherVoter(accountId).includes(context.accountId)
              }
            >
              <Widget
                src="mob.near/widget/ProfileLine"
                props={{ accountId, tooltip: false }}
              />
            </Name>
          ))}
        </div>
      </Section>
      <Section className="d-flex flex-column gap-2 align-items-center">
        <h5>Total users</h5>
        <Chart voted={totalPercentage}>
          <span>{totalPercentage.toFixed(1)}%</span>
        </Chart>
        <h5>NDC users</h5>
        <Chart voted={ndcPercentage}>
          <span>{ndcPercentage.toFixed(1)}%</span>
        </Chart>
      </Section>
    </Container>
  </div>
);
