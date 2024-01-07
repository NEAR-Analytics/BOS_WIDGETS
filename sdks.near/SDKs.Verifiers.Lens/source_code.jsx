const EthereumSigner = VM.require(`sdks.near/widget/SDKs.EthereumSigner.Main`);
const LensSDK = VM.require(`mattb.near/widget/LensSDKRequire`);

const LensVerifier = {
  authenticate: (address) => {
    return LensSDK.authenticateLens(address, () =>
      Ethers.provider().getSigner()
    );
  },
  authenticateAndSign: (address, nearAccount) => {
    return LensVerifier.authenticate(address).then((success) => {
      if (success) {
        return LensSDK.getProfileByEthereumAddress(address).then((payload) => {
          let handle = payload.body.data.profile.handle;
          return LensVerifier.sign(handle, nearAccount, address);
        });
      }

      return new Promise((_, reject) => reject("Lens authentication failed"));
    });
  },
  sign: (handle, nearAccount, address) => {
    return EthereumSigner.sign(
      LensVerifier.getChallenge(handle, nearAccount, address)
    );
  },
  verify: (handle, nearAccount, signature) => {
    return LensSDK.getProfileByHandle(handle).then((payload) => {
      let expectedAddress = payload.body.data.profile.ownedBy;

      const message = LensVerifier.getChallenge(
        handle,
        nearAccount,
        expectedAddress
      );

      return EthereumSigner.verify(message, expectedAddress, signature);
    });
  },
  getChallenge: (handle, nearAccount, address) => {
    return `${nearAccount.toLowerCase()} with address ${address.toLowerCase()} owns the ${handle.toLowerCase()} handle`;
  },
};

return LensVerifier;
