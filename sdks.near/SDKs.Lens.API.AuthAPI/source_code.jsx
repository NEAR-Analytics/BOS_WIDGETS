const $ = VM.require(`sdks.near/widget/Loader`);
const { Auth } = $("@sdks/lens/queries");

return {
  profiles: (Client, { limit, evmAddress, includeOwned }) => {
    return Client.graphql(Auth.PROFILES_MANAGED_QUERY, {
      limit: limit || "Ten",
      cursor: {},
      for: evmAddress,
      includeOwned: includeOwned || true,
    }).then((payload) => payload.body.data.profilesManaged.items || []);
  },
  login: (Client, { signedBy, profileId }) => {
    return new Promise((resolve, reject) => {
      return Client.graphql(Auth.AUTH_CHALLENGE_QUERY, {
        signedBy,
        for: profileId,
      }).then((data) => {
        let challengeId = data.body.data.challenge.id;
        let challengeText = data.body.data.challenge.text;
        return Ethers.getProvider()
          .signMessage(challengeText)
          .then((signature) => {
            return Client.graphql(AUTH_AUTHENTICATE_QUERY, {
              id: challengeId,
              signature,
            }).then((payload) => {
              return (
                payload.body.data.authenticate || {
                  accessToken: "",
                  refreshToken: "",
                }
              );
            });
          });
      });
    });
  },
  refresh: () => {},
  revoke: () => {},
  verify: () => {},
  list: () => {},
};
