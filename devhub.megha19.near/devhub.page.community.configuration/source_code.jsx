const { Tile } =
  VM.require("devhub.megha19.near/widget/devhub.components.molecule.Tile") ||
  (() => <></>);

if (!Tile) {
  return <div>Loading...</div>;
}

const {
  permissions,
  handle,
  community,
  setCommunityAddons,
  deleteCommunity,
  updateCommunity,
} = props;

const [communityData, setCommunityData] = useState(community || {});
const [selectedAddon, setSelectedAddon] = useState(null);
const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

const sectionSubmit = (sectionData) => {
  const updatedCommunityData = {
    ...Object.entries(sectionData).reduce(
      (update, [propertyKey, propertyValue]) => ({
        ...update,

        [propertyKey]:
          typeof propertyValue !== "string" || (propertyValue?.length ?? 0) > 0
            ? propertyValue ?? null
            : null,
      }),

      communityData
    ),
  };
  setCommunityData(updatedCommunityData);
  setHasUnsavedChanges(true);
};

const hasConfigurePermissions = permissions.can_configure;
const hasDeletePermissions = permissions.can_delete;

return (
  <div
    className="d-flex flex-column align-items-center gap-4 w-100 p-4"
    style={{ maxWidth: 960, marginBottom: "60px" }}
  >
    <Tile className={"bg-white"}>
      <Widget
        src={
          "devhub.megha19.near/widget/devhub.entity.community.configuration.BrandingConfigurator"
        }
        props={{
          onSubmit: sectionSubmit,
          data: communityData,
          hasConfigurePermissions,
          link: `/devhub.megha19.near/widget/app?page=community&handle=${handle}`,
        }}
      />
    </Tile>
    <Tile className={"p-3 bg-white"}>
      <Widget
        src={
          "devhub.megha19.near/widget/devhub.entity.community.configuration.ConfigurationSection"
        }
        props={{
          title: "Community Information",
          hasConfigurePermissions,
          Configurator: (p) => (
            <Widget
              src={
                "devhub.megha19.near/widget/devhub.entity.community.configuration.InformationConfigurator"
              }
              props={{
                data: communityData,
                onSubmit: sectionSubmit,
                ...p,
              }}
            />
          ),
        }}
      />
    </Tile>
    <Tile className={"p-3 bg-white"}>
      <Widget
        src={
          "devhub.megha19.near/widget/devhub.entity.community.configuration.ConfigurationSection"
        }
        props={{
          title: "About",
          hasConfigurePermissions,
          Configurator: (p) => (
            <Widget
              src={
                "devhub.megha19.near/widget/devhub.entity.community.configuration.AboutConfigurator"
              }
              props={{
                data: communityData,
                onSubmit: sectionSubmit,
                ...p,
              }}
            />
          ),
        }}
      />
    </Tile>
    <Tile className={"p-3 bg-white"}>
      <Widget
        src={
          "devhub.megha19.near/widget/devhub.entity.community.configuration.ConfigurationSection"
        }
        props={{
          title: "Community Admins",
          hasConfigurePermissions,
          Configurator: (p) => (
            <Widget
              src={
                "devhub.megha19.near/widget/devhub.entity.community.configuration.AccessControlConfigurator"
              }
              props={{
                data: communityData,
                onSubmit: sectionSubmit,
                ...p,
              }}
            />
          ),
        }}
      />
    </Tile>
    {hasConfigurePermissions && (
      <Tile className={"p-3 bg-white"}>
        <Widget
          src={
            "devhub.megha19.near/widget/devhub.entity.community.configuration.ConfigurationSection"
          }
          props={{
            title: "Add-Ons",
            hasConfigurePermissions,
            Configurator: (p) => (
              <Widget
                src={
                  "devhub.megha19.near/widget/devhub.entity.community.configuration.AddonsConfigurator"
                }
                props={{
                  data: communityData.addons || [],
                  onSubmit: (v) => setCommunityAddons({ handle, addons: v }),
                  ...p,
                }}
              />
            ),
          }}
        />
      </Tile>
    )}
    {hasDeletePermissions && (
      <div
        className="d-flex justify-content-center gap-4 p-4 w-100"
        style={{ maxWidth: 896 }}
      >
        <Widget
          src={"devhub.megha19.near/widget/devhub.components.molecule.Button"}
          props={{
            classNames: { root: "btn-lg btn-outline-danger border-none" },
            label: "Delete community",
            onClick: () => deleteCommunity({ handle }),
          }}
        />
      </div>
    )}
    {hasConfigurePermissions && hasUnsavedChanges && (
      <div
        className="position-fixed end-0 bottom-0 bg-transparent pe-4 pb-4"
        style={{ borderTopLeftRadius: "100%" }}
      >
        <Widget
          src={"devhub.megha19.near/widget/devhub.components.molecule.Button"}
          props={{
            classNames: { root: "btn-lg btn-success" },
            icon: { type: "svg_icon", variant: "floppy_drive" },
            label: "Save",
            onClick: () =>
              updateCommunity({ handle, community: communityData }), // TODO : Track changes in State
          }}
        />
      </div>
    )}
  </div>
);
