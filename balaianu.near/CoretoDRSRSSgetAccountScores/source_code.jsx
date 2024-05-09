/*
 * CoretoDRS::RSS::getAccountScores (DEMO) - Get the CoretoDRS scores for an accountId.
 *
 * The CoretoDRS scores are a user's Reputation (TRUST and PERFORMANCE) scores,
 * tracked and calculated by the Coreto Decentralized Reputation System
 * on platforms that are connected to the system.
 *
 * After including this widget inside your own widget, you can access the results
 * using 'let results = Storage.get(`drs.scores.${accountId}`);' and display them
 * or use them as part of your own widget.
 *
 * In order for the data to be up to date, you will need to ensure that this widget
 * is loaded and has the needed accountId value set in the props.
 *
 * This widget will ensure that the data is always up to date, so you don't have to.
 *
 * Parameters:
 * - props (optional): { accountId: 'some-valid-account.near' }
 *
 * NOTE: if no accountId is given via props, it will get the scores for the current
 * user's account.
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
function getAccountDidScores(accountDid) {
  let response = {
    data: null,
    errors: null,
  };

  // Fetch reputation data for the account
  const getScoresResponse = useCache(
    () => asyncFetch(`https://rss.coreto.io/api/v1/scores/${accountDid}`),
    `getAccountScores_${accountDid}`,
    { subscribe: true }
  );

  // Handle API call errors
  if (getScoresResponse.ok != true) {
    response.errors = [
      {
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
function getAccountScores(accountId) {
  let response = {
    account_id: accountId,
    data: null,
    errors: null,
  };

  // Get the account's Coreto DID
  let did = getAccountDid(accountId);

  // Handle errors
  if (did.errors !== null) {
    response.errors = { did: did.errors };
    Storage.set(`drs.scores.${accountId}`, response);
    return response;
  }

  // Get the account's CoretoDRS scores
  let scores = getAccountDidScores(did.data);

  // Handle errors
  if (scores.errors !== null) {
    response.errors = { scores: scores.errors };
    Storage.set(`drs.scores.${accountId}`, response);
    return response;
  }

  // Set response data
  response.data = scores.data;
  Storage.set(`drs.scores.${accountId}`, response);
  return response;
}

/* ----- */

const accountId = props.accountId ?? context.accountId;
let accountScores = getAccountScores(accountId);

return Storage.get(`drs.scores.${accountId}`);
