let prices = assets
  .filter((asset) => asset[1].token_name === "ETHUSD") // Filtra para obtener solo ETHUSD
  .map((asset) => {
    let asset_account_id = asset[0];
    let asset_name = asset[1].token_name;
    let asset_decimals = asset[1].decimals;

    let asset_price = price_data_prepared[asset_account_id];
    let price = new Big(asset_price.multiplier).div(
      new Big(10).pow(asset_price.decimals - asset_decimals)
    );

    // Retorna dos veces el componente de precio para ETHUSD
    return (
      <>
        <table style={{ tableLayout: "fixed" }}>
          <tr>
            <td style={{ width: "130px" }}>
              <div style={{ color: "#6E757C" }}>{asset_name}USD</div>
            </td>
            <td style={{ width: "130px" }}>
              <div style={{ color: "#6E757C", textAlign: "right" }}>
                ${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </div>
            </td>
          </tr>
        </table>
        <table style={{ tableLayout: "fixed" }}>
          <tr>
            <td style={{ width: "130px" }}>
              <div style={{ color: "#6E757C" }}>{asset_name}USD</div>
            </td>
            <td style={{ width: "130px" }}>
              <div style={{ color: "#6E757C", textAlign: "right" }}>
                ${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </div>
            </td>
          </tr>
        </table>
      </>
    );
  });
