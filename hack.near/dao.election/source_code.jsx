const accountId = context.accountId;
const memberId = props.memberId ?? context.accountId;
const roleId = props.roleId ?? "voter";
const daoId = props.daoId ?? "rc-dao.sputnik-dao.near";

const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "";
}

const deposit = policy.proposal_bond;
const group = policy.roles
  .filter((role) => role.name === roleId)
  .map((role) => role.kind.Group);

State.init({
  isMember: false,
});

const groupMembers = group.join(", ");

const checkMembership = (groupMembers) => {
  if (groupMembers.indexOf(memberId) !== -1) {
    return State.update({ isMember: true });
  }
};

const validMember = checkMembership(groupMembers);

// IAH Verification
let human = false;
const userSBTs = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
  account: memberId,
});

for (let i = 0; i < userSBTs.length; i++) {
  if ("fractal.i-am-human.near" == userSBTs[i][0]) {
    human = true;
  }
}

const proposals = Near.view(daoId, "get_proposals", {
  from_index: 0,
  limit: 888,
});

const af_proposals = Near.view(
  "africa-community.sputnik-dao.near",
  "get_proposals",
  { from_index: 0, limit: 888 }
);
const as_proposals = Near.view("asia.sputnik-dao.near", "get_proposals", {
  from_index: 0,
  limit: 888,
});
const au_proposals = Near.view("australia.sputnik-dao.near", "get_proposals", {
  from_index: 0,
  limit: 888,
});
const eu_proposals = Near.view("europe.sputnik-dao.near", "get_proposals", {
  from_index: 0,
  limit: 888,
});
const na_proposals = Near.view(
  "north-america.sputnik-dao.near",
  "get_proposals",
  { from_index: 0, limit: 888 }
);
const sa_proposals = Near.view(
  "south-america.sputnik-dao.near",
  "get_proposals",
  { from_index: 0, limit: 888 }
);

if (
  proposals === null ||
  af_proposals === null ||
  as_proposals === null ||
  au_proposals === null ||
  eu_proposals === null ||
  na_proposals === null ||
  sa_proposals === null
) {
  return "";
}

console.log(proposals);

// New function to check proposals
const checkProposals = (proposals) => {
  for (let i = 0; i < proposals.length; i++) {
    if (proposals[i].proposer === memberId) {
      return false;
    }
  }
  return true;
};

let canJoin = checkProposals(proposals);
let canJoinContinent =
  checkProposals(af_proposals) &&
  checkProposals(as_proposals) &&
  checkProposals(au_proposals) &&
  checkProposals(eu_proposals) &&
  checkProposals(na_proposals) &&
  checkProposals(sa_proposals);

console.log(canJoin);
console.log(canJoinContinent);

