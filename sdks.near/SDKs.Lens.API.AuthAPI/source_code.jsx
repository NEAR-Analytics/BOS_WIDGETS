const $ = VM.require(`sdks.near/widget/Loader`);
const { Auth } = $("@sdks/lens/queries");
const { Interfaces } = $("@sdks/lens/definitions");

return {
  profiles: (Client, profilesManagedRequest) => {
    return Client.graphql(
      Auth.PROFILES_MANAGED_QUERY,
      profilesManagedRequest
    ).then((payload) => payload.body.data.profilesManaged.items || []);
  },
  challenge: (Client, challengeRequest) => {
    return Client.graphql(Auth.CHALLENGE_QUERY, challengeRequest).then(
      (data) => {
        return data.body.data.challenge || Interfaces.AUTH_CHALLENGE_INTERFACE;
      }
    );
  },
  authenticate: (Client, signedChallengeRequest) => {
      return Client.graphql(Auth.AUTHENTICATE_QUERY, signedChallengeRequest).then((payload) => {
        return (
          payload.body.data.authenticate || Interfaces.AUTH_INTERFACE
        );
      });
  },
  refresh: (Client, refreshRequest) => {
    return Client.graphql(Auth.PROFILES_MANAGED_QUERY, refreshRequest).then(
      (payload) => payload.body.data.refresh || Interfaces.AUTH_INTERFACE
    );
  },
  revoke: (Client, revokeAuthenticationRequest) => {
    return Client.graphql(
      Auth.REVOKE_AUTHENTICATION_QUERY,
      revokeAuthenticationRequest
    ).then((payload) => true);
  },
  list: (Client, approvedAuthenticationsRequest) => {
    return Client.graphql(
      Auth.APPROVED_AUTHENTICATIONS_QUERY,
      approvedAuthenticationsRequest
    ).then((payload) => payload.body.data.approvedAuthentication.items || []);
  },
  verify: (Client, verifyTokenRequest) => {
    return Client.graphql(Auth.VERIFY_TOKEN_REQUEST, verifyTokenRequest).then(
      (payload) => (payload.body.data.verify || false) == true
    );
  },
};
