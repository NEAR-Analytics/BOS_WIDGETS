const VERIFIER_CONTRACT = "0x793ABce859d651C179F2F3B0A47C438dC3D67901";
const ABI = [
  "function verifySignature(string memory message, uint8 v, bytes32 r, bytes32 s) public pure returns (address signer)",
];

const EthereumSigner = {
  sign: (message) => Ethers.provider().getSigner().signMessage(message),
  verify: (originalMessage, signature, expectedSignerAddress) => {
    try {
      return EthereumSigner.getSignerAddress(originalMessage, signature).then(
        (address) => {
          return expectedSignerAddress.toLowerCase() == address.toLowerCase();
        }
      );
    } catch {
      return false;
    }
  },
  getSignerAddress: (message, signature) => {
    const contract = new ethers.Contract(
      VERIFIER_CONTRACT,
      ABI,
      Ethers.provider()
    );

    const { v, r, s } = ethers.utils.splitSignature(signature);

    return contract.callStatic.verifySignature(message, v, r, s);
  },
};

return EthereumSigner;