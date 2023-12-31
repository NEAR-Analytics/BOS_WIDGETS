const {
  hasModerator,
  getFeaturedCommunities,
  getRootMembers,
  getAccessControlInfo,
  setFeaturedCommunities,
  getAllCommunitiesMetadata,
} = VM.require("geforcy.near/widget/core.adapter.devhub-contract");

const { Tile } =
  VM.require("geforcy.near/widget/devhub.components.molecule.Tile") ||
  (() => <></>);

const { href } = VM.require("geforcy.near/widget/core.lib.url");

if (
  !getFeaturedCommunities ||
  !hasModerator ||
  !getRootMembers ||
  !href ||
  !getAccessControlInfo ||
  !setFeaturedCommunities ||
  !getAllCommunitiesMetadata
) {
  return <p>Loading modules...</p>;
}

const fc = getFeaturedCommunities();
// The state will stay empty even after the data right data has been retrieved
if (!fc) {
  return <p>Loading featured communities...</p>;
}
const featuredCommunityList = fc || [];
const allMetadata = getAllCommunitiesMetadata();
const accessControlInfo = getAccessControlInfo();
const rootMembers = getRootMembers();
const teamNames = Object.keys(rootMembers || {});

const isDevHubModerator = hasModerator({
  account_id: context.accountId,
});

const [alertMessage, setAlertMessage] = useState("");
const [communityMessage, setCommunityMessage] = useState("");
const [createTeam, setCreateTeam] = useState(false);
const [communityHandles, setCommunityHandles] = useState(
  featuredCommunityList.map(({ handle }) => handle)
);
const [newItem, setNewItem] = useState("");
const [editMode, setEditMode] = useState(false);
const [previewConnect, setPreviewConnect] = useState(false);

const handleResetItems = () => {
  setCommunityHandles(featuredCommunityList.map(({ handle }) => handle));
};

const handleAddItem = () => {
  if (!allMetadata.map(({ handle }) => handle).includes(newItem)) {
    // Community does not exist
    return setCommunityMessage(
      "This community handle does not exist, make sure you use an existing handle."
    );
  }
  if (newItem) {
    setCommunityHandles([...communityHandles, newItem]);
    setNewItem("");
  }
};

const handleDeleteItem = (index) => {
  const updatedData = [...communityHandles];
  updatedData.splice(index, 1);
  setCommunityHandles(updatedData);
};

const noPermissionBanner = (
  <div
    className="d-flex flex-column justify-content-center align-items-center"
    style={{ height: 384 }}
  >
    <h2 className="alert alert-danger">
      Your account does not have administration permissions.
    </h2>
  </div>
);

if (!isDevHubModerator) {
  return noPermissionBanner;
}

function handleSubmit() {
  if (communityHandles.length < 4) {
    return setCommunityMessage("Can't set fewer than 4 communities");
  }
  setFeaturedCommunities({ handles: communityHandles });
}

function createNewTeam({
  teamName,
  description,
  label,
  editPost,
  useLabels,
  members,
}) {
  let txn = [];

  if (rootMembers.includes(`team:${teamName}`)) {
    return setAlertMessage("This team name already exists");
  }
  const allLabels = Object.keys(accessControlInfo.rules_list);
  if (allLabels.includes(label)) {
    return setAlertMessage("This label is already restricted by another team");
  }

  let membersAndTeams = Object.keys(accessControlInfo.members_list);
  members.forEach((member) => {
    // if Contract panic member does not exist in the members_list
    if (!membersAndTeams.includes(member)) {
      // Add member
      txn.push({
        contractName: "geforcy.near",
        methodName: "add_member",
        args: {
          member: member,
          metadata: {
            member_metadata_version: "V0",
            description: "",
            permissions: {},
            children: [],
            parents: [],
          },
        },
        deposit: Big(0).pow(21),
        gas: Big(10).pow(12).mul(100),
      });
    }
  });

  // Check edit team
  Near.call([
    ...txn,
    {
      contractName: "geforcy.near",
      methodName: "add_member",
      args: {
        member: `team:${teamName}`,
        metadata: {
          member_metadata_version: "V0",
          description: description,
          permissions: {
            [label]: [
              ...(editPost ? ["edit-post"] : []),
              ...(useLabels ? ["use-labels"] : []),
            ],
          },
          children: members,
          parents: [],
        },
      },
      deposit: Big(0).pow(21),
      gas: Big(10).pow(12).mul(100),
    },
  ]);
}

const Item = styled.div`
  padding: 10px;
  margin: 5px;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
`;

const CardGrid = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;

  @media screen and (max-width: 1000px) {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }
