const {
  ListWrapper,
  SvgIcon,
  Table,
  THead,
  Th,
  TBody,
  TrWrapper,
  Tr,
  Td,
  TdTxt,
  PoolPercentage,
  StrategyTxt,
  StyledVaultImage,
} = VM.require('bluebiu.near/widget/Liquidity.Handler.Styles')

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
  <ListWrapper>
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
  </ListWrapper>
)