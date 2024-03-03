const WARPCAST_API_URL = "https://client.warpcast.com/v2";
const FARCASTER_FNAMES_API_URL = "https://fnames.farcaster.xyz";

const PROFILE_INFO_ENDPOINT = "user-by-username";
const PROFILE_ENDPOINT = "verifications";
const FARCASTER_FNAMES_ENDPOINT = "transfers/current";

const FarcasterAPI = {
  getProfileInfo: (handle) => {
    return asyncFetch(
      FarcasterAPI.getWarpcastQueryURL(PROFILE_INFO_ENDPOINT, {
        username: handle,
      }),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    ).then((result) => {
      return result?.body?.result?.user;
    });
  },
  getHandleOwner: (handle) => {
    return FarcasterAPI.getFidByHandle(handle).then((fid) => {
      if (!fid) {
        return [];
      }

      return asyncFetch(
        FarcasterAPI.getWarpcastQueryURL(PROFILE_ENDPOINT, { fid }),
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      ).then((result) => {
        const verifications = result?.body?.result?.verifications || [];
        return verifications.map((verification) => verification.address);
      });
    });
  },
  getFidByHandle: (handle) => {
    return asyncFetch(
      FarcasterAPI.getFarcasterQueryURL(FARCASTER_FNAMES_ENDPOINT, {
        name: handle,
      }),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    ).then((result) => {
      return result?.body?.transfer?.to || "";
    });
  },
  getQueryURL: (endpoint, params) => {
    const urlSearchParams = Object.keys(params)
      .map((param) => `${param}=${params[param]}`)
      .join("&");

    return `${endpoint}?${urlSearchParams}`;
  },
  getFarcasterQueryURL: (endpoint, params) => {
    return FarcasterAPI.getFarcasterURL(
      FarcasterAPI.getQueryURL(endpoint, params)
    );
  },
  getWarpcastQueryURL: (endpoint, params) => {
    return FarcasterAPI.getWarpcastURL(
      FarcasterAPI.getQueryURL(endpoint, params)
    );
  },
  getFarcasterURL: (endpoint) => {
    return `${FARCASTER_FNAMES_API_URL}/${endpoint}`;
  },
  getWarpcastURL: (endpoint) => {
    return `${WARPCAST_API_URL}/${endpoint}`;
  },
};

return FarcasterAPI;
