const $ = VM.require(`sdks.near/widget/Loader`);
const { Constants } = $("@sdks/lens/definitions");

const PROFILES_MANAGED_REQUEST = {
  limit: Constants.API_REQUEST_LIMITS.TEN,
  cursor: {},
  for: "",
  includeOwned: true,
};

const SIGNED_CHALLENGE_REQUEST = {
  signedBy: "",
  for: "",
};

const REFRESH_REQUEST = {
  refreshToken: "",
};

const REVOKE_AUTHENTICATION_REQUEST = {
  authorizationId: "",
};

const APPROVED_AUTHENTICATIONS_REQUEST = {
  limit: Constants.API_REQUEST_LIMITS.TEN,
  cursor: {},
};

const VERIFY_TOKEN_REQUEST = {
  accessToken: ""
};

return {
  PROFILES_MANAGED_REQUEST,
  SIGNED_CHALLENGE_REQUEST,
  REFRESH_REQUEST,
  REVOKE_AUTHENTICATION_REQUEST,
  APPROVED_AUTHENTICATIONS_REQUEST,
  VERIFY_TOKEN_REQUEST,
};
