function getRootMembers() {
  return Near.view("devgovgigs.near", "get_root_members") ?? null;
}

function removeMember(member) {
  return Near.call("devgovgigs.near", "remove_member", { member });
}

function hasModerator({ account_id }) {
  return (
    Near.view("devgovgigs.near", "has_moderator", { account_id }) ?? null
  );
}

function createCommunity({ inputs }) {
  return Near.call(
    "devhub-dev.testnet",
    "create_community",
    { inputs },
    Big(10).pow(14), // gas
    Big(2) * Big(10).pow(24) // deposit (2N)
  );
}

function getCommunity({ handle }) {
  return (
    Near.view("devhub-dev.testnet", "get_community", { handle }) ?? null
  );
}

function getFeaturedCommunities() {
  return Near.view("devgovgigs.near", "get_featured_communities") ?? null;
}

function setFeaturedCommunities({ handles }) {
  return Near.call("devhub-dev.testnet", "set_featured_communities", {
    handles,
  });
}

function getAccountCommunityPermissions({ account_id, community_handle }) {
  return (
    Near.view("devhub-dev.testnet", "get_account_community_permissions", {
      account_id,
      community_handle,
    }) ?? null
  );
}

function updateCommunity({ handle, community }) {
  return Near.call("devhub-dev.testnet", "update_community", {
    handle,
    community,
  });
}

function deleteCommunity({ handle }) {
  return Near.call("devhub-dev.testnet", "delete_community", { handle });
}

/**
 * Sets all addons, for configurating tabs
 */
function setCommunityAddons({ handle, addons }) {
  return Near.call("devhub-dev.testnet", "set_community_addons", {
    handle,
    addons,
  });
}

/**
 * Sets specific addon, for configuring params
 */
function setCommunityAddon({ handle, addon }) {
  return Near.call("devhub-dev.testnet", "set_community_addon", {
    handle,
    community_addon: addon,
  });
}

/**
 * Gets all available addons, these are controlled by devhub moderators
 */
function getAllAddons() {
  return Near.view("devhub-dev.testnet", "get_all_addons") ?? null;
}

function getAccessControlInfo() {
  return Near.view("devgovgigs.near", "get_access_control_info") ?? null;
}

function getAllAuthors() {
  return Near.view("devgovgigs.near", "get_all_authors") ?? null;
}

function getAllCommunitiesMetadata() {
  return (
    Near.view("devhub-dev.testnet", "get_all_communities_metadata") ?? null
  );
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

function setCommunitySocialDB({ handle, data }) {
  return (
    Near.call("devhub-dev.testnet", "set_community_socialdb", {
      handle,
      data,
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
  setCommunityAddons,
  setCommunityAddon,
  getAccessControlInfo,
  getAllAuthors,
  getAllCommunitiesMetadata,
  getAllAddons,
  getAllLabels,
  getPost,
  getPostsByAuthor,
  getPostsByLabel,
  setCommunitySocialDB,
  useQuery,
};
