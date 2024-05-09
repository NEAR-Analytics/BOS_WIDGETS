const { chain, chainList, toggleDocClickHandler, onChainChange } = props

const ChainListModal = styled.div`
    width: 100%;
    position: absolute;
    left: 0;
    top: 102%;
    background: #2E3142;
    border-radius: 12px;
    padding: 12px;
    z-index: 21;
`

const ChainRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    height: 42px;
`


const ChainItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 35px;
    border-radius: 8px;
    border: 1px solid #373A53;
    background: #2E3142;
    flex: 1;
    padding: 0 6px;
    cursor: pointer;
    position: relative;
`

const ItemGroup = styled.div`
    display: flex;
`

const ChainIcon = styled.img`
    width: 26px;
    height: 26px;
    border-radius: 8px;
`
const ChainName = styled.div`
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    color: #fff;
    margin-left: 7px;
`

State.init({
    modalShow: false
})

useEffect(() => {
    function docClickHandler() {
        State.update({
            modalShow: false
        })
    }

    toggleDocClickHandler(docClickHandler)
    return () => {
        toggleDocClickHandler(docClickHandler)
    }
}, [])

return <ChainItem onClick={(e) => {
    e.stopPropagation()
    State.update({
        modalShow: !state.modalShow
    })
}}>
    <ItemGroup>
        <ChainIcon src={chain.icon} />
        <ChainName>{chain.chainName}</ChainName>
    </ItemGroup>
    <Widget src="dapdapbos.near/widget/Swap.ArrowIcon" />
    {
        state.modalShow ? <ChainListModal onClick={(e) => { e.stopPropagation() }}>
            {
                chainList.map(chain => {
                    return <ChainRow key={chain.chainId} onClick={() => {
                        onChainChange(chain)
                        State.update({
                            modalShow: false
                        })
                    }}>
                        <ChainIcon src={chain.icon} />
                        <ChainName>{chain.chainName}</ChainName>
                    </ChainRow>
                })
            }
        </ChainListModal> : null
    }
</ChainItem>