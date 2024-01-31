State.init({
    bridges: [],
    chains: [],
    showBridge: false,
    currentBridge: null,
    chainFrom: null,
    chainTo: null,
})

// const [name, setName] = useState('22')

useEffect(() => {
    const { bridge, chainFrom, chainTo } = props
    asyncFetch('https://li.quest/v1/tools').then(bridgeResult => {
        if (bridgeResult.body && bridgeResult.body.bridges) {
            console.log('bridges: ', bridgeResult.body.bridges)
            console.log('bridgeResult.body.bridges.filter(item => item.key === bridge)[0]', bridgeResult.body.bridges.filter(item => item.key === bridge)[0])
            State.update({
                currentBridge: bridgeResult.body.bridges.filter(item => item.key === bridge)[0]
            })
        }
    })

    asyncFetch('https://li.quest/v1/chains').then(chainResult => {
        if (chainResult.body && chainResult.body.chains) {
            console.log('chains: ', chainResult.body.chains)
            console.log('chainResult.body.chains.filter(item => item.id === chainFrom)[0] ', chainResult.body.chains.filter(item => item.id === chainFrom)[0])
            State.update({
                chainFrom: chainResult.body.chains.filter(item => item.id === Number(chainFrom))[0],
                chainTo: chainResult.body.chains.filter(item => item.id === Number(chainTo))[0],
            })
        }
    })

}, [props.bridge, props.chainFrom, props.chainTo])


const Item = styled.li`
    color: #fff;
    cursor: pointer;
`

const Back = styled.a`
    color: #fff;
    cursor: pointer;
`

const Box = styled.div`
    display: flex;
    width: 800px;
    margin: 0 auto;
`


return <>
    {
        state.chainFrom && state.chainTo && state.currentBridge
            ? <Widget src="dapdapbos.near/widget/Bridge.Index"
                props={{
                    bridge: state.currentBridge,
                    chainFrom: state.chainFrom,
                    chainTo: state.chainTo,
                    getLifi: props.getLifi,
                    toast: props.toast,
                }} /> : <>333</>
    }
</>