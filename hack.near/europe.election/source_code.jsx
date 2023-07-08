const accountId = context.accountId;
const memberId = props.memberId ?? context.accountId;
const roleId = props.roleId ?? "voter";
const daoId = props.daoId ?? "rc-dao.sputnik-dao.near";

const validMember = props.validMember;
const canJoin = props.canJoin;
const canJoinContinent = props.canJoinContinent;

return (
  <div className="m-2">
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
    {!canJoinContinent && (
      <div>
        <h3>Europe</h3>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId: accountId,
              proposalId: 39,
              candidateId: "ananastya.near",
              postUrl: "https://social.near.page/p/ananastya.near/94866343",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId: accountId,
              proposalId: 39,
              candidateId: "kiskesis.near",
              postUrl: "https://social.near.page/p/ananastya.near/94866343",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId: accountId,
              proposalId: 39,
              candidateId: "kemo.near",
              postUrl: "https://social.near.page/p/ananastya.near/94866343",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId: accountId,
              proposalId: 39,
              candidateId: "bjirken.near",
              postUrl: "https://social.near.page/p/ananastya.near/94866343",
            }}
          />
        </div>
      </div>
    )}
  </div>
);
