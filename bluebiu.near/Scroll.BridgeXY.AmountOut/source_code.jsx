const { loading, amount, routerAddress, target, onLoad, currency, from, to } = props;

const BASE_API = 'https://open-api.xy.finance/v1'

function getToken() {
    let fromToken
    let toToken
    return asyncFetch(`${BASE_API}/recommendedTokens`).then(res => {
        const tokens = res.body.recommendedTokens
        console.log('tokens: ', tokens, props)


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
    if (!loading) return

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
            });
        } else {
            onLoad({
                received: 0,
                gasCost: 0,
                errorTips: 'No route',
            });
        }
    }).catch(e => {
        onLoad({
            received: 0,
            gasCost: 0,
            errorTips: 'Invalid amount',
        });
    })


    // asyncFetch('https://api.orbiter.finance/sdk/routers/cross-chain')
    //     .then(routerRes => {
    //         const result = routerRes.body.result

    //         let line = ''
    //         if (target.dstId === 1) {
    //             line = `534352/1-ETH/ETH`
    //         } else {
    //             line = `1/534352-ETH/ETH`
    //         }

    //         const quote = result.find(item => item.line === line)
    //         if (!quote) {
    //             onLoad({
    //                 received: 0,
    //                 gasCost: 0,
    //                 errorTips: 'No route',
    //             });
    //             return
    //         }
    //         const minBig = new Big(quote.minAmt)
    //         const maxBig = new Big(quote.maxAmt)
    //         const amountBig = new Big(amount)
    //         const feeBig = new Big(quote.withholdingFee).plus(new Big(quote.tradeFee).div(Math.pow(10, 18)))
    //         if (amountBig.gte(maxBig) || amountBig.lte(minBig)) {
    //             onLoad({
    //                 received: 0,
    //                 gasCost: 0,
    //                 errorTips: 'Invalid amount',
    //             });
    //             return
    //         }

    //         onLoad({
    //             received: amountBig.minus(feeBig).toString(),
    //             gasCost: feeBig.toString(),
    //             quote
    //         });
    //     }).catch(e => {
    //         onLoad({
    //             received: 0,
    //             gasCost: 0,
    //             errorTips: 'Invalid amount',
    //         });
    //     })


}, [loading])

return "";
