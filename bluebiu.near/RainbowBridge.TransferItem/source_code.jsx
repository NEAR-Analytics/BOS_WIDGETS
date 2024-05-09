const { from, to, token, amount, txhash, state, time } = props;

const ItemWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;

  .icon-and-amount {
    display: flex;
    align-items: center;
    gap: 8px;

    .icon {
      width: 26px;
      height: 26px;
      border-radius: 100%;
    }

    .amount {
      color: white;
    }
  }

  .state-filed {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .finalize-button {
    width: 90px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #00faa0;
    color: #000000;
  }

  .process {
    width: 90px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: "#64B5FF";
  }

  .chain-icon {
    width: 26px;
    height: 26px;
    border-radius: 10px;
  }
`;

const IconRight = (
  <svg
    width="14"
    height="5"
    viewBox="0 0 14 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.0185 4.66665H0.981563C0.439 4.66665 4.29153e-05 4.2763 4.29153e-05 3.79381C4.29153e-05 3.31133 0.439 2.92098 0.981563 2.92098H10.6356L9.02696 1.49049C8.64254 1.14863 8.64254 0.595833 9.02696 0.256396C9.41139 -0.0854654 10.033 -0.0854654 10.4147 0.256396L13.6101 3.09554C13.8473 3.25556 14 3.50772 14 3.79381C14 4.2763 13.561 4.66665 13.0185 4.66665Z"
      fill="#787DA2"
    />
  </svg>
);

const TokenFlow = styled.div`
  position: absolute;
  transform: translate(50%);
  display: flex;
  align-items: center;

  top: 50%;
  left: 50%;
`;

return <ItemWrapper></ItemWrapper>;
