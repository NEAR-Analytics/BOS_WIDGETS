/* INCLUDE: "common.jsx" */
const nearDevGovGigsContractAccountId =
  props.nearDevGovGigsContractAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];

const nearDevGovGigsWidgetsAccountId =
  props.nearDevGovGigsWidgetsAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];

function widget(widgetName, widgetProps, key) {
  widgetProps = {
    ...widgetProps,
    nearDevGovGigsContractAccountId: props.nearDevGovGigsContractAccountId,
    nearDevGovGigsWidgetsAccountId: props.nearDevGovGigsWidgetsAccountId,
    referral: props.referral,
  };

  return (
    <Widget
      src={`${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.${widgetName}`}
      props={widgetProps}
      key={key}
    />
  );
}

function href(widgetName, linkProps) {
  linkProps = { ...linkProps };

  if (props.nearDevGovGigsContractAccountId) {
    linkProps.nearDevGovGigsContractAccountId =
      props.nearDevGovGigsContractAccountId;
  }

  if (props.nearDevGovGigsWidgetsAccountId) {
    linkProps.nearDevGovGigsWidgetsAccountId =
      props.nearDevGovGigsWidgetsAccountId;
  }

  if (props.referral) {
    linkProps.referral = props.referral;
  }

  const linkPropsQuery = Object.entries(linkProps)
    .filter(([_key, nullable]) => (nullable ?? null) !== null)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return `/#/${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.pages.${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}
/* END_INCLUDE: "common.jsx" */
/* INCLUDE: "core/lib/struct" */
const Struct = {
  deepFieldUpdate: (
    node,
    { input, params, path: [nextNodeKey, ...remainingPath], via: toFieldValue }
  ) => ({
    ...node,

    [nextNodeKey]:
      remainingPath.length > 0
        ? Struct.deepFieldUpdate(
            Struct.typeMatch(node[nextNodeKey]) ||
              Array.isArray(node[nextNodeKey])
              ? node[nextNodeKey]
              : {
                  ...((node[nextNodeKey] ?? null) !== null
                    ? { __archivedLeaf__: node[nextNodeKey] }
                    : {}),
                },

            { input, path: remainingPath, via: toFieldValue }
          )
        : toFieldValue({
            input,
            lastKnownValue: node[nextNodeKey],
            params,
          }),
  }),

  isEqual: (input1, input2) =>
    Struct.typeMatch(input1) && Struct.typeMatch(input2)
      ? JSON.stringify(Struct.toOrdered(input1)) ===
        JSON.stringify(Struct.toOrdered(input2))
      : false,

  toOrdered: (input) =>
    Object.keys(input)
      .sort()
      .reduce((output, key) => ({ ...output, [key]: input[key] }), {}),

  pick: (object, subsetKeys) =>
    Object.fromEntries(
      Object.entries(object ?? {}).filter(([key, _]) =>
        subsetKeys.includes(key)
      )
    ),

  typeMatch: (input) =>
    input !== null && typeof input === "object" && !Array.isArray(input),
};
/* END_INCLUDE: "core/lib/struct" */
/* INCLUDE: "core/adapter/dev-hub" */
const devHubAccountId =
  props.nearDevGovGigsContractAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];

const DevHub = {
  get_root_members: () =>
    Near.view(devHubAccountId, "get_root_members") ?? null,

  has_moderator: ({ account_id }) =>
    Near.view(devHubAccountId, "has_moderator", { account_id }) ?? null,

  create_community: ({ inputs }) =>
    Near.call(devHubAccountId, "create_community", { inputs }),

  get_community: ({ handle }) =>
    Near.view(devHubAccountId, "get_community", { handle }) ?? null,

  get_account_community_permissions: ({ account_id, community_handle }) =>
    Near.view(devHubAccountId, "get_account_community_permissions", {
      account_id,
      community_handle,
    }) ?? null,

  update_community: ({ handle, community }) =>
    Near.call(devHubAccountId, "update_community", { handle, community }),

  delete_community: ({ handle }) =>
    Near.call(devHubAccountId, "delete_community", { handle }),

  update_community_board: ({ handle, board }) =>
    Near.call(devHubAccountId, "update_community_board", { handle, board }),

  update_community_github: ({ handle, github }) =>
    Near.call(devHubAccountId, "update_community_github", { handle, github }),

  add_community_addon: ({ handle, config }) =>
    Near.call(devHubAccountId, "add_community_addon", {
      community_handle: handle,
      addon_config: config,
    }),

  update_community_addon: ({ handle, config }) =>
    Near.call(devHubAccountId, "update_community_addon", {
      community_handle: handle,
      addon_config: config,
    }),

  remove_community_addon: ({ handle, config_id }) =>
    Near.call(devHubAccountId, "remove_community_addon", {
      community_handle: handle,
      config_id,
    }),

  get_access_control_info: () =>
    Near.view(devHubAccountId, "get_access_control_info") ?? null,

  get_all_authors: () => Near.view(devHubAccountId, "get_all_authors") ?? null,

  get_all_communities_metadata: () =>
    Near.view(devHubAccountId, "get_all_communities_metadata") ?? null,

  get_available_addons: () =>
    Near.view(devHubAccountId, "get_available_addons") ?? null,

  get_community_addons: ({ handle }) =>
    Near.view(devHubAccountId, "get_community_addons", { handle }),
  get_community_addon_configs: ({ handle }) =>
    Near.view(devHubAccountId, "get_community_addon_configs", { handle }),

  get_all_labels: () => Near.view(devHubAccountId, "get_all_labels") ?? null,

  get_post: ({ post_id }) =>
    Near.view(devHubAccountId, "get_post", { post_id }) ?? null,

  get_posts_by_author: ({ author }) =>
    Near.view(devHubAccountId, "get_posts_by_author", { author }) ?? null,

  get_posts_by_label: ({ label }) =>
    Near.view(nearDevGovGigsContractAccountId, "get_posts_by_label", {
      label,
    }) ?? null,

  useQuery: (name, params) => {
    const initialState = { data: null, error: null, isLoading: true };

    const cacheState = useCache(
      () =>
        Near.asyncView(devHubAccountId, ["get", name].join("_"), params ?? {})
          .then((response) => ({
            ...initialState,
            data: response ?? null,
            isLoading: false,
          }))
          .catch((error) => ({
            ...initialState,
            error: props?.error ?? error,
            isLoading: false,
          })),

      JSON.stringify({ name, params }),
      { subscribe: true }
    );

    return cacheState === null ? initialState : cacheState;
  },
};
/* END_INCLUDE: "core/adapter/dev-hub" */
/* INCLUDE: "entity/viewer" */
const Viewer = {
  communityPermissions: ({ handle }) =>
    DevHub.get_account_community_permissions({
      account_id: context.accountId,
      community_handle: handle,
    }) ?? {
      can_configure: false,
      can_delete: false,
    },

  role: {
    isDevHubModerator:
      DevHub.has_moderator({ account_id: context.accountId }) ?? false,
  },
};
/* END_INCLUDE: "entity/viewer" */

const CommunityAddonSchema = (id) => ({
  [id + "tabname"]: {
    inputProps: {
      min: 2,
      max: 30,
      placeholder: "Tab name",
      required: true,
    },
    label: "Tab name",
    order: 1,
  },
  [id + "parameters"]: {
    // TODO type JSON string with parameters??
    order: 2,
    label: "Parameters",
  },
  [id + "enabled"]: {
    // TODO type boolean
    label: "Enabled",
    order: 3,
  },
});

const CommunityInformationSchema = {
  handle: {
    inputProps: {
      min: 2,
      max: 40,

      placeholder:
        "Choose unique URL handle for your community. Example: zero-knowledge.",

      required: true,
    },

    label: "URL handle",
    order: 3,
  },

  name: {
    inputProps: {
      min: 2,
      max: 30,
      placeholder: "Community name.",
      required: true,
    },

    label: "Name",
    order: 1,
  },

  tag: {
    inputProps: {
      min: 2,
      max: 30,

      placeholder:
        "Any posts with this tag will show up in your community feed.",

      required: true,
    },

    label: "Tag",
    order: 4,
  },

  description: {
    inputProps: {
      min: 2,
      max: 60,

      placeholder:
        "Describe your community in one short sentence that will appear in the communities discovery page.",

      required: true,
    },

    label: "Description",
    order: 2,
  },
};

const CommunityAboutSchema = {
  bio_markdown: {
    format: "markdown",

    inputProps: {
      min: 3,
      max: 200,

      placeholder:
        "Tell people about your community. This will appear on your community’s homepage.",

      resize: "none",
    },

    label: "Bio",
    multiline: true,
    order: 1,
  },

  twitter_handle: {
    inputProps: { prefix: "https://twitter.com/", min: 2, max: 60 },
    label: "Twitter",
    order: 2,
  },

  github_handle: {
    inputProps: { prefix: "https://github.com/", min: 2, max: 60 },
    label: "Github",
    order: 3,
  },

  telegram_handle: {
    inputProps: { prefix: "https://t.me/", min: 2, max: 60 },
    format: "comma-separated",
    label: "Telegram",
    order: 4,
  },

  website_url: {
    inputProps: { prefix: "https://", min: 2, max: 60 },
    label: "Website",
    order: 5,
  },
};

const CommunityAccessControlSchema = {
  admins: {
    format: "comma-separated",
    inputProps: { required: true },
    label: "Admins",
    order: 1,
  },
};

const communityAccessControlFormatter = ({ admins, ...otherFields }) => ({
  ...otherFields,
  admins: admins.filter((string) => string.length > 0),
});

const CenteredMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${(p) => p.height ?? "100%"};
`;

const { handle, link } = props;

const community = DevHub.useQuery("community", { handle }), // We don't need to useQuery
  permissions = Viewer.communityPermissions({ handle });

if (community.isLoading) {
  return (
    <CenteredMessage height={"384px"}>
      <h2>Loading...</h2>
    </CenteredMessage>
  );
} else if (!community.data) {
  return (
    <CenteredMessage height={"384px"}>
      <h2>{`Community with handle "${handle}" not found.`}</h2>
    </CenteredMessage>
  );
}

const [communityData, setCommunityData] = useState(community.data);
const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
console.log({communityData});
// MIGRATION MODULE
const withMigrate = (scenarios, data) => {
  for (let scenario of scenarios) {
    if (scenario.condition(data)) {
      return {
        identifier: scenario.identifier,
        migrate: () => scenario.migrate(data),
        output: scenario.output,
      };
    }
  }
  console.log("No migration or unknown scenario");
  return null;
};

const migrationScenarios = [
  {
    identifier: "253", // Issue #253
    condition: (data) => data.github || data.board || data.wiki1 || data.wiki2,
    // condition: (data) => true,
    migrate: (data) => console.log("Migrate with scenario 253: ", data),
    output: (data, migrate) => (
      <>
        {permissions.can_configure && (
          <button onClick={() => migrate(data)}>Migrate</button>
        )}
        {widget("entity.community.configurator.old", { handle, link })}
      </>
    ),
  },
];

const MigrationResponse = withMigrate(migrationScenarios, communityData);

// TODO
if (MigrationResponse) {
  const { output: Component, migrate } = MigrationResponse;
  return <Component data={communityData} migrate={migrate} />;
}

const availableAddons = DevHub.get_available_addons();
const communityAddonConfigs = DevHub.get_community_addon_configs({ handle });

// const refac = (configs) => 
// TODO use in submit Section
const [addonConfigData, setAddonConfigData] = useState(communityAddonConfigs);
// TODO refactor in such a way that it can be manipulated for every addon
// Also change parameters to be flexible
console.log({addonConfigData});


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

const updateAddonConfig = (formData, addonConfig) => {
  console.log({ formData, addonConfig });
  let newConfig = {
    ...addonConfig,
    ...formData,
  };
  console.log({newConfig});
  DevHub.update_community_addon({
    handle,
    config: {
      // TODO replace by addonData
      config_id: "kanban",
      addon_id: "kanban",
      parameters: "{}",
      enabled: true,
      name: "Kanban4",
    },
  });
};

const changesSave = () =>
  DevHub.update_community({ handle, community: communityData });

const onDeleteCommunity = () => DevHub.delete_community({ handle });

const UUID = {
  generate: (template) => {
    if (typeof template !== "string") {
      template = "xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx";
    }
    return template.replace(/[xy]/g, (c) => {
      var r = (Math.random() * 16) | 0;
      var v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },
};

const handleCreateAddon = (addon_id, values) => {
  const uuid = UUID.generate("xxxxxxx");
  DevHub.add_community_addon({
    handle,
    config: {
      name: "Wiki",
      config_id: uuid,
      addon_id,
      parameters: JSON.stringify(values),
      enabled: true,
    },
  });
};

const handleDeleteCommunityAddonConfig = (config_id) => {
  DevHub.remove_community_addon({ handle, config_id });
};

const handleUpdateCommunityAddonConfig = (config) => {
  DevHub.update_community_addon({ handle, config });
};

return (
  <div
    className="d-flex flex-column align-items-center gap-4 w-100"
    style={{ maxWidth: 960 }}
  >
    {widget("entity.community.branding-configurator", {
      isUnlocked: permissions.can_configure,
      link,
      onSubmit: sectionSubmit,
      values: communityData,
    })}

    {widget("components.organism.configurator", {
      heading: "Community information",
      externalState: communityData,
      fullWidth: true,
      isSubform: true,
      isUnlocked: permissions.can_configure,
      onSubmit: sectionSubmit,
      schema: CommunityInformationSchema,
      submitLabel: "Accept",
    })}
    {widget("components.organism.configurator", {
      heading: "About",
      externalState: communityData,
      fullWidth: true,
      isSubform: true,
      isUnlocked: permissions.can_configure,
      onSubmit: sectionSubmit,
      schema: CommunityAboutSchema,
      submitLabel: "Accept",
    })}

    {widget("components.organism.configurator", {
      heading: "Access control",
      externalState: communityData,
      fullWidth: true,
      formatter: communityAccessControlFormatter,
      isSubform: true,
      isUnlocked: permissions.can_configure,
      onSubmit: sectionSubmit,
      schema: CommunityAccessControlSchema,
      submitLabel: "Accept",
    })}

    {communityAddonConfigs &&
      communityAddonConfigs.map((addon) => {
        const match = availableAddons.find((it) => it.id === addon.addon_id);
        // TODO 
        /**
               * widget("entity.workspace.view.kanban.configurator", {
            communityHandle: handle,
            link: "https://near.org" + href("community.board", { handle }),
            permissions,
          })
         */
        if (match) {
          return (
            <>
              {widget("entity.community.configurator.section", {
                heading: addon.name,
                hasPermissionToConfgure: permissions.can_configure,
                configurator: (
                  p // TODO: Add support for changing the name and enable/disable, and delete if not created yet
                ) =>
                  widget(match.configurator, {
                    data: JSON.parse(addon.parameters),
                    // BEGIN TODO make this dynamic bc this is only used for the github/kanban boards
                    communityHandle: handle,
                    link: "https://near.org" + href("community.board", { handle }),
                    permissions,// community permissions
                    // END
                    onSubmit: (value) =>
                      handleUpdateCommunityAddonConfig({
                        ...addon,
                        parameters: JSON.stringify(value),
                      }),
                    ...p,
                  }),
              })}
              <button
                onClick={() =>
                  handleDeleteCommunityAddonConfig(addon.config_id)
                }
              >
                delete
              </button>
            </>
          );
        } else {
          return widget("components.molecule.tile", {
            children: "Unknown addon with addon ID: " + addon.id,
          });
        }
      })}

    {state.selectedAddon &&
      widget("entity.community.configurator.section", {
        heading: "New " + state.selectedAddon.title,
        headerSlotRight: widget("components.molecule.button", {
          classNames: { root: "btn-sm btn-secondary" },
          icon: {
            kind: "bootstrap-icon",
            variant: "bi-x-circle",
          },
          label: "Cancel",
          onClick: () => State.update({ selectedAddon: null }),
        }),
        isEditActive: true,
        hasPermissionToConfgure: permissions.can_configure,
        configurator: (
          p // TODO: Add support for changing the name and enable/disable
        ) =>
          widget(state.selectedAddon.configurator, {
            onSubmit: (value) =>
              handleCreateAddon(state.selectedAddon.id, value),
            ...p,
          }),
      })}

    {availableAddons &&
      permissions.can_configure &&
      widget("components.molecule.tile", {
        heading: "Add new addon",
        fullWidth: true,
        children: (
          <Widget
            src={`${
              context.networkId === "mainnet" ? "near" : "discom.testnet"
            }/widget/DIG.InputSelect`} // if mainnet, replace discom.testnet with "near"
            props={{
              groups: [
                {
                  items: (availableAddons || []).map((it) => ({
                    label: it.title,
                    value: it.id,
                  })),
                },
              ],
              rootProps: {
                value: state.selectedAddon.id ?? null,
                onValueChange: (value) => {
                  State.update({
                    selectedAddon: (availableAddons || []).find(
                      (it) => it.id === value
                    ),
                  });
                },
              },
            }}
          />
        ),
      })}

    {permissions.can_delete ? (
      <div
        className="d-flex justify-content-center gap-4 p-4 w-100"
        style={{ maxWidth: 896 }}
      >
        {widget("components.molecule.button", {
          classNames: { root: "btn-lg btn-outline-danger border-none" },
          label: "Delete community",
          onClick: onDelete,
        })}
      </div>
    ) : null}
    {permissions.can_configure && hasUnsavedChanges && (
      <div
        className="position-fixed end-0 bottom-0 bg-transparent pe-4 pb-4"
        style={{ borderTopLeftRadius: "100%" }}
      >
        {widget("components.molecule.button", {
          classNames: { root: "btn-lg btn-success" },
          icon: { kind: "svg", variant: "floppy-drive" },
          label: "Save",
          onClick: changesSave,
        })}
      </div>
    )}
  </div>
);
