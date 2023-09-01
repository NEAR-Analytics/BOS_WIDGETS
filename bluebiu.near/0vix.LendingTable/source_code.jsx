const Table = styled.div`
  width: 100%;
  background-color: #181a27;
  border: 1px solid #332c4b;
  border-radius: 12px;
`;
const Title = styled.div`
  padding: 30px 30px 10px;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  color: #fff;
`;
const Header = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  padding: 10px 30px;
  display: flex;
  color: #7c7f96;
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
`;
const Total = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;
const TotalValue = styled.div`
  color: #7c7f96;
  font-size: 14px;
  font-weight: 500;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Spacer = styled.div`
  width: 10px;
`;
const Flex = styled.div`
  display: flex;
`;

const { title, columns, data, buttons, onButtonClick } = props;

const formatTotal = (total) => {
  const BTotal = Big(total);
  if (BTotal.eq(0)) return "0";
  if (BTotal.lt(0.01)) return "<0.01";
  if (BTotal.lt(1e3)) return BTotal.toFixed(2);
  if (BTotal.lt(1e6)) return BTotal.div(1e3).toFixed(2) + "K";
  return BTotal.div(1e6).toFixed(2) + "M";
};

const renderAssetName = (record) => {
  return (
    <Asset>
      <Logo src={record.logo} />
      <Name>{record.name}</Name>
    </Asset>
  );
};
const renderTotal = (record, key) => {
  return (
    <div>
      <Total>{formatTotal(record[key])}</Total>
      <TotalValue>${formatTotal(record[`${key}_value`])}</TotalValue>
    </div>
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

const CELL_MAP = {
  name: renderAssetName,
  total: renderTotal,
  collateral: renderCollateral,
};

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
            style={{
              width: column.width,
              textAlign: column.type === "button" ? "right" : "left",
            }}
          >
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
            {column.type !== "button" && CELL_MAP[column.type]
              ? CELL_MAP[column.type](record, column.key)
              : column.key === "loanToValue"
              ? Number(record[column.key]).toFixed(2) + "%"
              : record[column.key]}
          </Cell>
        ))}
      </Row>
    ))}
  </Table>
);
