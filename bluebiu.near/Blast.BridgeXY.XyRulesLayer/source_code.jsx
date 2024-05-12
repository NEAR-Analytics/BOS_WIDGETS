const Container = styled.div`
    position: absolute;
    left: -9999px;
    right: -9999px;
    top: -9999px;
    bottom: -9999px;
    background:rgba(0, 0, 0, 0.5);
    z-index: 1100;
`;

const Box = styled.div`
    width: 706px;
    background: rgba(38, 40, 54, 1);
    padding: 12px 20px 0 57px;
    position: absolute;
    border-radius: 16px;
    z-index: 11;
    border: 1px solid rgba(55, 58, 83, 1);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 30px;
    .spe {
        font-weight: 700;
    }
`

const Title = styled.div`
    font-size: 16px;
    font-weight: 700;
    line-height: 19.5px;
    color: rgba(255, 255, 255, 1);
`

const SubTitle = styled.div`
    font-size: 18px;
    font-weight: 700;
    line-height: 21.94px;
    color: rgba(235, 244, 121, 1);
    margin-top: 25px;
`

const List = styled.ul`
    margin-top: 10px;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    padding-left: 15px;
    li {
        padding: 2px 0;
    }
`

const SubListTitle = styled.div`
    margin-top: 25px;
    color: rgba(151, 154, 190, 1);
`

const SubList = styled.ul`
    margin-top: 10px;
    color: rgba(151, 154, 190, 1);
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    padding-left: 15px;
    li {
        padding: 2px 0;
        .valid {
            color: rgba(129, 237, 112, 1);
        }
        .in-valid {
            color: rgba(255, 84, 125, 1);
        }
    }
`

const Close = styled.div`
    position: absolute;
    right: 22px;
    top: 25px;
    cursor: pointer;
`


return (
    <Container>
        <Box>
            <Close onClick={() => { props.hideRules() }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z" fill="#979ABE" />
                </svg>
            </Close>
            <Title>Blast Point Eligible</Title>
            <SubTitle>What can users do to earn Blast Points?</SubTitle>
            <List>
                <li>Bridge or cross-chain swap any amount of any token to Blast via XY Bridge;</li>
                <li>Blast Points rewards are <span className="spe">based on bridge fees, NOT transfer amount;</span></li>
                <li>Higher bridge fees spent equates more shares to get Blast Points;</li>
                <li>Bridge fees consumed will be calculated separately for each epoch.</li>
            </List>

            <SubListTitle>
                Note: <span className="spe">Only cross-chain routes via XY Bridge will be eligible for Blast points!</span>
                <div>e.g.</div>
            </SubListTitle>
            <SubList>
                <li>Bridge: ETH (Optimism) - to ETH (Blast) - yBridge: <span className="valid">Valid</span></li>
                <li>Bridge & Swap: BNB (BSC) -  to WETH(Blast)  - yBridge: <span className="valid">Valid</span></li>
                <li>Bridge & Swap: CRV (Arbitrum) - to ALIEN (BLAST) - yBridge: <span className="valid">Valid</span></li>
                <li>Bridge & Swap: USDT (BNB) to USDB (Blast) - Synapse: <span className="in-valid">Invalid</span></li>
                <li>On-Chain Swap: Any token on Blast - any token on Blast: <span className="in-valid">Invalid</span></li>
            </SubList>
        </Box>
    </Container>
);
