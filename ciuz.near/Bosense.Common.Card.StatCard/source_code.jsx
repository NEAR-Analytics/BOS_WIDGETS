let { title, quantity, stat_pc, stat_num } = props;

if (!title) {
  title = "Total Campaigns";
}

if (!quantity) {
  quantity = "123";
}

if (!stat_pc) {
  stat_pc = 12;
}

if (!stat_num) {
  stat_num = 10;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px, rgba(0, 0, 0, 0.05) 0 1px 20px;
  padding: 16px;
  margin: 16px;
  width: 100%;
  max-width: 240px;
  min-height: 160px;
  box-sizing: border-box;
  justify-content: space-between;
  font-size: 16px;
  background-color: #fff;
  color: #000;
  border-radius: 16px;

  &:hover {
    background-color: #6149cd;
    color: #fff;
    .quantity,
    .stat {
      color: #fff !important;
    }
  }

  .quantity {
    font-size: 48px;
    font-weight: 600;
    margin-left: 16px;
  }

  .stat {
    font-size: 24px;
  }

  .stat-default {
    color: #6b6e70;
  }

  .stat-up {
    color: #32baa6;
  }

  .stat-down {
    color: #ff3d4c;
  }
`;

const renderGraph = () => {
  if (stat_pc > 10) {
    return (
      <div className="stat stat-up">
        <i className="bi bi-graph-up"></i>
        {stat_pc}% ({stat_num})
      </div>
    );
  } else if (stat_pc > 0) {
    return (
      <div className="stat stat-default">
        <i className="bi bi-pause"></i>
        {stat_pc}% ({stat_num})
      </div>
    );
  } else {
    return (
      <div className="stat stat-down">
        <i className="bi bi-graph-down"></i>
        {stat_pc}% ({stat_num})
      </div>
    );
  }
};

return (
  <Card className="col">
    <div>{title}</div>
    <div className="quantity">{quantity}</div>
    <div>{renderGraph()}</div>
  </Card>
);
