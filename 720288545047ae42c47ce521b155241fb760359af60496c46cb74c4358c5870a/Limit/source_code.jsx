const LimitTarde = styled.div`
  background-color: #080d17;
  display: flex;
  flex-direction: column;
  row-gap: 0.75rem;
`;

const AvailableLabel = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.25rem;
  color: #fff;
  padding: 15px 0.75rem;
  .label-text {
    font-size: 14px;
    font-weight: 600;
  }
  .label-coin {
    font-size: 12px;
    padding: 3px 6px;
    background-color: #323232;
    border-radius: 8px;
  }
`;

const TardeFrom = styled.div`
  padding: 0 0.75rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

const DivLine = styled.div`
  width: 100%;
  height: 1px;
  overflow: hidden;
  background-color: #323232;
`;

const TradeBtnWarp = styled.div`
  padding: 0 0.75rem;
  margin-top: 15px;
  .trade-btn-link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 36px;
    border-radius: 10px;
    text-decoration: none;
    color: #fff;
    font-weight: 600;
    background-color: #617168;
  }
`;
const {
  sizeContractSymbol,
  price,
  onTypeChange,
  onLeverChange,
  lever,
  min,
  max,
  nearId,
  exUrl,
} = props;

State.init({
  nearId:
    nearId ||
    "720288545047ae42c47ce521b155241fb760359af60496c46cb74c4358c5870a",
  exUrl: exUrl || "/",
});

return (
  <LimitTarde>
    <AvailableLabel>
      <span class="label-text">Available</span>
      <span class="label-coin">USD</span>
    </AvailableLabel>
    <TardeFrom>
      <Widget
        src={`${state.nearId}/widget/PriceField`}
        props={{
          latestPrice: price,
        }}
      />
      <Widget
        src={`${state.nearId}/widget/SizeField`}
        props={{
          contractSymbol: sizeContractSymbol,
          price: price,
        }}
      />
      <Widget src={`${state.nearId}/widget/InputRate`} />
    </TardeFrom>
    <DivLine />

    <Widget
      src={`${state.nearId}/widget/Leverage`}
      props={{
        lever: lever,
        min: min,
        max: max,
        onTypeChange: (val) => {
          onTypeChange && onTypeChange(val);
        },
        onLeverChange: (val) => {
          onLeverChange && onLeverChange(val);
        },
      }}
    />

    <Widget
      src={`${state.nearId}/widget/SummaryCard`}
      props={{
        tardeType: "limit",
      }}
    />

    <TradeBtnWarp>
      <a
        class="trade-btn-link"
        href={state.exUrl || "/"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Connect Wallet</span>
      </a>
    </TradeBtnWarp>
  </LimitTarde>
);
