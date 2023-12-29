function getRootMembers() {
  return Near.view("devgovgigs.near", "get_root_members") ?? null;
}

function removeMember(member) {
  return Near.call("devgovgigs.near", "remove_member", { member });
}

function hasModerator({ account_id }) {
  return (
    Near.view("devgovgigs.near", "has_moderator", { account_id }) ??
    null
  );
}

function createCommunity({ inputs }) {
  return Near.call("devgovgigs.near", "create_community", { inputs });
}

function getCommunity({ handle }) {
  return (
    Near.view("devgovgigs.near", "get_community", { handle }) ?? null
  );
}

function getFeaturedCommunities() {
  return (
    Near.view("devgovgigs.near", "get_featured_communities") ?? null
  );
}

function setFeaturedCommunities({ handles }) {
  return Near.call("devgovgigs.near", "set_featured_communities", {
    handles,
  });
}

function getAccountCommunityPermissions({ account_id, community_handle }) {
  return (
    Near.view("devgovgigs.near", "get_account_community_permissions", {
      account_id,
      community_handle,
    }) ?? null
  );
}

function updateCommunity({ handle, community }) {
  return Near.call("devgovgigs.near", "update_community", {
    handle,
    community,
  });
}

function deleteCommunity({ handle }) {
  return Near.call("devgovgigs.near", "delete_community", { handle });
}

function updateCommunityBoard({ handle, board }) {
  return Near.call("devgovgigs.near", "update_community_board", {
    handle,
    board,
  });
}

function updateCommunityGithub({ handle, github }) {
  return Near.call("devgovgigs.near", "update_community_github", {
    handle,
    github,
  });
}

/**
 * Sets all addons, for configurating tabs
 */
function setCommunityAddons({ handle, addons }) {
  return Near.call("devgovgigs.near", "set_community_addons", {
    handle,
    addons,
  });
}

/**
 * Sets specific addon, for configuring params
 */
function setCommunityAddon({ handle, addon }) {
  return Near.call("devgovgigs.near", "set_community_addon", {
    handle,
    community_addon: addon,
  });
}

/**
 * Gets all available addons, these are controlled by devhub moderators
 */
function getAllAddons() {
  return Near.view("devgovgigs.near", "get_all_addons") ?? null;
}

function getAccessControlInfo() {
  return (
    Near.view("devgovgigs.near", "get_access_control_info") ?? null
  );
}

function getAllAuthors() {
  return Near.view("devgovgigs.near", "get_all_authors") ?? null;
}

function getAllCommunitiesMetadata() {
  return (
    Near.view("devgovgigs.near", "get_all_communities_metadata") ?? null
  );
}

function getAvailableAddons() {
  return [
    {
      id: "wiki",
      title: "Wiki",
      description: "Create a wiki for your community",
      view_widget: "itexpert120-contra.near/widget/devhub.entity.addon.wiki.Viewer",
      configurator_widget:
        "itexpert120-contra.near/widget/devhub.entity.addon.wiki.Configurator",
    },
    {
      id: "telegram",
      title: "Telegram",
      description: "Connect your telegram",
      view_widget: "itexpert120-contra.near/widget/devhub.entity.addon.telegram.Viewer",
      configurator_widget:
        "itexpert120-contra.near/widget/devhub.entity.addon.telegram.Configurator",
    },
    {
      id: "github",
      title: "Github",
      description: "Connect your github",
      view_widget: "itexpert120-contra.near/widget/devhub.entity.addon.github.Viewer",
      configurator_widget:
        "itexpert120-contra.near/widget/devhub.entity.addon.github.Configurator",
    },
    {
      id: "kanban",
      title: "Kanban",
      description: "Connect your github kanban board",
      view_widget: "itexpert120-contra.near/widget/devhub.entity.addon.kanban.Viewer",
      configurator_widget:
        "itexpert120-contra.near/widget/devhub.entity.addon.kanban.Configurator",
    },
    {
      id: "blog",
      title: "Blog",
      description: "Create a blog for your community",
      view_widget: "itexpert120-contra.near/widget/devhub.entity.addon.blog.Viewer",
      configurator_widget:
        "itexpert120-contra.near/widget/devhub.entity.addon.blog.Configurator",
    },
  ];
  // return Near.view("devgovgigs.near", "get_available_addons") ?? null;
}

function getCommunityAddons({ handle }) {
  return Near.view("devgovgigs.near", "get_community_addons", {
    handle,
  });
}

function getCommunityAddonConfigs({ handle }) {
  return Near.view("devgovgigs.near", "get_community_addon_configs", {
    handle,
  });
}

function getAllLabels() {
  return Near.view("devgovgigs.near", "get_all_labels") ?? null;
}

function getPost({ post_id }) {
  return Near.view("devgovgigs.near", "get_post", { post_id }) ?? null;
}

function getPostsByAuthor({ author }) {
  return (
    Near.view("devgovgigs.near", "get_posts_by_author", { author }) ??
    null
  );
}

function getPostsByLabel({ label }) {
  return (
    Near.view("devgovgigs.near", "get_posts_by_label", {
      label,
    }) ?? null
  );
}

function useQuery(name, params) {
  const initialState = { data: null, error: null, isLoading: true };

  const cacheState = useCache(
    () =>
      Near.asyncView(
        "devgovgigs.near",
        ["get", name].join("_"),
        params ?? {}
      )
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
    { subscribe: false } // NOTE: I'm turning off subscribe to stop the constant re-rendering
  );

  return cacheState === null ? initialState : cacheState;
}

return {
  getRootMembers,
  removeMember,
  hasModerator,
  createCommunity,
  getCommunity,
  getFeaturedCommunities,
  setFeaturedCommunities,
  getAccountCommunityPermissions,
  updateCommunity,
  deleteCommunity,
  updateCommunityBoard,
  updateCommunityGithub,
  setCommunityAddons,
  setCommunityAddon,
  getAccessControlInfo,
  getAllAuthors,
  getAllCommunitiesMetadata,
  getAllAddons,
  getCommunityAddons,
  getCommunityAddonConfigs,
  getAllLabels,
  getPost,
  getPostsByAuthor,
  getPostsByLabel,
  useQuery,
};
