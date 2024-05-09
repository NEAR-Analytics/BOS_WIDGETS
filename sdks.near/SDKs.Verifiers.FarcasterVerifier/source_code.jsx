const $ = VM.require("sdks.near/widget/Loader");
const { EthereumSigner } = $("@sdks/eth-signer");
const FarcasterAPI = VM.require(`sdks.near/widget/SDKs.Farcaster.FarcasterAPI`);

const FarcasterVerifier = {
  createProof: (handle, evmAddress, nearAccount) => {
    return FarcasterAPI.getHandleOwner(handle).then((expectedAddresses) => {
      console.log(expectedAddresses, evmAddress, evmAddress.toLowerCase());
      if (!expectedAddresses.includes(evmAddress.toLowerCase())) {
        return new Promise((_, reject) =>
          reject("This Ethereum address is not linked to this handle")
        );
      }

      return FarcasterVerifier.sign(handle, nearAccount, evmAddress).then(
        (signature) => {
          return {
            handle,
            signature,
          };
        }
      );
    });
  },
  sign: (handle, nearAccount, evmAddress) => {
    return EthereumSigner.sign(
      FarcasterVerifier.getChallenge(handle, nearAccount, evmAddress)
    );
  },
  verify: (handle, nearAccount, signature) => {
    return FarcasterAPI.getHandleOwner(handle).then((expectedAddresses) => {
      return (
        expectedAddresses
          .map((expectedAddress) => {
            const message = FarcasterVerifier.getChallenge(
              handle,
              nearAccount,
              expectedAddress
            );

            return EthereumSigner.verify(message, signature, expectedAddress);
          })
          .filter((verification) => verification).length > 0
      );
    });
  },
  getChallenge: (handle, nearAccount, address) => {
    return `${nearAccount.toLowerCase()} with address ${address.toLowerCase()} owns the ${handle.toLowerCase()} handle on farcaster`;
  },
};

return FarcasterVerifier;
