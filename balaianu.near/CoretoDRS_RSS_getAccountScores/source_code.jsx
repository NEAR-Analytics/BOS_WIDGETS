/*
 * CoretoDRS::RSS::getAccountScores (DEMO) - Get the CoretoDRS scores for an accountId.
 *
 * The CoretoDRS scores are a user's Reputation (TRUST and PERFORMANCE) scores,
 * tracked and calculated by the Coreto Decentralized Reputation System
 * on platforms that are connected to the system.
 *
 * Access the results using the returned object, or
 * by using 'let results = Storage.get(`drs.scores.${accountId}`);'
 *
 * Params
 * - accountId: "some-valid-account.near"
 * - source (optional): "a-valid-source.near"
 *
 */

// Function for getting an account's Coreto DID
function getAccountDid(accountId) {
  let response = {
    data: null,
    errors: null,
  };

  // Search for a Coreto DID for the account
  const getDidResponse = useCache(
    () =>
      asyncFetch("https://drt.coreto.io/did/get_did", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account_id: accountId }),
      }),
    `getDidResponse_${accountId}`,
    { subscribe: true }
  );

  // Handle API call errors
  if (getDidResponse.ok != true) {
    response.errors = [
      {
        code: 500,
        message: "Cound not get a DID for this account.",
        body: getDidResponse.body,
      },
    ];
    return response;
  }

  // Handle response data errors or missing
  if (
    getDidResponse.body.length == 0 ||
    typeof getDidResponse.body !== "string"
  ) {
    response.errors = [
      {
        code: 404,
        message: "Cound not find a DID for this account.",
        body: getDidResponse.body,
      },
    ];

    return response;
  }

  // Set response data
  response.data = getDidResponse.body;

  return response;
}

// Function for getting an account's CoretoDRS
// scores based on their Coreto DID
function getAccountDidScores(accountDid, source) {
  let url = `https://rss.coreto.io/api/v1/scores/${accountDid}`;
  let response = {
    data: null,
    errors: null,
  };

  if (source !== undefined) {
    url = url + `/sources/${source}`;
  }

  // Fetch reputation data for the account
  const getScoresResponse = useCache(
    () => asyncFetch(url),
    `getAccountScores_${accountDid}`,
    { subscribe: true }
  );

  // Handle API call errors
  if (getScoresResponse.ok != true) {
    response.errors = [
      {
        code: 500,
        message: "Cound not get scores for this account.",
        body: getScoresResponse.body,
      },
    ];
    return response;
  }

  // Handle response data errors or missing
  if (
    getScoresResponse.body.length == 0 ||
    typeof getScoresResponse.body !== "object"
  ) {
    response.errors = [
      {
        code: 500,
        message: "Cound not find scores for this account.",
        body: getScoresResponse.body,
      },
    ];
    return response;
  }

  // Set response data
  response.data = getScoresResponse.body;

  return response;
}

// Main function for getting an account's CoretoDRS
// scores based on the user's accountId
function getAccountScores(accountId, source) {
  let response = {
    account_id: accountId,
    data: null,
    errors: null,
  };

  // Get the account's Coreto DID
  let did = getAccountDid(accountId);

  // Handle errors
  if (did.errors !== null) {
    response.errors = did.errors;
    Storage.set(`drs.scores.${accountId}`, response);
    return response;
  }

  // Get the account's CoretoDRS scores
  let scores = getAccountDidScores(did.data, source);

  // Handle errors
  if (scores.errors !== null) {
    response.errors = scores.errors;
    Storage.set(`drs.scores.${accountId}`, response);
    return response;
  }

  // Set response data
  response.data = scores.data;
  Storage.set(`drs.scores.${accountId}`, response);
  return response;
}

return { getAccountScores };
