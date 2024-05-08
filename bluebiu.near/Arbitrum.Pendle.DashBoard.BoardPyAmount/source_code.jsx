
const { marketAddress, user, allAssetsData, onLoad } = props;

const routerAddress = "0xAdB09F65bd90d19e3148D9ccb693F3161C6DB3E8";

const abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "py",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getUserPYInfo",
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
                        "name": "ptBalance",
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
                        "internalType": "struct IPActionInfoStatic.TokenAmount",
                        "name": "ytBalance",
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
                        "internalType": "struct IPActionInfoStatic.TokenAmount",
                        "name": "unclaimedInterest",
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
                "internalType": "struct IPActionInfoStatic.UserPYInfo",
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
        .getUserPYInfo(marketAddress, user)
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

const matchedData = state.resdata[2] && allAssetsData.length > 0 ? allAssetsData.find((data) => data.address.toLowerCase() === state.resdata[2][0].toLowerCase()) : [];

return (
    <>
        {matchedData ? (
            <div key={matchedData.address}>
                <img src={matchedData.proIcon} alt="" style={{ width: "19px" }} />
                {matchedData.proSymbol}
            </div>
        ) : (
            <div>Loading...</div>
        )}
    </>
);



