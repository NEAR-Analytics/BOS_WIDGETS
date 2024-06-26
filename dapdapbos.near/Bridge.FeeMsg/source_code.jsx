const FeeWapper = styled.div`
    width: 446px;
    height: 75px;
    border-radius: 12px;
    border: 1px solid #373A53;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    margin-top: 16px;
`

const LineWapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #979ABE;
    height: 37px;
    padding: 0 10px;
`


return <FeeWapper>
    <LineWapper>
        <div>Est. Arrival</div>
        <div>~{props.duration} min</div>
    </LineWapper>
    <LineWapper>
        <div>Fees</div>
        <div>${props.gasCostUSD}</div>
    </LineWapper>
</FeeWapper>