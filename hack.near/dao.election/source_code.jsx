const accountId = context.accountId;
let { memberId, roleId, daoId } = props;

memberId = memberId ?? accountId;
roleId = roleId ?? "voter";
daoId = daoId ?? "rc-dao.sputnik-dao.near";

const policy = Near.view(daoId, "get_policy");
if (policy === null) return "";

const group = policy.roles
  .filter((role) => role.name === roleId)
  .map((role) => role.kind.Group)
  .join(", ");
State.init({ isMember: group.includes(memberId) });

let human = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
  account: memberId,
}).some((i) => i[0] === "fractal.i-am-human.near");

const checkProposals = (proposals) =>
  proposals.every((p) => p.proposer !== memberId);
const getProposals = (daoId) =>
  Near.view(daoId, "get_proposals", { from_index: 0, limit: 888 });

const daoList = [
  "rc-dao.sputnik-dao.near",
  "africa-community.sputnik-dao.near",
  "asia.sputnik-dao.near",
  "australia.sputnik-dao.near",
  "europe.sputnik-dao.near",
  "north-america.sputnik-dao.near",
  "south-america.sputnik-dao.near",
];
const allProposals = daoList.map((dao) => getProposals(dao));
if (allProposals.some((p) => p === null)) return "";

let canJoin = allProposals.every((p) => checkProposals(p));

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
      <Widget
        src="near/widget/DIG.Button"
        props={{
          href: "https://near.org/signup",
          label: "Create Account",
          variant: "outline-dark",
          size: "small",
        }}
      />
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
          <h3>Africa</h3>
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
          <h3>Asia</h3>
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
            <h3>Australia</h3>
            <Widget
              src="hack.near/widget/communities.regional"
              props={{
                daoId: "australia.sputnik-dao.near",
                name: "Join NEAR Australia",
                memberId: accountId,
                roleId,
              }}
            />
          </div>
        )}
      </div>
      {!canJoinContinent && (
        <div>
          <h3>Australia</h3>
          <div className="mb-3">
            <Widget
              src="hack.near/widget/dao.candidate"
              props={{
                memberId: accountId,
                proposalId: 43,
                candidateId: "candidate12.near",
                postUrl: "https://social.near.page/p/rc-dao.near/94244727",
              }}
            />
          </div>
          <div className="mb-3">
            <Widget
              src="hack.near/widget/dao.candidate"
              props={{
                memberId: accountId,
                proposalId: 42,
                candidateId: "candidate11.near",
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
          <h3>Europe</h3>
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
          <h3>North America</h3>
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
      <div className="mb-3">
        {validMember && canJoinContinent && (
          <div className="mb-3">
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
          <h3>South America</h3>
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
