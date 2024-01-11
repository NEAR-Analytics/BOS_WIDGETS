const AUTH_AUTHENTICATE_QUERY = ``;
const AUTH_CHALLENGE_QUERY = ``;
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

return {
    AUTH_AUTHENTICATE_QUERY,
    AUTH_CHALLENGE_QUERY,
    PROFILES_MANAGED_QUERY
};