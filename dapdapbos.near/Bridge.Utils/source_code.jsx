function getBalance(address, account, rpcUrl, decimals) {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    if (address === "native") {
        return provider.getBalance(account).then((rawBalance) => {
            return ethers.utils.formatUnits(rawBalance._hex, decimals).toString()
        });
    }

    const TokenContract = new ethers.Contract(
        address,
        [
            {
                constant: true,
                inputs: [
                    {
                        name: "_owner",
                        type: "address",
                    },
                ],
                name: "balanceOf",
                outputs: [
                    {
                        name: "balance",
                        type: "uint256",
                    },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
            },
        ],
        provider
    );

    return TokenContract.balanceOf(account)
        .then((rawBalance) => {
            return ethers.utils.formatUnits(rawBalance._hex, decimals).toString()
        })
        .catch((err) => {
            console.log(err)
            return '0.0'
        });
}

function balanceFormated(balance, digits) {
    digits = digits || 4
    if (!balance) return '0';
    const _balance = new Big(balance);
    if (_balance.eq(0)) return '0';
    if (_balance.lt(0.0001)) return `<${0.0001}`;
    return _balance.toFixed(digits);
}

const addressReg = /(\w{6})(.*)(\w{4})/

function addressFormated(address) {
    return address.replace(addressReg, (_1, _2, _3, _4) => {
        return `${_2}...${_4}`
    })
}

function saveTransaction(transaction_key, config) {
    const transactionObj = getTransaction(transaction_key)
    transactionObj.transactionList.push(config)
    Storage.privateSet(transaction_key, transactionObj)
}

function saveAllTransaction(transaction_key, transactionList) {
    Storage.privateSet(transaction_key, {
        transactionList
    })
}

function getTransaction(transaction_key) {
    let transactionObj = Storage.privateGet(transaction_key)

    if (!transactionObj) {
        transactionObj = {}
    }

    if (!transactionObj.transactionList) {
        transactionObj.transactionList = []
    }


    return transactionObj
}

return {
    getBalance,
    balanceFormated,
    addressFormated,
    saveTransaction,
    getTransaction,
    saveAllTransaction,
}
