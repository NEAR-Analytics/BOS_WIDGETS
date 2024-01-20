const $ = VM.require(`sdks.near/widget/Loader`);
const { Profile } = $("@sdks/lens/queries");
const { ApiHelper } = $("@sdks/lens/helpers");

return {
  create: (Client, createProfileRequest) => {
    return Client.graphql(Profile.CREATE_PROFILE_QUERY, {
      createProfileRequest,
    }).then((payload) => payload.body || {});
  },
  fetch: (Client, profileRequest) => {
    return Client.graphql(Profile.PROFILE_QUERY, {
      profileRequest,
    }).then((payload) => payload.body.data.profile || {});
  },
  fetchAll: (Client, profilesRequest) =>
    Client.graphql(Profile.PROFILES_QUERY, {
      profilesRequest: ApiHelper.clean({
        ...profilesRequest,
        where: {
          ...ApiHelper.clean(profilesRequest.where),
        },
      }),
    }).then((payload) => {
      return {
        profiles: payload.body.data.items || [],
        pagination: payload.body.data.pageInfo || {},
      };
    }),
  stats: (Client, profileStatsRequest) =>
    Client.graphql(Profile.PROFILE_STATS_QUERY, profileStatsRequest).then(
      (payload) => payload.body.data.stats || {}
    ),
  recommendations: (Client, profileRecommendationsRequest) =>
    Client.graphql(Profile.PROFILE_RECOMMENDATIONS_QUERY, {
      profileRecommendationsRequest,
    }).then((payload) => {
      return {
        profiles: payload.body.data.items || {},
        pagination: payload.body.data.pageInfo || {},
      };
    }),
  interests: (Client, profileInterestsRequest) =>
    Client.graphql(Profile.PROFILE_INTERESTS_QUERY, {
      profileInterestsRequest,
    }).then((payload) => payload.body.data.profileInterests || []),
  report: (Client, reportProfileRequest) =>
    Client.graphql(Profile.PROFILE_REPORT_QUERY, {
      reportProfileRequest,
    }).then((payload) => ""),
  block: (Client, blockProfileRequest) =>
    Client.graphql(Profile.PROFILE_BLOCK_QUERY, {
      blockProfileRequest,
    }).then((payload) => payload.body || {}),
  history: (Client, profileHistoryRequest) =>
    Client.graphql(Profile.PROFILE_HISTORY_QUERY, {
      profileHistoryRequest,
    }).then((payload) => {
      return {
        history: payload.body.data.items || [],
        pagination: payload.body.data.pageInfo || {},
      };
    }),
  onChainIdentity: (profileId) => {},
  isFollowedByMe: (profileId) => {},
  isBlockedByMe: (profileId) => {},
  isFollowingMe: (profileId) => {},
  canFollow: (profileId) => {},
  canUnfollow: (profileId) => {},
  canBlock: (profileId) => {},
  canUnblock: (profileId) => {},
  fetchPublications: (profileId) => LensSDK.fetchAll(profileId),
};
