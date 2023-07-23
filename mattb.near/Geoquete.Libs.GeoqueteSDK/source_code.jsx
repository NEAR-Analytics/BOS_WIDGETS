const { onLoad, loaded } = props;

const TOKEN_DECIMALS = 18;
const CONTRACT_ADDRESS = "0x3C6DdF92d31E1728C23c062b3C1D552E6eA77137";
const CONTRACT_ABI = fetch(
  "https://raw.githubusercontent.com/paris-geo-hackers/ParisContracts/main/contracts/Game.json"
);
const iface = new ethers.utils.Interface(CONTRACT_ABI.body);

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
