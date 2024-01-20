// Only works on Lens Testnet
const CREATE_PROFILE_QUERY = `
    mutation CreateProfile($createProfileRequest: CreateProfileRequest!) {
      createProfileWithHandle(
        request: $createProfileRequest
      ) {
        ... on RelaySuccess {
          txHash
        }
        ... on CreateProfileWithHandleErrorResult {
          reason
        }
      }
    }
`;

const PROFILE_QUERY = `
    query Profile($profileRequest: ProfileRequest!) {
      profile(request: $profileRequest) {
        ...Profile
      }
    }
`;

const PROFILES_QUERY = `
    query Profile($profilesRequest: ProfilesRequestWhere!) {
      profile(request: $profilesRequest) {
        items {
          ...Profile
        }
        pageInfo {
          ...PaginatedResultInfo
        }
      }
    }
`;

const PROFILE_STATS_QUERY = `
    query Profile($profileId: ProfileId!, $forApps: [AppId] = [], $anyOf: [OpenActionFilter] = []) {
      profile(request: { profileId: $profileId }) {
        stats(request: $forApps) {
          followers(request: $forApps)
          following(request: $forApps)
          comments(request: $forApps)
          posts(request: $forApps)
          mirrors(request: $forApps)
          quotes(request: $forApps)
          mirrors(request: $forApps)
          quotes(request: $forApps)
          publications(request: $forApps)
          upvoteReactions: reactions(request: { type: UPVOTE })
          downvoteReactions: reactions(request: { type: DOWNVOTE })
          countOpenActions(request: { anyOf: $anyOf })
        }
      }
    }
`;

const PROFILE_RECOMMENDATIONS_QUERY = `
    query ProfileRecommendations($profileRecommendationsRequest: ProfileRecommendationsRequest!) {
      profileRecommendations(request: $profileRecommendationsRequest) {
        items {
          ...Profile
        }
        pageInfo {
          ...PaginatedResultInfo
        }
      }
    }
`;

const PROFILE_INTERESTS_QUERY = `
    query Profile($profileId: ProfileId!) {
      profile(request: { profileId: $profileId }) {
        profileInterests
      }
    }
`;

const PROFILE_REPORT_QUERY = `
    mutation reportProfile($reportProfileRequest: ReportProfileRequest!) {
      reportProfile(request: $reportProfileRequest)
    }
`;

const PROFILE_BLOCK_QUERY = `
    mutation Block($blockRequest: BlockRequest!) {
      block(request: $blockRequest) {
        ... on RelaySuccess {
          ...RelaySuccess
        }
        ... on LensProfileManagerRelayError {
          ...LensProfileManagerRelayError
        }
      }
    }
`;

const PROFILE_ACTION_HISTORY_QUERY = `
    query($profileActionHistoryRequest: ProfileActionHistoryRequest!) {
      profileActionHistory(request: $profileActionHistoryRequest) {
        items {
          ...ProfileActionHistory
        }
        pageInfo {
          ...PaginatedResultInfo
        }
      }
    }
`;

return {
  CREATE_PROFILE_QUERY,
  PROFILE_QUERY,
  PROFILES_QUERY,
  PROFILE_STATS_QUERY,
  PROFILE_RECOMMENDATIONS_QUERY,
  PROFILE_INTERESTS_QUERY,
  PROFILE_REPORT_QUERY,
  PROFILE_ACTION_HISTORY_QUERY,
};
