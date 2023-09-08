const daoId = props.daoId ?? "hacks.sputnik-dao.near";

State.init({
  filterByRole: "boshacks",
});

const processPolicy = (policy) => {
  const obj = {
    policy,
    users: {},
    roles: {},
    everyone: {},
  };
  policy.roles.forEach((role) => {
    if (role.kind === "Everyone") {
      obj.everyone = role;
    }
    if (role.kind.Group) {
      if (!obj.roles[role.name]) {
        obj.roles[role.name] = role;
      }
      role.kind.Group.forEach((user) => {
        if (!obj.users[user]) {
          obj.users[user] = [];
        }

        obj.users[user].push(role.name);
      });
    }
  });

  return obj;
};

const policy = useCache(
  () =>
    Near.asyncView(daoId, "get_policy").then((policy) => processPolicy(policy)),
  daoId + "-policy",
  { subscribe: false }
);

if (policy === null) return "";

const Wrapper = styled.div`
  .userRow {
    width: 100%;
    @media screen and (min-width: 600px) {
      width: calc(50% - 1rem);
    }
    @media screen and (min-width: 1400px) {
      width: calc(33% - 1rem);
    }
  }
`;

const renderUserRow = (user, roles, i) => {
  return (
    <div key={i} className="ndc-card ratio ratio-1x1 userRow">
      <div className=" d-flex flex-column p-4">
        <Widget
          src="nui.sking.near/widget/Element.User"
          props={{
            accountId: user,
            options: {
              showHumanBadge: true,
              showImage: true,
              showSocialName: true,
            },
          }}
        />
        <div className="d-flex gap-1 mt-3 flex-wrap mb-3">
          {roles.map((role, i) => {
            return (
              <Widget
                src="nui.sking.near/widget/Input.Button"
                props={{
                  children: role,
                  size: "sm",
                  variant: "default",
                  className: "text-capitalize",
                }}
                key={i}
              />
            );
          })}
        </div>
        <div className="d-flex flex-column gap-2 mt-auto flex-wrap w-100">
          <Widget
            src="nui.sking.near/widget/Social.FollowButton"
            props={{
              accountId: user,
              size: "sm",
              className: "w-100",
            }}
          />
          <Widget
            src="nui.sking.near/widget/Input.Button"
            props={{
              children: "Propose to Mint SBT",
              size: "sm",
              variant: ["secondary", "outline"],
              className: "w-100",
            }}
          />
          {isUserAllowedTo(
            context.accountId,
            "remove_member_from_role",
            "AddProposal"
          ) && (
            <Widget
              src="nui.sking.near/widget/Layout.Modal"
              props={{
                toggle: (
                  <Widget
                    src="nui.sking.near/widget/Input.Button"
                    props={{
                      children: "Propose to Remove",
                      size: "sm",
                      variant: ["danger", "outline"],
                      className: "w-100",
                    }}
                  />
                ),
                content: (
                  <div className="ndc-card p-4">
                    <Widget
                      src="nui.sking.near/widget/Input.Select"
                      props={{
                        label: "Propose to remove from role:",
                        options: roles.map((r) => {
                          return {
                            title: r,
                            value: r,
                          };
                        }),
                        onChange: (v) => State.update({ removeFromRole: v }),
                        value: state.removeFromRole,
                      }}
                    />
                    <Widget
                      src="nui.sking.near/widget/Input.Button"
                      props={{
                        children: "Propose to Remove",
                        size: "sm",
                        variant: ["danger"],
                        className: "w-100",
                        onClick: () =>
                          onRemoveUserProposal(user, state.removeFromRole),
                      }}
                    />
                  </div>
                ),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const renderGroups = () => {
  return (
    <div className="d-flex gap-2 flex-wrap">
      <Widget
        src="nui.sking.near/widget/Input.Button"
        props={{
          children: `all (${Object.keys(policy.users).length})`,
          size: "sm",
          variant: !state.filterByRole ? "primary" : "default",
          className: "text-capitalize",
          onClick: () =>
            State.update({
              filterByRole: null,
            }),
        }}
        key={i}
      />
      {Object.keys(policy.roles).map((role, i) => {
        return (
          <Widget
            src="nui.sking.near/widget/Input.Button"
            props={{
              children: `${role} (${policy.roles[role].kind.Group.length})`,
              size: "sm",
              variant: state.filterByRole === role ? "primary" : "default",
              className: "text-capitalize",
              onClick: () =>
                State.update({
                  filterByRole: role,
                }),
            }}
            key={i}
          />
        );
      })}
    </div>
  );
};

const users = !state.filterByRole
  ? Object.keys(policy.users)
  : Object.keys(policy.users).filter((user) =>
      policy.users[user].includes(state.filterByRole)
    );

return (
  <Wrapper className="d-flex flex-column">
    <div className="ndc-card p-4">
      <h4 className=" text-capitalize">Students ({users.length})</h4>
    </div>
    <div className="d-flex gap-1 flex-wrap">
      {users.map((user, i) => (
        <Widget
          src="ndcplug.near/widget/ProfileCard.mintNFT"
          props={{
            accountId: user,
          }}
        />
      ))}
    </div>
  </Wrapper>
);
