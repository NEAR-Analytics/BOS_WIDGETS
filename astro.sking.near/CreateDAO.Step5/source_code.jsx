const examplePolicy = {
  roles: [
    {
      name: "council",
      kind: { Group: ["infinity.near"] },
      permissions: [
        "add_member_to_role:AddProposal",
        "bounty_done:VoteApprove",
        "add_bounty:VoteReject",
        "add_bounty:AddProposal",
        "config:VoteReject",
        "add_bounty:VoteApprove",
        "remove_member_from_role:VoteReject",
        "policy:VoteRemove",
        "transfer:VoteRemove",
        "vote:VoteApprove",
        "upgrade_self:VoteApprove",
        "call:VoteRemove",
        "upgrade_self:AddProposal",
        "upgrade_remote:AddProposal",
        "upgrade_remote:VoteReject",
        "upgrade_remote:VoteApprove",
        "vote:AddProposal",
        "add_member_to_role:VoteReject",
        "bounty_done:VoteReject",
        "call:AddProposal",
        "upgrade_self:VoteRemove",
        "add_bounty:VoteRemove",
        "remove_member_from_role:VoteRemove",
        "config:VoteRemove",
        "call:VoteApprove",
        "add_member_to_role:VoteRemove",
        "policy:AddProposal",
        "add_member_to_role:VoteApprove",
        "policy:VoteApprove",
        "transfer:VoteApprove",
        "config:AddProposal",
        "*:Finalize",
        "remove_member_from_role:VoteApprove",
        "set_vote_token:VoteReject",
        "bounty_done:AddProposal",
        "set_vote_token:AddProposal",
        "policy:VoteReject",
        "set_vote_token:VoteRemove",
        "remove_member_from_role:AddProposal",
        "transfer:VoteReject",
        "transfer:AddProposal",
        "call:VoteReject",
        "upgrade_remote:VoteRemove",
        "upgrade_self:VoteReject",
        "vote:VoteReject",
        "bounty_done:VoteRemove",
        "vote:VoteRemove",
        "set_vote_token:VoteApprove",
        "config:VoteApprove",
      ],
      vote_policy: {},
    },
    {
      name: "community",
      kind: { Group: ["hack.near", "gov.near"] },
      permissions: [
        "policy:AddProposal",
        "remove_member_from_role:AddProposal",
        "add_bounty:AddProposal",
        "bounty_done:VoteApprove",
        "remove_member_from_role:VoteReject",
        "transfer:VoteApprove",
        "config:VoteReject",
        "upgrade_self:VoteReject",
        "upgrade_self:VoteRemove",
        "config:VoteRemove",
        "upgrade_remote:VoteRemove",
        "vote:AddProposal",
        "vote:VoteApprove",
        "upgrade_self:VoteApprove",
        "bounty_done:AddProposal",
        "set_vote_token:VoteReject",
        "add_bounty:VoteReject",
        "call:AddProposal",
        "add_member_to_role:VoteReject",
        "bounty_done:VoteReject",
        "policy:VoteApprove",
        "vote:VoteReject",
        "*:Finalize",
        "call:VoteRemove",
        "bounty_done:VoteRemove",
        "add_member_to_role:AddProposal",
        "set_vote_token:VoteRemove",
        "set_vote_token:VoteApprove",
        "upgrade_self:AddProposal",
        "add_bounty:VoteRemove",
        "remove_member_from_role:VoteRemove",
        "add_member_to_role:VoteApprove",
        "upgrade_remote:VoteApprove",
        "vote:VoteRemove",
        "policy:VoteRemove",
        "transfer:AddProposal",
        "call:VoteApprove",
        "transfer:VoteReject",
        "transfer:VoteRemove",
        "add_member_to_role:VoteRemove",
        "add_bounty:VoteApprove",
        "config:AddProposal",
        "call:VoteReject",
        "policy:VoteReject",
        "remove_member_from_role:VoteApprove",
        "set_vote_token:AddProposal",
        "config:VoteApprove",
        "upgrade_remote:VoteReject",
        "upgrade_remote:AddProposal",
      ],
      vote_policy: {},
    },
    {
      name: "all",
      kind: "Everyone",
      permissions: [
        "policy:AddProposal",
        "set_vote_token:AddProposal",
        "bounty_done:AddProposal",
        "upgrade_self:AddProposal",
        "upgrade_remote:AddProposal",
        "transfer:AddProposal",
        "remove_member_from_role:AddProposal",
        "add_member_to_role:AddProposal",
        "call:AddProposal",
        "vote:VoteApprove",
        "config:AddProposal",
        "vote:VoteRemove",
        "vote:VoteReject",
        "vote:AddProposal",
        "add_bounty:AddProposal",
      ],
      vote_policy: {},
    },
  ],
  default_vote_policy: {
    weight_kind: "RoleWeight",
    quorum: "0",
    threshold: [1, 2],
  },
  proposal_bond: "100000000000000000000000",
  proposal_period: "604800000000000",
  bounty_bond: "100000000000000000000000",
  bounty_forgiveness_period: "604800000000000",
};

