const { dataSet, loading } = props;

const Loading = <Widget src="flashui.near/widget/Loading" />;

const DesktopRow = styled.div`
  display: flex;
  padding: 16px;
  align-items: center;
  gap: 72px;
  align-self: stretch;
  border-bottom: 1px solid #e3e3e0;

  @media screen and (max-width: 768px) {
    display: none;
  }

  .desktop-value {
    min-width: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    position: relative;
    border-radius: 100px;

    span {
      z-index: 100;
    }
  }
`;

const MobileRow = styled.div`
  display: none;
  width: 100%;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 12px;
  border: 1px solid #e3e3e0;
  background: var(--Primary-Base-White, #fff);
  box-shadow:
    0px 97px 27px 0px rgba(0, 0, 0, 0),
    0px 62px 25px 0px rgba(0, 0, 0, 0),
    0px 35px 21px 0px rgba(0, 0, 0, 0.02),
    0px 16px 16px 0px rgba(0, 0, 0, 0.03),
    0px 4px 9px 0px rgba(0, 0, 0, 0.03);

  @media screen and (max-width: 768px) {
    display: flex;
  }

  .mobile-cell {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 12px;
    align-self: stretch;
    border-bottom: 1px solid #e3e3e0;

    .mobile-value {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        color: #5c656a;
      }
    }
  }
`;

const Colored = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 100px;
  background: #f5f5f5;
  height: ${(props) => props.height}px;

  .value {
    position: absolute;
    height: ${(props) => props.height}px;
    left: 0;
    width: ${(props) => props.width ?? 0}%;
    background: ${(props) => props.color ?? "inherit"};
    border-radius: ${(props) =>
      props.width === 100 ? "100px" : "100px 0 0 100px"};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  padding-top: 1rem;
`;

const DaoName = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  text-wrap: nowrap;
  font-size: 16px;
  font-weight: 600;
  justify-content: flex-start;
  background: transparent;
`;

const TRESHOLD = 75;

const dappUsedPercentage = (value) =>
  parseFloat(value / Math.max(...dataSet.map((d) => d.dappsUsed))) * 100;

const getPercentage = (min, max) => parseFloat(min / max) * 100;

const formatValue = (value) => {
  const val = value ? parseFloat(value) : null;

  if (!val) return "n/a";

  return val >= 1000000000
    ? `${parseFloat(val / 1000000000).toFixed(2)}B`
    : val >= 1000000
    ? `${parseFloat(val / 1000000).toFixed(2)}M`
    : val >= 1000
    ? `${parseFloat(val / 1000).toFixed(2)}K`
    : Number.isInteger(val)
    ? val
    : val.toFixed(2);
};

const TooltipContent = ({ key, value }) => (
  <div className="justify-content-between w-100 d-flex gap-2">
    <div>{key}:</div> <div>{formatValue(value)}</div>
  </div>
);

const DesktopCell = ({ width, color, value }) => (
  <div className="desktop-value">
    <Colored width={width} color={color} height={22}>
      <div className="value"></div>
      <span>{formatValue(value)}</span>
    </Colored>
  </div>
);

const MobileCell = ({ title, value, width, color }) => (
  <div className="mobile-cell">
    <div className="mobile-value">
      <div className="d-flex gap-1 title">
        <i className="ph ph-info" />
        <span>{title}</span>
      </div>
      {formatValue(value)}
    </div>

    <Colored width={width} color={color} height={10}>
      <div className="value"></div>
    </Colored>
  </div>
);

return (
  <Container>
    {dataSet.map(
      ({ title, userRetentions, dappsUsed, acquisitionCost }, index) => (
        <>
          <DesktopRow>
            <DaoName>{title}</DaoName>
            <DesktopCell
              width={getPercentage(userRetentions, 1)}
              color={
                getPercentage(userRetentions, 1) >= TRESHOLD
                  ? "#51D38E"
                  : "#FC6F60"
              }
              value={userRetentions}
            />
            <DesktopCell
              width={dappUsedPercentage(dappsUsed)}
              color={
                dappUsedPercentage(dappsUsed) >= TRESHOLD
                  ? "#51D38E"
                  : "#FC6F60"
              }
              value={dappsUsed}
            />
            <DesktopCell
              width={
                acquisitionCost < 1 ? getPercentage(1 - acquisitionCost, 1) : 5
              }
              color={
                acquisitionCost && (acquisitionCost < 1 ? "#51D38E" : "#FC6F60")
              }
              value={acquisitionCost}
            />
          </DesktopRow>

          <MobileRow>
            <DaoName>{title}</DaoName>
            <MobileCell
              title="User Retention"
              width={getPercentage(userRetentions, 10, 2)}
              color={userRetentions >= 1 ? "#51D38E" : "#FC6F60"}
              value={userRetentions}
            />
            <MobileCell
              title="DApp's Used"
              width={getPercentage(dappsUsed, 10, 2)}
              color={"#51D38E"}
              value={dappsUsed}
            />
            <MobileCell
              title="Acquisition Cost"
              width={getPercentage(acquisitionCost, 10, 2)}
              color={acquisitionCost < 1 ? "#51D38E" : "#FC6F60"}
              value={acquisitionCost}
            />
          </MobileRow>
        </>
      ),
    )}
  </Container>
);
