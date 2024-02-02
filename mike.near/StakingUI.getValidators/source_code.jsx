const getUniqueValidatorAddresses = (validators1, validators2) => {
  const allValidators = [...validators1, ...validators2];
  const uniqueIds = new Set(allValidators.map((v) => v.account_id));
  return Array.from(uniqueIds);
};

const mainnetValidators = {
  getAddresses: async ({ customRPCEndpoint, debug }) => {
    customRPCEndpoint = customRPCEndpoint || "https://rpc.mainnet.near.org";
    debug = debug || false;

    return new Promise((resolve, reject) => {
      try {
        let uniqueAccountIds = asyncFetch(customRPCEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "validators",
            params: [null],
            id: "mainnet-vals",
          }),
        }).then((data) => {
          // console.log("aloha data", data);
          const { current_validators, next_validators } = data.body.result;

          if (debug) {
            console.log("current_validators", current_validators);
            console.log("next_validators", next_validators);
          }

          const uniqueAccountIds = getUniqueValidatorAddresses(
            current_validators,
            next_validators
          );

          if (debug) console.log("uniqueAccountIds", uniqueAccountIds);

          return resolve(uniqueAccountIds);
        });
      } catch {
        console.error(
          `Could not get list of mainnet validators from ${customRPCEndpoint}`
        );
        return reject();
      }
    });
  },
};

return { mainnetValidators };
