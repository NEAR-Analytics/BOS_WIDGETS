const daoId = props.daoId ?? "multi.sputnik-dao.near";
const limit = parseInt(props.limit) || 30;

const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "";
}

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
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.candidate"
        props={{
          daoId,
          proposalId: 41,
          proposal,
          policy,
          candidateId: "candidate10.near",
          postUrl: "https://social.near.page/p/rc-dao.near/94244727",
        }}
      />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.candidate"
        props={{
          daoId,
          proposalId: 40,
          proposal,
          policy,
          candidateId: "candidate9.near",
          postUrl: "https://social.near.page/p/rc-dao.near/94244727",
        }}
      />
    </div>
    <br />
    <h3>Asia</h3>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.candidate"
        props={{
          daoId,
          proposalId: 39,
          proposal,
          policy,
          candidateId: "candidate8.near",
          postUrl: "https://social.near.page/p/rc-dao.near/94244727",
        }}
      />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.candidate"
        props={{
          daoId,
          proposalId: 38,
          proposal,
          policy,
          candidateId: "candidate7.near",
          postUrl: "https://social.near.page/p/rc-dao.near/94244727",
        }}
      />
    </div>
    <br />
    <h3>Europe</h3>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.candidate"
        props={{
          daoId,
          proposalId: 37,
          proposal,
          policy,
          candidateId: "candidate6.near",
          postUrl: "https://social.near.page/p/rc-dao.near/94244727",
        }}
      />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.candidate"
        props={{
          daoId,
          proposalId: 36,
          proposal,
          policy,
          candidateId: "candidate5.near",
          postUrl: "https://social.near.page/p/rc-dao.near/94244727",
        }}
      />
    </div>
    <br />
    <h3>North America</h3>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.candidate"
        props={{
          daoId,
          proposalId: 35,
          proposal,
          policy,
          candidateId: "candidate4.near",
          postUrl: "https://social.near.page/p/rc-dao.near/94244727",
        }}
      />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.candidate"
        props={{
          daoId,
          proposalId: 34,
          proposal,
          policy,
          candidateId: "candidate3.near",
          postUrl: "https://social.near.page/p/rc-dao.near/94244727",
        }}
      />
    </div>
    <br />
    <h3>South America</h3>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.candidate"
        props={{
          daoId,
          proposalId: 33,
          proposal,
          policy,
          candidateId: "candidate2.near",
          postUrl: "https://social.near.page/p/rc-dao.near/94244727",
        }}
      />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.candidate"
        props={{
          daoId,
          proposalId: 32,
          proposal,
          policy,
          candidateId: "candidate1.near",
          postUrl: "https://social.near.page/p/rc-dao.near/94244727",
        }}
      />
    </div>
    <br />
  </div>
);
