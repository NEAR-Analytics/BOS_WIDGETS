const $ = VM.require(`sdks.near/widget/Loader`);
const { Constants, Interfaces, HealthAPI } = $("@sdks/lens");
const { LightClient } = $("@sdks/light-client");

const LensSDK = {
  profile: Interfaces.PROFILE_INTERFACE,
  enableTestnet: () => (LightClient.url = Constants.TESTNET_URL),
  enableMainnet: () => (LightClient.url = Constants.MAINNET_URL),
  isTestnet: () => LightClient.url == Constants.TESTNET_URL,
  init: () => {
    LensSDK.enableMainnet();
    LightClient.auth = Interfaces.AUTH_INTERFACE;
    LightClient.challenge = Interfaces.AUTH_CHALLENGE_INTERFACE;
    LightClient.tokenLifespan = Constants.JWT_TOKEN_LIFESPAN_SECONDS;
    LightClient.refreshTokenLifespan = Constants.JWT_REFRESH_TOKEN_LIFESPAN_SECONDS;

    return LensSDK;
  },
  health: {
    ping: () =>
      HealthAPI.ping(LightClient).then(
        (response) => response == Constants.RESPONSE_HEALTH_OK
      ),
  },
  authentication: {
    login: () => {},
    refresh: () => {},
    revoke: () => {},
    verify: () => {},
    list: () => {},
    isAuthenticated: () => false,
    getAccessToken: () => LightClient.auth.accessToken,
    getProfileId: () => LensSDK.profile.id || null,
  },
  profile: {
    create: () => {},
    fetch: (profileId) => {},
    fetchAll: (profileIds) => {},
    stats: (profileId) => {},
    recommendations: (profileId) => {},
    interests: (profileId) => {},
    report: (profileId) => {},
    block: (profileId) => {},
    history: () => {},
    onChainIdentity: (profileId) => {},
    isFollowedByMe: (profileId) => {},
    isBlockedByMe: (profileId) => {},
    isFollowingMe: (profileId) => {},
    canFollow: (profileId) => {},
    canUnfollow: (profileId) => {},
    canBlock: (profileId) => {},
    canUnblock: (profileId) => {},
    fetchPublications: (profileId) => LensSDK.fetchAll(profileId),
  },
  publication: {
    fetch: (publicationId) => {},
    fetchAll: (profileId) => {},
    stats: (publicationId) => {},
    whoActed: (publicationId) => {},
    comments: (publicationId) => {},
    upvote: (publicationId) => {},
    downvote: (publicationId) => {},
    hide: (publicationId) => {},
    report: (publicationId) => {},
  },
  search: {
    profiles: (searchTerm) => {},
    publications: (searchTerm) => {},
  },
  notifications: {
    fetch: () => {},
  },
  transaction: {
    status: () => {},
    txIdToTxHash: () => {},
  },
};

return LensSDK.init();
