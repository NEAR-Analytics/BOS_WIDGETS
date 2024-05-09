const { loading, amount, routerAddress, target, onLoad } = props;

useEffect(() => {
    if (!loading) return

    asyncFetch('https://api.orbiter.finance/sdk/routers/cross-chain')
        .then(routerRes => {
            const result = routerRes.body.result

            let line = ''
            if (target.dstId === 1) {
                line = `534352/1-ETH/ETH`
            } else {
                line = `1/534352-ETH/ETH`
            }

            const quote = result.find(item => item.line === line)
            if (!quote) {
                onLoad({
                    received: 0,
                    gasCost: 0,
                    errorTips: 'No route',
                });
                return
            }
            const minBig = new Big(quote.minAmt)
            const maxBig = new Big(quote.maxAmt)
            const amountBig = new Big(amount)
            const feeBig = new Big(quote.withholdingFee).plus(new Big(quote.tradeFee).div(Math.pow(10, 18)))
            if (amountBig.gte(maxBig) || amountBig.lte(minBig)) {
                onLoad({
                    received: 0,
                    gasCost: 0,
                    errorTips: 'Invalid amount',
                });
                return
            }

            onLoad({
                received: amountBig.minus(feeBig).toString(),
                gasCost: feeBig.toString(),
                quote
            });
        }).catch(e => {
            onLoad({
                received: 0,
                gasCost: 0,
                errorTips: 'Invalid amount',
            });
        })


}, [loading])

return "";
