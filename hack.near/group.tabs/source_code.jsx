const accountId = props.accountId ?? context.accountId;
const groupId = props.groupId ?? "526fb256e74eelmf0nw3n5909bc189c13d";
const creatorId = props.creatorId ?? "devs.near";

const tab = props.tab === "contributors" ? props.tab : "community";

return (
  <div>
    <ul className="nav nav-pills nav-fill mb-4" role="tablist">
      <li className="nav-item" role="presentation">
        <a
          href={`#/hack.near/widget/Group?groupId=${groupId}&tab=community`}
          className={`btn nav-link ${tab === "community" ? "active" : ""}`}
          role="tab"
        >
          Community
        </a>
      </li>
      <li className="nav-item" role="presentation">
        <a
          href={`#/hack.near/widget/Group?groupId=${groupId}&tab=contributors`}
          className={`btn nav-link ${tab === "contributors" ? "active" : ""}`}
          role="tab"
        >
          Contributors
        </a>
      </li>
    </ul>
    <div className="tab-content">
      <div className="tab-pane fade in show active" role="tabpanel">
        <Widget
          src={
            tab === "community"
              ? "hack.near/widget/group.community"
              : "hack.near/widget/group.contributors"
          }
          props={{ accountId, groupId, creatorId }}
        />
      </div>
    </div>
  </div>
);
