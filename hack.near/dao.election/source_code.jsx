const daoId = props.daoId ?? "multi.sputnik-dao.near";
const limit = parseInt(props.limit) || 30;

const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "";
}

return (
  <div className="m-2">
    <h3>Test Candidates</h3>
    <p>FOR DEMO PURPOSES ONLY</p>
    <h5>Africa</h5>
    <Widget
      src="hack.near/widget/dao.candidate"
      props={{
        daoId,
        id: 41,
        policy,
        candidateId: "candidate10.near",
        postUrl: "https://social.near.page/p/rc-dao.near/94244727",
      }}
    />
    <Widget
      src="hack.near/widget/dao.candidate"
      props={{
        daoId,
        id: 40,
        policy,
        candidateId: "candidate9.near",
        postUrl: "https://social.near.page/p/rc-dao.near/94244727",
      }}
    />
    <h5>Asia</h5>
    <Widget
      src="hack.near/widget/dao.candidate"
      props={{
        daoId,
        id: 39,
        policy,
        candidateId: "candidate8.near",
        postUrl: "https://social.near.page/p/rc-dao.near/94244727",
      }}
    />
    <Widget
      src="hack.near/widget/dao.candidate"
      props={{
        daoId,
        id: 38,
        policy,
        candidateId: "candidate7.near",
        postUrl: "https://social.near.page/p/rc-dao.near/94244727",
      }}
    />
    <h5>Africa</h5>
    <Widget
      src="hack.near/widget/dao.candidate"
      props={{
        daoId,
        id: 37,
        policy,
        candidateId: "candidate6.near",
        postUrl: "https://social.near.page/p/rc-dao.near/94244727",
      }}
    />
    <Widget
      src="hack.near/widget/dao.candidate"
      props={{
        daoId,
        id: 36,
        policy,
        candidateId: "candidate5.near",
        postUrl: "https://social.near.page/p/rc-dao.near/94244727",
      }}
    />
    <h5>Africa</h5>
    <Widget
      src="hack.near/widget/dao.candidate"
      props={{
        daoId,
        id: 35,
        policy,
        candidateId: "candidate4.near",
        postUrl: "https://social.near.page/p/rc-dao.near/94244727",
      }}
    />
    <Widget
      src="hack.near/widget/dao.candidate"
      props={{
        daoId,
        id: 34,
        policy,
        candidateId: "candidate3.near",
        postUrl: "https://social.near.page/p/rc-dao.near/94244727",
      }}
    />
    <h5>Africa</h5>
    <Widget
      src="hack.near/widget/dao.candidate"
      props={{
        daoId,
        id: 33,
        policy,
        candidateId: "candidate2.near",
        postUrl: "https://social.near.page/p/rc-dao.near/94244727",
      }}
    />
    <Widget
      src="hack.near/widget/dao.candidate"
      props={{
        daoId,
        id: 32,
        policy,
        candidateId: "candidate1.near",
        postUrl: "https://social.near.page/p/rc-dao.near/94244727",
      }}
    />
  </div>
);
