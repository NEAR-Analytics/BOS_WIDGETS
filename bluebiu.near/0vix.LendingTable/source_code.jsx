const Table = styled.div`
  width: 100%;
  background-color: #181a27;
  border: 1px solid #332c4b;
  border-radius: 12px;

  @media (max-width: 640px) {
    background-color: transparent;
    border: none;
  }
`;
const Title = styled.div`
  padding: 30px 30px 10px;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  color: #fff;
  @media (max-width: 640px) {
    font-size: 16px;
    padding: 0px;
  }
`;
const Header = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  padding: 10px 30px;
  display: flex;
  color: #7c7f96;
  @media (max-width: 640px) {
    display: none;
  }
`;
const Column = styled.div``;
const Row = styled.div`
  display: flex;
  padding: 0px 30px;
  transition: 0.5s;
  height: 60px;
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
const Asset = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled.img`
  vertical-align: top;
  width: 32px;
  hight: 32px;
  border-radius: 50%;
  margin-right: 8px;
`;
const Name = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;
const Cell = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  @media (max-width: 640px) {
    width: 100% !important;
    &:first-child {
      margin-bottom: 10px;
    }
  }
`;
const Total = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  @media (max-width: 640px) {
    text-align: right;
  }
`;
const TotalValue = styled.div`
  color: #7c7f96;
  font-size: 14px;
  font-weight: 500;
  @media (max-width: 640px) {
    text-align: right;
  }
`;
const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 640px) {
    justify-content: center;
    width: 100%;
    padding: 10px 20px 0px;
  }
`;
const Spacer = styled.div`
  width: 10px;
`;
const Flex = styled.div`
  display: flex;
  flex-grow: 1;
`;

const { title, columns, data, buttons, onButtonClick } = props;
const specialTotal = [
  "userSupply",
  "totalSupply",
  "userBorrow",
  "totalBorrows",
];
const formatTotal = (total) => {
  const BTotal = Big(total);
  if (BTotal.eq(0)) return "0";
  if (BTotal.lt(0.01)) return "<0.01";
  if (BTotal.lt(1e3)) return BTotal.toFixed(2);
  if (BTotal.lt(1e6)) return BTotal.div(1e3).toFixed(2) + "K";
  return BTotal.div(1e6).toFixed(2) + "M";
};
const renderTotal = (record, key, isSpecialKey) => {
  return (
    <div className={`${isSpecialKey && "special-total"}`}>
      <Total>{formatTotal(record[key])}</Total>
      <TotalValue>${formatTotal(record[`${key}_value`])}</TotalValue>
    </div>
  );
};
const renderAssetName = (record) => {
  return (
    <RowHeader>
      <Asset>
        <Logo src={record.logo} />
        <Name>{record.name}</Name>
      </Asset>
      {record.userSupply && renderTotal(record, "userSupply", true)}
      {record.totalSupply && renderTotal(record, "totalSupply", true)}
      {record.userBorrow && renderTotal(record, "userBorrow", true)}
      {record.totalBorrows && renderTotal(record, "totalBorrows", true)}
    </RowHeader>
  );
};

const renderCollateral = (record) => {
  return (
    <Widget
      src="bluebiu.near/widget/0vix.LendingCollateralButton"
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
    <Title>{title}</Title>
    <Header>
      {columns?.map((column) => (
        <Column key={column.key || column.type} style={{ width: column.width }}>
          {column.name}
        </Column>
      ))}
    </Header>

    {data?.map((record, i) => (
      <Row key={i}>
        {columns?.map((column) => (
          <Cell
            key={column.key || column.type}
            className={specialTotal.includes(column.key) && "special-key"}
            style={{
              width: column.width,
              textAlign: column.type === "button" ? "right" : "left",
            }}
          >
            {column.type === "name" && renderAssetName(record)}
            {column.type === "button" && (
              <Buttons>
                {buttons?.map((button, j) => (
                  <Flex key={j}>
                    <Widget
                      src="bluebiu.near/widget/0vix.LendingTableButton"
                      props={{
                        onClick: () => {
                          onButtonClick?.(record.address, button.text);
                        },
                        text: button.text,
                        isPrimary: button.isPrimary,
                      }}
                    />
                    {buttons.length > 1 && j !== buttons.length - 1 && (
                      <Spacer />
                    )}
                  </Flex>
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
  </Table>
);
