const account = Ethers.send("eth_requestAccounts", [])[0];
const { getLifi } = props


function generateQuery(obj) {
    return Object.keys(obj).filter(key => !!obj[key]).map(key => {
        return `${key}=${obj[key]}`
    }).join('&')
}

function getAllPossibleConnections({ fromChain, toChain, fromToken, toToken, chainTypes }) {
    const params = {
        fromChain,
        toChain,
        fromToken,
        toToken,
        chainTypes,
    }

    const connectionP = asyncFetch(`https://li.quest/v1/connections?${generateQuery(params)}`)

    return connectionP.then(res => {
        if (res.status === 200) {
            const connections = res.body.connections
            if (connections && connections.length) {
                const connection = connections[0]
                const { toTokens } = connection
                const canUsedTokens = toTokens.filter(token => !!token.logoURI)

                return canUsedTokens
            }
        }
    })
}

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
            callback('0.0')
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

function getRoute(params, tool) {
    const url = 'https://li.quest/v1/advanced/routes'
    const options = {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify(params)
    }

    const quoteP = asyncFetch(url, options)
    return quoteP.then(res => {
        const { routes } = res.body
        if (!routes) {
            return null
        }
        const slectedRoute = routes.filter(route => {
            return route.steps[0].tool === tool
        })

        return slectedRoute ? slectedRoute[0] : null
    })
}

function computeDuration(route) {
    let duration = 0
    route.steps.forEach(step => {
        duration += step.estimate.executionDuration
    })

    return Math.ceil(duration / 60) + ' min'
}


function checkAndSetAllowance(rpcUrl, route, getLifi) {
    const signer = Ethers.provider().getSigner()
    const lifi = getLifi()

    const quote = route.steps[0]

    return lifi.getTokenApproval(
        signer,
        quote.action.fromToken,
        quote.estimate.approvalAddress,
    ).then(res => {
        if (!res) {
            return lifi.approveToken({
                signer,
                token: quote.action.fromToken,
                approvalAddress: quote.estimate.approvalAddress,
                amount: quote.action.fromAmount,
            }).then(res => {
                console.log(res)
                return res
            })
        }
    }).then(res => {
        return lifi.executeRoute(signer, route)
    }).then(tx => {
        const process = tx.steps[tx.steps.length - 1].execution?.process
        console.log('tx:', tx)
        if (!process) {
            return
        }
        let txHash = process[process.length - 1].txHash
        const txLink = process[process.length - 1].txLink
        const start = process[0].startedAt
        const end = process[process.length - 1].doneAt
        const duration = Math.ceil((end - start) / 1000 / 60)
        txHash = txHash || ''
        saveTransaction(txHash, txLink, duration)
    })
        .catch(e => {
            console.log(e)
        })

}

const transaction_key = '$tk$'
function saveTransaction(txHash, txLink, duration) {
    const transactionList = getTransaction()
    transactionList.push({
        txHash,
        txLink,
        duration,
        time: Date.now(),
    })

    Storage.set(transaction_key, JSON.stringify(transactionList))
}

function getTransaction() {
    const transactionListStr = Storage.get(transaction_key)

    let transactionList
    if (transactionListStr) {
        try {
            transactionList = JSON.parse(transactionListStr)
        } catch (e) {
            transactionList = []
        }
    } else {
        transactionList = []
    }

    return transactionList
}

return {
    getAllPossibleConnections,
    generateQuery,
    getBalance,
    balanceFormated,
    getRoute,
    computeDuration,
    addressFormated,
    checkAndSetAllowance,
    getTransaction,
}