return (
  <div className="m-2">
    <div className="mt-3">
      <div className="mb-3">
        <Widget
          src="near/widget/AccountProfile"
          props={{ accountId: "rc-dao.sputnik-dao.near" }}
        />
      </div>
      <h3>
        <b>Election Demo</b>
      </h3>
      <p>
        <span style={{ fontSize: "0.8em" }}>
          🚧 <i>UNDER CONSTRUCTION</i> 🚧
        </span>
      </p>
    </div>
    <hr />
    {!validMember && (
      <div className="m-2">
        {!human ? (
          <div>
            <Widget
              src="near/widget/DIG.Button"
              props={{
                href: "https://i-am-human.app/?community=banyan&vertical=regionalcommunities",
                label: "Get Verified",
                variant: "outline-primary",
                size: "small",
              }}
            />
          </div>
        ) : (
          <div>
            <Widget
              src="hack.near/widget/community.join"
              props={{
                daoId,
                memberId,
                roleId,
              }}
            />
          </div>
        )}
      </div>
    )}
    <br />
    {!accountId && (
      <div>
        <p>Please connect with your NEAR account.</p>
        <h5>Don't have one?</h5>
        <Widget
          src="near/widget/DIG.Button"
          props={{
            href: "https://near.org/signup",
            label: "Create Account",
            variant: "outline-dark",
            size: "small",
          }}
        />
      </div>
    )}
    <div>
      {validMember && canJoinContinent && (
        <div className="mb-2">
          <h3>Africa</h3>
          <Widget
            src="hack.near/widget/communities.regional"
            props={{
              daoId: "africa-community.sputnik-dao.near",
              name: "Join NEAR Africa",
              memberId: accountId,
              roleId,
            }}
          />
        </div>
      )}

      {!canJoinContinent && (
        <div>
          <div className="mb-3">
            <Widget
              src="hack.near/widget/dao.candidate"
              props={{
                memberId: accountId,
                proposalId: 41,
                candidateId: "candidate10.near",
                postUrl: "https://social.near.page/p/rc-dao.near/94244727",
              }}
            />
          </div>
          <div className="mb-3">
            <Widget
              src="hack.near/widget/dao.candidate"
              props={{
                memberId: accountId,
                proposalId: 40,
                candidateId: "candidate9.near",
                postUrl: "https://social.near.page/p/rc-dao.near/94244727",
              }}
            />
          </div>
        </div>
      )}
      <br />
      <div className="mb-2">
        {validMember && canJoinContinent && (
          <div className="mb-2">
            <h3>Asia</h3>
            <Widget
              src="hack.near/widget/communities.regional"
              props={{
                daoId: "asia.sputnik-dao.near",
                name: "Join NEAR Asia",
                memberId: accountId,
                roleId,
              }}
            />
          </div>
        )}
      </div>
      {!canJoinContinent && (
        <div>
          <div className="mb-3">
            <Widget
              src="hack.near/widget/dao.candidate"
              props={{
                memberId: accountId,
                proposalId: 39,
                candidateId: "candidate8.near",
                postUrl: "https://social.near.page/p/rc-dao.near/94244727",
              }}
            />
          </div>
          <div className="mb-3">
            <Widget
              src="hack.near/widget/dao.candidate"
              props={{
                memberId: accountId,
                proposalId: 38,
                candidateId: "candidate7.near",
                postUrl: "https://social.near.page/p/rc-dao.near/94244727",
              }}
            />
          </div>
        </div>
      )}
      <br />
      <div className="mb-2">
        {validMember && canJoinContinent && (
          <div className="mb-2">
            <h3>Europe</h3>

            <Widget
              src="hack.near/widget/communities.regional"
              props={{
                daoId: "europe.sputnik-dao.near",
                name: "Join NEAR Europe",
                memberId: accountId,
                roleId,
              }}
            />
          </div>
        )}
      </div>
      {!canJoinContinent && (
        <div>
          <div className="mb-3">
            <Widget
              src="hack.near/widget/dao.candidate"
              props={{
                memberId: accountId,
                proposalId: 37,
                candidateId: "candidate6.near",
                postUrl: "https://social.near.page/p/rc-dao.near/94244727",
              }}
            />
          </div>
          <div className="mb-3">
            <Widget
              src="hack.near/widget/dao.candidate"
              props={{
                memberId: accountId,
                proposalId: 36,
                candidateId: "candidate5.near",
                postUrl: "https://social.near.page/p/rc-dao.near/94244727",
              }}
            />
          </div>
        </div>
      )}
      <br />
      <div className="mb-2">
        {validMember && canJoinContinent && (
          <div className="mb-2">
            <h3>North America</h3>

            <Widget
              src="hack.near/widget/communities.regional"
              props={{
                daoId: "north-america.sputnik-dao.near",
                name: "Join NEAR North America",
                memberId: accountId,
                roleId,
              }}
            />
          </div>
        )}
      </div>
      {!canJoinContinent && (
        <div>
          <div className="mb-3">
            <Widget
              src="hack.near/widget/dao.candidate"
              props={{
                memberId: accountId,
                proposalId: 35,
                candidateId: "candidate4.near",
                postUrl: "https://social.near.page/p/rc-dao.near/94244727",
              }}
            />
          </div>
          <div className="mb-3">
            <Widget
              src="hack.near/widget/dao.candidate"
              props={{
                memberId: accountId,
                proposalId: 34,
                candidateId: "candidate3.near",
                postUrl: "https://social.near.page/p/rc-dao.near/94244727",
              }}
            />
          </div>
        </div>
      )}
      <br />
      <div className="mb-2">
        {validMember && canJoinContinent && (
          <div className="mb-2">
            <h3>South America</h3>

            <Widget
              src="hack.near/widget/communities.regional"
              props={{
                daoId: "south-america.sputnik-dao.near",
                name: "Join NEAR South America",
                memberId: accountId,
                roleId,
              }}
            />
          </div>
        )}
      </div>
      {!canJoinContinent && (
        <div>
          <div className="mb-3">
            <Widget
              src="hack.near/widget/dao.candidate"
              props={{
                memberId: accountId,
                proposalId: 33,
                candidateId: "candidate2.near",
                postUrl: "https://social.near.page/p/rc-dao.near/94244727",
              }}
            />
          </div>
          <div className="mb-3">
            <Widget
              src="hack.near/widget/dao.candidate"
              props={{
                memberId: accountId,
                proposalId: 32,
                candidateId: "candidate1.near",
                postUrl: "https://social.near.page/p/rc-dao.near/94244727",
              }}
            />
          </div>
        </div>
      )}
      <br />
    </div>
  </div>
);
