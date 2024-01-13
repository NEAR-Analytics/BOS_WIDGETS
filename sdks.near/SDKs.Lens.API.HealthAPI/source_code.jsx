const $ = VM.require(`sdks.near/widget/Loader`);
const { Health } = $("@sdks/lens/queries");
const { Constants } = $("@sdks/lens/definitions");

return {
  ping: (Client) =>
    Client.graphql(Health.PING_QUERY)
      .then((payload) => {
        const response = payload.body.data.ping;
        return response;
      })
      .catch((error) => {
        return Constants.RESPONSE_HEALTH_KO;
      }),
};
