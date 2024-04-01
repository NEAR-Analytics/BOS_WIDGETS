const Wrapper = styled.div`
  margin-top: 20px;
`
const SvgIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &.icon-right {
    position: absolute;
    right: 28px;
    top: 50%;
    transform: translateY(-50%);

    &.rotate {
      transform: translateY(-50%) rotate(90deg);
    }
  }
`
const Table = styled.div`
  
`
const THead = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 30px;
`
const Th = styled.div`
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:first-of-type {
    width: 40%;
  }
  &:nth-of-type(2) {
    width: 10%;
  }
  &:nth-of-type(3) {
    width: 10%;
  }
  &:nth-of-type(4) {
    width: 10%;
  }
  &:nth-of-type(5) {
    width: 10%;
  }
  &:nth-of-type(6) {
    width: 10%;
  }
  &:nth-of-type(7) {
    width: 10%;
  }
`
const TBody = styled.div`
`
const TrWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid #373A53;
  margin-bottom: 8px;
  overflow: hidden;
`
const Tr = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 84px;
  background: #262836;
  padding: 0 24px;
`
const Td = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  &.column {
    flex-direction: column;
    gap: 5px;
  }
  &:first-of-type {
    width: 40%;
  }
  &:nth-of-type(2) {
    width: 10%;
  }
  &:nth-of-type(3) {
    width: 10%;
  }
  &:nth-of-type(4) {
    width: 10%;
  }
  &:nth-of-type(5) {
    width: 10%;
  }
  &:nth-of-type(6) {
    width: 10%;
  }
  &:nth-of-type(7) {
    width: 10%;
  }
`
const TdTxt = styled.div`
  color: #FFF;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &.gray {
    color: #979ABE;
    font-size: 12px;
  }
`
const PoolPercentage = styled.div`
  padding: 3px 8px;
  border-radius: 24px;
  background: rgba(151, 154, 190, 0.1);
  color: #979ABE;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const StrategyTxt = styled.div`
  padding: 7px 10px;
  border-radius: 6px;
  background: rgba(151, 154, 190, 0.1);
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const StyledVaultImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const {
  toast,
  prices,
  refetch,
  dataList,
  dataIndex,
  columnList,
  onChangeDataIndex,
  addresses,
  addAction,
  proxyAddress,
  userPositions,
  ICON_VAULT_MAP
} = props

function renderTD(data, column, index) {
  if (column.type === 'slot') {
    return column.render(data, index)
  }
  if (column.type === 'svg') {
    return (
      <SvgIcon>
        {data[column.key]}
      </SvgIcon>
    )
  }
  return (
    <TdTxt>{data[column.key]}</TdTxt>
  )
}
return (
  <Wrapper>
    {

      <Table>
        <THead>
          {
            columnList.map((column, index) => {
              return (
                <Th key={index} style={{ width: column.width }}>{column.label}</Th>
              )
            })
          }
        </THead>
        <TBody>
          {dataList && dataList.map((data, index) => {
            return (
              <TrWrapper key={data.id}>
                <Tr onClick={() => onChangeDataIndex(index)}>
                  {
                    columnList.map((column, columnIndex) => {
                      return (
                        <Td key={index + columnIndex} className={column.direction === 'column' ? 'column' : ''} style={{ width: column.width }}>{renderTD(data, column, index, columnIndex)}</Td>
                      )
                    })
                  }
                </Tr>
                {index === dataIndex && <Widget
                  key={data.id}
                  src={"bluebiu.near/widget/Liquidity.Bridge.STEAKHUT.Detail"}
                  props={{
                    data: dataList[dataIndex],
                    toast,
                    theme,
                    prices,
                    refetch,
                    addresses,
                    addAction,
                    proxyAddress,
                    userPositions,
                    ICON_VAULT_MAP
                  }}
                />}
              </TrWrapper>
            )
          })}

        </TBody>
      </Table>
    }
  </Wrapper>
)