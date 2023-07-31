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