const proposalKinds = {
  ChangeDAOConfig: {
    title: "Change DAO Config",
  },
  ChangeDAOPolicy: {
    title: "Change DAO Policy",
  },
  Bounty: {
    title: "Bounty",
  },
  BountyDone: {
    title: "Bounty Done",
  },
  Transfer: {
    title: "Transfer",
  },
  Polls: {
    title: "Polls",
  },
  RemoveMembers: {
    title: "Remove Members",
  },
  AddMembers: {
    title: "Add Members",
  },
  FunctionCall: {
    title: "Function Call",
  },
  UpgradeSelf: {
    title: "Upgrade Self",
  },
  UpgradeRemote: {
    title: "Upgrade Remote",
  },
  SetVoteToken: {
    title: "Set Vote Token",
  },
};

const Table = styled.ul`
  border-radius: 4px;
  width: 100%;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  position: relative;

  li {
    flex: 1;
    display: grid;
    grid-template-columns: minmax(100px, 2fr) repeat(
        auto-fit,
        minmax(100px, 1fr)
      );
    grid-auto-flow: column;
    grid-auto-columns: minmax(100px, 1fr);
    max-width: 100%;
    align-items: center;
    padding: 16px;
    justify-items: center;
    align-items: center;
    gap: 16px;
    border-bottom: 1px solid #eee;

    & > *:first-child {
      justify-self: flex-start;
      display: block;
    }

    &:first-child {
      border-color: #4498e0;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  p {
    font-size: 0.8rem;
    color: #666;
    margin: 0;
  }

  li .label {
    display: none;
  }

  .cbx:not(:last-child) {
    margin-right: 0 !important;
  }

  @media (max-width: 600px) {
    li {
      display: flex;
      flex-wrap: wrap;
    }
    li > div:first-child {
      margin-bottom: 1rem;
      flex: 1;
      min-width: 100%;
    }
    li .label {
      display: block;
    }

    .cbx:not(:last-child) {
      margin-right: 6px !important;
    }
    .hide-on-mobile {
      display: none;
    }
  }
`;

const renderTable = (roles, rows) => {
  return (
    <Table>
      <li className="fw-bold">
        <span>Actions</span>
        {roles.map((role) => (
          <span className="hide-on-mobile">{role}</span>
        ))}
      </li>
      {Object.keys(rows).map((key) => (
        <li>
          <div>{rows[key].title}</div>
          {roles.map((role) => (
            <Widget
              src="nui.sking.near/widget/Input.Checkbox"
              props={{
                label: role,
                onChange: (checked) => {},
              }}
            />
          ))}
        </li>
      ))}
    </Table>
  );
};

return (
  <div className="d-flex flex-column gap-4">
    <h2 className="h5 fw-bold mb-2">
      <span
        className="rounded-circle d-inline-flex align-items-center justify-content-center fw-bolder h5 me-2"
        style={{
          width: "48px",
          height: "48px",
          border: "1px solid #82E299",
        }}
      >
        5
      </span>
      Proposal and permissions
    </h2>

    <div>
      <h3 className="h6 fw-bold mb-0">Proposal creation</h3>
      <p className="text-black-50 fw-light small">
        Choose what creation rights you give DAO groups. This can be changed in
        settings later.
      </p>
      {renderTable(["All", "Council", "Dev"], proposalKinds)}
    </div>

    <div>
      <h3 className="h6 fw-bold mb-0">Voting Permissions</h3>
      <p className="text-black-50 fw-light small">
        Choose what voting permissions you give DAO groups.
      </p>
      {renderTable(["All", "Council", "Dev"], proposalKinds)}
    </div>
  </div>
);
