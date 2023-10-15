let greeting = "Have a great day";

return (
  <>
    <div className="container border border-info p-3 d-flex align-items-center">
      <div
        className="container rounded d-flex flex-column align-items-center justify-content-center gap-2 p-3"
        style={{ maxWidth: "300px", boxShadow: "0px 0px 10px #0000001A" }}
      >
        <div className="d-flex align-items-center justify-content-start w-100 gap-2">
          <p className="fw-bold p-0 m-0">Swap</p>
          <p className="fw-bold p-0 m-0" style={{ color: "#F0F0F0" }}>
            Bridge
          </p>
          <div className="p-0 m-0 w-100 text-end">
            <select>
              <option>NEAR</option>
              <option>ETH</option>
              <option>BNB</option>
            </select>
          </div>
        </div>
        <div
          className="d-flex flex-column align-items-center justify-content-center gap-2"
          style={{ position: "relative", width: "100%" }}
        >
          {/* {First Box} */}
          <div
            className="container border rounded d-flex p-0"
            style={{ backgroundColor: "#F0F0F0F0", width: "100%" }}
          >
            <div className="container w-50 p-2">
              <p className="p-0 m-0" style={{ fontSize: "0.7rem" }}>
                Send
              </p>
              <input
                className="fw-bold fs-3 max-w-full"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                }}
                type="text"
                inputMode="numeric"
                min={0}
                placeholder="0"
                onFocus={(e) => {
                  e.target.border = "none";
                }}
              />
            </div>
            <div className="container w-50 p-2">
              <p
                className="w-100"
                style={{ fontSize: "0.7rem", textAlign: "right" }}
              >
                $120.54
              </p>
              <div className="w-100 text-end">
                <select>
                  <option>NEAR</option>
                  <option>ETH</option>
                  <option>BNB</option>
                  <option>USDC</option>
                  <option>Matic</option>
                </select>
              </div>
            </div>
          </div>
          {/* {Second Box} */}
          <div
            className="container border rounded d-flex p-0"
            style={{ backgroundColor: "#F0F0F0F0", width: "100%" }}
          >
            <div className="container w-50 p-2">
              <p className="p-0 m-0" style={{ fontSize: "0.7rem" }}>
                Receive
              </p>
              <input
                className="fw-bold fs-3 max-w-full"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                  width: "fit-content",
                }}
                type="text"
                inputMode="numeric"
                min={0}
                placeholder="0"
                onFocus={(e) => {
                  e.target.border = "none";
                }}
              />
            </div>
            <div className="container border border-radius-3 w-50 p-2">
              <p
                className="text-right w-100"
                style={{ fontSize: "0.7rem", textAlign: "right" }}
              >
                $120.54
              </p>
              <div className="w-100 text-end">
                <select>
                  <option>NEAR</option>
                  <option>ETH</option>
                  <option>BNB</option>
                  <option>USDC</option>
                  <option>Matic</option>
                </select>
              </div>
            </div>
          </div>
          {/* {Swith Button} */}
          <button
            className="btn fs-2"
            style={{
              position: "absolute",
              top: "30%",
              left: "37%",
              background: "transparent",
            }}
          >
            🔃
          </button>
        </div>

        {/* {Swap/Bridge Button} */}
        <button className="btn btn-primary fs-bold w-100" type="button">
          Swap
        </button>
      </div>
    </div>
  </>
);
