
const { marketAddress, user,allAssetsData, onLoad } = props;

const routerAddress = "0xAdB09F65bd90d19e3148D9ccb693F3161C6DB3E8";

const abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sy",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getUserSYInfo",
        "outputs": [
            {
                "components": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "token",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct IPActionInfoStatic.TokenAmount",
                        "name": "syBalance",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "token",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct IPActionInfoStatic.TokenAmount[]",
                        "name": "unclaimedRewards",
                        "type": "tuple[]"
                    }
                ],
                "internalType": "struct IPActionInfoStatic.UserSYInfo",
                "name": "res",
                "type": "tuple"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
];

State.init({
    resdata: [],
});

const requestUserMarketInfo = () => {

    const signer = Ethers.provider().getSigner();

    const contract = new ethers.Contract(routerAddress, abi, signer);

    return contract.callStatic
        .getUserSYInfo(marketAddress, user)
        .then((res) => {
            State.update({
                resdata: res,
            })
        })
        .catch((error) => {
            console.log(error);
        });
};
requestUserMarketInfo();

const matchedData = state.resdata[1] && allAssetsData.length > 0 ? state.resdata[1].map((item) => {
    const matchedItem = allAssetsData.find((data) => data.address.toLowerCase() === item[0].toLowerCase());
    const dQuantity = item[1].toString();
    const product = matchedItem ? matchedItem.price.usd * dQuantity / Math.pow(10, matchedItem.decimals) : 0;
    return product;
}) : [];

const total = matchedData.reduce((sum, value) => sum + value, 0);
const formattedTotal = isNaN(total) ? 0 : total;

return (
    <>
        {formattedTotal ? (
            formattedTotal < 0.01 ? '<$0.01' : formattedTotal
        ) : (
            '-'
        )}
    </>
);


