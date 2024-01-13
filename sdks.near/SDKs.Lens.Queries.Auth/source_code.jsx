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

const CHALLENGE_QUERY = `
    query Challenge($request: ChallengeRequest!) {
      challenge(request: $request) {
        text
      }
    }
`;

const AUTHENTICATE_QUERY = `
    mutation Authenticate($request: SignedAuthChallenge!) {
      authenticate(request: $request) {
        accessToken
        refreshToken
      }
    }
`;

const REFRESH_TOKEN_QUERY = `
    mutation Refresh($request: RefreshRequest!) {
      refresh(request: $request) {
        accessToken
        refreshToken
      }
    }
`;

const REVOKE_AUTHENTICATION_QUERY = `
    mutation RevokeAuthentication($request: RevokeAuthenticationRequest!) {
      revokeAuthentication(request: $request)
    }
`;

const APPROVED_AUTHENTICATIONS_QUERY = `
    query ApprovedAuthentication($request: ApprovedAuthenticationRequest!) {
      approvedAuthentication(request: $request) {
        pageInfo {
          prev
          next
        }
        items {
          authorizationId
          browser
          device
          os
          origin
          expiresAt
          createdAt
          updatedAt
        }
      }
    }
`;

const VERIFY_TOKEN_QUERY = `
    query Query($request: VerifyRequest!) {
      verify(request: $request)
    }
`;

return {
  AUTHENTICATE_QUERY,
  CHALLENGE_QUERY,
  PROFILES_MANAGED_QUERY,
  REFRESH_TOKEN_QUERY,
  REVOKE_AUTHENTICATION_QUERY,
  APPROVED_AUTHENTICATIONS_QUERY,
  VERIFY_TOKEN_QUERY
};
