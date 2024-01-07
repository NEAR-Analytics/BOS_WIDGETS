const LensVerifier = VM.require("sdks.near/widget/SDKs.Verifiers.Lens");

const LensLib = {
  createProof: (address, nearAccount, onCommit, onCancel) => {
    LensVerifier.createProof(address, nearAccount)
      .then(({ handle, signature }) => {
        let identity = {
          lens: {
            name: handle,
            signature,
          },
        };

        Social.set(
          {
            identity,
            index: {
              identity: JSON.stringify({
                key: "lens",
                value: {
                  ...identity.lens,
                },
              }),
            },
          },
          {
            onCommit,
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
    LensVerifier.verify(handle, nearAccount, signature),
  listVerifiedProfiles: (limit) => {
    return LensLib.getIdentity({
      limit: limit || 5,
    });
  },
  getVerifiedProfiles: (nearAccounts) => {
    return LensLib.getIdentity({
      accountId: nearAccounts,
    });
  },
  getVerifiedProfile: (nearAccount) => {
    return LensLib.getIdentity({
      accountId: nearAccount,
      limit: 1,
    });
  },
  getIdentity: (options) => {
    return Social.index("identity", "lens", {
      order: "desc",
      ...options,
    });
  },
};

return LensLib;