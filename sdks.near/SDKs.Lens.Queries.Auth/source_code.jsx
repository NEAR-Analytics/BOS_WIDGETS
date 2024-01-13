const PROFILES_MANAGED_QUERY = `
    query profilesManaged($request: ProfilesManagedRequest!) {
      profilesManaged(request: $request) {
        items {
          id
          ownedBy {
            address
            chainId
          }
          handle {
            id
            fullHandle
          }
        }
      }
    }
`;

const AUTH_CHALLENGE_QUERY = `
    query Challenge($request: ChallengeRequest!) {
      challenge(request: $request) {
        text
      }
    }
`;

const AUTH_AUTHENTICATE_QUERY = `
    mutation Authenticate($request: SignedAuthChallenge!) {
      authenticate(request: $request) {
        accessToken
        refreshToken
      }
    }
`;

return {
  AUTH_AUTHENTICATE_QUERY,
  AUTH_CHALLENGE_QUERY,
  PROFILES_MANAGED_QUERY,
};
