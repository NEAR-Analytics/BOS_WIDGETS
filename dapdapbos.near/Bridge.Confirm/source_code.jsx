const ConfirmBox = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 11;
`

const PopWapper = styled.div`
    width: 396px;
    padding: 25px 20px;
    border-radius: 16px;
    border: 1px solid #373A53;
    background: #262836;
    position: relative;
`

const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const HeaderItem = styled.div`
    display: flex;
    align-items: center;
`

const ChainIcon = styled.img`
    width: 16px;
    height: 16px;
    border-radius: 4px;
`

const ChainName = styled.div`
    color: #FFF;
    font-size: 16px;
    font-weight: 400;
    margin-left: 5px;
`

const ArrowWapper = styled.div`
    margin: 0 16px;
`

const CloseWapper = styled.div`
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
`

const List = styled.div`
    margin-top: 30px;
`

const ListItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px 0;
`

const ListItemTitle = styled.div`
    color: #979ABE;
    font-size: 16px;
    font-weight: 400;
`

const ListItemContent = styled.div`
    color: #FFF;
    text-align: right;
    font-size: 16px;
    font-weight: 400;
`

const ButtonWapper = styled.div`
    margin-top: 30px;
`

const {
    chainFrom,
    chainTo,
    toAddress,
    duration,
    gasCostUSD,
    sendAmount,
    receiveAmount,
    onClose,
    loading,
    disabled,
    color,
} = props

return <ConfirmBox>
    <PopWapper>
        <Header>
            <HeaderItem>
                <ChainIcon src={chainFrom.icon} />
                <ChainName>{chainFrom.chainName}</ChainName>
            </HeaderItem>
            <ArrowWapper>
                <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4.99992L11.5 4.99992M11.5 4.99992L7.49992 9.00016M11.5 4.99992L7.49992 0.999837" stroke="#979ABE" stroke-linecap="round" />
                </svg>
            </ArrowWapper>
            <HeaderItem>
                <ChainIcon src={chainTo.icon} />
                <ChainName>{chainTo.chainName}</ChainName>
            </HeaderItem>
        </Header>

        <CloseWapper>
            <Widget
                src="dapdapbos.near/widget/Bridge.Select.CloseIcon"
                props={{
                    onClose,
                    disabled,
                }}
            />
        </CloseWapper>

        <List>
            <ListItem>
                <ListItemTitle>Send</ListItemTitle>
                <ListItemContent>{sendAmount}</ListItemContent>
            </ListItem>
            <ListItem>
                <ListItemTitle>To</ListItemTitle>
                <ListItemContent>{toAddress}</ListItemContent>
            </ListItem>
            <ListItem>
                <ListItemTitle>Est. Arrival</ListItemTitle>
                <ListItemContent>~{duration}min</ListItemContent>
            </ListItem>
            <ListItem>
                <ListItemTitle>Fee</ListItemTitle>
                <ListItemContent>${gasCostUSD}</ListItemContent>
            </ListItem>
            <ListItem>
                <ListItemTitle>Est. Received</ListItemTitle>
                <ListItemContent>{receiveAmount}</ListItemContent>
            </ListItem>
        </List>

        <ButtonWapper>
            <Widget
                src="dapdapbos.near/widget/UI.Button"
                props={{
                    text: 'Confirm and Send',
                    type: 'primary',
                    block: true,
                    className: 'pink',
                    loading,
                    style: { backgroundColor: color },
                    disabled,
                    onClick: () => {
                        !disabled && props.onSend()
                    }
                }}
            />
        </ButtonWapper>

    </PopWapper>
</ConfirmBox>