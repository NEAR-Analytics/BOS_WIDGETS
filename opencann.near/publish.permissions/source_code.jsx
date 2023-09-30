const groups = ["Public", "Members", "OGs", ".edu emails", "Admin"];

const rights = {
  AddMemberToGroup: {
    title: "Add Member To Group",
    description:
      "Add member to given group for only these files. This is a short cut to updating DAO-wide permissions.",
  },
  RemoveMemberFromGroup: {
    title: "Remove Member From Group",
    description:
      "Remove member from given group for only these files. This is a short cut to updating DAO-wide permissions.",
  },
  Vote: {
    title: "Text Vote",
    description: "Just a text vote, with no outcome execution.",
  },
  FunctionCall: {
    title: "Function Call",
    description:
      "Calls a smart contract with list of method names in a single promise.",
  },
  Transfer: {
    title: "Transfer",
    description: "Transfer NEAR or a fungible token to another account.",
  },
  AddBounty: {
    title: "Create a Bounty",
    description: "Add new bounty.",
  },
  BountyDone: {
    title: "Bounty Done",
    description: "Indicates that given bounty is done by given user.",
  },
  ChangeConfig: {
    title: "Change Config",
    description: "Change the group-level config for this set of files.",
  },
  ChangePolicy: {
    title: "Change Policy",
    description: "Change the permissions policy you are currently setting.",
  },
  ChangePolicyAddOrUpdateGroup: {
    title: "Add Or Update Group",
    description:
      "Add new group to the policy. If the group already exists, update it. This is short cut to updating the whole policy.",
  },
  ChangePolicyRemoveGroup: {
    title: "Remove Group",
    description:
      "Remove group from the policy. This is short cut to updating the whole policy.",
  },
  ChangePolicyUpdateDefaultVotePolicy: {
    title: "Update Default Vote Policy",
    description:
      "Update the default vote policy from the policy. This is short cut to updating the whole policy.",
  },
  ChangePolicyUpdateParameters: {
    title: "Update DAO Parameters",
    description:
      "Update the parameters from the policy. This is short cut to updating the whole policy.",
  },
  UpgradeSelf: {
    title: "Upgrade Self",
    description: "Upgrade the DAO smart contract code.",
  },
  UpgradeRemote: {
    title: "Upgrade Remote",
    description: "Upgrade another smart contract.",
  },
  SetStakingContract: {
    title: "Set Staking Contract",
    description:
      "Set the staking contract. Can only be proposed if staking contract is not set yet",
  },
  FactoryInfoUpdate: {
    title: "Factory Info Update",
    description: "Change information about factory and auto update.",
  },
};

// Generate default permisisons
// note: if you want different default permissions, you can change them here, they will not be overwritten
// note 2: if you want to disable changing a right for a group, you can set disable to true

let defaultPermissions = {
  council: {
    ChangeConfig: {
      value: true,
      disabled: true,
    },
    ChangePolicy: {
      value: true,
      disabled: true,
    },
    RemoveMemberFromGroup: {
      value: true,
      disabled: true,
    },
    AddMemberToGroup: {
      value: true,
      disabled: true,
    },
  },
};

groups.forEach((group) => {
  if (defaultPermissions[group] === undefined) defaultPermissions[group] = {};
  Object.keys(rights).forEach((right) => {
    if (defaultPermissions[group][right] !== undefined) return;
    defaultPermissions[group][right] = {
      value: false,
    };
  });
});

State.init({
  permissions: defaultPermissions,
});

const handleChange = (group, right, value) => {
  console.log(group, right, value);
  State.update({
    permissions: {
      ...state.permissions,
      [group]: {
        ...state.permissions[group],
        [right]: {
          ...state.permissions[group][right],
          value,
        },
      },
    },
  });
};

const Wrapper = styled.div`
  border-radius: 4px;
  max-width: 1200px;
  width: 100%;

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  li {
    flex: 1;
    display: grid;
    grid-template-columns: minmax(100px, 2fr) repeat(
        auto-fit,
        minmax(40px, 1fr)
      );
    padding: 1rem;
    min-height: 90px;
    align-items: center;

    &:nth-child(odd) {
      background: #f5f5f5;
    }
  }

  h2 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }

  h3 {
    font-size: 0.9rem;
    font-weight: 600;
    margin: 0;
  }

  p {
    font-size: 0.8rem;
    color: #666;
    margin: 0;
  }

  .groups {
    padding: 0;
    margin: auto;
    text-align: center;
  }

  li label {
    display: none;
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
    li label {
      display: block;
    }
    .groups {
      padding: 8px;
    }
    .hide-on-mobile {
      display: none;
    }
  }
`;

const Row = ({ right, groups, key }) => (
  <li>
    <div>
      <h3>{right.title}</h3>
      <p>{right.description}</p>
    </div>
    {groups.map((group) => (
      <div className="groups">
        <Widget
          src="sking.near/widget/Common.Inputs.Checkbox"
          props={{
            label: group,
            onChange: (checked) => {
              handleChange(group, key, checked);
            },
            defaultChecked: defaultPermissions[group][key].value,
            disabled: defaultPermissions[group][key].disabled,
          }}
        />
      </div>
    ))}
  </li>
);

return (
  <Wrapper>
    <h2>Set group(s) to mangage selected file(s)</h2>
    <hr></hr>
    <i>Note: owners have all permissions "on" by default.</i>
    <p></p>

    <ul>
      <li>
        <div>
          <h2>Permissions</h2>
        </div>
        {groups.map((group) => (
          <h3 className="groups hide-on-mobile">{group}</h3>
        ))}
      </li>
      {Object.keys(rights).map((key) => (
        <Row groups={groups} right={rights[key]} key={key} />
      ))}
    </ul>
  </Wrapper>
);
