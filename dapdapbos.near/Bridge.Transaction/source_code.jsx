const TransactionWapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 478px;
    height: 50px;
    padding: 0 16px;
    border-radius: 10px;
    border: 1px solid rgba(55, 58, 83, 1);
    background: #262836;
`

const AmountWapper = styled.div`
    display: flex;
    align-items: center;
`

const Amount = styled.div`
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    color: #FFFFFF;
`

const AmountMsg = styled.div`
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    color: #8C7EBD;
    margin-left: 5px;

`

const Refresh = styled.a`
    text-decoration: underline;
    cursor: pointer;
    color: rgba(151, 154, 190, 1);
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
`


return <TransactionWapper>
    <AmountWapper>
        <Amount>{props.transactionList.length}</Amount>
        <AmountMsg>Pending transaction</AmountMsg>
    </AmountWapper>
    <Refresh onClick={props.onRefresh}>Refresh</Refresh>
</TransactionWapper>