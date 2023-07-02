const accountId = context.accountId;
const roleId = "voter";

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
    <h3>Africa</h3>
    <div className="mb-2">
      {validMember && (
        <Widget
          src="hack.near/widget/communities.regional"
          props={{
            daoId: "africa-community.sputnik-dao.near",
            name: "Join NEAR Africa",
            memberId: accountId,
            roleId,
          }}
        />
      )}
    </div>
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
    <br />
    <h3>Asia</h3>
    <div className="mb-2">
      {validMember && (
        <Widget
          src="hack.near/widget/communities.regional"
          props={{
            daoId: "asia.sputnik-dao.near",
            name: "Join NEAR Asia",
            memberId: accountId,
            roleId,
          }}
        />
      )}
    </div>
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
    <br />
    <h3>Europe</h3>
    <div className="mb-2">
      {validMember && (
        <Widget
          src="hack.near/widget/communities.regional"
          props={{
            daoId: "europe.sputnik-dao.near",
            name: "Join NEAR Europe",
            memberId: accountId,
            roleId,
          }}
        />
      )}
    </div>
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
    <br />
    <h3>North America</h3>
    <div className="mb-2">
      {validMember && (
        <Widget
          src="hack.near/widget/communities.regional"
          props={{
            daoId: "north-america.sputnik-dao.near",
            name: "Join NEAR North America",
            memberId: accountId,
            roleId,
          }}
        />
      )}
    </div>
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
    <br />
    <h3>South America</h3>
    <div className="mb-2">
      {!validMember && (
        <Widget
          src="hack.near/widget/communities.regional"
          props={{
            daoId: "south-america.sputnik-dao.near",
            name: "Join NEAR South America",
            memberId: accountId,
            roleId,
          }}
        />
      )}
    </div>
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
    <br />
  </div>
);