`;

return (
  <Container>
    <div className="d-flex flex-column gap-4 p-4">
      {featuredCommunityList && (
        <>
          {editMode ? (
            <>
              <Widget
                src="geforcy.near/widget/devhub.components.atom.Alert"
                props={{
                  onClose: () => setCommunityMessage(""),
                  message: communityMessage,
                }}
              />
              <Tile className="p-3">
                <h3> Manage featured communities</h3>
                {communityHandles.map((item, index) => (
                  <Item key={index}>
                    <div className="flex-grow-1">
                      <Widget
                        src="geforcy.near/widget/devhub.components.molecule.Input"
                        props={{
                          className: "flex-grow-1",
                          value: item,
                          skipPaddingGap: true,
                          placeholder: "Community handle",
                          inputProps: {
                            prefix: "Community handle",
                            disabled: true,
                          },
                        }}
                      />
                    </div>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDeleteItem(index)}
                    >
                      <i className="bi bi-trash-fill" />
                    </button>
                  </Item>
                ))}
                {communityHandles.length < 5 && (
                  <Item>
                    <div className="flex-grow-1">
                      <Widget
                        src="geforcy.near/widget/devhub.components.molecule.Input"
                        props={{
                          className: "flex-grow-1",
                          skipPaddingGap: true,
                          onChange: (e) => setNewItem(e.target.value),
                          value: newItem,
                          placeholder: "zero-knowledge",
                          inputProps: {
                            prefix: "Community handle",
                          },
                        }}
                      />
                    </div>
                    <button
                      className="btn btn-success add-member"
                      onClick={handleAddItem}
                      disabled={newItem === ""}
                    >
                      <i className="bi bi-plus" />
                    </button>
                  </Item>
                )}
                <div
                  className={
                    "d-flex align-items-center justify-content-end gap-3 mt-4"
                  }
                >
                  <Widget
                    src={
                      "geforcy.near/widget/devhub.components.molecule.Button"
                    }
                    props={{
                      classNames: {
                        root: "btn-outline-danger shadow-none border-0",
                      },
                      label: "Cancel",
                      onClick: () => {
                        setEditMode(false);
                        handleResetItems();
                      },
                    }}
                  />
                  <Widget
                    src={
                      "geforcy.near/widget/devhub.components.molecule.Button"
                    }
                    props={{
                      classNames: { root: "btn" },
                      icon: {
                        type: "bootstrap_icon",
                        variant: "bi-check-circle-fill",
                      },
                      label: "Submit",
                      onClick: () => handleSubmit(),
                    }}
                  />
                </div>
              </Tile>
              <Widget
                src={
                  "geforcy.near/widget/devhub.components.molecule.PostControls"
                }
                props={{
                  onClick: () => setPreviewConnect(!previewConnect),
                  icon: previewConnect ? "bi bi-toggle-on" : "bi bi-toggle-off",
                  title: "Preview homepage",
                  testId: "preview-homepage",
                }}
              />
            </>
          ) : (
            <Widget
              src={
                "geforcy.near/widget/devhub.components.molecule.PostControls"
              }
              props={{
                onClick: () => setEditMode(true),
                icon: "bi bi-gear-wide-connected",
                title: "Manage featured communities",
                testId: "manage-featured",
              }}
            />
          )}
        </>
      )}
      {previewConnect && (
        <Widget
          src="geforcy.near/widget/devhub.components.island.connect"
          props={{ ...props }}
        />
      )}
      <h1>Admin group</h1>
      {teamNames.includes("team:moderators") && (
        <>
          <Widget
            src={"geforcy.near/widget/devhub.entity.team.TeamInfo"}
            props={{
              teamName: "team:moderators",
            }}
          />
          <Widget
            src="geforcy.near/widget/devhub.components.atom.Alert"
            props={{
              onClose: () => setAlertMessage(""),
              message: alertMessage,
            }}
          />
        </>
      )}
      <h1>Other groups</h1>
      {(teamNames || []).sort().map((teamName) => {
        if (teamName === "team:moderators") return;
        return (
          <Widget
            src={"geforcy.near/widget/devhub.entity.team.TeamInfo"}
            props={{
              teamName,
            }}
          />
        );
      })}

      {!createTeam ? (
        <Widget
          src={"geforcy.near/widget/devhub.components.molecule.PostControls"}
          props={{
            onClick: () => setCreateTeam(true),
            title: "Create team",
            testId: "create-team",
          }}
        />
      ) : (
        <Widget
          src={"geforcy.near/widget/devhub.entity.team.Configurator"}
          props={{
            onCancel: () => setCreateTeam(false),
            onSubmit: (params) => createNewTeam(params),
          }}
        />
      )}
    </div>
  </Container>
);
