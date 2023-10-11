const Table = styled.div``;
const Header = styled.div`
  font-size: 14px;
  font-weight: 400;
  padding: 10px 20px 0px;
  display: flex;
  color: #7c7f96;
  @media (max-width: 640px) {
    display: none;
  }
`;
const Body = styled.div`
  min-height: 50px;
`;
const Column = styled.div``;
const Row = styled.div`
  display: flex;
  padding: 0px 20px;
  transition: 0.5s;
  height: 56px;
  align-items: center;
  &:last-child {
    border-radius: 0px 0px 12px 12px;
  }
  &:hover {
    background-color: rgba(53, 55, 73, 0.5);
  }
  @media (max-width: 640px) {
    background-color: #181a27;
    border: 1px solid #332c4b;
    border-radius: 10px;
    flex-direction: column;
    height: auto;
    padding: 20px 0px;
    margin-top: 10px;
    .special-key {
      display: none;
    }

    &:last-child {
      border-radius: 10px;
    }
  }
`;
const RowHeader = styled.div`
  display: flex;
  @media (max-width: 640px) {
    justify-content: space-between;
    padding: 0px 20px 10px;
    border-bottom: 1px solid #2e3145;
  }
  @media (min-width: 640px) {
    .special-total {
      display: none;
    }
  }
`;
const NormalCell = styled.div`
  display: flex;
  align-items: center;
  .column-name {
    display: none;
    color: #7c7f96;
    font-size: 13px;
  }
  @media (max-width: 640px) {
    justify-content: space-between;
    padding: 10px 20px 5px;
    align-items: flex-start;
    .column-name {
      display: block;
    }
    .row-value {
      color: #fff;
      font-size: 15px;
    }
  }
`;
const Cell = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  @media (max-width: 640px) {
    width: 100% !important;
    &:first-child {
      margin-bottom: 10px;
    }
  }
`;
const Total = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  @media (max-width: 640px) {
    text-align: right;
  }
`;
const TotalValue = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  font-weight: 400;
  @media (max-width: 640px) {
    text-align: right;
  }
`;
const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  @media (max-width: 640px) {
    justify-content: center;
    width: 100%;
    padding: 10px 20px 0px;
  }
`;

const { columns, data, buttons, totalReverse, onButtonClick } = props;

const renderTotal = (record, key, isSpecialKey) => {
  return (
    <div className={`${isSpecialKey && "special-total"}`}>
      <Total>
        <Widget
          src="bluebiu.near/widget/Avalanche.Lending.Total"
          props={{
            total: totalReverse ? record[key] : record[`${key}_value`],
            digit: 2,
            unit: totalReverse ? "" : "$",
          }}
        />
      </Total>
      <TotalValue>
        <Widget
          src="bluebiu.near/widget/Avalanche.Lending.Total"
          props={{
            total: totalReverse ? record[`${key}_value`] : record[key],
            digit: 2,
            unit: totalReverse ? "$" : "",
          }}
        />
      </TotalValue>
    </div>
  );
};
const renderAssetName = (market) => {
  return (
    <RowHeader>
      <Widget
        src="bluebiu.near/widget/Avalanche.Lending.Asset"
        props={{
          icon: market.icon,
          symbol: market.symbol,
          dappIcon: market.dappIcon,
          dappName: market.dappName,
        }}
      />
    </RowHeader>
  );
};

const renderCollateral = (record) => {
  return (
    <Widget
      src="bluebiu.near/widget/Avalanche.Lending.Switch"
      props={{
        onChange: () => {
          onButtonClick?.(
            record.address,
            record.isCollateral
              ? "Disable as Collateral"
              : "Enable as Collateral"
          );
        },
        active: record.isCollateral,
      }}
    />
  );
};
const renderApy = (record) => <div className="apy">{record.apy}</div>;

return (
  <Table>
    <Header>
      {columns?.map((column) => (
        <Column key={column.key || column.type} style={{ width: column.width }}>
          {column.name}
        </Column>
      ))}
    </Header>
    <Body>
      {data?.map((record) => (
        <Row key={record.address}>
          {columns?.map((column) => (
            <Cell
              key={column.key || column.type}
              style={{
                width: column.width,
                textAlign: column.type === "button" ? "right" : "left",
              }}
            >
              {column.type === "name" && renderAssetName(record)}
              {column.type === "button" && (
                <Buttons>
                  {buttons?.map((button, j) => (
                    <Widget
                      src="bluebiu.near/widget/Avalanche.Lending.TableButton"
                      key={j}
                      props={{
                        onClick: () => {
                          if (button.text === "Claim") {
                            onButtonClick?.(record.dappName);
                          } else {
                            onButtonClick?.(record.address, button.text);
                          }
                        },
                        text: button.text,
                        loading: button.loading,
                      }}
                    />
                  ))}
                </Buttons>
              )}
              {!["name", "button"].includes(column.type) && (
                <NormalCell>
                  <div className="column-name">{column.name}</div>
                  <div className="row-value">
                    {column.type === "total" && renderTotal(record, column.key)}
                    {column.type === "apy" && renderApy(record)}
                    {column.type === "collateral" && renderCollateral(record)}
                    {!["total", "apy", "collateral"].includes(column.type) &&
                      record[column.key]}
                  </div>
                </NormalCell>
              )}
            </Cell>
          ))}
        </Row>
      ))}
    </Body>
  </Table>
);
