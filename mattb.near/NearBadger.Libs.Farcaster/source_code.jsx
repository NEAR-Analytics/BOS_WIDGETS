const FarcasterVerifier = VM.require(
  "sdks.near/widget/SDKs.Verifiers.FarcasterVerifier"
);

const FarcasterAPI = VM.require("sdks.near/widget/SDKs.Farcaster.FarcasterAPI");

const FarcasterLib = {
  createProof: (handle, address, nearAccount, onCommit, onCancel) => {
    FarcasterVerifier.createProof(handle, address, nearAccount)
      .then(({ handle, signature }) => {
        let identity = {
          farcaster: {
            name: handle,
            signature,
          },
        };

        Social.set(
          {
            identity,
            index: {
              identity: JSON.stringify({
                key: "farcaster",
                value: {
                  ...identity.farcaster,
                },
              }),
            },
          },
          {
            onCommit: () => {
              if (typeof onCommit === "function") {
                onCommit(handle);
              }
            },
            onCancel,
          }
        );
      })
      .catch((error) => {
        console.error(error);
        if (typeof onCancel === "function") {
          onCancel();
        }
      });
  },
  verify: (handle, nearAccount, signature) =>
    FarcasterVerifier.verify(handle, nearAccount, signature),
  listRecentlyVerifiedProfiles: (options) => {
    return FarcasterLib.getIdentity({
      limit: 5,
      ...options,
    });
  },
  getVerifiedProfiles: (nearAccounts) => {
    return FarcasterLib.getIdentity({
      accountId: nearAccounts,
    });
  },
  getVerifiedProfile: (nearAccount) => {
    return FarcasterLib.getIdentity({
      accountId: nearAccount,
      limit: 1,
    });
  },
  getIdentity: (options) => {
    return Social.index("identity", "farcaster", {
      order: "desc",
      ...options,
    });
  },
  getAddressesByHandle: (handle) => {
    return FarcasterAPI.getHandleOwner(handle);
  },
};

return FarcasterLib;
