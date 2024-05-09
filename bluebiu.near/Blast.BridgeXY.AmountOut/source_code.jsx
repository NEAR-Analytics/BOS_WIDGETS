const { loading, amount, routerAddress, target, onLoad, currency, from, to } = props;

const BASE_API = 'https://open-api.xy.finance/v1'


function getToken() {
    let fromToken
    let toToken
    const promise = asyncFetch(`${BASE_API}/recommendedTokens`).then(res => {
        const tokens = res.body.recommendedTokens
        return tokens
    })

    return promise.then(tokens => {
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i]
            if (!fromToken && token.symbol === currency.symbol && token.chainId === from.id.toString()) {
                fromToken = token.address
            }

            if (!toToken && token.symbol === currency.symbol && token.chainId === to.id.toString()) {
                toToken = token.address
            }

            if (fromToken && toToken) {
                break
            }
        }

        return {
            fromToken,
            toToken
        }
    })
}

function getQuote(fromChainId, toChainId, fromTokenAddress, toTokenAddress, amount) {
    if (Number.isNaN(amount)) {
        return null
    }
    return asyncFetch(`${BASE_API}/quote?srcChainId=${fromChainId}&fromTokenAddress=${fromTokenAddress}&amount=${amount}&destChainId=${toChainId}&toTokenAddress=${toTokenAddress}`)
}



useEffect(() => {
    if (!loading || !amount || Number(amount) <= 0) return

    const _amount = new Big(amount).mul(Math.pow(10, currency.decimals)).toString()
    getToken().then(res => {
        return getQuote(from.id, to.id, res.fromToken, res.toToken, _amount)
    }).then(res => {
        if (res?.body?.isSuccess) {
            const { body } = res
            onLoad({
                received: body.quote.toTokenAmount,
                gasCost: body.xyFee.amount,
                quote: body,
                amount: amount
            });
        } else {
            onLoad({
                received: 0,
                gasCost: 0,
                errorTips: 'No route',
                amount: amount
            });
        }
    }).catch(e => {
        if (amount !== res?.body?.fromTokenAmount) {
            return
        }
        onLoad({
            received: 0,
            gasCost: 0,
            amount: amount,
            errorTips: 'Invalid amount',
        });
    })

}, [loading, amount])

return "";
