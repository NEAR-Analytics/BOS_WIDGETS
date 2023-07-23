const { onLoad, loaded } = props;

const TOKEN_DECIMALS = 18;
const CONTRACT_ADDRESS = "0x3C6DdF92d31E1728C23c062b3C1D552E6eA77137";
const CONTRACT_ABI =
  '[{"inputs":[{"internalType":"contract IERC20","name":"_currency","type":"address"},{"internalType":"uint64","name":"_liveness","type":"uint64"},{"internalType":"address","name":"__oov3","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"string","name":"_claimLocation","type":"string"},{"internalType":"string","name":"_claimPhotoUrl","type":"string"},{"internalType":"uint256","name":"_bondValue","type":"uint256"},{"internalType":"uint256","name":"_questId","type":"uint256"}],"name":"assertTruth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_questId","type":"uint256"}],"name":"claimRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_questId","type":"uint256"},{"internalType":"address","name":"_winner","type":"address"}],"name":"closeQuest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_questName","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"_location","type":"string"},{"internalType":"string","name":"_zkCoordinates","type":"string"},{"internalType":"uint256","name":"_numberOfPlayer","type":"uint256"},{"internalType":"uint256","name":"_questPrize","type":"uint256"},{"internalType":"uint256","name":"_creatorFee","type":"uint256"}],"name":"createQuest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currency","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_questId","type":"uint256"}],"name":"getAssertionIdByQuestId","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_questId","type":"uint256"}],"name":"getAssertionResult","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_questId","type":"uint256"}],"name":"getPlayerCost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_questId","type":"uint256"},{"internalType":"address","name":"player","type":"address"}],"name":"isPlayerIsJoined","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_questId","type":"uint256"}],"name":"joinQuest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"liveness","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextQuestId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_questId","type":"uint256"}],"name":"settleAssertion","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_questId","type":"uint256"},{"internalType":"string","name":"_solution","type":"string"},{"internalType":"string","name":"_proofPhotoUrl","type":"string"}],"name":"submitSolution","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferCoins","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_questId","type":"uint256"}],"name":"viewQuest","outputs":[{"internalType":"address","name":"creator","type":"address"},{"internalType":"string","name":"questName","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"location","type":"string"},{"internalType":"address[]","name":"players","type":"address[]"},{"internalType":"uint256","name":"numberOfPlayers","type":"uint256"},{"internalType":"uint256","name":"questPrize","type":"uint256"},{"internalType":"uint256","name":"creatorFee","type":"uint256"},{"internalType":"string","name":"questStatus","type":"string"},{"internalType":"address","name":"winner","type":"address"},{"internalType":"bool","name":"payoutCompleted","type":"bool"}],"stateMutability":"view","type":"function"}]';
const iface = new ethers.utils.Interface(CONTRACT_ABI);

const GeoqueteSDK = {
  encode: (method, params) => {
    return iface.encodeFunctionData(method, params);
  },
  decode: (method, rawResponse) => {
    return iface.decodeFunctionResult(method, rawResponse);
  },
  call: (method, params) => {
    return Ethers.provider().call({
      to: CONTRACT_ADDRESS,
      data: GeoqueteSDK.encode(method, params),
    });
  },
  listQuests: () => {},
  getQuest: (questId) => {
    return GeoqueteSDK.call("viewQuest", [questId]);
  },
  createQuest: (quest) => {
    return GeoqueteSDK.call("createQuest", [
      quest.questName,
      quest.location,
      quest.coordinates,
      quest.numberOfPlayers,
      quest.questPrize,
      10,
    ]);
  },
  joinQuest: (questId) => {
    return GeoqueteSDK.call("joinQuest", [questId]);
  },
  submitSolution: (questId, zkProof, ipfsPhotoUrl) => {
    return GeoqueteSDK.call("submitSolution", [questId, zkProof, ipfsPhotoUrl]);
  },
  hexToInteger: (hex) => {
    return parseInt(hex, 16) / Math.pow(10, TOKEN_DECIMALS);
  },
};

if (!!onLoad && typeof onLoad === "function" && !loaded) {
  onLoad(GeoqueteSDK);
}
