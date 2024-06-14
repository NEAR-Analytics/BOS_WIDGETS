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
  StyledEmptyTips,
} = VM.require("bluebiu.near/widget/Staking.Teahouse.Styles");

const {
  toast,
  prices,
  dataList,
  dataIndex,
  columnList,
  onChangeDataIndex,
  addresses,
  addAction,
} = props;

function renderTD(data, column, index) {
  if (column.type === "slot") {
    return column.render(data, index);
  }
  if (column.type === "svg") {
    return <SvgIcon>{data[column.key]}</SvgIcon>;
  }
  return <TdTxt>{data[column.key]}</TdTxt>;
}

return (
  <ListWrapper>
    {
      <Table>
        <THead>
          {Array.isArray(columnList) &&
            columnList.map((column, index) => {
              return (
                <Th key={index} style={{ width: column.width }}>
                  {column.label}
                </Th>
              );
            })}
        </THead>
        {Array.isArray(dataList) && dataList.length ? (
          <TBody>
            {dataList.map((data, index) => {
              return (
                <TrWrapper key={data.id}>
                  <Tr onClick={() => onChangeDataIndex(index)}>
                    {columnList.map((column, columnIndex) => {
                      return (
                        <Td
                          key={index + columnIndex}
                          className={
                            column.direction === "column" ? "column" : ""
                          }
                          style={{ width: column.width }}
                        >
                          {renderTD(data, column, index, columnIndex)}
                        </Td>
                      );
                    })}
                  </Tr>
                  {index === dataIndex && data.type === "LP" && (
                    <Widget
                      key={data.id}
                      src={"bluebiu.near/widget/Staking.Teahouse.Detail"}
                      props={{
                        ...props,
                        data: dataList[dataIndex],
                      }}
                    />
                  )}
                  {index === dataIndex && data.type === "MANAGED" && (
                    <Widget
                      key={data.id}
                      src={"bluebiu.near/widget/Staking.Teahouse.ManagedDetail"}
                      props={{
                        ...props,
                        data: dataList[dataIndex],
                      }}
                    />
                  )}
                </TrWrapper>
              );
            })}
          </TBody>
        ) : (
          <StyledEmptyTips>Um...we didn't find anything</StyledEmptyTips>
        )}
      </Table>
    }
  </ListWrapper>
);
