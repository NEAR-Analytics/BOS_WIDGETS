const $ = VM.require(`sdks.near/widget/Loader`);
const { Constants, Interfaces, HealthAPI, AuthAPI, AuthRequests, ApiHelper } =
  $("@sdks/lens");
const { LightClient } = $("@sdks/light-client");

const LensSDK = {
  profile: Interfaces.PROFILE_INTERFACE,
  enableTestnet: () => (LightClient.url = Constants.TESTNET_URL),
  enableMainnet: () => (LightClient.url = Constants.MAINNET_URL),
  isTestnet: () => LightClient.url == Constants.TESTNET_URL,
  init: () => {
    LensSDK.enableMainnet();
    LightClient.auth = Interfaces.AUTH_INTERFACE;
    LightClient.tokenLifespan = Constants.JWT_TOKEN_LIFESPAN_SECONDS;
    LightClient.refreshTokenLifespan =
      Constants.JWT_REFRESH_TOKEN_LIFESPAN_SECONDS;

    return LensSDK;
  },
  health: {
    ping: () =>
      LensSDK._call(HealthAPI.ping).then(
        (response) => response == Constants.RESPONSE_HEALTH_OK
      ),
  },
  authentication: {
    profiles: (profilesManagedRequest) =>
      LensSDK._call(
        AuthAPI.profiles,
        AuthRequests.PROFILES_MANAGED_REQUEST,
        profilesManagedRequest
      ),
    login: (challengeRequest) =>
      LensSDK._call(
        AuthAPI.challenge,
        AuthRequests.CHALLENGE_REQUEST,
        challengeRequest
      ).then((challenge) =>
        Ethers.provider()
          .getSigner()
          .signMessage(challenge.text)
          .then((signature) => {
            let signedAuthChallengeRequest =
              AuthRequests.SIGNED_AUTH_CHALLENGE_REQUEST;
            signedAuthChallengeRequest.id = challenge.id;
            signedAuthChallengeRequest.signature = signature;

            return LensSDK._call(
              AuthAPI.authenticate,
              AuthRequests.SIGNED_AUTH_CHALLENGE_REQUEST,
              signedAuthChallengeRequest
            ).then((auth) => {
              LightClient.auth = auth;
              LensSDK.profile = {}; // Fetch logged user profile once profile API gets implemented
              return LensSDK.profile;
            });
          })
      ),
    refresh: (refreshTokenRequest) =>
      LensSDK._call(
        AuthAPI.refresh,
        AuthRequests.REFRESH_TOKEN_REQUEST,
        refreshTokenRequest
      ).then((auth) => {
        LightClient.auth = auth;
        LensSDK.profile = {}; // Fetch logged user profile once profile API gets implemented
        return LensSDK.profile;
      }),
    revoke: (revokeAuthenticationRequest) =>
      LensSDK._call(
        AuthAPI.revoke,
        AuthRequests.REVOKE_AUTHENTICATION_REQUEST,
        revokeAuthenticationRequest
      ),
    verify: (verifyRequest) =>
      LensSDK._call(AuthAPI.verify, AuthRequests.VERIFY_REQUEST, verifyRequest),
    list: (approvedAuthenticationRequest) =>
      LensSDK._call(
        AuthAPI.list,
        AuthRequests.APPROVED_AUTHENTICATION_REQUEST,
        approvedAuthenticationRequest
      ),
    isAuthenticated: () => LensSDK.profile.id != "",
    getAccessToken: () => LightClient.auth.accessToken || null,
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
  _call: (apiMethod, requestObject, dataObject) =>
    apiMethod(
      LightClient,
      dataObject ? ApiHelper.intersect(requestObject, dataObject) : null
    ),
};

return LensSDK.init();
