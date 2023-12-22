const SummaryCardWarp = styled.div`
  padding: 0 0.75rem;
  margin-top: 15px;
  .card-box {
    border: 1px solid #3d3947;
    border-radius: 10px;
    background-color: #252526;
    box-sizing: border-box;
    padding: 12px;
    display: flex;
    flex-direction: column;
    row-gap: 0.75rem;
  }
  .card-title {
    font-size: 12px;
    color: #98969e;
  }
  .card-item {
    display: flex;
    align-items: center;
  }
  .card-item-label {
    flex: 1 1 0%;
    color: #fff;
  }
  .card-item-data {
    flex: none;
  }
`;

const { tardeType } = props;

return (
  <SummaryCardWarp>
    <div class="card-box">
      <div class="card-title">Summary</div>
      <div class="card-item">
        <div class="card-item-label">
          {tardeType === "limit" ? "Effective Time" : "Effective Price"}
        </div>
        <div class="card-item-data">
          <svg
            data-v-1bfe5cdc=""
            data-v-9ed13503=""
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              data-v-1bfe5cdc=""
              d="M12 8L4 8"
              stroke="#98969e"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
      </div>
      <div class="card-item">
        <div class="card-item-label">Liq Price</div>
        <div class="card-item-data">
          <svg
            data-v-1bfe5cdc=""
            data-v-9ed13503=""
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              data-v-1bfe5cdc=""
              d="M12 8L4 8"
              stroke="#98969e"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
      </div>
      <div class="card-item">
        <div class="card-item-label">Total</div>
        <div class="card-item-data">
          <svg
            data-v-1bfe5cdc=""
            data-v-9ed13503=""
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              data-v-1bfe5cdc=""
              d="M12 8L4 8"
              stroke="#98969e"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </SummaryCardWarp>
);
