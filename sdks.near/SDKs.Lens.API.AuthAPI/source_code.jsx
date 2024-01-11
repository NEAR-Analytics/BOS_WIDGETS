const AUTH_CHALLENGE_QUERY = "";
const AUTH_AUTHENTICATE_QUERY = "";

return {
  login: (Client, { signedBy, profileId }) => {
    return new Promise((resolve, reject) => {
      return Client.graphql(AUTH_CHALLENGE_QUERY, {
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
